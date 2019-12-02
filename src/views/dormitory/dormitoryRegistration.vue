<template>
  <div class="wrap" id="wrap">
		<x-input class="weui-vcode" placeholder="输入工号" v-model="FNumber" :show-clear="false">
      <x-button slot="right" type="primary" mini @click.native="getWaitForCheckInEmpList">搜索</x-button>
    </x-input>
		<div class="list" style="background: #e2e2e2">
      <ul>
        <li
          v-for="(item, index) in result"
          :key="index"
          class="mt20"
          :style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'"
          @click="toInfo(item.FitemID)"
				>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">工号：{{item.FEmpNumber}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">姓名：{{item.FEmpName}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">性别：{{item.FSexName}}</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">职务：{{item.FDutyName}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">级别：{{item.FFunctionName}}</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">吃住：{{item.FeatStay}}</div>
						</flexbox-item>
					</flexbox>
        </li>
      </ul>
		</div>
    <!-- <div class='list'>
      <ul>
        <li>
          <div class='title'>员工ID</div>
          <div class='content'>{{result.FitemID}}</div>
        </li>
        <li>
          <div class='title'>组织代码</div>
          <div class='content'>{{result.FOrganizeNumber}}</div>
        </li>
        <li>
          <div class='title'>组织名称</div>
          <div class='content'>{{result.FOrganizeName}}</div>
        </li>
        <li>
          <div class='title'>工号</div>
          <div class='content'>{{result.FEmpNumber}}</div>
        </li>
        <li>
          <div class='title'>姓名</div>
          <div class='content'>{{result.FEmpName}}</div>
        </li>
        <li>
          <div class='title'>性别</div>
          <div class='content'>{{result.FSexName}}</div>
        </li>
        <li>
          <div class='title'>组别</div>
          <div class='content'>{{result.FDeptmentName}}</div>
        </li>
        <li>
          <div class='title'>职务</div>
          <div class='content'>{{result.FDutyName}}</div>
        </li>
        <li>
          <div class='title'>职务等级</div>
          <div class='content'>{{result.FFunctionName}}</div>
        </li>
        <li>
          <div class='title'>入职日期</div>
          <div class='content'>{{result.FHiredate}}</div>
        </li>
        <li>
          <div class='title'>家庭地址</div>
          <div class='content'>{{result.Faddreess}}</div>
        </li>
        <li>
          <div class='title'>现住地址</div>
          <div class='content'>{{result.FNowAddreess}}</div>
        </li>
        <li>
          <div class='title'>吃住</div>
          <div class='content'>{{result.FeatStay}}</div>
        </li>
      </ul>
    </div> -->
		
	</div>
</template>

<script>
import { JDGetWaitForCheckInEmpList } from '@/api/getData'
import { mapState } from 'vuex'
import { XButton,Flexbox, FlexboxItem, XInput } from 'vux'
import $ from 'jquery'
import { userInfo } from 'os';
export default {
  data() {
    return {
      result: '',
			FNumber:''
		};
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId,
      userInfo: state => state.mutations.userInfo
    })
  },
  components: {
    XButton, Flexbox, FlexboxItem, XInput
  },
  mounted() {
    console.log(this.userInfo)
    this.getWaitForCheckInEmpList()
	},
	methods: {
    async getWaitForCheckInEmpList() {
			console.log(this.userInfo[0])
      let data = await JDGetWaitForCheckInEmpList({
				FNumber: this.FNumber , FUserID: this.userInfo[0].FUserID
				
				//FNumber: this.userInfo[0].fnumber , FUserID: this.userInfo[0].FUserID
			})
			console.log(data)
      this.result = data
		},
		toInfo(FItemID){
			this.$router.push({
        path: "/dormitory/dormitoryRegistration1",
        query: { FItemID: FItemID }
      });
		},
		search(){

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