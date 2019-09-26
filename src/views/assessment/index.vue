<template>
  <div class="wrap" id="wrap">
    <div class='titles'>
      <ul>
        <li>编号</li>
        <li>序号</li>
        <li>数量</li>
        <li>系数</li>
        <li>得分</li>
      </ul>
    </div>
    <div class='content'>
      <ul>
        <li v-for='(item, index) in resultList' :key='index'>
          <div>{{item.FProductName}}</div>
          <div>{{item.FProcessNumber}}</div>
          <div>{{item.FQty}}</div>
          <div>{{item.FPrice}}</div>
          <div>{{item.FAmount}}</div>
        </li>
      </ul>
    </div>
    <div class='total'>合计：<span>{{resultList[resultList.length-1].FAmount}}</span></div>
	</div>
</template>

<script>
import { JDGetAppraisal } from '@/api/getData'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      resultList: []
		};
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {},
  mounted() {
    this.getList()
	},
	methods: {
    async getList() {
      this.resultList = []
      let data = await JDGetAppraisal({FWeixinOpenID: this.wxOpenId})
      this.resultList = eval(data)
      if (this.resultList.length === 0) {
        this.$vux.toast.text('暂无数据')
      }
      console.log(data)
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.titles{
  ul{
    display: flex;
    background: white;
    border-bottom: 1px solid #aa0000;
    li{
      height: @rem*88;
      line-height: @rem*88;
      color: #aa0000;
      font-size: @rem*32;
      width: 17.5%;
      text-align: center;
    }
    li:first-child{
      width: 30%;
    }
  }
}
.content{
  ul{
    li{
      display: flex;
      height: @rem*80;
      line-height: @rem*80;
      background: white;
      width: 100%;
      border-bottom: 1px solid #eeeeee;
      div{
        width: 17.5%;
        text-align: center;
        color: #666;
      }
      div:first-child{
        width: 30%;
      }
    }
  }
}
.total{
  background: white;
  width: 100%;
  text-align: right;
  font-size: @rem*32;
  color: #666;
  padding-top: @rem*20;
  padding-right: @rem*20;
  height: @rem*200;
  span{
    font-size: @rem*28;
    color: #aa0000;
  }
}
</style>
