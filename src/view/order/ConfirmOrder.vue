<template>
  <!--最底板-->
<div class="entire">
    <div class="car-bground">
        <h1>我的订单</h1>
    </div>
    <!--底板-->
    <div class="content">
        <form  th:action="outConfirmOrderPage.do" method="post" onSubmit="return inputNull(this)">
        <!-- 一、 配送地址  礼品包装和留言（左）-->
        <div class="content_left">
            <!--从上到下-->
            <!-- 1.手机号码-->
            <div class="content_left-phone">
                <div class="content_left-phone_phNumMsg">手机号码：</div>
                <div class="content_left-phone_phNumMsg">我们将通过以下地址的手机号码向您发送订单相关信息</div>
                <!-- <div class="content_left-phone_number" th:text="${address.add_phone}"></div>-->
            </div>
            <!-- 2.配送地址-->
            <div class="content_left-deliveryAddress">
                <!--上部分-->
                <div class="top">
                    <i class="fa fa-check-square fa-2x" style="float: left;color: #127749;margin-right: 10px; "></i>
                    <div class="content_left-deliveryAddress_dAddress">配送地址</div>
                    <!-- 跳转到：我的地址里面，修改或者添加用户需要的地址-->
                    <a class="content_left-deliveryAddress_edit" href="#">编辑</a>
                </div>
                <!--下部分-->
                <div class="down">

                    <div v-for="item in add" :key="item.addId" class="down_left" >
                        <!--下左-->
                        <div class="down_left_checkBox">
                            <input type="radio" id="addressCheck" class="addressCheck" name="addressId" v-model="selectadd" :value="item.addId">
                        </div>
                        <p class="down_left-Pname">
                            <!-- 姓名 -->
                            <span >{{item.addXing}}{{item.addMing}}</span>
                            <!-- 称谓 -->
                            <span >{{item.addGender}}</span>
                        </p>
                        <p class="down_left-Paddress">
                            <!-- 省 市 区 详细地址 -->
                            <span>{{item.addProvince}}{{item.addCity}}{{item.addArea}}{{item.addDetail}}</span>
                        </p>
                        <p class="down_left-Pphone">
                            <span>+86</span>
                            <!-- 电话 -->
                            <span >{{item.addPhone}}</span>
                        </p>
                    </div>

                </div>
                <!-- 3.空白盒子 -->
                <div class="clear"></div>
            </div>
            <!-- 3.	礼品包装和留言  ：  这里的样式大多用的都是“配送地址”的样式 -->
            <div class="content_left-giftMessage">
                <!--上部分-->
                <div class="top">
                    <i class="fa fa-check-square fa-2x" style="float: left;color: #127749;margin-right: 10px;"></i>
                    <div class="content_left-deliveryAddress_dAddress">礼品包装和留言</div>
                    <a class="content_left-deliveryAddress_edit" href=""></a>
                </div>
                <!--下部分-->
                <div class="down">
                    <!--下左-->
                    <div class="down_left">

                        <p class="down_left-Pname">
                            <span>礼品留言</span>

                        </p>
                        <p class="down_left-Paddress">
                            <span>没有礼品留言</span>
                        </p>
                    </div>
                    <!--下右-->
                    <div class="down_right">

                        <p class="down_right-Ptype">
                            <span>礼品包装</span>
                        </p>
                        <p>
                            <span>免费</span>
                        </p>
                    </div>
                </div>
                <!-- 3.空白盒子 -->
                <div class="clear"></div>
            </div>
            <!-- 4.	关于配送  ：  这里的样式大多用的都是“配送地址”的样式 -->
            <div class="content_left-giftMessage">
                <!--上部分-->
                <div class="top">
                    <i class="fa fa-check-square fa-2x" style="float: left;color: #127749;margin-right: 10px;"></i>
                    <div class="content_left-deliveryAddress_dAddress">配送方式</div>
                    <a class="content_left-deliveryAddress_edit" href=""></a>
                </div>
                <!--下部分-->
                <div class="down">
                    <!--下左-->
                    <div class="down_leftRight">

                        <p class="down_left-Paddress">
                            <span style="color: #BFBFBF;">普通快递，免费，工作日、非工作日、全天时段均可配送，部分城市支持当日达、次日达；当日达请于当日上午9：30前提交订单并于10：00前完成支付，次日达请于当日下午3：30前提交订单并于4：00前完成支付。</span>
                        </p>
                    </div>
                    <!--下左-->
                    <div class="down_leftRight">

                        <p class="down_left-Paddress">
                            <span style="color: #BFBFBF;">我们会竭力尽快送达，若因天气、交通等不可抗力因素出现延误，请您谅解。如有疑问请致电400.8210.582咨询。</span>
                        </p>
                    </div>
                    <!--下左-->
                    <div class="down_leftRight">
                        <p class="down_left-Paddress">
                            <span>所有商品都免费提供Rolex礼品包装</span>
                        </p>
                    </div>

                </div>
                <!-- 3.空白盒子 -->
                <div class="clear"></div>
            </div>
        </div>
        <!-- 二、确认购买的商品信息（右）-->
        <div class="content_right">
            <!-- 1. 购买的商品件数 -->
            <div class="content_right-OrderSubtotal">
              <span>
                <span>{{allcount}}</span> 件商品
              </span>
            </div>
            <!-- 2. 购买的商品信息 -->
            <div v-for="good in goodlist" :key="good.gid" class="content_right-shopMsg">
                <!--左-->
                <div class="content_right-shopMsg_left">
                    <img width="205px" height="205px"  :src="'../../../static/img/good/'+good.gid+'/'+good.gmainPic"/>
                </div>
                <!--中:这里的样式是我直接copy过来的，所以class的名称我没有改-->
                <div class="content_left-bottom_msg">
                    <div class="content_left-bottom_msg-up">
                        <!-- 腕表名称 -->
                        <span class="content_left-bottom_msg-up_name" >{{good.gname}}</span> <br/>
                        <span>型号：</span>
                        <span class="content_left-bottom_msg-up_design">{{good.gversion}}</span> <br/>
                        <span>材质：</span>
                        <span class="content_left-bottom_msg-up_design">{{good.gmaterial}}</span>
                    </div>
                    <div class="content_left-bottom_msg-mid">
                        <span class="content_left-bottom_msg-up_name2"></span>有货 <br/>
                    </div>
                </div>
                <!--右-->
                <div class="content_right-shopMsg_right">
							<span class="content_right-shopMsg_right-num">
								数量:
								<span >{{good.mcNumber}}</span>
							</span>
                    <span class="content_right-shopMsg_right-monny">
								￥
								<span >{{number_format(good.mcNumber*good.gprice, 2, '.', ',')}}</span>
							</span>
                </div>
                <!--空盒子-->
                <div class="clear"></div>
            </div>

            <!-- 3. 总计 -->
            <div class="content_right-amount">
                <div class="content_right-amount_shopAmount">
                    商品总计
                    <span>￥{{allprice}}</span>
                </div>
                <div class="content_right-amount_carriage">
                    运费
                    <span>免费</span>
                </div>
                <div class="content_right-amount_superAmount">
                    总计
                    <span class="sign">
								￥
								<span >{{allprice}}</span>
							</span>
                </div>
            </div>
            <!-- 4. 提交订单 -->
            <div class="content_right-subsmitOrder">
                <div class="content_right-subsmitOrder_option">
                    <input type="checkbox" v-model="yinsi" name="" id="" value=""/> 提交订单即表明您接受我们的
                    <a class="accept" href="">隐私政策</a>和
                    <a class="accept" href="">销售条款</a>
                </div>
                <button  type="button" :disabled="!yinsi" class="content_right-subsmitOrder_sO" @click="createorder">提交订单
                </button>
            </div>
            <!-- 5. 说明 -->
            <div class="content_right-explain">
                <span>说明</span> 抢购订单提交之后1小时内未付款，订单将被系统自动取消，请您尽快完成支付以确保商品能及时送达，有货商品和门店配货商品是分开寄出。
            </div>
            <!-- 6. 空白盒子 -->
            <div class="clear"></div>

        </div>
        <!-- 三、空白盒子:为了解决“让div父元素的高度随子元素高度的变化而变化” -->
        <div class="clear"></div>
        </form>
    </div>
