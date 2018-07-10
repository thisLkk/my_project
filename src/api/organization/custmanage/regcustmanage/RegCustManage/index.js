import request from '@/utils/request'
export function regCustManageQuery(query) {//我的注册客户查询
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/getmycuslist',
      method: 'post',
      data: query,
    })
  }
  export function regCustDepQuery(query) {//团队注册客户查询
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/getdepcuslist',
      method: 'post',
      data: query,
    })
  }
  export function regCustOrgQuery(query) {//机构注册客户查询
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/getorgcuslist ',
      method: 'post',
      data: query,
    })
  }
  export function regCustAllQuery(query) {//全部注册客户查询
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/getallcuslist',
      method: 'post',
      data: query,
    })
  }

  export function regCustManageDelete(query) {//注册客户管理删除
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/deleteregcus',
      method: 'post',
      data: query,
    })
  }


  export function regCustManageSqzz(query) {//申请转正
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/regcusqualified',
      method: 'post',
      data: query,
    })
  }
  
  export function getInfoBySktCood(query) {//根据证券代码获取证券信息
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/getinfobysktcood',
      method: 'post',
      data: query,
    })
  }
  
  
  export function regCustManageReg(query) {//注册客户管理注册
    return request({
      url: '/ctc-baseInfoManager/registercusmanage/regcus',
      method: 'post',
      data: query,
    })
  }
  
  export function regCustManageGetInfo(query) {//得到客户基本信息 参数为uuid
    return request({
      url: '/ctc-baseInfoManager/custPotentialBasicInfo/getpotentialcustbaseinfo',
      method: 'post',
      data: query,
    })
  }

  export function regCustManageGetInfoLabel(query) {//得到客户基本信息 参数为uuid
    return request({
      url: '/ctc-baseInfoManager/businesslabel/getbusinesslabel',
      method: 'post',
      data: query,
    })
  }
  
  export function regCustManageGetInfoPotentialOrg(query) {//得到客户扩展信息 参数为uuid
    return request({
      url: '/ctc-baseInfoManager/custpotentialorginfo/getcustpotentialorginfo',
      method: 'post',
      data: query,
    })
  }
  
  export function regCustInfoDetailSave(query) {//注册客户管理注册
    return request({
      url: '/ctc-baseInfoManager/custpotentialorginfo/updatecustpotentialinfo',
      method: 'post',
      data: query,
    })
  }
  