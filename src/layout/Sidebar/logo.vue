<template>
  <div class="logo-container">
    <svg-icon icon="mkv" class="logo-container--icon" size="32px" />
    <div class="logo-container--info omit" title="">后台管理系统</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.logo-container {
  width: 100%;
  height: $logoHeight;
  line-height: $logoHeight;
  display: flex;
  color: #fff;
  background-color: $logoColor;
  box-sizing: border-box;
  overflow: hidden;

  &--icon {
    min-width: 64px;
    animation: amplifyIcon 0.8s ease-in-out;
  }

  &--info {
    width: 120px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    animation: amplifyIcon 0.8s ease-in-out;
  }
}

@keyframes amplifyIcon {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>
