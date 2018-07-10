<template>
  <div  class="select-targetcust-model">
    <div>
      <div >
        <el-table  :data="list" stripe size="mini" style="width: 100%"
        >
          <el-table-column  label="经纪客户号"  >
            <template slot-scope="scope">
              <span >{{ scope.row.CustBasicInfoVO.CustNo }}</span>&nbsp;&nbsp;
            </template>
          </el-table-column>

          <el-table-column  label="客户名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button  type="text" size="small" @click="show360view(scope.row)">{{scope.row.CustBasicInfoVO.CustFullName }}</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="paginationcm">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="query_data.pageInfo.PageNum" :page-sizes="[5, 10,15, 20]"
                       :page-size="query_data.pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="query_data.pageInfo.Total">
        </el-pagination>
      </div>
    </div>
    <div class="scuret-buttons">
      <el-button id="el-cancel" size="small" @click="closeWindow()">
        <i class="fa fa-close"></i>关闭
      </el-button>
    </div>
  </div>


</template>

<script>

  import { JSONArrayToString } from "@/utils/datahandle.js";
  import {queryMoreCustInfo} from "@/api/organization/businessopportunitymanage/InstitutionalBusinessTargetCustomer/index.js";

  export default {
    name: "CustDetailInfo",
    props: {
      grpNo: {
        type:String
      },
      showTab:{
        type:String
      }
    },

    data() {
      return {
        form_query_data: {//请求参数
          custName: '',///客户名称
          econNum:''//经纪客户号
        },
        query_data: {
          "pageInfo": {
            PageNum: 1,
            PageSize: 10,
            Total: 0,
            Pages: 0
          },
          "param": {}
        },
        list: [],
      }
    },
    created() {


      //组件生成执行
      this.init();
    },

    methods: {
      show360view(cust){
        this.$emit("closeWindow");
        let custType="per";
        if(cust.IndividualFlag=="1"){//机构
          custType="org";
        }
        this.$router.push({ path: '/CustomerManagement/FormalCustomerManagement/PanoramicView', query: { uuid: cust.CustUuid,custNo:cust.CustNo,custType:custType} });

      },
      doquery(){
        var queryCondition={grpNo:this.grpNo,relType:"99"};
        if(this.showTab=="myDeptCust"){
          queryCondition.queryType="03";
        }else if(this.showTab=="myTeamCust"){
          queryCondition.queryType="02";
        }else if(this.showTab=="myTargetCust"){
          queryCondition.queryType="01";
        }else if(this.showTab=="allCust"){
          queryCondition.queryType="99";
        }
        this.query_data.param=JSONArrayToString(queryCondition);

        this.sendRequest();
      },
      sendRequest(){
        queryMoreCustInfo(this.query_data)
          .then(response => {
            this.list = response.Data;
            this.query_data.pageInfo = response.PageInfo;
          })
          .catch(() => {
            this.$message.error('查询失败!');
          });
      },
      init() {
        this.doquery();
      },
      //每页数量改变
      handleSizeChange(val) {
        this.query_data.pageInfo.PageSize = val;
        this.sendRequest();
      },
      handleCurrentChange(val){
        this.query_data.pageInfo.PageNum = val;
        this.sendRequest();
      },
      closeWindow(){
        this.$emit("closeWindow");
      }
    },

  };
</script>

<style scoped>

  .select-targetcust-model{

    padding: 2px 10px;
  }
  .select-instbuscust-querycondition{
    margin-top: 10px;
  }
  .select-instbuscust-querycondition .el-input {
    width: 180px;
    margin-left: 10px;
  }
  .yh-headerdiv {
    height: 30px;
    border-bottom: 1px solid #eeeee9;
  }
  .yh-titlelf{

    line-height: 30px;
    border-left: 6px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;
  }
  .yh-headerfl {
    float: left;
    height: 30px;
    line-height: 30px;
    color: #9B703D;
  }
  .selectcust-queryresult-top{

    margin-top: 15px;

  }
  .selectcust-queryresult-top-contentlf {

    line-height: 40px;
    border-left: 6px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;

  }

  .selectcust-queryresult-top-content {
    height: 40px;
    line-height: 40px;
    color: #9B703D;
  }

  .yh-fl {
    float: left;
  }
  .paginationcm{

    text-align: right;
    padding: 8px 0;
  }
  .scuret-buttons{
    text-align: center;
    padding-bottom: 10px;
  }
</style>
