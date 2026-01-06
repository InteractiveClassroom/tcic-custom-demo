<template>
  <div
    class="bigcls-video-con"
    :style="{'--IM-width': IMWidth + 'px'}"
  >
    <div
      ref="videoAreaRef"
      class="left-area"
      :style="{
        '--video-width': `${videoSize.videoWidth}px`,
        '--video-height': `${videoSize.videoHeight}px`,
      }"
    />
    <div
      class="right-area"
      :style="{ width: `${IMWidth}px` }"
    >
      <SideToggleButton
        :style="{
          width: '20px',
          height: '40px',
          position: 'absolute',
          bottom: '72.5px',
          zIndex: 999,
          left: '-20px'
        }"
      />
      <div
        ref="imAreaRef"
        class="right-area-inner"
      />
    </div>
    <div
      ref="footerArea"
      class="desktop-footer-area"
    >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, watch, computed } from 'vue';
import { useVideos } from './hooks/useVideos';
import { useVideoSize } from './hooks/useVideoSize';
import { useWindowSize } from '@vueuse/core';

const videoAreaRef = ref(null);
const imAreaRef = ref(null);
const footerArea = ref(null);
const { teacherVideo, studentVideos } = useVideos();
const videoCount = ref(studentVideos.value.length + 1);

const { width: windowWidth } = useWindowSize();
const videoSize = useVideoSize(videoAreaRef, videoCount, { resizeable: true, fillMode: 'contain' });

const IMWidth = computed(() => {
  if (windowWidth.value < 1440) {
    return 286;
  }
  if (windowWidth.value < 1920) {
    return 322;
  }
  return 452;
});
const initVideos = () => {
  if (teacherVideo.value) {
    TCIC.SDK.instance.updateComponent('teacher-component', {
      width: 'var(--video-width)',
      height: 'var(--video-height)',
      display: 'block',
      position: 'relative',
    }).then(() => {
      const ele = TCIC.SDK.instance.getComponent('teacher-component');
      if (ele) {
        videoAreaRef.value?.appendChild(ele);
      }
    });
  }
  studentVideos.value?.forEach((info) => {
    TCIC.SDK.instance.updateComponent('student-component', {
      width: 'var(--video-width)',
      height: 'var(--video-height)',
      display: 'block',
      position: 'relative',
    }, info.userId).then(() => {
      const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
      if (studentDom) {
        videoAreaRef.value?.appendChild(studentDom);
      }
    });
  });
};
onMounted(() => {
  nextTick(() => {
    initVideos();
    TCIC.SDK.instance.loadComponent('footer-component', {
      left: '0',
      top: '0',
      zIndex: 11,
      width: '100%',
      height: '40px',
      display: 'block',
    })
      .then((ele) => {
        footerAreaRef.value.appendChild(ele);
        const footerVue = TCIC.SDK.instance.getComponent('footer-component').getVueInstance();
        footerVue.disableQuickIM = true;
      })
      .catch((err) => {
        console.log('initLayout', err);
      });
    const screenPlayerComponent = TCIC.SDK.instance.getComponent('screen-player-component');
    videoAreaRef.value.appendChild(screenPlayerComponent);
    // 放好 im
    TCIC.SDK.instance.updateComponent('introduction-discuss-component', {
      display: 'block',
      position: 'relative',
    }).then(() => {
      imAreaRef.value.appendChild(TCIC.SDK.instance.getComponent('introduction-discuss-component'));
    });
  });
});
watch(
  [teacherVideo, studentVideos],
  () => {
    initVideos();
    videoCount.value = studentVideos.value.length + 1;
  },
);
</script>

<style lang="less">
.bigcls-video-con{
  width: 100%;
  height: 100%;
  display: flex;
  .left-area{
    display: flex;
    position: relative;
    gap: 2px;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: calc(100% - 50px);
    width: calc(100% - var(--IM-width));
  }
  .right-area{
    width: auto;
    position: relative;
    height: 100%;
    .right-area-inner{
      width: 100%;
      height: 100%;
    }
  }
  .desktop-footer-area{
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
  }
}
</style>