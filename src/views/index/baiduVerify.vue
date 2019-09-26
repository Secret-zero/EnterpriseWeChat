<template>
	<div class="body-bg">
		<a href="https://ai.baidu.com/face-verify/mobile.html">链接</a>
		<div class="sketch">
			<div class="sketch-img"></div>
			<p class="sketch-text">
				正面平视手机、保证光线充足
				<br />请勿遮挡面部
			</p>
		</div>
		<div class="prompt">
			<div class="prompt-box">
				<div class="prompt-box-text">
					<span class="prompt-box-text-number">1</span>
					<span class="prompt-box-text-content">牢记验证码，点击开始录制</span>
					<span class="prompt-box-text-border"></span>
				</div>
				<div class="prompt-box-text">
					<span class="prompt-box-text-number">2</span>
					<span class="prompt-box-text-content">开启前置摄像头，用普通话朗读数字</span>
					<span class="prompt-box-text-border"></span>
				</div>
				<div class="prompt-box-text">
					<span class="prompt-box-text-number">3</span>
					<span class="prompt-box-text-content">完成录制，等待验证结果</span>
					<!---->
				</div>
			</div>
			<span class="prompt-next" @click="getSessioncode()">下一步</span>
		</div>
		<!---->
		<div class="modal-layer" v-if="sessionCodeDisplay">
			<div class="modal-layer-mask"></div>
			<div class="modal-layer-popup">
				<div class="modal-layer-success">
					<div class="modal-layer-popup-title">请牢记以下验证码</div>
					<div class="modal-layer-popup-content">
						此验证码将于
						<span>60</span>秒后过期
						<br />用普通话朗读数字，视频时长
						<span>3-8</span>秒最佳
					</div>
					<div class="modal-layer-popup-number">
						<span v-for="(item,index) in sessionList" :key="index">{{item}}</span>
					</div>
					<div class="modal-wrapper modal-point">
						<span class="modal-confirm-btn">记住了，开始录制</span>
						<form id="myform">
							<input
								type="file"
								accept="video/*"
								capture="user"
								class="camera-input"
								@change="imgChange"
							/>
						</form>
						<!-- <video :src="videoSrc" id="video" controls="controls" style="display:none" preload="auto"></video> -->
					</div>
				</div>
				<span class="modal-layer-close" @click="sessionCodeDisplay=false"></span>
			</div>
		</div>
		<!---->
		<div class="result" v-if="resultDisplay">
			<div class="result-box">
				<span class="result-box-pic">
					<span class="result-box-pic-icon icon-top"></span>
					<span class="result-box-pic-icon icon-right"></span>
					<span class="result-box-pic-icon icon-bottom"></span>
					<span class="result-box-pic-icon icon-left"></span>
					<img
						:src=imgSrc
						class="result-box-return-img"
					/>
				</span>
				<span class="result-box-text">
					<div>活体检测
						<span class="result-box-color resulr-color-red">{{verifyMessage}}</span>
						<span class="result-box-failcolor">{{verifyCode}}</span>
					</div>
					<div>图象对比
						<span class="result-box-color resulr-color-red">{{matchMessage}}</span>
					
					</div>
				</span>
				<div class="result-box-value">
					<span class="result-box-value-text">检测分值:{{score}}</span>
					<span class="result-box-value-text">应读数字:{{create}}</span>
					<span class="result-box-value-text">检测数字:{{identify}}</span>
					<span class="result-box-value-text">对比分值:{{matchScore}}</span>
				</div>
			</div>
			<div class="result-option">
				<span class="result-option-btn result-option-btn-ok">完成</span>
				<span class="result-option-btn result-option-btn-again" @click="resultDisplay=false,sessionCodeDisplay=true">重拍</span>
			</div>
		</div>
		<!---->
		<div class="loading" v-if="loadingDisplay"><div class="loading-icon">验证中...</div></div>
	</div>
</template>

