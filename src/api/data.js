import request from '@/utils/request'
export function fetchList() {
  // const paramdata = {
  //   "param":"CD0092",
  // }
  const data = {
    "param":["CD0092","CD0059"]
  }

 
  return request({
    url: '/osp-sysManager/dataDist/getDataDistForRedisByKey',
    method: 'post',
    data: data,
    // params:paramdata
  })
}
