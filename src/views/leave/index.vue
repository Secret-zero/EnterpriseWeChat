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
				<li style="height: 42px;align-items: center;">
          <div class='name'>厂区</div>
          <div class='content' >
            <popup-picker :data="companyList" :columns="1" v-model="company" show-name></popup-picker>
          </div>
        </li>
				<li style="height: 42px;align-items: center;">
          <div class='name'>假别</div>
          <div class='content' >
            <popup-picker :data="reasonTypeList" :columns="1" v-model="reasonType" show-name></popup-picker>
          </div>
        </li>
        <!-- <li>
          <div class='name'>假别</div>
          <div class='content' @click='showReason'>
            <span>{{form.jiabie ? form.jiabie : '请选择'}}</span>
            <i class='iconfont icon-iconfontyoujiantou'></i>
          </div>
        </li> -->
        <li>
          <div class='name'>开始时间</div>
					<div class='content' >
						<datetime style="padding:0px"
							format="YYYY-MM-DD HH:mm"
							v-model="startTime"
							@on-change="changeStartTime"
							v-if="hackReset"
						>
          	</datetime>
					</div>
        </li>
        <li>
					<div class='name'>结束时间</div>
					<div class='content' >
						<datetime style="padding:0px"
							format="YYYY-MM-DD HH:mm"
							v-model="endTime"
							@on-change="changeEndTime"
							v-if="hackReset"
						>
          	</datetime>
					</div>
        </li>
        <li>
          <div class='name'>请假时长</div>
						<div class='content' @click="showTime">
							<span>{{timeDiff}}{{form.time ? form.time : '请选择'}}</span>
						</div>
        </li>
        <li style="display: inherit;padding: 0 10px;border-bottom: 0;">
          <div class='name' style="height: 26px;line-height: 26px;">请假事由</div>
          <group>
            <x-textarea v-model="reason"></x-textarea>
          </group>
        </li>
        <li>
          <div class='name'>工作替班人</div>
          <input type="text" placeholder="请填写" v-model="substitute">
        </li>
        <li>
          <div class='name'>审核人</div>
          <div class='content'>
						<input type="text" placeholder="请填写" v-model="recipient.FLiableEmpName">
          </div>
        </li>
      </ul>
    </div>
    <!-- <popup-picker :show.sync="showReasonList" :show-cell="false" title="TEST" :data="reasonList" v-model="reasonType" @on-change='changeReason'></popup-picker> -->
		<popup-picker :show.sync="showTimeList" :show-cell="false" title="TEST" :data="timeList" v-model="timeType" @on-change='changeTime'></popup-picker>
    <x-button :text="submit001" type="warn" class='confirm' @click.native="confirm" :disabled="disable001"></x-button>
	</div>
		<!-- ['#d93309', '#aa0000'] -->
</template>

