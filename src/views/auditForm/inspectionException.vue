<template>
  <div class="wrap" id="wrap" style="padding-bottom:50px">
    <div class="list" style="background: #e2e2e2;" >
      <ul>
        <li
          v-for="(item, index) in result"
          :key="index"
          class="mt20"
          :style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'"
        >
          <div class="itemLeft" @click="toInfo(index)">
            <div class="mt10">单号：{{item.FInterID}}</div>
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
        <x-dialog v-model="showToast" >
          <div style="margin-top:20px">选择操作类型</div>
          <div style="padding:15px;">
            <x-button mini type="warn" style="float: left ;margin-top:10px" @click.native="doShowToast">1.异常单处理</x-button>
            <x-button mini type="warn" style="float: right ;margin-top:10px" @click.native="doShowToast1">2.异常单结案</x-button>
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
      <tabbar-item link="/auditForm/inspectionCompleted">
        <span slot="label">已签收</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionException" selected>
        <span slot="label">异常单号</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Search from "@/components/search";
import { Tabbar, TabbarItem, XButton, XDialog, TransferDom  } from "vux";
import { JDGetIncomingList } from "@/api/getData";
export default {
  data() {
    return {
      result: [],
      showToast: false,
      index: ""
    };
  },
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    XButton,
    XDialog
  },
  mounted() {
    this.getIncomingList();
  },
  methods: {
    async getIncomingList() {
      let data = await JDGetIncomingList({
        StartDate: "",
        EndDate: "",
        Supplier: "",
        Type: "3"
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.result = eval(data);
    //   this.$nextTick(() => {
    //     this.init();
    //   });
    },
    toInfo(index) {
      this.showToast=true;
      this.index = index;
    },
    doShowToast() {
      this.$router.push({
        path: "/auditForm/inspectionExceptionDeal",
        query: { FInterID: this.result[this.index].FInterID }
      });
      this.showToast = false;
    },
    doShowToast1() {
      this.$router.push({
        path: "/auditForm/inspectionExceptionCompleted",
        query: { FInterID: this.result[this.index].FInterID }
      });
      this.showToast = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
</style>
