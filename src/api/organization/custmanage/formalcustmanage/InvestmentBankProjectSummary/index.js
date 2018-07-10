import request from '@/utils/request'
//在会/在审项目--数据表格
export function meetAndtrialProjectTableData(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/getmeetingstockprolist',
    method: 'post',
    data: param
  })
}
//在会/在审项目--统计图表
export function meetAndtrialProjectEchartsData(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/echartsmeetingstockprolist',
    method: 'post',
    data: param
  })
}
//新增立项项目--数据表格
export function newProjectTableData(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/getnewstockprolist',
    method: 'post',
    data: param
  })
}
//新增立项项目--统计图表
export function newProjectEchartsData(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/echartnewstockprolist',
    method: 'post',
    data: param
  })
}
//新增类核项目--数据表格
export function newClassCoreTableData(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/getcoreproinfo',
    method: 'post',
    data: param
  })
}
//新增类核项目--统计图表
export function newClassCoreEchartsData(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/echartscoreproinfo',
    method: 'post',
    data: param
  })
}
//立项情况统计
export function statusStatistics(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/getcasestatisticsinfo',
    method: 'post',
    data: param
  })
}
//立项情况统计合计
export function statusStatisticsTotal(param) {
  return request({
    url: '/ctc-targetManager/investmentcollect/getcasestatisticssum',
    method: 'post',
    data: param
  })
}
