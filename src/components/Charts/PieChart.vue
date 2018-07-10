<template>
  <div :class="className1" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className1: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '90%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    },
    demoData: {
      type:Object
    }
  },
  data() {
    return {
      chart: null,
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      if (this.chartData != null && this.chartData.seriesData != null) {
        this.setOptions(this.chartData)
      } else {
        this.setOptions(this.demoData)
      }
    },

    setOptions({ legendData, seriesData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: '10',
          top: '10',
          orient: 'vertical',
          data: legendData
        },
        calculable: true,
        series: [
          {
            name: '项目名称',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            data: seriesData,

          }
        ]
      })
    }
  }
}
</script>
