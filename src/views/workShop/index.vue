<template>
  <div class="wrap" id="wrap">
    <div class="head">
      <div class="title">车间选择</div>
      <div class="content">
        <select style="width:200px" v-model="workShopSelected" @change="changeWorkShop">
          <option
            v-for="(item,index) in workShop"
            :value="item.FItemID"
            :key="index"
            name="sendValue"
          >
            {{item.FName}}
          </option>
        </select>
        <i class="iconfont icon-iconfontyoujiantou"></i>
      </div>
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
                v-tap="(e)=>vueTouch(e, index)"
                :key="index"
                :id="index"
                class="tablerow"
              >
                <td width="120">{{index+1}}</td>
                <td width="120">{{productionObject.车间地点}}</td>
                <td width="120">{{productionObject.组别}}</td>
                <td width="120">{{productionObject.带线干部}}</td>
                <td width="120">{{productionObject.今日目标产量}}</td>
                <td width="120">{{productionObject.今日产量}}</td>
                <td width="120">{{productionObject.完成率}}</td>
                <td width="120">{{productionObject.月累计目标产量}}</td>
                <td width="120">{{productionObject.月累计产量}}</td>
                <td width="120">{{productionObject.月完成率}}</td>
                <td width="120">{{productionObject.实际人数}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { JDGetWorkShop, JDGetPrdShopDayReport } from "@/api/getData";
import { Popup, TransferDom } from "vux";
import $ from "jquery";
import { mapState } from "vuex";
import moment from 'moment'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      show: false,
      tableHead: [
        "序号",
        "车间地点",
        "组别",
        "带线干部",
        "今日目标产量",
        "今日产量",
        "完成率",
        "月累计目标产量",
        "月累计产量",
        "月完成率",
        "实际人数"
      ],
      width: "",
      productionModel: [],
      productionObject: {
        fdeptid: "351884",
        今日产量: 2400,
        今日目标产量: 2400,
        完成率: "100%",
        实际人数: 22,
        带线干部: "尹杰文",
        月完成率: "0%",
        月累计产量: 0,
        月累计目标产量: 22050,
        组别: "裁断1组",
        车间地点: "金帝b幢一层"
      },
      workShop: [],
      workShopSelected:'1'
    };
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId,
      userInfo: state => state.mutations.userInfo
    })
  },
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  mounted() {
    this.width = this.tableHead.length * 120;
    this.getWorkShop();
    this.getPrdShopDayReport();
  },
  methods: {
    vueTouch(e, index) {
      this.$router.push({path: '/workshop/info',query:{
          FShortName:this.productionModel[index].组别
        }
      })
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
    async getWorkShop () {
      let data = await JDGetWorkShop();
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.workShop = eval(data);
    },
    changeWorkShop () {
      console.log(this.workShopSelected);
      this.getPrdShopDayReport();
    },
    async getPrdShopDayReport () {
      console.log(this.workShop.FItemID);
      let data = await JDGetPrdShopDayReport({
        Exec_TodayDateTime:moment(new Date()).format('YYYY-MM-DD HH:mm'),
        Exec_Where:'where t.FWorkShopID='+ this.workShopSelected
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
.head {
  display: flex;
  justify-content: space-between;
  padding: @rem*20;
  font-size: @rem*32;
  background: white;
  .title {
    color: #666;
  }
  .content {
    color: #333;
    i {
      font-size: 18px;
      color: #666;
    }
  }
}
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
