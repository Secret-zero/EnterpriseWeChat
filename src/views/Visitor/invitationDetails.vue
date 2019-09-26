<template>
  <div class="wrap" id="wrap">
    <ul class='mt20'>
      <li>
        <div class='title'>来访人姓名</div>
        <div class='content'>{{guestInvitationObject.Gname}}</div>
      </li>
      <li>
        <div class='title'>来访人手机号码</div>
        <div class='content'>{{guestInvitationObject.Gphone}}</div>
      </li>
      <li>
        <div class='title'>被拜访人姓名</div>
        <div class='content'>{{guestInvitationObject.name}}</div>
      </li>
      <li>
        <div class='title'>被拜访人手机</div>
        <div class='content'>{{guestInvitationObject.phone}}</div>
      </li>
      <li>
        <div class='title'>被拜访人公司</div>
        <div class='content'>{{guestInvitationObject.organize}}</div>
      </li>
      <li>
        <div class='title'>被拜访人部门</div>
        <div class='content'>{{guestInvitationObject.depetment}}</div>
      </li>
      <li>
        <div class='title'>拜访事由</div>
        <div class='content'>{{guestInvitationObject.note}}</div>
      </li>
      <li>
        <div class='title'>预约日期</div>
        <div class='content'>{{guestInvitationObject.Gtime}}</div>
      </li>
      <li>
        <div class='title'>到访日期</div>
        <div class='content'>{{guestInvitationObject.Ltime}}</div>
      </li>
      <li>
        <div class='title'>是否已来访</div>
        <div class='content'>{{guestInvitationObject.zt==1?'是':'否'}}</div>
      </li>
    </ul>
	</div>
</template>

<script>
import { JDGuestInvitationQRCodeList } from '@/api/getData'
import { Popup, XButton,Datetime } from 'vux'
import { mapState } from 'vuex';
import $ from 'jquery'
import moment from 'moment'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      guestInvitationObject:{},
      guestName:"",
      guestPhone:"",
      guestReason:"",
      Gtime:'2019-05-09'
		};
  },
  directives: {
  },
  computed:{
    ...mapState({
			wxOpenId: state => state.mutations.wxOpenId,
      userInfo: state => state.mutations.userInfo
    })
  },
  components: {
    Popup,
    XButton,
    Datetime
  },
  mounted() {
    this.guestInvitationQRCodeList()
	},
	methods: {
    log() {

    },
    close() {

    },
    init() {
    },
    async guestInvitationQRCodeList() {
      let data = await JDGuestInvitationQRCodeList({
        id: this.$route.query.id
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.guestInvitationObject = eval(data)[0];
      this.$nextTick(() => {
        this.init()
      })
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
ul{
  background: white;
  li{
    padding: @rem*20;
    display: flex;
    justify-content: space-between;
    font-size: @rem*32;
    border-bottom: 1px solid #eee;
    .title{
      color: #666;
    }
    input{
        border: none;
        text-align: right;
      }
    .content{
      color: #333;
      display: flex;
      align-items: center;
      i{
        color: #666;
        font-size: @rem*30;
      }
      .look{
        width: @rem*120;
        height: @rem*60;
        line-height: @rem*60;
        color: white;
        border-radius: 5px;
        text-align: center;
        .bisColor(#d93309, #aa0000)
      }
    }
  }
}
.button{
  width: 95%;
    margin: @rem*20;
  }
</style>
