<template>
  <div v-loading="loading" element-loading-text="上传中">
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :http-request="httpRequest"
      :before-upload="beforeAvatarUpload"
      :multiple="false"
      :disabled="readonly"
      :accept="accept"
    >
      <div v-if="imageUrl" class="avatar" @mouseover="tipsChange(true)" @mouseout="tipsChange(false)">
        <img :src="imageUrl" class="avatar-img" />
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <template #tip>
        <div class="avatar-tip">
          只能上传
          <span class="avatar-span">“ {{ accept }} ”</span>
          格式文件，且不超过
          <span class="avatar-span">“ {{ size }} ”</span>
          M
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadRequestOptions } from "element-plus/es"
import { toast } from "@/utils/tip.js"
import { imgUpload } from "@/api/common"

const props = defineProps({
  // 是否只读
  readonly: {
    type: Boolean,
    default: () => {
      return false
    },
  },
  accept: {
    type: String,
    default: ".jpg,.png",
  },
  size: {
    type: Number,
    default: () => {
      return 50
    },
  },
  imageUrl: {
    type: String,
    default: "",
  },
})
const emit = defineEmits(["update:imageUrl"])

const isHover = ref<boolean>(false)
const loading = ref<boolean>(false)

const tipsChange = (type: boolean) => {
  isHover.value = type
}
// 校验
const beforeAvatarUpload = (file: File) => {
  const houzui = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()

  let arr = props.accept.split(",")
  let type = false

  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i]
    if (houzui === temp) {
      type = true
      break
    }
  }

  const limitMax = file.size / 1024 / 1024 < props.size

  const limitMin = file.size !== 0

  if (!type) {
    toast.warning("当前格式为" + houzui + ",上传文件只能是 " + props.accept + " 格式")
    return false
  }
  if (!limitMax) {
    toast.warning("上传文件大小不能超过 " + props.size + " M")
    return false
  }
  if (!limitMin) {
    toast.warning("上传文件大小不能等于0k")
    return false
  }

  return type && limitMax && limitMin
}

const httpRequest = (file: UploadRequestOptions): Promise<any> => {
  // 执行文件上传逻辑
  loading.value = true
  // 返回上传请求的结果，可以是Promise对象或其他值
  return new Promise((resolve, reject) => {
    let formData = new FormData()
    formData.append("file", file.file)
    // 请求上传接口
    imgUpload(formData)
      .then(res => {
        resolve(res)
        emit("update:imageUrl", res)
        toast.success("上传成功")
        loading.value = false
      })
      .catch(err => {
        reject(err)
        toast.error("上传失败")
        loading.value = false
        console.log("err", err)
      })
  })
}
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 150px;
  height: 150px;
  display: block;
  border-radius: 50%;
  border: 1px solid #e4e7e9;
  object-fit: contain;
}

.avatar:before {
  content: "更换头像";
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 3.5;
  bottom: 0px;
  left: 0px;
  border-radius: 50%;
  color: #fff;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.45) 0);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 0.5s;
  opacity: 0;
}

.avatar:hover:before {
  opacity: 1;
}

.avatar-uploader {
  :deep(.el-upload) {
    display: inline-block;

    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  :deep(.el-upload:hover) {
    border-color: #409eff;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  display: block;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
}

.avatar-tip {
  font-size: 8px;
  color: #969799;
}

.avatar-span {
  font-size: 10px;
  color: #155bd4;
}
</style>
