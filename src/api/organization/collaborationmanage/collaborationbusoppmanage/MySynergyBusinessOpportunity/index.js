import request from '@/utils/request'
// 协同管理——协同商机管理——我的协同商机
//-------------------------------初始查询（发起）---------------------------------------
export function getMyCollaboration(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getcoordibusoppreqlist',
    method: 'post',
    data: query,
  })
}
//-------------------------------新增（发起）---------------------------------------
export function AddMyCollaboration(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/addcoordibusopp',
    method: 'post',
    data: query,
  })
}
//-------------------------------取消 提交 重新提交 审批 办结 的回显（发起）---------------------------------------
export function EchoMyCollaboration(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getcoordibusoppinfo',
    method: 'post',
    data: query,
  })
}
//-------------------------------取消 提交 重新提交 办结 审批 从新确定按钮（发起）---------------------------------------
export function CancelMyCollaboration(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/updatebusoppstate',
    method: 'post',
    data: query,
  })
}
//-------------------------------查询列表（承办）---------------------------------------
export function GetUndertakeList(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getcoordibusoppreslist',
    method: 'post',
    data: query,
  })
}
//-------------------------------应答回显（承办）---------------------------------------
export function UnderAnswerList(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getcoordibusoppinfo',
    method: 'post',
    data: query,
  })
}
//-------------------------------应答提交（承办）---------------------------------------
export function UnderAnswerEdit(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/updatebusoppstate',
    method: 'post',
    data: query,
  })
}
//-------------------------------应答提交（承办）---------------------------------------
export function UnderProgressEdit(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/insertprogressreginfo',
    method: 'post',
    data: query,
  })
}
//-------------------------------商机名称总组件---------------------------------------
export function UnderProgressEdit1(query) {
  return request({
    url: '/osp-cooperationManager/cooperation/insertprogressreginfo',
    method: 'post',
    data: query,
  })
}
//-------------------------------进展详情---------------------------------------
export function getProgressList(query) {
  return request({
    url: '/osp-cooperationManager/cooperation/getprogressreglist',
    method: 'post',
    data: query,
  })
}


