<template>
  <div class="mp4">
    <video autoplay loop muted>
      <source src="../../../static/vedio/watch.mp4" type="video/mp4"  />
      Your browser does not support the video tag.
    </video>
    <div class="mp4-content">
      <div class="mp4-content-word">
        宇宙计型迪拿通
      </div>
      <div class="mp4-content-button mp4-content-button-h" @click="todetail(6000005)">
        <a >探索更多</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Vedio",
    methods:{
      //进入商品详情
    async todetail(gid){
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

<style scoped>
  @import "../../assets/css/Vedio.css";
</style>
