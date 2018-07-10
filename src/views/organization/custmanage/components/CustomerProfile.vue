<template>
  <!-- 客户管理360 联系板块 联系信息详细 -->
  <div class="Yh_CustomerProfile">
    <div class="progress clearfix">
      <div class="yh-queryresult-top"><h3>战略客户概况信息</h3></div>
      <div v-if="tableData!=null">
        <el-form :model="tableData"  label-width="300px" style="padding-right:50px;">
          <el-form-item label="客户介绍(客户背景、大股东等):" prop="desc">
            <el-input type="textarea" readonly="readonly" :autosize="{ minRows: 4, maxRows: 4}" v-model="tableData.CustIntro"></el-input>
          </el-form-item>
          <el-form-item label="已与我司开展业务情况(以数据与文字描述):" prop="desca">
            <el-input type="textarea" readonly="readonly" :autosize="{ minRows: 4, maxRows: 4}" v-model="tableData.DevBizInstance"></el-input>
          </el-form-item>
          <el-form-item label="潜在业务机会:" prop="descb">
            <el-input type="textarea" readonly="readonly" :autosize="{ minRows: 4, maxRows: 4}" v-model="tableData.PotentBiz"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="descc">
            <el-input type="textarea" readonly="readonly" :autosize="{ minRows: 2, maxRows: 4}" v-model="tableData.Remk"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else style="padding-left:100px;margin-bottom:20px;">
          暂无数据
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getCustStrategyInfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //---------------------------------------------------------数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
  export default {
    name: "CustomerProfile",
    props: ["parentPage"],
    data() {
      return {
        tableData: null, //---------------回显数据(协同信息)
        uuid: null, //--------------------回显数据(协同信息)
        currentPage: 1, //----------------当前页
        pagesize: 5, //-------------------显示总条数
        total: null //--------------------总条数
      };
    },
    created() {
      // ----------------------------------------------------------------------初次拉取数据
      this.init();
    },
    methods: {
      // -----------------------------------------------------------------------信息
      init() {
        if ("regCust" == this.parentPage) {
          //用注册客户uuid
          this.uuid = this.$store.getters.Uuid_Reg_Cust;
        } else {
          //使用正式客户uuid
          this.uuid = this.$store.getters.Uuid_formal;
        }
        var require = {
          pageInfo: {
            pageNum: this.currentPage,
            pageSize: this.pagesize,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: this.uuid
        };
        getCustStrategyInfo(require)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.tableData = response.Data[0];
            }
          })
          .catch(() => {});
      },
      //----------------------------------------------------------------------当前页
      handleCurrentChange(val) {
        this.init();
      },
      //----------------------------------------------------------------------当前要展示多少条
      handleSizeChange(val) {
        this.pagesize = val;
        this.init();
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .Yh_CustomerProfile {
    margin:0 15px;
    margin-top:20px;
    .progress {
      padding:0 15px;
      border:solid 1px #ebeef5;
      box-sizing: border-box;
      background:#FFF;
      border-radius: 3px; // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      font-size: 14px;
      .yh-queryresult-top{
          height: 40px;
          line-height: 40px;
          font-weight: bold;
          border-bottom:1px solid #eeeee9;
           margin-bottom:15px;
        h3 {
          width:125px;
          height: 40px;
          line-height: 40px;
          font-family:"微软雅黑";
          color: #333;
          padding:0 3px;
          font-size:14px;
          border-bottom: 2px solid #ce8f3d;
         
        }
      }
      .el-table td div {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .main_table {
        margin: 20px;
      }
    }
  }

</style>
