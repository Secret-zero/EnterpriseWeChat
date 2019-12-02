<template>
  <div class="wrap" id="wrap">
    <div class="wxLogin">
			<div class="form">
				<input type="text" name="" placeholder="请输入真实姓名" v-model='form.name'>
				<input type="tel" name="" placeholder="请输入手机号码" v-model='form.Phone' maxlength="11">
				<div class="code">
					<input type="text" name="" placeholder="请输入验证码" v-model='smsCode' />
					<div class="btn submit" v-if="isSmsMessage" @click='onSms()'>获取验证码</div>
					<div class="btn submit" v-if="!isSmsMessage"><countdown v-model="time" @on-finish="finish"></countdown></div>
				</div>
				<!-- <input type="text" name="" placeholder="请输入邀请码" v-model="form.shopInvitationCode" v-if="params.shopInvitationCode"> -->
				<!-- <input type="text" name="" placeholder="请设置8-20位登录密码"> -->
			</div>
			<div class="login-agree">
				<check-icon :value.sync="form.agree">已阅读并同意</check-icon>
				<b @click="popupShow=!popupShow">《企业移动应用平台用户协议》</b>
			</div>
			<!-- <div class="title">绑定后，您的微信账号和手机号都可以登录</div> -->
			<div class="submit" @click="wxbind">绑定</div>
			<!-- <div class="submit mt20" @click="test" v-if='$route.query.mobile === "15058760918"'>绑定openId，勿点</div> -->
		</div>
		<div v-transfer-dom>
			<popup v-model="popupShow" height="100%">
				<div class="popup-content">
					<h1>企业移动应用平台用户协议</h1>
					<p>欢迎您使用本公司企业移动应用平台！</p>
					<p>　　为使用本公司企业移动应用平台服务（以下简称“本服务”），请你审慎阅读并充分理解《企业移动应用平台用户协议》（以下简称“本协议”）各条款内容，特别是免除或限制责任的相应条款，并选择接受或不接受。你选择接受，则视为你自愿遵守本协议之所有规定。</p>
					<p>　　除非你已阅读并接受本协议所有条款，否则你无权使用企业移动应用平台服务。你对本服务的登录、查看、发布、处理信息等行为即视为你已阅读并同意本协议的约束。</p>
					<p>　　1、本协议是你与金帝集团股份有限公司及其相关服务可能存在的运营关联单位（以下简称“本公司”）之间关于你使用本服务所订立的协议。 “用户”是指注册、关注、登录、使用本公司企业信息平台的个人或组织，在本协议中更多地称为“你”。</p>
					<p>　　2、企业移动应用平台是本公司向用户提供的信息发布、内部联络、工作服务、工作管理以及与此相关的互联网信息技术服务。本公司企业移动应用平台包括企业微信公众号（金帝集团股份有限公司）、企业微信号（金帝集团股份有限公司）、OA（http://oa.goldemperor.com）、MES小程序等。</p>
					<p>　　3、如需使用本公司企业移动应用平台服务，须先成为本公司企业移动应用平台的关注用户。你须使用你自己注册且是用你本人身份证验证通过的实名制微信号关注本公司的企业微信公众号、企业微信号。成为关注用户应当如实填写和提交帐号注册与认证资料，完成信息登记，并对资料的真实性、合法性、准确性和有效性承担责任。</p>
					<p>　　4、你同意授权本公司在法律允许和审核需要的范围内对你提交的资料、信息及相关背景信息、关联信息进行查询，并根据审核情况进行独立判断后确定认证结果。本公司依据你填写和提交的帐号资料，在法律允许的范围内备案存档并可向其他用户展示你的注册信息。</p>
					<p>　　5、一旦你使用你的微信成功关注本公司的企业微信公众号、企业微信号，即视为是你自己本人所为。使用你成为本企业移动应用平台的关注用户的微信号在企业移动应用平台进行信息发布、工作处理、用户消息处理等均视为是你自己本人所为。</p>
					<p>　　6、你理解并同意，本服务平台是为关注用户提供信息发布、分享、获取以及工作服务、处理的平台，你必须为自己使用本公司企业移动应用平台的一切行为负责，包括你所发布、处理的任何内容以及由此产生的任何后果。你应对本服务平台的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因风险而导致的任何损失或损害承担责任。</p>
					<h2>金帝集团股份有限公司</h2>
					<x-button type="warn" @click.native="popupClose">已阅并同意</x-button>
				</div>
			</popup>
		</div>
	</div>	
</template>

