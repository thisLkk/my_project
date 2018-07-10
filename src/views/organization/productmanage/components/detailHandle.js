//产品详情处理公共方法

import {
  getPhysicalNobleMetalDetail,
  getFinancialProductDetail,
  getServiceProductDetail,
  getPledgeBuybackProductDetail,
  getProfitSwapProductDetail,
  getAstPrdHoldList
} from "@/api/organization/productmanage/index.js";

//根据产品分类和产品类型选择详情弹出界面 
export function detailShow(row) {
  //产品分类
  let pC = row.PrdClass;
  //产品类型
  let pT = row.PrdType;
  //公募基金
  //////////////////////////////////////
  //
  //
  //加入公募基金逻辑  ， 打开default
  //
  //////////////////////////////////////
  if ('020100' == pT || '020101' == pT || '020102' == pT || '060102' == pT) { //私募基金
    return 2;
  } else if ('010000' == pC || '100000' == pC || '110000' == pC) { //理财产品
    return 3;
  } else if ('020201' == pT || '020202' == pT) { //专户产品
    return 4;
  } else if ('060101' == pT || '060200' == pT || '060300' == pT) { //资管产品
    return 5;
  } else if ('080000' == pC) { //信托产品
    return 6;
  } else if ('090000' == pC) { //服务产品
    return 7;
  } else if ('140000' == pC) { //实物贵金属 
    return 8;
  } else {
    return 1;
  }




  /*        switch(pC)
          {
            //因无此几类产品  暂时关闭  
             case '1'://公募基金
             this.detailPubliclyOfferedFunds = true;
            break;
          case '2'://私募基金
             this.detailPrivatelylyOfferedFunds = true;
            break;
          case '3'://理财产品
             this.detailFinanceProducts = true;
            break;
          case '4'://专户产品
             this.detailSpecialAccount = true;
            break;
          case '5'://资管产品
             this.detailAssetsManagement = true;
            break;
          case '6'://信托产品
             this.detailEntrust = true;
            break; 
          case '090000'://服务产品
            this.detailService = true;
            break;
          case '140000'://实物贵金属 
            this.detailPreciousMetal = true;
            break;
          default://默认产品
            this.detailPubliclyOfferedFunds = true;
          }*/
}

//判断详情页所调用的接口
export function detailQuery(row) {
  let pc = row.PrdClass.substr(0, 2);
  switch (pc) {
    case '14': //贵金属
      var p = new Promise(function (resolve, reject) {
        getPhysicalNobleMetalDetailQuery(row).then(result => {
          resolve(handleNullJSON(result));
        });
      })
      break;
    case '09': //服务
      var p = new Promise(function (resolve, reject) {
        getServiceProductDetailQuery(row).then(result => {
          resolve(handleNullJSON(result));
        });
      })
      break;
    case '04': //质押式回购
      var p = new Promise(function (resolve, reject) {
        getPledgeBuybackProductDetailQuery(row).then(result => {
          resolve(handleNullJSON(result));
        });
      })
      break;
    case '07': //收益互换
      var p = new Promise(function (resolve, reject) {
        getProfitSwapProductDetailQuery(row).then(result => {
          resolve(handleNullJSON(result));
        });
      })
      break;
    default: //其他全部调用金融接口
      var p = new Promise(function (resolve, reject) {
        getFinancialProductDetailQuery(row).then(result => {
          //console.log(result, '数据------->');
          resolve(handleNullJSON(result));
        });
      })
      break;
  }
  return p;
}



//贵金属
export function getPhysicalNobleMetalDetailQuery(row) {
  let requestData = {};
  let detailQueryData = {
    param: {
      PrdId: row.PrdId, //	产品ID
      PrdCode: row.PrdCode, //		产品代码
      PrdClass: row.PrdClass, //		产品分类
      PrdType: row.PrdType, //		产品类型
      //EntityNobleMetalCate:"",//		实物贵金属类别
      SaleSys: row.SaleSys, //		销售系统
      //PayMode:"",//		支付方式
    }
  };
  var p = new Promise(function (resolve, reject) {
    getPhysicalNobleMetalDetail(detailQueryData)
      .then(response => {
        resolve(response.Data);
      })
      .catch(() => {
        this.$message.error("访问出错");
      });
  })
  return p;
}


