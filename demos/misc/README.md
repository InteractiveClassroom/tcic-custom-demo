# 其他一些简单例子

- 过滤进出房间消息 [filterMsg](./src/filterMsg.js)
- 替换关键文案 [initNameConfig](./src/initNameConfig.js)


### 监听字幕消息
我们可以通过以下方法，接收字幕消息并进行处理
  > 注意: 在监听字幕消息之前，需要确保创建课堂时开启了字幕转录的功能
```js
TCIC.SDK.instance.on(TCIC.TMainEvent.Recv_Custom_IM_Msg, (res) => console.log('customMsg', JSON.parse(res.data).payload));
```
