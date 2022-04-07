<template>
  <div class="address-bground">
    <center>

        <!--你的地址信息-->
        <div class="address-add-title">
            <h1>我的地址</h1>
        </div>
        <!--     添加地址         -->
        <div class="address-add-info">
            <!-- 地址标题 -->
            <div class="address-add-title111">
                <h1>新地址</h1>
            </div>
            <div class="address-add-title222">
                <h4>国家及地区</h4>
                <p><i>国旗</i>中国大陆地区</p>
            </div>

            <form action="outAddaddress.do" method="get" id="aform">
                <!--称呼姓名 -->
                <div class="appellation-name">
                    <div class="address-appellation">
                        <label>称呼:</label><br/>
                        <select name="name1" v-model="address.addGender" class="appellation111">
                            <option value="无">选择</option>
                            <option value="先生">先生</option>
                            <option value="女士">女士</option>
                        </select>
                    </div>
                    <div class="address-family-name">
                        <label>姓:</label><br/>
                        <input type="text" name="family-name" v-model="address.addXing" id="family-name"/><br/>
                        <span id="family-name-validation" name="family-name-validation"
                              class="family-name-validation"></span>
                    </div>
                    <div class="address-last-name">
                        <label>名:</label><br/>
                        <input type="text" name="last-name" v-model="address.addMing" id="last-name"/><br/>
                        <span id="last-name-validation" name="last-name-validation" class="last-name-validation"></span>
                    </div>
                </div>

                <!--地址-->
                <div class="address-add-city">
                    <label>地址:</label><br/><br/>
                    <v-distpicker province="省" city="市" area="区" @selected="onSelected"></v-distpicker>
                </div>

                <!--详细地址，具体到街道-->
                <div class="address-city-detail">
                    <label>详细地址:</label>
                    <div class="address1-2-detail">
                        <input type="text" name="addressDetail" v-model="address.addDetail" id="addressDetail" value=""/><br/>
                        <span class="address-validation" id="address-validation"></span>
                    </div>
                </div>

                <!--手机号码-->
                <div class="address-phone">
                    <div class="address-86">
                        <label>手机号码:</label>
                        <select name="address-86-city" class="address-86-city">
                            <option value="">+86&nbsp;中国大陆地区</option>
                        </select>
                    </div>
                    <div class="address-phone-number">
                        <input type="text" name="phone-number"  v-model="address.addPhone" id="phone-number"/>
                        <span id="phone-number-validation" class="phone-number-validation"></span><br/>
                    </div>
                </div>
            </form>
            <!--提交按钮-->
            <div class="save">
                <el-button  type="success" round  @click="saveInfo">保存</el-button>
            </div>
        </div>

    </center>
</div>

</template>

<script>

import VDistpicker from 'v-distpicker'
export default {
  name: 'addAddress',
  data(){
    return {
      address: {
        uid: window.sessionStorage.getItem('token'),
        addProvince: '',
        addCity: '',
        addArea: '',
        addGender: '无',
        addXing: '',
        addMing: '',
        addPhone: '',
        addDetail: ''
      }
    }
  },
  components:{
    VDistpicker
  },
  methods:{
    onSelected(data) {
      this.address.addProvince = data.province.value
      this.address.addCity = data.city.value
      this.address.addArea = data.area.value
    },
    //进入地址查询界面
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
    //保存信息的放法
    async saveInfo(){
      if(this.address.addProvince == '' || this.address.addCity == '' || this.address.addArea == '' || this.address.addDetail == ''){
        this.$message({
          type: 'success',
          message: '地址不能为空'
        })
        return
      }

      if(this.address.addGender == '无' || this.address.addXing == '' || this.address.addMing == ''){
        this.$message({
          type: 'success',
          message: '称谓或姓名不能为空'
        })
        return
      }

      if(this.address.addXing.length > 10 || this.address.addMing.length > 10){
        this.$message({
          type: 'success',
          message: '姓名长度太长'
        })
        return
      }

      if(this.address.addPhone == ''){
        this.$message({
          type: 'success',
          message: '联系电话不能为空'
        })
        return
      }

      //手机号码格式验证
      if(!(/^1[3456789]\d{9}$/.test(this.address.addPhone))){
        this.$message({
          type: 'success' ,
          message: '手机号码格式有误，请重填'
        })
        return
      }

      const sub = this.address

       //发送网络请求，将信息写入数据库
      try{
        let res = await this.$http.post('address/add',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '保存失败'
          })
          return
        }
        this.$message({
          type: 'success' ,
          message: '保存成功'
        })
        this.toaddress()
      }catch(error){
        this.$message({
         type: 'success' ,
         message: '保存异常，请重试'
        })
        console.log(error)
      }
    }
  }

}
</script>

<style scoped>
  @import "../../assets/css/addAddress.css";
  .distpicker-address-wrapper {
    color: #9caebf;
    float: left;

  }


</style>
