//JSON格式转化 JSON内所有数据转为string格式 出入参均为JSON格式 
export function JSONArrayToString(obj){
  let form_data_new = {};
  for(var key in obj){
    //判断是否为JSON对象 如是 则继续递归处理
    if(typeof(obj[key]) == "object" && 
      Object.prototype.toString.call(obj[key]).toLowerCase() == "[object object]" && !obj[key].length){
      form_data_new[key]=JSONArrayToString(obj[key]);
    }else{
      form_data_new[key]=obj[key].toString();
    }
  }
  return form_data_new;
};

//JSON 赋值给JSON   忽略大小写
//示例  objIn:{"name":"","age":"","class":"4"}   objOut:{"name":"张三","age":"19","gender":"男"} ， 处理后返回为 objIn{"name":"张三","age":"19","class":"4"}
export function JSONValue2JSON(objIn,objOut){
  for(var keyOut in objOut){
    for(var keyIn in objIn){
      if(keyIn.toLowerCase() == keyOut.toLowerCase()){
        //判断是否为JSON对象 如是 则继续递归处理
        if(typeof(objIn[keyIn]) == "object" && 
          Object.prototype.toString.call(objIn[keyIn]).toLowerCase() == "[object object]" && !objIn[keyIn].length){
            JSONValue2JSON(objIn[keyIn],objOut[keyOut]);
        }else{
            objIn[keyIn] = objOut[keyOut];
          
        }
      }
    }
  }
  return objIn;
};

//JSON清空方法
export function JSONValue2Null(obj){
    for(var keyIn in obj){
        objIn[keyIn] = "";     
    }
  return obj;
};

/*--------------------------------界面不限多选方法----------------------------------------------------------*/
export function checkAllChange(val) {
    let arrLength = val.length;
      if(arrLength>1){
        if(val[arrLength-1] == ''){
          val.splice(0, arrLength-1);
        }else{
          removeByValue(val,'');
        }
      }else if(arrLength==0){
        val.push('');
      }
};

export function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
};

/** ------------------------------日期格式化 --------------------------------------------*/
export  function formatDateTime (time, format){  
      var t = new Date(time);  
      var tf = function(i){return (i < 10 ? '0' : '') + i};  
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){  
          switch(a){  
              case 'yyyy':  
                  return tf(t.getFullYear());  
                  break;  
              case 'MM':  
                  return tf(t.getMonth() + 1);  
                  break;  
              case 'mm':  
                  return tf(t.getMinutes());  
                  break;  
              case 'dd':  
                  return tf(t.getDate());  
                  break;  
              case 'HH':  
                  return tf(t.getHours());  
                  break;  
              case 'ss':  
                  return tf(t.getSeconds());  
                  break;  
          }  
      })  
  }


//数组格式转化 JSON内所有数据转为string格式 出入参均为JSON格式 

//字典码值转字典内容
//用法{{dictKeyToLabel('dictName',form_data.SearchKey)}}
/* export function dictKeyToLabel(key,value){
  //var searchKeyItems = global.get(key);
  for(var i=0; i<this.SearchKeyItems.length;++i){
      if(value == this.SearchKeyItems[i].key){
          return this.SearchKeyItems[i].value;
      }
  }
}; */




