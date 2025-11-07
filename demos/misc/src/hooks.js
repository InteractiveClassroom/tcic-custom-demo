
// 自定义虚拟背景
TCICCustomUI.hooks(TCICCustomUI.THookType.Virtual_Background_BeforeMount).tap(event => {
  console.log('Virtual_Background_BeforeMount', event.payload);
  event.payload.push(
      {
        name: i18next.t('教室'),
        sceneKey: '阅览室',
        url: 'http://localhost:8080/static/assets/readingroom.png',
      })
  });

// 拦截消息
TCICCustomUI.hooks(TCICCustomUI.THookType.Message_BeforeSend).tap(event => {
  console.log('Message_BeforeSend', event.payload);
  event.cancel();
  window.showToast('消息发送被拦截');
});

// 修改右侧宽度
TCICCustomUI.hooks(TCICCustomUI.THookType.Layout_BeforeRender).tap(event => {
  console.log('Layout_BeforeRender', event.payload);
  event.payload.VerticalVideoWrapWidth = 400;
  if (event.payload.RightSideWidthDefault) {
    event.payload.RightSideWidthDefault = 400;
  }
  if (TCIC.SDK.instance.isMobile() && event.payload.MobileRightSideWidthDefault) {
    event.payload.MobileRightSideWidthDefault = 240;
  }
});