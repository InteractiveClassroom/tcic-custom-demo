<template>
  <div
    class="layout-custom-landscape"
  >
    <div
      ref="containerRef"
      class="main-area"
    >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const containerRef = ref(null);

// 流地址配置在这里
const streamUrl = ref('webrtc://29734.liveplay.myqcloud.com/live/1400313729_371477611_2Rlj3pkseUpdmjfpAERojOA64FY_main?txSecret=e8aebb0730c2c08395c1d6275541c566&txTime=692D60F4');


onMounted(() => {
  TCIC.SDK.instance.promiseState(TCIC.TMainState.Joined_Class, true).then(() => {
    // startPlay(dom: HTMLElement, url: string, fullMode: boolean, muteMode: boolean, playUserId: string, isSub: boolean)
    TCIC.SDK.instance.getInstances().live.startPlay(containerRef.value, streamUrl.value, false, false, 'testUser', false);
  });
});

</script>

<style lang="less">
.layout-custom-landscape{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main-area{
    width: 100%;
    height: 200px;
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
  }
  
}
</style>
