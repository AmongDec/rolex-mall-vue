<template>
  <div>
    <!-- 视频 -->
		<div class="mp4">
			<video autoplay loop muted>
		  		<source src="../../../static/vedio/classify.mp4" type="video/mp4"  />
				Your browser does not support the video tag.
			</video>

			<div class="mp4-word">
				腕表系列
			</div>

			<div class="mp4-words">
				劳力士腕表
			</div>
		</div>

		<!-- 中间过度文字  -->
		<div class="mid-word">
			<div class="mid-word-entire">
				探索展现经典隽永及可靠性能的劳力士腕表。
				劳力士提供一系列经典及专业的腕表，迎合不同风格。
				探索款式众多的劳力士腕表，寻找结合非凡设计风格及实用功能的时计。
			</div>
		</div>

		<!-- 腕表分类列表  -->
		<div class="watch-list">
			<div class="watch-list-entire">
        <classify-item v-for="item in classifylist" :key="item.clsId"
          :imgurl="'static/img/classify/'+item.clsPic"
          :imgword="item.clsName"
          :clsid="item.clsId"></classify-item>

			</div>
		</div>
  </div>
</template>

<script>
  import classifyItem from './ClassifyItem.vue'
  export default {
    name: 'ClassifyPage',
    components: {
      classifyItem
    },
    data(){
      return {
        classifylist: []
      }
    },
    async created(){
      try{
        let res = await this.$http.post('classify/find')
        if(res.data.message == 'error'){
            this.$message({
              type: 'success' ,
              message: '查询分类失败'
            })
            return
        }
        this.classifylist = res.data.mydata
      }catch(error){
        this.$message({
          type: 'success' ,
          message: '查询异常，请重试'
        })
        console.log(error)
      }
    }
  }
</script>

<style>
  @import url('../../assets/css/ClassifyPage.css');
</style>
