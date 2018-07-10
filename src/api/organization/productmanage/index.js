import request from '@/utils/request'

/*-------------------------------产品查询------------------------------------------------*/ 
export function productListQuery(query) {//产品查询
  return request({
    url: '/osp-resourceManager/esb/getProductListInformation',
    method: 'post',
    data: query,
  })
}

/**------------------------------------重点产品销售----------------------------------------- */
export function getImportProductList(query) {
  return request({
    url: '/osp-resourceManager/esb/getImportProductList',
    method: 'post',
    data: query,
  })
}

/**----------------------------------产品详情---------------------------------------- */
//实物贵金属
export function getPhysicalNobleMetalDetail(query) {
  return request({
    url: '/osp-resourceManager/esb/getPhysicalNobleMetalDetail',
    method: 'post',
    data: query,
  })
}

//服务产品 
export function getServiceProductDetail(query) {
  return request({
    url: '/osp-resourceManager/esb/getServiceProductDetail',
    method: 'post',
    data: query,
  })
}

//金融产品 
export function getFinancialProductDetail(query) {
  return request({
    url: '/osp-resourceManager/esb/getFinancialProductDetail',
    method: 'post',
    data: query,
  })
}

//质押式回购
export function getPledgeBuybackProductDetail(query) {
  return request({
    url: '/osp-resourceManager/esb/getPledgeBuybackProductDetail',
    method: 'post',
    data: query,
  })
}

//收益互换 
export function getProfitSwapProductDetail(query) {
  return request({
    url: '/osp-resourceManager/esb/getProfitSwapProductDetail',
    method: 'post',
    data: query,
  })
}

/**
 * 查询持有用户名单
 */
 export function getAstPrdHoldList(query) {
    return request({
      url: '/ctc-propertyManager/astprdholdd/getAstPrdHoldList',
      method: 'post',
      data: query
    });
 };