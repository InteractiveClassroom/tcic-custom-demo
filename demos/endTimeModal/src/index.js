TCIC.SDK.instance
  .promiseState(TCIC.TMainState.Class_Status, TCIC.TClassStatus.Already_Start)
  .then(() => {
    const classInfo = TCIC.SDK.instance.getClassInfo();
    const { endTime, startTime } = classInfo;
    const now = Date.now();
    // 提前 5 分钟弹窗
    /**
     * note: 你也可以通过订阅 TCIC.TMainState.Class_Duration 来获取课程进行时间，做些定制化处理
     * TCIC.SDK.instance.subscribeState(TCIC.TMainState.Class_Duration, console.warn)
     */
    const timeToAlert = (endTime - 5 * 60) * 1000;
    if (TCIC.SDK.instance.isTeacher() && now <= timeToAlert) {
      setTimeout(() => {
        TCIC.SDK.instance.showMessageBox('温馨提示', '本堂课将于 5 分钟后结束，请老师合理安排时间', ['确定'] , () => console.log('弹窗关闭'));
      }, timeToAlert - now);
    } else {
      TCIC.SDK.instance.showMessageBox('温馨提示', '本堂课即将结束，请老师合理安排时间', ['确定'] , () => console.log('弹窗关闭'));
    }
  });
