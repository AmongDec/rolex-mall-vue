<template>
  <div>
    <!-- 个性化内容推荐标题-->
    <div class="personal-entire">
      <div class="personal-title">
        2019经典腕表推荐
      </div>
    </div>

    <!-- 推荐图片轮播 -->
    <div class="personal-picture-entire personal-progress-entire-h">
      <div class="personal-picture">

        <div id="picture1" class="personal-picture-element " @click="togoodlist(3000005)">
          <img src="static/img/Main/youting.webp" />
          <div class="personal-picture-element-word">游艇名仕型</div>
        </div>

        <div id="picture2" class="personal-picture-element"  @click="togoodlist(3000001)">
          <img src="static/img/Main/xingqirili.webp" />
          <div class="personal-picture-element-word">星期日历型</div>
        </div>

        <div id="picture3" class="personal-picture-element"  @click="togoodlist(3000006)">
          <img src="static/img/Main/gelinzhi.jpg" />
          <div class="personal-picture-element-word">海使型</div>
        </div>
        <div id="picture4" class="personal-picture-element"  @click="togoodlist(3000003)">
          <img src="static/img/Main/lanlv.webp" />
          <div class="personal-picture-element-word">蚝式恒动型</div>
        </div>

        <div id="picture5" class="personal-picture-element"  @click="togoodlist(3000007)">
          <img src="static/img/Main/langang.webp" />
          <div class="personal-picture-element-word">探险家</div>
        </div>

      </div>

      <div class="progress-entire">
        <div  id="btn-left" class="personal-cut-button-left" @click="moveleft">
          <p class="fa fa-angle-left"></p>
        </div>

        <div  id="btn-right" class="personal-cut-button-right" @click="moveright">
          <p class="fa fa-angle-right"></p>
        </div>
      </div>

    </div>

    <!-- 进度条 -->
    <div class="personal-progress-entire">
      <div class="personal-progress">
        <div id="progress1" class="personal-progress-element-s">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    data() {
      return{
        index: 1
      }
    },
    name: "PlayPicture",
    methods: {
      moveleft() {
        let i = this.index;
        $(function () {
          if (i > 1) {
            $(".personal-picture-element").animate({
              right: '-=444px'
            });
            $("#progress1").animate({
              right: '+=286px'
            });
          }
        })
        this.index = this.index - 1;
      },
      moveright(){
        let i = this.index;
        $(function () {
          if (i < 6) {
            $(".personal-picture-element").animate({
              right: '+=444px'
            });
            $("#progress1").animate({
              right: '-=286px'
            });
          }
        })
        this.index = this.index + 1;
      },
      async togoodlist(clsid){
        //根据订单号，获得订单对应的信息
        const subb = {
          clsid: clsid
        }

        try{
          let res = await this.$http.post('classify/findbyid',subb)
          if(res.data.message == 'error'){
            this.$message({
              type: 'success' ,
              message: '查询分类的商品列表失败'
            })
            return
          }
          let orderandgood = res.data.mydata
          this.$router.push({
            path: '/clsgoodlist',
            query:{
              goodlist: this.$qs.stringify(orderandgood),
              name: this.imgword
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
  @import "../../assets/css/PlayPicture.css";
</style>
