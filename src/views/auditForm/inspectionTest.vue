<template>
	<div class="row">
		<div class="col-4">
			<h5>组件：Canvas 实现 HTML 转图片</h5>
			<ol>
				<li>上传图片</li>
				<li>根据目标宽度，高度，居中剪裁</li>
				<li>保存下载图片</li>
			</ol>
			<h5>参考链接</h5>
			<p>
				<a
					href="https://blog.csdn.net/fengshizty/article/details/25790397"
					target="_blank"
				>Html5新特性 canvas画板画直线和等比缩放居中裁剪图片</a>
			</p>
			<p>
				<a
					href="https://blog.csdn.net/UW63ZqpKxwlRL1/article/details/79251311"
					target="_blank"
				>实战：图片上传组件开发</a>
			</p>
			<p>
				<a
					href="https://juejin.im/post/5b8409b451882543094b30c2#heading-3"
					target="_blank"
				>纯前端 Canvas 实现 HTML 转图片，自动生成微信阅读卡片</a>
			</p>
			<div class="form-group">
				<label for="#goal-width">目标宽度</label>
				<input v-model="goalWidth" class="form-control" id="goal-width" type="text" />
			</div>
			<div class="form-group">
				<label for="#goal-heigth">目标高度</label>
				<input v-model="goalHeight" class="form-control" id="goal-height" type="text" />
			</div>
			<div>
				<input type="file" style="display: none;" id="file-input" name value v-on:change="fileChange" />
				<button type="button" @click="openImgFile" class="btn btn-primary">选择文件</button>
				<button type="button" @click="againDraw" class="btn btn-default">重新绘制图片</button>
				<a download id="downloadImg" class="btn btn-success">下载图片</a>
			</div>
		</div>
		<div class="col-8">
			<h5>此处显示Canvas</h5>
			<canvas style="margin: 0 auto; display: block;" id="myCanvas" width height></canvas>
		</div>

		<div class="login_div">
			<button id="wxsys" type="primary" @click="sys_click">扫一扫</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="menuShareAppMessage_click">分享</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="chooseImage_click">选取图片</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="startRecord_click">开始音频</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="startWifi_click">开启wifi</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="connectWifi_click">连接wifi</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="getWifiList_click">获取wifi信息1</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="onGetWifiList_click">获取wifi信息2</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="openBluetoothAdapter_click">蓝牙</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="setClipboardData_click">剪贴板</button>
		</div>
		<div class="login_div">
			<button type="primary" @click="getNetworkType_click">网络状态</button>
		</div>

		<div>
        <!--开启摄像头-->
        <img @click="callCamera" :src="headImgSrc" alt="摄像头">
        <!--canvas截取流-->
        <canvas ref="canvas" width="640" height="480"></canvas>
        <!--图片展示-->
        <video ref="video" width="640" height="480" autoplay></video>
        <!--确认-->
        <el-button size="mini" type="primary" @click="photograph"></el-button>
    </div>
	</div>
</template>

<script>
import $ from "jquery";
import { JDScanQRCode, JDWorkSignature } from "@/api/getData";

