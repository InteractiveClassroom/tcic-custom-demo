import BigClassCustomLayout from './App.ce.vue';
import { defineCustomElement } from 'vue';
const MyVueElement = defineCustomElement(BigClassCustomLayout, { shadowRoot: false });
customElements.define('bigclass-custom-layout', MyVueElement);
TCIC.SDK.instance.promiseState('TStateDeviceDetect', false).then(() => {
    TCIC.SDK.instance.setState(TCIC.TMainState.Join_Quit_Tips, false);
});

TCIC.SDK.instance.setState('TStateBigClassLayout', { desktop: 'custom-all', customLayoutName: 'bigclass-custom-layout' });


app.config.errorHandler = (err, instance, info) => {
  // 处理错误，例如：报告给一个服务
  console.error('Custom:setup:Error:', instance, err, info);
}