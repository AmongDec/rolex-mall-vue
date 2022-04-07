<template>
  	<div class="bground100">
			<center>
				<div class="my-address">
					<div class="content_top-menu">
						<div class="content_top-menu-mycenter">
							<a class="content_top-menu-mycenter-a" href="#">个人中心</a>
						</div>
						<span class="content_top-menu-mycenter-span">|</span>
						<div class="content_top-menu-myorder">
							<span>我的订单</span>
							<i class="fa fa-angle-down"></i>
						</div>
						<div class="content_top-menu-myorder-up">
							<span>我的订单</span>
							<i class="fa fa-angle-up"></i>
						</div>
						<div class="content_top-menu-myorder-box">
							<div class="content_top-menu-myorder-box-myorder">
								<a class="content_top-menu-myorder-box-myorder-a" href="#">我的订单</a>
							</div>
							<div class="content_top-menu-myorder-box-favorite">
								<a class="content_top-menu-myorder-box-favorite-a" href="#">收藏夹</a>
							</div>
							<div class="content_top-menu-myorder-box-myaccount">
								<a class="content_top-menu-myorder-box-myaccount-a" href="#">账号设置</a>
							</div>
							<div class="content_top-menu-myorder-box-myaddress">
								<a class="content_top-menu-myorder-box-myaddress-a" href="#">我的地址</a>
							</div>
						</div>
					</div>
					<h1>我的地址</h1>
				</div>
				<!-- 显示地址信息-->
				<div class="my-address-detail">
					<ul class="add-detail">
						<li class="address-detail-add">
							<div class="add-detail11">
								<a class="add-detail11-a" href="#" @click="toaddnew">添加新地址</a><br /><br />
								<p>预先写好您的邮寄及账单信息<br />可以为您节约付款时间哟</p>
							</div>
						</li>

            <li v-for="(item,index) in addlist" :key="item.addid" class="add-detail-default">
							<div class="add-detail22">
								<h3><span>{{item.addXing}}{{item.addMing}}</span> <span>{{item.addGender}}</span></h3>
								<div class="address-font">
									<span >{{item.addProvince}}</span><br />
									<span >{{item.addCity}}</span>&nbsp;&nbsp;&nbsp;<span >{{item.addArea}}</span><br />
									<span >{{item.addDetail}}</span>
								</div>
								<span>+86</span>&nbsp;
								<span>{{item.addPhone}}</span>
							</div>

							<div class="spice-address-default">

							</div>
							<div class="spice-address-action">
								<a class="spice-address-action-edit" href="#">编辑</a>
								<a class="spice-address-action-delete" @click="deletebyid(item.addId , index)">删除</a>
							</div>
						</li>

					</ul>
				</div>
			</center>

	</div>
</template>

<script>
export default {
  name: 'findaddress',
  data(){
    return{
      addlist:this.$qs.parse(this.$route.query.addresslist)
    }
  },
  methods:{
    toaddnew(){
      this.$router.push('/addaddress')
    },
    async deletebyid(id , index){

      const sub = {
        addid: id
      }
      //发送网络请求，将信息写入数据库
      try{
        let res = await this.$http.post('address/delete',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '删除失败'
          })
          return
        }
        this.$message({
          type: 'success' ,
          message: res.data.mydata
        })
        this.$delete(this.addlist , index)
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


  @import "../../assets/css/myAddress.css";
</style>
