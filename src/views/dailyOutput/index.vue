<template>
  <div class="wrap" id="wrap">
    <div class="data-table">
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
                v-tap="(e)=>vueTouch(e, index)"
                :key="index"
                :id="index"
                class="tablerow"
              >
                <td width="120px">{{index+1}}</td>
                <td width="120px">{{productionObject.指令单号}}</td>
                <td width="120px">{{productionObject.指令数}}</td>
                <td width="120px">{{productionObject.当日派工数}}</td>
                <td width="120px">{{productionObject.当日汇报数量}}</td>
                <td width="120px">{{productionObject.累计汇报数量}}</td>
                <td width="120px">{{productionObject.指令欠数}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { JDGetProduction } from "@/api/getData";
import { Popup, TransferDom } from "vux";
import $ from "jquery";
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      show: false,
      tableHead: [
        "序号",
        "线别",
        "指令数",
        "今日任务双数",
        "今天完成数",
        "累计汇报数量",
        "指令次数"
      ],
      width: "",
      productionModel: [],
      productionObject: {
        FBillNo: "",
        FShortName: "AITA_成型66线",
        Flevel: 3,
        PicUrl: "",
        尺码: "",
        工厂型体: "",
        当日汇报数量: 44,
        当日派工数: 0,
        当月累计数量: 0,
        指令单号: "AITA_成型1线",
        指令数: 1310,
        指令欠数: 80,
        生产线别: "线别小计",
        累计汇报数量: 1230
      }
    };
  },
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  mounted() {
    this.width = this.tableHead.length * 120;
    this.getProduction();
  },
  methods: {
    vueTouch(e, index) {
      this.$router.push({
        path: "/dailyOutput/info",
        query: {
          params: this.productionModel[index].FShortName
        }
      });
    },
    log() {},
    close() {},
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
      scrollAreaEl.on('touchmove mousewheel', function(e) {
        e.preventDefault();
      });

      //固定上左表头的滚动
      myScroll.on('scroll', updatePosition);
      myScroll.on('scrollEnd', updatePosition);

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
    async getProduction() {
      let data = await JDGetProduction({
        level: 3,
        FShortName: '成型',
        FBillNo: ''
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.productionModel = eval(data);
      this.$nextTick(() => {
        this.init();
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
@import "../../../main.css";
.date {
  // height: @rem*88;
  padding: @rem*20;
  background: white;
  text-align: center;
  color: #333333;
  font-size: @rem*28;
}
ul {
  background: white;
  .mt20;
  li {
    padding: @rem*20;
    display: flex;
    justify-content: space-between;
    font-size: @rem*32;
    border-bottom: 1px solid #eee;
    .title {
      color: #666;
    }
    .content {
      color: #333;
    }
  }
}
.tablerow {
  border-bottom: 1px solid #f5f5f5;
}
</style>
