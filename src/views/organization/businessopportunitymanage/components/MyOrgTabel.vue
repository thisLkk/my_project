<template>
  <div class="yh-externalassetslist">
    <div class="yh-externalassetslist-middle">
      <el-table :data="tableData"    stripe style="width: 100%">

        <el-table-column align="center"   label="客户号">
          <template slot-scope="scope">
            {{ scope.row.CustNo}}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="customername" label="客户名称">
          <template slot-scope="scope">
            {{ scope.row.CustName}}
          </template>
        </el-table-column>
        <el-table-column align="center"  label="机构代码">
          <template slot-scope="scope">
            {{ scope.row.OrgId}}
          </template>
        </el-table-column>

        <el-table-column align="center"  label="机构名称">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p> {{ convertOrgName(scope.row.OrgId)}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ convertOrgName(scope.row.OrgId)}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="externalassetsamount" label="外部资产金额(元)">
          <template slot-scope="scope">
            {{ formatCurrencyx(scope.row.ExteriorAssetAmt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="openaccountdate" label="开户日期">
          <template slot-scope="scope">
            {{ scope.row.OpAcctDate}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="totalassets" label="总资产(元)">
          <template slot-scope="scope">
            {{ formatCurrencyx(scope.row.TotlAsset) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="yh-externalassetslist-bottom">
      <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
          :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="Total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    GetInfo,GetInfoCount
  } from "@/api/organization/businessopportunitymanage/ExternalassetsLists/index.js";
  import {formatCurrency,formatThousands} from "@/utils";
  import { dictFilter,dictItems, isObj } from "@/filters";
  import DICTYPE from "@/utils/dictTypes.js";

  export default {
    name: "MyOrgTabel",
    components: {},
    data() {
      return {
        currentPage: 1, //--------------当前页
        pageSize: 10, //-----------------需要展示多少页
        tableData: null, //-------------展示的数据
        Total: null //------------------总数据
      };
    },
    created() {
      this.initGetInfo();
      this.initGetInfoCount();
    },
    methods: {
      formatCurrencyx(val){
        return formatCurrency(val);
      },
      convertOrgName(val){
        return  dictFilter(DICTYPE.CTCCD0998, val);
      },
      initGetInfo() {
        var query = {
          pageInfo: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            scope: "3",

          }
        };
        GetInfo(query)
          .then(response => {
            this.tableData = response.Data;
            //this.Total = response.PageInfo.Total;
          })
          .catch(() => {
          });
      },

      initGetInfoCount() {
        var query = {
          pageInfo: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            scope: "3",

          }
        };
        GetInfoCount(query)
          .then(response => {
            this.Total = response.PageInfo.Total;
          })
          .catch(() => {
          });
      },

      //--------------------------------当前需要展示多少页
      handleSizeChange(val) {
        this.pageSize = val;
        this.initGetInfo();
      },
      //--------------------------------当前所在页码
      handleCurrentChange(val) {
        this.initGetInfo();
      },
      //---------------------------------列表点击事件
      handleCurrentChangeTable() {},
    }
  };

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .yh-externalassetslist {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 5px;
    padding: 10px 30px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .yh-externalassetslist-middle {
      margin-top: 20px;
      height: 100%;
    }
    .yh-externalassetslist-bottom {
      margin-top: 20px;
      text-align: right;
    }
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

</style>
