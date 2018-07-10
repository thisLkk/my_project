/**
 * Created by jiachenpan on 16/11/18.
 */
import store from '@/store'
import Constants from '@/utils/Constants.js';



/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export  function formatCurrency(num) {
  if(!num){
    return "0";
  }
  num = num.toString().replace(/\$|\,/g,'');
  if(isNaN(num)||num=='0')
    num = "0";
  var  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  var cents = num%100;
  num = Math.floor(num/100).toString();
  if(cents<10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
      num.substring(num.length-(4*i+3));
  return (((sign)?'':'-') + num + '.' + cents);
}

export function formatThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
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

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    //console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


export function getTreeDictObject(code) {

  let treeDict=store.state.user.dictTreeList;
  let result=[];
  deepFindChild(treeDict,code,result);

  return result;
}

function deepFindChild(cont,dictype,result){

        if(cont&&cont.length>0){
          if(dictype){
            cont.forEach(function(value,index,array){
              if(value.ParentId==dictype){
                let dict={};
                dict.label=value.Name;
                dict.value=value.CodeVal;
                result.push(dict);
              }
              deepFindChild(value.Children,dictype,result);
            });
          }else{
            cont.forEach(function(value,index,array){
              let dict={};
              dict.label=value.Name;
              dict.value=value.CodeVal;
              result.push(dict);
            });
          }
        }else{
          return ;
        }
}


export function getFunObject(funcode) {
  let funs=store.state.user.functions;
  for(var i=0;i<funs.length;i++){
    if(funs[i].FuncObj==funcode){
      return funs[i];
    }
  }
  return null;
}

export function getMenuObject(funmenu) {

  let funs=store.state.user.navmenu;
  let result=[];
  deepFindMenu(funs,funmenu,result);
  return result;

}

function deepFindMenu(cont,menucode,result){

  if(cont&&cont.length>0){
    if(menucode){
      cont.forEach(function(value,index,array){
        if(value.Code==menucode){
          let menu={};
          menu.code=value.Code;
          menu.title=value.Title;
          result.push(menu);
        }
        deepFindMenu(value.Children,menucode,result);
      });
    }else{
      cont.forEach(function(value,index,array){
        let menu={};
        dict.code=value.Code;
        dict.title=value.Title;
        result.push(menu);
      });
    }
  }else{
    return ;
  }
}




export function getDict(key, code) {
  /*
  let distList
  if (store && store.state.user.dictList.length !== 0) {
    distList = store.state.user.dictList
    return distList[0][code][key]
  }
  */
  //console.info(store.state.user.dictList);
  // let distList
  // if (store && store.state.user.dictList[key]) {
  //   distList = store.state.user.dictList
  //
  //   return distList[key][code]
  // }
  // return ''
  let distList
  if (store && store.state.user.dictList[key]) {
    distList = store.state.user.dictList
    var obj = distList[key]
    for (var i in obj) {
      if( obj[i].value == code){
        return obj[i].label
      }
    }
  }
  return ''
}


export function getDictObj(code) {

  // console.info(store.state.user.dictList);
  let distList
  if (store && store.state.user.dictList.length !== 0) {
    distList = store.state.user.dictList
    return distList[code]
  }
  return ''
}

export function dictSets(code) {
  let distList = []
  /*
  if (store && store.state.user.dictList.length !== 0) {
    var dist = store.state.user.dictList[0][code]
    for (var item in dist) {
      distList.push({ key: item, value: dist[item] })
    }
  }
  */
  //console.log("dictList:" + JSON.stringify(store.state.user.distList))
  if (store && store.state.user.dictList[code]) {
    var dist = store.state.user.dictList[code]
    for (var item in dist) {
      distList.push({ key: item, value: dist[item] })
    }
  }
  //console.log("dictList:" + JSON.stringify(distList))
  return distList
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

//判断当前登陆人是不是经管总部
export function isJgzb(){

  return this.$store.getters.orgid == Constants.JJYWZBGLY;

}
