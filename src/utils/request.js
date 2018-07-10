import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import {Loading} from 'element-ui'

// create an axios instance
const SYSID = process.env.SYSID

const service = axios.create({
  baseURL: process.env.BASE_API // api的base_url
  //timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // alert(1111111111)
  // Do something before request is sent
  //console.log("getToken: " + getToken())
  //store.commit('SET_LOADING', true);

  if(config.url.indexOf("login")==-1
    &&config.url.indexOf("getPositionList")==-1
    &&config.url.indexOf("getCaptcha")==-1
    &&config.url.indexOf("getloginuserstatus")==-1){

    let loading = Loading.service({
      ///fullscreen: true,
      text: '数据加载中...',
      lock:false,
      background: 'rgba(255, 255, 255, 0.1)',
    });
  }

  if (store.getters.token) {
    // alert("gettoken存在")
    //alert(this.$store.getters.token+"--"+this.$store.getters.sysid+"==");
    //config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer ' + getToken(); //
    }
    config.headers['sysCode'] = 'OSP'; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = '123456'; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改

  if (!config.data) {
    config.data = {}
  }

  config.data.sysId = SYSID

  return config
}, error => {

  if(config.url.indexOf("login")==-1
    &&config.url.indexOf("getPositionList")==-1
    &&config.url.indexOf("getCaptcha")==-1
    &&config.url.indexOf("getloginuserstatus")==-1) {
    let loading = Loading.service({lock:false});
    setTimeout(function(){
      loading.close();
    },10);
  }
  // Do something with request error
  //console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  response => {

    let ruqesturl=response.request.custom.url;
    if(ruqesturl.indexOf("login")==-1
      &&ruqesturl.indexOf("getPositionList")==-1
      &&ruqesturl.indexOf("getCaptcha")==-1
      &&ruqesturl.indexOf("getloginuserstatus")==-1) {
      let loading = Loading.service({lock:false});
      setTimeout(function(){
        loading.close();
      },10);
    }
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    store.commit('SET_LOADING', false);
    const res = response.data

    if (response.status === 401 || (res.Meta&&res.Meta.Code == 2000)) {
      // alert("重新登录")
      MessageBox.confirm('您登录超时，请重新登录。。。。', '提示信息', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    }

    if ((res.Meta&&res.Meta.Code === 40301)) {
      Message({
        message: '当前用户无相关操作权限！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }

    if (response.status !== 200 || (res.Meta&&res.Meta.Success !== true && res.Meta.Success !== 'true')) {
      Message({
        message: res.Meta.Message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {

      let loading = Loading.service({lock:false});
      setTimeout(function(){
        loading.close();
      },10);

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export function requestHttp(url, method, reqdata) {
  return new Promise((resolve, reject) => {
    var reqparams = {
      url: url,
      method: method
    }
    // console.log("sysid:" + "1")
    //reqdata['sysId'] = store.getters.sysid
    reqdata['sysId'] = SYSID
    if (method === 'post') {
      reqparams['data'] = reqdata
    } else {
      reqparams['params'] = reqdata
    }
    service.request(reqparams).then(res => {
      var data = res
      var nerrcode = -1
      var strerrmsg = '解析格式错误'

      if (data.Meta !== undefined ||
        data.RS1 !== undefined) {
        var rethead = data.Meta
        if (data.RS1 !== undefined) {
          rethead = data.RS1[0]
        }
        if (rethead !== undefined) {
          if (rethead.Code !== undefined) {
            nerrcode = rethead.Code
            strerrmsg = rethead.Message
          } else {
            nerrcode = rethead.CODE
            strerrmsg = rethead.MSG
          }
        }
        if (nerrcode === '0' || nerrcode === 0) {
          var retdata = data.Data
          if (retdata !== undefined) {
            return resolve(retdata)
          }
        }
      }

      reject(strerrmsg)
    }).catch(error => {
      reject(error)
    })
  })
}


export function requestGet(url, reqdata) {
  return requestHttp(url, 'get', reqdata)
}

export function requestPost(url, reqdata) {
  return requestHttp(url, 'post', reqdata)
}


export function doRequestHttp(url, method, reqdata) {
  return new Promise((resolve, reject) => {
    var reqparams = {
      url: url,
      method: method
    }
    // console.log("sysid:" + SYSID)
    reqdata['sysId'] = SYSID
    if (method === 'post' || method === 'put') {
      reqparams['data'] = reqdata
    } else {
      reqparams['params'] = reqdata
    }
    service.request(reqparams).then(res => {
      var data = res
      var nerrcode = -1
      var strerrmsg = '解析格式错误'

      // console.log("res: " + JSON.stringify(res))

      if (data.Meta !== undefined) {
        return resolve(res)
      }

      reject(strerrmsg)
    }).catch(error => {
      reject(error)
    })
  })
}

export function doRequestGet(url, reqdata) {
  return doRequestHttp(url, 'get', reqdata)
}

export function doRequestPost(url, reqdata) {
  return doRequestHttp(url, 'post', reqdata)
}

export function doRequestPut(url, reqdata) {
  return doRequestHttp(url, 'put', reqdata)
}

export function doRequestDel(url, reqdata) {
  return doRequestHttp(url, 'delete', reqdata)
}

export function doRequestPage(url, reqdata, type) {
  if (type === 'post') {
    return doRequestPost(url, reqdata)
  } else {

    reqdata.PageSize = reqdata.PageInfo.PageSize
    reqdata.PageNum = reqdata.PageInfo.PageNum
    reqdata.Total = reqdata.PageInfo.Total
    reqdata.PageInfo = {}
    return doRequestGet(url, reqdata)
  }
}

export default service
