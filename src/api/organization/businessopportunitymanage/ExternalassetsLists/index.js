import request from '@/utils/request'
export function GetInfo(query) {//目标机构客户查询
  return request({
    url: '/ctc-financeManager/astd/getastdtoplist',
    method: 'post',
    data: query,
  })
}

export function GetInfoCount(query) {//统计查询
  return request({
    url: '/ctc-financeManager/astd/getAstDTopListCount',
    method: 'post',
    data: query,
  })
}





