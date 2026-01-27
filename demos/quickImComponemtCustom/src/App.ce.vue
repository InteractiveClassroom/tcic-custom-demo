<script lang="ts" setup>
  import img from './assets/cut.svg';

  // 现有的截图方法
  const handleClick = () => {
    console.log('click')
  }
</script>

<template>
  <li
    class="flex"
    @click="handleClick()"
  >
    <img
      class="tool-icon"
      :src="img"
    >
  </li>
</template>

<style lang="less" scoped>
@--color-primary: #006eff;
@--color-public: #14181d;
@--color-disable: #b9bbbc;
@--color-back: #1c2131;
@--color-iconbg: #333;

@--btn-size: 28px;
@--btn-size-small: 28px;
@--btn-icon-size: 24px;
@--btn-icon-size-small: 22px;
@--btn-border-radius: 2px;
@--btn-margin: 8px 6px;
@--btn-margin-small: 6px;
@--tool-width: 52px; // 36 + 8 * 2

@--popover-btn-size: 36px;
@--popover-btn-size-small: 26px;
@--popover-btn-icon-size: 24px;
@--popover-btn-border-radius: 2px;
@--popover-btn-margin: 8px 8px;

@--popover-list-item-width: auto;
@--popover-list-item-height: 48px;
@--popover-list-item-border-radius: 4px;
@--popover-list-item-padding: 12px;
@--popover-list-item-margin: 8px 8px;
.tool-icon {
    width: 24px;
    height: 24px;
    background-size: 100%;
    margin-right: 2px;
    cursor: pointer;
  }
  .capture-li {
    height: 24px;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-popper {
    min-width: 0px;
    padding: 0 16px 0 0;
    background: transparent;
    border: none;
    box-shadow: none;
    margin-right: 0;

    .list-drop {
      padding: 6px 0;

      .el-scrollbar__wrap {
        max-height: 226px;
        margin-bottom: 0px !important;
      }

      ul {
        li {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: var(--text-color, #fff);
          width: @--popover-list-item-width;
          height: @--popover-list-item-height;
          border-radius: @--popover-list-item-border-radius;
          padding: @--popover-list-item-padding;
          margin: @--popover-list-item-margin;

          &:hover {
            background: @--color-primary;
            --text-color: #fff;
          }

          &:active, &.active {
            background: @--color-primary;
            --text-color: #fff;
          }

          i {
            display: inline-block;
            width: @--popover-btn-icon-size;
            height: @--popover-btn-icon-size;
            margin-right: 8px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }

          label {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: @--popover-btn-icon-size;
          }
        }
      }
    }
  }
</style>