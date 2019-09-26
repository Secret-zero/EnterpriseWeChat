<template>
	<div class="list" style="background: #e2e2e2;">
		<ul>
			<li
				v-for="(item, index) in result"
				:key="index"
				class="mt20"
				:style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'"
			>
				<flexbox>
					<flexbox-item>
						<div class="flex-demo">月份：</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo">核算度数：</div>
					</flexbox-item>
				</flexbox>
				<flexbox>
					<flexbox-item>
						<div class="flex-demo">上次抄度：</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo">本次抄度：</div>
					</flexbox-item>
				</flexbox>
				<flexbox>
					<flexbox-item>
						<div class="flex-demo">单价：</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo">金额：</div>
					</flexbox-item>
				</flexbox>
				<flexbox>
					<flexbox-item>
						<div class="flex-demo">抄表人：</div>
					</flexbox-item>
					<flexbox-item>
						<div class="flex-demo">抄表时间：</div>
					</flexbox-item>
				</flexbox>
			</li>
		</ul>
		<tabbar style="position:fixed;">
			<tabbar-item link="/waterElectricMeterRegistration">
				<span slot="label">水电表登记</span>
			</tabbar-item>
			<tabbar-item link="/waterElectricMeterRegistration2">
				<span slot="label">入住情况</span>
			</tabbar-item>
			<tabbar-item link="/waterElectricMeterRegistration3" selected>
				<span slot="label">历史抄表</span>
			</tabbar-item>
			<tabbar-item link="/waterElectricMeterRegistration4">
				<span slot="label">历史核算</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>
<script>
import { Tabbar, TabbarItem, Flexbox, FlexboxItem } from "vux";
export default {
	data() {
		return {
			result: [{}, {}]
		};
	},
	components: {
		Tabbar,
		TabbarItem,
		Flexbox,
		FlexboxItem
	}
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.flex-demo {
	border-radius: 4px;
	background-clip: padding-box;
}
</style>
