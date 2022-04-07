<template>
  <div class="entire">
    <!-- 头部个人中心 -->
    <div class="content_top">
      <div class="content_top-info">
        <h2 class="content_top-info-mycenter">个人中心</h2>
      </div>
    </div>


    <div class="content_middle">
      <div class="content_middle-favorite">
        <div class="content_middle-favorite-in">
          <div  class="content_middle-favorite-img">
            <a href="">
              <img class="content_middle-favorite-img-in"
                src="static/img/profile/rolex_watchmaking_the_green_seal_0001_584x560.jpg" />
            </a>
          </div>
          <a class="content_middle-favorite-a" href="">收藏夹</a>
          <p class="content_middle-favorite-explain">收藏您所喜爱的腕表</p>
        </div>
      </div>
    </div>

    <div class="content_bottom">
      <div class="content_bottom-myorder">
        <div class="content_bottom-myorder-in">
          <a class="content_bottom-myorder-a" href="#" @click="tomyorder">我的订单</a>
          <p class="content_bottom-myorder-explain">管理和编辑您的订单</p>
        </div>
      </div>

      <div class="content_bottom-myaccount">
        <div class="content_bottom-myorder-in">
          <a class="content_bottom-myaccount-a" href="#">我的账户</a>
          <p class="content_bottom-myaccount-explain">管理您的个人信息</p>
        </div>
      </div>

      <div class="content_bottom-myaddress">
        <div class="content_bottom-myorder-in">
          <a class="content_bottom-myaddress-a" href="#" @click="toaddress">我的地址</a>
         <p class="content_bottom-myaccount-explain">管理您的地址信息</p>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'Profile',
    methods:{
      async tomyorder(){
        const sub = {
          uid: window.sessionStorage.getItem('token')
        }
        try{
          let res = await this.$http.post('order/find' , sub)
          if(res.data.mydata == 'none'){
            console.log('没有订单')
            //表示该用户还没有订单
            this.$router.push({
              path:'/myorder',
              query:{
                state: false,
                waitrec: 'none',
                waitpay: 'none',
                finish: 'none'
              }
            })
          }else{
            //表示该用户有订单
            this.$router.push({
              name:'myorder',
              params:{
                state: true,
                waitpay:res.data.mydata.waitpay.length == 0 ? 'none' : this.$qs.stringify(res.data.mydata.waitpay),
                waitrec:res.data.mydata.waitrec.length == 0 ? 'none' : this.$qs.stringify(res.data.mydata.waitrec),
                finish: res.data.mydata.finish.length == 0 ? 'none' : this.$qs.stringify(res.data.mydata.finish)
              }
            })
          }
        }catch(error){
          this.$message({
            type: 'success' ,
            message: '订单查询异常，请重试'
          })
          console.log(error)
        }

      },
      async toaddress(){
        const sub = {
          uid: window.sessionStorage.getItem('token')
        }
        //发送网络请求，将信息写入数据库
        try{
          let res = await this.$http.post('address/find',sub)
          if(res.data.message == 'error'){
            this.$message({
              type: 'success' ,
              message: '查询失败'
            })
            return
          }
          console.log(res.data.mydata)
          this.$router.push({
            path: '/findaddress',
            query:{
              addresslist: this.$qs.stringify(res.data.mydata)
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
      //进入新增地址页面
      toaddAddress(){
        this.$router.push('/addaddress')
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/css/Profile.css');
</style>
