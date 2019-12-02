<template>
  <div class="wrap myProperty" id="wrap">
    <div class='info' v-for='(item, index) in resultList' :key='index'>
      <div class='head'>
        <div><span>编号：</span>{{item.FNumber}}</div>
        <div><span>名称：</span>{{item.FName}}</div>
        <div><span>规格：</span>{{item.FModel}}</div>
        <div><span>数量：</span>{{item.FQty}}</div>
      </div>
      <div class='amount'>
        <div>接收人存放地址：</div>
        <input type="text" v-model='item.FAddress'>
      </div>
    </div>
    <div class='emplyInfo'>
      <ul>
        <li>
          <div class='name'>移交人组织</div>
          <div class='content'>{{info.OrgName}}</div>
        </li>
        <li>
          <div class='name'>移交人工号</div>
          <div class='content'>{{info.EmpNumber}}</div>
        </li>
        <li>
          <div class='name'>移交人姓名</div>
          <div class='content'>{{info.EmpName}}</div>
        </li>
				<li class='input'>
          <div class='name'>原监管人工号</div>
          <div class='content'><input placeholder="请填写原监管人工号" v-model='oldRecipient.FLiableEmpCode' type="number" @input="FLiableEmpCode(oldRecipient.FLiableEmpCode)"></div>
        </li>
        <li>
          <div class='name'>原监管人姓名</div>
          <div class='content'>{{oldRecipient.FLiableEmpName}}</div>
        </li>
        <li class='input'>
          <div class='name'>接收人工号</div>
          <div class='content'><input placeholder="请填写接收人工号" v-model='EmpCode' type="number"></div>
        </li>
        <li>
          <div class='name'>接收人组织</div>
          <div class='content'>{{recipient.OrgName}}</div>
        </li>
        <li>
          <div class='name'>接收人姓名</div>
          <div class='content'>{{recipient.FEmpName}}</div>
        </li>
        <li>
          <div class='name'>监管人工号</div>
          <div class='content'>{{recipient.FLiableEmpCode}}</div>
        </li>
        <li>
          <div class='name'>监管人姓名</div>
          <div class='content'>{{recipient.FLiableEmpName}}</div>
        </li>
        <li>
          <div class='name'>调拨原因</div>
          <div class='content'>
            <input type="text" placeholder="请选择调拨原因" class='reason' readonly @click='showPopupPicker = true' v-model='value5[0]'>
          </div>
        </li>
      </ul>
    </div>
    <popup-picker :show.sync="showPopupPicker" :show-cell="false" :data="[['资产调剂', '离职移交', '岗位调动']]" v-model="value5" @on-change='changeValue'></popup-picker>
    <x-button :gradients="['#d93309', '#aa0000']" class='button mt20' @click.native='confirm'>提交</x-button>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { XButton, PopupPicker } from 'vux'
