import request from '@/utils/request'
export function babManageQuery(query) {//业务通讯录管理
  return request({
    url: '/osp-resourceManager/resmanager/getresourcelist',
    method: 'post',
    data: query,
  })
}
export function babManageAdd(formData) {//业务通讯录新增
  return request({
    url: '/osp-resourceManager/resmanager/addresourceinfo',
    method: 'post',
    data: formData,
  }) 
}export function babManageEdit(formData) {//业务通讯录修改
  return request({
    url: '/osp-resourceManager/resmanager/updateresourceinfo',
    method: 'post',
    data: formData,
  })
}

export function babManageDel(formData) {//业务通讯录删除
  return request({
    url: '/osp-resourceManager/resmanager/deleteresourceinfo',
    method: 'post',
    data: formData,
  })
}

export function getappendixbyassocId(formData) {//获取附件信息
  return request({
    url: '/osp-sysManager/appendix/getappendixbyassocId',
    method: 'post',
    data: formData,
  })
}

export function downloadappendix(batchNo) {//下载附件信息
  return request({
    url: "/osp-sysManager/appendix/downloadappendix?batchNo="+batchNo,
    method: 'get',
    data: null,
  })
}

export function deleteappendix(formData) {//删除附件信息
  return request({
    url: "/osp-sysManager/appendix/deleteappendix",
    method: 'post',
    data:formData,
  })
}