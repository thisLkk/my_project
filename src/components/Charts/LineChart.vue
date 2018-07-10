<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const colorMap = ['#3888FA', '#FF005A']

export default {
  name:'LineChart',
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      demoData: {
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [
          { name: 'expected', data: [100, 120, 161, 134, 105, 160, 165] },
          { name: 'actual', data: [120, 82, 91, 154, 162, 140, 145] }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ xAxisData, seriesData } = {}) {
      var series = []

      var legendData = []
      for (var i in seriesData) {
        var item = {
          name: '',
          type: 'line',
          smooth: true,
          data: [],
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          }
        }

        item.name = seriesData[i].name
        item.data = seriesData[i].data
        item.itemStyle.normal.color = colorMap[i % colorMap.length]
        item.itemStyle.normal.lineStyle.color = colorMap[i % colorMap.length]
        series.push(item)

        legendData.push(item.name)
      }
      this.chart.setOption({
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: legendData
        },
        series: series
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      if (this.chartData != null && this.chartData.xAxisData != null) {
        this.setOptions(this.chartData)
      } else {
        this.setOptions(this.demoData)
      }
    }
  }
}
</script>
