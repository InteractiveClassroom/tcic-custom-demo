<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['use-document'])
const coursewareList = [{
    "docId": "hxbsjwdm",
    "docUrl": "https://tcic-source.qcloudclass.com/uploads/2zz.pptx",
    "docName": "【公开】LCIC介绍材料-latest.pptx",
    "autoHandleUnsupportedElement": true,
    "owner": "xxxx",
    "permission": 1,
    "transcodeResult": "https://tcic-prod-1257307760.qcloudclass.com/doc/0g8f3u0lfuco6elpco1d_tiw/h5/index.html",
    "transcodeProgress": 100,
    "transcodeType": 1,
    "transcodeState": 3,
    "transcodeInfo": "unrecognized",
    "docType": "pptx",
    "width": 1280,
    "height": 720,
    "docSize": 102289755,
    "updateTime": 1752222933,
    "pages": 29,
    "type": "pptx",
    "operateStatus": false
}];
const handleClick = (item) => {
  console.log('handleClick', item)
  emit('use-document', item)
}
</script>

<template>
<div>
	<div class="custom-course-panel">
    <span>自定义课件面板</span>
  </div>
  <div v-for="item in coursewareList" :key="item.docName"
    class="course-con-list"
  >
    <div class="course-con-list_info">
      <div class="course-list_left">
        <img src="./assets/h5.png"></img>
        <div class="name" @click="handleClick(item)">{{ item.docName }}</div>
      </div>

    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
.custom-course-panel {
  color: #fff;
  font-size: 20px;
  line-height: 35px;
  font-weight: 400;
}
.course-con-list {
    width: 100%;
    height: 50px;
    padding: 0 8px;
    box-sizing: border-box;
    cursor: pointer;
    .course-con-list_info {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #5A5A5A;
      .course-list_left {
        display: flex;
        align-items: center;
      }
      img{
        width: 20px;
        height: 20px;
      }
    }
    &.last-child {
      .course-con-list_info {
        border: none;
      }
    }

    &:hover {
      border: 2px solid #006EFF;

      .course-con-list_info {
        border-bottom: none;
      }
    }
    .name {
      max-width: 395px;
      font-size: 14px;
      color: #fff;
      align-self: center;
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
</style>