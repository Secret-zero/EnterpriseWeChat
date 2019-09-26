<template>
  <div class="wrap" id="wrap" style="padding-bottom: 50px;">
    <div class="login_div">
      <button id="wxsys" type="primary" @click="sys_click">扫一扫</button>
    </div>
    <group title="来料稽查">
      <el-input placeholder="请填写单号" v-model="FBillNo" clearable required></el-input>
      <el-input placeholder="请填写申请人工号" v-model="EmpCode" clearable></el-input>
      <el-input placeholder="请填写供应商" v-model="Supplier" clearable></el-input>
      <table>
        <tr>
          <td style="width:50%">
            <popup-radio :options="MaterialTypes" v-model="MaterialType" title="物料"></popup-radio>
          </td>
          <td>
            <x-input type="number" v-model="FQty" :show-clear="false"></x-input>
          </td>
          <td>
            <x-input v-model="unitName" :show-clear="false"></x-input>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <x-button @click.native="changeList">+</x-button>
          </td>
        </tr>
      </table>

      <div class="weui-cell vux-cell-form-preview">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label"></label>
            <span class="weui-form-preview__value"></span>
          </div>
          <div class="weui-form-preview__item" v-for="(item, index) in list" :key="index">
            <label class="weui-form-preview__label" @click="editList(index)">{{item.label}}</label>
            <span class="weui-form-preview__value">
              {{item.value}}
              <span @click="deleteList(index)">
                <icon type="cancel"></icon>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div style="display:none">
        <cell-form-preview :list="list"></cell-form-preview>
      </div>
      <x-button
        :gradients="['#d93309', '#aa0000']"
        class="confirm mt20"
        @click.native="inspectionApplication"
      >提交</x-button>
    </group>

    <!-- <input type="file" id="fileID" @change="changeFile()"/>
    <img :src="srcList" id="img"> -->


    <tabbar style="position:fixed">
      <tabbar-item link="/auditForm" selected>
        <span slot="label">发起申请</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionWait">
        <span slot="label">等待稽查</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionCompleted">
        <span slot="label">已签收</span>
      </tabbar-item>
      <tabbar-item link="/auditForm/inspectionException">
        <span slot="label">异常单号</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Search from "@/components/search";
