<template>

<div id="myChart" style="width:816px;height:387px">

</div>

</template>

<script>
var Toption={

                color: [' #F29D4C'],
                tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                },
                grid: {
                        left: '0',
                        right: '0',
                        bottom: '3%',
                        top:'3%',
                        containLabel: true
                },
                xAxis : [
                        {
                        type : 'category',
                        data : [],
                          silent: false,
                          splitLine: {
                            show: false
                          },
                          nameGap:100,
                          axisTick:{
                            show:false
                          },
                          axisLabel:{
                            interval:0,
                            rotate:-45
                          }
                        }
                ],
                yAxis : [
                        {
                        type : 'value'
                        }
                ],
                series : [
                        {
                        name:'',
                        type:'bar',
                        barWidth: '24%',
                        data:[]
                        }
                ]
}
import { getSOrgAmtIndiByIndiNos } from "@/api/organization/dashboard/index.js";
import echarts from 'echarts'
export default {
        name:'UnderwritingEcharts',
        data(){
                return{
                        resposeDates:null,
                        query:{
                             param:{
                              indiNos:["00300001","00300002","00300003","00300004","00300005","00300006",
                              "00300007","00300008","00300009","00300010","00300011","00300012","00300013","00300014","00300015","00300016"]
                            }
                        }
                }
        },
        mounted(){

        switch(this.$store.getters.orgid){
          case "8007":
        this.drawLine();
            break;
          case "8160":
        this.drawLine();
            break;
          case "8314":
        this.drawLine();
            break;
          case "8280":
        this.drawLine();
            break;
          case "8316":
        this.drawLine();
            break;
          case "8170":
        this.drawLine();
            break;
          case "8312":
        this.drawLine();
            break;
          case "8315":
        this.drawLine();
            break;

          case "8313":
        this.drawLine();
            break;
          case "8317":
        this.drawLine();
            break;
          case "8311":
        this.drawLine();
            break;
          case "8305":
        this.drawLine();
            break;
          case "8304":
        this.drawLine();
            break;
          case "8306":
        this.drawLine();
            break;
          }
        },
        methods:{
                drawLine(){

                var TlegendData=new Array();
                var TseriesData=new Array();
                var TmycharOption=Toption;
                getSOrgAmtIndiByIndiNos(this.query).then(response =>{
                        this.responseDates = response.Data

                response.Data.forEach(element => {
                TlegendData.push(element.IndiName);

                TseriesData.push({value:element.PrsntVal,name:element.IndiName});
              });
          TmycharOption.xAxis[0].data=TlegendData;
          TmycharOption.series[0].data=TseriesData;


                        //初始化echarts实例
                        let myChart = this.$echarts.init(document.getElementById('myChart'))
                        //绘制图表
                        myChart.setOption(TmycharOption)
                })
                .catch(error =>{

                 });

                }
        }


}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#myChart{
        width: 100%;
        height: 100%;
}
</style>
