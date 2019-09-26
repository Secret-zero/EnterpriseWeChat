<template>
  <div class="wrap" id="wrap">
    <div class='head'>
      <div class='title'>线别</div>
      <div class='content'>{{FShortName}}</div>
    </div>
    <div class='info mt20'>
      <ul>
        <li v-for='(item,index) in productionModel' v-tap="(e)=>vueTouch(e, index)"
                :key="index"
                :id="index"
                class="tablerow">
          <div class='goodsImg'>
            <img :src='item.PicUrl'>
          </div>
          <div class='goodsInfo'>
            <div>工厂型体：{{item.工厂型体}}</div>
            <div>指令单号：{{item.指令单号}}</div>
            <div>今任务数：{{item.当日派工数}}</div>
            <div>指令数量：{{item.指令数}}</div>
            <div>今日完成：{{item.当日汇报数量}}</div>
            <div>累计扫描：{{item.累计汇报数量}}</div>
            <div>指令欠数：{{item.指令欠数}}</div>
            <div v-show="false">FWorkCardInterID：{{item.FWorkCardInterID}}</div>
          </div>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
import { JDGetProduction } from '@/api/getData'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      productionModel:[],
      FShortName:this.$route.query.FShortName
		};
  },
  directives: {
  },
  components: {
  },
  mounted() {
    this.getProductionInfo()
	},
	methods: {
    vueTouch(e, index) {
      this.$router.push({path: '/workshop/info1',query:{
          FShortName:this.FShortName,
          FBillNo:this.productionModel[index].指令单号,
          FModel:this.productionModel[index].工厂型体,
          FWorkCardInterID:this.productionModel[index].FWorkCardInterID
        }
      })
    },
    async getProductionInfo() {
      console.log(this.$route.query.FShortName);
      let data = await JDGetProduction({
        level: 2,
        FShortName: this.$route.query.FShortName,
        FBillNo: ""
      });
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.productionModel = eval(data);
    }
  }
  
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
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
.info{
  ul{
    li{
      padding: @rem*20;
      background: white;
      display: flex;
      .goodsImg{
        width: @rem*320;
        height: @rem*320;
        margin-right: @rem*20;
        img{
          .wh(100%, 100%)
        }
      }
      .goodsInfo{
        width: 52%;
        font-size: @rem*28;
        color: #666;
        >div{
          .mt10;
        }
        div:first-child{
          margin-top: 0;
        }
      }
    }
  }
}
</style>
