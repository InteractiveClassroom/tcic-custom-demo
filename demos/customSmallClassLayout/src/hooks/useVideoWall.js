import { nextTick, onMounted, ref, watch } from 'vue';

import { useElementSize, useResizeObserver } from '@vueuse/core';

export const useVideoWall = (containerRef, videoCountRef, gap = 2) => {
    const videoSize = ref({ videoWidth: 0, videoHeight: 0 });
    const videoWallSize = ref({ width: 0, height: 0 });
    const updateVideoSize = () => {
      nextTick(() => {
        const { width: containerWidth, height: containerHeight } = useElementSize(containerRef);
        console.log('containerWidth', containerWidth.value, 'containerHeight', containerHeight.value, videoCountRef.value, gap);
        // 先计算 wall的宽高
        if (containerWidth.value * 9 / 16 > containerHeight.value) {
          // 占满高度
          videoWallSize.value = {
            width: containerHeight.value * 16 / 9,
            height: containerHeight.value,
          };
        } else {
          // 占满宽度
          videoWallSize.value = {
            width: containerWidth.value,
            height: containerWidth.value * 9 / 16,
          };
        }
        // 1 个 1 列，2-4 两列, 5-9 3列
        if (videoCountRef.value <= 1) {
          videoSize.value = {
            videoWidth: videoWallSize.value.width,
            videoHeight: videoWallSize.value.height,
          };
        } else if (videoCountRef.value <= 4) {
          videoSize.value = {
            videoWidth: (videoWallSize.value.width - gap) / 2,
            videoHeight: (videoWallSize.value.height - gap) / 2,
          };
        } else {
          videoSize.value = {
            videoWidth: (videoWallSize.value.width - gap * 2) / 3,
            videoHeight: (videoWallSize.value.height - gap * 2) / 3,
          };
        }
      });
    };
    onMounted(() => {
      // fix 获取 container 宽高为 0 的问题
      updateVideoSize();
      useResizeObserver(containerRef, updateVideoSize);
      watch(videoCountRef, updateVideoSize);
    });
    return { videoSize, videoWallSize };
};

