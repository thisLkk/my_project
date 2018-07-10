<template>
  <div class="yh-chartandtable">
    <div class="yh-lf">
      <div class="yh-equityproject-title">
        <ul>
          <li>{{projectName}}</li>
        </ul>
        <span class="yh-equityproject-time">
          <span>{{endTime}}:</span>
          <span>{{time}}</span>
        </span>
        <span class="yh-equityproject-num">
          <span>{{projectNumbers}}:</span>
          <span>{{num}}</span>
        </span>
      </div>
      <div class="yh-equityproject-piechart">
        <PieChart :className1='className' :demoData='demoData'></PieChart>
      </div>
    </div>
    <div class="yh-lr">
      <el-table :data="tableData" border  align="center">
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
</template>
<script>
import PieChart from '../../../../components/Charts/PieChart.vue'
export default {
  name: "ChartAndTable",
  components: {
    PieChart
  },
  props: {
    projectName: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    projectNumbers: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    },
    className:{
      type:String
    },
    tableData:{
      type:Array
    },
    demoData:{
      type:Array
    }
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 10,
      demoData: {
        legendData:[],
        seriesData: []
      },
    };
  },
  created(){
    this.init();
  },
  methods: {
    handleSizeChange(val) {
  
    },
    handleCurrentChange(val) {

    },
    init(){
      var echartsData= this.demoData;
      for(var i=0;i<echartsData.length;i++){
        this.demoData.legendData.push(echartsData[i].PRJTUPE);
        this.demoData.seriesData.push({value:echartsData[i].ONESUM,name:echartsData[i].PRJTUPE});
      }

    }

  }
}
</script>
<style scoped>
.yh-chartandtable {
  width: 100%;
  height: 280px;
}
.yh-lf {
  float: left;
  width: 40%;
}
.yh-lr {
  float: right;
  width: 60%;
}
.yh-pagination {
  float: right;
  margin-top: 15px;
}
.yh-equityproject-title {
  margin-top: 15px;
  height: 30px;
}
.yh-equityproject-title li {
  width: 40%;
  float: left;
  margin-left: 35px;
  list-style-image: url(../../../../assets/organization/customermanage/ico.jpg);
}
.yh-equityproject-time {
  height: 30px;
  margin-right: 20px;
}
.yh-equityproject-time span {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
.yh-equityproject-num span {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
.yh-equityproject-piechart {
  height: 200px;
}
</style>


