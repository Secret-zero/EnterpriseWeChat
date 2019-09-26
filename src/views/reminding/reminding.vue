<template>
	<div>
		<div class="list">
			<div style="text-align:center;font-size:15px;margin:15px"> {{FFromDesc}}</div>
			<ul>
				<li v-for="(value,key) in dataHead" :key="key" class="mt20">
					<div class="mt10">{{key}}: {{value}}</div>
				</li>
			</ul>
			<div v-for="(item,index) in dataValue" :key="item.key" :style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'">
				<ul>
					<li v-for="(value,key) in item" :key="key" class="mt20">
						<div class="mt10">{{key}}: {{value}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { JDGetWeixinGridFieldHead,JDGetWeixinGridFieldValue } from "@/api/getData";
import $ from "jquery";
export default {
	data () {
		return {
			dataHead:[],
			dataValue:[],
			FFromDesc:""
		};
	},
	mounted() {
		this.GetWeixinGridFieldHead();
    this.GetWeixinGridFieldValue();
  },
	methods:{
		async GetWeixinGridFieldHead() {
      let data = await JDGetWeixinGridFieldHead({
				FClassID: this.$route.query.FClassID,//12
				FInterID: this.$route.query.FInterID,//"114008",
			});
			this.dataHead=JSON.parse(data)[0];
		},
		async GetWeixinGridFieldValue() {
      let data = await JDGetWeixinGridFieldValue({
				FClassID: this.$route.query.FClassID,//12,
				FInterID: this.$route.query.FInterID,//"114008",
				GridDBName: this.$route.query.GridDBName//"Frm_Grid"
			});
			this.dataValue=JSON.parse(data)
			this.FFromDesc=this.dataValue[0].FFromDesc
			for (const key in this.dataValue) {
				for (const aa in this.dataValue[key]) {
					if (this.dataValue[key].hasOwnProperty("FFromDesc")) {
						delete this.dataValue[key]["FFromDesc"];
					}
				}
			}
		}
	}
}

</script>
<style lang="less" scoped>
</style>