<script>
import { XButton, PopupPicker, XTextarea, Group, Datetime }  from 'vux'
import { mapState } from 'vuex'
import moment from 'moment'
import { JDGetEmpAndLiableByEmpCode,JDAskForLeave} from '@/api/getData'
export default {
  data() {
    return {
			showReasonList: false,
			showTimeList:false,
			disable001:false,
			submit001:'提交',
      form: {
				//jiabie: '',
				time:'天',
      },
      reason: '',
			reasonTypeList: [{
				name: '事假',
        value: '306',
        parent: 0
			}, {
				name: '婚假',
        value: '310',
        parent: 0
			},{
				name: '工伤',
        value: '309',
        parent: 0
			},{
				name: '丧假',
        value: '316',
        parent: 0
			},{
				name: '产假',
        value: '317',
        parent: 0
			}],
			reasonType:[],
			//reasonType: ['病假'],
			timeList:[['天', '小时']],
			timeType:['天'],
			startTime:'',
			endTime:'',
			substitute:'',
			recipient:'',
			hackReset:true,
			companyList: [{
        name: '金帝',
        value: '0',
        parent: 0
      }, {
        name: '金隆',
        value: '1',
        parent: 0
			}, {
        name: '金臻',
        value: '2',
        parent: 0
			}, {
        name: '金易',
        value: '3',
        parent: 0
			}, {
        name: '江西',
        value: '4',
        parent: 0
			}, {
        name: '河南',
        value: '5',
        parent: 0
			}],
			company: []
		};
  },
  computed:{
    ...mapState({
      userInfo: state => state.mutations.userInfo
		}),
		timeDiff:function(){
			//1.判断是否已经填写完开始时间和结束时间，否则为空
			if(this.startTime!=''&&this.endTime!=''){
				this.hackReset=false;
				this.$nextTick(()=>{
					this.hackReset=true
				})
				//2.按小时计算    结束时间-开始时间 <4个小时，计算时间
				if(moment(this.endTime).diff(moment(this.startTime), 'hour')<4){
					this.form.time='小时'
					return Math.ceil(moment(this.endTime).diff(moment(this.startTime), 'minute')/60)
				}
				//3.按天计算
				if (moment(this.startTime).hours() - 12 < 0)//时间没有大于12点，按0点起
				{
					this.startTime = this.startTime.substring(0, 10)+ " 00:00";
				}
				else
				{//时间大于12点 按12点起
					this.startTime = this.startTime.substring(0, 10)+ " 12:00";
					
				}
				if (moment(this.endTime).hours() <= 12)
				{
						
						this.endTime = this.endTime.substring(0, 10) + " 12:00";
				}
				else
				{
						this.endTime = this.endTime.substring(0, 10) + " 23:59";
				}
				this.$vux.toast.text('小时数大于4小时，改为天假');
				this.form.time='天'
				return isNaN(moment(this.endTime).diff(moment(this.startTime), 'hour'))?'':Math.round(moment(this.endTime).diff(moment(this.startTime), 'hour')/24 * 10) / 10;
			}
			return ''
		},
		
            
  },
  components: {
    XButton,
    PopupPicker,
    XTextarea,
		Group,
		Datetime
  },
  mounted() {
		this.getRecipient(this.userInfo[0].Fnumber);
	},
	methods: {
    // showReason() {
    //   this.showReasonList = true
    // },
    // changeReason(val) {
    //   console.log(val)
    //   this.form.jiabie = val[0]
		// },
		showTime() {
      this.showTimeList = true
    },
    changeTime(val) {
      console.log(val)
      this.form.time = val[0]
		},
		showCompany() {
      this.showCompanyList = true
    },
    // changeCompany(val) {
    //   console.log(val)
    //   this.form.company = val[0]
		// },
		changeStartTime (value) {
			if(this.endTime!=''&&moment(this.endTime).diff(moment(this.startTime), 'minute')<=0){
				this.$vux.toast.text('结束时间必须大于开始时间');
				this.hackReset=false;
				this.$nextTick(()=>{
					this.hackReset=true
				})
				this.startTime=''
			}
			console.log('changeStartTime', value)
			
		},
		changeEndTime (value) {
			if(this.startTime!=''&&moment(this.endTime).diff(moment(this.startTime), 'minute')<=0){
				this.$vux.toast.text('结束时间必须大于开始时间');
				this.hackReset=false;
				this.$nextTick(()=>{
					this.hackReset=true
				})
				this.endTime=''
			}
      console.log('changeEndTime', value)
		},
		//获取监管人
    async getRecipient(val) {
      let data = await JDGetEmpAndLiableByEmpCode({EmpCode: val})
      this.recipient = eval(data)
      console.log(eval(data))
		},

		async confirm(){
			let data = await JDAskForLeave({
				jsonStr:JSON.stringify({
					company: this.company[0],
					jiabie: this.reasonType[0],
					startDate: this.startTime.substring(0,10),
					endDate: this.endTime.substring(0,10),
					startTime: this.startTime.substring(11,this.startTime.length),
					endTime: this.endTime.substring(11,this.endTime.length),
					timeDiff: this.timeDiff,
					time: this.form.time,
					reason: this.reason,
					substitute: this.substitute,
					sqr: this.userInfo[0].Fnumber,
					shr: this.recipient.FLiableEmpCode
				})
			})
			this.$vux.toast.text(data)
			this.disable001=true
			this.submit001='已提交'
			
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
			.title{
				color: #666;
			}
			input{
				border: none;
				text-align: right;
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
