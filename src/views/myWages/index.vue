<template>
  <div class="wrap" id="wrap">
    <div class="date">{{result[0].FYear}}年{{result[0].FPeriod}}月</div>
    <div class='mt20'>
      <ul>
        <li v-for='(item, index) in result' :key='index'>
          <div class="title" v-html='item.FItemName'></div>
          <div class="content">{{item.FAmount}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import indexApi from "@/api/getData";
import { mapState } from "vuex";
import { JDGetSalaryInfo } from "@/api/getData";
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      result: ""
    };
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  components: {},
  mounted() {
    this.getSalaryInfo();
  },
  methods: {
    async getSalaryInfo() {
      let data = await JDGetSalaryInfo({ FWeixinOpenID: this.wxOpenId });
      this.result = eval(data);
      console.log(data);
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
</style>
