<template>
  <div class="yh-projectone">
    <div class="yh-topdiv">
      <div class="yh-active">
        <span>新增立项项目</span>
      </div>
    </div>
    <!--股权类项目 -->
    <div class="yh-equityproject-one">
      <ChartAndTable :projectName="projectName0" :endTime="endTime0" :time="time0" :projectNumbers="projectNumbers0" :num="num0" :className="className0" :demoData="equityData" :tableData="newprojectstockright"></ChartAndTable>
    </div>
    <!--债券类项目 -->
    <div class="yh-equityproject-two">
      <ChartAndTable :projectName="projectName1" :endTime="endTime1" :time="time1" :projectNumbers="projectNumbers1" :num="num1" :className="className1" :demoData="bondData" :tableData="newprojectbond"></ChartAndTable>
    </div>
    <!--并购重组项目 -->
    <div class="yh-equityproject-three">
      <ChartAndTable :projectName="projectName2" :endTime="endTime2" :time="time2" :projectNumbers="projectNumbers2" :num="num2" :className="className2" :demoData="newthreeboardData" :tableData="newprojectnewthreeboard"></ChartAndTable>
    </div>
  </div>
</template>
<script>
import { ChartAndTable } from './index.js'
export default {
  name: "ProjectTwo",
  components: {
    ChartAndTable
  },
  props: {
    newprojectstockright: {
      type: Array,
    },
    newprojectbond: {
      type: Array,
    },
    newprojectnewthreeboard: {
      type: Array,
    },
    newprojectstockrightEcharts: {
      type: Array,
    },
    newprojectbondEcharts: {
      type: Array,
    },
    newprojectnewthreeboardEcharts: {
      type: Array,
    }
  },
  data() {
    return {
      /*股权类项目 */
      projectName0: '股权类项目',
      endTime0: '截止时间',
      time0: '',
      projectNumbers0: '项目数量',
      num0: 5,
      className0: "equityproject",
      equityData: {
        legendData: [],
        seriesData: []
      },
      /* 债券类项目*/
      projectName1: '债券类项目',
      endTime1: '截止时间',
      time1: '',
      projectNumbers1: '项目数量',
      num1: 6,
      className1: "bondproject",
      bondData: {
        legendData: [],
        seriesData: []
      },
      /*新三板项目 */
      projectName2: '新三板项目',
      endTime2: '截止时间',
      time2: '',
      projectNumbers2: '项目数量',
      num2: 7,
      className2: "newthreeboardproject",
      newthreeboardData: {
        legendData: [],
        seriesData: []
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
 
    },
    tableRowClassName({ row, rowIndex }) {
      return 'yh-rowclass';
    },
    tableHeaderClassName({ row, rowIndex }) {
      return 'yh-headerclass';
    },
    init() {
      var stockrightEchartData = this.newprojectstockrightEcharts;
      this.time0=stockrightEchartData[0].LASTTIME;
      this.num0=stockrightEchartData[0].ALLSUM;
      for (var i = 0; i < stockrightEchartData.length; i++) {
        this.equityData.legendData.push(stockrightEchartData[i].PRJTUPE);
        this.equityData.seriesData.push({ value: stockrightEchartData[i].ONESUM, name: stockrightEchartData[i].PRJTUPE });
      };

      var bondEchartData = this.newprojectbondEcharts;
      this.time1=bondEchartData[0].LASTTIME;
      this.num1=bondEchartData[0].ALLSUM;
      for (var j = 0; j < bondEchartData.length; j++) {
        this.bondData.legendData.push(bondEchartData[j].PRJTUPE);
        this.bondData.seriesData.push({value: bondEchartData[j].ONESUM, name: bondEchartData[j].PRJTUPE });
      };

      var newthreeboardEchartData = this.newprojectnewthreeboardEcharts;
      this.time2=newthreeboardEchartData[0].LASTTIME;
      this.num2=newthreeboardEchartData[0].ALLSUM;
      for (var k = 0; k < newthreeboardEchartData.length; k++) {
        this.newthreeboardData.legendData.push(newthreeboardEchartData[k].PRJTUPE);
        this.newthreeboardData.seriesData.push({ value: newthreeboardEchartData[k].ONESUM, name: newthreeboardEchartData[k].PRJTUPE });
      }
    }
  }
}
</script>
<style scoped>
.yh-topdiv {
  height: 40px;
  border-bottom: 1px solid #dddddd;
}
.yh-active {
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #cc6d30;
}
.yh-active span {
  font-family: "微软雅黑";
  font-weight: normal;
  font-size: 15px;
}
.yh-equityproject-one {
  width: 92%;
  height: 280px;
  margin-bottom: 15px;
  border-bottom: 1px solid #dddddd;
}
.yh-equityproject-two {
  width: 92%;
  height: 300px;
  margin-top: 20px;
  margin-bottom: 15px;
  border-bottom: 1px solid #dddddd;
}
.yh-equityproject-three {
  width: 92%;
  height: 300px;
  margin-top: 20px;
}
</style>


