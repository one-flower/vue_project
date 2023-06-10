<template>
  <div class="container">
    <el-input v-model.number="num" placeholder=""  clearable ></el-input>
    
    <div>
      <input type="number" v-model="num" />
      computed: {{ numChange }}
    </div>
    <div>
      computed是拥有缓存的计算属性
      日期：{{ now }}
      日期：{{ nowChange }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
let num = ref(0)
const numChange = computed(() => {
  return num
})

const now = computed(() => Date.now())
let now1 = ref<Date>(new Date());
const nowChange = computed(() => {
  return now1
})
</script>

<style scoped></style>