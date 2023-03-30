<template>
  <div class="home-page">
    <h1>首页</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home-page {
}
</style>
