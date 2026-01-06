<template>
  <div class="big-class-custom">
    <div class="class-left-area">
      <div
        ref="boardAreaRef"
        class="board-area"
      >
        <BoardWrap />
      </div>
      <div
        class="video-area"
      >
        <div
          ref="videoAreaRef"
          class="video-area-inner"
        />
      </div>
    </div>
    <div
      ref="footerAreaRef"
      class="footer-area"
    />
    <div
      ref="imAreaRef"
      class="im-area"
    />
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick, watchEffect } from 'vue';
import { useVideos } from './hooks/useVideos';
import BoardWrap from './components/BoardWrap.vue';
import { useResizeObserver } from '@vueuse/core';

console.log('setup:VideoDoc');

const videoAreaRef = ref();
const footerAreaRef = ref();
const boardAreaRef = ref();
const imAreaRef = ref();
const { teacherVideo, studentVideos } = useVideos();


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
        footerAreaRef.value.appendChild(ele);
        const footerVue = TCIC.SDK.instance.getComponent('footer-component').getVueInstance();
        footerVue.disableQuickIM = true;
      })
      .catch((err) => {
        console.log('initLayout', err);
      });
      TCIC.SDK.instance.updateComponent('introduction-discuss-component', {
        display: 'block',
      }).then((el) => {
        imAreaRef.value.appendChild(TCIC.SDK.instance.getComponent('introduction-discuss-component'));
      });
      const clientRect = boardAreaRef.value.getBoundingClientRect();
      TCIC.SDK.instance.updateComponent('board-tool-component', {
        width: '40px',
        left: `${clientRect.width - 50}px`,
        top: '80px',
      }).then((el) => {
        boardAreaRef.value.appendChild(TCIC.SDK.instance.getComponent('board-tool-component'));
      });
  });
  initVideos({ teacherVideo, studentVideos });
});

const initVideos = ({ teacherVideo, studentVideos }) => {
  console.warn('bigClass-video-sync::initVideos', teacherVideo, studentVideos);
  const promiseArr = [];
  if (teacherVideo.value) {
    promiseArr.push(TCIC.SDK.instance.updateComponent('teacher-component', {
      left: '0',
      top: '0',
      width: '160px',
      height: '90px',
      display: 'block',
      position: 'relative',
    }).then(() => {
      const ele = TCIC.SDK.instance.getComponent('teacher-component');
      if (ele) {
        videoAreaRef.value?.appendChild(ele);
      }
    }));
  }
  studentVideos.value?.forEach((info) => {
    promiseArr.push(TCIC.SDK.instance.updateComponent('student-component', {
      left: '0',
      top: '0',
      width: '160px',
      height: '90px',
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

watchEffect(() => {
  console.log('setup:', teacherVideo, studentVideos);
  initVideos({
    teacherVideo,
    studentVideos,
  });
});

useResizeObserver(boardAreaRef, (entries) => {
    const clientRect = entries[0].target.getBoundingClientRect();
    TCIC.SDK.instance.updateComponent('board-tool-component', {
      width: '40px',
      left: `${clientRect.width - 50}px`,
    })
})

</script>

<style lang="less">
.big-class-custom{
  height: 100%;
  display: flex;
  position: relative;
  gap: 10px;
  .class-left-area{
    width: calc(100% - 300px);
    
    height: 100%;
    position: relative;
    display: flex;
    >.board-area{
      height: 100%;
      width: calc(100% - 160px);
      position: relative;
    }
    .video-area {
      width: 160px;
      height: 100%;
      z-index: 10;
      top: 0;
      right: 0;
      position: absolute;
      display: flex;
      align-items: center;
      .video-area-inner{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        background: var(--primary-color);
        student-component {
        order: 2;
        }
        teacher-component {
          order: 1;
        }
      }

    }
  }
  .im-area{
    flex: 1;
    position: relative;
  }
  .board-footer {
    height: 40px;
    position: relative;
    .quick-im-component{
      display: none;
    }
    .footer-component.small-screen.is-none {
      display: flex !important;
    }
  }
  .footer-area {
    height: 40px;
    display: none;
    position: relative;
  }
}
</style>
