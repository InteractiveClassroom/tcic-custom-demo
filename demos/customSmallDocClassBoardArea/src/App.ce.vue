<template>
  <StreamInBoardArea v-if="useStreamInBoardArea"/>
  <TeacherInBoardArea v-else/>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
// 桌面端组件
import TeacherInBoardArea from './TeacherInBoardArea.vue';
import StreamInBoardArea from './StreamInBoardArea.vue';

const useStreamInBoardArea = ref(true);

// 展示气泡消息
onMounted(() => {
  nextTick(() => {
    TCIC.SDK.instance.updateComponent('quickmsg-show-component', {
      display: 'block',
      height: `calc(100% - ${isPortrait.value ? 90 : 40}px - env(safe-area-inset-bottom))`,
    });
  });
});

// 处理用户退出
const handleAVRemove = (info) => {
  const classInfo = TCIC.SDK.instance.getClassInfo();
  if (info.userId === TCIC.SDK.instance.getUserId()) {
    window.showToast(i18next.t('你已下台，暂时无法参与音视频互动~'));
  }
  console.log('handleAVRemove', info);
  if (classInfo.teacherId === info.userId) {
    const teacherDom = TCIC.SDK.instance.getComponent('teacher-component');
    if (teacherDom) {
      // 小班课老师离开时不移除节点
      // TCIC.SDK.instance.removeComponent('teacher-component');
    }
  } else {
    const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
    if (studentDom) {
      TCIC.SDK.instance.removeComponent('student-component', info.userId);

      setTimeout(() => {
        const screenPlayerComponent = TCIC.SDK.instance.getComponent('screen-player-component');
        if (screenPlayerComponent && !TCIC.SDK.instance.isWeb()) {
          screenPlayerComponent.getVueInstance().onResize();
        }
      }, 100);
    }
  }
};
TCIC.SDK.instance.on(TCIC.TMainEvent.AV_Remove, handleAVRemove);


onBeforeUnmount(() => {
  TCIC.SDK.instance.off(TCIC.TMainEvent.AV_Remove, handleAVRemove);
});
</script>

<style>
</style>
