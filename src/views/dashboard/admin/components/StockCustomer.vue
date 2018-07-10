<template>

<div id="Chart" style="width:816px;height:387px">

</div>

</template>

<script>
var Soption={
        color: ['#F29D4C'],
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
                axisTick: {
                        alignWithLabel: true
                },
                  splitLine: {
                  show: false
                },
                  axisTick:{
                    show:false
                  },
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
                barWidth: '17%',
                data:[]
                }
        ]
}
import { getSOrgQtyIndiByIndiNos } from "@/api/organization/dashboard/index.js";
import echarts from 'echarts'
export default {
        name:'StockCustomer',
        data(){
                return{
                        resposeDatex:null,
                        query:{
                             param:{
                              indiNos:["00330001","00330002","00330003","00330004","00330005"
                             ]
                            }
                        }
                }
        },
        mounted(){

        switch(this.$store.getters.orgid){
          case "8007":
        this.drawLines();
            break;
          case "8160":
        this.drawLines();
            break;
          case "8314":
        this.drawLines();
            break;
          case "8280":
        this.drawLines();
            break;
          case "8316":
        this.drawLines();
            break;
          case "8170":
        this.drawLines();
            break;
          case "8312":
        this.drawLines();
            break;
          case "8315":
        this.drawLines();
            break;

          case "8313":
        this.drawLines();
            break;
          case "8317":
        this.drawLines();
            break;
          case "8311":
        this.drawLines();
            break;
          case "8305":
        this.drawLines();
            break;
          case "8304":
        this.drawLines();
            break;
          case "8306":
        this.drawLines();
            break;
          }
        },
        methods:{
                drawLines(){
                var SlegendData=new Array();
                var SseriesData=new Array();
                var SmycharOption=Soption;

                getSOrgQtyIndiByIndiNos(this.query).then(response =>{
                        this.responseDatex = response.Data
                 response.Data.forEach(element => {
                SlegendData.push(element.IndiName);
                SseriesData.push({value:element.PrsntVal,name:element.IndiName});
              });
          SmycharOption.xAxis[0].data=SlegendData;
          SmycharOption.series[0].data=SseriesData;


                        //初始化echarts实例
                        let Chart = this.$echarts.init(document.getElementById('Chart'))
                        //绘制图表
                        Chart.setOption(SmycharOption)
                })
                .catch(error =>{

                 });

                }
        }


}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#Chart{
        width: 100%;
        height: 100%;
}
</style>
