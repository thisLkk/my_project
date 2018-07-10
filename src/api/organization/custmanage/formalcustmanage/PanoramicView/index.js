import request from '@/utils/request'

export function getInfo(query) {//360全景视图基本信息
  return request({
    url: '/ctc-baseInfoManager/custBasicInfo/getformalcustbaseinfo',
    method: 'post',
    data: query,
  })
}
export function getLabelInfo(query) {//360全景视图业务与部门信息
  return request({
    url: 'ctc-baseInfoManager/formalcust/getalllablebyuuid',
    method: 'post',
    data: query,
  })
}
//-------------------------------业务信息---------------------------------------
//-----------投资银行
export function getShareCustomersInfo(query) {//投行基本信息接口-股融（点击每一列调的接口）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankstkfinprjinfo',
    method: 'post',
    data: query,
  })
}
export function getShareCustomersproject(query) {//投行项目信息接口-股融tabel 都一样（股融 债融 新三板登记）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankprjlist',
    method: 'post',
    data: query,
  })
}
export function getDebtMeltsInfo(query) {//投行基本信息接口-债融（股融 债融 新三板登记）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankbondfinprjinfo',
    method: 'post',
    data: query,
  })
}
export function getDebtMeltsproject(query) {//投行项目信息接口-债融（点击每一列调的接口）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankprjlist',
    method: 'post',
    data: query,
  })
}
export function getNewThreeBoard(query) {//投行项目信息接口-新三板（股融 债融 新三板登记）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankprjlist',
    method: 'post',
    data: query,
  })
}
export function getNewThreeBoardInfo(query) {//投行项目信息接口-新三板（点击每一列调的接口）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbanknewthirdbdinfo',
    method: 'post',
    data: query,
  })
}
export function getRegister(query) {//投行项目信息接口-登记（股融 债融 新三板,登记）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankprjlist',
    method: 'post',
    data: query,
  })
}
export function getRegisterInfo(query) {//投行项目信息接口-登记（点击每一列调的接口）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankreginfo',
    method: 'post',
    data: query,
  })
}
export function getBondCustomerproject(query) {//投行项目信息接口-存续期债（股融 债融 新三板,登记）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankprjlist',
    method: 'post',
    data: query,
  })
}
export function getBondCustomerInfo(query) {//投行项目信息接口-存续期债（点击每一列调的接口）
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankholdbondinfo',
    method: 'post',
    data: query,
  })
}
export function getContinuousSupervisionInfo(query) {//投行项目信息接口-持续督导客户
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbanksuperviseinfo',
    method: 'post',
    data: query,
  })
}
export function getStrategicCooperativeCustomersInfo(query) {//投行项目信息接口-战略客户
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankstrategyinfo',
    method: 'post',
    data: query,
  })
}
export function getInvestorCustomerInfo(query) {//投行项目信息接口-投资者客户
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestbankinvsetorinfo',
    method: 'post',
    data: query,
  })
}
// -----金汇
export function getGalacticGoldenSinkInfo(query) {//投行项目信息接口-投资者客户
  return request({
    url: '/ctc-propertyManager/astsecpositiondetl/getastsecpositiondetllist',
    method: 'post',
    data: query,
  })
}
// -----研究院
export function getresearchinvestdepinfo(query) {//投资研究院——基本信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getresearchinvestdepinfo',
    method: 'post',
    data: query,
  })
}
export function getresearchorgcustdepinfo(query) {//机构客户部——基本信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getresearchorgcustdepinfo',
    method: 'post',
    data: query,
  })
}
export function getresearchcenterinfo(query) {//基金研究部——基本信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getresearchcenterinfo',
    method: 'post',
    data: query,
  })
}
// -----债券投资部
export function getinvestmentinbondsinfo(query) {//债券投资部——基本信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getinvestmentinbondsinfo',
    method: 'post',
    data: query,
  })
}
// -----衍生产品部
export function getderivativeproductinfo(query) {//衍生产品部——基本信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getderivativeproductinfo',
    method: 'post',
    data: query,
  })
}
export function getastsecpositiondetllist(query) {//衍生产品部——表格信息
  return request({
    url: '/ctc-propertyManager/astsecpositiondetl/getastsecpositiondetllist',
    method: 'post',
    data: query,
  })
}
// -----证券金融部
export function getformalcustsbaseinfo(query) {//证券金融部——普通账户
  return request({
    url: '/ctc-baseInfoManager/custBasicInfo/getformalcustbaseinfo',
    method: 'post',
    data: query,
  })
}
export function getastmarginlist(query) {//衍生产品部——两融业务
  return request({
    url: '/ctc-propertyManager/astmargin/getastmarginlist',
    method: 'post',
    data: query,
  })
}
export function getsecuritiesfinancialinfo(query) {//衍生产品部——股票质押业务
  return request({
    url: '/ctc-agreementManager/busiinfo/getsecuritiesfinancialinfo',
    method: 'post',
    data: query,
  })
}
// -----产品中心部
export function getformalcustbaseproductinfo(query) {//产品中心—基本信息
  return request({
    url: '/ctc-baseInfoManager/custBasicInfo/getformalcustbaseinfo',
    method: 'post',
    data: query,
  })
}
// -----银河保险
export function getinsurancebasicinfo(query) {//银河保险 - 基本信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getinsurancebasicinfo',
    method: 'post',
    data: query,
  })
}
export function getfamimemberlist(query) {//银河保险 - 家庭成员
  return request({
    url: '/osp-activityManager/famimember/getfamimemberlist',
    method: 'post',
    data: query,
  })
}
export function getinsuranceinsurelist(query) {//银河保险 - 保险信息
  return request({
    url: '/ctc-agreementManager/busiinfo/getinsuranceinsurelist',
    method: 'post',
    data: query,
  })
}



