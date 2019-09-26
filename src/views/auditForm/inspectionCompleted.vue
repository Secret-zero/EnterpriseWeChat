<template>
  <div class="wrap" id="wrap" style="padding-bottom:50px">
    <popup-radio :options='years' v-model='year1' @on-change='change'></popup-radio>
    <x-input class="weui-vcode" placeholder="输入供应商查询" v-model="Supplier" :show-clear="false">
      <x-button slot="right" type="primary" mini @click.native="search">搜索</x-button>
    </x-input>
    <group>
      <label style="float:left;line-height:40px;">起始时间</label>
      <datetime style="float:left"
        v-model="startDate"
        @on-change="changeStart"
        @on-cancel="log('cancel')"
        @on-confirm="onConfirm"
        @on-hide="log('hide')"></datetime>
      <label style="float:left;line-height:40px;">结束时间</label>
      <datetime style="float:right"
        v-model="endDate"
        @on-change="changeEnd"
        @on-cancel="log('cancel')"
        @on-confirm="onConfirm"
        @on-hide="log('hide')"></datetime>
    </group>
    <div class="list" style="background: #e2e2e2;">
      <ul>
        <li
          v-for="(item, index) in result"
          :key="index"
          class="mt20"
          :style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'"
        >
          <div class="itemLeft" @click="toInfo(index)">
            <div class="mt10">单号：{{item.FNumber}}</div>
            <div class="mt10">供应商：{{item.FSupplier}}</div>
            <div class="mt10">
              <span class="i2em"></span>
              申请人：{{item.EmpName}}
            </div>
            <div class="mt10">
              <span class="i2em"></span>
              日期：{{item.ApplicationDate}}
            </div>
            <div class="mt10">
              <span class="i2em"></span>
              状态：{{item.FStatus}}
            </div>
          </div>
        </li>
      </ul>

      <div v-transfer-dom>
        <x-dialog v-model="showToast" class="dialog-demo">
          <div style="padding:15px;">
            <x-button @click.native="doShowToast" type="primary">show toast</x-button>
          </div>
          <div @click="showToast=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
      </div>
    </div>

    <tabbar style="position:fixed">
      <tabbar-item link="/auditForm">
        <span slot="label">发起申请</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionWait">
        <span slot="label">等待稽查</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionCompleted" selected>
        <span slot="label">已签收</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionException">
        <span slot="label">异常单号</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Search from "@/components/search";
import { XInput, Tabbar, TabbarItem, XButton, XDialog, Datetime, Group, TransferDomDirective as TransferDom, PopupRadio } from "vux";
import { JDGetIncomingList } from "@/api/getData";
import moment from 'moment'
export default {
  data() {
    return {
      result: [],
      showToast: false,
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment().add('days', 1).format('YYYY-MM-DD'),
      Supplier:'',
      years:['今日','近7天','近30天'],
      year1:'今日'
    };
  },
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Tabbar,
    TabbarItem,
    XButton,
    XDialog,
    Datetime,
    Group,
    PopupRadio
  },
  mounted() {
    this.getIncomingList();
  },
  methods: {
    async getIncomingList() {
      let data = await JDGetIncomingList({
        StartDate: this.startDate,
        EndDate: this.endDate,
        Supplier: this.Supplier,
        Type: "2"
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.result = eval(data);
    //   this.$nextTick(() => {
    //     this.init();
    //   });
    },
    toInfo(index) {
      this.$router.push({
        path: "/auditForm/inspectionWatch",
        query: { FInterID: this.result[index].FInterID }
      });
    },
    doShowToast () {
      this.$vux.toast.show({
        text: 'toast'
      })
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', val)
      this.getIncomingList()
    },
    // showPlugin () {
    //   this.$vux.datetime.show({
    //     cancelText: '取消',
    //     confirmText: '确定',
    //     format: 'YYYY-MM-DD HH',
    //     value: '2017-05-20 18',
    //     onConfirm (val) {
    //       console.log('plugin confirm', val)
    //     },
    //     onShow () {
    //       console.log('plugin show')
    //     },
    //     onHide () {
    //       console.log('plugin hide')
    //     }
    //   })
    // },
    changeStart (value) {
      this.startDate=value
      console.log('changeStart', value)
    },
    changeEnd (value) {
      this.endDate=value
      console.log('changeEnd', value)
    },
    search(){
      console.info(1)
      this.getIncomingList()
    },
    change (value) {
      console.log('new Value', value)
      if(value=="今日"){
        this.startDate=moment(new Date().getTime()).format('YYYY-MM-DD');
        this.endDate=moment().add('days', 1).format('YYYY-MM-DD');
      }
      if(value=="近7天"){
        this.startDate=moment(new Date().getTime() - 3600 * 24 * 7000).format('YYYY-MM-DD');
        this.endDate=moment().add('days', 1).format('YYYY-MM-DD');
      }
      if(value=="近30天"){
        this.startDate=moment(new Date().getTime() - 3600 * 24 * 30000).format('YYYY-MM-DD');
        this.endDate=moment().add('days', 1).format('YYYY-MM-DD');
      }
      this.getIncomingList()
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
</style>