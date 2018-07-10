import request from '@/utils/request'
export function kbManageQuery(query) {//知识库管理
  return request({
    url: '/osp-resourceManager/resmanager/getresourcelist',
    method: 'post',
    data: query,
  })
}
export function kbManageAdd(formData) {//知识库新增
  return request({
    url: '/osp-resourceManager/resmanager/addresourceinfo',
    method: 'post',
    data: formData,
  })
}export function kbManageEdit(formData) {//知识库修改
  return request({
    url: '/osp-resourceManager/resmanager/updateresourceinfo',
    method: 'post',
    data: formData,
  })
}

export function kbManageDel(formData) {//知识库删除
  return request({
    url: '/osp-resourceManager/resmanager/deleteresourceinfo',
    method: 'post',
    data: formData,
  })
}