//-------------------------------服务团队---------------------------------------
export function addTableList(query) {//360全景视图服务团队列表新增
  return request({
    url: '/osp-sysManager/srvteam/addsrvteaminfo',
    method: 'post',
    data: query,
  })
}

/**
 * 通过客户ID编辑服务团队成员详细信息
 * @param {*} query 
 */
export function updatesrvteaminfo(query) {
  return request({
    url: '/osp-sysManager/srvteam/updatesrvteaminfo',
    method: 'post',
    data: query
  })
}

/**
 * 通过客户ID删除服务团队成员详细信息
 * @param {*} query 
 */
export function deletesrvteaminfo(query) {
  return request({
    url: '/osp-sysManager/srvteam/deletesrvteaminfo',
    method: 'post',
    data: query
  })
}

export function getTableList(query) {//360全景视图服务团队列表查询
  return request({
    url: '/osp-sysManager/srvteam/getsrvteamlist',
    method: 'post',
    data: query,
  })
}
export function mainTableList(query) {//360全景视图服务团队 设为主要
  return request({
    url: '/osp-sysManager/srvteam/setmainsrvteaminfo',
    method: 'post',
    data: query,
  })
}

export function getOrg(query) {//360全景视图服务团队 选择机构
  return request({
    url: '/osp-sysManager/orgorg/getorgteamlist',
    method: 'post',
    data: query,
  })
}
export function initOrg(query) {//360全景视图服务团队 选择机构
  return request({
    url: '/osp-sysManager/orgorg/getorgteamlistbyself',
    method: 'post',
    data: query,
  })
}


