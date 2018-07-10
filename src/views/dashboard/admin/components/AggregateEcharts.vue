<template>
  <div class="boxs">
    <div class="AggregateEcharts-Box">
      <h3>集合产品客户分布</h3>
    </div>
    <div id="Chartsx" style="width:400px;height:307px" >
    </div>
  </div>
</template>

<script>
var options ={
      tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "right",
            data: ["金融机构", "一般机构", "高净值", "普通经济客户"]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["30%", "50%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "16",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 1, name: "金融机构" },
                { value: 2, name: "一般机构" },
                { value: 3, name: "高净值" },
                { value: 4, name: "普通经济客户" }
              ]
            }
          ]

  
}
  import { getSOrgQtyIndiByIndiNos } from "@/api/organization/dashboard/index.js";
  import echarts from "echarts";
  export default {
    name: "AggregateEcharts",
    data() {
      return {

        responseData: null,
        query: {
          param: {
            indiNos: ["00280004", "00280005", "00280006"]
          }
        }
      };
    },
    mounted() {
      this.drawLinesx();
    },
    methods: {
      drawLinesx() {

        var legendDatas=new Array();
        var seriesDatas=new Array();
        var mycharOptions=options;

        getSOrgQtyIndiByIndiNos(this.query)
          .then(response => {
            this.responseData = response.Data;


                response.Data.forEach(element => {
                legendDatas.push(element.IndiName);
                seriesDatas.push({value:element.PrsntVal,name:element.IndiName});
              });
      
          mycharOptions.legend.data=legendDatas;
          mycharOptions.series[0].data=seriesDatas;


        //初始化echarts实例
        let Chartsx = this.$echarts.init(document.getElementById("Chartsx"));
        //绘制图表
        Chartsx.setOption(mycharOptions);
          })
          .catch(error => {
            
          });

      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .boxs {
    float: left;
     width: 50%;

    .AggregateEcharts-Box {
      width: 100%;
      height: 28px;
      border-bottom: 1px solid #eeeee9;
      margin-bottom: 10px;
      margin-left: 6px;
      h3 {
        font-size: 14px;
        width: 120px;
        height: 28px;
        border-bottom: 2px solid #AF6E20;
        display: block;
      }
    }
  }
</style>