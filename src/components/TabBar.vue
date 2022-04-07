<template>
  <!-- 导航栏 -->
  <!--最上层导航栏-->
  <div class="navi navi-h">
    <!--选单-->
    <div class="menus " >
      <a class="fa fa-bars " @click="toclassify" href="#">
        <p>选单</p>
      </a>
    </div>

    <!--登录-->
    <div class="three-label1">
      <a href="#" @click="tologin">{{this.$store.state.login}}</a>
    </div>
    <!--抢购-->
    <div class="three-label">
      <a href="#">抢购</a>
    </div>
    <!--购物车-->
    <div class="three-label">
      <a href="#" @click="toshopcar">购物车</a>
    </div>

    <!--购物车-->
    <div class="three-label">
      <a href="#" @click="torecommend">推荐</a>
    </div>

    <!-- logo -->
    <a href="#"  @click="tohome">
      <img class="rolex-logo" src="../assets/rolex-logo.svg" />
    </a>


    <!--您的腕表系列-->
    <div class="series">
      <a class="fa fa-heart-o " @click="tocollect" href="#">
        <p>您的腕表系列</p>
      </a>
    </div>

    <!--搜索-->
    <div class="search">
      <a class="fa fa-search " @click="tosearch"   href="#">
        <p>搜索</p>
      </a>
    </div>


  </div>
</template>

<script>
  export default {
    name: "TabBar",
    methods:{
      //进入收藏页面
      async tocollect(){
        //没登陆则跳转登录
        if(window.sessionStorage.getItem('token') == null){
          window.sessionStorage.setItem('backpath' , '/collect')
          this.$router.push('/login')
          return
        }
        const sub = {
          uid: window.sessionStorage.getItem('token')
        }
        try{
          let res = await this.$http.post('collect/find',sub)
          if(res.data.message == 'error'){
            this.$message({
              type: 'success' ,
              message: '查询收藏夹失败'
            })
            return
          }
          //查询成功
          console.log(res.data.mydata)
          this.$router.push({
            path: '/collect',
            query:{
              goodlist: this.$qs.stringify(res.data.mydata)
            }
          })
        }catch(error){
          this.$message({
            type: 'success' ,
            message: '查询异常，请重试'
          })
          console.log(error)
        }

      },
      toclassify(){
        this.$router.push('/classify')
      },
      tohome(){
        this.$router.push('/home')
      },
      tosearch(){
        this.$router.push('/search')
      },
      //进入购物车
      async toshopcar(){
        //没登陆则跳转登录
        if(window.sessionStorage.getItem('token') == null){
          this.$router.push('/login')
          return
        }
        const sub = {
          uid: window.sessionStorage.getItem('token')
        }
        try{
          let res = await this.$http.post('shopcar/find',sub)
          if(res.data.message == 'error'){
            this.$message({
              type: 'success' ,
              message: '查询购物车失败'
            })
            return
          }
          //查询成功
          console.log(res.data.mydata)
          this.$router.push({
            path: '/shopcar',
            query:{
             carlist: this.$qs.stringify(res.data.mydata)
            }
          })
        }catch(error){
          this.$message({
            type: 'success' ,
            message: '查询异常，请重试'
          })
          console.log(error)
        }
      },
      //去登录或者个人中心
      tologin(){
        if(window.sessionStorage.getItem('token') == null){
          this.$router.push('/login')
        }else{
          this.$router.push('/profile')
        }
      },
      async torecommend(){
        if(window.sessionStorage.getItem('token') == null){
          //说明没有登陆
          try{
            let res = await this.$http.post('recommend/findfirst')
            if(res.data.message == 'error'){
              this.$message({
                type: 'success' ,
                message: '查询失败'
              })
              return
            }
            //查询成功
            this.$router.push({
              path: '/recommend',
              query:{
                relist: this.$qs.stringify(res.data.mydata),
                kunlist: '',
                restate: true,
                kunstate: false
              }
            })
          }catch(error){
            this.$message({
              type: 'success' ,
              message: '查询异常，请重试'
            })
            console.log(error)
          }
        }else{
          let sub={
            uid: window.sessionStorage.getItem('token')
          }
          //说明登陆了
          try{
            let res1 = await this.$http.post('recommend/find' , sub)
            let res2 = await this.$http.post('recommend/kun' , sub)
            if(res1.data.message == 'error' || res2.data.message == 'error'){
              this.$message({
                type: 'success' ,
                message: '查询失败'
              })
              return
            }
            //查询成功
            this.$router.push({
              path: '/recommend',
              query:{
                relist: this.$qs.stringify(res1.data.mydata),
                kunlist: this.$qs.stringify(res2.data.mydata),
                restate: true,
                kunstate: true
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
  }
</script>

<style scoped>
  @import "../assets/css/TabBar.css";
</style>
