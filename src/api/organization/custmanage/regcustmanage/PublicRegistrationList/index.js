import request from '@/utils/request'
//上市公司
export function listedcompanyquery(param) {
  return request({
    url: '/ctc-baseInfoManager/registercusmanage/getquotcomlist',
    method: 'post',
    data: param,
  })
}

//查询明细信息
export function listedCompanyqueryDetail(param) {
  return request({
    url: '/ctc-baseInfoManager/custPotentialBasicInfo/getpotentialcustbaseinfo',
    method: 'post',
    data: param,
  })
}

//注册客户信息
export function rigsterCompyInfo(param) {
  return request({
    url: '/ctc-baseInfoManager/registercusmanage/regcus',
    method: 'post',
    data: param,
  })
}


//投行潜客
export function submersiblequery(param) {
  return request({
    url: '/ctc-baseInfoManager/registercusmanage/getinbkpotcuslist',
    method: 'post',
    data: param,
  })
}

