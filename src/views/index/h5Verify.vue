<template>
	<div>
		<a :href="CloudauthPageUrl">测试</a>
	</div>
</template>
<script>
import { JDH5Verify } from '@/api/getData'
import { mapState } from 'vuex'
export default {
	data () {
		return {
			CloudauthPageUrl:"https://cloudauth.alibaba.com/h5/h5verify.html?token=707413ae0068497d9b6f256684a53ce2&tokenSource=getVerifyToken"
		};
	},
	computed: {
		...mapState({
			wxOpenId: state => state.mutations.wxOpenId,
			userInfo: state => state.mutations.userInfo
		})
	},
	mounted() {
		this.h5Verify();
	},
	methods:{
		async h5Verify(){
			let data = await JDH5Verify({
				biz:"h5Verify",
				binding: "{\"Name\":\""+this.userInfo[0].FName+"\",\"IdentificationNumber\":\""+this.userInfo[0].FIDCard+"\"}"
			})
			console.info(JSON.parse(data));
			this.CloudauthPageUrl=JSON.parse(data).Data.CloudauthPageUrl+"&successRedirect="+encodeURIComponent("https://www.baidu.com");
			//this.CloudauthPageUrl=JSON.parse(data).Data.CloudauthPageUrl+"&failRedirect="+encodeURIComponent("https://www.baidu.com");
		}
	}
}
</script>
<style lang="less" scoped>
a:link{color:red;}

a:visited{color:black;}
</style>