<script>
import { JDGetSessioncode,JDGetMatch } from '@/api/getData'
import { mapState } from 'vuex'
import $ from 'jquery'
import axios from '../../config/http'
import { baseUrl2 } from "../../config/env";
export default {
	data() {
		return {
			sessionCodeDisplay: false,
			resultDisplay:false,
			sessionCode: "666666",
			sessionList: [],
			videoSrc:"",
			videoNum:"",
			resultMessage:"",
			verifyMessage:"",
			verifyCode:"",
			score:0,
			create:0,
			identify:0,
			matchMessage:"",
			matchScore:0,
			imgSrc:"//aip.bdstatic.com/faceliveness/dist/1523595724898/images/pic_default.png",
			loadingDisplay:false
		};
	},
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId,
      userInfo: state => state.mutations.userInfo
    })
  },
	mounted() {
	// 	height: 100% !important;
	// margin: 0 !important;
	// font-size: 12px !important;
	// -webkit-font-smoothing: antialiased !important;
	// -moz-osx-font-smoothing: grayscale !important;
	// overflow: hidden !important;
	// font-family: tahoma, arial, Hiragino Sans GB, Microsoft YaHei, sans-serif !important;
		console.info(1);
		// $("html").css('height','100%').css('margin','0').css('-webkit-font-smoothing','antialiased')
		// .css('-moz-osx-font-smoothing','grayscale').css('overflow','hidden').css('font-family','tahoma, arial, Hiragino Sans GB, Microsoft YaHei, sans-serif')
		// if(document.body.clientWidth<370){
		// 	$("html").css('font-size','9px')
		// }else{
		// 	$("html").css('font-size','12px')
		// }
		$("html").addClass('body-bg')
		console.info(document.body.clientWidth)
	},
	methods: {
		async getSessioncode() {
			// let data= await JDGetSessioncode({})
			// this.sessionCode=data;
			this.sessionCodeDisplay = true;
			
			this.sessionList = this.sessionCode.split("");
			console.info(this.sessionCode.split(""), this.sessionList);
		},
	  imgChange() {
			this.loadingDisplay=true
			const files = event.target.files || event.dataTransfer.files
			if (files && files.length > 0) {
				let file = files[0]
				console.info(file)
				// var obj = new FormData();
				// obj.append("video",file);
				// obj.append("image", "wzh");
				// var _this = this;
				// $.ajax({
				// 		type: 'post',
				// 		url: 'http://192.168.101.233:9999/TransferService.asmx/GetMatch1',
				// 		data: obj,
				// 		cache: false,
				// 		processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
				// 		contentType: false, // 不设置Content-type请求头
				// 		success: function (res) {
				// 			var arr=res.split(':');
				// 			if(arr[0]=="ok"){
				// 				_this.img=arr[1];
				// 			}else{
				// 				alert(arr[1]);
				// 			}
				// 		},
				// });
				
				//this.getMatch1(formData);

				console.info(file.size/1024/1024+'MB')
				if (file.size > 20 * 1024 * 1024) {
					// 视频大于20MB
					confirm('您录制的视频时间过大,请重新录制')
			  } else {
					var that = this;
					var video = event.target.files[0]; //选择的文件
					var reader = new FileReader();
					var rs = reader.readAsDataURL(video);
					reader.onload = e => {
						//that.videoSrc = e.target.result;
						//that.videoNum =  e.target.result.split(";base64,"); //base64文件内容
						//console.log("videoNum"+that.videoNum[1]);
            //alert("videoNum"+that.videoNum[1])
						var canvas = document.createElement("canvas");
						var ctx = canvas.getContext("2d");
						var image = new Image();
						var quality = 1;
						image.setAttribute("crossOrigin", "Anonymous");
						image.src = that.userInfo[0].FPicUrl;
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
              //console.info(that.videoNum[1]),
							console.info(base64.replace(/.*;base64,/, ""))

							var formData1 = new FormData();
							formData1.append("video", file); 
							formData1.append("image", base64.replace(/.*;base64,/, "")); 
							let config = {
								//添加请求头
								headers: { "Content-Type": "multipart/form-data" }
							};
							axios.post(baseUrl2+'/TransferService.asmx/GetMatch1', formData1, config).then(
							function (response){ 
								that.loadingDisplay=false
								response = $.parseXML(response.data).firstChild.textContent;
								response = decodeURIComponent(response);
								response = JSON.parse(response);
								if (response.ReturnType === "success" || response.ReturnType === "S") {
									that.resultMessage = response.ReturnMsg;
									let data=response.ReturnMsg;
									if(data["verify"]["error_code"]===0){
										that.verifyMessage="成功"
										that.score=data["verify"]["result"]["score"];
										if(data["verify"]["result"]["code"]){
											that.create=data["verify"]["result"]["code"]["create"];
											that.identify=data["verify"]["result"]["code"]["identify"];
										}
										that.imgSrc="data:image/png;base64,"+data["verify"]["result"]["pic_list"][0]["pic"];
									}else{
										that.verifyMessage="失败";
										that.verifyCode=aa();
										function aa(){
											switch (data["verify"]["error_code"]) {
												case 216501:
													return "没有找到人脸";
												case 216434:
													return "活体检测失败";
												case 216507:
													return "视频中有多张脸";
												default:
													return "服务器异常"
											}
										}

									}
									if(data["match"]["error_code"]===0){
										that.matchMessage="成功";
										that.matchScore=data["match"]["result"]["score"];
									}else{
										that.matchMessage="失败";
										that.matchScore=0;
									}
									that.resultDisplay=true;
									that.sessionCodeDisplay=false;
								} else {
									vue.$vux.toast.text(response.ReturnMsg);
									console.log(response.ReturnMsg);
								}
								console.log(response); 
							}).catch(function (error) {
								console.log(error);
							});
							//that.getMatch(that.videoNum[1],base64.replace(/.*;base64,/, ""));
							//that.resultMessage={err_no:0,err_msg:'success',result:{score:0.984654366,thresholds:{"frr_1e-4":0.05,"frr_1e-3":0.3,"frr_1e-2":0.9},code:{"create":"5789","identify":"5789"},pic_list:[{"face_id":5745745747,"pic":"gsagaheryzxv..."},{"face_id":5745745747,"pic":"gsagaheryzxv..."}]},"timestamp":1509611848,"cached":0,"serverlogid":"2248375729"}
							//that.resultMessage={"error_code ":222203,"error_msg ":"image check fail "," log_id ":1368654478344827381," timestamp ":1567834482," cached ":0," result ":null}
							console.log(that.resultMessage);	
						};
						// setTimeout(function aa() {
						// 	let scale = 1;
						// 	var canvas = document.createElement("canvas");
						// 	let video11 = document.getElementById("video");
						// 	canvas.width = video11.videoWidth * scale;
						// 	canvas.height = video11.videoHeight * scale;
						// 	canvas
						// 		.getContext("2d")
						// 		.drawImage(video11, 0, 0, canvas.width, canvas.height);

						// 	var img = document.createElement("img");
						// 	img.src = canvas.toDataURL("image/png");
						// 	console.info(img.src);
						// }, 2000);
					};
				}
			}
		},
		async getMatch(video,image){
			// let data= await JDGetMatch({
			// 	formData
			// })
			// alert(1)


			let data= await JDGetMatch({
				video: video,
				image: image
			})
			this.resultMessage=data;
			if(data["verify"]["error_code"]===0){
				this.verifyMessage="成功"
				this.score=data["verify"]["result"]["score"];
				if(data["verify"]["result"]["code"]){
					this.create=data["verify"]["result"]["code"]["create"];
					this.identify=data["verify"]["result"]["code"]["identify"];
				}
				this.imgSrc="data:image/png;base64,"+data["verify"]["result"]["pic_list"][0]["pic"];
			}else{
				this.verifyMessage="失败";
				this.verifyCode=aa();
				function aa(){
					switch (data["verify"]["error_code"]) {
						case 216501:
							return "没有找到人脸";
						case 216434:
							return "活体检测失败";
						case 216507:
							return "视频中有多张脸";
						default:
							return "服务器异常"
					}
				}

			}
			if(data["match"]["error_code"]===0){
				this.matchMessage="成功";
				this.matchScore=data["match"]["result"]["score"];
			}else{
				this.matchMessage="失败";
				this.matchScore=0;
			}
			this.resultDisplay=true;
			this.sessionCodeDisplay=false;
		}
	}
};
</script>
<style lang="less">
.body-bg {
	height: 100% !important;
	margin: 0 !important;
	font-size: 12px !important;
	-webkit-font-smoothing: antialiased !important;
	-moz-osx-font-smoothing: grayscale !important;
	//overflow: hidden !important;
	font-family: tahoma, arial, Hiragino Sans GB, Microsoft YaHei, sans-serif !important;
}
* {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
@media (max-width: 374px) {
	.body-bg {
		font-size: 9px !important;
	}
}
.sketch {
	background: hsla(0, 0%, 88%, 0.35);
	padding: 0.8333rem 1.666rem 1.2rem;
}
.sketch-img {
	width: 14.916rem;
	height: 21.583rem;
	margin: 0 auto;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/sketch.png)
		0 0 no-repeat;
	-moz-background-size: 100% auto;
	background-size: 100% auto;
}
.sketch-text {
	font-size: 14px;
	color: #999;
	letter-spacing: 0;
	line-height: 24px;
	text-align: center;
}
.prompt {
	-webkit-box-shadow: 0 -4px 10px 0 #e8e8e8;
	-moz-box-shadow: 0 -4px 10px 0 #e8e8e8;
	box-shadow: 0 -4px 10px 0 #e8e8e8;
	padding-bottom: 0.833rem;
}
.prompt-box {
	padding: 4.166rem 0;
}
.prompt-box-text {
	margin: 0 auto 2.666rem;
	height: 1.334rem;
	line-height: 1.334rem;
	width: 23.5rem;
}
.prompt-box-text:last-child {
	margin-bottom: 0;
}
.prompt-box-text-number {
	-webkit-border-radius: 200px;
	-moz-border-radius: 200px;
	border-radius: 200px;
	border: 1px solid #0073eb;
	text-align: center;
	color: #0073eb;
	display: inline-block;
	width: 1.334rem;
	height: 1.333rem;
	line-height: 1.333rem;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 12px;
	margin-right: 0.833rem;
	letter-spacing: 0;
	vertical-align: top;
}
.prompt-box-text-content {
	color: #333;
	letter-spacing: 0;
	white-space: nowrap;
	display: inline-block;
	font-size: 1.333rem;
}
.prompt-box-text-border {
	height: 1.9rem;
	margin: 0.417rem 0 0.417rem 0.59rem;
	width: 0;
	border-left: 1px dotted #0073eb;
	display: block;
}
.prompt-next {
	margin: 0 auto;
	height: 4.083rem;
	line-height: 4.083rem;
	text-align: center;
	background: #0073eb;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	color: #fff;
	display: block;
	width: 28.75rem;
	font-size: 16px;
	outline: none;
	border: none;
}
.prompt-next-disabled {
	background-color: #ccc;
}
.modal-layer {
	width: 100%;
	height: auto;
}
.modal-layer,
.modal-layer-mask {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
}
.modal-layer-mask {
	opacity: 0.45;
	background: #000;
	z-index: 1;
}
.modal-layer-popup {
	width: 26.083rem;
	height: 22.666rem;
	background-color: #fff;
	padding: 0 0.833rem 0.833rem 0;
	position: fixed;
	left: 50%;
	top: 10.666rem;
	margin-left: -12.85rem;
	z-index: 2;
}
.modal-layer-popup-title {
	font-size: 16px;
	color: #333;
	height: 1.333rem;
	line-height: 1.333rem;
	text-align: center;
	margin: 3.083rem 0 1.25rem;
}
.modal-layer-popup-content {
	font-size: 1.166rem;
	color: #666;
	text-align: center;
	margin-bottom: 1.71rem;
	letter-spacing: 0;
}
.modal-layer-popup-content span {
	color: red;
}
.modal-layer-popup-number {
	font-size: 0;
	text-align: center;
}
.modal-layer-popup-number span {
	font-size: 40px;
	color: #333;
	display: inline-block;
	width: 3.65rem;
	height: 5rem;
	line-height: 5rem;
	margin-right: 0.43rem;
	border: 1px solid #e1e1e1;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	text-align: center;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.modal-layer-popup-number span:last-child {
	margin-right: 0;
}
.modal-layer-close {
	outline: none;
	position: absolute;
	width: 3.666rem;
	height: 3.666rem;
	left: 50%;
	bottom: -9.875rem;
	margin-left: -1.833rem;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_close.png)
		0 0 no-repeat;
	-moz-background-size: 100% auto;
	background-size: 100% auto;
}
.modal-layer-fail-icon {
	width: 3.192rem;
	height: 2.74rem;
	margin: 2.096rem auto 2.925rem;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_fail.png)
		0 0 no-repeat;
	-moz-background-size: 100% auto;
	background-size: 100% auto;
}
.modal-layer-fail-title {
	text-align: center;
	font-size: 1.5rem;
	color: #333;
	margin-bottom: 0.6rem;
}
.modal-layer-fail-detail {
	font-size: 1.166rem;
	color: #666;
	text-align: center;
}
.modal-layer-fail-restart {
	background: #0073eb;
	font-size: 1.333rem;
	color: #fff;
}
.modal-layer-fail-restart,
.modal-layer .modal-wrapper {
	height: 4.083rem;
	text-align: center;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	line-height: 4.083rem;
	position: absolute;
	width: 24rem;
	bottom: 0.84rem;
}
.modal-layer .modal-wrapper {
	background: #bcd2eb;
}
.modal-layer .modal-wrapper.modal-point {
	background: #0073eb;
}
.modal-layer .modal-confirm-btn {
	font-size: 16px;
	color: #fff;
	width: 100%;
	height: 100%;
}
.modal-layer .camera-input {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.loading {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.45);
	z-index: 10;
}
.loading-icon {
	width: 4.667rem;
	height: 5rem;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/loading.png)
		center 0 no-repeat;
	-moz-background-size: 50% 50%;
	background-size: 50% 50%;
	position: absolute;
	left: 50%;
	margin-left: -2.334rem;
	top: 50%;
	margin-top: -2.5rem;
	text-align: center;
	font-size: 1.166rem;
	color: #fff;
	line-height: 8rem;
}
.result {
	background: #e1e1e1;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	padding: 1.25rem;
}
.result-box {
	background: #fff;
	-webkit-box-shadow: 0 -4px 10px 0 #e8e8e8;
	-moz-box-shadow: 0 -4px 10px 0 #e8e8e8;
	box-shadow: 0 -4px 10px 0 #e8e8e8;
	padding: 3.333rem 5.75rem 4rem;
	margin-bottom: 1.25rem;
}
.result-box-pic {
	display: block;
	width: 17.25rem;
	height: 17.25rem;
	margin: 0 auto 2.333rem;
	position: relative;
	text-align: center;
}
.result-box-pic-icon {
	position: absolute;
	width: 1.677rem;
	height: 1.677rem;
}
.result-box-pic .icon-top {
	left: 0;
	top: 0;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_left_top.png)
		0 0 no-repeat;
	-moz-background-size: 50% 50%;
	background-size: 50% 50%;
}
.result-box-pic .icon-right {
	right: 0;
	top: 0;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_right_top.png)
		0.833rem 0 no-repeat;
	-moz-background-size: 50% 50%;
	background-size: 50% 50%;
}
.result-box-pic .icon-bottom {
	right: 0;
	bottom: 0;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_right_bottom.png)
		0.833rem 0.833rem no-repeat;
	-moz-background-size: 50% 50%;
	background-size: 50% 50%;
}
.result-box-pic .icon-left {
	left: 0;
	bottom: 0;
	background: url(//aip.bdstatic.com/faceliveness/dist/1523595724898/images/icon_left_bottom.png)
		0 0.833rem no-repeat;
	-moz-background-size: 50% 50%;
	background-size: 50% 50%;
}
.result-box-pic .result-box-return-img {
	width: 10.25rem;
	display: block;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.result-box-text {
	font-size: 1.5rem;
	color: #00002d;
	display: block;
	text-align: center;
	height: 4rem;
	margin-bottom: 3.542rem;
}
.result-box-color {
	margin-bottom: 2rem;
}
.result-box-color.resulr-color-red {
	color: #f30;
}
.result-box-color.resulr-color-green {
	color: #30ac69;
}
.result-box-failcolor {
	color: #999;
	font-size: 1.166rem;
	display: block;
	text-align: center;
}
.result-box-value {
	width: 15rem;
	margin: 0 auto;
}
.result-box-value-text {
	color: #999;
	font-size: 1.333rem;
	margin-bottom: 1.25rem;
	display: block;
}
.result-box-value-text:last-child {
	margin-bottom: 0;
}
.result-option {
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
}
.result-option-btn {
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	text-align: center;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-moz-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	height: 4.083rem;
	line-height: 4.083rem;
	font-size: 1.333rem;
}
.result-option-btn.result-option-btn-ok {
	background: #0073eb;
	color: #fff;
	border: 1px solid #0073eb;
	margin-right: 1.25rem;
}
.result-option-btn.result-option-btn-again {
	color: #0073eb;
	background: #f5f5f5;
	border: 1px solid #0073eb;
}
// .icon-bottom:before {
//     content: "" !important;
// }
</style>