TCIC.SDK.instance
  .promiseState(TCIC.TMainState.School_Info_Ready, true)
  .then(() => {
    console.log("[customJS] initNameConfig");
    /**
     * 配置关键文案
     */
    TCIC.SDK.instance.initNameConfig({
      zh: {
        teacher: "主持人",
        assistant: "联席主持人",
        supervisor: "巡会",
        student: "参会人",
        visitor: "访客",
        defaultAppName: "低代码互动会议",
        room: "会议",
        publicRoom: "公开会议",
        roomID: "会议号",
        roomName: "会议名",
        startRoom: "开会",
        endRoom: "结束会议",
        enterRoom: "进入会议",
        leaveRoom: "离开会议",
        courseware: "方案",
        memberList: "成员列表",
      },
    });
  });