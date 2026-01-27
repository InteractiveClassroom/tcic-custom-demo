<template>
  <div class="cover-image-container">
    <h2>{{ classInfo.className }}</h2>
    <h2>主讲老师：{{ classInfo.teacherName }}</h2>
    <h3>上课时间：{{ moment(classInfo.startTime * 1000).format('YYYY-MM-DD HH:mm') }} - {{ moment(classInfo.endTime * 1000).format('YYYY-MM-DD HH:mm') }}</h3>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import moment from 'moment';

  const classInfo = ref(TCIC.SDK.instance.getClassInfo());

  onMounted(async () => {
    const teachersInfo = await TCIC.SDK.instance.getUserInfo(classInfo.value.teacherId);
    classInfo.value.teacherName = teachersInfo.nickname;
  });
</script>

<style lang="less" scoped>

.cover-image-container {
  width: 100%;
  height: 100%;
  background-color: red;
  position: absolute;
}

</style>