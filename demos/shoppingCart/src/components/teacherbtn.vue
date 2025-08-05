<template>
  <div class="custom-shop-btn" @click="showShopCart">
    <img src="../assets/shopcart.svg" alt="">
    <span class="header__btn-text">购物车</span>
  </div>
</template>

<script setup>
import useTask from '../hooks/useTask';
const { updateTask } = useTask('custom-shop-cart-tool');
const showShopCart = () => {
  updateTask({
    type: 'show-shop-cart',
  });
};
</script>

<style lang="less">
.custom-shop-btn {
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