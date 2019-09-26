<template>
  <div class="wrap myProperty" id="wrap">
    <div class='info' v-for='(item,index) in resultList' :key='index'>
      <div class='head'>
        <div><span>编号：</span>{{item.FNumber}}</div>
        <div><span>名称：</span>{{item.FName}}</div>
        <div><span>规格：</span>{{item.FModel}}</div>
        <div><span>数量：</span>{{item.FQty}}</div>
      </div>
      <div class='amount'>
        <div>报废数量：</div>
        <input type="text" v-model='item.FReJect_Qty'>
      </div>
    </div>
    <div class='emplyInfo'>
      <ul>
        <li>
          <div class='name'>报废人组织</div>
          <div class='content'>{{userInfo.OrgName}}</div>
        </li>
        <li>
          <div class='name'>报废人工号</div>
          <div class='content'>{{userInfo.EmpNumber}}</div>
        </li>
        <li>
          <div class='name'>报废人姓名</div>
          <div class='content'>{{userInfo.EmpName}}</div>
        </li>
        <li>
          <div class='name'>监督人工号</div>
          <div class='content'>{{superviser.FLiableEmpCode}}</div>
        </li>
        <li>
          <div class='name'>监督人姓名</div>
          <div class='content'>{{superviser.FLiableEmpName}}</div>
        </li>
				<!-- <li @click='showPopupPicker1 = !showPopupPicker1'>
          <div class='name'>处置方式</div>
          <div class='input'>
            <input placeholder="请选择处置方式" readonly v-model='value6[0]'>
            <i class='iconfont icon-bottom'></i>
          </div>
        </li> -->
        <li @click='showPopupPicker = !showPopupPicker'>
          <div class='name'>报废原因</div>
          <div class='input'>
            <input placeholder="请选择报废原因" readonly v-model='value5[0]'>
            <i class='iconfont icon-bottom'></i>
          </div>
        </li>
				<div style="padding:20px;">
					<!-- <div class="show">
						<div class="picture" :style="'backgroundImage:url('+FPicture+')'"></div>
					</div> -->
					<img :src="FPicture">
					<div style="margin-top:20px;">
						<input type="file" id="upload" accept="image" @change="upload">
						<label for="upload"></label>
					</div>
				</div>
      </ul>
    </div>
    <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="data" v-model="value5" @on-change='change'></popup-picker>
		<!-- <popup-picker :show.sync="showPopupPicker1" :show-cell="false" title="TEST" :data="way" v-model="value6" @on-change='change'></popup-picker> -->
    <x-button :gradients="['#d93309', '#aa0000']" class='button mt20' @click.native='confirm'>提交</x-button>
	</div>
</template>

