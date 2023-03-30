<!--
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:07
 * @LastEditTime: 2022-12-12 11:37:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\App.vue
 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 50px;
}
</style>
