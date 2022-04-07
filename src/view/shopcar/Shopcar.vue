<template>
  <!--最底板-->
<div class="entire">
    <div class="car-bground">
        <h1>我的购物车</h1>
    </div>
    <!--底板-->
    <div class="content">
        <!-- 一、商品信息（左）-->
      <form >

          <div class="content_left">
              <div class="content_left-top">
                  <div class="all-checkbox"><input type="checkbox" class="check goods-check" v-model="checked" @change="checkchange">全选</div>
                  <!--<input type="checkbox" class="allbox" name="allbox" onclick="changeAllCbox()" />-->
                  <!--<span>全选</span>-->
              </div>

              <div v-for="(item,index) in goodIdArray" :key="item.gid" class="content_left-bottom" >
                  <!--从左到右依次排列-->
                  <!-- 1.复选框 -->
                  <div class="content_left-bottom_option">

                      <input type="checkbox" class="check goods-check goodsCheck" v-model="checkdata" :value="item.gid">
                      <!--<input type="checkbox" class="cbox" name="cbox" onclick="changecbox(this)" />-->
                  </div>
                  <!-- 2.图片 -->
                  <div class="content_left-bottom_img" @click="todetail(item.gid)">
                      <img :src="'../../../static/img/good/'+item.gid+'/'+item.gmainPic"/>
                  </div>
                  <!-- 3.商品信息  -->
                  <div class="content_left-bottom_msg">
                      <div class="content_left-bottom_msg-up">
                          <!--腕表名字-->
                          <span class="content_left-bottom_msg-up_name" >{{item.gname}}</span> <br/>
                          <span>型号：</span>
                          <span class="content_left-bottom_msg-up_design" >{{item.gversion}}</span> <br/>
                          <span>材质：</span>
                          <span class="content_left-bottom_msg-up_design" >{{item.gmaterial}}</span>
                      </div>
                      <div class="content_left-bottom_msg-mid">
                          <span class="content_left-bottom_msg-up_name2">有货</span> <br/>
                          <span class="content_left-bottom_msg-up_design">预计发货后2-4个工作日送达 </span>
                      </div>
                      <div class="content_left-bottom_msg-delete">
                  <span class="content_left-bottom_msg-up_name2">
                    <a @click="addcollect(item.gid)">加入心愿单</a>
                    <span style="color: #C8C6C5;">&nbsp; &nbsp;|&nbsp;&nbsp;</span> <a @click="deletecar(item.gid , index)">删除</a>
                  </span>
                      </div>
                  </div>
                  <!-- 4.购买的数量 -->
                  <div class="content_left-bottom_number">
                      <a href="javascript:;" type="button" class="minus" :disabled="item.mcNumber <=1" @click="minus(item.gid)">-</a>
                      <input class="num" :value="item.mcNumber" >
                      <a href="javascript:;" type="button" class="plus" @click="plus(item.gid)">+</a>

                      <!-- 5.单价 -->
                      <div class="content_left-bottom_unitPrice">
                          价格：￥<b class="price" >{{Number(item.gprice).toFixed(2)}}</b>
                      </div>

                      <!--本商品总价（隐藏了）-->
                      <p>小计￥：<span class="shop-total-amount ShopTotal">{{Number(item.mcNumber * item.gprice).toFixed(2)}}</span></p>

                  </div>

              </div>

          </div>

          <!-- 二、订单小计（右）-->
          <div class="content_right">
              <!--从上到下依次排序-->
              <!-- 1.订单小计 -->
              <div class="content_right-OrderSubtotal">
                  订单小计
                  <span>
                已选
                <span class="totalNum" id="goodkinds">{{goodQuantity}}</span> 件商品
              </span>

              </div>
              <!-- 2.总计 -->
              <div class="content_right-amount">
                  <div class="content_right-amount_shopAmount">
                      <!--商品总计<span>￥55587</span>-->
                      <strong>总价：<i class="total" id="AllTotal">{{goodAll}}</i></strong>
                  </div>
                  <div class="content_right-amount_carriage">
                      运费
                      <span>免费</span>
                  </div>
                  <div class="content_right-amount_superAmount">
                      <!--总计-->
                      <strong>总计：<i class="total" id="aTotal">{{goodAll}}</i></strong>
                      <!--<span>
                          <span class="sign">￥</span>
                          55587
                      </span>-->
                  </div>
              </div>
              <!-- 3.说明 -->
              <div class="content_right-explain">
                  <span>说明</span> 订单提交之后1小时内未付款，订单将被系统自动取消，请您尽快完成支付以确保商品能及时送达，有货商品和门店配货商品是分开寄出。
              </div>
              <!-- 4.选择：立即购买 or 继续购物     settle continuePurchase  -->
              <div class="content_right-option">
                  <button type="button" class="spice-btn1" @click="createorder">立即结算</button>
                  <!--<a class="spice-btn spice-btn-golden" href="">立即结算</a>-->
                  <button class="spice-btn2" >继续购物</button>
              </div>
          </div>
          <!-- 三、空白盒子:为了解决“让div父元素的高度随子元素高度的变化而变化” -->
          <div class="clear"></div>
      </form>
    </div>
