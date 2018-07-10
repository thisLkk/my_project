<template>
  <div class="yh-projectone">
    <div class="yh-topdiv">
      <div class="yh-active">
        <span>在会在审项目</span>
      </div>
    </div>
    <!--股权类项目 -->
    <div class="yh-equityproject">
      <div class="yh-lf">
        <div class="yh-equityproject-title">
          <ul>
            <li>股权类项目</li>
          </ul>
          <br><br>
          <span class="yh-equityproject-time">
            <span>截止时间:</span>
            <span>{{(stockrightResultData&&stockrightResultData.length>0)?stockrightResultData[0].AsTime:'' }}</span>
          </span>
          <span class="yh-equityproject-num">
            <span>项目数量:</span>
            <span>{{(stockrightResultData)?stockrightResultData.length:0}}</span>
          </span>
        </div>
        <div class="yh-equityproject-piechart">
          <!--<PieChart :className="className" :demoData="demoData"></PieChart>-->
        </div>
      </div>
      <div class="yh-lr">
        <el-table :data="stockrightResultData" border align="center" size="mini">
          <el-table-column prop="PrjName" label="项目名称">
          </el-table-column>
          <el-table-column prop="PrjType" label="项目类型">
          </el-table-column>
          <el-table-column prop="AuditOrg" label="审核机构">
          </el-table-column>
          <el-table-column prop="PrjTeam" label="项目团队">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--债券类项目 -->
    <div class="yh-equityproject-two">

      <div class="yh-lf">
        <div class="yh-equityproject-title">
          <ul>
            <li>债券类项目</li>
          </ul>
          <br><br>
          <span class="yh-equityproject-time">
            <span>截止时间:</span>
            <span>{{(bondResultData&&bondResultData.length>0)?bondResultData[0].AsTime:'' }}</span>
          </span>
          <span class="yh-equityproject-num">
            <span>项目数量:</span>
            <span>{{(bondResultData)?bondResultData.length:0}}</span>
          </span>
        </div>
        <div class="yh-equityproject-piechart">
          <!--<PieChart :className="className" :demoData="demoData"></PieChart>-->
        </div>
      </div>
      <div class="yh-lr">
        <el-table :data="bondResultData" border align="center" size="mini">
          <el-table-column prop="PrjName" label="项目名称">
          </el-table-column>
          <el-table-column prop="PrjType" label="项目类型">
          </el-table-column>
          <el-table-column prop="PrjTeam" label="项目团队">
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!--并购重组项目 -->
    <div class="yh-equityproject-three">

      <div class="yh-lf">
        <div class="yh-equityproject-title">
          <ul>
            <li>并购重组项目</li>
          </ul>
          <br><br>
          <span class="yh-equityproject-time">
            <span>截止时间:</span>
            <span>{{(mergerandreorganizationResultData&&mergerandreorganizationResultData.length>0)?mergerandreorganizationResultData[0].AsTime:'' }}</span>
          </span>
          <span class="yh-equityproject-num">
            <span>项目数量:</span>
            <span>{{(mergerandreorganizationResultData)?mergerandreorganizationResultData.length:0}}</span>
          </span>
        </div>
        <div class="yh-equityproject-piechart">
          <!--<PieChart :className="className" :demoData="demoData"></PieChart>-->
        </div>
      </div>
      <div class="yh-lr">
        <el-table :data="mergerandreorganizationResultData" border align="center" size="mini">
          <el-table-column prop="PrjName" label="项目名称">
          </el-table-column>
          <el-table-column prop="PrjType" label="项目类型">
          </el-table-column>
          <el-table-column prop="AuditOrg" label="审核机构">
          </el-table-column>
          <el-table-column prop="PrjTeam" label="项目团队">
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>
<script>
import PieChart from '@/components/Charts/PieChart.vue';
import { ChartAndTable } from './index.js'
import { meetAndtrialProjectTableData, meetAndtrialProjectEchartsData, newProjectTableData, newProjectEchartsData, newClassCoreTableData, newClassCoreEchartsData, statusStatistics, statusStatisticsTotal } from '@/api/organization/custmanage/formalcustmanage/InvestmentBankProjectSummary/index.js'


