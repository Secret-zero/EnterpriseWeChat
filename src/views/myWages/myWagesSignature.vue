<template>
	<div>
		<div id="canvas" ref="canvas">
			<p id="clearCanvas" ref="clearCanvas">清除</p>
			<p id="saveCanvas" ref="saveCanvas">保存</p>
			<!-- <button @click="getSaveFaceRecognition">保存图片，直接转base64</button> -->
		</div>
		<div class="mySign" v-show="isSign">
			<img :src="signSrc" alt />
		</div>
	</div>
</template>
<script>
import $ from "jquery";
import { userInfo } from 'os';
import { mapState } from 'vuex'
import { JDSaveFaceRecognition } from "@/api/getData";
export default {
	data() {
		return {
			isSign: false,
			signSrc: ""
		};
	},
	computed: {
    ...mapState({
      userInfo1: state => state.mutations.userInfo
    })
  },
	mounted() {
		/*去掉iphone手机滑动默认行为*/
		// $('body').on('touchmove', function (event) {
		// 		event.preventDefault();
		// });
		// $("body").bind("touchmove",function(event){
    //    event.preventDefault();
		// });
		document.querySelector('body').addEventListener('touchmove', function(e) {
        e.preventDefault();
		},{passive:false})
		this.lineCanvas({
			el: this.$refs.canvas, //绘制canvas的父级div
			clearEl: this.$refs.clearCanvas, //清除按钮
			saveEl: this.$refs.saveCanvas //保存按钮
		});
	},
	methods: {
		lineCanvas(obj) {
			this.linewidth = 2;
			this.color = "#000000";
			this.background = "#ffffff";
			for (var i in obj) {
				this[i] = obj[i];
			}
			this.canvas = document.createElement("canvas");
			this.el.appendChild(this.canvas);
			this.cxt = this.canvas.getContext("2d");
			this.canvas.width = this.el.clientWidth;
			this.canvas.height =  document.documentElement.clientHeight || document.body.clientHeight;//this.el.clientHeight;
			this.cxt.fillStyle = this.background;
			this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.cxt.strokeStyle = this.color;
			this.cxt.lineWidth = this.linewidth;
			this.cxt.lineCap = "round";
			//开始绘制
			this.canvas.addEventListener(
				"touchstart",
				function(e) {
					this.cxt.beginPath();
					this.cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
				}.bind(this),
				false
			);
			//绘制中
			this.canvas.addEventListener(
				"touchmove",
				function(e) {
					this.cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
					this.cxt.stroke();
				}.bind(this),
				false
			);
			//结束绘制
			this.canvas.addEventListener(
				"touchend",
				function() {
					this.cxt.closePath();
					let imgBase64 = this.canvas.toDataURL();
					//console.log(imgBase64);
					this.signSrc = imgBase64;
					//TODO this.isSign = true;
				}.bind(this),
				false
			);
			//清除画布
			this.clearEl.addEventListener(
				"click",
				function() {
					this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
				}.bind(this),
				false
			);
			//保存图片，直接转base64
			this.saveEl.addEventListener(
				"click",
				async function() {
					let imgBase64 = this.canvas.toDataURL();
					//console.log(imgBase64);
					this.signSrc = imgBase64;
					//TODO this.isSign = true;
					console.info(imgBase64)
					let data = await JDSaveFaceRecognition({ 
						FEmpID: this.userInfo1[0].FitemID,
						FYear: this.$route.query.FYear,
						FMonth: this.$route.query.FMonth,
						FNumber: this.userInfo1[0].Fnumber,
						Base64: this.signSrc.replace(/.*;base64,/, "")
					});
				}.bind(this),
				false
			);
		},	
		// async getSaveFaceRecognition() {
				
		// 	let data = await JDSaveFaceRecognition({ 
		// 		FEmpID: this.userInfo1[0].FitemID,
		// 		FYear: this.$route.query.FYear,
		// 		FMonth: this.$route.query.FMonth,
		// 		FNumber: this.userInfo1[0].Fnumber,
		// 		Base64: this.signSrc.replace(/.*;base64,/, "")
		// 	});
		// 	this.result = eval(data);
		// 	console.log(data);
		// }
	}
};
</script>
<style scoped lang="less" scoped>
#canvas {
	width: 100%;
	height: 100%;
	position: relative;
	canvas {
		display: block;
	}
	#clearCanvas {
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		border: 1px solid #dedede;
		z-index: 1;
	}
	#saveCanvas {
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 0;
		border: 1px solid #dedede;
		z-index: 1;
	}
}
// .mySign {
// 	width: 100%;
// 	height: 300px;
// 	img {
// 		width: 100%;
// 		height: 300px;
// 	}
// }
.test {
	width: 100%;
	height: 200px;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
}
</style>