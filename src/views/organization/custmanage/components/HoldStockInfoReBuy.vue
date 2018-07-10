<!-- 当前持仓-其他 -->
<template>
<div class="holdstockinfogeneraccount">
  <el-form  :model="form_data" ref="form_data"  label-width="80px">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
              <span class="yh-headerfl">
                <span class="yh-titlelf"></span>
                <span class="yh-font">查询条件</span>
              </span>
          <span class="yh-headerfr">
                <div id="yh-advanced" >

                </div>
              </span>
        </div>
      </el-col>
    </el-row>

    <div class="yh-query-content">
      <el-row>
        <el-col :span="24">
          <el-form-item label="机构业务名称:"   label-width="130px">
            <el-input  placeholder="请输入内容"   size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>


  <div>
    <div class="yh-queryresult-top">
      <div class="yh-fl">
        <span class="yh-queryresult-top-contentlf"></span>
        <span class="yh-queryresult-top-content">明细清单</span>
      </div>
    </div>

    <div class="yh-queryresult-middle">
      <el-table :data="list" stripe size="mini"  width="800"  max-height=800 >
        <el-table-column  label="股份日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.grpName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.grpName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="客户号" >
          <template slot-scope="scope">

            <el-button v-for="cust in scope.row.custGrpAssocVO" :key="cust.custUuid"
                       type="text" size="small">{{cust.custName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column   label="客户姓名" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.grpIntro }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.grpIntro }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="资金账户" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.grpDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.grpDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="证劵代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column  label="证劵名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="成交日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="成交金额" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="购回日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="营业部名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="证券市场" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="证劵类别" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="买卖标志" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>



      </el-table>
    </div>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="form_data.pageInfo.PageNum" :page-sizes="[5, 10, 15 ,20]"
                     :page-size="form_data.pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="form_data.pageInfo.Total">
      </el-pagination>
    </div>

  </div>

</div>
</template>

<script>
  import {queryStockReBuy} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {JSONArrayToString} from "@/utils/datahandle";

  export default {
    name: "HoldStockInfoGenerlAccount",
    data() {
      return {
        list: null,
        queryCondition:{
            uuid:"",
            businessType:"1",
            dataTime:""
        },
        form_data: {
          "pageInfo": {
            PageNum: 1,
            PageSize: 10,
            Total: 0,
            Pages: 0
          },
          "param": {}
        }
      }
    },

    created() {
      this.doQuery();
    },

    methods:{

      doQuery(){
        this.queryCondition.uuid=this.$store.getters.Uuid_formal;
        this.form_data.param=JSONArrayToString(this.queryCondition);

        queryStockReBuy(this.form_data)
          .then(response => {
            //console.info(response);
            this.list = response.Data.Result;
            //console.info(this.list);
            this.form_data.pageInfo = response.PageInfo;
          }).catch(() => {

        })
      },
      handleSizeChange(){

      },
      handleCurrentChange(){


      }
    }
  };
</script>

<style scoped>

  .holdstockinfogeneraccount{

    padding: 10px;
  }
  .yh-headerdiv {
    height: 40px;
    border-bottom: 1px solid #eeeee9;
  }

  .yh-headerfl {
    float: left;
    width: 70px;
    height: 40px;
    line-height: 40px;
  }


  .yh-titlelf{

    line-height: 40px;
    border-left: 6px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;
  }

  .yh-titlelf{

    line-height: 40px;
    border-left: 6px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;
  }


  .yh-queryresult-top {
    height: 34px;
    border-top: 1px solid #eeeee9;
    margin-bottom: 10px;
  }

  .yh-queryresult-top-contentlf {

    line-height: 40px;
    border-left: 6px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;

  }

  .yh-queryresult-top-content {
    height: 40px;
    line-height: 40px;

    color: #9B703D;
    font-weight: bolder;
    font-size: 15px !important;
  }

  .yh-query-content {
      height: 60px;
      margin-top: 20px;
  }

  .yh-query-content .el-input{
    width: 180px;
  }


</style>
