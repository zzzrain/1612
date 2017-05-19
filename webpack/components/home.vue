<template>
	<div>
		<p id="p">第二页</p>
		<xarticle></xarticle>
		<xlist></xlist>
	</div>
</template>
<script>
	//export default = module.exports
	import xarticle from "./article/article.vue"
	import xlist from "./list/list.vue"
	export default {
		mounted() {
			//$("p").css("color", "red");
		},
		components: {
			xarticle,
			xlist
		}
	}
</script>
<style scoped lang="less">
	@size:50px;
	#p {
		font-size: @size;
		background-color: #0000CC;
	}
</style>