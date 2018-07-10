import request from '@/utils/request'

/*-------------------------------------------首页相关查询------------------------------------------------*/
export function productCalendarQuery(query) {//产品查询
return request({
  url: '/osp-resourceManager/esb/getProductCalendarQuantity',
  method: 'post',
  data: query,
})
}
export function getresourcetypenumlist(query) {//知识库
  return request({
    url: '/osp-resourceManager/resmanager/getresourcetypenumlist',
    method: 'post',
    data: query,
  })
}
export function getasharemajoreventlist(query) {//事件
  return request({
    url: '/ctc-financeManager/quotedcomview/getasharemajoreventlist',
    method: 'post',
    data: query,
  })
}
export function getstocknegativenewslist(query) {//负面新闻
  return request({
    url: '/ctc-financeManager/quotedcomview/getstocknegativenewslist',
    method: 'post',
    data: query,
  })
}

export function getsorgbrkdeplist(query) {//客户指标 经营指标
  return request({
    url: '/ctc-targetManager/sorgbrkdep/getsorgbrkdeplist',
    method: 'post',
    data: query,
  })
}

export function getIndiListByIndiNos(query) {//钱包时速表
  return request({
    url: '/ctc-targetManager/custIndicator/getIndiListByIndiNos',
    method: 'post',
    data: query,
  })
}

// 通过机构查询定向产品客户分息
export function getSOrgAmbDepDirectList(data) {
  return request({
      url: '/ctc-targetManager/sorgambdepdirect/getSOrgAmbDepDirectList',
      method: 'post',
      data:data,
  })
}

// 通过机构查询承销金额客户分布数据图
export function getSOrgAmtIndiByIndiNos(datas) {
  return request({
      url: '/ctc-targetManager/custIndicator/getSOrgAmtIndiByIndiNos',
      method: 'post',
      data:datas,
  })
}

// 通过机构查询定向产品客户分布数据图
export function getSOrgQtyIndiByIndiNos(datas) {
  return request({
      url: '/ctc-targetManager/custIndicator/getSOrgQtyIndiByIndiNos',
      method: 'post',
      data:datas,
  })
}


// 通过机构号查询投行新增立项统计信息
export function getInvestBankSProjSumList(data) {
  return request({
      url: '/ctc-targetManager/investbanksprojsum/getInvestBankSProjSumList',
      method: 'post',
      data:data,
  })
}

// 通过机构查询集合产品客户信息息
export function getSOrgAmbDepSetList(data) {
  return request({
      url: '/ctc-targetManager/sorgambdepset/getSOrgAmbDepSetList',
      method: 'post',
      data:data,
  })
}
//请求有活动的日期
export function getactivitycalendarlist(data) {
  return request({
      url: '/osp-activityManager/activityinfo/getactivitycalendarlist',
      method: 'post',
      data:data,
  })
}

/**
 * 活动信息列表查询
 * @param {*} data
 */
export function getactivitylist(data) {
  return request({
    url: '/osp-activityManager/activityinfo/getactivitylist',
    method: 'post',
    data: data
  });
}

export function getCalendarEventDateList(data) {
  return request({
    url: '/osp-resourceManager/calendarevent/getCalendarEventDateList',
    method: 'post',
    data: data
  });
}

/**
 * 快速查询
 * @param data
 */
export function quickSearch(data){
    return request({
      url: '/ctc-baseInfoManager/formalcust/gethomequicksearchcustinfo',
      method: 'post',
      data:data,
    })
  }

/**
 * 获取通用指标数量
 * @param data
 */
export function queryGenerIndexNum(data){
  return request({
    url: '/ctc-targetManager/custIndicator/getPublicSOrgQtyIndiByOrgNo',
    method: 'post',
    data:data,
  })
}





