<template>
  <div class="wrap" id="wrap" style="height: 100vh;background: white;">
    <div class='head'>
      <div class='headImg'>
        <img src='../../assets/images/canquan.png'>
      </div>
      <div class='invita mt30'>
        <div class='title'>邀请人:</div>
        <div class='content'>{{guestInvitationQRCodeObject.name}}</div>
      </div>
      <div class='invita mt20'>
        <div class='title'>拜访人:</div>
        <div class='content'>{{guestInvitationQRCodeObject.Gname}}</div>
      </div>
      <div class='invita mt20'>
        <div class='title'>预约日期：</div>
        <div class='content'>{{guestInvitationQRCodeObject.Gtime}}</div>
      </div>
    </div>
    
    <div class='code'>
      <div class='codeImg'>
        <!-- <img :src='guestInvitationQRCodeObject.picUrl'> -->
        <qrcode :value="picUrl" type="img"></qrcode>
      </div>
      <p class='mt20'>扫一扫上面的二维码，显示来访详细信息</p>
    </div>
	</div>
</template>

<script>
import { JDGuestInvitationQRCodeList  } from '@/api/getData'
import { Qrcode } from 'vux'
import $ from 'jquery'
import { baseUrl,h5Url } from '../../config/env'
export default {
  data() {
    return {
      guestInvitationQRCodeObject:{},
      picUrl:''
		};
  },
  directives: {
  },
  components: {
    Qrcode
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
      console.log(this.$route.query.id);
      let data = await JDGuestInvitationQRCodeList({
        id:this.$route.query.id
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.guestInvitationQRCodeObject = eval(data)[0];
      this.picUrl=baseUrl+"/ErpForWeixinServer.asmx/GuestInvitationQRCode?id="+this.guestInvitationQRCodeObject.id+
      "&url="+"http://work.goldemperor.com/qy/#/invitationDetails?id="+this.guestInvitationQRCodeObject.id;
      console.log(this.picUrl);
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.mt30{
  margin-top: @rem*30;
}
.head{
  border-bottom: 1px solid #eeeeee;
  background: white;
  height: @rem*696;
  display: flex;
  flex-direction: column;
  align-items:center;
  .headImg{
    margin-top: @rem*80;
    .wh(@rem*240,@rem*240);
    img{
      .wh(100%, 100%);
      border-radius: 100%;
    }
  }
  .invita{
    font-size: @rem*36;
    display: flex;
    align-items: center;
    .title{
      color: #666;
    }
    .content{
      color: #333;
    }
  }
}
.code{
  display: flex;
  flex-direction: column;
  align-items: center;
  .codeImg{
    margin-top: @rem*50;
  }
  p{
    color: #666;
  }
}
</style>