//-------------------------------联系信息---------------------------------------
export function getContactList(query) {//360全景视图 联系信息查询
  return request({
    url: '/ctc-baseInfoManager/custassocrela/getcustassocrelalist',
    method: 'post',
    data: query,
  })
}
export function geteditContactList(query) {//360全景视图 联系信息 编辑时查询数据
  return request({
    url: '/ctc-baseInfoManager/custassocrela/getcustassocrelainfo',
    method: 'post',
    data: query,
  })
}
export function editContactList(query) {//360全景视图 联系信息 编辑提交
  return request({
    url: '/ctc-baseInfoManager/custassocrela/updatecustassocrelainfo',
    method: 'post',
    data: query,
  })
}
export function addContactList(query) {//360全景视图 联系信息 新增提交
  return request({
    url: '/ctc-baseInfoManager/custassocrela/addcustassocrelainfo',
    method: 'post',
    data: query,
  })
}
export function delContactList(query) {//360全景视图 联系信息 删除提交
  return request({
    url: '/ctc-baseInfoManager/custassocrela/deletecustassocrelainfo',
    method: 'post',
    data: query,
  })
}
export function mainContactList(query) {//360全景视图 联系信息 设为主要
  return request({
    url: '/ctc-baseInfoManager/custassocrela/setmaincustassocrelainfo',
    method: 'post',
    data: query,
  })
}
//-------------------------------联系信息详细---------------------------------------
export function getContactInformationDetails(query) {//360全景视图 联系信息板块
  return request({
    url: '/ctc-baseInfoManager/custcontact/getCustContactListOsp',
    method: 'post',
    data: query,
  })
}
export function AddContactInformationDetails(query) {//360全景视图 联系信息板块 (新建)
  return request({
    url: '/ctc-baseInfoManager/custcontact/addcustcontactinfo',
    method: 'post',
    data: query,
  })
}
export function EditContactInformationDetails(query) {//360全景视图 联系信息板块 (编辑)
  return request({
    url: '/ctc-baseInfoManager/custcontact/updatecustcontactinfo',
    method: 'post',
    data: query,
  })
}
export function GetEditContactInformationDetails(query) {//360全景视图 联系信息板块 (编辑回显)
  return request({
    url: '/ctc-baseInfoManager/custcontact/getcustcontactinfo',
    method: 'post',
    data: query,
  })
}
export function DeleteContactInformationDetails(query) {//360全景视图 联系信息板块 (删除)
  return request({
    url: '/ctc-baseInfoManager/custcontact/deletecustcontactinfo',
    method: 'post',
    data: query,
  })
}

/**
 * 通过uuid查询客户联系信息
 * @param {*} query 
 */
export function getaddrlist(query) {//360全景视图 联系信息板块
  return request({
    url: 'ctc-baseInfoManager/custaddr/getaddrlist',
    method: 'post',
    data: query,
  })
}

/**
 * 地址信息新增
 * @param {*} query 
 */
export function addaddrinfo(query) {
  return request({
    url: '/ctc-baseInfoManager/custaddr/addaddrinfo',
    method: 'post',
    data: query
  })
}

/**
 * 地址信息修改
 * @param {*} query 
 */
export function updateaddrinfo(query) {
  return request({
    url: '/ctc-baseInfoManager/custaddr/updateaddrinfo',
    method: 'post',
    data: query
  })
}

/**
 * 地址信息删除
 * @param {*} query 
 */
export function deleteaddrinfo(query) {
  return request({
    url: '/ctc-baseInfoManager/custaddr/deleteaddrinfo',
    method: 'post',
    data: query
  })
}

//-------------------------------机构业务---------------------------------------
export function getOrgList(query) {//360全景视图 机构业务信息查询
  return request({
    url: '/ctc-baseInfoManager/custgrpinfo/getcustgrplist',
    method: 'post',
    data: query,
  })
}
//-------------------------------机构业务---------------------------------------
export function getCustStrategyInfo(query) {//360全景视图 机构业务信息查询
  return request({
    url: '/ctc-baseInfoManager/custstrategy/getCustStrategyInfoList',
    method: 'post',
    data: query,
  })
}
//-------------------------------活动信息---------------------------------------
export function getActityList(query) {//360全景视图 活动信息
  return request({
    url: '/osp-activityManager/activityinfo/getactivitylist',
    method: 'post',
    data: query,
  })
}
export function editActityList(query) {//360全景视图 活动信息  编辑接口
  return request({
    url: '/osp-activityManager/activityinfo/updateactivityinfo',
    method: 'post',
    data: query,
  })
}
export function addActityList(query) {//360全景视图 活动信息  新增接口
  return request({
    url: '/osp-activityManager/activityinfo/addactivityinfo',
    method: 'post',
    data: query,
  })
}
export function delActityList(query) {//360全景视图 活动信息  删除接口
  return request({
    url: '/osp-activityManager/activityinfo/deleteactivityinfo',
    method: 'post',
    data: query,
  })
}
//----------------------------------地址信息------------------------------------
export function getAddressList(query) {//360全景视图 地址信息  删除接口
  return request({
    url: '/ctc-baseInfoManager/custaddr/getaddrlist',
    method: 'post',
    data: query,
  })
}
export function geteditAddressList(query) {//360全景视图 地址信息  删除接口
  return request({
    url: '/ctc-baseInfoManager/custaddr/getaddrinfo',
    method: 'post',
    data: query,
  })
}
export function editAddressList(query) {//360全景视图 地址信息  删除接口
  return request({
    url: '/ctc-baseInfoManager/custaddr/updateaddrinfo',
    method: 'post',
    data: query,
  })
}
export function addAddressList(query) {//360全景视图 地址信息  删除接口
  return request({
    url: '/ctc-baseInfoManager/custaddr/addaddrinfo',
    method: 'post',
    data: query,
  })
}
export function delAddressList(query) {//360全景视图 地址信息  删除接口
  return request({
    url: '/ctc-baseInfoManager/custaddr/deleteaddrinfo',
    method: 'post',
    data: query,
  })
}
export function mainAddressList(query) {//360全景视图 地址信息  删除接口
  return request({
    url: '/ctc-baseInfoManager/custaddr/updateaddrinfo',
    method: 'post',
    data: query,
  })
}
//----------------------------------关联客户------------------------------------
export function getRelationList(query) {//360全景视图 关联客户  查询接口
  return request({
    url: '/ctc-baseInfoManager/relevancecus/getrelevancecuslist',
    method: 'post',
    data: query,
  })
}

