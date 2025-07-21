import { defineCustomElement } from 'vue';
import CustomTab from './App.ce.vue';
import CustomCoursePanel from './CustomCoursePanel.ce.vue';
import CustomTool from './CustomTool.ce.vue';

const CustomTabElement = defineCustomElement(CustomTab);  
customElements.define('custom-courseware-tab', CustomTabElement);

const CustomCoursePanelElement = defineCustomElement(CustomCoursePanel);
customElements.define('custom-courseware-panel', CustomCoursePanelElement);

const CustomToolElement = defineCustomElement(CustomTool);
customElements.define('custom-tools', CustomToolElement);

TCIC.SDK.instance.promiseState('TStateComponentLoaded', true).then(() => {
  console.log('document component', 'setState');
  TCIC.SDK.instance.setState('TStateDocCustom', {customCoursePanel: {
    element: 'custom-courseware-panel', // 完全自定义课件区域 custom element
  }});

  // 自定义课件 tab，如果完全自定义课件面板，自定义 tab 无效
  // TCIC.SDK.instance.setState('TStateDocCustom', {customTab: {
  //   element: 'custom-courseware-tab', // 点击 tab时要展示的 custom element
  //   name: '其他课件' // tab title name
  // }});
});

TCICCustomUI.hooks(TCICCustomUI.THookType.Menus_BeforeMount).tap((event) => {
  console.log('Menus_BeforeMount', event);
  const menus = event.payload;
  const tools = menus.find(menu => menu.name === 'tool-box');
  if (tools) {
    tools.children.push({
      name: 'custom-tools',
      active: false,
      enable: true,
      hiddenWhenMoreBtnShow: false,
      isSub: true,
    });
  }
});
