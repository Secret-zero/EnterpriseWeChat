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
            v-model="form.BeginDate"
            @click="showPlugin"
          >
        </div>
        <span>至</span>
        <div class="choose">
          <input
            placeholder="请选择结束时间"
            readonly="readonly"
            unselectable="on"
            v-model="form.EndDate"
            @click="showPlugin2"
          >
        </div>
      </div>
      <div class="title">条件</div>
      <div class="number">
        <input type="text" placeholder="请选择条件" v-model="value" readonly @click='showPopupPicker= true'>
      </div>
      <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="data" v-model="value5" @on-change='change'></popup-picker>
      <div class="searchButton" @click="search">查询</div>
    </div>
  </div>
</template>

<script>
import { Datetime, DatetimePlugin, PopupPicker } from "vux";
import { JDGetProcessOutputReport, JDGetProcessOutputReportDetail } from '@/api/getData'
import { mapState } from 'vuex'
import Vue from "vue";
import { userInfo } from 'os';
Vue.use(DatetimePlugin);
const date = new Date
const dateToday = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) )+ '-' + (date.getDate())
export default {
  data() {
    return {
      value: '',
      value5: [],
      showPopupPicker: false,
      data: [[]],
      form: {
        BeginDate: dateToday,
        EndDate: dateToday,
        FWeixinOpenID: "",
        FDeptID: "",
        suitID: "1",
        FItemID: ''
      },
      show: false,
      startDate: "",
      endDate: "",
      visibility: false,
      visibility2: false,
      widths: 100,
      tableHead: ["订单编号", "订单日期", "物料名称物料名称", "币别", "金额"],
      orderList: [],
      list: []
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.mutations.userInfo,
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {
    PopupPicker,
    Datetime
  },
  mounted() {
    this.getSearchList()
  },
  methods: {
    async getSearchList() {
      let data = await JDGetProcessOutputReport({SearchType: 'weixin', suitID: '1'})
      // this.$store.commit('SET_CONDITIONLIST', eval(data))
      this.list = eval(data)
      this.list.forEach((item) => {
        this.data[0].push(item.FItemName)
      })
      this.change(this.data[0])
      this.search()      
    },
    // 搜索
    async search() {
      this.$emit('close', false);
      this.$emit('changeFItemID',this.form.FItemID);//改变父级条件ID
      this.form.FWeixinOpenID = this.wxOpenId
      this.form.FDeptID = this.userInfo[0].FDepartmentID
      this.form.FEmpNumber = this.userInfo[0].Fnumber
      this.$store.commit('SET_YIELDLIST', [])
      this.$store.commit("updateLoadingStatus", { isLoading: true });
      try {
        let data = await JDGetProcessOutputReportDetail(this.form)
        this.$store.commit('SET_YIELDLIST', eval(data))
        this.$store.commit('updateLoadingStatus', {isLoading: false})
      } catch (error) {
        this.$store.commit('updateLoadingStatus', {isLoading: false})
      }
    },
    // 控制开始时间控件
    showPlugin() {
      let _this = this;
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: this.form.BeginDate,
        onConfirm(val) {
          //console.log("plugin confirm", val);
          _this.form.BeginDate = val;
        },
        onShow() {
          //console.log("plugin show");
        },
        onHide() {
          //console.log("plugin hide");
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
        value: this.form.EndDate,
        onConfirm(val) {
          _this.form.EndDate = val;
          //console.log("plugin confirm", val);
        },
        onShow() {
          //console.log("plugin show");
        },
        onHide() {
          //console.log("plugin hide");
        }
      });
    },
    onConfirm() {},
    log() {},
    popup() {},
    change(val) {
      //console.log(val)
      this.value5 = val
      this.value = val[0]
      this.form.FItemID = this.list.filter((item) => {
        return item.FItemName === val[0]
      })[0].FItemID
    }
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
