<template>
  <div class="wrap" id="wrap">
    <div class='head'>
      <div>未审批</div>
      <div>已审批</div>
      <div>全部</div>
      <div>提建议</div>
    </div>
    <div class='item'>
      <div class='adviest'>
        <div class='name'>建议人</div>
        <div class='content'>黄信利</div>
      </div>
      <div class='adviest'>
        <div class='name'>建议名称</div>
        <div class='content'>测试</div>
      </div>
      <div class='adviest'>
        <div class='name'>审批结果</div>
        <div class='result'>已审批</div>
      </div>
      <div class='adviest'>
        <div class='name'></div>
        <div class='infoButton'>详情</div>
      </div>
    </div>
	</div>
</template>

<script>
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
		};
  },
  directives: {
  },
  components: {
  },
  mounted() {
	},
	methods: {
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.head{
  background: white;
  padding: @rem*20;
  display: flex;
  justify-content: space-around;
  >div{
    width: @rem*160;
    height: @rem*68;
    .bisColor(#d93309, #aa0000);
    font-size: @rem*28;
    color: white;
    border-radius: 5px;
    text-align:center;
    line-height: @rem*68;
  }
}
.item{
  background: white;
  .mt20;
  .adviest{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: @rem*20;
    .result{
      color: #aa0000;
      font-size: @rem*32;
    }
    .name{
      font-size: @rem*32;
      color: #666;
    }
    .infoButton{
      width: @rem*140;
      height: @rem*60;
      color: white;
      font-size: @rem*32;
      .bisColor(#d93309, #aa0000);
      border-radius: 5px;
      line-height: @rem*60;
      text-align: center;
    }
  }
}
</style>
