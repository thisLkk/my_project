<template>
      <div  class="select-targetcust-model">
        <el-form  :model="form_query_data" ref="form_query_data"  label-width="80px">
          <el-row>
            <el-col :span="24">
              <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-titlelf"></span>
                    <span class="yh-font">查询条件</span>
                  </span>
              </div>
            </el-col>
          </el-row>

          <div class="select-instbuscust-querycondition">
            <el-row>
              <el-col :span="9">
                <el-form-item label="客户名称:" prop="custName">
                  <el-input  placeholder="请输入内容" v-model="form_query_data.custName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="经纪客户号:"  prop="econNum">
                  <el-input  placeholder="请输入内容" v-model="form_query_data.econNum" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div >
                  <el-button  type="primary"   round  size="mini">查询</el-button>
                  <el-button   round size="mini">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>

        <div>
          <div class="selectcust-queryresult-top">
            <div class="yh-fl">
              <span class="selectcust-queryresult-top-contentlf"></span>
              <span class="selectcust-queryresult-top-content">机构客户信息</span>
            </div>
          </div>

          <div >
              <el-table  :data="list" stripe size="mini" style="width: 100%"  height="250" ref="multipleTable"
                         @selection-change="changeselect"
              >
              <el-table-column
                type="selection"
                prop="id"
               ></el-table-column>
              <el-table-column  label="客户名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.custName }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ scope.row.custName }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="econNum" label="经纪客户号">

                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.econNum }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ scope.row.econNum }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="paginationcm">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="query_data.pageInfo.PageNum" :page-sizes="[5, 10, 20]"
                           :page-size="query_data.pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="query_data.pageInfo.Total">
            </el-pagination>
          </div>
        </div>
        <div class="scuret-buttons">
          <el-button id="el-confirm" type="primary" size="small" @click="confirmSelectCust()">
            <i class="fa fa-check"></i>确定
          </el-button>
          <el-button id="el-cancel" size="small" @click="closeWindow()">
            <i class="fa fa-close"></i>取消
          </el-button>
        </div>
      </div>


</template>

<script>
  import {
    FormalQuery
  } from "@/api/organization/custmanage/formalcustmanage/FormalCustomerQuery/index.js";

  export default {
    name: "SelectTargetCustInfo",
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
        hasSelectCust:[],//已选择的客户信息

        list: [{id:'1',custName:'sds',econNum:'011111'},
          {id:'2',custName:'sds2',econNum:'011111'},
          {id:'3',custName:'sds3',econNum:'011111'},
          {id:'4',custName:'sds4',econNum:'011111'},
          {id:'5',custName:'sds5',econNum:'011111'},
          {id:'6',custName:'sds6',econNum:'011111'},
          {id:'7',custName:'sds7',econNum:'011111'},
          {id:'8',custName:'sds8',econNum:'011111'},
          {id:'9',custName:'sds9',econNum:'011111'},
          {id:'10',custName:'sds10',econNum:'011111'},
          {id:'11',custName:'sds11',econNum:'011111'},
        ],
      }
    },
    created() {
      //组件生成执行
      this.init(); //默认拉取我部门的数据
    },
    methods: {

      doquery(){
        FormalQuery(this.query_data)
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
        //this.pageInfo.pageSize = val;
        //this.$emit("queryPage", this.pageInfo);
      },
      handleCurrentChange(val){

      },
      changeselect(val){
       this.hasSelectCust=val;
      },
      closeWindow(){
        this.$emit("closeWindow");
      },
      confirmSelectCust(){
        if(this.hasSelectCust.length>0){

            this.$emit("setHasSelectCustInfo",this.hasSelectCust);
            this.closeWindow();
        }else{
          this.$message({
            message: '请选择客户信息',
            type: 'warning'
          });
        }
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
