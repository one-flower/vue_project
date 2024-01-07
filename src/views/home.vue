<template>
  <div class="container">
    <h1 id="comp" style="text-align: center">组件说明</h1>
    <h2 id="input">Input</h2>
    <div class="example">
      <div class="example__view">
        <el-form :model="inputForm" ref="form" :inline="false">
          <el-form-item :label="item.label" v-for="item in inputList" :rules="item.rules">
            <el-input
              v-model="inputForm[item.value as string]"
              :placeholder="item.option.placeholder"
              :disabled="item.option.disabled"
              clearable
              :type="item.option.type || 'text'"
              :rows="4"
            >
              <template #prepend v-if="item.option.prepend">{{ item.option.prepend }}</template>
              <template #append v-if="item.option.append">{{ item.option.append }}</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="example__code" :class="{ boxExpand: inputForm.expandFlag }">
        <code>
          {{ inputList }}
        </code>
      </div>
      <div class="example--btn">
        <button @click="inputForm.expandFlag = !inputForm.expandFlag">
          {{ inputForm.expandFlag ? "展开" : "收缩" }}
        </button>
      </div>
    </div>
    <h2 id="input">Api</h2>
    <el-table :data="inputApiData">
      <el-table-column prop="name" label="属性"></el-table-column>
      <el-table-column prop="desc" label="说明"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="default" label="默认值"></el-table-column>
    </el-table>

    <h2 id="InputNumber">InputNumber</h2>
    <div class="example">
      <div class="example__view">
        <el-form :model="inputNumberForm" ref="form" :inline="false">
          <el-form-item :label="item.label" v-for="item in inputNumberList" :rules="item.rules">
            <el-input-number
              v-model.number="inputNumberForm[item.value as string]"
              :placeholder="item.option.placeholder"
              :disabled="item.option.disabled"
              :min="item.option.min"
              :max="item.option.max"
              :precision="item.option.precision"
              :step="item.option.step"
              :step-strictly="item.option.stepStrictly"
              :controls="item.option.controls"
              :controls-position="item.option.controlsPosition"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>

      <div class="example__code" :class="{ boxExpand: !inputNumberForm.expandFlag }">
        <code>
          {{ inputList }}
        </code>
      </div>
      <div class="example--btn">
        <button @click="inputNumberForm.expandFlag = !inputNumberForm.expandFlag">
          {{ !inputNumberForm.expandFlag ? "展开" : "收缩" }}
        </button>
      </div>
    </div>

    <h2 id="select">Select</h2>
    <el-text class="mx-1" size="large" type="warning">api为动态数据，静态使用dict，下面使用dict展示</el-text>
    <div class="example">
      <div class="example__view">
        <el-form :model="selectForm" ref="form" :inline="false">
          <el-form-item :label="item.label" v-for="item in selectList" :rules="item.rules">
            <el-select
              v-model.number="selectForm[item.value as string]"
              :placeholder="item.option.placeholder"
              :disabled="item.option.disabled"
              clearable
            >
              <el-option
                v-for="optionItem in item.option.dict"
                :key="optionItem.value"
                :label="optionItem.label"
                :value="optionItem.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="example__code" :class="{ boxExpand: !selectForm.expandFlag }">
        <code>
          {{ inputList }}
        </code>
      </div>
      <div class="example--btn">
        <button @click="selectForm.expandFlag = !selectForm.expandFlag">
          {{ !selectForm.expandFlag ? "展开" : "收缩" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Prism.js
const inputForm = reactive<Record<string, any>>({
  expandFlag: true,
  inputValue1: "",
  inputValue2: "禁用value",
  inputValue3: "",
})
const inputList = [
  {
    label: "基础",
    value: "inputValue1",
    type: "input",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      placeholder: "请输入内容",
    },
  },
  {
    label: "禁用",
    value: "inputValue2",
    type: "input",
    defaultValue: "禁用value",
    rules: {
      required: true,
    },
    option: {
      placeholder: "请输入内容",
      disabled: true,
    },
  },
  {
    label: "自定义文本",
    value: "inputValue",
    type: "input",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      placeholder: "请输入内容",
      formatter: "$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')",
      parser: "value.replace(/\$\s?|(,*)/g, '')",
    },
  },
  {
    label: "文本域",
    value: "inputValue",
    type: "input",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      placeholder: "请输入内容",
      type: "textarea",
    },
  },
  {
    label: "前后置内容",
    value: "inputValue",
    type: "input",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      placeholder: "请输入内容",
      prepend: "$",
      append: "元",
    },
  },
]
const inputApiData = [
  { name: "disable", desc: "禁用", type: "boolean", default: "false" },
  { name: "placeholder", desc: "占位符", type: "string", default: "" },
  { name: "formatter", desc: `指定输入值的格式。(只有当 type 是"text时才能工作)`, type: "string", default: "" },
  { name: "parser", desc: `指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)`, type: "string", default: "" },
  { name: "type", desc: "类型", type: `"text","textarea"`, default: "text" },
  { name: "rows", desc: "行高", type: "number", default: "4" },
  { name: "prepend", desc: "输入框前置内容", type: "string", default: "" },
  { name: "append", desc: "输入框后置内容", type: "string", default: "" },
]

