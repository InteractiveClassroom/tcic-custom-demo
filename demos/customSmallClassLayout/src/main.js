import { defineCustomElement } from 'vue';
import SmallClassCustomLayout from './App.ce.vue';
const MyVueElement = defineCustomElement(SmallClassCustomLayout, { shadowRoot: false });
customElements.define('small-custom-layout', MyVueElement);

TCICCustomUI.hooks(TCICCustomUI.THookType.Layout_BeforeInit).tap(() => {
  // 学生数大于 1 的纯视频小班课走自定义布局
  console.log('自定义布局', TCIC.SDK.instance.getClassInfo());
  TCIC.SDK.instance.setState('TStateSmallClassLayout', { mobile: 'custom-all', customLayoutName: 'small-custom-layout' });
});
 