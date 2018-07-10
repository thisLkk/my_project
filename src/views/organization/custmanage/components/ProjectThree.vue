<template>
  <div class="yh-projectone">
    <div class="yh-topdiv">
      <div class="yh-active">
        <span>新增内核项目</span>
      </div>
    </div>
    <div class="yh-equityproject">
      <div class="yh-lf">
        <div class="yh-equityproject-title">
          <span class="yh-equityproject-time">
            <span>截止时间:</span>
            <span>{{newclasscoreEcharts[0].LASTTIME}}</span>
          </span>
          <span class="yh-equityproject-num">
            <span>项目数量:</span>
            <span>{{newclasscoreEcharts[0].ALLSUM}}</span>
          </span>
        </div>
        <div>
          <ColumnChart :demoData="statisticalData" :height="height" :width="width"></ColumnChart>
        </div>
      </div>
      <div class="yh-lr">
        <el-table :data="newclasscore" border align="center">
          <el-table-column prop="PrjName" label="项目名称">
          </el-table-column>
          <el-table-column prop="PrjType" label="项目类型">
          </el-table-column>
          <el-table-column prop="PrjTeam" label="项目团队">
          </el-table-column>
        </el-table>
        <div class="yh-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="4">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ColumnChart from '../../../../components/Charts/ColumnChart.vue'
export default {
  name: "ProjectThree",
  components: {
    ColumnChart
  },
  data() {
    return {
      time: '2018-04-18',
      num: 7,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 10,
      /*统计图表的数据 */
      statisticalData: {
        xAxisData: [],
        seriesData: []
      },
      height: '300px',
      width: '100%'
    };
  },
  props:{
    newclasscore:{
      type: Array,
    },
    newclasscoreEcharts:{
      type: Array,
    }
  },
  created() {
    this.init();
  },
  methods: {
    handleSizeChange(val) {
      
    },
    handleCurrentChange(val) {
      
    },
    init(){
      var newclasscoreEchartData= this.newclasscoreEcharts;
      
      //console.log(JSON.stringify(newclasscoreEchartData))
      for(var i=0;i<newclasscoreEchartData.length;i++){
        this.statisticalData.xAxisData.push(newclasscoreEchartData[i].PRJTEAM);
        this.statisticalData.seriesData.push({ name:newclasscoreEchartData[i].PRJTEAM, data: [newclasscoreEchartData[i].ONESUM] })
        
      }

    }
  }
}
</script>
<style scoped>
.yh-projectone {
  border: 3px #e8e8e8 solid;
  width: 92%;
  min-height: 400px;
  border-radius: 10px;
  margin-left: 15px;
  padding: 12px;
}
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
.yh-equityproject {
  width: 92%;
  height: 350px;
  margin: 15px 10px;
}
.yh-lf {
  float: left;
  width: 40%;
  height: 320px;
}
.yh-lr {
  float: right;
  width: 58%;
  height: 320px;
  overflow-y: auto;
}
.yh-pagination {
  float: right;
  margin-top: 15px;
}
.yh-equityproject-title {
  margin-top: 15px;
  height: 30px;
  padding: 0px 20px;
}
.yh-equityproject-time {
  height: 30px;
  width: 180px;
  float: left;
}
.yh-equityproject-time span {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
.yh-equityproject-num {
  height: 30px;
  width: 80px;
  float: right;
}
.yh-equityproject-num span {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
</style>


