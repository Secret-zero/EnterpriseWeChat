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
        <div class='title'>手机号</div>
        <div class='content'>{{userInfo[0].FPhone}}</div>
      </li>
      <li>
        <div class='title'>性别</div>
        <div class='content'>{{userInfo[0].FSex}}</div>
      </li>
      <li>
        <div class='title'>出生</div>
        <div class='content'>{{userInfo[0].FBirthday}}</div>
      </li>
      <li>
        <div class='title'>年龄</div>
        <div class='content'>{{userInfo[0].FYear}}</div>
      </li>
      <li>
        <div class='title'>身份证</div>
        <div class='content'>{{userInfo[0].FIDCard}}</div>
      </li>
      <li>
        <div class='title'>部门</div>
        <div class='content'>{{userInfo[0].FDepartmentName}}</div>
      </li>
      <li>
        <div class='title'>职位</div>
        <div class='content'>{{userInfo[0].FDutyName}}</div>
      </li>
      <li>
        <div class='title'>入职时间</div>
        <div class='content'>{{userInfo[0].FHiredate}}</div>
      </li>
    </ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { JDGetQRCode } from '@/api/getData'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      
		};
  },
  computed: {
    ...mapState({
      userInfo: state => state.mutations.userInfo
    })
  },
  components: {},
  mounted() {
	},
	methods: {
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
ul{
  background: white;
  li{
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
  }
}
</style>