import { JDGetWeixinFACardInfoByID, JDGetEmployeeInfoByOpenID, JDGetEmpAndLiableByEmpCode, JDInsertIntoFARichesMove, JDGetEmployeeInfoByNumber } from '@/api/getData'
export default {
  data() {
    return {
      value5: [],
      showPopupPicker: false,
      EmpCode: '',
      FCardIDList: [],
      resultList: [],
      info: '',
			recipient: '', // 接收者信息
			oldRecipient:'',//发起人上级信息
      employeeInfo:[],
      FARichesMoveJson: {
        FARichesMoveJson: []
      }
		};
  },
  computed: {
    ...mapState({
      removeList: state => state.mutations.removeList,
      wxOpenId: state => state.mutations.wxOpenId
    })
  },
  watch: {
		//根据接收人工号获取接收人以及监管人信息
    EmpCode(val) {
      if(val.length== 6){
        this.getRecipient(val)
        this.getEmployeeInfoByNumber(val)
      }
		}
  },
  components: {
    XButton,
    PopupPicker
  },
  mounted() {
    this.removeList.forEach(element => {
      this.FCardIDList.push(element.FinterID)
    });
    this.confirmRemove()
		this.getRemoveInfo()
		
	},
	methods: {
    changeValue(value) {
		},
		//获取原监管人
		async getOldRecipient(val) {
      let data = await JDGetEmpAndLiableByEmpCode({EmpCode: val})
      this.oldRecipient = eval(data)
      console.log(eval(data))
		},
		//获取监管人
    async getRecipient(val) {
      let data = await JDGetEmpAndLiableByEmpCode({EmpCode: val})
      this.recipient = eval(data)
      console.log(eval(data))
		},
		//获取接收人信息
    async getEmployeeInfoByNumber(val) {
      let data = await JDGetEmployeeInfoByNumber({FEmpNumber: val})
      this.employeeInfo = eval(data)
      console.log(eval(data))
		},
		//获取移交的财产信息
    async confirmRemove() {
      let data = await JDGetWeixinFACardInfoByID({CardIDList: this.FCardIDList.join(',')})
      console.log(data)
      this.resultList = eval(data)
		},
		//获取发起人信息
    async getRemoveInfo() {
      let data = await JDGetEmployeeInfoByOpenID({FWeixinOpenID: this.wxOpenId})
      console.log(data)
			this.info = eval(data)[0]
			console.info(this.info)
			this.getOldRecipient(this.info.EmpNumber)
		},
		//提交移交信息
    async confirm() {
      if (!this.EmpCode) return this.$vux.toast.text('请填写接收人工号');
      if (!this.value5[0]) return this.$vux.toast.text('请选择调拨原因');
      let obj = {
        FInterID: '',
        FNumber: '',
        FRemoveEmpID: '',
        FRemoveOrganizeID: '',
        FRemoveDeptID: '',
        Fdate: '',
        FCardID: '',
        FQty: '',
        FOldManager: '',
        FOldLiableEmpID: '',
        FManager: '',
        FLiableEmpID: '',
        FOldAddress: '',
        FAddress: '',
        FTakeOverEmpID: '',
        FTakeOverOrganizeID: '',
        FTakeOverDeptID: '',
        Fnote: '',
        FOperatorID: '',
        FOperateDate: '',
        FCheckerID : '',
        FCheckDate : '',
        FMoveReason: ''
      }
      this.resultList.forEach((item) => {
        obj.FInterID = item.FinterID
        obj.FNumber = item.FNumber
        obj.FRemoveEmpID = item.FRemoveEmpID
        obj.FRemoveOrganizeID  = item.FRemoveOrganizeID
        obj.FRemoveDeptID = item.FRemoveDeptID
        obj.Fdate = new Date().getFullYear() + '-' +  (new Date().getMonth() + 1) + '-' + new Date().getDate()
        obj.FCardID  = item.FCardID
				obj.FQty = item.FQty
        obj.FOldManager = this.oldRecipient.FLiableEmpName//item.FOldManager
        obj.FOldLiableEmpID = this.oldRecipient.FLiableEmpID 
        obj.FManager = this.recipient.FLiableEmpName
        obj.FLiableEmpID = this.recipient.FLiableEmpID
        obj.FOldAddress = item.FOldAddress
        obj.FAddress = item.FAddress
        obj.FTakeOverEmpID = this.recipient.FEmpID
        obj.FTakeOverOrganizeID = this.employeeInfo[0].FOrganizeID
        obj.FTakeOverDeptID = this.recipient.FDeptmentID
        obj.FCheckDate = ''
        obj.FCheckerID = ''
        obj.Fnote = ''
        obj.FOperatorID = '-1'
        obj.FMoveReason = this.value5[0]
        console.info(obj)
        this.FARichesMoveJson.FARichesMoveJson.push(obj)
        obj = Object.assign({}, {})
      })
      this.FARichesMoveJson.FARichesMoveJson = JSON.stringify(this.FARichesMoveJson.FARichesMoveJson)
      console.log(this.FARichesMoveJson)
      try {
        this.$store.commit("updateLoadingStatus", { isLoading: true });
        let data = await JDInsertIntoFARichesMove(this.FARichesMoveJson)
        this.$store.commit("updateLoadingStatus", { isLoading: false });
        this.$vux.toast.text(data)
        this.$router.push({path: '/myProperty'})
      } catch (error) {
        this.$store.commit("updateLoadingStatus", { isLoading: false });
        this.FARichesMoveJson = {
          FARichesMoveJson: []
        }
      }
		},
		async FLiableEmpCode(val){
			if(val.length== 6){
				let data = await JDGetEmployeeInfoByNumber({FEmpNumber: val})
				this.oldRecipient.FLiableEmpName = eval(data)[0]["EmpName"]
				this.oldRecipient.FLiableEmpID = eval(data)[0]["FitemID"]
				console.log(eval(data))
			}

		}
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.reason{
  border:none;
  text-align: right;
}
.info{
  margin: @rem*20;
  background: white;
  border-radius: 5px;
  padding: @rem*20;
  .head{
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: @rem*10;
    >div{
      margin-top: @rem*10;
      color: #333;
    }
    span{
      color: #666;
    }
  }
  .amount{
    display: flex;
    align-items: center;
    padding: @rem*30 0;
    color: #666;
    input{
      width: @rem*432;
      height: @rem*72;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
    }
  }
}
.emplyInfo{
  ul{
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: @rem*20;
      font-size: @rem*32;
      background: white;
      border-bottom: 1px solid #f5f5f5;
      .name{
        color: #666;
      }
    }
    .input{
        input{
          text-align: right;
          border: none;
        }
      }
    // li:last-child{
    //   display: inherit;
    //   .input{
    //     border: 1px solid #e6e6e6;
    //     display: flex;
    //     align-items: center;
    //     height: @rem*70;
    //     margin-top: @rem*20;
    //     border-radius: 5px;
    //     padding: 0 @rem*10;
    //     input{
    //       flex: 1;
    //       border: none;
    //     }
    //     i{
    //       color: #b8b8b8;
    //     }
    //   }
    // }
  }
}
.button{
    width: 95%;
    margin-left: 2.5%;
  }
</style>