export default {
  name: "ProjectOne",
  props: {

  },
  data() {
    return {

      //在会在审项目--股权类
      stockrightparamdata: {
        "sysCode": "",
        "token": "",
        "transitionId": "",
        "pageInfo": {
          "pageNum": 1,
          "pageSize": 10,
          "total": 0,
          "orderBy": "",
          "pages": 0
        },
        "param": {
          "prjFinType": "01"
        }
      },
      //在会在审项目--债券类
      bondparamdata: {
        "sysCode": "",
        "token": "",
        "transitionId": "",
        "pageInfo": {
          "pageNum": 1,
          "pageSize": 10,
          "total": 0,
          "orderBy": "",
          "pages": 0
        },
        "param": {
          "prjFinType": "02"
        }
      },
      //在会在审项目--并购重组类
      mergerandreorganizationparamdata: {
        "sysCode": "",
        "token": "",
        "transitionId": "",
        "pageInfo": {
          "pageNum": 1,
          "pageSize": 10,
          "total": 0,
          "orderBy": "",
          "pages": 0
        },
        "param": {
          "prjFinType": "03"
        }
      },


      /*------------------------echarts数据----------------------------*/
      //在会在审项目--股权类
      stockrightparamechartsdata: {
        "sysCode": "",
        "token": "",
        "transitionId": "",
        "pageInfo": {
          "pageNum": 1,
          "pageSize": 10,
          "total": 0,
          "orderBy": "",
          "pages": 0
        },
        "param": "01"
      },
      //在会在审项目--债券类
      bondparamechartsdata: {
        "sysCode": "",
        "token": "",
        "transitionId": "",
        "pageInfo": {
          "pageNum": 2,
          "pageSize": 4,
          "total": 0,
          "orderBy": "",
          "pages": 0
        },
        "param": "02"
      },
      //在会在审项目--并购重组类
      mergerandreorganizationparamechartsdata: {
        "sysCode": "",
        "token": "",
        "transitionId": "",
        "pageInfo": {
          "pageNum": 2,
          "pageSize": 4,
          "total": 0,
          "orderBy": "",
          "pages": 0
        },
        "param": "03"
      },



      /*------------------------结果集(Table)----------------------------*/
      //在会在审项目--股权类
      stockrightResultData: null,
      //在会在审项目--债券类
      bondResultData: null,
      //在会在审项目--并购重组类
      mergerandreorganizationResultData: null,

      /*------------------------结果集(Echarts)----------------------------*/
      //在会在审项目--股权类
      stockrightResultEchartsData: null,
      //在会在审项目--债券类
      bondResultEchartsData: null,
      //在会在审项目--并购重组类
      mergerandreorganizationResultEchartsData: null,



      stockright:null,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      className: "equityproject",
      demoData: {
        legendData:[],
        seriesData: []
      },
      /* 债券类项目*/
      projectName1: '债券类项目',
      endTime1: '截止时间',
      time1: '',
      projectNumbers1: '项目数量',
      num1: 5,
      className1: "bondproject",
      bondclassData: {
        legendData: [],
        seriesData: []
      },
      /*并购重组项目 */
      projectName2: '并购重组项目',
      endTime2: '截止时间',
      time2: '',
      projectNumbers2: '项目数量',
      num2: '',
      className2: "mergerandreorganizationproject",
      mergerandreorganizationData: {
        legendData: [],
        seriesData: []
      },
    };
  },
  created(){
    this.init();
  },
  methods: {
    init(){



      /*-----------------------------------table--------------------------------------*/

      //在会在审项目--股权类
      this.stockRightQueryData(this.stockrightparamdata);


      //在会在审项目--债券类
      this.bondQueryData(this.bondparamdata);


      //在会在审项目--并购重组类
      this.mergerAndReorganizationQueryData(this.mergerandreorganizationparamdata);

      /*---------------------------------charst-------------------------------------*/
      // //在会在审项目--股权类
       this.stockRightQueryEchartsData(this.stockrightparamechartsdata);
      // //在会在审项目--债券类
      // this.bondQueryEchartsData(this.bondparamechartsdata);
      // //在会在审项目--并购重组类
      // this.mergerAndReorganizationQueryEchartsData(this.mergerandreorganizationparamechartsdata);

      //
      // var stockrightechartdata=this.stockrightEcharts;
      // for(var i=0;i<stockrightechartdata.length;i++){
      //   this.demoData.legendData.push(stockrightechartdata[i].PRJTUPE);
      //   this.demoData.seriesData.push({value:stockrightechartdata[i].ONESUM,name:stockrightechartdata[i].PRJTUPE});
      // };
      //
      // var bondechartdata=this.bondEcharts;
      // this.time1=bondechartdata[0].LASTTIME;
      // this.num1=bondechartdata[0].ALLSUM;
      // for(var j=0;j<bondechartdata.length;j++){
      //   this.bondclassData.legendData.push(bondechartdata[j].PRJTUPE);
      //   this.bondclassData.seriesData.push({value:bondechartdata[j].ONESUM,name:bondechartdata[j].PRJTUPE});
      // };
      //
      // var mergerandreorganizationechartdata=this.mergerandreorganizationEcharts;
      // this.time2=mergerandreorganizationechartdata[0].LASTTIME;
      // this.num2=mergerandreorganizationechartdata[0].ALLSUM;
      // for(var k=0;k<mergerandreorganizationechartdata.length;k++){
      //   this.mergerandreorganizationData.legendData.push(mergerandreorganizationechartdata[k].PRJTUPE);
      //   this.mergerandreorganizationData.seriesData.push({value:mergerandreorganizationechartdata[k].ONESUM,name:mergerandreorganizationechartdata[k].PRJTUPE});
      // }

    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },



    /*--------------------------------------echarts-----------------------------------------*/
    //在会在审项目--股权类
    stockRightQueryEchartsData(querydata) {
      meetAndtrialProjectEchartsData(querydata)
        .then(response => {
          this.stockrightResultEchartsData = response.Data;
          //console.info(this.stockrightResultEchartsData);

        }).catch(() => {

      })
    },
    //在会在审项目--债券类
    bondQueryEchartsData(querydata) {
      meetAndtrialProjectEchartsData(querydata)
        .then(response => {
          this.bondResultEchartsData = response.Data;

        }).catch(() => {

      })
    },
    //在会在审项目--并购重组类
    mergerAndReorganizationQueryEchartsData(querydata) {
      meetAndtrialProjectEchartsData(querydata)
        .then(response => {
          this.mergerandreorganizationResultEchartsData = response.Data;
        }).catch(() => {

      })
    },

    /*--------------------------------------列表类-----------------------------------------*/
    //在会在审项目--股权类
    stockRightQueryData(querydata) {
      meetAndtrialProjectTableData(querydata)
        .then(response => {
          this.stockrightResultData = response.Data;
          // if (this.stockrightResultData != null && this.bondResultData != null && this.mergerandreorganizationResultData != null && this.stockrightResultEchartsData != null && this.bondResultEchartsData != null && this.mergerandreorganizationResultEchartsData != null) {
          //   this.show_ = true;
          // }
        }).catch(() => {

      })
    },

    //在会在审项目--债券类
    bondQueryData(querydata) {
      meetAndtrialProjectTableData(querydata)
        .then(response => {
          this.bondResultData = response.Data;
          // if (this.stockrightResultData != null && this.bondResultData != null && this.mergerandreorganizationResultData != null && this.stockrightResultEchartsData != null && this.bondResultEchartsData != null && this.mergerandreorganizationResultEchartsData != null) {
          //   this.show_ = true;
          // }
        }).catch(() => {

      })
    },


    //在会在审项目--并购重组类
    mergerAndReorganizationQueryData(querydata) {
      meetAndtrialProjectTableData(querydata)
        .then(response => {
          this.mergerandreorganizationResultData = response.Data;
          // if (this.stockrightResultData != null && this.bondResultData != null && this.mergerandreorganizationResultData != null && this.stockrightResultEchartsData != null && this.bondResultEchartsData != null && this.mergerandreorganizationResultEchartsData != null) {
          //   this.show_ = true;
          // }
        }).catch(() => {

      })
    },


  }
}
</script>
<style scoped>
.yh-topdiv {
  width: 92%;
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
  height: 280px;
  margin-bottom: 15px;
  border-bottom: 1px solid #dddddd;
}
.yh-lf {
  float: left;
  width: 40%;
}
.yh-lr {
  float: right;
  width: 60%;
  margin-top: 40px;
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
  list-style-image: url('~@/assets/organization/customermanage/ico.jpg');
}
.yh-equityproject-time {
  height: 30px;
  margin-right: 20px;
  margin-left: 40px;
  margin-top: 20px;
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


