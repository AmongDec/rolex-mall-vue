import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    //主页
    {
      path: '/home',
      component: ()=>import('@/view/home/Home')
    },
    //登录
    {
      path: '/login',
      component: ()=>import('@/view/login/Login')
    },
    //订单页面
    {
      path: '/myorder',
      name: 'myorder',
      component: ()=>import('@/view/myorder/myorder')
    },
    //收藏页面
    {
      path: '/collect',
      component: ()=>import('@/view/collect/Collect')
    },
    //新增地址页面address
    {
      path: '/addaddress',
      component: ()=>import('@/view/address/Address')
    },
    //查询地址页面
    {
      path: '/findaddress',
      component: ()=>import('@/view/address/FindAddress')
    },
    //确认订单
    {
      path: '/confirm',
      component: ()=>import('@/view/order/ConfirmOrder')
    },
    //确认单个商品订单
    {
      path: '/confirmone',
      component: ()=>import('@/view/order/ConfirmOrderOne')
    },
    //商品详情
    {
      path: '/detail',
      component: ()=>import('@/view/good/GoodDetail')
    },
    //支付页面
    {
      path: '/pay',
      component: ()=>import('@/view/pay/Pay')
    },
    //分类列表页面
    {
      path: '/clsgoodlist',
      component: ()=>import('@/view/classify/Classlist')
    },
    //测试
    {
      path: '/test',
      component: ()=>import('@/view/test/test')
    },
    //分类页面
    {
      path: '/classify',
      component: ()=>import('@/view/classify/ClassifyPage')
    },
    //搜索页面
    {
      path: '/search',
      component: ()=>import('@/view/search/Search')
    },
    //搜索列表页面
    {
      path: '/searchlist',
      component: ()=>import('@/view/search/SearchGoodList')
    },
    //个人中心页面
    {
      path: '/profile',
      component: ()=>import('@/view/profile/Profile')
    },
    //购物车页面
    {
      path: '/shopcar',
      component: ()=>import('@/view/shopcar/Shopcar')
    },
    //推荐页面
    {
      path: '/recommend',
      component: ()=>import('@/view/recommend/Recommend')
    },
    //捆绑包订单确认
    {
      path: '/confirmorderkun',
      component: ()=>import('@/view/order/ConfirmOrderRe')
    }
  ],
  mode: 'history'
})
