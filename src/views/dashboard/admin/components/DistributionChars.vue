<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
//手动导入中国地图选项 echarts不会自动自动导入 
require('echarts/map/js/china.js')

import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '465px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    randomData :function () {  
        return Math.round(Math.random()*500);  
    },

    clickProvinceMap:function(province){
    //console.log("省份:"+province.name);
    var _self=this;

    _self.$emit('clickProvinceMap',province.name);
    
    },

    initChart() {
    this.chart = echarts.init(this.$el, 'macarons')

      //添加地图选中事件 
    this.chart.on('click', this.clickProvinceMap);

      this.chart.setOption(
          {title : {
            text: '',
            subtext: '',
            x:'left'
            },
        tooltip : {
            show:true,
            trigger: 'item',
            showDelay: 20,
            hideDelay: 100
        },
        legend: {
            x:'left',
            data:[],
            textStyle: {
                fontSize: 12,
                fontWeight: 'bolder',
                color: '#333'          // 主标题文字颜色
            }
        },
        dataRange: {
           orient: 'horizontal',
           min: 0,
           max: 500,
           x: 'left',
           y: 'bottom',
           text:['高','低'],           // 文本，默认为数值文本
           calculable : false,
           splitNumber: 5,
           itemWidth: 28,
           borderWidth: 0,
           color: ['#FF9920','#1F9FF6','#67C1FF','#9AD5FF','#C0E5FF']
           },
        toolbox: {
            show: false,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        roamController: {
            show: true,
            x: 'right',
            mapTypeControl: {
                'china': true
            }
        },
    series : [
        {
        name: '',
        type: 'map',
        mapType: 'china',
        itemStyle:{
            normal:{label:{show:true}},
            emphasis:{label:{show:true}}
        },
        data:[
            {name: '北京',value: this.randomData() },{name: '天津',value: this.randomData() },  
            {name: '上海',value: this.randomData() },{name: '重庆',value: this.randomData() },  
            {name: '河北',value: this.randomData() },{name: '河南',value: this.randomData() },  
            {name: '云南',value: this.randomData() },{name: '辽宁',value: this.randomData() },  
            {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },  
            {name: '安徽',value: this.randomData() },{name: '山东',value: this.randomData() },  
            {name: '新疆',value: this.randomData() },{name: '江苏',value: this.randomData() },  
            {name: '浙江',value: this.randomData() },{name: '江西',value: this.randomData() },  
            {name: '湖北',value: this.randomData() },{name: '广西',value: this.randomData() },  
            {name: '甘肃',value: this.randomData() },{name: '山西',value: this.randomData() },  
            {name: '内蒙古',value: this.randomData() },{name: '陕西',value: this.randomData() },  
            {name: '吉林',value: this.randomData() },{name: '福建',value: this.randomData() },  
            {name: '贵州',value: this.randomData() },{name: '广东',value: this.randomData() },  
            {name: '青海',value: this.randomData() },{name: '西藏',value: this.randomData() },  
            {name: '四川',value: this.randomData() },{name: '宁夏',value: this.randomData() },  
            {name: '海南',value: this.randomData() },{name: '台湾',value: this.randomData() },  
            {name: '香港',value: this.randomData() },{name: '澳门',value: this.randomData() }  
            ]
        }
    ]
})
    }
  }
}
</script>
