<template>
  <div class="container">
    <h3>1、基本使用</h3>
    <h4>ref</h4>
    <div>
      {{ refVal }}
      <input type="text" v-model="refVal" />
    </div>
    <div>
      {{ obj.name }}
      <input type="text" v-model="obj.name" />
    </div>
    <div>
      {{ obj }}
      <button type="button" @click="objAdd">添加属性</button>
    </div>
    <div>
      {{ list[0] }}
      <input type="text" v-model.number="list[0]" />
    </div>
    <div>
      {{ list }}
      <button type="button" @click="listAdd">添加ref</button>
    </div>
    <h3>2、响应式失效</h3>
    <div>
      {{ list }}
      <button type="button" @click="listLose1">直接赋值</button>
    </div>
    <div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <!-- obj {{ obj1.age + 1 }} {{ obj1.num + 1 }} -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 定义联合类型
// let refVal = ref<number | string>('ref')
let refVal = ref(0)
interface obj {
  name: string,
  age: number,
  type?: boolean | number
}
let obj: obj = reactive({
  name: 'reactive',
  age: 18
})
const objAdd = () => {
  obj.type = 1
  console.log(obj);
}
let list: number[] = reactive([1, 2, 3])
const listAdd = () => {
  list.push(refVal.value)
}

// 改变引用类型，失去响应式
const listLose1 = () => {
  list = [1, 2, 3, 4]
  console.log(list);
}
let obj1 = ({
  age: ref(18),
  num: 18
})

</script>

<style lang="scss" scoped>
div {
  line-height: 30px;
  padding-left: 10px;
}
</style>