<template>
  <div class="wrap" id="wrap">
    <div class='tips'>
      <p>你的请假申请单需审核完成后方可离岗,</p>
      <p>否则视为旷工</p>
    </div>
    <div class='infomation'>
      <ul>
        <li>
          <div class='name'>姓名</div>
          <div class='content'>{{userInfo[0].FName}}</div>
        </li>
        <li>
          <div class='name'>工号</div>
          <div class='content'>{{userInfo[0].Fnumber}}</div>
        </li>
        <li>
          <div class='name'>部门</div>
          <div class='content'>{{userInfo[0].FDepartmentName}}</div>
        </li>
        <li>
          <div class='name'>职位</div>
          <div class='content'>{{userInfo[0].FDutyName}}</div>
        </li>
      </ul>
    </div>
    <div class='infomation infomation2 mt20'>
      <ul>
        <li>
          <div class='name'>假别</div>
          <div class='content' @click='showReason'>
            <span>{{form.jiabie ? form.jiabie : '请选择'}}</span>
            <i class='iconfont icon-iconfontyoujiantou'></i>
          </div>
        </li>
        <li>
          <div class='name'>开始时间</div>
          <div class='content'>
            请选择
            <i class='iconfont icon-iconfontyoujiantou'></i>
          </div>
        </li>
        <li>
          <div class='name'>结束时间</div>
          <div class='content'>
            请选择
            <i class='iconfont icon-iconfontyoujiantou'></i>
          </div>
        </li>
        <li>
          <div class='name'>请假时长</div>
          <div class='content'>
            请选择
            <i class='iconfont icon-iconfontyoujiantou'></i>
          </div>
        </li>
        <li style="display: inherit;padding: 0 10px;border-bottom: 0;">
          <div class='name' style="height: 26px;line-height: 26px;">请假事由</div>
          <group>
            <x-textarea v-model="resaon"></x-textarea>
          </group>
        </li>
        <li>
          <div class='name'>工作替班人</div>
          <div class='content'>
            请填写
          </div>
        </li>
        <li>
          <div class='name'>审核人</div>
          <div class='content'>
            请选择
            <i class='iconfont icon-iconfontyoujiantou'></i>
          </div>
        </li>
      </ul>
    </div>
    <popup-picker :show.sync="showReasonList" :show-cell="false" title="TEST" :data="resaonList" v-model="resaonType" @on-change='changeReason'></popup-picker>
    <x-button :gradients="['#d93309', '#aa0000']" class='confirm'>提交</x-button>
	</div>
</template>

<script>
import { XButton, PopupPicker, XTextarea, Group } from 'vux'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showReasonList: false,
      form: {
        jiabie: ''
      },
      resaon: '',
      resaonList: [['病假', '事假']],
      resaonType: ['病假']
		};
  },
  computed:{
    ...mapState({
      userInfo: state => state.mutations.userInfo
    })
  },
  components: {
    XButton,
    PopupPicker,
    XTextarea,
    Group
  },
  mounted() {
	},
	methods: {
    showReason() {
      this.showReasonList = true
    },
    changeReason(val) {
      console.log(val)
      this.form.jiabie = val[0]
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.confirm{
  width: 95%;
  margin-left: 2.5%;
  margin-top: @rem*25;
  margin-bottom: @rem*10;
}
.icon-iconfontyoujiantou{
  font-size: 15px;
  color: #c7c7cc;
}
.tips{
  color: #aa0000;
  font-size: @rem*32;
  text-align:center;
  padding: @rem*20;
}
.infomation{
  ul{
    li{
      display: flex;
      justify-content: space-between;
      background: white;
      border-bottom: 1px solid #f5f5f5;
      padding: @rem*20;
      .name{
        color: #666666;
        font-size: @rem*32;
      }
      .content{
        color: #333;
        font-size: @rem*32;
      }
    }
  }
}
.infomation2{
  .content{
    color: #999 !important;
  }
}
</style>
