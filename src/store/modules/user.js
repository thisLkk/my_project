import {
  loginByUsername,
  logout,
  getUserInfo,
  getUserMenus,
  getloginuserstatus
} from '@/api/login'
import {
  list,
  listDictTree
} from '@/api/dataDictionary'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {encryptByDES} from "@/utils/Cryptojs";
import store from "../index";

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    sysid: '',
    orgid: '',
    uposId: '', //用户岗位id
    userName: '', //用户名字
    PosType: '', //---岗位类型（协同使用）
    userstatus: '', //---客户管理 高级字段的判断
    custname: '', //---客户管理 客户列表的客户的名称
    name: '',
    dictList: [],
    dictTreeList: [],
    avatar: '',
    introduction: '',
    roles: [],
    navmenu: [],
    setting: {
      articlePlatform: []
    },
    functions:[],//功能权限按钮
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ORGID: (state, orgid) => {
      state.orgid = orgid
    },
    SET_UPOSID: (state, uposId) => {
      state.uposId = uposId
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_SYSID: (state, sysid) => {
      state.sysid = sysid
    },
    SET_DICT_LIST: (state, data) => {
      state.dictList = data
    },
    SET_DICTTREE_LIST: (state, data) => {
      state.dictTreeList = data
    },

    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAVMENU: (state, menu) => {
      state.navmenu = menu
    },
    SET_POSTYPE: (state, PosType) => {
      state.PosType = PosType
    },
    SET_USERSTATUS: (state, userstatus) => {
      state.userstatus = userstatus
    },
    SET_CUSTNAME: (state, name) => {
      state.custname = name
    },
    SET_FUN:(state,fun)=>{
      state.functions=fun;
    }
  },

  actions: {
    // 点击客户列表保存点击的客户名称
    setcustName({ commit }, name) {
      commit('SET_CUSTNAME', name)
    },
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {

      const username = userInfo.userName.trim();
      const password = encryptByDES(userInfo.password);
      const yzm=encryptByDES(userInfo.Captcha);


      return new Promise((resolve, reject) => {
        loginByUsername(username, password, userInfo.uposId,yzm).then(response => {
          const data = response.Data
          //console.info(data);
          commit('SET_TOKEN', data[0].Token);
          commit('SET_SYSID', data[0].SysId)
          commit('SET_ORGID', data[0].User.OrgId)
          commit('SET_UPOSID', data[0].User.UposId)
          commit('SET_USERNAME', data[0].User.UserName)
          commit("SET_NAVMENU", data[0].Auth.Menus)
          commit("SET_POSTYPE", data[0].User.PosType) //---判定协同管理是否能看到审批
          commit("SET_FUN",data[0].Auth.Funcs);//功能权限

          setToken(response.Data[0].Token);
          getloginuserstatus()
            .then(response => {
              commit("SET_USERSTATUS", response.Data) //---判定客户管理的高级字段
            })
            .catch(error => {

            })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //拉取字典项缓存
    itemList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        // alert("拉取字典接口")
        list({}).then(response => {
          const data = response.Data[0]
          commit('SET_DICT_LIST', data)
          sessionStorage.setItem('DICT_LIST', JSON.stringify(data))
          resolve()
        }).then(() => {
          listDictTree({}).then(responses => {
            const data = responses.Data;
            commit('SET_DICTTREE_LIST', data)
            resolve();
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        if (state.navmenu.length == 0) {
          getUserInfo(state.token).then(response => {
            if (!response.Data[0]) { // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }
            const data = response.Data
            commit('SET_TOKEN', data[0].Token);
            commit('SET_ROLES', 'admin')
            commit('SET_SYSID', data[0].SysId)
            commit("SET_NAVMENU", data[0].Auth.Menus)
            commit('SET_ORGID', data[0].User.OrgId)
            commit('SET_UPOSID', data[0].User.UposId)
            commit('SET_USERNAME', data[0].User.UserName)
            commit("SET_POSTYPE", data[0].User.PosType) //---判定协同管理是否能看到审批
            commit("SET_FUN",data[0].Auth.Funcs);//功能权限

            getloginuserstatus()
              .then(response => {
                commit("SET_USERSTATUS", response.Data) //---判定客户管理的高级字段
              })
              .catch(error => {

              })
            resolve()
          }).catch(error => {
            reject(error)
          })
        } else {
          commit('SET_ROLES', 'admin')
          resolve()
        }

      })

      /*
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', 'admin')
      resolve()
    })
      */
    },

    // 获取用户信息
    GetUserMenus({
      commit,
      state
    }) {

      // console.info("22222222222");

      return new Promise((resolve, reject) => {
        var response = {
          results: state.navmenu
        }
        // console.log("state:" + JSON.stringify(state));

        resolve(response)
        /*
        getUserMenus().then(response => {
          //commit('SET_NAVMENU', response)
          commit('SET_NAVMENU', response.results)
          console.log('get menu:' + JSON.stringify(response))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        */
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     /*
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       commit('SET_NAVMENU', undefined)
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })*/
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     commit('SET_NAVMENU', undefined)
    //     removeToken()
    //     resolve()
    //   })
    // },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAVMENU', undefined)
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
