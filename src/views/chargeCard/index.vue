<template>
  <div class="wrap" id="wrap">
    <ul>
      <li>
        <div class='title'>姓名</div>
        <div class='content'>{{userInfo[0].FName}}</div>
      </li>
      <li>
        <div class='title'>工号</div>
        <div class='content'>{{userInfo[0].Fnumber}}</div>
      </li>
      <li>
        <div class='title'>部门</div>
        <div class='content'>{{userInfo[0].FDepartmentName}}</div>
      </li>
      <li>
        <div class='title'>职位</div>
        <div class='content'>{{userInfo[0].FDutyName}}</div>
      </li>
      <li class='mt20'>
        <div class='title'>充值金额(元)</div>
        <input placeholder="请填写充值金额" type="number" v-model='amount'>
      </li>
    </ul>
    <x-button :gradients="['#d93309', '#aa0000']" class='confirm mt20' @click.native='chargeCard'>提交</x-button>
	</div>
</template>

<script>
import { JDChargeCard } from '@/api/getData'
import { XButton } from 'vux'
import { mapState } from 'vuex'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      amount: ''
		};
  },
  computed: {
    ...mapState({
      userInfo: state => state.mutations.userInfo,
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {
    XButton
  },
  mounted() {
    console.log(this.userInfo)
	},
	methods: {
    async chargeCard() {
      if (!this.amount) return this.$vux.toast.text('请填写金额');
      let data = await JDChargeCard({FWeixinOpenID: this.wxOpenId, Price: this.amount})
      console.log(data)
      this.$vux.toast.text(data)
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
ul{
  li{
    background: white;
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
    input{
      border: none;
      text-align:right;
    }
  }
}
.confirm{
  width: 95%;
  margin-left: 2.5%;
}
</style>
