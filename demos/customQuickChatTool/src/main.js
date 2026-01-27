import { defineCustomElement } from 'vue';
import QuickImTool from './App.ce.vue';

const CustomQuickImTool = defineCustomElement(QuickImTool);
customElements.define('custom-quick-im-tool', CustomQuickImTool);


TCICCustomUI.hooks(TCICCustomUI.THookType.Quick_Im_Component_BeforeMount).tap((event) => {
  console.log('Board tool before mount', event);
  const customTools = event.payload;
  customTools.push({
    name: 'custom-quick-im-tool',
  });
})