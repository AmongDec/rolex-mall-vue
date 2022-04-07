<template>
  <div>

  <!-- 标题 -->
  <div class="search-content-entire">
    <!-- 目录小标签  -->
    <div class="content-label">
      <a href="#">主页</a> >
      <a href="#">您的劳力士腕表列表</a>
    </div>


    <!-- 您的劳力士腕表列表 -->
    <div class="search-content-title">
      您的劳力士腕表列表
    </div>
    <!-- 编辑、管理及分享您的腕表列表。 -->
    <div class="search-content-stitle">
      编辑、管理及分享您的腕表列表。
    </div>
    <!-- 分享你的列表 -->
    <div class="search-content-button search-content-button-h">
      <a href="#">分享你的列表</a>
    </div>

  </div>

  <!-- 腕表列表  -->
  <div class="watch-list">

    <div class="watch-list-entire">

    <watchitem v-for="item in goodlist" :key="item.gid" :imgurl="'../../../static/img/good/'+item.gid+'/'+item.gmainPic"
      :watchname="item.gname"
      :material="item.gmaterial"
      :watchversion="item.gversion"
      :price="item.gprice"
      :gid="item.gid"></watchitem>

    </div>

  </div>



  </div>
</template>

<script>
  import watchitem from './WatchItem'
  export default {
    name: "Collect",
    components: {
      watchitem
    },
    data(){
      return {
        goodlist: this.$qs.parse(this.$route.query.goodlist)
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/Collect.css";
</style>
