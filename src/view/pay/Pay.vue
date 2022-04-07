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


      <!-- 有订单时弹出，分别显示相应订单状态下的订单 -->
      <div  class="content_order_info" >
          <!-- 待支付 -->
          <div class="content_order_info-in-headline" >
              <span >请支付您的订单</span>
          </div>
          <div  class="content_order_info-in-data">
              <div class="content_order_info-in-data-roughly">
                  <!-- 时间 -->
                  <div class="content_order_info-in-data-roughly-time">
                      <div class="content_order_info-in-data-roughly-time-month">
                          <span>{{paylist.oneorder.otime | formatDateM}}月</span>
                      </div>
                      <div class="content_order_info-in-data-roughly-time-day">
                          <span>{{paylist.oneorder.otime | formatDateD}}</span>
                      </div>
                      <div class="content_order_info-in-data-roughly-time-year">
                          <span>{{paylist.oneorder.otime | formatDateY}}</span>
                      </div>
                  </div>
                  <!-- 订单详情 -->
                  <div class="content_order_info-in-data-roughly-form">
                      <div class="content_order_info-in-data-roughly-form-order_number">
                          <label>订单编号</label>&nbsp;<span>{{paylist.oneorder.oid}}</span>
                      </div>
                      <div class="content_order_info-in-data-roughly-form-status">
                          <a class="content_order_info-in-data-roughly-form-status-a_immediate_payment" >立即支付</a>
                      </div>
                      <div class="content_order_info-in-data-roughly-form-amount">
                          <label>状态:</label><span>{{paylist.oneorder.ostatus}}</span>
                      </div>
                      <div class="content_order_info-in-data-roughly-form-totel">
                          <label>总计:</label>￥<span >{{paylist.oneorder.ototalPrice}}</span>
                      </div>
                      <a class="content_order_info-in-data-roughly-form-a" >查看详情</a>
                  </div>
              </div>
              <div class="content_order_info-in-open" >
                    <div class="content_order_info-in-open-cancel_order" >
                      <a class="content_order_info-in-open-cancel_order-a">取消订单</a>
                    </div>

                    <div class="content_order_info-in-open-detailed" >
                      <div class="content_order_info-in-open-detailed-list" v-for="good in paylist.goodlist" :key="good.gid" >
                        <img class="content_order_info-in-open-detailed-list-img" :src="'../../../static/img/good/'+good.gid+'/'+good.gmainPic" />
                          <div class="content_order_info-in-open-detailed-list-describe" >
                              <p class="content_order_info-in-open-detailed-list-describe-name">
                                  <a class="content_order_info-in-open-detailed-list-describe-name-a"  href="#">{{good.gname}}</a>
                              </p>
                              <p class="content_order_info-in-open-detailed-list-describe-num">型号：<span >{{good.gversion}}</span> </p>
                              <p class="content_order_info-in-open-detailed-list-describe-style">材质：<span>{{good.gmaterial}}</span> </p>
                          </div>
                              <div class="content_order_info-in-open-detailed-list-dispatching">
                                  <p class="content_order_info-in-open-detailed-list-dispatching-p" >工作日、非工作日、全天时段均可配送</p>
                                  <p class="content_order_info-in-open-detailed-list-dispatching-p" >预计发货后2-4个工作日送达</p>

                              </div>
                              <div class="content_order_info-in-open-detailed-list-amount">
                                  <p >数量：<span t>{{good.moNumber}}</span> </p>
                              </div>
                              <div class="content_order_info-in-open-detailed-list-price" >
                                  <p>￥<span>{{good.gprice}}</span> </p>
                              </div>
                      </div>
                      <!-- 价格总计区域 -->
                      <div class="content_order_info-in-open-total">
                          <div class="content_order_info-in-open-total-list">
                              <div class="content_order_info-in-open-total-list-selling_totals">
                                  <div class="content_order_info-in-open-total-list-selling_totals-name">商品总计</div>
                                  <div class="content_order_info-in-open-total-list-selling_totals-num">￥<span>{{paylist.oneorder.ototalPrice}}</span> </div>
                              </div>
                              <div class="content_order_info-in-open-total-list-freight">
                                  <div class="content_order_info-in-open-total-list-freight-name">运费</div>
                                  <div class="content_order_info-in-open-total-list-freight-num">免费</div>
                              </div>
                              <div class="content_order_info-in-open-total-list-totals">
                                  <div class="content_order_info-in-open-total-list-totals-name">总计</div>
                                  <div class="content_order_info-in-open-total-list-totals-num">￥<span>{{paylist.oneorder.ototalPrice}}</span> </div>
                              </div>
                          </div>
                      </div>
                      <!-- 其他信息区域 -->
                      <div class="content_order_info-in-open-other">
                          <div class="content_order_info-in-open-other-address">
                              <div class="content_order_info-in-open-other-address-title">配送地址</div>
                              <div class="content_order_info-in-open-other-address-user">
                                  <p class="content_order_info-in-open-other-address-user-p"><span>预计两天后送达</span> </p>
                                  <p class="content_order_info-in-open-other-address-user-p"><span></span> </p>
                              </div>
                              <div class="content_order_info-in-open-other-address-express">
                                  <p class="content_order_info-in-open-other-address-express-p">普通快递</p>
                                  <p class="content_order_info-in-open-other-address-express-p">免费</p>
                                  <p class="content_order_info-in-open-other-address-express-p">工作日、非工作日、全天时段均可配送</p>
                              </div>
                          </div>

                          <div class="content_order_info-in-open-other-gift">
                              <div class="content_order_info-in-open-other-gift-title">礼品包装</div>
                              <div class="content_order_info-in-open-other-gift-message">
                                  <p class="content_order_info-in-open-other-gift-message-p">礼品留言</p>
                                  <p class="content_order_info-in-open-other-gift-message-p">无</p>
                              </div>
                              <div class="content_order_info-in-open-other-gift-wrap">
                                  <p class="content_order_info-in-open-other-gift-wrap-p">礼品包装</p>
                                  <p class="content_order_info-in-open-other-gift-wrap-p">免费</p>
                              </div>
                          </div>

                          <div class="content_order_info-in-open-other-payment">
                              <div class="content_order_info-in-open-other-payment-title">支付方式</div>
                              <div class="content_order_info-in-open-other-payment-mode">
                                  <p class="content_order_info-in-open-other-payment-mode-p">支付宝</p>
                              </div>
                              <div class="content_order_info-in-open-other-payment-invoice">
                                  <p class="content_order_info-in-open-other-payment-invoice-p">不需要发票</p>
                              </div>
                          </div>
                      </div>


                    </div>
                  </div>
          </div>


      </div>
  </div>

</template>

<script>
import OrderItem from '../myorder/OrderItem'
import {formatDate} from '../../filter/index';
export default {
  name: '准备支付页面',
  data(){
    return{
        paylist: this.$qs.parse(this.$route.query.ordergood)
    }
  },
  components:{
    OrderItem
  },
  filters: {
    formatDateM(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, 'MM');
    },
    formatDateY(time) {
      var date = new Date(parseInt(time));

      return formatDate(date, 'yyyy');
    },
    formatDateD(time) {
      var date = new Date(parseInt(time));

      return formatDate(date, 'dd');
    }

  }
}
</script>

<style scoped>
   @import url('../../assets/css/pay.css');
</style>
