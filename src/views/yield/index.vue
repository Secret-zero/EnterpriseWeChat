<template>
  <div class="wrap" id="wrap">
    <search @click.native='show = true'></search>
    <div v-transfer-dom>
      <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')" position="top">
        <order-search @close="close" @init="init" @changeFItemID="changeFItemID"></order-search>
      </popup>
    </div>
   
    <div class='date' v-if='yieldList[0]'>
      <span v-if="FItemID == 1020">{{yieldList[0].日期}}</span>
      <span v-else>{{yieldList[0].单号}}</span>
    </div>
    <div class="data-table mt20">
      <div class="t_r">
        <div class="t_r_t">
          <table :style="`width:${width}px`">
            <tbody>
              <tr v-if="FItemID == 1020">
                <th v-for="(item, key) in tableHead1" :key="key" style="width: 120px;">{{item}}</th>
              </tr>
              <tr v-else>
                <th v-for="(item, key) in tableHead" :key="key" style="width: 120px;">{{item}}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="t_r_content">
          <table :style="`width:${width}px`">
            <tbody v-if="FItemID == 1020">
              <tr
                v-for="(item, index) in yieldList"              
                :key="index"
                :id="index"
                class="tablerow"
                v-if="index > 1"
              >
                <td width='120'>{{index-1}}</td>
                <td width='120'>{{item.日期}}</td>
                <td width='120'>{{item.工号}}</td>
                <td width='120'>{{item.姓名}}</td>
                <td width='120'>{{item.产量}}</td>
                <td width='120'>{{item.金额}}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr
                v-for="(item, index) in yieldList"              
                :key="index"
                :id="index"
                class="tablerow"
                v-if="index > 1"
              >
                <td width='120'>{{index-1}}</td>
                <td width='120'>{{item.单号}}</td>
                <td width='120'>{{item.日期}}</td>
                <td width='120'>{{item.派工单号}}</td>
                <td width='120'>{{item.制程}}</td>
                <td width='120'>{{item.货号}}</td>
                <td width='120'>{{item.工序编号}}</td>
                <td width='120'>{{item.工序名称}}</td>
                <td width='120'>{{item.数量}}</td>
                <td width='120'>{{item.小单补贴百分比}}</td>
                <td width='120'>{{item.小单补贴}}</td>
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
import { JDGetProcessOutputReport } from '@/api/getData'
import { Popup, TransferDom } from 'vux'
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
  data() {
    return {
      FItemID:1003,
      show: false,
      tableHead: ["序号", "单号", "日期", "派工单号", '制程', '货号', '工序编号','工序名称', '数量', '小单补贴百分比', '小单补贴'],
      tableHead1: ["序号", "日期", "工号", '姓名', '产量', '金额'],
      width: ''
		};
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState({
      yieldList: state => state.mutations.yieldList
    })
  },
  components: {Search,Popup,orderSearch},
  mounted() {
    this.width = this.tableHead.length * 120
    this.$nextTick(() => {
      this.init()
    })
	},
	methods: {
    log() {},
    changeFItemID(val){      
      this.FItemID = val;
      this.width = this.FItemID == 1020?this.tableHead1.length * 120:this.tableHead.length * 120;
    },
    close() {this.show = false},
    init() {
      var win = $(window),
        scrollAreaEl = $(".t_r_content"),
        //leftFreezeEl = $(".t_l_freeze"),
        //leftTableEl = leftFreezeEl.find("table"),
        topTableEl = $(".t_r_t table");

      //动态计算容器最大高度
      function adjustHeight() {
        var winHeight = win.height(),
          tableHeight = winHeight - $('.searchBox').height() - $('.date').height() - 90;
        console.log(tableHeight)
        //leftFreezeEl.height(tableHeight);
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
        //leftTableEl.css("transform","translate(0px, " + this.y + "px) translateZ(0px)");
        topTableEl.css("transform","translate(" + this.x + "px, 0px) translateZ(0px)");
      }
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
@import "../../../main.css";
.date{
  // height: @rem*88;
  padding: @rem*20;
  background: white;
  text-align: center;
  color: #333333;
  font-size: @rem*28;
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
body .data-table .t_r .t_r_content{
  //overflow:scroll;
  //-webkit-overflow-scrolling: touch;
  //height: 480px;
}
</style>
