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
    <ul v-for="(Item,index) in Items" :key="index">
      <li>
        <div class="title">{{Item.FItemName}}</div>
        <div class="content">{{Item.FAuxQty}}{{Item.FUnitName}}</div>
      </li>
    </ul>

    <ul class="mt20">
      <li>
        <div class="title">稽查结果：</div>
        <input type="text" placeholder="请填写" v-model="IncomingMessage.FStatus" required />
      </li>
      <li>
        <div class="title">稽查人员：</div>
        <input type="text" placeholder="请填写" v-model="userInfo[0].Fnumber" required />
      </li>
    </ul>
    <div class="invitation">
      <x-button
        :gradients="['#d93309', '#aa0000']"
        class="button"
        @click.native="incomingInspection"
      >提交</x-button>
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
import { XButton, Alert } from "vux";
import { JDGetIncomingMessage, JDIncomingInspection } from "@/api/getData";
import { mapState } from "vuex";
import { userInfo } from "os";
import $ from "jquery";
import { parse } from "url";
export default {
  data() {
    return {
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
    Alert
  },
  mounted() {
    // this.getIncomingPictures()
    this.getIncomingMessage();
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
      // console.info(data)
      // console.info(this.userInfo[0])
      // console.info(this.result)
      this.fileList = this.result;
    },
    async incomingInspection() {
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
            let data = JDIncomingInspection({
              FInterID: _this.$route.query.FInterID,
              Fnumber: _this.Fnumber,
              Pictures: JSON.stringify(a),
              EmpCode: _this.EmpCode,
              InspectionResult: _this.InspectionResult
            });
            console.info(data);
            _this.$vux.alert.show({
              content: "提交成功",
              onShow() {},
              onHide() {
                _this.$router.push({
                  path: "/auditForm/inspectionWait",
                  query: { FInterID: _this.FInterID }
                });
              }
            });
          }
        };
      });
    },
    onexceed() {
      this.$vux.toast.text("最多只能上传9张图片");
    },
    // handleChange(file, fileList) {
    //   var _this = this;
    //   var canvas = document.createElement("canvas");
    //   var ctx = canvas.getContext("2d");
    //   var image = new Image();
    //   var quality = 1;
    //   image.setAttribute("crossOrigin", "Anonymous");
    //   image.src = file.url;
    //   image.onload = function() {
    //     alert("onload");
    //     if (image.height * image.width <= 640000) {
    //       console.log("像素小于等于64万");
    //       canvas.height = image.height;
    //       canvas.width = image.width;
    //     } else {
    //       console.log("大于64万像素");
    //       let ratio = Math.sqrt((image.height * image.width) / 640000);
    //       canvas.height = image.height / ratio;
    //       canvas.width = image.width / ratio;
    //     }
    //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //     //var ext = image.src.substring(image.src.lastIndexOf(".")+1).toLowerCase();
    //     var base64 = canvas.toDataURL("image/jpeg", quality);

    //     var strLength = base64.length;
    //     var fileLength = parseInt(strLength - (strLength / 8) * 2);

    //     // 由字节转换为KB
    //     var size = "";
    //     size = (fileLength / 1024).toFixed(2);
    //     while (parseInt(size) > 200) {
    //       quality = 0.99 * quality;
    //       base64 = canvas.toDataURL("image/jpeg", quality);
    //       strLength = base64.length;
    //       fileLength = parseInt(strLength - (strLength / 8) * 2);

    //       size = (fileLength / 1024).toFixed(2);
    //     }

    //     var arr = base64.split(","),
    //       mime = arr[0].match(/:(.*?);/)[1],
    //       bstr = atob(arr[1]),
    //       n = bstr.length,
    //       u8arr = new Uint8Array(n);
    //     while (n--) {
    //       u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     let blobObject = new Blob([u8arr], { type: mime });
    //     let url = URL.createObjectURL(blobObject);
    //     alert("原url:" + file.url);
    //     alert("现url" + url);
    //     file.url = url;
    //     fileList.pop();
    //     fileList.push(file);
    //   };
    //   image.onerror = function() {
    //     alert("onerror");
    //   };
    // }
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
