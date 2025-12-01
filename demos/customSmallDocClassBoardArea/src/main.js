import { defineCustomElement } from 'vue';
import SmallClassCustomLayout from './App.ce.vue';
import CustomMenu from './CustomMenu.ce.vue';

const MyVueElement = defineCustomElement(SmallClassCustomLayout, { shadowRoot: false });
customElements.define('small-custom-layout', MyVueElement);

const MyMenuElement = defineCustomElement(CustomMenu, { shadowRoot: false });
customElements.define('custom-menu', MyMenuElement);
TCICCustomUI.hooks(TCICCustomUI.THookType.Layout_BeforeInit).tap(() => {
  console.log('自定义布局', TCIC.SDK.instance.getClassInfo());
    TCIC.SDK.instance.setState('TStateSmallClassLayout', { desktop: 'small-doc-class-custom-board-area', customLayoutName: 'small-custom-layout' });
});
 