const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  sysid: state => state.user.sysid,
  orgid: state => state.user.orgid,
  uposId: state => state.user.uposId,
  userName: state => state.user.userName,
  custname: state => state.user.custname,
  userstatus: state => state.user.userstatus,
  PosType: state => state.user.PosType,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  funs:state => state.user.functions,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  navmenu: state => state.user.navmenu,
  allRouters: state => state.permission.allRouters,
  dict: state => state.user.dictList,
  changeOrg: state => state.app.changeOrg,
  Uuid_formal: state => state.app.Uuid_formal,
  custNo_formal: state => state.app.custNo_formal,
  custType_formal: state => state.app.custType_formal,
  Uuid_Reg_Cust:state => state.app.Uuid_Reg_Cust,
  myname:state => state.app.myname,
  IsStrategyCustFlag:state => state.app.IsStrategyCustFlag,
  foumalData:state => state.foumalData.myFoumalDataList,//我的正式客户数据
  quikSearchData:state => state.foumalData.quickSearchList,//快速查询内容
  busDate:state => state.app.bizdate,//业务日期
}
export default getters