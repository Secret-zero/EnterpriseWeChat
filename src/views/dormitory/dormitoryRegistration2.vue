<template>
  <div class="wrap" id="wrap">
		<x-input class="weui-vcode" placeholder="输入房间号" v-model="FBedNumber" :show-clear="false">
      <x-button slot="right" type="primary" mini @click.native="getCheckedRoomBedInfo()">搜索</x-button>
    </x-input>
    <div class="list" style="background: #e2e2e2;" >
      <ul>
        <li
				v-for="(item, index) in result"
				:key="index"
				class="mt20"
				:style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'"
				>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">床铺号：{{item.FNumber}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">分配状态：{{item.FFPZT}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">房间组织：{{item.FOrganizeName}}</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">房间类型：{{item.FRoomTypeName}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">楼号：{{item.FDormitoriesName}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">层数：{{item.Ffloor}}</div>
						</flexbox-item>
						
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">房间朝向：{{item.FRoomToward}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">窗户朝向：{{item.FWindownToWard}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">是否阳台：{{item.FIsPorch}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">是否独立卫生家：{{item.FIsToilet}}</div>
						</flexbox-item>
					</flexbox>
						<flexbox>
						<flexbox-item>
							<div class="flex-demo">面积（平方米）：{{item.FRoomArea}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">租价/平方：{{item.FRoomPrice}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">家具配置：{{item.Ffurniture}}</div>
						</flexbox-item>
					</flexbox>
					<!-- <button @click="toInfo(item)">查看详情</button><button @click="toCheck(item)">选择</button> -->
					<button-tab>
						<button-tab-item @on-item-click="toInfo(item)">查看详情</button-tab-item>
						<button-tab-item @on-item-click="toCheck(item)">选择</button-tab-item>
					</button-tab>
				</li>
      </ul>
    </div>
	</div>
</template>

<script>
import { JDGetCheckedRoomBedInfo, upLoadImg } from '@/api/getData'
import { mapState } from 'vuex'
import { XButton, XInput, Alert, Tabbar, TabbarItem, Flexbox, FlexboxItem ,ButtonTab, ButtonTabItem} from 'vux'
import $ from 'jquery'
import { userInfo } from 'os';
export default {
  data() {
    return {
			result: [],
			FBedNumber:""
		};
  },
  components: {
    XButton, XInput, Alert, Tabbar, TabbarItem, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem
  },
  mounted() {
		if(this.$route.query.FBedNumber!=undefined){
			this.FBedNumber=this.$route.query.FBedNumber
		}
		this.getCheckedRoomBedInfo()
	},
	methods: {
    addPic() {
      $('input[type=file]').trigger('click')
      return false
    },
    async imgChange(e) {
      let imgBroadcastListBase64 = []
      if (!e.target.files.length) return ;
      let array = Object.keys(e.target.files).map(key=> e.target.files[key]) // 对象转数组
      if (array.length > 5) {
        array = array.filter((item, index) => {
          if (index < 5) {
            return item
          }
        })
      }
      let fileList = array.map(async (item, index) => {
        let res = await this.uploadImgToBase64(item)
        return res.result
      })
      for (const textPromise of fileList) {
        imgBroadcastListBase64.push(await textPromise)
      }
      if (this.fileList.length + imgBroadcastListBase64.length > 5) { // 如果 超过五张则提示超过五张 不得上传
        this.$vux.alert.show({
          title: '注意',
          content: '最多可上传五张图片',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
        return 
      }
      this.fileList = [...this.fileList, ...imgBroadcastListBase64] // 合并数组
      
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
      }
      form.Pictures = this.fileList.map((item) => {
        return {photo: item.replace(/.*;base64,/, '')}
      })
      form.Pictures = JSON.stringify(form.Pictures)
      console.log(form)
      let res = await upLoadImg(form)
      console.log(res)
      this.$vux.toast.text(res)
		},
		async getCheckedRoomBedInfo() {
      let data = await JDGetCheckedRoomBedInfo({
				FItemID: this.$route.query.FItemID,
				FBedNumber: this.FBedNumber
			})
			console.log(data)
      this.result = data
		},
		//跳转到详细信息
		toInfo(item){
			this.$router.push({
        path: "/dormitory/dormitoryRegistration3",
				query: { 
					item:JSON.stringify(item),
					FSpouseEmpNumber: this.$route.query.FSpouseEmpNumber,
					FItemID: this.$route.query.FItemID,
					FBedNumber: this.FBedNumber
				}
      });
		},
		//选择数据
		toCheck(item){
			this.$router.push({
        path: "/dormitory/dormitoryRegistration1",
				query: { 
					item:JSON.stringify(item),
					FSpouseEmpNumber: this.$route.query.FSpouseEmpNumber,
					FItemID: this.$route.query.FItemID
				}
      });
		}
	}
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.flex-demo {
	border-radius: 4px;
	background-clip: padding-box;
}
</style>