<template>
  <!-- 360传统页面 银河期货信息-->
  <div class="yh_DerivativesHeadquartersInfo">
    <div class="project_main">
      <div  class="content clearfix">
        <div class="content_one"><h3>期货交易账户</h3></div>
        <div>
          <div class="main_table">
            <el-table :data="XianShouTableData"  highlight-current-row size="mini" style="width: 100%">
              <el-table-column label="资产账号" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.CustName }}</div>
                </template>
              </el-table-column>
              <el-table-column label="机构编号" width="" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.PrjType }}</div>
                </template>
              </el-table-column>
              <el-table-column label="期货交易账号" width="" align="center" >
                <template slot-scope="scope">
                  <div>{{ scope.row.PrjPhase }}</div>
                </template>
              </el-table-column>
              <el-table-column label="交易所代码" width="" align="center" >
              </el-table-column>
              <el-table-column label="席位编号" width="" align="center" >
              </el-table-column>
              <el-table-column label="主副标志" width="" align="center" >
              </el-table-column>
              <el-table-column label="期货交易账号类型" width="" align="center" >
              </el-table-column>
              <el-table-column label="期货账户名称" width="" align="center" >
              </el-table-column>
              <el-table-column label="开户日期" width="" align="center" >
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination @size-change="XianShouSizeChange" @current-change="XianShouCurrentChange" :current-page.sync="XianShouCurrentPage" :page-sizes="[5, 10, 15, 20]"
              :page-size="XianShouPageSize" layout="sizes, prev, pager, next, jumper" :total="XianShouTotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="content clearfix">
        <div class="content_one">理财产品</div>
        <div>
          <div class="main_table">
            <el-table :data="LiCaiTableData"  highlight-current-row size="mini" style="width: 100%">
              <el-table-column  label="业务日期" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.BizDate }}</div>
                </template>
              </el-table-column>
              <el-table-column label="资金账户" width="" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.AssetAcct }}</div>
                </template>
              </el-table-column>
              <el-table-column label="产品代码" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.PrjPhase }}</div>
                </template>
              </el-table-column>
              <el-table-column label="产品名称" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.SecAbbr }}</div>
                </template>
              </el-table-column>
              <el-table-column label="持仓数量" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.PrjPhase }}</div>
                </template>
              </el-table-column>
              <el-table-column label="参考盈亏" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.RefPl }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
          <div class="pagination">
            <el-pagination @size-change="LiCaiSizeChange" @current-change="LiCaiCurrentChange" :current-page.sync="LiCaiCurrentPage" :page-sizes="[5, 10, 15, 20]"
              :page-size="LiCaiPageSize" layout=" sizes, prev, pager, next, jumper" :total="LiCaiTotal">
            </el-pagination>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getderivativeproductinfo,
  getastsecpositiondetllist
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "MilkyWayFuturesInfo",
  data() {
    return {
      showinput: true, //------------------------------是否可编辑开关（暂无使用）
      form_project: {},
      XianShouCurrentPage: 1, //-----------------------当前页（限售）
      XianShouPageSize: 10, //-------------------------当前展示多少页（限售）
      XianShouTotal: null, //--------------------------总数据（限售）
      XianShouTableData: null, //----------------------数据（限售）
      LiCaiTableData: null, //-------------------------数据（理财）
      LiCaiCurrentPage: 1, //--------------------------当前页（理财）
      LiCaiPageSize: 10, //----------------------------展示页（理财）
      LiCaiTotal: null //------------------------------总数据（理财）
    };
  },
  created() {
    this.ShareCustomersInit(); //----------------------加载初始化数据
  },
  methods: {
    // ------------------------------------------------数据请求
    ShareCustomersInit(val) {
      var param = {
        pageInfo: {
          pageNum: this.LiCaiCurrentPage,
          pageSize: this.LiCaiPageSize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          Uuid: this.$store.getters.Uuid_formal,
          // Uuid: "6FC419C53DDEB20EE0534A47010A2C45",
          SharesNature: "1",
          SysCode: "LC"
        }
      };
      getderivativeproductinfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //-----------------------------------------------客户风险
            this.form_project.RiskEndureAbility = dictFilter(
              DICTYPE.OSPCD0246,
              this.form_project.RiskEndureAbility
            );
            //-----------------------------------------------客户状态 OrgName1
            this.form_project.CustSts = dictFilter(
              DICTYPE.EDW10030,
              this.form_project.CustSts
            );
            if (this.form_project.OrgName1 == "1") {
              this.form_project.OrgName1 = "是";
            } else if (this.form_project.OrgName1 == "0") {
              this.form_project.OrgName1 = "否";
            }
          }
        })
        .catch(() => {});
      getastsecpositiondetllist(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.LiCaiTableData = response.Data;
          }
        })
        .catch(() => {});
    },
    //-------------------------------------------------当前页(限售股)
    XianShouCurrentChange(val) {
      this.ShareCustomersInit();
    },
    //-------------------------------------------------当前要展示多少条（限售股）
    XianShouSizeChange(val) {
      this.XianShouPageSize = val;
      this.ShareCustomersInit();
    },
    //-------------------------------------------------当前页(理财股)
    LiCaiCurrentChange(val) {
      this.ShareCustomersInit();
    },
    //-------------------------------------------------当前要展示多少条（理财股）
    LiCaiSizeChange(val) {
      this.LiCaiPageSize = val;
      this.ShareCustomersInit();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_DerivativesHeadquartersInfo {
  font-size: 14px;
  min-height: 200px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  position: relative;
  .project_main {
    height: 100%;
    margin-top: 20px;
    padding: 20px 10px;
    .project_title {
      color: #a7703d;
      font-weight: bold;
      line-height: 20px;
      height: 20px;
      margin: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #eeeee9;
    }
    .content {
      height: 100%;
      .content_one {
        margin: 20px;
        margin-left: 0;
        h3 {
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          border-bottom: 2px solid #cf8e3e;
        }
      }
    }
  }
  button {
    margin: 0 3px;
  }
}
</style>