//金融产品（通用产品）
export function getFinancialProductDetailQuery(row) {
  let detailQueryData = {
    param: {
      PrdId: row.PrdId, //	产品ID
      PrdCode: row.PrdCode, //		产品代码
      // PrdClass:row.PrdClass,//		产品分类
      // PrdType:row.PrdType,//		产品类型
      SaleSys: row.SaleSys, // 销售系统
    }
  };
  var p = new Promise(function (resolve, reject) {
    getFinancialProductDetail(detailQueryData)
      .then(response => {
        resolve(response.Data);
      })
      .catch(() => {
        this.$message.error("访问出错");
      });
  })
  return p;
}

//服务产品
export function getServiceProductDetailQuery(row) {
  let detailQueryData = {
    param: {
      PrdId: row.PrdId, //	产品ID
      PrdCode: row.PrdCode, //		产品代码
      PrdClass: row.PrdClass, //		产品分类
      PrdType: row.PrdType, //		产品类型
      //TrdChnl:"",//	交易渠道
      //Exchg:"",//	交易所
      //IndividualFlag:"",//	个人标志
      //PayMode:"",//		支付方式
    }
  };
  var p = new Promise(function (resolve, reject) {
    getServiceProductDetail(detailQueryData)
      .then(response => {
        resolve(response.Data);
      })
      .catch(() => {
        this.$message.error("访问出错");
      });
  })
  return p;
}

//质押式回购
export function getPledgeBuybackProductDetailQuery(row) {
  let detailQueryData = {
    param: {
      PrdId: row.PrdId, //	产品ID
      PrdCode: row.PrdCode, //		产品代码
      PrdClass: row.PrdClass, //		产品分类
      PrdType: row.PrdType, //		产品类型
      SaleSys: row.SaleSys, //		销售系统
      PrdSts: row.PrdSts, //产品状态
      TrdSts: row.TrdSts, //交易状态
      //TrdChnl:"",//	交易渠道
      //Exchg:"",//	交易所
      //IndividualFlag:"",//	个人标志
      //PayMode:"",//		支付方式
    }
  };
  var p = new Promise(function (resolve, reject) {
    getPledgeBuybackProductDetail(detailQueryData)
      .then(response => {
        resolve(response.Data);
      })
      .catch(() => {
        this.$message.error("访问出错");
      });
  })
  return p;
}


//收益互换
export function getProfitSwapProductDetailQuery(row) {
  let detailQueryData = {
    param: {
      PrdId: row.PrdId, //	产品ID
      PrdCode: row.PrdCode, //		产品代码
      PrdClass: row.PrdClass, //		产品分类
      PrdType: row.PrdType, //		产品类型
      //TrdChnl:"",//	交易渠道
      //Exchg:"",//	交易所
      //IndividualFlag:"",//	个人标志
      //PayMode:"",//		支付方式
    }
  };
  var p = new Promise(function (resolve, reject) {
    getProfitSwapProductDetail(detailQueryData)
      .then(response => {
        resolve(response.Data);
      })
      .catch(() => {
        this.$message.error("访问出错");
      });
  })
  return p;
}

/**
 * 获取用户名单
 * @param {*} row 单条列表数据
 */
export function getAstPrdHoldListFn(params) {
  return new Promise((resolve, reject) => {
    getAstPrdHoldList(params).then(response => {
      resolve(response);
    }).catch((err) => {
      //console.log(err);
    });
  }).catch((error) => {
    this.$message.error("访问出错");
  });
};


function handleNullJSON(obj) {
  if (obj == null || obj == 'null' || obj == '') {
    return {};
  } else {
    return obj;
  }
}
