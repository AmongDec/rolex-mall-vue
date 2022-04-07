<template>
  <div class="watch-list-elementc">
    <a href="#" @click="togoodlist(clsid)">
      <img :src="imgurl" />
    </a>
    <div class="img-wordc" >
      {{imgword}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassifyItem',
  props: [
    'imgword',
    'imgurl',
    'clsid'
  ],
  methods:{
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

<style>
  @import url('../../assets/css/ClassifyItem.css');
</style>
