<style>
  .myProperty .vux-tab .vux-tab-item.vux-tab-selected{
    color: #c82106 !important;
    border-bottom: 3px solid #c82106 !important;
  }
  .myProperty .vux-tab-ink-bar {
    background-color: #c82106 !important;
  }
</style>

<template>
  <div class="wrap myProperty" id="wrap" style="height: 100vh;background: white;">
    <loading :show="show1" :text="text1"></loading>
    <tab v-model="value" prevent-default @on-before-index-change="switchTabItem" style="height: 44px;">
      <tab-item selected>有效卡券</tab-item>
      <tab-item>已使用卡券</tab-item>
      <tab-item>失效卡券</tab-item>
    </tab>
    <div class='list'>
      <ul>
        <li v-for='(item, index) in result' class='mt20' :key='index'>
          <div class='cardImg'>
            <img v-if='item.ThreeMealsFlag == 1' src='../../assets/images/zaocanquan.png'>
            <img v-if='item.ThreeMealsFlag == 3' src='../../assets/images/wancanquan.png'>
            <img v-if='item.ThreeMealsFlag == 2' src='../../assets/images/canquan.png'>
          </div>
          <div class='cardRight'>
            <div class='name'>{{item.FThreeMealsName}}</div>
            <div class='time'>有效期：{{item.EffectiveDate}} {{item.FUsefulTime}}</div>
          </div>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
// import { setTimeout } from 'timers';
import { TabItem, Tab, Loading, Icon } from 'vux'
import { JDGetQRCodeView } from '@/api/getData'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: 0,
      show1: false,
      text1: 'loading',
      result: ''
		};
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {
    Tab,
    TabItem,
    Loading,
    Icon
  },
  mounted() {
    this.switchTabItem(0)
	},
	methods: {
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.show1 = true
      setTimeout(() => {
        this.show1 = false
        this.value = index
        this.getInfo(index + 1)
      }, 1000)
    },
    async getInfo(value) {
      let data = await JDGetQRCodeView({FType: value, FWeixinOpenID: this.wxOpenId})
      console.log(data)
      this.result = eval(data)
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
@import '~vux/src/styles/reset.less';
.i2em{
  display: inline-block;
  width: 2em;
}
.list{
  padding: @rem*20;
  ul{
    li{
      width: 100%;
      height: @rem*180;
      background: url(../../assets/images/cardBg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      .cardImg{
        width: 27%;
        .v-flex;
        img{
          width: @rem*120;
          height: @rem*120;
          display: block;
        }
      }
      .cardRight{
        margin-left: @rem*20;
        .name{
          height: @rem*100;
          line-height: @rem*100;
          font-size:@rem*32;
          color: #333;
        }
        .time{
          color: #aa0000;
          font-size: @rem*24;
        }
      }
    }
  }
}
.buttons{
  position: fixed;
  bottom: 0;
  width: 100%;
  ul{
    width: 100%;
    padding: @rem*20;
    display: flex;
    li{
      margin-right: @rem*35;
      color: white;
      .bisColor(#d93309, #aa0000);
      border-radius: 3px;
      width: @rem*210;
      height: @rem*68;
      font-size: @rem*28;
      text-align: center;
      line-height: @rem*68;
    }
    li:nth-child(3){
      margin-right: 0;
    }
  }
}
</style>
