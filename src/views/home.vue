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
              :formatter="toFunc(item.option.formatter)"
              :parser="toFunc(item.option.parser)"
            >
              <template #prepend v-if="item.option.prepend">{{ item.option.prepend }}</template>
              <template #append v-if="item.option.append">{{ item.option.append }}</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <pre
        class="example__code"
        :class="{ boxExpand: inputExpandFlag }"
      ><code class="language-js inline-color">{{ inputList }}</code></pre>

      <div class="example--btn">
        <button @click="inputExpandFlag = !inputExpandFlag">
          {{ !inputExpandFlag ? "展开" : "收缩" }}
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
      <pre
        class="example__code"
        :class="{ boxExpand: inputNumberExpandFlag }"
      ><code class="language-js">{{ inputNumberList }}</code></pre>
      <div class="example--btn">
        <button @click="inputNumberExpandFlag = !inputNumberExpandFlag">
          {{ !inputNumberExpandFlag ? "展开" : "收缩" }}
        </button>
      </div>
    </div>
    <h2 id="input">Api</h2>
    <el-table :data="inputNumberApiData">
      <el-table-column prop="name" label="属性"></el-table-column>
      <el-table-column prop="desc" label="说明"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="default" label="默认值"></el-table-column>
    </el-table>

    <h2 id="select">Select</h2>
    <el-text class="mx-1" size="large" type="warning">api为动态数据，静态使用dict，下面使用dict展示</el-text>
    <div class="example">
      <div class="example__view">
        <el-form :model="selectForm" ref="form" :inline="false">
          <el-form-item :label="item.label" v-for="item in selectList" :rules="item.rules">
            <el-select
              v-model="selectForm[item.value as string]"
              :placeholder="item.option.placeholder"
              :disabled="item.option.disabled"
              clearable
              :multiple="item.option.multiple"
              :collapse-tags="item.option.collapseTags"
              :collapse-tags-tooltip="item.option.collapseTagsTooltip"
              :max-collapse-tags="item.option.maxCollapseTags"
              :filterable="item.option.filterKeys?.length ? true : false"
              :filter-method="item.option.filterKeys?.length ? filterMethod : undefined"
            >
              <template #header v-if="item.option.addUrl">
                <el-input v-model="selectAddValue" clearable>
                  <template #append>
                    <el-button type="primary" size="default" @click="addItem">添加</el-button>
                  </template>
                </el-input>
              </template>
              <el-option
                v-for="optionItem in item.option.dict"
                :key="optionItem.value"
                :label="optionItem.label"
                :value="optionItem.value"
                :disabled="optionItem.disabled"
              >
                <slot v-if="optionItem.slot">
                  <div v-html="optionItem.slot"></div>
                </slot>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <pre
        class="example__code"
        :class="{ boxExpand: selectExpandFlag }"
      ><code class="language-js">{{ selectList }}</code></pre>
      <div class="example--btn">
        <button @click="selectExpandFlag = !selectExpandFlag">
          {{ !selectExpandFlag ? "展开" : "收缩" }}
        </button>
      </div>
    </div>
    <h2 id="input">Api</h2>
    <el-table :data="selectApiData">
      <el-table-column prop="name" label="属性"></el-table-column>
      <el-table-column prop="desc" label="说明"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="default" label="默认值"></el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import Prism from "prismjs"

onMounted(() => {
  Prism.highlightAll() //切换菜单重新渲染
})
// Prism.js
const inputExpandFlag = ref(true)
const inputForm = reactive<Record<string, any>>({
  inputValue1: "",
  inputValue2: "禁用value",
  inputValue3: "",
  inputValue4: "",
  inputValue5: "",
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
    value: "inputValue3",
    type: "input",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      placeholder: "请输入内容",
      formatter: "`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')",
      parser: "value.replace(/\\$\\s?|(,*)/g, '')",
    },
  },
  {
    label: "文本域",
    value: "inputValue4",
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
    value: "inputValue5",
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
  { name: "disabled", desc: "禁用", type: "boolean", default: "false" },
  { name: "placeholder", desc: "占位符", type: "string", default: "" },
  { name: "formatter", desc: `指定输入值的格式。(只有当 type 是"text时才能工作)`, type: "string", default: "" },
  { name: "parser", desc: `指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)`, type: "string", default: "" },
  { name: "type", desc: "类型", type: `"text","textarea"`, default: "text" },
  { name: "rows", desc: "行高", type: "number", default: "4" },
  { name: "prepend", desc: "输入框前置内容", type: "string", default: "" },
  { name: "append", desc: "输入框后置内容", type: "string", default: "" },
]
const toFunc = (string: string | undefined) => {
  if (string) return new Function("value", `return ${string}`)
}

