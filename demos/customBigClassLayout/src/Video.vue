<template>
  <div class="big-class-portrait-video">
    <div class="class-header">
      <AutoPlayFailedMask style="width: 100%; height: 100%;">
        <div
          ref="videoAreaRef"
          class="video-area"
          :style="{
            '--video-width': videoSize.videoWidth + 'px',
            '--video-height': videoSize.videoHeight + 'px',
          }"
        />
      </AutoPlayFailedMask>
    </div>
    <div
      class="im-area"
    >
      <PortraitIMWrap />
    </div>
  </div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import PortraitIMWrap from './components/PortraitIMWrap.vue';
import { useVideoSize } from './hooks/useVideoSize';
import { useVideos } from './hooks/useVideos';
import AutoPlayFailedMask from './components/autoplay-failed-mask/autoplay-failed-mask.vue';


const videoAreaRef = ref();
const { teacherVideo, studentVideos } = useVideos();
const videoCountRef = ref(studentVideos.value.length + 1);
const videoSize = useVideoSize(videoAreaRef, videoCountRef);


onMounted(() => {
  nextTick(() => {
    TCIC.SDK.instance.loadComponent('footer-component', {
      left: '0',
      top: '0',
      zIndex: 11,
      width: '100%',
      height: '40px',
      display: 'block',
    })
      .then((ele) => {
        // footerAreaRef.value.appendChild(ele);
        const footerVue = TCIC.SDK.instance.getComponent('footer-component').getVueInstance();
        footerVue.disableQuickIM = true;
      })
      .catch((err) => {
        console.error('initLayout err', err);
      });
    initVideos({ teacherVideo: teacherVideo.value, studentVideos: studentVideos.value });
    const screenPlayerComponent = TCIC.SDK.instance.getComponent('screen-player-component');
    videoAreaRef.value.appendChild(screenPlayerComponent);
    // 不展示气泡消息
    // TCIC.SDK.instance.getComponent('quickmsg-show-component').getVueInstance().quickMsgVisible = false;
      TCIC.SDK.instance.updateComponent('quickmsg-show-component', {
        display: 'none',
      });
    });
});

const initVideos = ({ teacherVideo, studentVideos }) => {
  const promiseArr = [];
  if (teacherVideo) {
    promiseArr.push(TCIC.SDK.instance.updateComponent('teacher-component', {
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
  }
  studentVideos?.forEach((info) => {
    promiseArr.push(TCIC.SDK.instance.updateComponent('student-component', {
      left: '0',
      top: '0',
      width: 'var(--video-width)',
      height: 'var(--video-height)',
      display: 'block',
      position: 'relative',
    }, info.userId).then(() => {
      const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
      if (studentDom) {
        videoAreaRef.value?.appendChild(studentDom);
      }
    }));
  });
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
.big-class-portrait-video{
  height: 100%;
  display: flex;
  flex-direction: column;
  .portrait-im-component{
    background-color: transparent!important;
  }
  .class-header{
    height: calc(100vw * 9 / 16);
    .video-area {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      student-component {
        order: 2;
      }
      teacher-component {
        order: 1;
      }
    }
  }
  .im-area{
    flex: 1;
    padding-top: 10px;
    position: relative;
  }
}
</style>
