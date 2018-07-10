import Vue from 'vue';
import { dictFilter } from "@/filters";

/**
 * val 字典码
 * code 查询值
 * 查找产品字典字段
 */
Vue.filter('productFilter', (val, code) => {
    if (val && code) {
        return dictFilter(code, val);
    }
});

/**
 * val 字符转类型
 * 2018 09 22日期格式转换2018-09-22
 */
Vue.filter('filterFormatTime', (val = '') => {
    if (Object.prototype.toString.call(val) !== '[object String]' || !val){return ''}
    let separateNumArr = [[0, 4], [4, 6], [6, 8]];
    let replaceStr = ['/', '/', '']
    let str = '';
    for (let k = 0; k < separateNumArr.length; k++) {
        const num = separateNumArr[k];
        let separateStr = val.substring(num[0], num[1]);
        str += separateStr + replaceStr[k];
    };
    return str;
});