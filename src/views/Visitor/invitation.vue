<template>
  <div class="wrap" id="wrap">
    <ul class='mt20'>
      <li>
        <div class='title'>来宾姓名</div>
        <input type="text" placeholder="请填写" v-model="guestName">
      </li>
      <li>
        <div class='title'>来宾手机号</div>
        <input type="number" placeholder="请填写" v-model="guestPhone">
      </li>
      <li>
        <div class='title'>邀请人姓名</div>
        <div class='content'>{{guestInvitationObject.name}}</div>
      </li>
      <li>
        <div class='title'>邀请人手机</div>
        <div class='content'>{{guestInvitationObject.phone}}</div>
      </li>
      <li>
        <div class='title'>邀请人公司</div>
        <div class='content'>{{guestInvitationObject.FName}}</div>
      </li>
      <li>
        <div class='title'>邀请人部门</div>
        <div class='content'>{{guestInvitationObject.depname}}</div>
      </li>
      <li>
        <div class='title'>邀请事由</div>
        <input type="text" placeholder="请填写" v-model="guestReason">
      </li>
      <li>
        <div class='title'>预约时间</div>
        <div class='content' >
          <datetime style="padding:0px"
            format="YYYY-MM-DD HH:mm"
            v-model="Gtime"
            @on-change="change"
          >
          </datetime>
          <!-- <i class='iconfont icon-iconfontyoujiantou'></i> -->
        </div>
      </li>
    </ul>
      <x-button :gradients="['#d93309', '#aa0000']" class='button' @click.native="guestInvitationSubmission">提交</x-button>
	</div>
</template>

<script>
import { JDGuestInvitation,JDGuestInvitationSubmission } from '@/api/getData'
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
    this.guestInvitation()
	},
	methods: {
    log() {

    },
    close() {

    },
    change (value) {
      console.log('change', value)
    },
    init() {
    },
    async guestInvitation() {
      let data = await JDGuestInvitation({
        FWeixinOpenID: this.wxOpenId
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.guestInvitationObject = eval(data)[0];
      this.Gtime=moment(new Date()).format('YYYY-MM-DD HH:mm');
      this.$nextTick(() => {
        this.init()
      })
    },
    async guestInvitationSubmission(){
      if(this.guestName==''){
        this.$vux.toast.text('请填写来宾姓名');
        return;
      }
      if(this.guestPhone==''){
        this.$vux.toast.text('请填写来宾手机号');
        return;
      }
      if(this.guestReason==''){
        this.$vux.toast.text('请填写邀请事由');
        return;
      }
      if(this.Gtime==''){
        this.$vux.toast.text('请填写预约时间');
        return;
      }

      let data = await JDGuestInvitationSubmission({
        FWeixinOpenID: this.wxOpenId,
        Gname:this.guestName,
        Gphone:this.guestPhone,
        Gtime:this.Gtime,
        note:this.guestReason

      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      
      this.$nextTick(() => {
        this.init()
      })

      this.$router.push({path: '/Visitor'})
      

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
