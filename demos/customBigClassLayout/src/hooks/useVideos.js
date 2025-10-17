import { ref, useAttrs, watch } from 'vue';
export const useVideos = () => {
  const attrs = useAttrs();
  const videos = JSON.parse(attrs.videos);
  const teacherVideo = ref(videos.teacherVideo || null);
  const studentVideos = ref(videos.studentVideos || []);

  watch(() => attrs.videos, (newVideos) => {
    const videos = JSON.parse(newVideos);
    teacherVideo.value = videos.teacherVideo;
    studentVideos.value = videos.studentVideos;
  });

  TCIC.SDK.instance.on(TCIC.TMainEvent.AV_Add, (info) => {
    const classInfo = TCIC.SDK.instance.getClassInfo();
    if (classInfo.teacherId === info.userId) {   // 添加老师的组件
      TCIC.SDK.instance.loadComponent('teacher-component', {
        left: '0',
        top: '0',
        display: 'block',
        position: 'relative',
      })
        .then(() => {
          teacherVideo.value = info;
        });
    } else {
      TCIC.SDK.instance.loadComponent('student-component', {
        left: '0',
        top: '0',
        display: 'block',
        position: 'relative',
      }, null, info.userId)
        .then((ele) => {
          if (ele) {
            studentVideos.value.push(info);
          }
        });
  }
  });
  TCIC.SDK.instance.on(TCIC.TMainEvent.AV_Remove, (info) => {
    const classInfo = TCIC.SDK.instance.getClassInfo();
    if (info.userId === TCIC.SDK.instance.getUserId()) {
      window.showToast(i18next.t('你已下台，暂时无法参与音视频互动~'));
    }
    if (classInfo.teacherId === info.userId) {   // 添加老师的组件
      const teacherDom = TCIC.SDK.instance.getComponent('teacher-component');
      if (teacherDom) {
        TCIC.SDK.instance.removeComponent('teacher-component');
        teacherVideo.value = null;
      }
    } else {
      const studentDom = TCIC.SDK.instance.getComponent('student-component', info.userId);
      if (studentDom) {
        const idx = studentVideos.value.findIndex(student => student.userId === info.userId);
        TCIC.SDK.instance.removeComponent('student-component', info.userId);
        studentVideos.value.splice(idx, 1);
      }
    }
  });

  return {
    teacherVideo,
    studentVideos,
  }
};