</div>

</template>

<script>
export default {
  name: 'Shopcar',
  data(){
    return {
      goodIdArray: this.$qs.parse(this.$route.query.carlist),
      checked: false,
      checkdata: []
    }
  },
  watch:{
    checkdata(){
      let len = 0;
      for(let i in this.goodIdArray){
        len++
      }

      if(len == this.checkdata.length){
        this.checked = true
      }else{
        this.checked = false
      }
　　}
  },
  computed: {
      //选中商品总数量
      goodQuantity(){
        let count = 0
        for(let i = 0 ; i < this.checkdata.length ; i++){
          for(let item in this.goodIdArray){
            if(this.goodIdArray[item].gid == this.checkdata[i]){
              count += Number(this.goodIdArray[item].mcNumber)
            }
          }
        }
        return count
      },
      //选中商品总价
      goodAll(){
        let priceAll = 0;
        for(let i = 0 ; i < this.checkdata.length ; i++){
          for(let item in this.goodIdArray){
            if(this.goodIdArray[item].gid == this.checkdata[i]){

              priceAll= priceAll + this.goodIdArray[item].gprice*this.goodIdArray[item].mcNumber;

            }
          }
        }
        return Number(priceAll).toFixed(2)
      }
  },
  methods: {
    //单个商品数量减少1
    minus(gid){
      for(let item in this.goodIdArray){
         if(this.goodIdArray[item].gid == gid && this.goodIdArray[item].mcNumber > 1){
           this.goodIdArray[item].mcNumber--
         }
      }
    },
    //单个商品数量增加1
    plus(gid){
      for(let item in this.goodIdArray){
         if(this.goodIdArray[item].gid == gid ){
           this.goodIdArray[item].mcNumber++
         }
      }
    },
    checkchange(){
      if(!this.checked){
        this.checkdata = []
      }else{
        for(let item in this.goodIdArray){
           this.checkdata.push(this.goodIdArray[item].gid)
        }
      }
    },
    //添加到收藏夹
    async addcollect(gid){
      const sub ={
        uid: window.sessionStorage.getItem('token'),
        gid: gid
      }
      try{
        let res = await this.$http.post('collect/add',sub)

        this.$message({
          type: 'success' ,
          message: res.data.mydata
        })

      }catch(error){
        this.$message({
          type: 'success' ,
          message: '添加异常，请重试'
        })
        console.log(error)
      }
    },
    //异步方法，删除购物车内的商品
    async deletecar(gid , index){



      const sub ={
        uid: window.sessionStorage.getItem('token'),
        gid: gid
      }
      try{
        let res = await this.$http.post('shopcar/delete',sub)

        this.$message({
          type: 'success' ,
          message: res.data.mydata
        })

        this.$delete(this.goodIdArray , index)
        this.checkdata = []

      }catch(error){
        this.$message({
          type: 'success' ,
          message: '添加异常，请重试'
        })
        console.log(error)
      }
    },

    //生成订单的方法
    async createorder(){
      //获得选中的商品
      if(this.checkdata == []){
        this.$message({
          type:'success',
          message: '您还没有选中商品'
        })
      }
      const idlist = this.checkdata
      let goodarr = []
      for(let i = 0 ; i < this.checkdata.length ; i++){
        for(let item in this.goodIdArray){
          if(this.goodIdArray[item].gid == this.checkdata[i]){
            goodarr.push(this.goodIdArray[item])
          }
        }
      }
      console.log(goodarr)

      //获得地址列表
      let list = {}
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
        list = res.data.mydata
      }catch(error){
        this.$message({
        type: 'success' ,
        message: '查询异常，请重试'
        })
        console.log(error)
      }

      //将数据传递到confirm页面
      this.$router.push({
        path: '/confirm',
        query: {
          ordergood: this.$qs.stringify(goodarr),
          orderadd: this.$qs.stringify(list)
        }
      })
    },
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
  },
  created(){

  },
}
</script>

<style scoped>
   @import url('../../assets/css/Shopcar.css');
</style>
