<template>
  <div class="boxs">
    <div class="ProductHeader-Box">
      <h3>定向产品客户分布</h3>
    </div>
    <div id="Charts" style="width:400px;height:307px" />
  </div>
</template>

<script>
 var option={
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "right",
            data: ["金融机构", "一般机构", "高净值"]
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
                    fontSize: "20",
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
                { value:2, name: "一般机构" },
                { value: 3, name: "高净值" }
              ]
            }
          ]
        };
 

  import { getSOrgQtyIndiByIndiNos } from "@/api/organization/dashboard/index.js";
  import echarts from "echarts";
  export default {
    name: "ProductCustomerEcharts",
    data() {
      return {
        responseData: null,
        query: {
          param: {
            indiNos: ["00280001", "00280002", "00280003"]
          }
        }
      };
    },
    mounted() {
      if(this.$store.getters.orgid == '9060'){
            this.drawLines();
      }
      
    },
    methods: {
      drawLines() {
        
        var legendData=new Array();
        var seriesData=new Array();
        var mycharOption=option;
        getSOrgQtyIndiByIndiNos(this.query)
          .then(response => {
            this.responseData = response.Data;
            
                response.Data.forEach(element => {
                legendData.push(element.IndiName);
                seriesData.push({value:element.PrsntVal,name:element.IndiName});
              });
      
          mycharOption.legend.data=legendData;
          mycharOption.series[0].data=seriesData;
        //初始化echarts实例
        let Charts = this.$echarts.init(document.getElementById("Charts"));
        //绘制图表
        Charts.setOption(mycharOption);

          })
          .catch(error => {
              
          });
        
       
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ProductHeader-Box {
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
</style>