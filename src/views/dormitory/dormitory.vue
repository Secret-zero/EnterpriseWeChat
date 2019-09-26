<template>
	<div class="wrap" id="wrap">
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
	</div>
</template>
<script>
export default {
	data () {
		return {
			list: [
				{name: '新增房间床铺', icon: require('../../assets/images/icon17-1.png'), linkInfo: '/bedsAdd'},
				{name: '入住登记', icon: require('../../assets/images/icon17-2.png'), linkInfo: '/dormitoryRegistration'},
				{name: '换房登记', icon: require('../../assets/images/icon17-3.png'), linkInfo: '/dormitoryExchange'},
				{name: '退宿登记', icon: require('../../assets/images/icon17-4.png'), linkInfo: '/dormitoryExit'},
				{name: '住外补贴登记', icon: require('../../assets/images/icon17-5.png'), linkInfo: '/liveOutsideSubsidies'},
				{name: '水电表登记', icon: require('../../assets/images/icon17-6.png'), linkInfo: '/waterElectricMeterRegistration'},
				{name: '水电表抄度管理', icon: require('../../assets/images/icon17-7.png'), linkInfo: '/waterElectricMeterCopy'},
				{name: '房间维护维修', icon: require('../../assets/images/icon17-8.png'), linkInfo: '/dormitoryRepair'}
			]
		};
	},
	methods: {
		linkInfo(item) {
			this.$router.push({path: item.linkInfo})
		}
	}
}
</script>
<style lang="less" scoped>
	@import "~@/assets/less/main.less";
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
		}
	}
</style>