<template>
  <div
    v-if="showModal"
    class="checkin-modal"
  >
    <div class="checkin-modal__content">
      <div class="checkin-modal__header">
        <h2>签到</h2>
        <button @click="showModal = false">
          关闭
        </button>
      </div>
      <div class="checkin-modal__body">
        <p>请您完成签到</p>
      </div>
      <div class="checkin-modal__footer">
        <button @click="showModal = false">
          取消
        </button>
        <button @click="handleCheckIn()">
          确认签到
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useTask from '../hooks/useTask';

const showModal = ref(false);
const isCheckIn = ref(false);
useTask('custom-check-in-tool', (data) => {
  // 任务更新回调
  if (data.type === 'ask-check-in') {
    // 收到签到请求
    console.log('收到签到请求');
    // 检查是否已签到，没有签到就展示签到弹窗
    if (!isCheckIn.value) {
      TCIC.SDK.instance.promiseState('TStateDeviceDetect', false).then(() => {
          // 设备检测完成后展示弹窗
          showModal.value = true;
        });
    } else {
      // 已经签到，提示用户
      console.log('已经签到');
    }
  }
});
const { updateTask } = useTask('custom-check-in-tool-result');
const handleCheckIn = () => {
  isCheckIn.value = true;
  showModal.value = false;
  // 发送请求到服务器

  // 告知老师签到完成
  updateTask({
    type: 'student-check-in',
    payload: {
      checkIn: true,
      userId: TCIC.SDK.instance.getUserId(),
    },
  });

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