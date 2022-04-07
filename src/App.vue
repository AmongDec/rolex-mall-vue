<template>
  <div id="app">
    <tabbar></tabbar>
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
  import tabbar from './components/TabBar'
  import bottom from './components/Bottom'
  export default {
    name: 'App',
    components: {
      tabbar,
      bottom
    },
    data(){
      return{
        message: 'xiao'
      }
    }
  }
</script>

<style>
  @import url('./assets/font-awesome-4.7.0/css/font-awesome.min.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F5F5F5;
}

</style>
