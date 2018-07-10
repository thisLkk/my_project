import {
  getDict,
  getDictObj,
  getTreeDictObject,
  getFunObject,
  getMenuObject
} from '@/utils'

export function dictFilter(key, code) {
  return getDict(key, code)
}

export function dictItems(code) {
  //return objproptoarry(getDictObj(code));
  // conolse.info(getDictObj(code));
  return getDictObj(code);
}

export function treeDictItems(code) {
  return getTreeDictObject(code);
}

export function hasFuntion(funcode) {
  let funobj = getFunObject(funcode);
  if (funobj) {
    return true;
  } else {
    return false;
  }
}

export function hasMenuItem(menucode) {
  let menuitem = getMenuObject(menucode);
  if (menuitem.length > 0) {
    return true;
  } else {
    return false;
  }
}


function objproptoarry(obj) {
  var arr = []
  if (obj) {
    for (var i in obj) {
      var dict = {};
      dict["label"] = obj[i];
      dict["value"] = i;
      arr.push(dict);
    }
  }
  return arr;
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * time 中国过标准时间
 * 中国过标准时间转化格式 => yyyymmdd
 */
export function standardTiemChenge(time) {
  if (Object.prototype.toString.call(time) !== "[object Date]" || !time) {
    return ''
  }
  let data = new Date(time);
  let Y = data.getFullYear();
  let M = data.getMonth() + 1 > 10 ? data.getMonth() + 1 : `0${data.getMonth() + 1}`;
  let D = data.getDate() > 10 ? data.getDate() : `0${data.getDate()}`;
  let timeNum = `${Y}${M}${D}`;
  return timeNum;
};

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [{
      value: 1E18,
      symbol: 'E'
    },
    {
      value: 1E15,
      symbol: 'P'
    },
    {
      value: 1E12,
      symbol: 'T'
    },
    {
      value: 1E9,
      symbol: 'G'
    },
    {
      value: 1E6,
      symbol: 'M'
    },
    {
      value: 1E3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * str 0:100|0|0.6#100:+|0|0.4#100:+|0|0.4#0:+|0|0#0:100|0|0.6
 * markKey 区分是金钱还是天数 money => 金钱
 * 解析认购金额复杂的字符串 0:100|0|0.6#100:+|0|0.4#100:+|0|0.4#0:+|0|0#0:100|0|0.6
 */
export function amountFormat(str = '', markKey = 'money') {
  if (!str) return [];
  let strategiesCode = ['固定比例', '单笔金额'];
  let startArr = [];
  let newArr = [];
  startArr = str.split('#');
  let subStr = new RegExp(':');
  let mark = markKey === 'money' ? ' M ' : ' Y ';
  for (let key = 0; key < startArr.length; key++) {
    let strk = startArr[key];
    let strkey = '';
    let strArr = [];
    let strObj = {};
    if (strk.indexOf('-') >= 0) {
      if (strk.indexOf('-') > 1) {
        strkey = strk.replace(subStr, ' ≥ ').replace(/\-/g, mark);
      } else {
        strkey = strk.replace(subStr, ' ≤ ').replace(/\-/g, mark);
      }
    } else if (strk.indexOf('+') >= 0) {
      if (strk.indexOf('+') > 1) {
        strkey = strk.replace(subStr, ' ≤ ').replace(/\+/g, mark);
      } else {
        strkey = strk.replace(subStr, '≥').replace(/\+/g, mark);
      }
    } else {
      strkey = strk.replace(subStr, ` ≤ ${mark} < `);
    };
    strArr = strkey.split('|');
    strObj.amount = strArr[0] || '';
    strObj.strategies = strategiesCode[strArr[1]] || '';
    strObj.rates = strategiesCode[strArr[1]] === '单笔金额' ? strArr[2] + '元/笔' || '' : strArr[2] || '';
    newArr.push(strObj);
  };
  return newArr;
}

/**
 * 判断对象是否有值
 * obj {}
 */
export function isObj(obj = {}) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return true
  }
  for (let key in obj) {
    return true;
  };
  return false;
}
/**
 * 验证 orgid 能看的权限(业务信息使用name)
 */
export function OrgIdPower(orgid, name, code) {
  const data = {
    orgid: "",
    name: "",
    code: '',
    isShow: false, //-----判断业务是否可以展示
    isShowTabs: false, //--超级管理员能看全部tabs与部门
  }
  var orgidNow = String(orgid).substring(0, 4);
  if (orgidNow == "8007" || orgidNow == "8160" || orgidNow == "8170" || orgidNow == "8280" || orgidNow == "8301" || orgidNow == "8302" || orgidNow == "8303" || orgidNow == "8304" || orgidNow == "8305" || orgidNow == "8306" || orgidNow == "8311" || orgidNow == "8312" || orgidNow == "8313" || orgidNow == "8314" || orgidNow == "8315" || orgidNow == "8316" || orgidNow == "8317") {
    data.isShow = true;
    data.name = "InvestmentBank"; //-------投资银行
    data.orgid = orgid;
  } else if (orgidNow == "8001") {
    data.isShow = true;
    data.name = "Jinhui"; //---------------金汇8001
    data.orgid = orgid;
  } else if (orgidNow == "8318") {
    data.isShow = true;
    data.name = "Research"; //-------------研究院8318
    data.orgid = orgid;
  } else if (orgidNow == "8200") {
    data.isShow = true;
    data.name = "BondInvestment"; //------债券投资部8200
    data.orgid = orgid;
  } else if (orgidNow == "8210") {
    data.isShow = true;
    data.name = "Derivatives"; //--------衍生产品部8210
    data.orgid = orgid;
  } else if (orgidNow == "8150") {
    data.isShow = true;
    data.name = "Securities"; //---------证券金融总部8150
    data.orgid = orgid;
  } else if (orgidNow == "8260") {
    data.isShow = true;
    data.name = "Product"; //---------产品中心8260
    data.orgid = orgid;
  } else if (orgidNow == "9020") {
    data.isShow = true;
    data.name = "Futures"; //---------银河期货9020
    data.orgid = orgid;
  } else if (orgidNow == "B010") {
    data.isShow = true;
    data.name = "Insurance"; //---------银河保险B010
    data.orgid = orgid;
  } else if (orgidNow == "0000") {
    data.isShowTabs = true; //----------超级权限 
    data.isShow = true;
    data.orgid = orgid;
  }
  return data
}
/**
 * 当前时间，
 * 转为为时间年月日与时分秒
 * 
 */
export function DateChange(isYearOrTime) {
  var nowTime = new Date();
  switch (isYearOrTime) {
    case "year":

      break;
    case "time":
      const year = nowTime.getFullYear(); //----获取系统的年；
      var month = nowTime.getMonth() + 1; //--获取系统月份，由于月份是从0开始计算，所以要加1
      const date = nowTime.getDate(); // -------获取系统日，
      const hours = nowTime.getHours(); //------获取系统时，
      const minutes = nowTime.getMinutes(); //--分
      const seconds = nowTime.getSeconds(); //--秒
      if (month < 10) {
        month = "0" + month;
      }
      const Time = year + "-" + month + "-" + date + "-" + hours + "-" + minutes + "-" + seconds;
      return Time;
      break;
    case "tom":
      const nowTimeTom = new Date(nowTime.setDate(nowTime.getDate() + 1));
      const year1 = nowTimeTom.getFullYear(); //----获取系统的年；
      var month1 = nowTimeTom.getMonth() + 1; //--获取系统月份，由于月份是从0开始计算，所以要加1
      const date1 = nowTimeTom.getDate(); // -------获取系统日，
      const hours1 = nowTimeTom.getHours(); //------获取系统时，
      const minutes1 = nowTimeTom.getMinutes(); //--分
      const seconds1 = nowTimeTom.getSeconds(); //--秒
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      const Time1 = year1 + "-" + month1 + "-" + date1 + "-" + hours1 + "-" + minutes1 + "-" + seconds1;
      return Time1;
      break;


    default:
      break;
  }


}

/**
 * val 字符转类型
 * 2018 09 22日期格式转换2018/09/22
 */
export function filterFormatTime(val) {
  if (Object.prototype.toString.call(val) !== '[object String]' || !val) {
    return ''
  }
  let separateNumArr = [
    [0, 4],
    [4, 6],
    [6, 8]
  ];
  let replaceStr = ['-', '-', '']
  let str = '';
  for (let k = 0; k < separateNumArr.length; k++) {
    const num = separateNumArr[k];
    let separateStr = val.substring(num[0], num[1]);
    str += separateStr + replaceStr[k];
  };
  return str;
}
