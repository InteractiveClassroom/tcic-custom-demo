<template>
  <SmallClassPortrait v-if="isPortrait" />
  <SmallClassLandScape v-else />
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
console.log('small-custom-layout');
// 竖屏
import SmallClassPortrait from './SmallClassPortrait.vue';
// 横屏
import SmallClassLandScape from './SmallClassLandScape.vue';
const isPortrait = ref(TCIC.SDK.instance.isPortrait());
watch(isPortrait, (newVal) => {
  console.log('isPortrait change', newVal);
  nextTick(() => {
    const board = TCIC.SDK.instance.getBoard();
    board.refresh();
  });
});
TCIC.SDK.instance.subscribeState(TCIC.TMainState.Device_Orientation, (orientation) => {
  console.log('orientation change', orientation);
  isPortrait.value = orientation === TCIC.TDeviceOrientation.Portrait;
  const screenPlayerComponent = TCIC.SDK.instance.getComponent('screen-player-component');
  if (screenPlayerComponent?.getVueInstance().isScreenShareOpen) {
    TCIC.SDK.instance.reportLog('setSubStreamEncoderParam', {
      resMode: orientation,
      layout: 'bigClass',
    });
    TCIC.SDK.instance.setSubStreamEncoderParam({
      resMode: orientation,
    });
  }
});
</script>

<style>
</style>