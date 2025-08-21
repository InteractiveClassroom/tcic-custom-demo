<template>
  <div
    class="layout-custom-portrait"
    :class="{
      'screen-share': screenPlayerVisible
    }"
  >
    <div
      class="custom-video-list"
    >
      <div class="video-list-inner"
        ref="videoListRef"
        :style="{ width: `${videoCountRef * (110 + 2)}px`, height: '100%' }"
      ></div>
    </div>
    <div
      ref="containerRef"
      class="custom-video-wall"
    >
      <div
        ref="videoAreaRef"
        class="video-area"
        :style="{
          width: videoWallSize.width + 'px',
          height: videoWallSize.height + 'px',
          '--video-width': videoSize.videoWidth + 'px',
          '--video-height': videoSize.videoHeight + 'px',
        }"
      />
    </div>
    <div
      ref="footerArea"
      class="footer"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useVideos } from './hooks/useVideos';
import { useVideoWall } from './hooks/useVideoWall';
const { teacherVideo, studentVideos } = useVideos();

const videoListRef = ref(null);
const videoAreaRef = ref(null);
const containerRef = ref(null);
const footerArea = ref(null);
const videoCountRef = ref(1);
const { videoSize, videoWallSize } = useVideoWall(containerRef, videoCountRef);

TCIC.SDK.instance.loadComponent('tabbar-component', {
  width: '100%',
  height: '90px',
  display: 'block'
}).then(() => {
  const ele = TCIC.SDK.instance.getComponent('tabbar-component');
  if (ele) {
    footerArea.value?.appendChild(ele);
    ele.getVueInstance().customMenus = ['custom-menu'];
  }
});

const screenPlayerVisible = ref(TCIC.SDK.instance.getState('TStateScreenPlayerVisible', false));
const initVideos = ({ teacherVideo, studentVideos }) => {
  const promiseArr = [];
  // 无论老师是否在房都展示
  promiseArr.push(TCIC.SDK.instance.loadComponent('teacher-component', {
    left: '0',
    top: '0',
    width: 'var(--video-width)',
    height: 'var(--video-height)',
    display: 'block',
    position: 'relative',
  }).then(() => {
    const ele = TCIC.SDK.instance.getComponent('teacher-component');
    if (ele) {
      videoAreaRef.value?.appendChild(ele);
    }
  }));
  studentVideos?.forEach((info) => {
    promiseArr.push(TCIC.SDK.instance.loadComponent('student-component', {
      left: '0',
      top: '0',
      width: 'var(--video-width)',
      height: 'var(--video-height)',
      display: 'block',
      position: 'relative',
    }, null, info.userId).then(() => {
      const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
      if (studentDom) {
        videoAreaRef.value?.appendChild(studentDom);
      }
    }));
  });
  return Promise.all(promiseArr);
};
onMounted(() => {
  if (screenPlayerVisible.value) {
    putVideoToTopArea();
  } else {
    initVideos({ teacherVideo: teacherVideo.value, studentVideos: studentVideos.value });
  }
  videoCountRef.value = studentVideos.value.length + 1;
  TCIC.SDK.instance.promiseState('TStateComponentLoaded', true).then(() => {
    console.log('TStateComponentLoaded', TCIC.SDK.instance.getState('TStateComponentLoaded', false));
    containerRef.value.appendChild(TCIC.SDK.instance.getComponent('screen-player-component'));
  });
  TCIC.SDK.instance.subscribeState('TStateScreenPlayerVisible', (visible) => {
    screenPlayerVisible.value = visible;
  });
});
const putVideoToTopArea = () => {
  console.log('putVideoToTopArea', TCIC.SDK.instance.getComponent('teacher-component'));
  videoListRef.value?.appendChild(TCIC.SDK.instance.getComponent('teacher-component'));
  studentVideos.value.forEach((info) => {
    console.log('putVideoToTopArea', info);
    TCIC.SDK.instance.loadComponent('student-component', {
      left: '0',
      top: '0',
      width: 'var(--video-width)',
      height: 'var(--video-height)',
      display: 'block',
      position: 'relative',
    }, null, info.userId).then(() => {
      const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
      if (studentDom) {
        videoListRef.value?.appendChild(studentDom);
      }
    });
  });
}

watch(
  [teacherVideo, studentVideos],
  ([teacherVideo, studentVideos]) => {
    if (screenPlayerVisible.value) {
      putVideoToTopArea();
    } else {
      initVideos({ teacherVideo, studentVideos });
    }
    videoCountRef.value = studentVideos.length + 1;
  },
  {
    deep: true,
  },
);
watch(screenPlayerVisible, (newVal) => {
  containerRef.value.appendChild(TCIC.SDK.instance.getComponent('screen-player-component'));
  if (newVal) {
    putVideoToTopArea();
  } else {
    initVideos({ teacherVideo: teacherVideo.value, studentVideos: studentVideos.value });
  }
});
</script>

<style lang="less">
.layout-custom-portrait{
  width: 100%;
  height: 100%;
  &.screen-share{
    .custom-video-wall{
      height: calc(100% - 160px + env(safe-area-inset-bottom));
    }
    .custom-video-list{
      height: 70px;
    }
  }
  .custom-video-list{
    --video-width: 110px;
    --video-height: 70px;
    overflow-x: auto;
    white-space: nowrap;
    &::-webkit-scrollbar{
      display: none;
    }
    .video-list-inner{
      display: flex;
      gap: 2px;
    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90px;
  }
  .custom-video-wall{
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    height: calc(100% - 90px);
  }
  .video-area{
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    justify-content: center;
    gap: 2px;
    align-content: center;
    flex-wrap: wrap;
    teacher-component{
      order: 1;
    }
    student-component{
      order: 2;
    }
  }
}
</style>
