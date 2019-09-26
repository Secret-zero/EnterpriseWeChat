<template>
  <div class="wrap" id="wrap">
		<div class='employee-info'>
			<div class='headBox'>
				<img v-if='userInfo1.FPicUrl' :src='userInfo1.FPicUrl'>
			</div>
			<div class='info-content'>
				<div class='name'>{{userInfo1.FName}}</div>
				<div class='number'>工号： {{userInfo1.Fnumber}}</div>
				<div class='number'>手机：{{userInfo1.FPhone}}</div>
			</div>
		</div>
		<div class='title'>我的</div>
		<div class='applications'>
			<ul>
				<li v-for='(item, index) in list' :key='index' @click='linkInfo(item)'>
					<div class='icon'>
						<img :src='item.icon'>
					</div>
					<div>{{item.name}}</div>
				</li>
			</ul>
		</div>
		<div class='title'>报表</div>
		<div class='applications2'>
			<ul>
				<li v-for='(item, index) in list2' :key='index' @click='linkInfo(item)'>
					<div class='titles'>
						<div class='icon'>
							<img :src='item.icon'>
						</div>
						{{item.name}}
					</div>
					<i class='iconfont icon-iconfontyoujiantou'></i>
				</li>
			</ul>
		</div>
		<div class='title'>人事</div>
		<div class='applications'>
			<ul>
				<li v-for='(item, index) in list3' :key='index' @click='linkInfo(item)'>
					<div class='icon'>
						<img :src='item.icon'>
					</div>
					<div>{{item.name}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// import indexApi from '@/api/getData'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/getData'
import { AlertModule } from 'vux'
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
			list: [
				{name: '个人信息', icon: require('../../assets/images/icon1.png'), linkInfo: '/personal'},
				{name: '餐券', icon: require('../../assets/images/icon2.png'), linkInfo: '/myVoucher'},
				{name: '工资', icon: require('../../assets/images/icon3.png'), linkInfo: '/myWages'},
				{name: '财产', icon: require('../../assets/images/icon4.png'), linkInfo: '/myProperty'},
				{name: '考核', icon: require('../../assets/images/icon5.png'), linkInfo: '/assessment'},
				{name: '请假', icon: require('../../assets/images/icon6.png'), linkInfo: '/leave'},
				{name: '考勤', icon: require('../../assets/images/icon7.png'), linkInfo: '/punch'},
				{name: '产量', icon: require('../../assets/images/icon8.png'), linkInfo: '/yield'},
				{name: '充卡', icon: require('../../assets/images/icon9.png'), linkInfo: '/chargeCard'},
				{name: '来访系统', icon: require('../../assets/images/icon14.png'), linkInfo: '/Visitor'},
				{name: '企业通讯录', icon: require('../../assets/images/icon15.png'), linkInfo: '/mailList'},
				// {name: '企业通讯录', icon: require('../../assets/images/icon15.png'), linkInfo: '/mailListNew'},
				// {name: '通知', icon: require('../../assets/images/icon15.png'), linkInfo: '/reminding'},
				// {name: '百度认证', icon: require('../../assets/images/icon15.png'), linkInfo: '/baiduVerify'},
			],
			list2: [
				{name: '来料稽核单', icon: require('../../assets/images/icon10.png'), linkInfo: '/auditForm'},
				// {name: '成型当日产量', icon: require('../../assets/images/icon11.png'), linkInfo: '/dailyOutput'},
				{name: '车间当日产量', icon: require('../../assets/images/icon12.png'), linkInfo: '/workShop'},
				{name: '当日汇报查看', icon: require('../../assets/images/icon13.png'), linkInfo: '/reportView'},
			  // {name: '实人认证', icon: require('../../assets/images/icon13.png'), linkInfo: '/h5Verify'},
				// {name: 'ceshi', icon: require('../../assets/images/icon13.png'), linkInfo: '/inspectionTest'},
				
				// {name: '合理化建议', icon: require('../../assets/images/icon16.png'), linkInfo: '/suggest'}
			],
			list3:[
			  {name: '宿舍管理', icon: require('../../assets/images/icon17.png'), linkInfo: '/dormitory'}
			],
			userInfo1: {FPicUrl: require('../../assets/images/avatar.png')}
		};
	},
	computed: {
		...mapState({
			wxOpenId: state => state.mutations.wxOpenId,
			userInfo: state => state.mutations.userInfo
		})
	},
  components: {},
  mounted() {
		// this.$store.commit('SET_WXOPENID', 'ob9om0tCsmvYG4WGZQgaG5TF4jaY')
		console.log(this.userInfo)
		this.userInfo1 = this.userInfo[0]
		if (this.wxOpenId) {
			this.getUserInfo1()
		}
		if (this.wxOpenId) {
			return 
		}
		
		if (!this.$route.query.openId || !this.wxOpenId) { // 未登录的情况
			location.href = 'http://work.goldemperor.com/Home/InitWxQY'
		}
		
		// console.log(wx)
		// this.test()
	},
	methods: {
		alertTips() {
			AlertModule.show({
        title: '提示',
        content: '敬请期待',
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
		},
		async getUserInfo1 () {
			try {
				let data = await getUserInfo({FWeixinOpenID: this.wxOpenId})
				console.log(eval(data))
				this.$store.commit('SET_USERINFO', eval(data))
				this.userInfo1 = eval(data)[0]
			} catch (error) {
				if (error === '没有对应OpenID的个人信息'){
					location.href = 'http://work.goldemperor.com/Home/InitWxQY'
				}
			}
		},
		linkInfo(item) {
			if(item.name === '我要请假') return this.alertTips()
			this.$router.push({path: item.linkInfo})
		}
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.employee-info{
	background: url(../../assets/images/headBg.png) no-repeat;
	background-size: 100% 100%;
	display: flex;
	align-items: center;
	padding: @rem*48;
	.headBox{
		width: @rem*164;
		height: @rem*164;
		margin-right: @rem*34;
		img{
			width: 100%;
			height: 100%;
			border-radius: 100%;
		}
	};
	.info-content{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: @rem*150;
		color: white;
		.name{
			font-size: @rem*36;
		}
		.number{
			font-size: 24;
		}
	}
}
.title{
	height: @rem*100;
	font-size: @rem*36;
	padding-left: @rem*20;
	line-height: @rem*100;
	background: #f4f4f4;
	color: #333;
	font-weight: normal;
}
.applications{
	background: white;
	ul{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		li{
			height: @rem*186;
			width: 33.3%;
			display: flex;
			align-items:center;
			justify-content: center;
			flex-direction: column;
			border-right: 1px solid #f4f4f4;
			border-bottom: 1px solid #f4f4f4;
			color: #333;
			.icon{
				margin-bottom: @rem*15;
			}
		}
		// li:not(3n){
		// 	border-right: 1px solid #f4f4f4;
		// }
	}
}
.applications2{
	background: white;
	ul{
		width: 100%;
		li{
			color: #333;
			display: flex;
			justify-content: space-between;
			padding: @rem*20;
			border-bottom: 1px solid #f4f4f4;
			.titles{
				display: flex;
				align-items: center;
				font-size: @rem*26;
				.icon{
					margin-right: @rem*15;
					img{
						display: block;
					}
				}
			}
			.icon-iconfontyoujiantou{
				font-size: 12px;
				color: #b8b8b8;
			}
			.icon-iconfontyoujiantou:before{
				line-height: 28px;
			}
		}
	}
}
</style>
