import Cookies from 'js-cookie'
import {queryBizDate} from "@/api/login";

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zh',
    Uuid_formal:'',//----------客户UUid
    custNo_formal:'',//--------客户号
    custType_formal:'',//------客户类型
    Uuid_Reg_Cust:'',//--------注册客户点击客户之后记录UUID
    changeOrg:"机构",
    waitload:false,
    myname:"",//---------------判断360的新建
    IsStrategyCustFlag:"",//---判断是否展示战略客户
    bizdate:""//业务日期
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_UUID:(state , uuid) =>{
      state.Uuid_formal = uuid
    },
    SET_CUSTNO:(state , custNO) =>{
      state.custNo_formal = custNO;
    },

    SET_CUSTTYPE:(state , custType) =>{
      state.custType_formal = custType;
    },

    SET_UUID_REG_CUST:(state , uuid) =>{
      state.Uuid_Reg_Cust = uuid
    },
    SET_Org:(state , data) =>{
      state.changeOrg = changeOrg
    },
    SET_LOADING:(state ,loading) =>{
      state.waitload = loading
    },
    SET_MYNAME:(state,myname)=>{
      state.myname = myname
    },
    SET_ISSTRATEGYCUSTFLAG:(state,IsStrategyCustFlag)=>{
      state.IsStrategyCustFlag = IsStrategyCustFlag
    },
    SET_BIZDATE(state,bizdate){
      state.bizdate = bizdate
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setUuid({commit},uuid){//-------------------设置uuid全局
      commit('SET_UUID', uuid)
    },
    setCustNo({commit},custNo){//---------------设置custNo全局
      commit('SET_CUSTNO', custNo);
    },
    setCustType({commit},custType){//-----------设置custType全局
      commit('SET_CUSTTYPE', custType);
    },
    setMyName({commit},formal){//---------------判断是否显示360新建
      commit('SET_MYNAME', formal);
    },
    setIsStrategyCustFlag({commit},IsStrategyCustFlag){//--判断是否显示战略客户概况
      commit('SET_ISSTRATEGYCUSTFLAG', IsStrategyCustFlag);
    },
    setUuid_RegCust({commit},uuid){//----------设置uuid全局
      commit('SET_UUID_REG_CUST', uuid)
    },
    setOrg({commit},data){//-------------------设置uuid全局
      commit('SET_Org', data)
    },
    setLoading({commit},loading){//------------设置uuid全局
      commit('SET_LOADING', loading)
    },
    //拉取业务日期
    loadBizDate({
               commit
             }) {
      return new Promise((resolve, reject) => {
        var bizData={"param":"BIZ_DATE"};

        queryBizDate(bizData).then(response => {
          if(!response!=null&&response.Data!=null&&response.Data.ParamVal!=null){
            var oldDtae = response.Data.ParamVal;
            var bizDate= oldDtae.substring(0,4) + '/' + oldDtae.substring(4,6) + '/' + oldDtae.substring(6,8);
            commit('SET_BIZDATE', bizDate);
          }else{
            reject('error')
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default app
