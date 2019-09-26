<style>
  .yield .vux-cell-box:not(:first-child):before{
    border: none !important;
  }
</style>

<template>
  <div class="wrap yield" id="wrap">
    <!-- <datetime v-model="startDate" @on-change="change"  :show.sync="visibility" style="display: none"></datetime>
    <datetime v-model="endDate" @on-change="change"  :show.sync="visibility2" style="display: none"></datetime>-->
    <div class="searchBox">
      <div class="title">日期范围</div>
      <div class="date">
        <div class="choose">
          <input
            placeholder="请选择开始时间"
            readonly="readonly"
            v-model="form.FStartTime"
            @click="showPlugin"
            @on-change="change"
          >
        </div>
        <span>至</span>
        <div class="choose">
          <input
            placeholder="请选择结束时间"
            readonly="readonly"
            unselectable="on"
            v-model="form.FEndTime"
            @click="showPlugin2"
            @on-change="change"
          >
        </div>
      </div>
      <!-- <div class="title">条件</div>
      <div class="number">
        <input type="text" placeholder="请选择条件" v-model="form.Model" readonly @click='showPopupPicker= true'>
      </div> -->
      <!-- <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="data" v-model="value5"></popup-picker> -->
      <div class="searchButton" @click="search">查询</div>
    </div>
  </div>
</template>

<script>
import { Datetime, DatetimePlugin, PopupPicker } from "vux";
import Vue from "vue";
import { mapState } from "vuex";
import { JDGetReportedDetails } from '@/api/getData'
Vue.use(DatetimePlugin);
import moment from 'moment'

export default {
  data() {
    return {
      value5: [],
      showPopupPicker: false,
      data: [['按工序汇总产量', '产量原单明细']],
      form: {
        FStartTime: moment(new Date()).format('YYYY-MM-DD'),
        FEndTime: moment(new Date()).format('YYYY-MM-DD'),
        FWeixinOpenID :'oNESquBQPpQM-Ho3RF5U3ENdq6bU'
      },
      show: false,
      startDate: "",
      endDate: "",
      visibility: false,
      visibility2: false,
      widths: 100,
      tableHead: ["编号", "序号", "名字", "数量"],
      orderList: []
    };
  },
  computed: {
    ...mapState({
			wxOpenId: state => state.mutations.wxOpenId,
      userInfo: state => state.mutations.userInfo
    })
  },
  components: {
    PopupPicker,
    Datetime
  },
  mounted() {
  },
  methods: {
    // 搜索
    search() {
      this.$store.commit("updateLoadingStatus", { isLoading: true });
      try {
        this.form.FWeixinOpenID=this.wxOpenId;
        JDGetReportedDetails(this.form).then(res => {
          console.log(res);
          // this.orderList = res
          this.$store.commit("SAVE_ORDERLIST", res);
          this.$nextTick(() => {
            this.$emit("init");
          });
        });
        this.$emit("close");
      } catch (error) {
      } finally {
        this.$emit("close");
        this.$store.commit("updateLoadingStatus", { isLoading: false });
      }
    },
    // 控制开始时间控件
    showPlugin() {
      let _this = this;
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: _this.form.FStartTime,
        onConfirm(val) {
          console.log("plugin confirm", val);
          _this.form.FStartTime = val;
        },
        onShow() {
          console.log("plugin show");
        },
        onHide() {
          console.log("plugin hide");
        },
        change(value){
          _this.form.FStartTime = value;
          console.log('change', value)
        }
      });
    },
    // 控制结束时间 控件
    showPlugin2() {
      let _this = this;
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: _this.form.FEndTime,
        onConfirm(val) {
          _this.form.FEndTime = val;
          console.log("plugin confirm", val);
        },
        onShow() {
          console.log("plugin show");
        },
        onHide() {
          console.log("plugin hide");
        },
        change(value){
          _this.form.FEndTime = value;
          console.log('change', value)
        }
      });
    },
    onConfirm() {},
    log() {},
    popup() {
      alert("0");
    },
    change () {
      
    },
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
// @import "../../../main.css";
.searchBox {
  background: white;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
  padding: @rem*20;
  .title {
    font-size: @rem*28;
    height: @rem*60;
    line-height: @rem*60;
    color: #666;
  }
  .date {
    display: flex;
    align-items: center;
    span {
      width: @rem*50;
      text-align: center;
      font-size: @rem*28;
    }
    .choose {
      width: @rem*312;
      height: @rem*72;
      border-radius: 4px;
      border: solid 1px #e6e6e6;
      input {
        text-align: center;
        border-radius: 4px;
        height: 100%;
        width: 100%;
        border: none;
      }
    }
  }
  .number {
    height: @rem*72;
    border: solid 1px #e6e6e6;
    border-radius: 4px;
    input {
      padding-left: @rem*20;
      border-radius: 4px;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  .searchButton {
    margin-top: @rem*25;
    text-align: center;
    font-size: @rem*36;
    color: white;
    line-height: @rem*80;
    height: @rem*80;
    width: 100%;
    border-radius: 4px;
    .bisColor(#d93309, #aa0000);
  }
}
</style>
