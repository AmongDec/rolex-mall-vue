<template>
  <!-- 进入分类  -->
  <div class="partition">

    <div class="partition-word-title">
      劳力士腕表
    </div>

    <div class="partition-word-content">
      劳力士腕表蕴含优质的原材料与一丝不苟的工艺。每件组件均由劳力士自行以严格的标准设计及研制。
    </div>

    <div class="partition-picture">
      <img src="static/img/Main/download.jpg" />
      <div class="partition-picture-word">
        所有劳力士腕表
      </div>

      <div class="partition-picture-word-small">
        探索展现经典隽永及可靠性能的劳力士腕表
      </div>

      <div class="partition-picture-button partition-picture-button-h" @click="toclassify">
        <a>探索更多</a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Classify",
    methods:{
      toclassify(){
        this.$router.push('/classify')
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/Classify.css";
</style>
