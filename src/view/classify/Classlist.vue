<template>
  <div>
    	<!-- 搜索框 及内容 -->
		<div class="search-content-entire-search">

			<!-- 您的劳力士腕表列表 -->
			<div class="search-content-title-search" >
				{{name}}
			</div>
			<!-- 编辑、管理及分享您的腕表列表。 -->
			<div class="search-content-stitle-search">
				劳力士提供一系列经典及专业的腕表，迎合不同风格。探索劳力士腕表系列，挑选您喜爱的型号、材质、外圈、表盘及表带，总有一款合您心意。
			</div>


		</div>

		<!-- 腕表列表  -->
		<div class="watch-list-search-search">
			<div class="watch-list-entire-search">
        <searchGoodItem v-for="item in goodlist" :key="item.gid"
            :imgurl="'../../../static/img/good/'+item.gid+'/'+item.gmainPic"
            :watchname="item.gname"
            :material="item.gmaterial"
            :watchversion="item.gversion"
            :price="item.gprice"
            :gid="item.gid"
        ></searchGoodItem>

			</div>
		</div>

  </div>
</template>

<script>
  import searchGoodItem from '../search/SearchGoodItem';
  export default {
    name: 'SearchGoodList',
    components: {
      searchGoodItem
    },
    data(){
      return {
        goodlist: this.$qs.parse(this.$route.query.goodlist),
        name: this.$route.query.name
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/css/SearchGooodList.css');
</style>
