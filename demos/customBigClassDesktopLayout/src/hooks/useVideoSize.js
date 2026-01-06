import { nextTick, onMounted, ref, watch } from 'vue';
import { useElementSize, useResizeObserver } from '@vueuse/core';

export const useVideoSize = (containerRef, videoCountRef, {
  resizeable = false,
} = {}) => {
    const videoSize = ref({ videoWidth: 0, videoHeight: 0 });
    const updateVideoSize = () => {
      nextTick(() => {
        const { width: containerWidth, height: containerHeight } = useElementSize(containerRef);
        console.debug('containerWidth', containerWidth.value, 'containerHeight', containerHeight.value, videoCountRef.value);
        if (videoCountRef.value <= 1) {
          const shouldFullHeight = containerWidth.value / containerHeight.value >= 16 / 9;
          // 撑满高度
          videoSize.value = shouldFullHeight ? {
            videoWidth: (containerHeight.value) * 16 / 9,
            videoHeight: containerHeight.value,
          } : {
            videoWidth: containerWidth.value,
            videoHeight: containerWidth.value * 9 / 16,
          };
        } else {
          // 撑满宽度
          const videoWidth = containerWidth.value / videoCountRef.value;
          const videoHeight = videoWidth * 9 / 16;
          videoSize.value = {
            videoWidth,
            videoHeight,
          };
        }
      });
    };
    onMounted(() => {
      // fix 获取 container 宽高为 0 的问题
      updateVideoSize();
    });
    watch(videoCountRef, updateVideoSize);
    if (resizeable) {
      useResizeObserver(containerRef, updateVideoSize);
    }
    return videoSize;
};

