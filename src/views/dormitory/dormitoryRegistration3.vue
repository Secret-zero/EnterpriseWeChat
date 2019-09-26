<template>
	<div class="wrap" id="wrap">
		<div class="list">
			<form onkeydown="if(event.keyCode==13) return false;" >
				<ul>
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
				</ul>
				<div class="invitation">
					<x-button :gradients="['#d93309', '#aa0000']" class="button" @click.native="back()">返回</x-button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { JDGetEmpRegisterInfo,JDGetWaitForCheckInEmpList,JDSubmitSsDormitory } from "@/api/getData";
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
			item: {}
		};
	},
	components: { XButton,Alert,Tabbar,TabbarItem,Flexbox,FlexboxItem, Datetime },
	mounted() {
		if (this.$route.query.item != undefined) {
			this.item = JSON.parse(this.$route.query.item);
			console.info(this.item);
		}
	},
	methods: {
		// async getEmpRegisterInfo() {
		// 	let data = await JDGetEmpRegisterInfo({
		// 		FItemID: this.$route.query.FItemID
		// 	});
		// 	console.log(data);
		// 	this.result = data[0];
		// },
		// toInfo() {
		// 	this.$router.push({
		// 		path: "/dormitory/dormitoryRegistration2",
		// 		query: {
		// 			FSpouseEmpNumber: this.result.FSpouseEmpNumber,
		// 			FItemID: this.$route.query.FItemID
		// 		}
		// 	});
		// },
		// async getWaitForCheckInEmpList() {
		// 	let data = await JDGetWaitForCheckInEmpList({
		// 		FNumber: this.result.FSpouseEmpNumber,
		// 		FUserID: "362"

		// 		//FNumber: this.result.FSpouseEmpNumber , FUserID: this.userInfo[0].FUserID
		// 	});
		// 	console.info(data);
		// 	this.departList = data.map(item => {
		// 		return item.FEmpNumber;
		// 	});
		// 	// this.result.FSpouseEmpName=data[0].FEmpName;
		// 	// this.result.FSpouseSexName=data[0].FSexName;
		// 	// //this.result.FSpousemarriageName=data.
		// 	// this.result.FSpouseOrganizeName=data[0].FOrganizeName;
		// 	// this.result.FSpouseDeptmentName=data[0].FDeptmentName;
		// 	// this.result.FSpouseDutyName=data[0].FDutyName
		// 	// //this.result.FSpouseFullName=data.
		// },
		// async clickSpouse(FSpouseEmpNumber) {
		// 	console.info("clickSpouse" + FSpouseEmpNumber);
		// 	this.departList = [];
		// 	this.showBox = false;
		// 	let data = await JDGetWaitForCheckInEmpList({
		// 		FNumber: FSpouseEmpNumber,
		// 		FUserID: "362"
		// 		//FNumber: this.result.FSpouseEmpNumber , FUserID: this.userInfo[0].FUserID
		// 	});
		// 	console.info("11"+this.result.FSpouseEmpName)
		// 	this.result.FSpouseEmpNumber = FSpouseEmpNumber;
		// 	this.result.FSpouseEmpName = data[0].FEmpName;
		// 	this.result.FSpouseEmpID=data[0].FitemID;
		// 	this.result.FSpouseSexName = data[0].FSexName;
		// 	this.result.FSpousemarriageName = data[0].FmarriageName;
		// 	this.result.FSpouseOrganizeName = data[0].FOrganizeName;
		// 	this.result.FSpouseDeptmentName = data[0].FDeptmentName;
		// 	this.result.FSpouseDutyName = data[0].FDutyName;
		// 	this.result.FSpouseFullName = data[0].FFullName;
		// },
		// async submitSsDormitory(){
    //   let Json = {
    //     FitemID: this.item.FItemID,
    //     FEmpID: this.result.FitemID,
		// 		FEmpName: this.result.FEmpName,
		// 		FSpouseEmpID:this.result.FSpouseEmpID,
		// 		Fdate:this.Fdate,
		// 		FHobby:this.FHobby,
		// 		FNote:this.FNote
		// 	}
		// 	console.info(Json)
		// 	let data = await JDSubmitSsDormitory({
		// 		FEmpCode: this.result.FEmpNumber,
		// 		Json:Json
		// 	})
			
		// },
		// confirm() {
		// 	this.submitSsDormitory();
			
		// }
		back(){
			this.$router.push({
				path: "/dormitory/dormitoryRegistration2",
				query:{
					FItemID: this.$route.query.FItemID,
					FBedNumber:this.$route.query.FBedNumber,
					FSpouseEmpNumber: this.$route.query.FSpouseEmpNumber
				}
			});
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