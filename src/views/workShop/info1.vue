<template>
  <div class="wrap" id="wrap">
    <div class='head'>
      <div class='title'>线别</div>
      <div class='content'>{{FShortName}}</div>
    </div>
    <div class='head'>
      <div class='title'>指令单数</div>
      <div class='content'>{{FBillNo}}</div>
    </div>
    <div class='head'>
      <div class='title'>工厂型体</div>
      <div class='content'>{{FModel}}</div>
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
                v-for="(productionObject, index) in productionModel"
                :key="index"
                :id="index"
                class="tablerow"
              >
                <td width="120">{{index+1}}</td>
                <td width="120">{{productionObject.尺码}}</td>
                <td width="120">{{productionObject.指令数}}</td>
                <td width="120">{{productionObject.当日派工数}}</td>
                <td width="120">{{productionObject.当日汇报数量}}</td>
                <td width="120">{{productionObject.累计汇报数量}}</td>
                <td width="120">{{productionObject.指令欠数}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { JDGetProduction } from '@/api/getData'
import $ from 'jquery'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      tableHead: ['序号', '尺码', '指令数', '当日派工数', '当日汇报数量', '累计汇报数量', '指令欠数'],
      width: '',
      productionModel:[],
      FShortName:this.$route.query.FShortName,
      FBillNo:this.$route.query.FBillNo,
      FModel:this.$route.query.FModel ,
      FWorkCardInterID:this.$route.query.FWorkCardInterID
		};
  },
  directives: {
  },
  components: {
  },
  mounted() {
    this.width = this.tableHead.length * 120,
    this.getProductionInfo()
	},
	methods: {
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
    async getProductionInfo() {
      console.log(this.$route.query.FShortName,this.$route.query.FBillNo,this.$route.query.FWorkCardInterID);
      let data = await JDGetProduction({
        level: 1,
        FShortName:  this.$route.query.FShortName,
        FBillNo: this.$route.query.FShortName.indexOf('成型') !== -1?this.$route.query.FBillNo:this.$route.query.FWorkCardInterID
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.productionModel = eval(data);
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
.head{
  display: flex;
  justify-content: space-between;
  padding: @rem*20;
  font-size: @rem*32;
  background: white;
  .title{
    color: #666;
  }
  .content{
    color: #333;
  }
}
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
</style>