/**
 * 获取oneId名单列表
 * @param {*} query 
 */
export function getAssocRelaCustList(query) {
  return request({
    url: '/ctc-baseInfoManager/custBasicInfo/getAssocRelaCustList',
    method: 'post',
    data: query
  })
}

export function editRelationList(query) {//360全景视图 关联客户  编辑接口
  return request({
    url: '/ctc-baseInfoManager/relevancecus/updatereleancecusinfo',
    method: 'post',
    data: query,
  })
}
export function addRelationList(query) {//360全景视图 关联客户  新增接口
  return request({
    url: '/ctc-baseInfoManager/relevancecus/addrelevancecusinfo',
    method: 'post',
    data: query,
  })
}
export function delRelationList(query) {//360全景视图 关联客户  新增接口
  return request({
    url: '/ctc-baseInfoManager/relevancecus/deletereleancecusinfo',
    method: 'post',
    data: query,
  })
}

//------------------------------协同列表信息-------------------------------------
export function getCollaborativeList(query) {//360全景视图 关联客户  查询接口
  return request({
    url: '/osp-cooperationManager/cooperation/getcustcoordilist',
    method: 'post',
    data: query,
  })
}

//-----------------------------获取用户岗位关系-------------------------------------
export function getUserPositionList(query) {
  return request({
    url: '/osp-sysManager/userposition/getorguserpositionlist',
    method: 'post',
    data: query,
  })
}

export function getTeamUserPositionList(query) {
  return request({
    url: '/osp-sysManager/userposition/getteamuserpositionlist',
    method: 'post',
    data: query,
  })
}

//---360视图资产信息资产汇总
export function queryAssertSumry(query) {
  return request({
    url: '/ctc-propertyManager/asset/getAssetInfo',
    method: 'post',
    data: query,
  })
}


//---360视图 查询交易明细
export function queryTransdetail(query) {
  return request({
    url: '/ctc-propertyManager/trdContrb/getTransactionInfo',
    method: 'post',
    data: query,
  })
}


//---360视图 查询客户自然属性
export function queryCustNatureProper(query) {
  return request({
    url: '/ctc-baseInfoManager/cust360/getCustNaturPro',
    method: 'post',
    data: query,
  })
}

//---360视图 查询客户扩展属性
export function queryOrgCustExtPropery(query) {
  return request({
    url: '/ctc-baseInfoManager/cust360/getOrgAccPro',
    method: 'post',
    data: query,
  })
}

//---360视图 查询客户扩展属性
export function queryPerCustExtPropery(query) {
  return request({
    url: '/ctc-baseInfoManager/cust360/getCustAccPro',
    method: 'post',
    data: query,
  })
}


//---360视图 查询客户适当性信息
export function queryCustAppropInfo(query) {
  return request({
    url: '/ctc-appropriatenessManager/custapprop/getCustViewAppropInfo',
    method: 'post',
    data: query,
  })
}


//---360视图 查询持仓信息
export function queryHoldStockInfo(query) {
  return request({
    url: '/ctc-propertyManager/astsecpositiondetl/getastsecpositiondetllist',
    method: 'post',
    data: query,
  })
}


//---360视图 查询回购
export function queryStockReBuy(query) {
  return request({
    url: '/ctc-propertyManager/astrepopositiondetl/getBuyBackInfo',
    method: 'post',
    data: query,
  })
}








