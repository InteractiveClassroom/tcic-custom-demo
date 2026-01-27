import { defineCustomElement } from 'vue';
import CaptureTool from './App.ce.vue';

const CustomCaptureTool = defineCustomElement(CaptureTool)
customElements.define('custom-capture-tool', CustomCaptureTool);

TCICCustomUI.hooks(TCICCustomUI.THookType.Board_Tool_BeforeMount).tap((event) => {
  console.log('Board tool before mount', event);
  const customTools = event.payload;
  customTools.push({
    name: 'custom-capture-tool',
  });
})