<script>
import { JDgetSmsCode, JDWeChatBindingUser,getUserInfo } from '@/api/getData'
import { Countdown,CheckIcon,Popup,XButton,TransferDomDirective as TransferDom} from 'vux'
export default {
  data() {
    return {			
			time: 120,
			isSmsMessage: true,
			form: {
				userpic: this.$route.query.headImg ? this.$route.query.headImg : '',
        nickname: this.$route.query.nickName ? this.$route.query.nickName : '',
				name: '',
				sex: '',
        Phone: '',
				name: '',
				agree:false,
        WeixinOpenID: this.$route.query.openId,
			},
			popupShow:false,
			code: '',
			smsCode: ''
		};
	},
	computed: {},
	directives: {
    TransferDom
  },
  components: {Countdown,CheckIcon,Popup,XButton},
  mounted() {
		if (this.$route.query.openId) { // 登录
			this.$store.commit('SET_WXOPENID', this.$route.query.openId)
			this.getUserInfo1()
			return 
		}
	},
	methods: {
		test() {
			this.$store.commit('SET_WXOPENID', 'ob9om0tCsmvYG4WGZQgaG5TF4jaY')
		},
		async getUserInfo1 () {
			// try {
				let data = await getUserInfo({FWeixinOpenID: this.$route.query.openId})
				this.$store.commit('SET_WXOPENID', this.$route.query.openId)
				this.$router.replace({path: '/', query: {openId: this.$route.query.openId}})
			// } catch (error) {
			// 	console.log(error)
			// 	if (error === '没有对应OpenID的个人信息'){
					
			// 	}
			// }
			// console.log(eval(data))
			// this.$store.commit('SET_USERINFO', eval(data))
		},
		async wxbind() {
			
			if ((parseInt(this.smsCode)!=999999)&&(parseInt(this.code) !== parseInt(this.smsCode))){
				this.$vux.toast.text('请输入正确验证码')
				return
			} else {
				if (!this.form.name) {
					this.$vux.toast.text('请输入真实姓名')
					return
				}
				if (!this.form.Phone){
					this.$vux.toast.text('请填写手机号码')
					return 
				}
				if(!this.form.agree){
					this.$vux.toast.text('请先阅读并同意相关协议');
					return ;
				}
			}
			let data = await JDWeChatBindingUser(this.form)
			this.$vux.toast.text(data)
			this.$router.push({path: '/index', query: {openId: this.$route.query.openId}})
			console.log(data)
			console.log(this.form)
		},
		finish() {
			this.time = 120
			this.isSmsMessage = true
		},
    async onSms() {
			this.$vux.toast.text('验证码暂时先用999999')
			// // if (!this.form.Phone){
			// // 	this.$vux.toast.text('请填写手机号码')
			// // 	return 
			// // }
			// // this.isSmsMessage = false
			// // let data = await JDgetSmsCode({phone: this.form.Phone})
			// // console.log(data)
			// // this.code = data
			this.code = 999999
		},
		popupClose(){
			this.form.agree = true;
			this.popupShow = false;
		}
	}
};
</script>
<style lang="less" scoped>
@import "~@/assets/less/main.less";
.wxLogin{padding: 0 @rem*20;margin-top: @rem*20;}
	.form{
		input{width: 100%;height: @rem*80;background-color: #fff;margin-bottom: @rem*20;border: 1px solid #d8d8d8;border-radius: 5px;padding-left: @rem*20;}
		.code{display: flex;
			input{width: @rem*500;}
			.btn{margin-left: @rem*20;flex: 1;font-size: 14px;}
		}		
	}
	.login-agree{line-height: 1rem;margin-bottom: @rem*20;}
	.login-agree b{
		text-decoration: underline;
	}
	.title{color: #838383;margin: @rem*20 0;}
	.submit{
		width: 100%;
		background-color: #f32f31;
		text-align: center;
		height: 1.06666667rem;
		line-height: 1.06666667rem;
		color: #fff;
		border-radius: 5px;
		font-size: 18px;
	}
	.mint-popup{width: 100%;background-color: #f8f8f8;
		.title{height: @rem*100;line-height: @rem*100;border-bottom: 1px solid #ccc;font-size: 16px;font-weight: 700;text-align: center;}
		.content{padding: @rem*20;}
		.bottom{display: flex;
			div{flex: 1;text-align: center;font-size: 16px;margin: 0 @rem*40;border-radius: 5px;}
			.left{height: @rem*100;line-height: @rem*98;border: 1px solid #dedede;background-color: #fff;}
			.right{background-color: #f25252;color: #fff;height: @rem*100;line-height: @rem*100;}
    }
	}
	.popup-content{
		background-color: #fff;
		padding:  @rem*30;
		height: 100%;
		overflow-y: scroll;
		overflow-x:hidden;
		font-size: 14px;
		line-height: 24px;
		color: #666;
	}
	.popup-content p{
		margin: 5px 0;
	}
	.popup-content h1{
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #333;
		line-height: 30px;
		padding: 10px 0;
	}
	.popup-content h2{
		text-align: right;
		font-size: 16px;
		line-height: 30px;
		margin: 10px 0;
	}
</style>
