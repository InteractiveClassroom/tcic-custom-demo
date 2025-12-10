<template>
  <BigClassVideo v-if="isVideoOnlyClass" />
  <BigClassVideoDoc v-else />
</template>

<script setup>
console.log('setup!!!');
// 视频白板课
import BigClassVideoDoc from './VideoDoc.vue';
// 视频课
import BigClassVideo from './Video.vue';
const isVideoOnlyClass = TCIC.SDK.instance.isVideoOnlyClass();
</script>

<style>
</style>