<template>
  <div class="wrap" id="wrap">
    <div class='list'>
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
          <div class='content'>{{result.FName}}</div>
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
          <div class='content'>{{result.FFunctionName}}月</div>
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
    </div>
	</div>
</template>

<script>
import { JDGetWaitForCheckInEmpList } from '@/api/getData'
import { mapState } from 'vuex'
import { XButton, Alert } from 'vux'
import $ from 'jquery'
import { userInfo } from 'os';
export default {
  data() {
    return {
      result: '',
      fileList: [],
      upLoadImgList: []
		};
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId,
      userInfo: state => state.mutations.userInfo
    })
  },
  components: {
    XButton
  },
  mounted() {
    console.log(this.userInfo)
    this.getWaitForCheckInEmpList()
	},
	methods: {
    async getWaitForCheckInEmpList() {
			console.log(this.userInfo[0])
      let data = await JDGetWaitForCheckInEmpList({FNumber: this.userInfo[0].FitemID , FUserID: this.userInfo[0].FUserID})
      console.log(data)
      this.result = JSON.parse(data)
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.InventoryBox{
  margin-bottom: @rem*20;
  width: 100%;
  background: white;
  padding: @rem*10;
  .startInventory{
    background: #ae0401;
    color: white;
    height: @rem*80;
    width: 60%;
    margin: 0 auto;
  }
}
.mr10{
  margin-right:@rem*10
}
.weui-btn, .weui-btn{
  margin-top: 0 !important;
  line-height: @rem*60 !important;
}
.imgList{
  padding: @rem*10;
  background: white;
  display: flex;
  flex-wrap: wrap;
  div{
    margin-top: @rem*10;
    width: 24%;
    margin-right: 1.2%;
    &:nth-child(4n){
      margin-right: 0;
    }
    img{
      height: @rem*160;
      display: block;
      width: 100%;
    }
  }
}
.list{
  ul{
    li{
      display: flex;
      justify-content: space-between;
      background: white;
      padding: @rem*20;
      border-bottom: 1px solid #f5f5f5;
      .title{
        color: #666;
        font-size: @rem*32;
        display: flex;
        align-items:center;
      }
      .content{
        font-size: @rem*32;
        color: #333;
        .xbutton{
          width: @rem* 220;
          height: @rem*80;
        }
      }
    }
  }
}
</style>