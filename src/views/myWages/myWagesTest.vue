<template>
<div>
	<div class="write-content">
				<img src="" alt="">
					<div id="canvas"></div>
	</div>
	<div>
			<div class="btn-write-content">
					<button id="clearCanvas" class="btn btn-default btn-small">清除</button>
					<button id="saveCanvas" class="btn btn-primary btn-small">保存</button>
					<button class="btn btn-danger btn-small" onclick="hideWrite()">取消</button>
			</div>
	</div>
</div>
</template>
<script>
export default {
	data () {
		return {
		};
	},
	mounted(){
		document.querySelector('body').addEventListener('touchmove', function(e) {
        e.preventDefault();
		},{passive:false})
		this.lineCanvas({
        el: document.getElementById("canvas"), //绘制canvas的父级div
        clearEl: document.getElementById("clearCanvas"), //清除按钮
        saveEl: document.getElementById("saveCanvas"), //保存按钮
        linewidth: 1, //线条粗细，选填
        color: "black", //线条颜色，选填
        background: "#ffffff", //线条背景，选填
        paddingX: 0, // x轴偏移量
        paddingY: 0, // y轴偏移量
      });
	},
	methods:{
		 lineCanvas(obj) {
      this.linewidth = 1;
      this.color = "#000";
      this.background = "#fff";
      for (var i in obj) {
        this[i] = obj[i];
      };
      this.paddingX = this.el.getBoundingClientRect().left
      this.paddingY = this.el.getBoundingClientRect().top
      this.canvas = document.createElement("canvas");
      this.el.prepend(this.canvas);
      this.cxt = this.canvas.getContext("2d");
      this.canvas.width = this.el.clientWidth;
      this.canvas.height = this.el.clientHeight;
      this.cxt.fillStyle = this.background;
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.cxt.strokeStyle = this.color;
      this.cxt.lineWidth = this.linewidth;
      this.cxt.lineCap = "round";
      //开始绘制
      this.canvas.addEventListener("touchstart", function (e) {
        this.cxt.beginPath();
        console.log(e.changedTouches)
        this.cxt.moveTo(e.changedTouches[0].pageX-this.paddingX, e.changedTouches[0].pageY-this.paddingY);
      }.bind(this), false);
      //绘制中
      this.canvas.addEventListener("touchmove", function (e) {
        this.cxt.lineTo(e.changedTouches[0].pageX-this.paddingX, e.changedTouches[0].pageY-this.paddingY);
        this.cxt.stroke();
      }.bind(this), false);
      //结束绘制
      this.canvas.addEventListener("touchend", function () {
        this.cxt.closePath();
      }.bind(this), false);
      //清除画布
      this.clearEl.addEventListener("click", function () {
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }.bind(this), false);
      //保存图片，直接转base64
      this.saveEl.addEventListener("click", function () {
        var imgBase64 = this.canvas.toDataURL();
				console.log(imgBase64);
				
      }.bind(this), false);
    }
	}
}
</script>
<style scoped>
</style>