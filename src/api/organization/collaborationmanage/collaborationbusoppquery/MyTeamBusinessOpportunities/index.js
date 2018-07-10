import request from '@/utils/request'
// 协同管理——协同商机管理——我团队的协同商机
//-------------------------------初始查询（发起）---------------------------------------
export function getMyTeamLaunchList(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getorgteamcoordibusoppreqlist',
    method: 'post',
    data: query,
  })
}
//-------------------------------初始查询（承办）---------------------------------------
export function getMyTeamUndertakeList(query) {//
  return request({
    url: '/osp-cooperationManager/cooperation/getorgteamcoordibusoppreslist',
    method: 'post',
    data: query,
  })
}


