import request from '@/utils/request'
export function myformalquery(query) {//我的战略客户 简单请求
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsimpleformalcustlist',
    method: 'post',
    data: query,
  })
}
export function seniorformalquery(query) {//我的战略客户 高级请求
  return request({
    url: '/ctc-baseInfoManager/formalcust/getformalcustlist',
    method: 'post',
    data: query,
  })
}
export function addformalcus(query) {//战略客户新增
  return request({
    url: '/ctc-baseInfoManager/formalcust/addformalcus',
    method: 'post',
    data: query,
  })
}
export function ctcLabelManager(query) {//添加分组
  return request({
    url: '/ctc-baseInfoManager/custgrpinfo/addcustgrpinfo',
    method: 'post',
    data: query,
  })
}
export function addService(query) {//添加服务记录
  return request({
    url: '/osp-activityManager/activityinfo/addactivityinfo',
    method: 'post',
    data: query,
  })
}
export function fastSearch(query) {//快速搜索
  return request({
    url: '/ctc-baseInfoManager/formalcust/getformalcustlistquicksearch',
    method: 'post',
    data: query,
  })
}
export function fastSearchPage(query) {//快速搜索分页
  return request({
    url: '/ctc-baseInfoManager/formalcust/getformalcustlistquicksearchcount',
    method: 'post',
    data: query,
  })
}
export function myformalqueryPage(query) {//基础分页查询
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsimpleformalcustlistcount ',
    method: 'post',
    data: query,
  })
}

