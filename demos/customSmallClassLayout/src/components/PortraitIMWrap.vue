<template>
  <div
    ref="imAreaRef"
    class="im-component"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const imAreaRef = ref();
onMounted(() => {
  nextTick(() => {
    TCIC.SDK.instance.loadComponent('portrait-im-component', {
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    })
      .then((ele) => {
        imAreaRef.value.appendChild(ele);
        ele.getVueInstance().notifyVisibilityChange(true);
      });
    });
});
</script>

<style scoped>
.im-component {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
