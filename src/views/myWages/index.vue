<template>
  <div class="wrap" id="wrap">
    <div class="date">{{FYear}}年{{FPeriod}}月</div>
    <div class='mt20'>
      <ul>
        <li v-for='(item, index) in result' :key='index'>
          <div class="title" v-html='item.FItemName'></div>
          <div class="content">{{item.FAmount}}</div>
        </li>
      </ul>
    </div>
		<!-- <button class='button' @click='toSignature'></button> -->
		<x-button :gradients="['#d93309', '#aa0000']" class='button' @click.native="toSignature">签字</x-button>
		<!-- <x-button :gradients="['#d93309', '#aa0000']" class='button' @click.native="toSignatureTest">签字测试</x-button> -->
  </div>
</template>

<script>
import indexApi from "@/api/getData";
import { mapState } from "vuex";
import { JDGetSalaryInfo } from "@/api/getData";
import { XButton } from 'vux'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
			result: "",
			FYear:"",
			FPeriod:""
    };
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {
		XButton
	},
  mounted() {
    this.getSalaryInfo();
  },
  methods: {
    async getSalaryInfo() {
      let data = await JDGetSalaryInfo({ FWeixinOpenID: this.wxOpenId });
			this.result = eval(data);
			this.FYear=this.result[0].FYear;
			this.FPeriod=this.result[0].FPeriod;
      console.log(data);
		},
		toSignature(){
			this.$router.push({path: '/myWagesSignature', query: {
				FYear: this.FYear,
				FMonth: this.FPeriod
			}})
		},
		toSignatureTest(){
			this.$router.push({path: '/myWagesTest', query: {
				FYear: this.FYear,
				FMonth: this.FPeriod
			}})
		}
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.date {
  height: @rem*88;
  background: white;
  line-height: @rem*88;
  text-align: center;
  color: #c82106;
  font-size: @rem*36;
  border-bottom: 1px solid #eee;
}
ul {
  background: white;
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

.button{
	.bisColor(#d93309, #aa0000);
	color: white;
	border-radius:  @rem*88;
	text-align: center;
	height: @rem*88;
	line-height: @rem*88;
	font-size: @rem*38;
	margin: 0 auto;
	margin-top: @rem*40;
	width: @rem*480;
}
</style>
