<template>
  <div
    ref="boardAreaRef"
    class="board-area"
  />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
const boardAreaRef = ref();

onMounted(() => {
  nextTick(() => {
    const boardComponent = TCIC.SDK.instance.getComponent('board-component');
    const screenPlayerComponent = TCIC.SDK.instance.getComponent('screen-player-component');
    boardAreaRef.value.appendChild(boardComponent);
    boardAreaRef.value.appendChild(screenPlayerComponent);
    TCIC.SDK.instance.updateComponent('board-component', {
      display: 'block',
      // position: 'relative', !!不敢用 relative,否则窗口缩放时有问题
    });
    if (TCIC.SDK.instance.isIOSNative()) {
      screenPlayerComponent.getVueInstance().onResize();
    }
  });
});

</script>

<style scoped>
.board-area{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
