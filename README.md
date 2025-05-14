### 低代码课堂自定义 DEMO


- [学生白板权限控制](./demos/whiteBoardAuth)
- [自定义定时器铃声](./demos/whiteBoardAuth)
- [下课前 5 分钟弹窗提醒](./demos/endTimeModal)
- [小程序 webview 返回上一页](./demos/mp-navback)
- [自定义签到组件](./demos/checkInTool)
- [其他一些简单例子](./demos/misc)


### 本地调试

```
pnpm i

cd ./demos/{DEMO_NAME}

pnpm dev

```
进入课堂后，在上课地址 query 后面添加`&debugjs=http://localhost:3000/custom.js`，如果有 css，再拼接`&debugcss=http://localhost:3000/custom.css`，即
`&debugjs=http://localhost:3000/custom.js&debugcss=http://localhost:3000/custom.css`，课堂页面将会加载自定义的 js 和 css，从而可以进行自定义调试。

### 生产部署

在本地调试完成后，通过`npm run build`打包出js 和 css 文件，通过[自定义场景配置](https://cloud.tencent.com/document/product/1639/90204)上传打包的js 和 css 文件，即可在课堂中生效。