const inputNumberForm = reactive<Record<string, any>>({
  expandFlag: false,
  inputNumberValue1: 1,
  inputNumberValue2: 10,
  inputNumberValue3: 5,
  inputNumberValue4: 5.1,
  inputNumberValue5: 5.21,
  inputNumberValue6: 1,
  inputNumberValue7: 1,
})
const inputNumberList = [
  {
    label: "基础",
    value: "inputNumberValue1",
    type: "inputNumber",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {},
  },
  {
    label: "禁用",
    value: "inputNumberValue2",
    type: "inputNumber",
    defaultValue: 10,
    rules: {
      required: true,
    },
    option: {
      disabled: true,
      placeholder: "请输入内容",
    },
  },
  {
    label: "设置大小",
    value: "inputNumberValue3",
    type: "inputNumber",
    defaultValue: 5,
    rules: {
      required: true,
    },
    option: {
      min: 0,
      max: 10,
    },
  },
  {
    label: "精度",
    value: "inputNumberValue4",
    type: "inputNumber",
    defaultValue: 5.1,
    rules: {
      required: true,
    },
    option: {
      precision: 1,
    },
  },
  {
    label: "步长",
    value: "inputNumberValue5",
    type: "inputNumber",
    defaultValue: 5.21,
    rules: {
      required: true,
    },
    option: {
      step: 0.01,
      stepStrictly: true,
    },
  },
  {
    label: "控制按钮",
    value: "inputNumberValue6",
    type: "inputNumber",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {
      controls: false,
    },
  },
  {
    label: "按钮位置",
    value: "inputNumberValue7",
    type: "inputNumber",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {
      controlsPosition: "right",
    },
  },
]

const selectForm = reactive<Record<string, any>>({
  expandFlag: false,
  selectValue1: "",
  selectValue2: "禁用value",
  selectValue3: "",
})
const selectList = [
  {
    label: "基础",
    value: "selectValue1",
    type: "select",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {
      // 1231
      dict: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
      ],
    },
  },
  {
    label: "禁用",
    value: "inputNumberValue2",
    type: "inputNumber",
    defaultValue: 10,
    rules: {
      required: true,
    },
    option: {
      disabled: true,
      placeholder: "请输入内容",
    },
  },
  {
    label: "设置大小",
    value: "inputNumberValue3",
    type: "inputNumber",
    defaultValue: 5,
    rules: {
      required: true,
    },
    option: {
      min: 0,
      max: 10,
    },
  },
  {
    label: "精度",
    value: "inputNumberValue4",
    type: "inputNumber",
    defaultValue: 5.1,
    rules: {
      required: true,
    },
    option: {
      precision: 1,
    },
  },
  {
    label: "步长",
    value: "inputNumberValue5",
    type: "inputNumber",
    defaultValue: 5.21,
    rules: {
      required: true,
    },
    option: {
      step: 0.01,
      stepStrictly: true,
    },
  },
  {
    label: "控制按钮",
    value: "inputNumberValue6",
    type: "inputNumber",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {
      controls: false,
    },
  },
  {
    label: "按钮位置",
    value: "inputNumberValue7",
    type: "inputNumber",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {
      controlsPosition: "right",
    },
  },
]
const toFunc = (string: string) => {}
</script>
<style lang="scss" scoped>
.example {
  transition: all 2.5s ease-in-out;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  &__view {
    padding: 15px;
    border-bottom: 1px solid #dcdfe6;
  }
  &__code {
    background-color: #f5f7fa;
    transition: max-height 0.5s ease-in-out;
    overflow: hidden;
    max-height: 100vh;
  }
  &--btn {
    z-index: 10;
    position: sticky;
    bottom: -15px;
    background-color: #fff;
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      border: none;
      line-height: 1;
      height: inherit;
      background-color: #fff;
      font-size: 16px;
      color: #909399;
      cursor: pointer;
    }
  }
}
.boxExpand {
  max-height: 0;
  padding: 0;
}
code {
  display: block;
  padding: 20px 10px;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  hyphens: none;

  font-family: "JetBrains Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  color: #303133;
  font-size: 14px;
}
</style>
