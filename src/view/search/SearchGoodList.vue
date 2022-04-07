<template>
  <div>
    	<!-- 搜索框 及内容 -->
		<div class="search-content-entire-search">
			<!-- 目录小标签  -->
			<div class="content-label-search">
				<a href="#">主页</a> >
				<a href="#">寻找你的劳力士</a> >
				<a href="#">检索商品列表</a>
			</div>

			<!-- 您的劳力士腕表列表 -->
			<div class="search-content-title-search" >
				这里显示您的搜索结果
			</div>
			<!-- 编辑、管理及分享您的腕表列表。 -->
			<div class="search-content-stitle-search">
				劳力士提供一系列经典及专业的腕表，迎合不同风格。探索劳力士腕表系列，挑选您喜爱的型号、材质、外圈、表盘及表带，总有一款合您心意。
			</div>


		</div>

		<!-- 腕表列表  -->
		<div class="watch-list-search-search">
			<div class="watch-list-entire-search">
        <searchGoodItem v-for="good in list" :key="good.gId"
            :imgurl="good.gMainPic"
            :watchname="good.gName"
            :material="good.gMaterial"
            :watchversion="good.gVersion"
            :price="good.gPrice"
            :gid="good.gId"
        ></searchGoodItem>

        <div class="pagecl">

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="Number(searchvo.pageno)"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="Number(searchvo.size)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Number(totalpage)">
          </el-pagination>
        </div>
			</div>


		</div>

  </div>
</template>

<script>
  import searchGoodItem from './SearchGoodItem';

  export default {
    name: 'SearchGoodList',
    data(){
      return{
        searchvo:this.$qs.parse(this.$route.query.searchvo),
        list: this.$qs.parse(this.$route.query.searchlist),
        totalpage:this.$route.query.totalcount
      }
    },
    components: {
      searchGoodItem,
    },
    methods:{
      async handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.searchvo.size = Number(val)
        console.log(this.searchvo)
        const sub = this.searchvo
        try{
          let res = await this.$http.post('search/search',sub)
          console.log(res.data.mydata.listmap)
          this.list = res.data.mydata.listmap
        }catch(error){
          this.$message({
          type: 'error' ,
          message: '查询异常，请重试'
          })
          console.log(error)

        }
      },
      async handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.searchvo.pageno = Number(val)
        console.log(this.searchvo)
        const sub = this.searchvo
        try{
          let res = await this.$http.post('search/search',sub)
          console.log(res.data.mydata.listmap)
          this.list = res.data.mydata.listmap
        }catch(error){
          this.$message({
          type: 'error' ,
          message: '查询异常，请重试'
          })
          console.log(error)

        }
      }
    }
  }
</script>

<style>
  @import url('../../assets/css/SearchGooodList.css');
  .pagecl{
    width: 1150px;
    float: left;
    margin: 30px auto;
    text-align: center;
  }
</style>
