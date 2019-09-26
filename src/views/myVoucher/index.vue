<template>
  <div class="wrap" id="wrap" style='height: 100vh;background: white;'>
    <div class='voucherBox'>
      <div class='qrcode'>
        <div class='codeImg'>
          <!-- <img src='../../assets/images/code.jpg'> -->
          <qrcode v-if='result' :value="qrcode" type="img" class='qrcodeImg'></qrcode>
        </div>
        <div class='personal'>
          <div v-if='result.name'><span class='i2em'></span>姓名：{{result.name}}</div>
          <div class='mt10' v-if='result.ThreeMealsFlag == 1'>餐券类型：早餐券</div>
          <div class='mt10' v-if='result.ThreeMealsFlag == 2'>餐券类型：午餐券</div>
          <div class='mt10' v-if='result.ThreeMealsFlag == 3'>餐券类型：晚餐券</div>
          <div class='mt10' v-if='result.name'>有效时间：{{result.EffectiveDate}} {{result.FStartTime}} 至 {{result.FEndTime}} <span v-if='result.ThreeMealsFlag === 2'>,{{result1.FStartTime}} 至 {{result1.FEndTime}}</span></div>
        </div>
      </div>
      <div class='times'>
        <div class='button' @click='look'>查看卡券</div>
        <div class='time mt10' v-for='(item, index) in timeList' :key='index'>{{item.FThreeMealsName}}： {{item.FStartTime}}至{{item.FEndTime}}</div>
      </div>
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { JDGetQRCode, JDGetQRCodeTime } from '@/api/getData'
import { Qrcode } from 'vux'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      qrcode: '',
      result: '',
      timeList: [],
      result1: ''
		};
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {
    Qrcode
  },
  mounted() {
    console.log(document.body.clientHeight)
    this.getQRcode()
    this.getTime()
	},
	methods: {
    async getTime() {
      let res = await JDGetQRCodeTime()
      console.log(eval(res))
      this.timeList = eval(res)
    },
    async getQRcode() {
      let data = await JDGetQRCode({FWeixinOpenID: this.wxOpenId})
      console.log('data', eval(data))
      this.result = eval(data)[0]
      if (eval(data)[1]) {
        this.result1 = eval(data)[1]
      }
      this.qrcode = this.result.FInterID + ',' + this.result.EmpID
    },
    look() {
      this.$router.push({path: '/voucherlist'})
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.i2em{
  display: inline-block;
  width: 2em;
}
.voucherBox{
  width: @rem*690;
  margin-left: @rem*30;
  background: url(../../assets/images/quanBg.png) no-repeat;
  background-size: 100% 100%;
  height: @rem*1150;
  margin-top: @rem*30;
  margin-bottom: @rem*30;
  .qrcode{
    height: 67%;
    padding-top: @rem*82;
    display: flex;
    flex-direction: column;
    align-items: center;
    .codeImg{
      width: @rem*400;
      height: @rem*400;
      background: url(../../assets/images/box.png) no-repeat;
      background-size: 100% 100%;
      .qrcodeImg{
        .v-flex;
        width: 100%;
        height: 100%;
        img{
          .wh(100%, 100%)
        }
      }
      .v-flex;
    }
    .personal{
      text-align: center;
      margin-top: @rem*30;
      color: #666;
      font-size: @rem*28;
    }
  }
  .times{
    display: flex;
    flex-direction: column;
    align-items: center;
    .button{
      .bisColor(#d93309, #aa0000);
      color: white;
      border-radius:  @rem*88;
      text-align: center;
      height: @rem*88;
      line-height: @rem*88;
      font-size: @rem*38;
      margin: 0 auto;
      margin-top: @rem*40;
      width: @rem*480;
    }
    .time{
      font-size: @rem*32;
      color:#666;
    }
  }
}
</style>
