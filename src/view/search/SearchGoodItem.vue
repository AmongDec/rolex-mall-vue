<template>
  <div class="watch-list-element-search" >
    <a href="#" @click="togooddetail(gid)">

      <img :src="imgurl.length > 17 ? imgurl : '../../../static/img/good/'+gid+'/'+imgurl" />
      <div class="goodnameentire">
        <div class="goodname">{{watchname}}</div>
      </div>

      <p>{{material}}</p>
      <h2>{{watchversion}}</h2>
      <h3>RMB {{price}}</h3>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SearchGoodItem',
  props: [
    'imgurl',
    'watchname',
    'material',
    'watchversion',
    'price',
    'gid'
  ],
  methods:{
    async togooddetail(gid){
      const sub = {
        gid: gid,
        uid: window.sessionStorage.getItem('token')
      }
      try{
        let res = await this.$http.post('good/findone',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '不存在该商品'
          })
          return
        }
        //查询成功
        console.log(res.data.mydata)
        this.$router.push({
          path: '/detail',
          query:{
            gooddetail: this.$qs.stringify(res.data.mydata)
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
  @import url('../../assets/css/SearchGoodItem.css');
  .goodnameentire{
    width: 560px;
    height: 30px;
    float: left;
    margin-top: 10px;
  }
  .goodname{
    width: 260px;
    height: 30px;
    margin: 0px auto;
    line-height: 20px;
    font-weight: 600;
    text-align: center;
    font-size: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
