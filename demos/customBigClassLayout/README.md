### 自定义移动端大班课布局

本 demo 展示了如何通过自定义元素自定义大班课布局，在课堂URL下拼接`&debugjs=http://localhost:3000/custom.js`即可

### 内置场景
大班课移动端竖屏内置两种布局, boardTopLayout, videoTopLayout, 通过以下代码切换布局

```
TCIC.SDK.instance.setState('TStateBigClassLayout', { mobile: 'boardTopLayout' }); // videoTopLayout | boardTopLayout
```
