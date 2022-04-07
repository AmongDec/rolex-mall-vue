<template>
  	<div class="main-bg">
		<!-- title -->
		<h1>Rolex</h1>
		<!-- //title -->
		<div class="sub-main-w3">
			<div class="image-style">
			</div>
			<!-- vertical tabs -->
			<div class="vertical-tab">
				<div id="section1" class="section-w3ls">
					<input type="radio" name="sections" id="option1" checked>
					<label for="option1" class="icon-left-w3pvt"><span class="fa fa-user-circle" aria-hidden="true"></span>Login</label>
					<article>
						<form>
							<h3 class="legend">Login Here</h3>
							<div class="input">
								<span class="fa fa-mobile-phone" aria-hidden="true"></span>
								<input type="text" placeholder="Phone" name="phone" v-model="login.phone" required />
							</div>
							<div class="input">
								<span class="fa fa-key" aria-hidden="true"></span>
								<input type="password" placeholder="Password" name="password" v-model="login.password" required />
							</div>
							<button type="button" class="btn submit" @click="valAndSub">Login</button>

						</form>
					</article>
				</div>
				<div id="section2" class="section-w3ls">
					<input type="radio" name="sections" id="option2">
					<label for="option2" class="icon-left-w3pvt"><span class="fa fa-pencil-square" aria-hidden="true"></span>Register</label>
					<article>
						<form>
							<h3 class="legend">Register Here</h3>
							<div class="input">
								<span class="fa fa-mobile-phone" aria-hidden="true"></span>
								<input type="text" placeholder="Phone" name="phone" v-model="register.phone" required />
							</div>
							<div class="input">
								<span class="fa fa-key" aria-hidden="true"></span>
								<input type="password" placeholder="Password" name="password" v-model="register.password" required />
							</div>
							<div class="input">
								<span class="fa fa-key" aria-hidden="true"></span>
								<input type="password" placeholder="Confirm Password" name="password" v-model="register.confirm" required />
							</div>
							<button type="button" class="btn submit" @click="registe" >Register</button>
						</form>
					</article>
				</div>
				<div id="section3" class="section-w3ls">
					<input type="radio" name="sections" id="option3">
					<label for="option3" class="icon-left-w3pvt"><span class="fa fa-lock" aria-hidden="true"></span>Forgot Password?</label>
					<article>
						<form  method="post">
							<h3 class="legend last">Reset Password</h3>
							<p class="para-style">Enter your email address below and we'll send you an email with instructions.</p>
							<p class="para-style-2"><strong>Need Help?</strong> Learn more about how to <a href="#">retrieve an existing
									account.</a></p>
							<div class="input" >
								<span class="fa fa-mobile-phone" aria-hidden="true"></span>
								<input type="text" placeholder="电话号码" v-model="smsvo.phonenum" name="email" required />
                <button v-show="show" type="button" class="btn fasong last-btn" @click="sendcode()">发送</button>
                <button v-show="!show" type="button" disabled class="btn fasong last-btn">{{count}}</button>
							</div>
              <div class="input">
								<span class="fa fa-envelope-o" aria-hidden="true"></span>
								<input type="text" placeholder="验证码" v-model="smsvo.code" name="email" required />
							</div>
              <div class="input">
								<span class="fa fa-key" aria-hidden="true"></span>
								<input type="password" placeholder="密码" v-model="smsvo.password" name="email" required />
							</div>
              <div class="input">
								<span class="fa fa-key" aria-hidden="true"></span>
								<input type="password" placeholder="确认密码" v-model="smsvo.repassword" name="email" required />
							</div>
							<button type="button" class="btn submit last-btn" @click="valcode()">验证并修改密码</button>
						</form>
					</article>
				</div>
			</div>
			<!-- //vertical tabs -->
			<div class="clear"></div>
		</div>
		<!-- copyright -->
		<div class="copyright">
			<h2>&copy; 2019 Triple Forms. All rights reserved | Design by
				<a href="http://w3layouts.com" target="_blank">W3layouts</a>
			</h2>
		</div>
		<!-- //copyright -->
	</div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return {
      //登录模块的数据
      login: {
        phone: '',
        password: ''
      },
      //注册模块数据
      register: {
        phone: '',
        password: '',
        confirm: ''
      },
      //忘记密码
      smsvo:{
        phonenum: '',
        code: '',
        password: '',
        repassword: ''
      },
      show: true,
      count: '',
      timer: null,
    }
  },
  methods:{
    //验证并且登录
    async valAndSub(){
      //获得login
      const sub = this.login
      //手机号码非空判断
      if(sub.phone == '' || sub.phone == null || sub.phone == undefined){
        this.$message({
          type: 'success' ,
          message: '电话号码不能为空'
        })
        return
      }
      //手机号码格式验证
      if(!(/^1[3456789]\d{9}$/.test(sub.phone))){
        this.$message({
          type: 'success' ,
          message: '手机号码有误，请重填'
        })
        return
      }

      //密码非空验证
      if(sub.password == '' || sub.password == null || sub.password == undefined){
        this.$message({
          type: 'success' ,
          message: '密码不能为空'
        })
        return
      }
      try{
        //同步请求login/valandsub接口
        let res = await this.$http.post('login/valandsub',sub)
        //错误则提示
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '登陆失败，请检查账号密码'
          })
          return
        }
        //将返回的token存储在sessionStorage中
        window.sessionStorage.setItem('token' , res.data.mydata)
        this.$store.state.login = window.sessionStorage.getItem('token') == null ? '登录' : '个人中心'
        this.$router.push('/home')
      }catch(error){
        //异常则提示
        this.$message({
         type: 'success' ,
         message: '登陆异常，请重试'
        })
        console.log(error)
      }
    },
    //注册
    async registe(){
      const sub  = this.register
      //手机号码非空判断
      if(sub.phone == '' || sub.phone == null || sub.phone == undefined){
        this.$message({
          type: 'success' ,
          message: '电话号码不能为空'
        })
        return
      }
      //手机号码格式验证
      if(!(/^1[3456789]\d{9}$/.test(sub.phone))){
        this.$message({
          type: 'success' ,
          message: '手机号码有误，请重填'
        })
        return
      }

      //密码非空验证
      if(sub.password == '' || sub.password == null || sub.password == undefined ){
        this.$message({
          type: 'success' ,
          message: '密码不能为空'
        })
        return
      }
      //密码非空验证
      if(sub.password.length < 6 || sub.password.length > 18){
        this.$message({
          type: 'success' ,
          message: '密码长度在6-18位之间'
        })
        return
      }
      //密码确认密码验证
      if(sub.password != sub.confirm){
        this.$message({
          type: 'success' ,
          message: '两次输入的密码不一致'
        })
        return
      }
      //发送网络请求，将信息写入数据库
       try{
        let res = await this.$http.post('login/registe',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'success' ,
            message: '注册失败，手机号码已存在'
          })
          return
        }
        this.$message({
          type: 'success' ,
          message: '注册成功'
        })
        window.location.reload()
      }catch(error){
        this.$message({
         type: 'success' ,
         message: '登陆异常，请重试'
        })
        console.log(error)
      }
    },
    //发送验证码
    async sendcode(){
       const sub  = this.smsvo
       if(sub.phonenum == '' || sub.phonenum == null || sub.phonenum == undefined){
        this.$message({
          type: 'error' ,
          message: '电话号码不能为空'
        })
        return
      }
      //手机号码格式验证
      if(!(/^1[3456789]\d{9}$/.test(sub.phonenum))){
        this.$message({
          type: 'error' ,
          message: '手机号码有误，请重填'
        })
        return
      }

      try{
        let res = await this.$http.post('sms/send',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'error' ,
            message: res.data.mydata
          })
          return
        }
        this.$message({
          type: 'success' ,
          message: '发送成功'
        })
      }catch(error){
        this.$message({
         type: 'success' ,
         message: '登陆异常，请重试'
        })
        console.log(error)
      }
      //倒计时
     const TIME_COUNT = 60;
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }

    },
    //验证
    async valcode(){
      const sub  = this.smsvo
      if(sub.phonenum == '' || sub.phonenum == null || sub.phonenum == undefined){
        this.$message({
          type: 'error' ,
          message: '电话号码不能为空'
        })
        return
      }
      //手机号码格式验证
      if(!(/^1[3456789]\d{9}$/.test(sub.phonenum))){
        this.$message({
          type: 'error' ,
          message: '手机号码有误，请重填'
        })
        return
      }
      //密码非空验证
      if(sub.password == '' || sub.password == null || sub.password == undefined ){
        this.$message({
          type: 'error' ,
          message: '密码不能为空'
        })
        return
      }
      //密码非空验证
      if(sub.password.length < 6 || sub.password.length > 18){
        this.$message({
          type: 'error' ,
          message: '密码长度在6-18位之间'
        })
        return
      }

      if(sub.password != sub.repassword){
        this.$message({
          type: 'error' ,
          message: '两次输入密码不一致'
        })
        return
      }

      try{
        let res = await this.$http.post('sms/val',sub)
        if(res.data.message == 'error'){
          this.$message({
            type: 'error' ,
            message: res.data.mydata
          })
          return
        }
        this.$message({
          type: 'success' ,
          message: '修改成功'
        })
      }catch(error){
        this.$message({
         type: 'error' ,
         message: '异常，请重试'
        })
        console.log(error)
      }
      window.location.reload()
    }

  }


}
</script>

<style scoped>
  @import url('../../assets/css/login.css');
  @import url('../../assets/css/font-awesome.min.css');

</style>
