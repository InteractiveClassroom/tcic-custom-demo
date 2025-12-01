<template>
  <div
    class="layout-custom-landscape"
  >
    <div
      ref="containerRef"
      class="main-area"
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
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useVideos } from './hooks/useVideos';
import { useVideoWall } from './hooks/useVideoWall';
const { teacherVideo, studentVideos } = useVideos();
const videoAreaRef = ref(null);
const videoCountRef = ref(1);
const containerRef = ref(null);

const { videoSize, videoWallSize } = useVideoWall(containerRef, videoCountRef);

onMounted(() => {
  initVideos({ teacherVideo: teacherVideo.value, studentVideos: studentVideos.value });
  videoCountRef.value = studentVideos.value.length + 1;
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
  // studentVideos?.forEach((info) => {
  //   promiseArr.push(TCIC.SDK.instance.loadComponent('student-component', {
  //     left: '0',
  //     top: '0',
  //     width: 'var(--video-width)',
  //     height: 'var(--video-height)',
  //     display: 'block',
  //     position: 'relative',
  //   }, null, info.userId).then(() => {
  //     const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
  //     if (studentDom) {
  //       videoAreaRef.value?.appendChild(studentDom);
  //     }
  //   }));
  // });
  return Promise.all(promiseArr);
};

watch(
  [teacherVideo, studentVideos],
  ([teacherVideo, studentVideos]) => {
    initVideos({ teacherVideo, studentVideos });
    videoCountRef.value = studentVideos.length + 1;
  },
  {
    deep: true,
  },
);
</script>

<style lang="less">
.layout-custom-landscape{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main-area{
    width: 100%;
    flex: 1;
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
      align-content: center;
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
