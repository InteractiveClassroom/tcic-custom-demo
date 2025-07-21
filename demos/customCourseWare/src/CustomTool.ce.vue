<script lang="ts" setup>
import { ref } from 'vue'
import img from './assets/Tool.svg'

const handleClick = (item) => {
  alert('handleClick');
}
</script>

<template>
<div class="custom-tool" @click="handleClick">
  <img class="tool-icon" :src="img"></img>自定义工具
</div>
</template>

<style lang="less" scoped>
.custom-tool {
  color: #fff;
  font-size: 16px;
  line-height: 35px;
  font-weight: 400;
  display: flex;
  .tool-icon {
    width: 30px;
    height: 30px;
    background-size: 100%;
    margin-right: 2px;
  }
}
</style>