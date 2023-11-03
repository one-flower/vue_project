import request from "@/utils/request"
// 图片上传
export function imgUpload(data: any) {
  return request({
    url: "/dev-api/api/common/upload",
    method: "post",
    data: data,
  })
}
