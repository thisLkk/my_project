import request from '@/utils/request'
// 注册
export function GetRegisteList(query) {
  return request({
    url: '/ctc-baseInfoManager/registercusmanage/getmycuslistsyno',
    method: 'post',
    data: query,
    // params:paramdata
  })
}
// 关联客户
export function GetFormalList(query) {
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsynergymyformalcustlist',
    method: 'post',
    data: query,
    // params:paramdata
  })
}
// 关联客户分页
export function GetFormalListcount(query) {
  return request({
    url: '/ctc-baseInfoManager/formalcust/getsynergymyformalcustlistcount',
    method: 'post',
    data: query,
    // params:paramdata
  })
}
// 正式客户
export function GetMyFormalList(query) {
  return request({
    url: '/ctc-baseInfoManager/formalcust/getjurisdictionformalcustlist',
    method: 'post',
    data: query,
    // params:paramdata
  })
}
// 正式客户的分页
export function GetMyFormalCount(query) {
  return request({
    url: '/ctc-baseInfoManager/formalcust/getjurisdictionformalcustlistcount',
    method: 'post',
    data: query,
    // params:paramdata
  })
}
