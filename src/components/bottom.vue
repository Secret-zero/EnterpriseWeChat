<template>
  <div class="wrap" id="wrap">
   <tabbar style="position:fixed;">
			<tabbar-item link="/waterElectricMeterRegistration">
				<span slot="label">水电表登记</span>
			</tabbar-item>
			<tabbar-item link="/waterElectricMeterRegistration2">
				<span slot="label">入住情况</span>
			</tabbar-item>
			<tabbar-item link="/waterElectricMeterRegistration3">
				<span slot="label">历史抄表</span>
			</tabbar-item>
			<tabbar-item link="/waterElectricMeterRegistration4">
				<span slot="label">历史核算</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  data() {
    return {
		};
  },
  directives: {
  },
  components: {
    Tabbar, TabbarItem
  },
  mounted() {
	},
	methods: {
    
	}
};
</script>

<style lang="less" scoped>
</style>
