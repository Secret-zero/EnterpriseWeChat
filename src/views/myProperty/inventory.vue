<template>
  <div class="wrap" id="wrap">
    <div class='list'>
      <ul>
        <li>
          <div class='title'>财产编号</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>财产名称</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>类别</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>规格型号</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>数量</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>单价</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>原值</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>生产日期</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>供货厂商</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>购买日期</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>接管日期</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>区域</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>保管工号</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>保管人</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>监管人</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>保管单位</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>存放地点</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>使用状态</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>变动方式</div>
          <div class='content'>A0275555555</div>
        </li>
        <li>
          <div class='title'>入账日期</div>
          <div class='content'>A0275555555</div>
        </li>
      </ul>
    </div>
    <div class='buttonFixed'>
      <x-button :gradients="['#d93309', '#aa0000']" class='button mt20'>开始盘点</x-button>
    </div>
	</div>
</template>

<script>
import { XButton } from 'vux'
export default {
  data() {
    return {
		};
  },
  components: {
    XButton
  },
  mounted() {
	},
	methods: {
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.list{
  padding-bottom: @rem*160;
  ul{
    li{
      display: flex;
      justify-content: space-between;
      background: white;
      padding: @rem*20;
      border-bottom: 1px solid #f5f5f5;
      .title{
        color: #666;
        font-size: @rem*32;
      }
      .content{
        font-size: @rem*32;
        color: #333;
      }
    }
  }
}
.buttonFixed{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: @rem*20;
  .button{
    
  }
}
</style>
