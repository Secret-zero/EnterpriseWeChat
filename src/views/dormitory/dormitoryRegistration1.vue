<template>
	<div class="wrap" id="wrap">
		<div class="list">
			<form onkeydown="if(event.keyCode==13) return false;" >
				<ul>
					<div style="float:right"><img :src="'http://220.189.245.171:8083/'+result.FFullName" /></div>
					<li>
						<div class="title">工号*</div>
						<div class="content">{{result.FEmpNumber}}</div>
					</li>
					<li>
						<div class="title">姓名</div>
						<div class="content">{{result.FEmpName}}</div>
					</li>
					<li>
						<div class="title">性别</div>
						<div class="content">{{result.FSexName}}</div>
					</li>
					<li>
						<div class="title">婚姻状况</div>
						<div class="content">{{result.FmarriageName}}</div>
					</li>
					<li>
						<div class="title">组织</div>
						<div class="content">{{result.FOrganizeName}}</div>
					</li>
					<li>
						<div class="title">部门</div>
						<div class="content">{{result.FDeptmentName}}</div>
					</li>
					<li>
						<div class="title">职务</div>
						<div class="content">{{result.FDutyName}}</div>
					</li>
					<li>
						<div class="title">入职日期</div>
						<div class="content">{{result.FHiredate}}</div>
					</li>
					<li>
						<div class="title">联系电话</div>
						<div class="content">{{result.Faddreess}}</div>
					</li>
					<div style="float:right;" v-if="result.FSpouseFullName!=''&&result.FSpouseFullName!=undefined"><img :src="'http://220.189.245.171:8083/'+result.FSpouseFullName" /></div>
					<li>
						<div class="title">配偶工号</div>
						<div class="content">
							<input	type="text" v-model="result.FSpouseEmpNumber"	@click="showBox = true"	@input="getWaitForCheckInEmpList()"/>
						</div>
						<div class="val-box" v-if="departList.length&&result.FSpouseEmpNumber&&showBox">
							<ul>
								<li v-for="(item, index) in departList" :key="index" @click="clickSpouse(item)">{{item}}</li>
							</ul>
						</div>
					</li>
					
					<li>
						<div class="title">配偶姓名</div>
						<div class="content">{{result.FSpouseEmpName}}</div>
					</li>
					<li>
						<div class="title">配偶性别</div>
						<div class="content">{{result.FSpouseSexName}}</div>
					</li>
					<li>
						<div class="title">配偶婚姻状况</div>
						<div class="content">{{result.FSpousemarriageName}}</div>
					</li>
					<li>
						<div class="title">配偶组织</div>
						<div class="content">{{result.FSpouseOrganizeName}}</div>
					</li>
					<li>
						<div class="title">配偶部门</div>
						<div class="content">{{result.FSpouseDeptmentName}}</div>
					</li>
					<li>
						<div class="title">配偶职务</div>
						<div class="content">{{result.FSpouseDutyName}}</div>
					</li>
					<!-- <li>
						<div class="title">本人照片</div>
						<div class="content">
							<img :src="'http://220.189.245.171:8083/'+result.FFullName" />
						</div>
					</li>
					<li>
						<div class="title">配偶图片</div>
						<div class="content">
							<img :src="'http://220.189.245.171:8083/'+result.FSpouseFullName" />
						</div>
					</li> -->
					<x-button :gradients="['#d93309', '#aa0000']" class="button" @click.native="toInfo()">选择宿舍</x-button>
					<li>
						<div class="title">床铺号：</div>
						<div class="content">{{item.FNumber}}</div>
					</li>
					<li>
						<div class="title">分配状态：</div>
						<div class="content">{{item.FFPZT}}</div>
					</li>
					<li>
						<div class="title">房间组织：</div>
						<div class="content">{{item.FOrganizeName}}</div>
					</li>
					<li>
						<div class="title">房间类型：</div>
						<div class="content">{{item.FRoomTypeName}}</div>
					</li>
					<li>
						<div class="title">楼号：</div>
						<div class="content">{{item.FDormitoriesName}}</div>
					</li>
					<li>
						<div class="title">层数：</div>
						<div class="content">{{item.Ffloor}}</div>
					</li>
					<li>
						<div class="title">房间朝向：</div>
						<div class="content">{{item.FRoomToward}}</div>
					</li>
					<li>
						<div class="title">窗户朝向：</div>
						<div class="content">{{item.FWindownToWard}}</div>
					</li>
					<li>
						<div class="title">是否阳台</div>
						<div class="content">{{item.FIsPorch}}</div>
					</li>
					<li>
						<div class="title">是否独立卫生家：</div>
						<div class="content">{{item.FIsToilet}}</div>
					</li>
					<li>
						<div class="title">面积（平方米）：</div>
						<div class="content">{{item.FRoomArea}}</div>
					</li>
					<li>
						<div class="title">租价/平方</div>
						<div class="content">{{item.FRoomPrice}}</div>
					</li>
					<li>
						<div class="title">家具配置</div>
						<div class="content">{{item.Ffurniture}}</div>
					</li>
					<li>
						<div class="title">入住日期*</div>
						<div class='content' >
							<datetime style="padding:0px"
								format="YYYY-MM-DD"
								v-model="Fdate"
								@on-change="change"
							>
          		</datetime>
        		</div>
						<!-- <input type="text" placeholder="请填写" v-model="Fdate" required oninvalid="setCustomValidity('请填写入住日期')" oninput="setCustomValidity('')"/> -->
					</li>
					<li>
						<div class="title">个人癖好*</div>
						<input type="text" placeholder="请填写" v-model="FHobby" required oninvalid="setCustomValidity('请填写个人癖好')" oninput="setCustomValidity('')"/>
					</li>
					<li>
						<div class="title">备注*</div>
						<input type="text" placeholder="请填写" v-model="FNote" required oninvalid="setCustomValidity('请填写备注')" oninput="setCustomValidity('')"/>
					</li>
				</ul>
				<div class="invitation">
					<input type="submit" class="weui-btn inputbutton" @click="confirm($event)">
					<!-- <x-button :gradients="['#d93309', '#aa0000']" class="button" @click.native="confirm($event)">提交</x-button> -->
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {
	JDGetEmpRegisterInfo,
	JDGetWaitForCheckInEmpList,
	JDSubmitSsDormitory,
	upLoadImg
} from "@/api/getData";
import { mapState } from "vuex";
import { XButton, Alert, Tabbar, TabbarItem, Flexbox, FlexboxItem, Datetime } from "vux";
import $ from "jquery";
export default {
	data() {
		return {
			result: {FSpouseEmpName:""},
			showBox: false,
			departList: [],
			departList2: [],
			departName: "",
			Fdate: "2019-05-09",
			FHobby: "",
			FNote: "",
			item: {
				FNumber: "",
				FFPZT: "",
				FOrganizeName: ""
			}
		};
	},
	components: {XButton,Alert,Tabbar,TabbarItem,Flexbox,FlexboxItem, Datetime},
	mounted() {
		if (this.$route.query.item != undefined) {
			this.item = JSON.parse(this.$route.query.item);
			console.info(this.item);
		}
		if (this.$route.query.FItemID != undefined) {
			this.FItemID = this.$route.query.FItemID;
			this.getEmpRegisterInfo();
		}
		if (this.$route.query.FSpouseEmpNumber != undefined) {
			this.result.FSpouseEmpNumber = this.$route.query.FSpouseEmpNumber;
			console.info(this.$route.query.FSpouseEmpNumber);
			this.clickSpouse(this.result.FSpouseEmpNumber);
		}
	},
	methods: {
		change (value) {
      console.log('change', value)
    },
		addPic() {
			$("input[type=file]").trigger("click");
			return false;
		},
		async imgChange(e) {
			let imgBroadcastListBase64 = [];
			if (!e.target.files.length) return;
			let array = Object.keys(e.target.files).map(key => e.target.files[key]); // 对象转数组
			if (array.length > 5) {
				array = array.filter((item, index) => {
					if (index < 5) {
						return item;
					}
				});
			}
			let fileList = array.map(async (item, index) => {
				let res = await this.uploadImgToBase64(item);
				return res.result;
			});
			for (const textPromise of fileList) {
				imgBroadcastListBase64.push(await textPromise);
			}
			if (this.fileList.length + imgBroadcastListBase64.length > 5) {
				// 如果 超过五张则提示超过五张 不得上传
				this.$vux.alert.show({
					title: "注意",
					content: "最多可上传五张图片",
					onShow() {
						console.log("Plugin: I'm showing");
					},
					onHide() {
						console.log("Plugin: I'm hiding now");
					}
				});
				return;
			}
			this.fileList = [...this.fileList, ...imgBroadcastListBase64]; // 合并数组

			// if (array.length === 1 && this.fileList.length <4) {
			//   this.fileList = [...this.fileList, ...imgBroadcastListBase64]
			// } else {
			//   this.fileList = imgBroadcastListBase64
			// }
		},
		async upLoadImg() {
			let form = {
				FCheckInterID: this.result.FCheckInterID,
				EmpCode: this.userInfo1[0].Fnumber,
				Pictures: []
			};
			form.Pictures = this.fileList.map(item => {
				return { photo: item.replace(/.*;base64,/, "") };
			});
			form.Pictures = JSON.stringify(form.Pictures);
			console.log(form);
			let res = await upLoadImg(form);
			console.log(res);
			this.$vux.toast.text(res);
		},
		async getEmpRegisterInfo() {
			let data = await JDGetEmpRegisterInfo({
				FItemID: this.$route.query.FItemID
			});
			console.log(data);
			this.result = data[0];
		},
		toInfo() {
			this.$router.push({
				path: "/dormitory/dormitoryRegistration2",
				query: {
					FSpouseEmpNumber: this.result.FSpouseEmpNumber,
					FItemID: this.$route.query.FItemID
				}
			});
		},
		async getWaitForCheckInEmpList() {
			let data = await JDGetWaitForCheckInEmpList({
				FNumber: this.result.FSpouseEmpNumber,
				FUserID: "362"

				//FNumber: this.result.FSpouseEmpNumber , FUserID: this.userInfo[0].FUserID
			});
			console.info(data);
			this.departList = data.map(item => {
				return item.FEmpNumber;
			});
			// this.result.FSpouseEmpName=data[0].FEmpName;
			// this.result.FSpouseSexName=data[0].FSexName;
			// //this.result.FSpousemarriageName=data.
			// this.result.FSpouseOrganizeName=data[0].FOrganizeName;
			// this.result.FSpouseDeptmentName=data[0].FDeptmentName;
			// this.result.FSpouseDutyName=data[0].FDutyName
			// //this.result.FSpouseFullName=data.
		},
		async clickSpouse(FSpouseEmpNumber) {
			console.info("clickSpouse" + FSpouseEmpNumber);
			this.departList = [];
			this.showBox = false;
			let data = await JDGetWaitForCheckInEmpList({
				FNumber: FSpouseEmpNumber,
				FUserID: "362"
				//FNumber: this.result.FSpouseEmpNumber , FUserID: this.userInfo[0].FUserID
			});
			console.info("11"+this.result.FSpouseEmpName)
			this.result.FSpouseEmpNumber = FSpouseEmpNumber;
			this.result.FSpouseEmpName = data[0].FEmpName;
			this.result.FSpouseEmpID=data[0].FitemID;
			this.result.FSpouseSexName = data[0].FSexName;
			this.result.FSpousemarriageName = data[0].FmarriageName;
			this.result.FSpouseOrganizeName = data[0].FOrganizeName;
			this.result.FSpouseDeptmentName = data[0].FDeptmentName;
			this.result.FSpouseDutyName = data[0].FDutyName;
			this.result.FSpouseFullName = data[0].FFullName;
		},
		async submitSsDormitory(){
      let Json = {
        FitemID: this.item.FItemID,
        FEmpID: this.result.FitemID,
				FEmpName: this.result.FEmpName,
				FSpouseEmpID:this.result.FSpouseEmpID,
				Fdate:this.Fdate,
				FHobby:this.FHobby,
				FNote:this.FNote
			}
			console.info(Json)
			let data = await JDSubmitSsDormitory({
				FEmpCode: this.result.FEmpNumber,
				Json:Json
			})
			
		},
		confirm() {
			this.submitSsDormitory();
			
		}
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.InventoryBox {
	margin-bottom: @rem*20;
	width: 100%;
	background: white;
	padding: @rem*10;
	.startInventory {
		background: #ae0401;
		color: white;
		height: @rem*80;
		width: 60%;
		margin: 0 auto;
	}
}
.mr10 {
	margin-right: @rem*10;
}
.weui-btn,
.weui-btn {
	margin-top: 0 !important;
	line-height: @rem*60 !important;
}
.imgList {
	padding: @rem*10;
	background: white;
	display: flex;
	flex-wrap: wrap;
	div {
		margin-top: @rem*10;
		width: 24%;
		margin-right: 1.2%;
		&:nth-child(4n) {
			margin-right: 0;
		}
		img {
			height: @rem*160;
			display: block;
			width: 100%;
		}
	}
}
.list {
	ul {
		li {
			display: flex;
			justify-content: space-between;
			background: white;
			padding: @rem*20;
			border-bottom: 1px solid #f5f5f5;
			.title {
				color: #666;
				font-size: @rem*32;
				display: flex;
				align-items: center;
			}
			.content {
				font-size: @rem*32;
				color: #333;
				.xbutton {
					width: @rem* 220;
					height: @rem*80;
				}
			}
		}
	}
}
.val-box {
	-webkit-overflow-scrolling: touch;
	height: 3rem;
	background: white;
	position: absolute;
	width: 100%;
	text-align: center;
	z-index: 8000;
	overflow: scroll;
	border: 1px solid #eee;
	margin-top: 100px;
}
input {
	border: none;
	text-align: right;
}
.inputbutton{
	background: linear-gradient(90deg, rgb(217, 51, 9), rgb(170, 0, 0));
	color: rgb(255, 255, 255);
	font-size:18px;
	text-align: center
}
</style>