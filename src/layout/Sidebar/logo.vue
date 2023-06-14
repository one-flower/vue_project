<template>
  <div class="logo-container">
    <svg-icon icon="poke" class="logo-container--icon" />
    <div class="logo-container--info" title="">精灵1dfadfd1111球</div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.logo-container {
  width: 100%;
  height: $logoHeight;
  text-align: center;
  color: #fff;
  background-color: $logoColor;
  box-sizing: border-box;
  overflow: hidden;

  &--icon {
    padding: 8px;
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
    animation: amplifyIcon .8s ease-in-out;
  }

  &--info {
    width: 120px;
    height: $logoHeight;
    line-height: $logoHeight;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
    animation: rotateTitle .8s ease-in-out;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@keyframes amplifyIcon {
  0% {
    transform: scale(0)
  }

  80% {
    transform: scale(1.2)
  }

  to {
    transform: scale(1)
  }
}

@keyframes rotateTitle {
  from {
    transform: scale(0) rotate(0deg)
  }

  to {
    transform: scale(1) rotate(360deg)
  }
}
</style>