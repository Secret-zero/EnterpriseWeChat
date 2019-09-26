<template>
  <div class="wrap" id="wrap">
    <search @click.native='show = true'></search>
    <div v-transfer-dom>
      <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')" position="top">
        <order-search @close="close" @init="init"></order-search>
      </popup>
    </div>
    <div class='date'>
      <div @click="GetReportedDetails('yesterday')">昨日</div>
      <div @click="GetReportedDetails('today')">今日</div>
      <div @click="GetReportedDetails('month')">当月</div>
    </div>
    <div class="data-table mt20">
      <div class="t_r">
        <div class="t_r_t">
          <table :style="`width:${width}px`">
            <tbody>
              <tr>
                <th v-for="(item, key) in tableHead" :key="key" style="width: 120px;">{{item}}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="t_r_content">
          <table :style="`width:${width}px`">
            <tbody>
              <tr
                v-for="(reportedDetailsObject, index) in reportedDetailsModel"
              
                :key="index"
                :id="index"
                class="tablerow"
              >
                <td width="120">{{reportedDetailsObject.FProductName }}</td>
                <td width="120">{{reportedDetailsObject.FProcessNumber}}</td>
                <td width="120">{{reportedDetailsObject.FProcessName}}</td>
                <td width="120">{{reportedDetailsObject.FQty}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import Search from '@/components/search'
import orderSearch from './search'
import { JDGetReportedDetails } from '@/api/getData'
import { Popup, TransferDom } from 'vux'
import $ from 'jquery'
import moment from 'moment'
import { mapState } from "vuex";
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      show: false,
      tableHead: ["编号", "序号", "名字", "数量"],
      width: '',
      reportedDetailsModel:[],
      reportedDetailsObject:{},
      FStartTimeValue:'',
      FEndTimeValue:''
      
		};
  },
  directives: {
    TransferDom
  },
   computed: {
    ...mapState({
			wxOpenId: state => state.mutations.wxOpenId,
      orderList:state => state.mutations.orderList
     
    })
  },
  components: {
    Search,
    Popup,
    orderSearch
  },
  mounted() {
    this.width = this.tableHead.length * 120
    this.GetReportedDetails('today');
	},
	methods: {
    log() {

    },
    close() {
      this.show = false
      this.reportedDetailsModel=this.orderList;
    },
    init() {
      // alert('0')
      var win = $(window),
        scrollAreaEl = $(".t_r_content"),
        leftFreezeEl = $(".t_l_freeze"),
        leftTableEl = leftFreezeEl.find("table"),
        rightTableEl = $(".t_r_t table");

      //动态计算容器最大高度
      function adjustHeight() {
        var winHeight = win.height(),
          tableHeight = winHeight - 90;
        leftFreezeEl.height(tableHeight);
        scrollAreaEl.height(tableHeight);
      }

      adjustHeight();
      win.on("resize", adjustHeight);

      //设置iscroll
      var myScroll = new IScroll(".t_r_content", {
        scrollX: true,
        scrollY: true,
        probeType: 3
      });

      //阻止默认滚动
      scrollAreaEl.on("touchmove mousewheel", function(e) {
        e.preventDefault();
      });

      //固定上左表头的滚动
      myScroll.on("scroll", updatePosition);
      myScroll.on("scrollEnd", updatePosition);

      function updatePosition() {
        var a = this.y;
        var b = this.x;
        leftTableEl.css(
          "transform",
          "translate(0px, " + a + "px) translateZ(0px)"
        );
        rightTableEl.css(
          "transform",
          "translate(" + b + "px, 0px) translateZ(0px)"
        );
      }
    },
    // async yesterdayNotes(){
    //   this.GetReportedDetails("yesterday");
    // },
    // async todayNotes(){
    //   this.GetReportedDetails("today");
    // },
    // async monthNotes(){
    //   this.GetReportedDetails("month");
    // },
    async GetReportedDetails(Type){
      
      if(Type=="today"){
        this.FStartTimeValue=moment(new Date()).format('YYYY-MM-DD');
        this.FEndTimeValue=moment(new Date()).format('YYYY-MM-DD');

      }
      if(Type=="yesterday"){
        this.FStartTimeValue=moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD');
        this.FEndTimeValue=moment().subtract('days', 1).format('YYYY-MM-DD');
      }
      if(Type=="month"){
        this.FStartTimeValue=moment().subtract('month', 0).format('YYYY-MM') + '-01';
        this.FEndTimeValue=moment(new Date()).format('YYYY-MM-DD');
      }
      console.log(this.FStartTimeValue+this.FEndTimeValue);
      let data = await JDGetReportedDetails({
        FWeixinOpenID :this.wxOpenId,
        FStartTime:this.FStartTimeValue,
        FEndTime:this.FEndTimeValue
      });
      console.log(eval(data));
      //this.$store.commit('SAVE_ORDERLIST', eval(data));
      this.reportedDetailsModel = eval(data);
      //this.reportedDetailsModel=this.orderList;
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
  .mt20;
  li{
    padding: @rem*20;
    display: flex;
    justify-content: space-between;
    font-size: @rem*32;
    border-bottom: 1px solid #eee;
    .title{
      color: #666;
    }
    .content{
      color: #333;
    }
  }
}
.tablerow{
  border-bottom: 1px solid #f5f5f5;
}
</style>
