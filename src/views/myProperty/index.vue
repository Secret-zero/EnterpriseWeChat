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
  <div class="wrap myProperty" id="wrap">
    <loading :show="show1" :text="text1"></loading>
    <tab v-model="value" prevent-default @on-before-index-change="switchTabItem" style="height: 44px;">
      <tab-item selected>我的财产</tab-item>
      <tab-item>移交报废待批</tab-item>
      <tab-item>监管财产</tab-item>
      <tab-item>财产盘点</tab-item>
    </tab>
    <div class='list' style="background: #e2e2e2;">
      <ul>
        <li v-for='(item, index) in result' :key='index' class='mt20' :style="index%2 === 0 ? 'background: #F6F6F6' : 'background: #fff'">
          <div class='itemLeft' @click='toInfo(index)'>
            <div class='mt10'>财产编号：{{item.FNumber}}</div>
            <div class='mt10'>财产名称：{{item.FName}}</div>
            <div class='mt10'><span class='i2em'></span>规格：{{item.FModel}}</div>
            <div class='mt10'><span class='i2em'></span>数量：{{item.FQty}}</div>
          </div>
          <div class='itemRight' @click='changeStatus(index)' v-if='value === 0'>
            <div class='unselect' v-if='!item.status'></div>
            <icon class='icon' type="success" v-else></icon>
          </div>
        </li>
      </ul>
    </div>
    <div class='buttons' v-if='value === 0'>
      <ul>
        <li @click='selectedAll'>全选</li>
        <li @click='remove'>移交</li>
        <li @click='Scrap'>报废/出售</li>
      </ul>
    </div>
    <!-- <div class='Scan'>
      <div class='tips'>找到实物，用微信扫一扫对应的二维码</div>
      <x-button :gradients="['#d93309', '#aa0000']" class='confirm mt20'>提交</x-button>
    </div> -->
	</div>
</template>

<script>
// import { setTimeout } from 'timers';
import { TabItem, Tab, Loading, Icon, XButton } from 'vux'
import { mapState } from 'vuex'
import { JDGetWeixinFACardInfo, JDGetWeixinFARemoveCardInfo, JDGetWeixinManagerFACardInfo, JDGetWeixinInventory} from '@/api/getData'
export default {
  data() {
    return {
      value: 0,
      show1: false,
      text1: 'loading',
      result: []
		};
  },
  components: {
    Tab,
    TabItem,
    Loading,
    Icon,
    XButton
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  mounted() {
    this.switchTabItem(0)
	},
	methods: {
    // 报废
    Scrap() {
      let ScrapList = this.result.filter((item) => {
        return item.status
      })
      if (ScrapList.length === 0) {
        this.$vux.toast.text('请选择财产进行处理')
        return
      }
      this.$store.commit('SET_SCRAPLIST', ScrapList)
      this.$router.push({path: '/myProperty/Scrap'})
    },
    // 移交财产
    remove() {
      let removeList = this.result.filter((item) => {
        return item.status
      })
      if (removeList.length === 0) {
        this.$vux.toast.text('请选择财产进行处理')
        return
      }
      this.$store.commit('SET_REMOVELIST', removeList)
      this.$router.push({path: '/myProperty/transfer'})
      console.log(removeList)
    },
    toInfo(index) {
      this.$router.push({path: '/myProperty/info', query: {FInterID: this.result[index].FinterID}})
    },
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.show1 = true
      setTimeout(() => {
        this.result = []
        this.show1 = false
        this.value = index
        if (index === 0) {
          this.getMyproperty()
        } else if (index === 1) {
          this.getRemoveCardInfo()
        } else if (index === 2) {
          this.getManagerFACardInfo()
        } else {
          this.getWeixinInventory()
        }
      }, 1000)
    },
    selectedAll() {
      this.result.forEach((item) => {
        this.$set(item, 'status', !item.status)
      })
    },
    // 改变状态
    changeStatus(index) {
      this.$set(this.result[index], 'status', !this.result[index].status)
    },
    //获得我的财产信息
    async getMyproperty() {
      let data = await JDGetWeixinFACardInfo({FWeixinOpenID: this.wxOpenId})
      console.log(data)
      this.result = eval(data)
      this.result.forEach((item) => {
        this.$set(item, 'status', false)
      })
    },
    //获取微信中个人的移交待批财产信息
    async getRemoveCardInfo() {
      let data = await JDGetWeixinFARemoveCardInfo({FWeixinOpenID: this.wxOpenId})
      console.log(data)
      this.result = eval(data)
    },
    // 监管财产
    async getManagerFACardInfo() {
      let data = await JDGetWeixinManagerFACardInfo({FWeixinOpenID: this.wxOpenId})
      console.log(data)
      this.result = eval(data)
    },
    // 获取微信中盘点信息
    async getWeixinInventory() {
      let data = await JDGetWeixinInventory({FWeixinOpenID: this.wxOpenId})
      console.log(data)
      this.result = eval(data)
    },
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
@import '~vux/src/styles/reset.less';
[class^="weui-icon-"]:before, [class*=" weui-icon-"]:before{
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.i2em{
  display: inline-block;
  width: 2em;
}
.list{
  padding: @rem*20;
  padding-bottom: @rem*120;
  ul{
    li{
      background: white;
      border-radius: 5px;
      display: flex;
      padding: @rem*20;
      .itemLeft{
        flex: 1;
        font-size: @rem*24;
        color: #333;
      }
      .itemRight{
        display: flex;
        align-items: center;
        .icon{
          font-size: 24px;
          color: #aa0000;
        }
        .unselect{
          width: 24px;
          height: 24px;
          border:  1px solid #c9c9c9;
          border-radius: 100%;
        }
      }
    }
  }
}
.buttons{
  background: white;
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
.Scan{
  position: fixed;
  bottom: 0;
  left: 0;
  width:100%;
  padding: @rem*20;
  background: white;
  .tips{
    text-align: center;
    font-size: @rem*24;
    color:#aa0000;
  }
  .confirm{
    width: 95%;
    left: 2.5%;
  }
}
</style>
