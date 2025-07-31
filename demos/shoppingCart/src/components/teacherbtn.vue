<template>
  <div class="custom-checkin-btn" @click="checkIn">
    <img src="../assets/shopcart.svg" alt="">
    <span class="header__btn-text">购物车</span>
  </div>
</template>

<script setup>
import useTask from '../hooks/useTask';
const refreshCheckInList = () => {
  //TODO
}
const { updateTask } = useTask('custom-check-in-tool');
// 监听学生签到回调
useTask('custom-check-in-tool-result', (data) => {
  // 任务更新回调
  if (data.type === 'student-check-in') {
    console.log('完成签到:', data.payload);
    // 刷新签到列表
    // 这里可以添加代码来更新签到列表的逻辑
    // 例如调用一个方法来获取最新的签到数据
    refreshCheckInList();
  }
})
const checkIn = () => {
  updateTask({
    type: 'ask-check-in',
  });
};
</script>

<style lang="less">
.custom-checkin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 60px;
  cursor: pointer;
  span{
    font-size: 12px;
    color: #a3aec7;
    line-height: 19px;
  }
  img{
    width: 24px;
    height: 24px;
  }
}
</style>