import request from '@/utils/request'
// 协同管理——协同商机管理——我的协同商机
//-------------------------------初始查询（发起）---------------------------------------
export function getCoordibusopprele(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getcoordibusopprelelist',
    method: 'post',
    data: query,
  })
}
//-------------------------------提交申请（发起）---------------------------------------
export function releaseBusoppstate(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/updatebusoppstate',
    method: 'post',
    data: query,
  })
}
//-------------------------------回显（发起）---------------------------------------
export function EchoMyCollaboration(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getcoordibusoppinfo',
    method: 'post',
    data: query,
  })
}



