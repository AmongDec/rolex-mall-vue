<template>
  <div>
		<!-- 搜索框 及内容 -->
		<div class="search-content-entire">
			<!-- 目录小标签  -->
			<div class="content-label">
				<a href="#">主页</a> >
				<a href="#">寻找你的劳力士</a>
			</div>

			<!-- 腕表与文章 -->
			<div class="search-content-glod">
				腕表与文章
			</div>

			<!-- 搜寻劳力士网站 -->
			<div class="search-content-title">
				搜寻劳力士网站
			</div>

			<!-- 搜索框  -->
			<div class="search-content-input">
				<form id="formsearch"  method="post">
					<input type="text" name="searchContent" v-model="searchvo.keyword" placeholder="请输入你的关键字" />
					<button type="button" @click="commitForm"><p class="fa fa-search"></p></button>
				</form>
			</div>
		</div>

  </div>
</template>

<script>
  export default {
    name: 'Search',
    data(){
      return{
        searchvo:{
          keyword: '',
          pageno: 1,
          size: 10
        }
      }
    },
		methods: {
			async commitForm(){
        const sub  = this.searchvo
        console.log(sub)
        //手机号码非空判断
        if(sub.keyword == '' || sub.keyword == null || sub.keyword == undefined){
          this.$message({
            type: 'success' ,
            message: '输入不能为空'
          })
          return
        }

       //发送网络请求
        try{
          let res = await this.$http.post('search/search',sub)
          console.log(res.data.mydata)
          this.$router.push({
            path: '/searchlist',
            query:{
              searchlist: this.$qs.stringify(res.data.mydata.listmap),
              searchvo: this.$qs.stringify(sub),
              totalcount:res.data.mydata.count
            }
          })

        }catch(error){
          this.$message({
          type: 'success' ,
          message: '查询异常，请重试'
          })
          console.log(error)

        }
      }
		}
  }
</script>

<style>
  @import url('../../assets/css/Search.css');
</style>
