<script lang="ts" setup>
import { ref } from 'vue'
const handleClick = (item) => {
  alert('handleClick');
}
</script>

<template>
<div class="custom-tool" @click="handleClick">自定义工具</div>
</template>

<style lang="less" scoped>
.custom-tool {
  color: #fff;
  font-size: 20px;
  line-height: 35px;
  font-weight: 400;
}
</style>