<template>
  <div
    class="layout-custom-landscape"
    :class="{
      'screen-share': screenPlayerVisible
    }"
  >
    <div
      ref="containerRef"
      class="left-area"
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
      ref="rightAreaRef"
      class="right-area"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useVideos } from './hooks/useVideos';
import { useVideoWall } from './hooks/useVideoWall';
const { teacherVideo, studentVideos } = useVideos();
const videoAreaRef = ref(null);
const rightAreaRef = ref(null);
const videoCountRef = ref(1);
const containerRef = ref(null);
const screenPlayerVisible = ref(TCIC.SDK.instance.getState('TStateScreenPlayerVisible', false));

const { videoSize, videoWallSize } = useVideoWall(containerRef, videoCountRef);

onMounted(() => {
  if (screenPlayerVisible.value) {
    putVideoToRightArea();
  } else {
    initVideos({ teacherVideo: teacherVideo.value, studentVideos: studentVideos.value });
  }
  videoCountRef.value = studentVideos.value.length + 1;
  console.log('onMounted',TCIC.SDK.instance.getComponent('screen-player-component'));
  TCIC.SDK.instance.promiseState('TStateComponentLoaded', true).then(() => {
    console.log('TStateComponentLoaded', TCIC.SDK.instance.getState('TStateComponentLoaded', false));
    containerRef.value.appendChild(TCIC.SDK.instance.getComponent('screen-player-component'));
  });
  TCIC.SDK.instance.subscribeState('TStateScreenPlayerVisible', (visible) => {
    screenPlayerVisible.value = visible;
  });
});

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
      console.log('initVideos', videoAreaRef.value);
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

const putVideoToRightArea = () => {
  console.log('putVideoToRightArea', TCIC.SDK.instance.getComponent('teacher-component'));
  rightAreaRef.value?.appendChild(TCIC.SDK.instance.getComponent('teacher-component'));
  studentVideos.value.forEach((info) => {
    console.log('putVideoToRightArea', info);
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
        rightAreaRef.value?.appendChild(studentDom);
      }
    });
  });
}

watch(
  [teacherVideo, studentVideos],
  ([teacherVideo, studentVideos]) => {
    if (screenPlayerVisible.value) {
      putVideoToRightArea();
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
    putVideoToRightArea();
  } else {
    initVideos({ teacherVideo: teacherVideo.value, studentVideos: studentVideos.value });
  }
});
</script>

<style lang="less">
.layout-custom-landscape{
  width: 100%;
  height: 100%;
  display: flex;
  &.screen-share{
    .left-area{
      width: calc(100% - 120px);
    }
    .right-area{
      width: 120px;
    }
  }
  .right-area {
    --video-width: 110px;
    --video-height: 70px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: center;
    overflow-y: auto;
    gap: 2px;
    teacher-component{
      order: 1;
    }
    student-component{
      order: 2;
    }
  }
  .left-area{
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    .video-area{
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2px;
      teacher-component{
        order: 1;
      }
      student-component{
        order: 2;
      }
    }
  }
  
}
</style>
