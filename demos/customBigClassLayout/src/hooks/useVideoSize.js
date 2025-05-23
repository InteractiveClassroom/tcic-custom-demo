import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { useElementSize } from '@vueuse/core';

export const useVideoSize = (containerRef, videoCountRef) => {
    const videoSize = ref({ videoWidth: 0, videoHeight: 0 });
    const updateVideoSize = () => {
      nextTick(() => {
        const { width: containerWidth, height: containerHeight } = useElementSize(containerRef);
        if (videoCountRef.value <= 1) {
          // 撑满高度
          videoSize.value = {
            videoWidth: (containerHeight.value) * 16 / 9,
            videoHeight: containerHeight.value,
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
      updateVideoSize();
    });
    watch(videoCountRef, updateVideoSize);
    return videoSize;
};

