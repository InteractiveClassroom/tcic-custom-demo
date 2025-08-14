<template>
  <div class="big-class-portrait-custom">
    <div class="class-header">
      <AutoPlayFailedMask style="width: 100%; height: 100%;">
        <div
          class="board-area"
          :style="{width: videoShow ? 'calc(100% - 115px)' : '100%'}"
        >
          <BoardWrap />
        </div>
        <div
          class="video-area"
          :style="{transform: videoShow ? 'translateX(0)' : 'translateX(115px)'}"
        >
          <div
            class="video-toggle"
            @click="toggleShow"
          >
            <i :class="videoShow ? 'close' : ''" />
          </div>
          <div
            ref="videoAreaRef"
            class="video-area-inner"
          />
        </div>
      </AutoPlayFailedMask>
    </div>
    <div
      ref="footerAreaRef"
      class="footer-area"
    />
    <div class="tabs">
      <div
        class="tab"
        :class="{active: tabIndex === 0}"
        @click="tabIndex = 0"
      >
        聊天
      </div>
      <div
        class="tab"
        :class="{active: tabIndex === 1}"
        @click="tabIndex = 1"
      >
        直播介绍
      </div>
    </div>
    <div
      v-show="tabIndex === 0"
      class="im-area"
    >
      <PortraitIMWrap />
    </div>
    <div
      v-show="tabIndex === 1"
      class="live-info"
    >
      直播介绍内容
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick, watchEffect } from 'vue';
import BoardWrap from './components/BoardWrap.vue';
import PortraitIMWrap from './components/PortraitIMWrap.vue';
import { useVideos } from './hooks/useVideos';
import AutoPlayFailedMask from './components/autoplay-failed-mask/autoplay-failed-mask.vue';


const videoAreaRef = ref();
const footerAreaRef = ref();
const tabIndex = ref(0);
const { teacherVideo, studentVideos } = useVideos();

// video 是否默认展示
const videoShow = ref(true);

const toggleShow = () => {
  videoShow.value = !videoShow.value;
};

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
      width: '115px',
      height: '80px',
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
      width: '115px',
      height: '80px',
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
    initVideos({
      teacherVideo,
      studentVideos,
    });
  }
);

</script>

<style lang="less">
.big-class-portrait-custom{
  height: 100%;
  display: flex;
  flex-direction: column;
  .portrait-im-component{
    background-color: transparent!important;
  }
  .tabs{
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
    .tab{
      color: #fff;
      padding: 0 20px;
      &.active{
        border-bottom: 2px solid #006eff;
      }
    }
  }
  .live-info{
    color: #fff;
    padding: 10px 20px;
  }
  .class-header{
    height: calc(100vw * 9 / 16);
    .board-area{
      width: 100%;
      height: 100%;
      position: relative;
    }
    .video-area {
      width: 130px;
      height: calc(100vw * 9 / 16);
      z-index: 10;
      top: 0;
      right: 0;
      position: absolute;
      display: flex;
      align-items: center;
      .video-toggle{
        height: 40px;
        width: 15px;
        background: #222329;
        border-radius: 2px 0 0 2px;
        i{
          background-repeat: no-repeat;
          background-image: url(./assets/icon-right.svg);
          background-position: center;
          margin-top: 12.5px;
          transform: rotate(180deg);
          transition: transform .3s;
          width: 15px;
          height: 15px;
          display: block;
          &.close{
            transform: rotate(0);
          }
        }
      }
      .video-area-inner{
        display: flex;
        flex-direction: column;
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
    display: block;
    position: relative;
  }
}
</style>
