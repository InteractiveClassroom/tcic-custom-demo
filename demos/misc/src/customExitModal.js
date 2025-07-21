/**
 * 修改离开课堂的提示框内容和按钮
 */
const getServerTime = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now());
    }, 1000);
  });
};
TCIC.SDK.instance
  .promiseState(TCIC.TMainState.School_Info_Ready, true)
  .then(() => {
    console.warn("[customJS] initNameConfig", TCIC.SDK.instance.isAssistant());
    if (TCIC.SDK.instance.getParams('role') === 'assistant') {
      TCIC.SDK.instance.initNameConfig({
        zh: {
          "endRoom": "离开", // 下课改成离开
        },
      });
    }
  });

// TCIC.SDK.instance
// .promiseState(TCIC.TMainState.School_Info_Ready, true)
// .then(() => {
//   TCICCustomUI.i18n.set('zh-TW', '屏幕共享', '螢幕分享')
//   TCICCustomUI.i18n.set('zh-TW', '布局', '排版')
//   TCICCustomUI.i18n.set('zh-TW', '消息', '聊天')
//   TCICCustomUI.i18n.set('zh-TW', '设置', '設定')
// });

TCICCustomUI.hooks(TCICCustomUI.THookType.MsgBox_LeaveClass_BeforeShow).tap((event) => {
  if (TCIC.SDK.instance.isAssistant()) {
    event.payload.title = '温馨提示';
    // 修改弹窗内容
    event.payload.message = '助教，您确定要离开课堂吗？';
    // 不展示下课按钮
    event.payload.buttons.shift();
  }
});

// TCICCustomUI.hooks(TCICCustomUI.THookType.MsgBox_LeaveClass_BeforeShow).tap(async (event) => {
//   try {
//     console.log('beforeLeaveClass async', event);
//     const serverTime = await getServerTime();
//     console.log('serverTime', serverTime);
//     if (TCIC.SDK.instance.isTeacher()) {
//       // 修改弹窗标题
//       event.payload.title = '温馨提示';
//       // 修改弹窗内容
//       event.payload.message = '老师，您确定要离开课堂吗？';
//       // 不展示下课按钮
//       event.payload.buttons.shift();
//     } else if (TCIC.SDK.instance.isStudent()) {
//       // 取消弹窗逻辑
//       event.cancel();
//       window.showToast('您不能离开');
//     }
//   } catch (error) {
//     console.error('Error in beforeLeaveClass async', error);
//   }
// });