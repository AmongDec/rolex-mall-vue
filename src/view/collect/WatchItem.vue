<template>
  <div class="watch-list-entire">
    <a href="#" style="color: black" @click="todetail">
    <div class="watch-list-element" >
      <img :src="imgurl" />
      <h2>{{watchname}}</h2>
      <p>{{material}}</p>
      <h2>{{watchversion}}</h2>
      <h3>RMB {{price}}</h3>
    </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'WatchItem',
  props:[
    'imgurl',
    'watchname',
    'material',
    'watchversion',
    'price',
    'gid'
  ],
  data(){
    return{

    }
  },
  methods:{
    async todetail(){
      const sub = {
        gid: this.gid,
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
  @import url('../../assets/css/WatchItem.css');
</style>
