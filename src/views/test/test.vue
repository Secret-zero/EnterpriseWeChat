<template>
</template>
<script>
export default {
	data () {
		return {
			aa=[{id:1,name:'张三'},{id:2,name:'李四'},{id:3,name:'王五'},{id:2,name:'赵六'}]

		};
	},
	mounted(){
		let a=this.aa.find( t=> t.id=='2') 
		console.info(a)
		let b=this.aa.filter( t=> t.id=='2')
		console.info(b)
	}
}
</script>
<style lang="scss" scoped>
</style>