<template>
  <div id="home">
    <vedio></vedio>
    <classify></classify>
    <play-picture></play-picture>
    <setwatch></setwatch>
    <addresss></addresss>
    <find-rolex></find-rolex>
  </div>
</template>

<script>
  import vedio from './Vedio'
  import setwatch from './SetWatch'
  import addresss from './Address'
  import findRolex from './FindRolex'
  import playPicture from './PlayPicture'
  import classify from './Classify'
  export default {
    name: "Home",
    components: {
      vedio,
      setwatch,
      addresss,
      findRolex,
      playPicture,
      classify
    }
  }
</script>

<style scoped>
  #home{
    margin-top: 0px;
  }
</style>
