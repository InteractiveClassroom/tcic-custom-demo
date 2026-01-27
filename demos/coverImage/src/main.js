import CoverImage from './App.ce.vue';
import { defineCustomElement } from 'vue';

const CoverImageElement = defineCustomElement(CoverImage)
customElements.define('custom-cover-image', CoverImageElement);

TCIC.SDK.instance.setFeatureAvailable('WhiteBoard.CoverImage', true);


// 白板区域宽高算法

// const calcWhiteBoard = () => {
//   const parentDiv = document.getElementById('white-board-parent');
//   const parentWidth = parentDiv.clientWidth;
//   const parentHeight = parentDiv.clientHeight;
//   console.log(`===>>> Board : ${parentWidth} : ${parentHeight}`);
//   if (parentWidth === 0 || parentHeight === 0) {
//     return;
//   }

//   let boardWidth = 0;
//   let boardHeight = 0;
//   if (parentWidth * 9 / 16 > parentHeight) {
//     boardWidth = parentHeight * 16 / 9;
//     boardHeight = parentHeight;
//   } else {
//     boardWidth = parentWidth;
//     boardHeight = boardWidth * 9 / 16;
//   }
// }


TCICCustomUI.hooks(TCICCustomUI.THookType.Cover_Image_BeforeMount).tap((event) => {
  event.payload = {
    name: 'custom-cover-image',
  };
})