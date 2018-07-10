
const foumalData = {
  state: {
    myFoumalDataList:"",//储存的是（我的正式客户）的数据
    quickSearchList:[],//首页快速查询内容
  },
  mutations: {
    SET_MYFOUMALDATALIST:(state ,myFoumalDataList) =>{
        // alert(1)
      state.myFoumalDataList = myFoumalDataList
    },
    SET_QUICKSEARCHLIST:(state ,searchData) =>{
      state.quickSearchList = searchData
    },
  },
  actions: {
    setMyFoumalDataList({ commit }, myFoumalDataList) {
      commit('SET_MYFOUMALDATALIST', myFoumalDataList)
    },
    setQuicksearchlist({ commit }, searchData) {
      commit('SET_QUICKSEARCHLIST', searchData);
    },
  }

}

export default foumalData
