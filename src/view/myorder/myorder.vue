<template>
      <div class="entire">
      <!-- 页面上面  -->
			<div class="content_top">
				<div class="content_top-menu">
					<div class="content_top-menu-mycenter">
						<a class="content_top-menu-mycenter-a" th:href="@{/goMyCenter.do}">个人中心</a>
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
							<a class="content_top-menu-myorder-box-myorder-a" th:href="@{/goMyOrder.do}" >我的订单</a>
						</div>
						<div class="content_top-menu-myorder-box-favorite">
							<a class="content_top-menu-myorder-box-favorite-a" href="">收藏夹</a>
						</div>
						<div class="content_top-menu-myorder-box-myaccount">
							<a class="content_top-menu-myorder-box-myaccount-a" th:href="@{/goMyInfo.do}">账号设置</a>
						</div>
						<div class="content_top-menu-myorder-box-myaddress">
							<a class="content_top-menu-myorder-box-myaddress-a" th:href="@{/goMyAddress.do}">我的地址</a>
						</div>
					</div>
				</div>
				<div class="content_top-info">
					<h1 class="content_top-info-myorder">我的订单</h1>
				</div>
			</div>

      <!-- 无订单时弹出 -->
      <div v-if="!hasorder" class="content_no_order" >
            <div class="content_no_order-info">
                <p class="content_no_order-info-no_info">无订单信息</p>
                <p class="content_no_order-info-hint_no_info">您没有订单信息</p>
                <p class="content_no_order-info-hint_status">您可以在此追踪订单状态</p>
                <div class="content_no_order-info-btn">
                    <a class="content_no_order-info-btn-a" href="">继续购物</a>
                </div>
            </div>
      </div>

      <!-- 有订单时弹出，分别显示相应订单状态下的订单 -->
      <div v-if="hasorder" class="content_order_info" >
        <order-item v-if="payorder!='none'" :paylist="payorder" :name="'待支付'">
        </order-item>

        <order-item v-if="waitrecorder!='none'" :paylist="waitrecorder" :name="'待收货'">
        </order-item>

        <order-finish v-if="finish!='none'" :paylist="finish" :name="'已完成'">
        </order-finish>


      </div>

    </div>

</template>

<script>
import OrderItem from './OrderItem'
import OrderFinish from './OrderFinish'
export default {

  name: 'myorder',
  components:{
    OrderItem,
    OrderFinish
  },
  data(){
    return{
      hasorder: this.$route.params.state,
      payorder: this.$route.params.waitpay == 'none'?'none':this.$qs.parse(this.$route.params.waitpay) ,
      waitrecorder: this.$route.params.waitrec == 'none'?'none':this.$qs.parse(this.$route.params.waitrec) ,
      finish: this.$route.params.finish == 'none'?'none':this.$qs.parse(this.$route.params.finish)
    }
  }
}
</script>

<style scoped>
   @import url('../../assets/css/myorder.css');
</style>
