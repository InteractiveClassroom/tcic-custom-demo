### 自定义桌面端音视频+白板小班课布局

本 demo 展示了如何通过自定义元素自定义小班课白板区域布局，在课堂URL下拼接`&debugjs=http://localhost:3000/custom.js`即可

本 demo 提供两种模式, 均为隐藏默认的白板区域, 并:

- 中间区域展示一个视频流, 直播播放 (StreamInBoardArea.vue). 请在 StreamInBoardArea 中配置直播流地址
  <img width="2880" height="1798" alt="Clipboard_Screenshot_1764572051" src="https://github.com/user-attachments/assets/e7e39bf8-3987-4f7a-bdc4-9b5a3ccd1972" />

- 将老师的视频流挪到课堂中间, 让老师的音视频占据更大的位置 (TeacherInBoardArea.vue)

以上模式通过修改 App.ce.vue 中的 useStreamInBoardArea 值来修改.
