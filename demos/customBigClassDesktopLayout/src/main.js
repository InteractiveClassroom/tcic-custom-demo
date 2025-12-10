import BigClassCustomLayout from './App.ce.vue';
import { defineCustomElement } from 'vue';
const MyVueElement = defineCustomElement(BigClassCustomLayout, { shadowRoot: false });
customElements.define('bigclass-custom-layout', MyVueElement);
console.log('setup:自定义布局', customElements.get('bigclass-custom-layout'));
TCIC.SDK.instance.setState('TStateBigClassLayout', { desktop: 'custom-all', customLayoutName: 'bigclass-custom-layout' });


app.config.errorHandler = (err, instance, info) => {
  // 处理错误，例如：报告给一个服务
  console.error('Custom:setup:Error:', instance, err, info);
}