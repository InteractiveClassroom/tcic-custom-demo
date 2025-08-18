<template>
  <div
    v-if="!isWeb"
    :class="['switch-orientation', className,  {
      'is-ios': isIOSNative,
      'is-android': isAndroidNative,
      'is-portrait': isPortrait} ]"
    @click="changeOrientation"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  className: {
    required: false,
    type: String,
    default: '',
  },
});

const isPortrait = ref(TCIC.SDK.instance.getState(TCIC.TMainState.Device_Orientation));
const isWeb = TCIC.SDK.instance.isWeb();
const isIOSNative = TCIC.SDK.instance.isIOS() && TCIC.SDK.instance.isMobileNative();
const isAndroidNative = TCIC.SDK.instance.isAndroid() && TCIC.SDK.instance.isMobileNative();

onMounted(() => {
  TCIC.SDK.instance.subscribeState(TCIC.TMainState.Device_Orientation, (orientation) => {
    isPortrait.value = orientation === TCIC.TDeviceOrientation.Portrait;
  });
});

function changeOrientation() {
  TCIC.SDK.instance.setDeviceOrientation(isPortrait.value ? TCIC.TDeviceOrientation.Landscape : TCIC.TDeviceOrientation.Portrait);
}
</script>

<style lang="less">
  .switch-orientation {
    background-image: url('../assets/switch-orientation.svg') ;
    background-size: 100%;
    background-position: 50%;
    width: 30px;
    height: 30px;
    right: 25px;
    background-color: rgba(28,33,49,.5);
    border-radius: 8px;
    position: fixed;
    top: calc(100% - 45px);
    z-index: 1000;
    &.is-portrait {
      top: 28%;
      left: 10px;
      right: 0;
      &.is-ios {
        top: calc(34% + env(safe-area-inset-top));
      }
      &.is-andriod {
        top: calc(30% + 40px)
      }
    }
  }
</style>
