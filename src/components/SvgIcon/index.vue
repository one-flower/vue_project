<template>
  <div class="svg-container">
    <!-- 在线图片 -->
    <img
      v-if="isOnlineSvg"
      :style="{
        '--size': `${size}`,
      }"
      class="svg-icon"
      :src="icon"
    />
    <!-- '--svg-icon-url': `url(${icon})`,  svg-icon-online -->
    <!-- svg -->
    <svg
      v-else
      class="svg-icon"
      :style="{
        '--size': `${size}`,
      }"
      aria-hidden="true"
    >
      <use :xlink:href="`#${icon}`" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon: string // SVG 图标名称或在线URL
  size?: string // 尺寸
}
const props = withDefaults(defineProps<Props>(), {
  icon: "vue",
  size: "1rem",
})

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon))
</script>

<style scoped lang="scss">
.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg-icon {
  width: var(--size);
  height: var(--size);
  fill: currentColor;
  overflow: hidden;
}

// .svg-icon-online {
//   background-color: currentColor;
//   mask-image: var(--svg-icon-url) no-repeat 50% 50%;
//   -webkit-mask-image: var(--svg-icon-url) no-repeat 50% 50%;
//   mask-size: cover;
//   -webkit-mask-size: cover;
//   display: inline-block;
// }
</style>
