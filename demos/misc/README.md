# 其他一些简单例子

- 过滤进出房间消息 [filterMsg](./src/filterMsg.js)
- 替换关键文案 [initNameConfig](./src/initNameConfig.js)


### 监听字幕消息
我们可以通过以下方法，接收字幕消息并进行处理
  > 注意: 在监听字幕消息之前，需要确保创建课堂时开启了字幕转录的功能
```js
TCIC.SDK.instance.on(TCIC.TMainEvent.Recv_Custom_IM_Msg, (res) => {
  if (msg.from.indexOf('ai_transcription_') !== -1) {
    console.log('customMsg',
      JSON.parse(res.data).payload // 解析出消息体
    );
  }
});
```
关于消息体的结构请参考： https://cloud.tencent.com/document/product/647/112475#6063c6fd-7c2c-40ca-ba2b-e773bb2926ca

### 替换页面文字
```js
TCIC.SDK.instance
.promiseState(TCIC.TMainState.School_Info_Ready, true)
.then(() => {
  // 三个参数分别是目标语言，i18n的 key, 替换为的文本
  TCICCustomUI.i18n.set('zh', '屏幕共享', '屏幕分享');
  TCICCustomUI.i18n.set('zh', '消息', '聊天');
});
```

### 修改学生快捷回复列表
```js
TCIC.SDK.instance.setQuickIMWords(['哈哈哈', 'Hello', '你好']);
```
