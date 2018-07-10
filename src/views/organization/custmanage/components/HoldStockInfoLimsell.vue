<!-- 当前持仓-限售 -->
<template>
<div class="holdstockinfogeneraccount">

  <div>
    <div class="yh-queryresult-top">
      <div class="yh-fl">
        <span class="yh-queryresult-top-contentlf"></span>
        <span class="yh-queryresult-top-content">明细</span>
      </div>
    </div>

    <div class="yh-queryresult-middle">
      <el-table :data="list" stripe size="mini"  width="800"  max-height=800 >
        <el-table-column  label="客户号" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.grpName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.grpName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="客户姓名" >
          <template slot-scope="scope">

            <el-button v-for="cust in scope.row.custGrpAssocVO" :key="cust.custUuid"
                       type="text" size="small">{{cust.custName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column   label="营业部代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.grpIntro }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.grpIntro }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="营业部名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.grpDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.grpDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="股东代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column  label="资金账户" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="证劵市场" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
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


        <el-table-column  label="股份可用数" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="股份余额" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column  label="冻结数量" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.bizDeptIncomeDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.bizDeptIncomeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column  label="证劵市场" show-overflow-tooltip>
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
  export default {
    name: "HoldStockInfoGenerlAccount",
    data() {
      return {
        list: null,
        form_data: {
          "pageInfo": {
            PageNum: 1,
            PageSize: 10,
            Total: 0,
            Pages: 0
          },
          grpName:"",
          "param": {}
        }
      }
    },
    methods:{
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
