<template>
  <div class="wrap" id="wrap">
    <!-- <div class='head'>
      <div>未审批</div>
      <div>已审批</div>
      <div>全部</div>
    </div> -->
    <div class='item'>
      <div class='adviest'>
        <div class='name'>姓名</div>
        <div class='content'>黄信利</div>
      </div>
      <div class='adviest'>
        <div class='name'>组织</div>
        <div class='content'>金帝集团有限公司</div>
      </div>
      <div class='adviest'>
        <div class='name'>工号</div>
        <div class='content'>012744</div>
      </div>
      <div class='adviest'>
        <div class='name'>部门</div>
        <div class='content'>信息中心</div>
      </div>
      <div class='adviest'>
        <div class='name'>职位</div>
        <div class='content'>程序员</div>
      </div>
    </div>
    <div class='item mt20'>
      <div class='adviest'>
        <div class='name'>单据类型</div>
        <div class='content'>非工艺类合理化建议</div>
      </div>
      <div class='adviest'>
        <div class='name'>申报原因</div>
        <input type="text" placeholder="请填写">
      </div>
      <div class='adviest'>
        <div class='name'>建议</div>
        <input type="text" placeholder="请填写">
      </div>
    </div>
    <div class='imgUpload'>
      <div class='title'><span>图片上传</span></div>
      <ul>
        <li></li>
        <li class='v-flex'>
          <i class='iconfont icon-jia'></i>
        </li>
      </ul>
    </div>
    <x-button :gradients="['#d93309', '#aa0000']" class='confirm mt20'>提交</x-button>
	</div>
</template>

<script>
// import { setTimeout } from 'timers';
import { XButton } from 'vux'
export default {
  data() {
    return {
		};
  },
  directives: {
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
.imgUpload{
  .mt20;
  padding: @rem*20;
  background: white;
  color: #999;
  font-size: @rem*30;
  span{
    color: #666;
  }
  ul{
    display: flex;
    .mt20;
    li{
      margin-right: @rem*20;
      width: @rem*116;
      height: @rem*116;
      border:1px solid #ccc;
      border-radius: 3px;
    }
  }
}
.head{
  background: white;
  padding: @rem*20;
  display: flex;
  justify-content: space-around;
  >div{
    width: @rem*210;
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
    input{
      border: none;
      text-align: right;
    }
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
.confirm{
  width: 95%;
  margin-left: 2.5%;
}
</style>
