<template>
  <div class="wrap" id="wrap">
    <el-upload
      action="#"
      multiple
      :file-list="fileList"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="9"
      :on-exceed="onexceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <ul class="mt20">
      <li>
        <div class="title">日期：</div>
        <div class='content' >
          <datetime style="padding:0px"
            format="YYYY-MM-DD"
            v-model="FDate"
            @on-change="change1"
          >
          </datetime>
        </div>
      </li>
      <li>
        <div class="title">值班人</div>
        <div class="content">{{FPatrolEmpName}}</div>
      </li>
			<li>
        <div class="title">巡查时间</div>
        <div class='content' >
          <datetime style="padding:0px"
            format="YYYY-MM-DD HH:mm"
            v-model="FPatrolTime"
            @on-change="change2"
          >
          </datetime>
        </div>
      </li>
			<li>
        <div class="title">陪同保安</div>
        <input type="text" placeholder="请填写" v-model="FSecurityGuardEmpName" required />
      </li>
			<li>
        <div class="title">夜间巡查情况</div>
        <group>
					<x-textarea v-model="FPatrolNight"></x-textarea>
				</group>
      </li>
			<li>
        <div class="title">食堂巡查情况</div>
        <group>
					<x-textarea v-model="FPatrolCanteen"></x-textarea>
				</group>
      </li>
			<li>
        <div class="title">意见和建议</div>
        <group>
					<x-textarea v-model="FNote"></x-textarea>
				</group>
      </li>
    </ul>
    <div class="invitation">
      <x-button :text="submit001" type="warn" class='button' @click.native="PatrolRecord" :disabled="disable001" ></x-button>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="true"
      :center="true"
      custom-class="background"
    >
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { XButton, Alert, Datetime, XTextarea, Group } from "vux";
import { JDGetIncomingMessage, JDIncomingInspection, JDPatrolRecord} from "@/api/getData";
import { mapState } from "vuex";
import { userInfo } from "os";
import $ from "jquery";
import { parse } from "url";
import moment from 'moment'
export default {
  data() {
    return {
			disable001:false,
			submit001:'提交',
			FDate:this.$route.query.date,
			FPatrolEmpName:"",
			FPatrolEmpID:"",
			FPatrolTime:moment(new Date()).format('YYYY-MM-DD HH:mm'),
			FSecurityGuardEmpName:"",
			FSecurityGuardEmpID:"",
			FPatrolNight:"",
			FPatrolCanteen:"",
			FNote:"",
			FBillerID:"",
			dialogImageUrl: "",
      dialogVisible: false,
      FInterID: "",
      Fnumber: "",
      Pictures: [],
      EmpCode: "",
      InspectionResult: "",
      IncomingMessage: {},
      Items: [],
      Picturelist: [],
      fileList: [],
      result: [],
			disabled: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.mutations.userInfo
    })
  },
  directives: {},
  components: {
    XButton,
		Alert,
		Datetime,
		XTextarea,
		Group
  },
  mounted() {
		this.FPatrolEmpName=this.$route.query.name;
		this.FPatrolEmpID=this.$route.query.empID;
		this.FBillerID=this.$route.query.userID;
		
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async getIncomingMessage() {
      let data = await JDGetIncomingMessage({
        FInterID: this.$route.query.FInterID
      });
      this.Items = data.Items;
      this.Picturelist = data.Picturelist;
      this.IncomingMessage = data;
      this.FInterID = this.$route.query.FInterID;
      this.EmpCode = this.userInfo[0].Fnumber;
      this.Fnumber = data.FNumber;
      this.InspectionResult = this.IncomingMessage.FStatus;

      for (var i = 0; i < this.Picturelist.length; i++) {
        this.result.push({ url: this.Picturelist[i].Photo });
      }
      this.fileList = this.result;
    },
    async PatrolRecord() {
      let a = [];
      let _this = this;
      let b = 0;
      $(".el-upload-list--picture-card img").each(function() {
        b++;
      });
      if (b === 0) {
        this.$vux.toast.text("请至少上传一张图片");
      }
      let c = 0;
      $(".el-upload-list--picture-card img").each(function() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var image = new Image();
        var quality = 1;
        image.setAttribute("crossOrigin", "Anonymous");
        image.src = $(this).attr("src");
        image.onload = function() {
          if (image.height * image.width <= 640000) {
            console.log("像素小于等于64万");
            canvas.height = image.height;
            canvas.width = image.width;
          } else {
            console.log("大于64万像素");
            let ratio = Math.sqrt((image.height * image.width) / 640000);
            canvas.height = image.height / ratio;
            canvas.width = image.width / ratio;
          }
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          //var ext = image.src.substring(image.src.lastIndexOf(".")+1).toLowerCase();
          var base64 = canvas.toDataURL("image/jpeg", quality);

          var strLength = base64.length;
          var fileLength = parseInt(strLength - (strLength / 8) * 2);

          // 由字节转换为KB
          var size = "";
          size = (fileLength / 1024).toFixed(2);
          while (parseInt(size) > 200) {
            quality = 0.99 * quality;
            base64 = canvas.toDataURL("image/jpeg", quality);
            strLength = base64.length;
            fileLength = parseInt(strLength - (strLength / 8) * 2);

            size = (fileLength / 1024).toFixed(2);
          }

          a.push({
            photo: base64.replace(/.*;base64,/, "")
          });
          if (a.length === b) {

						let jsonStr={
							FDate:_this.FDate,
							FPatrolEmpID:_this.FPatrolEmpID,
							FPatrolTime:_this.FPatrolTime,
							FSecurityGuardEmpName:_this.FSecurityGuardEmpName,
							FPatrolNight:_this.FPatrolNight,
							FPatrolCanteen:_this.FPatrolCanteen,
							FNote:_this.FNote,
							FBillerID:_this.FBillerID,
							Pictures:a
						}
						if(_this.FDate!=moment(new Date()).format('YYYY-MM-DD')){
							_this.$vux.toast.text('巡查日期不正确，请在规定时间巡查');
				      return;
						}
						console.info(JSON.stringify(jsonStr))
            let data = JDPatrolRecord({
              jsonStr:JSON.stringify(jsonStr)
            });
						console.info(data);
						this.disable001=true
						this.submit001='已提交'
            // _this.$vux.alert.show({
            //   content: "提交成功",
            //   onShow() {},
            //   onHide() {
            //     _this.$router.push({
            //       path: "/auditForm/inspectionWait",
            //       query: { FInterID: _this.FInterID }
            //     });
            //   }                              
            // });
          }
        };
      });
    },
    onexceed() {
      this.$vux.toast.text("最多只能上传9张图片");
		},
		change1 (value) {
      console.log('change1', value)
		},
		change2 (value) {
      console.log('change2', value)
    },
  }
}
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");
@import "~@/assets/less/main.less";
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
    input {
      border: none;
      text-align: right;
    }
    .content {
      color: #333;
      display: flex;
      align-items: center;
      i {
        color: #666;
        font-size: @rem*30;
      }
      .look {
        width: @rem*120;
        height: @rem*60;
        line-height: @rem*60;
        color: white;
        border-radius: 5px;
        text-align: center;
        .bisColor(#d93309, #aa0000);
      }
    }
  }
}
.button {
  width: 95%;
  margin: @rem*20;
}
</style>
<style>
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 98px;
}
.background {
  background-color: rgba(0, 0, 0, 0.7);
  display: inline-block;
  vertical-align: middle;
}
</style>
