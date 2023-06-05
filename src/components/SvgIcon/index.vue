<template>
  <div 
    v-if="isOnlineSvg" 
    :style="{ 
      '--svg-icon-url': `url(${icon})`, 
      '--width': `${width ? width + 'px' : '1rem'}`, 
      '--height': `${height ? height + 'px' : '1rem'}`
    }"
    class="svg-icon svg-icon-online"
    :class="className"
  />
  <svg 
    v-else class="svg-icon"
    :style="{ 
      '--width': `${width ? width + 'px' : '1rem'}`, 
      '--height': `${height ? height + 'px' : '1rem'}`
    }"
    :class="className"
    aria-hidden="true"
  >
    <use :xlink:href="`#${icon}`"/>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  // SVG 图标名称或在线URL
  icon: {
    type: String,
    default: 'vue'
    // required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
})

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon))
</script>

<style scoped lang="scss">
.svg-icon {
  width: var(--width);
  height: var(--height);
  fill: currentColor;
  overflow: hidden;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>