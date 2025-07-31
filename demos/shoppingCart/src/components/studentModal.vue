<template>
  <div class="checkin-modal" v-if="showModal">
    <div class="checkin-modal__content">
      <div class="checkin-modal__header">
        <h2>购物车</h2>
        <button @click="showModal = false">关闭</button>
      </div>
      <div class="checkin-modal__body">
        <p style="font-size: 30px;">📢</p>
        <p>🎉🎉🎉1v1小班课🎉🎉🎉</p>
        <p>优惠进行中</p>
      </div>
      <div class="checkin-modal__footer">
        <button @click="showModal = false">取消</button>
        <button @click="handleCheckIn()">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useTask from '../hooks/useTask';

const showModal = ref(false);
useTask('custom-check-in-tool', (data) => {
  // 任务更新回调
  if (data.type === 'ask-check-in') {
    // 展示购物车
    if (localStorage.getItem('hasShown') === 'true') {
      return;
    }
    TCIC.SDK.instance.promiseState('TStateDeviceDetect', false).then(() => {
      // 设备检测完成后展示弹窗
      showModal.value = true;
      localStorage.setItem('hasShown', 'true');
    });
  }
});
const handleCheckIn = () => {
  showModal.value = false;
  // 发送请求到服务器
};
</script>

<style lang="less">
.checkin-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .checkin-modal__content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    .checkin-modal__body {
      margin: 20px 0;
      p {
        font-size: 16px;
        text-align: center;
      }
    }
    .checkin-modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        margin: 0;
      }
      button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
      }
    }
    .checkin-modal__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      margin: 20px 40px 0;
      button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>