<script>
import { XButton, PopupPicker } from 'vux'
import { mapState } from 'vuex'
import { JDGetScrapList, JDGetEmployeeInfoByOpenID, JDGetEmpAndLiableByEmpCode, JDInsertIntoFACardRect } from '@/api/getData'
import { setTimeout } from 'timers';
import Exif from 'exif-js'
export default {
  data() {
    return {
			data: [['使用年限过长，功能丧失，无法使用需淘汰（报废）', '设备性能差，耗能低，效率低，不能满足使用需求（报废）', '严重损坏，无修复价值（报废）', '长期闲置（15个月以上），今后不会再使用（报废）', '出售']],
			// way: [['出售', '报废']],
			showPopupPicker: false,
			showPopupPicker1: false,
      FCardIDList: [],
      resultList: [],
      userInfo: {},
      superviser: '',
			value5: [],
			// value6: [],
      FACardRectJson: {
        FACardRectJson: []
			},
			FPicture:'',
			picValue:''
		};
  },
  computed:{
    ...mapState({
      scrapList: state => state.mutations.scrapList,
      wxOpenId: state => state.mutations.wxOpenId,
      info: state => state.mutations.userInfo
    })
  },
  components: {
    XButton,
    PopupPicker
  },
  mounted() {
    this.scrapList.forEach(element => {
      this.FCardIDList.push(element.FinterID)
    });
    console.log(this.scrapList)
    this.getScrapList()
    this.getUserInfo()
    this.getSupervise() // 获取监管人信息
	},
	methods: {
    async confirm() {
			
      let obj = {
        FInterID: '',
        FNumber : '',
        FDate: '',
        FCardInterID: '',
        FQty: '',
        FReJect_Qty: '',
        FReJect_fee: '',
        FReJect_RevAmount: '',
        FReJect_Reason: '',
        FNote: '',
        FRectEmpID: '',
        FBillerID: '',
        FBillDate: '',
        FCheckerID: '',
        FCheckDate: '',
				FOARequestID: ''
      }
      this.resultList.forEach((item) => {
        obj.FInterID = item.FInterID
        obj.FNumber = item.FNumber
        obj.FDate = new Date().getFullYear() + '-' +  (new Date().getMonth() + 1) + '-' + new Date().getDate()
        obj.FCardInterID = item.FCardID
        obj.FQty = item.FQty
        obj.FReJect_Qty = item.FReJect_Qty
        obj.FReJect_fee = '1'
        obj.FReJect_RevAmount = '1'
        obj.FReJect_Reason = this.value5[0]
        obj.FNote = '1'
        obj.FRectEmpID = this.userInfo.FitemID
        obj.FBillerID = '1'
        obj.FBillDate = '1'
        obj.FCheckerID = '1'
        obj.FCheckDate = '1'
				obj.FOARequestID = '1'
				obj.FPicture=this.FPicture.replace(/.*;base64,/, "")
        this.FACardRectJson.FACardRectJson.push(obj)
        obj = Object.assign({}, {})
      })
      this.FACardRectJson.FACardRectJson = JSON.stringify(this.FACardRectJson.FACardRectJson)
      console.log(this.FACardRectJson)
      this.$store.commit("updateLoadingStatus", { isLoading: true });
      let data = await JDInsertIntoFACardRect(this.FACardRectJson)
      console.log(data)
      this.$vux.toast.text(data)
      this.$store.commit("updateLoadingStatus", { isLoading: false });
      setTimeout(() => {
        this.$router.go(-1)
      }, 800)

    },
    change() {

    },
    async getSupervise() {
      let data = await JDGetEmpAndLiableByEmpCode({EmpCode: this.info[0].Fnumber})
      this.superviser = data
      console.log(data)
    },
    async getUserInfo() {
      let data = await JDGetEmployeeInfoByOpenID({FWeixinOpenID: this.wxOpenId})
      console.log(data)
      this.userInfo = eval(data)[0]
    },
    async getScrapList() {
      let data = await JDGetScrapList({CardIDList: this.FCardIDList.join(',')})
      this.resultList = eval(data)
      console.log(data)
		},
		upload (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue);
    },
    imgPreview (file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
 
      if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.FPicture = this.result;
              self.postImg();
            }else {
              img.onload = function () {
								let data = self.compress(img,Orientation);
                self.FPicture = data;
                self.postImg();
              }
            }
          } 
        }
      },
      postImg () {
        //这里写接口
      },
      rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向    
        const min_step = 0;    
        const max_step = 3;      
        if (img == null)return;    
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
        let height = img.height;    
        let width = img.width;      
        let step = 2;    
        if (step == null) {    
            step = min_step;    
        }    
        if (direction == 'right') {    
            step++;    
            //旋转到原位置，即超过最大值    
            step > max_step && (step = min_step);    
        } else {    
            step--;    
            step < min_step && (step = max_step);    
        }     
        //旋转角度以弧度值为参数    
        let degree = step * 90 * Math.PI / 180;    
        let ctx = canvas.getContext('2d');    
        switch (step) {    
          case 0:    
              canvas.width = width;    
              canvas.height = height;    
              ctx.drawImage(img, 0, 0);    
              break;    
          case 1:    
              canvas.width = height;    
              canvas.height = width;    
              ctx.rotate(degree);    
              ctx.drawImage(img, 0, -height);    
              break;    
          case 2:    
              canvas.width = width;    
              canvas.height = height;    
              ctx.rotate(degree);    
              ctx.drawImage(img, -width, -height);    
              break;    
          case 3:    
              canvas.width = height;    
              canvas.height = width;    
              ctx.rotate(degree);    
              ctx.drawImage(img, -width, 0);    
              break;
        }    
    },
    compress(img,Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
        //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        console.log("大于400万像素")
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
  //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
  //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if(Orientation != "" && Orientation != 1){
        switch(Orientation){
          case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
          case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
          case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1);
      console.log('压缩前：' + initSize);
      console.log('压缩后：' + ndata.length);
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
			tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
			console.info(ndata)
      return ndata;
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
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
    li:last-child{
      display: inherit;
      .input{
        border: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        height: @rem*70;
        margin-top: @rem*20;
        border-radius: 5px;
        padding: 0 @rem*10;
        input{
          flex: 1;
          border: none;
        }
        i{
          color: #b8b8b8;
        }
      }
    }
  }
}
.button{
	width: 95%;
	margin-left: 2.5%;
}
*{
  margin: 0;
  padding: 0;
}
.show {
  width: 200px;
  height: 100px;
  overflow: hidden;
  position: relative;
  //border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 0;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover; 
}
</style>
