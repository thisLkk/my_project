import request from '@/utils/request'
export function InstBusTargetCustMerQuery(query) {//目标机构客户查询
  return request({
    url: '/ctc-baseInfoManager/custgrpinfo/getcustgrplist',
    method: 'post',
    data: query,
  })
}

export function SaveInstBusTargetCust(query) {//机构目标客户新建
  return request({
    url: '/ctc-baseInfoManager/custgrpinfo/addcustgrpinfo',
    method: 'post',
    data: query,
  })
}


export function queryMoreCustInfo(query) {//查询更多客户信息
  return request({
    url: '/ctc-baseInfoManager/custgrpinfo/getgrpcustlist',
    method: 'post',
    data: query,
  })
}