</div>
</template>

<script>
export default {
  name: 'confirmorder',
  data(){
    return {
      yinsi: false,
      goodlist: this.$qs.parse(this.$route.query.ordergood),
      add:  this.$qs.parse(this.$route.query.orderadd),
      selectadd: ''
    }
  },
  computed:{
    //商品总计
    allprice(){
      let price = 0
      for(let item in this.goodlist){
        price += this.goodlist[item].mcNumber*this.goodlist[item].gprice
      }
      return this.number_format(price , 2 , '.' , ',')
    },
    //商品总数量
    allcount(){
      let count = 0
      for(let item in this.goodlist){
        count += Number(this.goodlist[item].mcNumber)
      }
      return count
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
    async createorder(){
      if(this.selectadd == ''){
        this.$message({
          type: 'success',
          message: '请选择地址'
        })
      }


      const adds = this.selectadd
      let price = 0
      let arr = []
      for(let item in this.goodlist){
        price += this.goodlist[item].mcNumber*this.goodlist[item].gprice
        arr.push(this.goodlist[item])
      }
      const sub = {
        oneorder: {
          uid: window.sessionStorage.getItem('token'),
          addid: adds,
          ototalprice: Number(price)
        },
        goodlist: arr
      }
      console.log(sub)
      let oid = ''
      //发送创建订单的网络请求
      try{
        let res = await this.$http.post('order/create',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '生成订单失败'
          })
          return
        }
        oid = res.data.mydata
      }catch(error){
        this.$message({
        type: 'success' ,
        message: '创建异常，请重试'
        })
        console.log(error)
      }
      //根据订单号，获得订单对应的信息
      const subb = {
        oid: oid
      }

      try{
        let res = await this.$http.post('order/findone',subb)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '查询单条订单失败'
          })
          return
        }
        let orderandgood = res.data.mydata
        this.$router.push({
          path: '/pay',
          query:{
            ordergood: this.$qs.stringify(orderandgood)
          }
        })
      }catch(error){
        this.$message({
        type: 'success' ,
        message: '查询单条订单异常，请重试'
        })
        console.log(error)
      }


    }

  }
}
</script>

<style scoped>

  @import "../../assets/css/confirmOrder.css";
</style>
