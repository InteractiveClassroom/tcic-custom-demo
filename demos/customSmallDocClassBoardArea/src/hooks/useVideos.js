import { ref } from 'vue';

const { BehaviorSubject } = TCIC.RXJS;
const $teacherVideo = new BehaviorSubject(null);
const $studentVideos = new BehaviorSubject([]);

// 处理学生视频的添加和删除
TCIC.SDK.instance.on(TCIC.TMainEvent.AV_Add, (info) => {
  if (TCIC.SDK.instance.getClassInfo().teacherId === info.userId) {
    // 如果是老师，直接更新老师视频
    $teacherVideo.next(info);
  } else {
    // 如果是学生，添加到学生视频数组
    const currentVideos = $studentVideos.getValue();
    // 检查是否已存在该学生视频
    const existingIndex = currentVideos.findIndex(video => video.userId === info.userId);
    if (existingIndex === -1) {
      // 如果不存在，添加到数组
      $studentVideos.next([...currentVideos, info]);
    } else {
      // 如果已存在，更新该学生视频
      // 学生信息更新不会走这个事件，但是加上这个判断也没啥影响
      const updatedVideos = [...currentVideos];
      updatedVideos[existingIndex] = info;
      $studentVideos.next(updatedVideos);
    }
  }
});

TCIC.SDK.instance.on(TCIC.TMainEvent.AV_Remove, (info) => {
  if (TCIC.SDK.instance.getClassInfo().teacherId === info.userId) {
    // 如果是老师，设置老师视频为null
    $teacherVideo.next(null);
  } else {
    // 如果是学生，从学生视频数组中移除
    const currentVideos = $studentVideos.getValue();
    const updatedVideos = currentVideos.filter(video => video.userId !== info.userId);
    $studentVideos.next(updatedVideos);
  }
});

const useVideos = () => {
  const teacherVideo = ref();
  const studentVideos = ref([]);
  $teacherVideo.subscribe((value) => {
    teacherVideo.value = value;
  });
  $studentVideos.subscribe((value) => {
    studentVideos.value = value;
  });
  return {
    teacherVideo,
    studentVideos,
  };
};

// 导出视频状态
export {
  $teacherVideo,
  $studentVideos,
  useVideos,
};
