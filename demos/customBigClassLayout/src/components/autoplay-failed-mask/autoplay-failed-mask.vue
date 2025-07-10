<template>
  <div
    class="autoplay-wrapper"
    :class="{'autoplay-failed-mask': showMask}"
    @click="resume"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showMask = ref(false);
TCIC.SDK.instance.subscribeState(TCIC.TMainState.Auto_Play_Failed, (value) => {
  showMask.value = value;
});
const resume = () => {
  // 恢复自动播放
  TCIC.SDK.instance.setState(TCIC.TMainState.Auto_Play_Failed, false);
};
</script>

<style lang="less">
.autoplay-wrapper {
  &.autoplay-failed-mask {
    position: relative;
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('./auto_play.svg');
      z-index: 9999;
    }
  }
}

</style>
