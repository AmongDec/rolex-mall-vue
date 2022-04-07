<template>
  <div class="background100">
      <div class="background200">
          <!--第一个div,主图-->
          <div class="detail1">
              <center>
                  <div class="detail1-banner">

                      <div class="watch-name">
                          <!-- 腕表名字 -->
                          <h2>{{good.goodTable.gname}}</h2></div>
                      <div class="banner-picture">
                          <!-- 腕表主图 -->
                          <picture>
                              <img height="590px" width="590px"
                                  :src="good.goodTable.gmainPic.length>17?good.goodTable.gmainPic:'../../../static/img/good/'+good.goodTable.gid+'/'+good.goodTable.gmainPic">
                          </picture>
                      </div>
                      <div class="watch-type">
                          <!-- 腕表材质 -->
                          <a>{{good.goodTable.gmaterial}}</a><br>
                          <!-- 腕表直径 -->
                          <a>{{good.goodTable.gversion}}</a>
                      </div>
                      <!-- 腕表价格 -->
                      <div class="RMB">
                          <span>RMB &nbsp;</span>&nbsp;&nbsp;
                          <span>{{good.goodTable.gprice}}</span>
                          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                          <!--数据库是否还有货-->
                          <a >有货</a>
                      </div>
                      <div class="detail1-button">
                          <!--主图下的按钮-->
                          <div class="d-button1">
                              <el-button type="success" round @click="joincar(good.goodTable.gid)">加入购物车</el-button>
                              <el-button type="success" round  @click="rightnowpay(good.goodTable)">立即购买</el-button>
                              <!--收藏标志，点击收藏，图标转换-->
                              <el-button type="success"  @click="addcollect(good.goodTable.gid)" ><i class="fa fa-heart-o"></i></el-button>
                              <br/>
                              <span>预计发货后2-4个工作日送达</span>
                          </div>
                      </div>
                  </div>
              </center>
          </div>
          <!--第二个div,介绍-->
          <div class="detail2">
              <h4>腕表特色</h4><br>
              <h1>腕表渊源</h1>
          </div>
          <center>
              <div class="detail3-button">
                  <!--第三个div,介绍材质-->
                  <div class="detail3">
                      <img height="450px" width="100%"
                          src="../../../static/img/gooddetail/detail1.webp">
                  </div>
                  <!--第四个div,介绍表盘-->
                  <div class="detail3">
                      <img height="500px" width="45%" style="float: left"
                          src="../../../static/img/gooddetail/detail2.webp">
                  </div>
                  <!--第五个div,介绍表带-->
                  <div class="detail3">
                      <img height="500px" width="45%" style="float: right"
                          src="../../../static/img/gooddetail/detail3.webp">
                  </div>
                  <!--第六个div,介绍机芯-->
                  <div class="detail3">
                      <img height="500px" width="45%" style="float: left"
                          src="../../../static/img/gooddetail/detail4.jpg">
                  </div>
              </div>
          </center>

          <!--第八个div,介绍技术特点-->
          <div class="detail5-buttom">
              <center>
                  <div class="detail5-buttom1">
                      <div class="detail5">
                          <!--技术特点标题-->
                          <div class="detail5-specialty">
                              <h4></h4>
                          </div>
                          <div class="detail5-specialty2">
                              <!--表壳-->
                              <div class="detail5-capsid">
                                  <div class="d5-capsid">
                                      <h3>表壳</h3></div>
                                  <div class="d5-capsid2">
                                      <br/>
                                      <h4>表壳</h4><br/><br/>
                                      <!-- 表壳型号 -->
                                      <span>{{good.goodTable.gversion}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>表壳结构</h4><br/><br/>
                                      <!-- 表壳结构 -->
                                      <span>{{good.goodDetail.dwstructure}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>直径</h4><br/><br/>
                                      <!-- 表壳直径 -->
                                      <span>{{good.goodDetail.dwdiameter}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>材质</h4><br/><br/>
                                      <!-- 表壳材质 -->
                                      <span>{{good.goodDetail.dwmaterial}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>外圈</h4><br/><br/>
                                      <!-- 表壳外圈 -->
                                      <span>{{good.goodDetail.dwencircle}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>上链表冠</h4><br/><br/>
                                      <!-- 表壳上链表冠 -->
                                      <span>{{good.goodDetail.dwcoronal}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>镜面</h4><br/><br/>
                                      <!-- 表壳镜面 -->
                                      <span>{{good.goodDetail.dmirror}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>防水性能</h4><br/><br/>
                                      <!-- 表壳防水性能 -->
                                      <span>{{good.goodDetail.dwaterproof}}</span>
                                  </div>
                              </div>
                              <!--机芯-->
                              <div class="detail5-core">
                                  <div class="d5-capsid">
                                      <h3>机芯</h3>
                                  </div>
                                  <div class="d5-capsid2">
                                      <br/>
                                      <h4>机芯</h4><br/><br/>
                                      <!-- 腕表机芯 -->
                                      <span>{{good.goodDetail.dcore}}</span><br/>
                                  </div>
                                  <div class="d5-capsid3">
                                      <!-- 腕表机芯精密时计 -->
                                      <h4>精密时计</h4><br/><br/>
                                      <span>{{good.goodDetail.dchronometer}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>游丝摆轮组件</h4><br/><br/>
                                      <!-- 腕表机芯游丝摆轮组件 -->
                                      <span>{{good.goodDetail.dswing}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>上链</h4><br/><br/>
                                      <!-- 腕表机芯上链 -->
                                      <span>{{good.goodDetail.duplink}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>动力储备</h4><br/><br/>
                                      <!-- 腕表机芯动力储备 -->
                                      <span>{{good.goodDetail.dpower}}</span>
                                  </div>
                              </div>
                              <!--表带-->
                              <div class="detail5-watchband">
                                  <div class="d5-capsid">
                                      <h3>表带</h3></div>
                                  <div class="d5-capsid3">
                                      <br/>
                                      <h4>表带</h4><br/><br/>
                                      <!-- 腕表表带样式 -->
                                      <span >{{good.goodDetail.dwatchband}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>表带材质</h4><br/><br/>
                                      <!-- 腕表表带材质 -->
                                      <span>{{good.goodDetail.dwatchbandm}}</span>
                                  </div>
                                  <div class="d5-capsid3">
                                      <h4>带扣</h4><br/><br/>
                                      <!-- 腕表表带带扣 -->
                                      <span>{{good.goodDetail.djess}}</span>
                                  </div>

                                  <!--表盘-->
                                  <div class="d5-capsid">
                                      <h3>表盘</h3>
                                  </div>
                                  <div class="d5-capsid3">
                                      <br/>
                                      <h4>表盘 </h4><br/><br/>
                                      <!-- 腕表表盘样式 -->
                                      <span>{{good.goodDetail.ddish}}</span>
                                  </div>

                                  <!--认证-->
                                  <div class="d5-capsid">
                                      <h3>认证</h3>
                                  </div>
                                  <div class="d5-capsid3">
                                      <br/>
                                      <!-- 腕表认证 -->
                                      <span>{{good.goodDetail.didentification}}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </center>
          </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data(){
    return{
      good: this.$qs.parse(this.$route.query.gooddetail)
    }
  },
  methods:{
    //加入购物车
    async joincar(gid){
      const sub = {
        gid: gid,
        uid: window.sessionStorage.getItem('token')
      }
      try{
        let res = await this.$http.post('shopcar/add',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '添加购物车失败'
          })
          return
        }
        //添加成功
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
          type: 'error' ,
          message: '添加异常，请重试'
        })
        console.log(error)
      }
    },
    async rightnowpay(item){
      //1、先查询出所有地址
      const sub = {
        uid: window.sessionStorage.getItem('token')
      }
      let addlist = []
      try{
        let res = await this.$http.post('address/find',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '查询失败'
          })
          return
        }
        addlist = res.data.mydata
      }catch(error){
        this.$message({
        type: 'success' ,
        message: '查询异常，请重试'
        })
        console.log(error)
        return
      }

      this.$router.push({
        path: '/confirmone',
        query: {
          ordergood: this.$qs.stringify(item),
          orderadd: this.$qs.stringify(addlist)
        }
      })
    }
  }
}

</script>

<style>
  @import "../../assets/css/goodsDetail.css";

</style>