import {
  JDInspectionApplication,
  JDScanQRCode,
  getQYSignature,
  JDGetInspectionDetail,
  JDGetMaterialType
} from "@/api/getData";
import {
  Tabbar,
  TabbarItem,
  XButton,
  XInput,
  Group,
  Cell,
  PopupRadio,
  CellFormPreview,
  XNumber,
  Icon
} from "vux";
import { mapState } from "vuex";
import wx from "weixin-jsapi";
import $ from "jquery";
export default {
  data() {
    return {
      FBillNo: "",
      EmpCode: "",
      UserID: "",
      Supplier: "",
      Json: [],
      MaterialTypes: [],
      MaterialType: "",
      list: [],
      FQty: 1,
      unitName: "件"
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.mutations.userInfo
    })
  },
  directives: {},
  components: {
    Tabbar,
    TabbarItem,
    XButton,
    XInput,
    Group,
    Cell,
    PopupRadio,
    CellFormPreview,
    XNumber,
    Icon
  },
  mounted() {
    this.EmpCode = this.userInfo[0].Fnumber;
    this.UserID = this.userInfo[0].FUserID;
    this.getMaterialType();
  },
  methods: {
    async inspectionApplication() {
      console.info(this.userInfo[0]);
      console.info(this.EmpCode);
      console.info(this.UserID);
      console.info(JSON.stringify(this.Json));
      if (this.FBillNo == "") {
        this.$vux.toast.text("请填写单号");
        return;
      }
      if (this.EmpCode == "") {
        this.$vux.toast.text("请输入申请人工号");
        return;
      }
      if (this.Supplier == "") {
        this.$vux.toast.text("请填写供应商");
        return;
      }
      if (JSON.stringify(this.Json) == "[]") {
        this.$vux.toast.text("请点击+号");
        return;
      }
      let data = await JDInspectionApplication({
        Json: JSON.stringify(this.Json),
        EmpCode: this.EmpCode,
				UserID: this.UserID,
				FDataType: 3
      });
      this.$vux.toast.text(data);
    },
    async sys_click() {
      //这里【url参数一定是去参的本网址】
      // $.get("获取微信认证参数的地址?url=去参的本网页地址", function(data){
      //var jsondata=$.parseJSON(data);
      let form = {
        url: location.href.split("#")[0],
        type: 1
      };
      let _this = this;
      let data = await getQYSignature(form);
      console.log("data", data);
      wx.config({
        beta: true,
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: true,
        // 必填，公众号的唯一标识
        appId: data.appid, //jsondata.model.appId,
        // 必填，生成签名的时间戳
        timestamp: parseInt(data.timeStamp), //+ jsondata.model.timestamp,
        // 必填，生成签名的随机串
        nonceStr: data.nonceStr, //jsondata.model.nonceStr,
        // 必填，签名
        signature: data.sig, // jsondata.model.signature,
        // 必填，需要使用的JS接口列表，所有JS接口列表
        jsApiList: ["checkJsApi", "scanQRCode"]
      });

      wx.error(function(res) {
        alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
      });

      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["scanQRCode"],
          success: function(res) {}
        });

        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if (JSON.parse(result) != undefined) {
              alert("扫描结果：" + result);
              alert(JSON.parse(result));
              alert(JSON.parse(result).BarCodeType);
              alert(JSON.parse(result).BillNO);
              //let data=_this.getInspectionDetail(JSON.parse(result).BarCodeType,JSON.parse(result).BillNO)
              let data = _this.getInspectionDetail(
                JSON.parse(result).BarCodeType,
                JSON.parse(result).BillNO
              );
              this.Json = [];
              for (let index = 0; index < data.length; index++) {
                this.Json.push(data[index]);
              }
            }
          }
        });
      });
    },
    async getInspectionDetail(Type, Zno) {
      let data = await JDGetInspectionDetail({
        Type: Type,
        Zno: Zno
      });
    },
    async getMaterialType() {
      let data = await JDGetMaterialType({});
      var jsonData = [];
      for (var i = 0; i < data.length; i++) {
        var value = data[i].FName;
        jsonData.push(value);
      }
      this.MaterialTypes = jsonData;
    },
    changeList() {
      if (this.FBillNo == "") {
        this.$vux.toast.text("请填写单号");
        return;
      }
      if (this.EmpCode == "") {
        this.$vux.toast.text("请输入申请人工号");
        return;
      }
      if (this.Supplier == "") {
        this.$vux.toast.text("请填写供应商");
        return;
      }
      if (this.MaterialType == "") {
        alert("请输入物料");
      } else {
        this.FQty = Number(this.FQty).toFixed(1);
        this.list.push({
          label: this.MaterialType,
          value: this.FQty + this.unitName
        });
        this.Json.push({
          MaterialCode: "",
          MaterialName: this.MaterialType,
          Model: "",
          UnitName: this.unitName,
          FQty: this.FQty,
          FBarCode: "",
          FBillNo: this.FBillNo,
          FBillType: "",
          Supplier: this.Supplier
        });
      }
    },
    editList(index) {
      this.MaterialType = this.list[index].label;
      this.FQty = this.list[index].value.substr(
        0,
        this.list[index].value.indexOf(".") + 2
      );
      alert(this.FQty);
      this.unitName = this.list[index].value.substr(
        this.list[index].value.indexOf(".") + 2,
        this.list[index].value.length - this.list[index].value.indexOf(".")
      );
      alert(this.unitName);
    },
    deleteList(index) {
      this.list.splice(index, 1);
      this.Json.splice(index, 1);
    }
    //,
    // changeFile(){
    //   let _this=this
    //   let files=document.getElementById("fileID").files[0]
    //   var reader = new FileReader();
    //   alert("onload前")
    //   reader.onload = function(e){
    //       console.log(e.target.result)
    //       _this.srcList=e.target.result
    //       alert("onload中")
    //   }
    //   reader.readAsDataURL(files);
    //   alert("onload后")
    //   //alert(src)
      
    // }
  }
};
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");
</style>
