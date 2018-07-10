import request from '@/utils/request'
// --------------------------------------我团队客户-----------------------------------------------
export function FormalQuery(query) {// 数据查询请求接口
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsimpleformalcustlist',
    method: 'post',
    data: query,
  })
}
// --------------------------------------我机构客户-----------------------------------------------
export function OrgFormalQuery(query) {// 数据查询请求接口
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsimpleformalcustlist',
    method: 'post',
    data: query,
  })
}
// --------------------------------------全部客户-----------------------------------------------
export function AllFormalQuery(query) {// 数据查询请求接口
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsimpleformalcustlist',
    method: 'post',
    data: query,
  })
}
// --------------------------------------添加分组-----------------------------------------------
export function CtcLabelManager(query) {//添加分组
  return request({
    url: '/ctc-baseInfoManager/custgrpinfo/addcustgrpinfo',
    method: 'post',
    data: query,
  })
}
export function seniorformalquery(query) {//我的正式客户 高级请求
  return request({
    url: '/ctc-baseInfoManager/formalcust/getformalcustlist',
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

