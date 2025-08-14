<template>
  <div class="layout-custom-portrait">
    <div class="footer" ref="footerArea"></div>
    竖屏
  </div>
</template>

<script setup>
import { ref } from 'vue';
const footerArea = ref(null);

TCIC.SDK.instance.loadComponent('tabbar-component', {
  width: '100%',
  height: '90px',
  display: 'block'
}).then(() => {
  const ele = TCIC.SDK.instance.getComponent('tabbar-component');
  if (ele) {
    footerArea.value?.appendChild(ele);
  }
})
</script>

<style lang="less">
.layout-custom-portrait{
  width: 100%;
  height: 100%;
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90px;
  }
}
</style>
