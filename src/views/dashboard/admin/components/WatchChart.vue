<template>
  <div class="yh_watchChart" :style="{height:height,width:width}">

    <div :class="className" :style="{height:height,width:width}"></div>
    注:客户在我司证券市值占中登市值比率
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    indiListData: {
      type: String,
      default:"0"
    },
    dataName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chart: null,
      options:null,
      indiListDatanew: "0"
    };
  },
  mounted() {
    this.initChart();
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize();
    //   }
    // }, 100);
    // window.addEventListener("resize", this.__resizeHanlder);
  },
  watch: {
    indiListData: function (val) {

      this.options.series[0].data[0].value = val;
      this.chart.setOption(this.options, true);

    }
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.options={
        title : {
          text:"注:客户在我司证券市值占中登市值比率",
          x:'center',
          y:'bottom',
          padding:19,
          textStyle:{
            fontSize: 12,
            padding:-10,
            color:"#000000"
          }
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {}
        },
        textStyle: {
          color: 'auto',
          fontSize : 12
        },
        series: [
          {
            type: "gauge",
            splitNumber: 5,
            name:'钱包份额',
            detail: { formatter: "{value}%" },
            data: [{
                    value: 0,
                    name: "份额比率",
                    itemStyle:{
                      fontSize:12
                    }
                  }],

          }
        ]
      },
      this.chart.setOption(this.options);
    }
  }
};
</script>