const inputNumberExpandFlag = ref(false)
const inputNumberForm = reactive<Record<string, any>>({
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
const inputNumberApiData = [
  { name: "disabled", desc: "禁用", type: "boolean", default: "false" },
  { name: "placeholder", desc: "占位符", type: "string", default: "" },
  { name: "min", desc: "最小值", type: "number", default: "" },
  { name: "max", desc: "最大值", type: "number", default: "" },
  { name: "step", desc: "步长", type: "number", default: "" },
  { name: "stepStrictly", desc: "严格步长", type: "boolean", default: "false" },
  { name: "precision", desc: "数值精度", type: "string", default: "" },
  { name: "controls", desc: "是否显示控制按钮", type: "boolean", default: "true" },
  { name: "controlsPosition", desc: "控制按钮位置", type: `"" , "right"`, default: "-" },
]

const selectExpandFlag = ref(false)
const selectForm = reactive<Record<string, any>>({
  selectValue1: "",
  selectValue2: 1,
  selectValue3: [1, 3],
  selectValue4: [1, 2],
  selectValue5: "",
  selectValue6: "",
})

const selectList = reactive([
  {
    label: "基础",
    value: "selectValue1",
    type: "select",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      // 1231
      dict: [
        {
          value: 1,
          label: "北京",
        },
        {
          value: 2,
          label: "上海",
          disabled: true,
        },
        {
          value: 3,
          label: "深圳",
          slot: `<span style="color:red">深圳</span>`,
        },
        {
          value: 4,
          label: "广州",
        },
      ],
    },
  },
  {
    label: "禁用",
    value: "selectValue2",
    type: "select",
    defaultValue: 1,
    rules: {
      required: true,
    },
    option: {
      disabled: true,
      placeholder: "请输入内容",
      dict: [
        {
          value: 1,
          label: "北京",
        },
        {
          value: 2,
          label: "上海",
        },
        {
          value: 3,
          label: "深圳",
        },
        {
          value: 4,
          label: "广州",
        },
      ],
    },
  },
  {
    label: "多选",
    value: "selectValue3",
    type: "select",
    defaultValue: [1, 3],
    rules: {
      required: true,
    },
    option: {
      multiple: true,
      dict: [
        {
          value: 1,
          label: "北京",
        },
        {
          value: 2,
          label: "上海",
        },
        {
          value: 3,
          label: "深圳",
        },
        {
          value: 4,
          label: "广州",
        },
      ],
    },
  },
  {
    label: "多选折叠",
    value: "selectValue4",
    type: "select",
    defaultValue: [1, 2],
    rules: {
      required: true,
    },
    option: {
      dict: [
        {
          value: 1,
          label: "北京",
        },
        {
          value: 2,
          label: "上海",
        },
        {
          value: 3,
          label: "深圳",
        },
        {
          value: 4,
          label: "广州",
        },
      ],
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      maxCollapseTags: 2,
    },
  },
  {
    label: "自定义筛选",
    value: "selectValue5",
    type: "select",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      dict: [
        {
          value: 1,
          label: "北京",
          name: "beijing",
        },
        {
          value: 2,
          label: "上海",
          name: "shanghai",
        },
        {
          value: 3,
          label: "深圳",
          name: "shenzhen",
        },
        {
          value: 4,
          label: "广州",
          name: "guangzhou",
        },
      ],
      filterKeys: ["name"],
    },
  },
  {
    label: "添加选项（效果未验证）",
    value: "selectValue6",
    type: "select",
    defaultValue: "",
    rules: {
      required: true,
    },
    option: {
      addUrl: "api/xxx",
      dict: [
        {
          value: 1,
          label: "北京",
        },
        {
          value: 2,
          label: "上海",
        },
        {
          value: 3,
          label: "深圳",
        },
        {
          value: 4,
          label: "广州",
        },
      ],
    },
  },
])
const dictCopy = selectList[4].option.dict
const filterMethod = (value: string | undefined) => {
  // 自定义过滤方法
  if (!value) {
    selectList[4].option.dict = dictCopy
    return
  } else {
    selectList[4].option.dict = selectList[4].option.dict?.filter((item: any) => {
      let num = 0
      let delFlag = true // 过滤掉不符合的
      selectList[4].option.filterKeys?.forEach(key => {
        // number  string
        if (["number", "string"].includes(typeof item[key])) {
          if (item[key]!.toString().indexOf(value) > -1) {
            num++
          }
        }

        if (num > 0) {
          delFlag = false
        }
      })

      return !delFlag
    })
  }
}
const selectAddValue = ref("")
const addItem = () => {
  selectList[5].option.dict.push({ value: selectList[5].option.dict.length + 1, label: selectAddValue.value } as any)
}
const selectApiData = [
  { name: "disabled", desc: "禁用", type: "boolean", default: "false" },
  { name: "placeholder", desc: "占位符", type: "string", default: "" },
  { name: "multiple", desc: "多选", type: "number", default: "false" },
  { name: "collapseTags", desc: "多选时是否将选中值按文字的形式展示", type: "boolean", default: "false" },
  { name: "collapseTagsTooltip", desc: "多选时是否显示选中值的TOOLTIP提示", type: "boolean", default: "false" },
  { name: "maxCollapseTags", desc: "多选时最多显示多少个tag", type: "number", default: "" },
  { name: "api", desc: "动态选项接口", type: "string", default: "" },
  { name: "dict", desc: "静态选项", type: "object", default: "" },
  { name: "filterKeys", desc: "是否显示控制按钮", type: "array", default: "true" },
  { name: "addUrl", desc: "动态添加字段接口", type: "string", default: "" },
]
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

    display: grid;
    grid-template-rows: 0fr;
    transition: 0.8s;
    overflow: hidden;
    margin: 0;
    padding: 0 10px;
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
  grid-template-rows: 1fr;
}
code {
  min-height: 0;
}

h2 {
  color: #409eff;
}
</style>
