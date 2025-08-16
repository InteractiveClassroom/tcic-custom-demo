<template>
  <SmallClassPortrait v-if="isPortrait" />
  <SmallClassLandScape v-else />
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
// 竖屏
import SmallClassPortrait from './SmallClassPortrait.vue';
// 横屏
import SmallClassLandScape from './SmallClassLandscape.vue';
const isPortrait = ref(TCIC.SDK.instance.isPortrait());
watch(isPortrait, (newVal) => {
  console.log('isPortrait change', newVal);
  nextTick(() => {
    const board = TCIC.SDK.instance.getBoard();
    board?.refresh();
  });
});
TCIC.SDK.instance.subscribeState(TCIC.TMainState.Device_Orientation, (orientation) => {
  console.log('orientation change', orientation);
  isPortrait.value = orientation === TCIC.TDeviceOrientation.Portrait;
  const screenPlayerComponent = TCIC.SDK.instance.getComponent('screen-player-component');
  if (screenPlayerComponent?.getVueInstance().isScreenShareOpen) {
    TCIC.SDK.instance.reportLog('setSubStreamEncoderParam', {
      resMode: orientation,
      layout: 'bigClass',
    });
    TCIC.SDK.instance.setSubStreamEncoderParam({
      resMode: orientation,
    });
  }
});
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