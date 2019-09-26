<template>
  <div class="wrap" id="wrap" style="padding:0px 0px 70px 0px">
    <div class='date'>
      <div @click="guestInvitationView(0)">未来访</div>
      <div @click="guestInvitationView(1)">已来访</div>
      <div @click="guestInvitationView('')">所有记录</div>
    </div>
    <ul class='mt20' v-for="(guestInvitationViewObject,index) in guestInvitationViewModel" :key="index">
      <li>
        <div class='title'>编号</div>
        <div class='content'>{{index+1}}</div>
      </li>
      <li>
        <div class='title'>来访人名称</div>
        <div class='content'>{{guestInvitationViewObject.Gname}}</div>
      </li>
      <li>
        <div class='title'>被拜访人名称</div>
        <div class='content'>{{guestInvitationViewObject.name}}</div>
      </li>
      <li>
        <div class='title'>被拜访人所属部门</div>
        <div class='content'>{{guestInvitationViewObject.depetment}}</div>
      </li>
      <li>
        <div class='title'>预约日期</div>
        <div class='content'>{{guestInvitationViewObject.Gtime}}</div>
      </li>
      <li>
        <div class='title'>到访日期</div>
        <div class='content'>{{guestInvitationViewObject.Ltime}}</div>
      </li>
      <li>
        <div class='title'>二维码</div>
        <div class='content'>
          <div class='look' @click='look(guestInvitationViewObject.id)'>查看</div>
        </div>
      </li>
      <li>
        <div class='title'>是否已来访</div>
        <div class='content'>{{guestInvitationViewObject.zt==1?'是':'否'}}</div>
      </li>
    </ul>
    <div class='invitation'>
      <x-button :gradients="['#d93309', '#aa0000']" class='button' @click.native='invitation'>来宾邀请</x-button>
    </div>
	</div>
</template>

<script>
import { JDGuestInvitationView } from '@/api/getData'
import { Popup, XButton } from 'vux'
import { mapState } from "vuex";
import $ from 'jquery'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      guestInvitationViewModel:[],
      guestInvitationViewObject:{}
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
    XButton
  },
  mounted() {
    this.guestInvitationView('');
	},
	methods: {
    look(id) {
      this.$router.push({
        path: '/QRcode',
        query:{
          id:id
        }
      })
    },
    log() {

    },
    invitation() {
      this.$router.push({path: '/invitation'})
    },
    close() {

    },
    init() {
    },
    async guestInvitationView(zt) {
      console.log(zt);
      let data = await JDGuestInvitationView({
        FWeixinOpenID: this.wxOpenId,
        zt:zt
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.guestInvitationViewModel = eval(data);
      this.$nextTick(() => {
        this.init()
      })
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
@import "../../../main.css";
.date{
  // height: @rem*88;
  display: flex;
  background: white;
  padding: @rem*20;
  >div{
    text-align: center;
    color: white;
    width: @rem*210;
    height: @rem*68;
    line-height:@rem*68;
    margin-right: @rem*32; 
    .bisColor(#d93309, #aa0000);
    border-radius: 5px;
  }
  div:nth-child(3){
    margin-right: 0;
  }
}
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
      font-size: @rem*32;
    }
    .content{
      color: #333;
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
.invitation{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: @rem*20;
  background: white;
  .button{
    width: 100%;
    height: @rem*80;
    font-size: @rem*28;
  }
}
</style>
