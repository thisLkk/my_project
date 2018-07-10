import request from '@/utils/request'
import { requestPost, requestGet } from '@/utils/request'

export function loginByUsername(username, password, pos,vcode) {

//登录接口调试
     const data = {
        "Param":
        {
            "sysId":process.env.SYSID,
            "uposId":pos,
            "userName":username,
            "userPwd":password,
            "Captcha" :vcode
        }
    }
/*     const data = {
        userName: username,
        userPwd: password,
        uposId: pos,
        sysId: 1
    } */
    /*
     const data = {
         username,
         password
     }
     */
    /*
     return request({
         // url: '/login/login',
         url: '/api/api/user/validate',
         method: 'post',
         params: data
     })
    */
    //console.log("login api:" + JSON.stringify(data))
    //登录接口 调试
    return request({
        // url: '/login/login',
        //url: '/rest/auth/api/authentication_pos',
        url:'/osp-sysManager/login',
        method: 'post',
        //params: data
        data: data
    })

}

export function logout() {
    return request({
        url: '/login/logout',
        // url: '/api/auth/jwt/invalid',
        method: 'post'
    })
}
// 判断正式客户管理或者的高级组件展示接口
export function getloginuserstatus() {
    return request({
        url: '/ctc-baseInfoManager/formalcust/getloginuserstatus',
        // url: '/api/auth/jwt/invalid',
        method: 'post'
    })
}

export function genCode() {
  return request({
    url: '/osp-sysManager/sysAuth/getCaptcha',
    method: 'post'
  })
}


export function getUserInfo(token) {
    return request({
        // url: '/user/info',
        url: '/osp-sysManager/getUserInfo',
        method: 'post',
        params: { token }
    })
}

export function getUserMenus(token) {
    const data = {
        token
    }

    // return requestPost('/menu/get_menus', data)
    return requestGet('/auth/menu/tree', data)
}
/** 获取用户机构 */
export function getPositionList(par) {
    return request({
        url: '/osp-sysManager/getPositionList',
        method: 'post',
        data: par
    })
}

export function queryBizDate(data) {

  return request({
    url: '/ctc-sysManager/sysParam/getSysParamForRedisByKey',
    method: 'post',
    data: data,
  })
}

