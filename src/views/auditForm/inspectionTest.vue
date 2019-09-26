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
			<p><a href="https://blog.csdn.net/fengshizty/article/details/25790397" target="_blank" >Html5新特性 canvas画板画直线和等比缩放居中裁剪图片</a></p>
			<p><a href="https://blog.csdn.net/UW63ZqpKxwlRL1/article/details/79251311" target="_blank">实战：图片上传组件开发</a></p>
			<p><a href="https://juejin.im/post/5b8409b451882543094b30c2#heading-3" target="_blank">纯前端 Canvas 实现 HTML 转图片，自动生成微信阅读卡片</a></p>
			<div class="form-group">
				<label for="#goal-width">目标宽度</label>
				<input v-model="goalWidth" class="form-control" id="goal-width" type="text" />
			</div>
			<div class="form-group">
				<label for="#goal-heigth">目标高度</label>
				<input v-model="goalHeight" class="form-control" id="goal-height" type="text" />
			</div>
			<div>
				<input type="file" style="display: none;" id="file-input"  name="" value="" v-on:change="fileChange" />
				<button type="button" @click="openImgFile" class="btn btn-primary">选择文件</button>
				<button type="button" @click="againDraw" class="btn btn-default">重新绘制图片</button>
				<a  download id="downloadImg" class="btn btn-success">下载图片</a>
			</div>
		</div>
		<div class="col-8">
			<h5>此处显示Canvas</h5>
			<canvas style="margin: 0 auto; display: block;" id="myCanvas" width="" height=""></canvas>
		</div>
	</div>
</template>

<script>
import $ from "jquery";
	export default{
		data(){
			return{
				goalWidth:null,//目标宽度
				goalHeight:null,//目标高度
				r:0,//压缩比例
				storeImg:new Image(),//暂存图，未在HTML显示
				aa:[{id:1,name:'张三'},{id:2,name:'李四'},{id:3,name:'王五'},{id:2,name:'赵六'}]
			}
		},
		mounted(){
			let a=this.aa.find( t=> t.id=='2') 
			console.info(a)
			let b=this.aa.filter( t=> t.id=='2')
			console.info(b)
		},
		methods:{
			//按钮模拟input-file文件打开
			openImgFile(){
				let fileinput=$('#file-input')
				if(fileinput){
					fileinput.click()
				}
			},
			//input 文件改变时触发
			fileChange(e){
				let fileinput=$('#file-input')
				//模拟一个表单
				let modelForm=new FormData();
				//获取到图片文件
				let imgData=fileinput[0].files[0]

				let imgWidth=0//图片原始宽度
				let imgHeight=0//图片原始高度
				let drawimage=this.drawImage
				let img=new Image()//接收传入的图片文件
				if(imgData){
					//向表单添加一个键值对
					modelForm.append('image',imgData)
					let reader=new FileReader();
					reader.readAsDataURL(imgData)
					//确定图片已经载入
					reader.onload=function(e){
						img.src=e.target.result
						img.onload=function(){
							//onload 改变了作用域，并不能访问data，method下的属性，方法
							imgWidth=img.width
							imgHeight=img.height
							//传入图片高度，宽度
							drawimage(img.width,img.height,img)
							console.log(img)
						}
					}
				}
				
			},
			drawImage(imgWidth,imgHeight,img){
				let canvas=document.getElementById('myCanvas')
				let wtemp=0;//缩放，或放大后的宽度高度     
				let htemp=0;
				//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
				if(canvas.getContext){
					if(imgWidth==this.goalWidth&&imgHeight==this.goalHeight){
						//图片大小跟目标大小一致
					}else if(imgHeight>this.goalHeight&&imgWidth>this.goalWidth){
						//图片高，宽都大于目标高，宽
						//获取缩放比例
						this.r=imgWidth/this.goalWidth 
						if((imgHeight/this.r) < this.goalHeight) {
							this.r =imgHeight / this.goalHeight;
						}
						//  Math.ceil()向上取整
						 wtemp = Math.ceil(imgWidth / this.r);
						 htemp = Math.ceil(imgHeight / this.r);
						this.resizeImage(wtemp,htemp,img)
					}
					canvas.width=this.goalWidth
					canvas.height=this.goalHeight
					let context=canvas.getContext('2d')
					context.drawImage(img,0,0,canvas.width,canvas.height)
					//最终canvas图片链家附加到a标签的href上 就可以下载了
					let download=document.getElementById('downloadImg')
					download.href=canvas.toDataURL('image/jpg')
				}
			},
			//设置暂存图的URL
			resizeImage(w,h,img){
				let canvasL=document.getElementById('myCanvas')
				canvasL.width=w;
				canvasL.height=h;
				canvasL.getContext('2d').drawImage(img, 0, 0, canvasL.width, canvasL.height);
				this.storeImg.src=canvasL.toDataURL("image/jpg")
			},
			againDraw(){
				this.fileChange()
			}
		}
	}
</script>

<style>
</style>