export default {
	data() {
		return {
			goalWidth: null, //目标宽度
			goalHeight: null, //目标高度
			r: 0, //压缩比例
			storeImg: new Image(), //暂存图，未在HTML显示
			aa: [
				{ id: 1, name: "张三" },
				{ id: 2, name: "李四" },
				{ id: 3, name: "王五" },
				{ id: 2, name: "赵六" }
			],
			aVideo:'',
			aCanvas:'',
			ctx:''
		};
	},
	mounted() {
		this.get();
		let a = this.aa.find(t => t.id == "2");
		console.info(a);
		let b = this.aa.filter(t => t.id == "2");
		console.info(b);
	},
	methods: {
		//按钮模拟input-file文件打开
		openImgFile() {
			let fileinput = $("#file-input");
			if (fileinput) {
				fileinput.click();
			}
		},
		//input 文件改变时触发
		fileChange(e) {
			let fileinput = $("#file-input");
			//模拟一个表单
			let modelForm = new FormData();
			//获取到图片文件
			let imgData = fileinput[0].files[0];

			let imgWidth = 0; //图片原始宽度
			let imgHeight = 0; //图片原始高度
			let drawimage = this.drawImage;
			let img = new Image(); //接收传入的图片文件
			if (imgData) {
				//向表单添加一个键值对
				modelForm.append("image", imgData);
				let reader = new FileReader();
				reader.readAsDataURL(imgData);
				//确定图片已经载入
				reader.onload = function(e) {
					img.src = e.target.result;
					img.onload = function() {
						//onload 改变了作用域，并不能访问data，method下的属性，方法
						imgWidth = img.width;
						imgHeight = img.height;
						//传入图片高度，宽度
						drawimage(img.width, img.height, img);
						console.log(img);
					};
				};
			}
		},
		drawImage(imgWidth, imgHeight, img) {
			let canvas = document.getElementById("myCanvas");
			let wtemp = 0; //缩放，或放大后的宽度高度
			let htemp = 0;
			//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
			if (canvas.getContext) {
				if (imgWidth == this.goalWidth && imgHeight == this.goalHeight) {
					//图片大小跟目标大小一致
				} else if (imgHeight > this.goalHeight && imgWidth > this.goalWidth) {
					//图片高，宽都大于目标高，宽
					//获取缩放比例
					this.r = imgWidth / this.goalWidth;
					if (imgHeight / this.r < this.goalHeight) {
						this.r = imgHeight / this.goalHeight;
					}
					//  Math.ceil()向上取整
					wtemp = Math.ceil(imgWidth / this.r);
					htemp = Math.ceil(imgHeight / this.r);
					this.resizeImage(wtemp, htemp, img);
				}
				canvas.width = this.goalWidth;
				canvas.height = this.goalHeight;
				let context = canvas.getContext("2d");
				context.drawImage(img, 0, 0, canvas.width, canvas.height);
				//最终canvas图片链家附加到a标签的href上 就可以下载了
				let download = document.getElementById("downloadImg");
				download.href = canvas.toDataURL("image/jpg");
			}
		},
		//设置暂存图的URL
		resizeImage(w, h, img) {
			let canvasL = document.getElementById("myCanvas");
			canvasL.width = w;
			canvasL.height = h;
			canvasL
				.getContext("2d")
				.drawImage(img, 0, 0, canvasL.width, canvasL.height);
			this.storeImg.src = canvasL.toDataURL("image/jpg");
		},
		againDraw() {
			this.fileChange();
		},

		async sys_click() {
			//这里【url参数一定是去参的本网址】
			// $.get("获取微信认证参数的地址?url=去参的本网页地址", function(data){
			//var jsondata=$.parseJSON(data);
			let form = {
				url: location.href.split("#")[0]
			};

			let _this = this;
			let data = await JDWorkSignature(form);
			let jsondata = JSON.parse(data);
			console.log("jsondata", jsondata);
			wx.config({
				beta: true,
				// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				debug: true,
				// 必填，公众号的唯一标识
				appId: jsondata.appid, //jsondata.model.appId,
				// 必填，生成签名的时间戳
				timestamp: jsondata.timestamp, //+ jsondata.model.timestamp,
				// 必填，生成签名的随机串
				nonceStr: jsondata.nonceStr, //jsondata.model.nonceStr,
				// 必填，签名
				signature: jsondata.signature, // jsondata.model.signature,
				// 必填，需要使用的JS接口列表，所有JS接口列表
				jsApiList: [
					"checkJsApi",
					"scanQRCode",
					"onMenuShareAppMessage",
					"chooseImage",
					"startRecord",
					"startWifi",
					"connectWifi",
					"getWifiList",
					"onGetWifiList",
					"openBluetoothAdapter",
					"setClipboardData",
					"getNetworkType"
				]
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

		menuShareAppMessage_click() {
			wx.ready(function() {
				wx.onMenuShareAppMessage({
					title: "分享标题", // 分享标题
					desc: "分享描述", // 分享描述
					link: "http://work.goldemperor.com", // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
					imgUrl:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569746815939&di=f6c417385035c77cd0fdc8e0fc59a149&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7af40ad162d9f2d3304da51ba2ec8a136227cce2.jpg", // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数
						console.log("成功");
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
						console.log("失败");
					}
				});
			});
		},
		chooseImage_click() {
			wx.ready(function() {
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
					defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
					isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
					success: function(res) {
						var localIds = res.localIds; // 返回选定照片的本地ID列表，
						// andriod中localId可以作为img标签的src属性显示图片；
						// iOS应当使用 getLocalImgData 获取图片base64数据，从而用于img标签的显示（在img标签内使用 wx.chooseImage 的 localid 显示可能会不成功）
					}
				});
			});
		},
		startRecord_click() {
			wx.ready(function() {
				wx.startRecord();
			});
		},
		startWifi_click() {
			wx.ready(function() {
				wx.startWifi({
					success: function(res) {
						console.log(res.errMsg);
					}
				});
			});
		},
		connectWifi_click() {
			wx.ready(function() {
				wx.connectWifi({
					SSID: "12348", // 设备SSID
					BSSID: "8a:25:93:1c:16:c4", // 设备BSSID
					password: "88889999", // 设备密码
					success: function(res) {
						console.log(res.errMsg);
					}
				});
			});
		},
		getWifiList_click() {
			wx.ready(function() {
				wx.getWifiList({
					success: function(res) {
						console.log(res.errMsg);
					}
				});
			});
		},
		onGetWifiList_click() {
			wx.ready(function() {
				wx.onGetWifiList(function(res) {
					if (res.wifiList.length) {
						for (var i = 0; i < res.wifiList.length; i++) {
							console.log("=====wifiList======");
							console.log("SSID:" + res.wifiList[i].SSID);
							console.log("BSSID:" + res.wifiList[i].BSSID);
							console.log("secure:" + res.wifiList[i].secure);
							console.log("secure:" + res.wifiList[i].signalStrength);
							console.log("====================");
						}
					}
				});
			});
		},

		async openBluetoothAdapter_click() {
			//这里【url参数一定是去参的本网址】
			// $.get("获取微信认证参数的地址?url=去参的本网页地址", function(data){
			//var jsondata=$.parseJSON(data);
			let form = {
				url: location.href.split("#")[0]
			};

			let _this = this;
			let data = await JDWorkSignature(form);
			let jsondata = JSON.parse(data);
			console.log("jsondata", jsondata);
			wx.config({
				beta: true,
				// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				debug: true,
				// 必填，公众号的唯一标识
				appId: jsondata.appid, //jsondata.model.appId,
				// 必填，生成签名的时间戳
				timestamp: jsondata.timestamp, //+ jsondata.model.timestamp,
				// 必填，生成签名的随机串
				nonceStr: jsondata.nonceStr, //jsondata.model.nonceStr,
				// 必填，签名
				signature: jsondata.signature, // jsondata.model.signature,
				// 必填，需要使用的JS接口列表，所有JS接口列表
				jsApiList: [
					"checkJsApi",
					"scanQRCode",
					"onMenuShareAppMessage",
					"chooseImage"
				]
			});

			wx.error(function(res) {
				alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
			});

			wx.ready(function() {
				wx.openBluetoothAdapter({
					success: function(res) {
						console.log("成功" + res);
					},
					fail: function(res) {
						console.log("失败" + res);
					}
				});
			});
		},
		setClipboardData_click() {
			wx.ready(function() {
				wx.setClipboardData({
					data: "data", // 设置的
					success: function(res) {
						console.log(res.errMsg);
					}
				});
			});
		},
		getNetworkType_click() {
			wx.ready(function() {
				wx.getNetworkType({
					success: function(res) {
						var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
						console.log(networkType);
					}
				});
			});
		},
		// 调用摄像头
    callCamera () {
      // H5调用电脑摄像头API
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(success => {
        // 摄像头开启成功
        this.$refs['video'].srcObject = success
        // 实时拍照效果
        this.$refs['video'].play()
      }).catch(error => {
        console.error('摄像头开启失败，请检查摄像头是否可用！')
      })
    },
    // 拍照
    photograph () {
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
      
　　　 // 由字节转换为KB 判断大小
      let str = imgBase64.replace('data:image/jpeg;base64,', '')
      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2)
　　　 // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2)
      console.log(size)
 
 　　  // 上传拍照信息  调用接口上传图片 .........
 
      // 保存到本地
      let ADOM = document.createElement('a')
      ADOM.href = this.headImgSrc
      ADOM.download = new Date().getTime() + '.jpeg'
      ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
      if (!this.$refs['video'].srcObject) return
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    }
	}
};
</script>

<style>
</style>