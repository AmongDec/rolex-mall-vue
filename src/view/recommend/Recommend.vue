<template>
  <div>
    	<!-- 搜索框 及内容 -->
		<div class="search-content-entire-search">
			<!-- 您的劳力士腕表列表 -->
			<div class="search-content-title-search" >
				猜您喜欢
			</div>
			<!-- 编辑、管理及分享您的腕表列表。 -->
			<div class="search-content-stitle-search">
				劳力士提供一系列经典及专业的腕表，迎合不同风格。探索劳力士腕表系列，挑选您喜爱的型号、材质、外圈、表盘及表带，总有一款合您心意。
			</div>

		</div>

		<!-- 腕表列表  -->
		<div v-if="restate" class="watch-list-search-search">
      <div  class="watch-list-search-search-title">
        热款推荐
      </div>
      <div class="watch-list-entire-search">
        <div v-for="(good,index) in relist" :key="index" class="watch-list-element-search" >
          <a href="#" @click="todetail(good.goodTable.gid)">
            <img :src="'../../../static/img/good/'+good.goodTable.gid+'/'+good.goodTable.gmainPic" />
            <h2>{{good.goodTable.gname}}</h2>
            <p>{{good.goodTable.gmaterial}}</p>
            <h2>{{good.goodTable.gversion}}</h2>
            <h3>RMB {{number_format(good.goodTable.gprice, 2, '.', ',')}}</h3>
          </a>
          <div class="watch-list-liji">
            <div class="mp4-content-button mp4-content-button-h" @click="rightnowpay(good.goodTable)">
              立即购买
            </div>
          </div>

        </div>
      </div>
		</div>

    <!-- 腕表列表  -->
		<div v-if="kunstate" class="watch-list-search-search">
      <div class="watch-list-search-search-title">
        捆绑推荐
      </div>
      <div v-for="(kun,index) in kunlist" :key="index" class="watch-list-entire-search">
        <div class="watch-list-kun">
          <div class="kun-1" @click="todetail(kun.g1.goodTable.gid)">
            <img :src="'../../../static/img/good/'+kun.g1.goodTable.gid+'/'+kun.g1.goodTable.gmainPic"/>
            <dir class="kun-1-1">
              <h2>{{kun.g1.goodTable.gname}}</h2>
              <p>{{kun.g1.goodTable.gmaterial}}</p>
              <h1>{{kun.g1.goodTable.gversion}}</h1>
              <h3>RMB {{number_format(kun.g1.goodTable.gprice, 2, '.', ',')}}</h3>
            </dir>
          </div>
          <div class="kun-2"></div>
          <div class="kun-1" @click="todetail(kun.g2.goodTable.gid)">
            <img :src="'../../../static/img/good/'+kun.g2.goodTable.gid+'/'+kun.g2.goodTable.gmainPic"/>
            <dir class="kun-1-1">
              <h2>{{kun.g2.goodTable.gname}}</h2>
              <p>{{kun.g2.goodTable.gmaterial}}</p>
              <h1>{{kun.g2.goodTable.gversion}}</h1>
              <h3>RMB {{number_format(kun.g2.goodTable.gprice, 2, '.', ',')}}</h3>
            </dir>
          </div>
          <div class="kun-3">
            <p>原价 RMB {{number_format(kun.srcprice, 2, '.', ',')}} | 现价 RMB {{number_format(kun.desprice, 2, '.', ',')}} </p>
          </div>
          <div class="kun-4">
             <div class="mp4-content-button mp4-content-button-h" @click="kunorder(kun)">
              立即购买
            </div>
          </div>
        </div>
      </div>
		</div>

  </div>
</template>

<script>
export default {
  name: 'recommend',
  data(){
    return {
      relist: this.$qs.parse(this.$route.query.relist),
      kunlist: this.$route.query.kunlist == '' ? '' : this.$qs.parse(this.$route.query.kunlist),
      restate: this.$route.query.restate,
      kunstate: this.$route.query.kunstate
    }
  },
  methods:{
    number_format(number, decimals, dec_point, thousands_sep) {
        /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,

            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.floor(n * k) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        console.log(s)
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },
    //立即购买单个商品
    async rightnowpay(item){
      if(window.sessionStorage.getItem('token') == null){
        this.$message({
            type: 'success' ,
            message: '请先登录'
          })
        return
      }
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
    },
    //立即购买捆绑包
    async kunorder(item){
      //获得选中的商品
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
        path: '/confirmorderkun',
        query: {
          orderkun: this.$qs.stringify(item),
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
  components:{

  }
}
</script>

<style scoped>
  @import url('../../assets/css/recommend.css');
</style>
