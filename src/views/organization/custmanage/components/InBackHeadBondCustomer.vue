<template>
  <!-- 360传统页面 业务基本信息 投行信息  存续期债券信息-->
  <div class="yh_EditableInput">
    <div class="project clearfix">
      <div class="clearfix">
        <h3 v-if="false">项目信息</h3>
      </div>
      <div class="project_table ">
        <div class="project_title">项目列表</div>
        <div v-if="tableData != null">
          <div class="main_table">
            <el-table :data="tableData" @current-change="handleCurrentChangeGR" highlight-current-row size="mini" style="width: 100%">
              <el-table-column v-if="false" label="项目名称" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.CustName ? "暂无" :'' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="项目类型" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ PrjTypeDictionaries(scope.row.PrjType) }}</div>
                </template>
              </el-table-column>
              <el-table-column label="项目阶段" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ PrjPhaseDictionaries(scope.row.PrjPhase) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="project_main">
        <div class="project_title">项目详情</div>
        <div class="content clearfix">
          <el-form ref="form_project" :model="form_project" label-width="190px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="债券代码:" prop="XYMC1">
                  <el-input :title="form_project.BondCode" type="text" v-model="form_project.BondCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债券简称:" prop="XYMC">
                  <el-input :title="form_project.BondAbbr" type="text" v-model="form_project.BondAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发行方式:" prop="HTJE">
                  <el-input :title="form_project.IssueMode" type="text" v-model="form_project.IssueMode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目类型:" prop="BJF">
                  <el-input :title="form_project.PrjType" type="text" v-model="form_project.PrjType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所处阶段:" prop="CXFL">
                  <el-input :title="form_project.PrjPhase" type="text" v-model="form_project.PrjPhase" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="证券代码（A股）:" prop="CXF">
                  <el-input :title="form_project.Team" type="text" v-model="form_project.Team" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证券代码（H股）:" prop="WSJS">
                  <el-input :title="form_project.GshareCode" type="text" v-model="form_project.GshareCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中债登债券代码:" prop="YWBM">
                  <el-input :title="form_project.ZzdBondCode" type="text" v-model="form_project.ZzdBondCode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="中债登债券简称:" prop="TDFZR">
                  <el-input :title="form_project.ZzdBondAbbr" type="text" v-model="form_project.ZzdBondAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易所债券代码:" prop="XMFZR">
                  <el-input :title="form_project.ExchgCode" type="text" v-model="form_project.ExchgCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易所债券简称:" prop="XMZCY">
                  <el-input :title="form_project.ExchgAbbr" type="text" v-model="form_project.ExchgAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务部门:" prop="CLR">
                  <el-input :title="form_project.BizDep" type="text" v-model="form_project.BizDep" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="团队负责人:" prop="XBR">
                  <el-input :title="form_project.TeamHead" type="text" v-model="form_project.TeamHead" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目负责人:" prop="LXSJ">
                  <el-input :title="form_project.PrjHead" type="text" v-model="form_project.PrjHead" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="存续期项目组对接人员:" prop="CXQXM">
                  <el-input :title="form_project.AlignStaff" type="text" v-model="form_project.AlignStaff" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债券发行规模（亿元）:" prop="ZQFHGMY">
                  <el-input :title="form_project.BondIssueScale" type="text" v-model="form_project.BondIssueScale" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债券余额:" prop="ZQYE">
                  <el-input :title="form_project.BondBal" type="text" v-model="form_project.BondBal" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发行日期（T日）:" prop="FHRQ">
                  <el-input :title="form_project.IssueDate" type="text" v-model="form_project.IssueDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上市日期:" prop="SHRQ">
                  <el-input :title="form_project.ListDate" type="text" v-model="form_project.ListDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持续管理起始日:" prop="CXGLQSR">
                  <el-input :title="form_project.ContinuedMngStartDaily" type="text" v-model="form_project.ContinuedMngStartDaily" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="年兑付日:" prop="NDFR">
                  <el-input :title="form_project.YearCashDate" type="text" v-model="form_project.YearCashDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债券到期日:" prop="ZQDQR">
                  <el-input :title="form_project.BondMatureDate" type="text" v-model="form_project.BondMatureDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回售日期:" prop="HSRQ">
                  <el-input :title="form_project.PutDate" type="text" v-model="form_project.PutDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="持续管理结束日:" prop="CXGLJSR">
                  <el-input :title="form_project.ContinuedMngEndDaily" type="text" v-model="form_project.ContinuedMngEndDaily" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信用风险监管分类:" prop="XXFXJGL">
                  <el-input :title="form_project.CrdRiskClass" type="text" v-model="form_project.CrdRiskClass" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信用风险自评分类结果:" prop="XYFXZPING">
                  <el-input :title="form_project.CrdRiskSelfEvalClass" type="text" v-model="form_project.CrdRiskSelfEvalClass" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="信用风险自评分类得分:" prop="XYFXZPLDF">
                  <el-input :title="form_project.CrdRiskSelfEvalScore" type="text" v-model="form_project.CrdRiskSelfEvalScore" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="T-2年收入:" prop="NSR">
                  <el-input :title="form_project.T2AnnIncome" type="text" v-model="form_project.T2AnnIncome" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="T-1年收入:" prop="T1NSR">
                  <el-input :title="form_project.LastYearIncome" type="text" v-model="form_project.LastYearIncome" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当年收入:" prop="DNSR">
                  <el-input :title="form_project.CurrYrIncome" type="text" v-model="form_project.CurrYrIncome" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平均收入:" prop="PJSR">
                  <el-input :title="form_project.AvgIncome" type="text" v-model="form_project.AvgIncome" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="应付短期债券:" prop="YFDQZQ">
                  <el-input :title="form_project.PayableShortTermBond" type="text" v-model="form_project.PayableShortTermBond" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="一年内到期长期债券:" prop="YNNDQCQZ">
                  <el-input :title="form_project.Year1MatureLongTermDebt" type="text" v-model="form_project.Year1MatureLongTermDebt" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债券合计:" prop="ZQHJ">
                  <el-input :title="form_project.ShortTermBondTotal" type="text" v-model="form_project.ShortTermBondTotal" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="中长期偿债能力:" prop="ZCQCZNL">
                  <el-input :title="form_project.LongTermBondTotal" type="text" v-model="form_project.LongTermBondTotal" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="长期债券:" prop="CQCZ">
                  <el-input :title="form_project.LongTermBond" type="text" v-model="form_project.LongTermBond" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="短期债券:" prop="DQZQ">
                  <el-input :title="form_project.ShortTermBond" type="text" v-model="form_project.ShortTermBond" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="净资产:" prop="QZC">
                  <el-input :title="form_project.NetAsset" type="text" v-model="form_project.NetAsset" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="现金到期债务比:" prop="XJDQZWB">
                  <el-input :title="form_project.CashMatureDebtRatio" type="text" v-model="form_project.CashMatureDebtRatio" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="债券余额:" prop="ZQYE">
                  <el-input :title="form_project.DirectFinBondBal" type="text" v-model="form_project.DirectFinBondBal" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="短期借款:" prop="DQJK">
                  <el-input :title="form_project.ShortTermLoan" type="text" v-model="form_project.ShortTermLoan" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="长期借款:" prop="CQJK">
                  <el-input :title="form_project.LongTermLoan" type="text" v-model="form_project.LongTermLoan" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="1年内到期的非流动负债:" prop="YNNDQFLDFZ">
                  <el-input :title="form_project.Year1MatureNonCurrentLiab" type="text" v-model="form_project.Year1MatureNonCurrentLiab" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其他非流动负债:" prop="QTFLDY">
                  <el-input :title="form_project.OthNonCurrentLiab" type="text" v-model="form_project.OthNonCurrentLiab" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有息债务合计:" prop="YXZWHJ">
                  <el-input :title="form_project.IntrBearDebtTotal" type="text" v-model="form_project.IntrBearDebtTotal" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="EBITDA:" prop="EBITDA">
                  <el-input :title="form_project.Ebitda" type="text" v-model="form_project.Ebitda" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="利息支出（资本化利息+费用化利息）:" prop="LXZC">
                  <el-input :title="form_project.IntrExpense" type="text" v-model="form_project.IntrExpense" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="流动比率:" prop="LDBL">
                  <el-input :title="form_project.CurrentRatio" type="text" v-model="form_project.CurrentRatio" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产负债比率:" prop="ZCFZBL">
                  <el-input :title="form_project.AssetLiabRate" type="text" v-model="form_project.AssetLiabRate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上年净利润:" prop="SNFZBL">
                  <el-input :title="form_project.LastYearNetProfit" type="text" v-model="form_project.LastYearNetProfit" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="当年净利润:" prop="DNJLR">
                  <el-input :title="form_project.CurrYrNetProfit" type="text" v-model="form_project.CurrYrNetProfit" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="累计额:" prop="LJH">
                  <el-input :title="form_project.AggrAmt" type="text" v-model="form_project.AggrAmt" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评级情况:" prop="PJQK">
                  <el-input :title="form_project.WindIndustry" type="text" v-model="form_project.WindIndustry" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发行时主体评级:" prop="FHSZTPJ">
                  <el-input :title="form_project.IssueMainBodyGrade" type="text" v-model="form_project.IssueMainBodyGrade" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发行时债项评级:" prop="FHSZRPJ">
                  <el-input :title="form_project.IssueDebtGrade" type="text" v-model="form_project.IssueDebtGrade" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主体最新评级:" prop="ZTZXPJ">
                  <el-input :title="form_project.MainBodyLatestGrade" type="text" v-model="form_project.MainBodyLatestGrade" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="债项最新评级:" prop="ZXZXPJ">
                  <el-input :title="form_project.DebtLatestGrade" type="text" v-model="form_project.DebtLatestGrade" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发行人评级展望:" prop="FHEPJZW">
                  <el-input :title="form_project.IssuerGradeExpect" type="text" v-model="form_project.IssuerGradeExpect" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业性质:" prop="QYXZ">
                  <el-input :title="form_project.BondCorpNature" type="text" v-model="form_project.BondCorpNature" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="评级是否下调:" prop="PJSFXD">
                  <el-input :title="form_project.IsGradeCut" type="text" v-model="form_project.IsGradeCut" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="展望是否为负面:" prop="ZWSFWFM">
                  <el-input :title="form_project.IsExpectNegative " type="text" v-model="form_project.IsExpectNegative " disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否受到监管部门的非例行性检查:" prop="SFSDJGBMDFLXXJC">
                  <el-input :title="form_project.WindIndustry" type="text" v-model="form_project.WindIndustry" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getBondCustomerInfo,
  getBondCustomerproject
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "InBackHeadBondCustomer",
  data() {
    return {
      showinput: true, //------------------------------是否可编辑开关Uuid_formal
      requireUuid: this.$store.getters.Uuid_formal, //-点击人的Uuid
      currentPage: 1, //-------------------------------当前页
      pageSize: 10, //----------------------------------当前展示多少页
      total: null, //----------------------------------总数据
      tableData: null,
      form_project: {}
    };
  },
  created() {
    this.ShareCustomersInit(); //----------------------加载初始化数据
  },
  methods: {
    // -------------------------------------------------数据字典转码
    PrjTypeDictionaries(code) {
      return dictFilter(DICTYPE.CTCCD0101, code); //----项目类型
    },
    PrjPhaseDictionaries(code) {
      return dictFilter(DICTYPE.CTCCD0093, code); //----项目阶段
    },
    // -------------------------------------------------数据请求
    ShareCustomersInit(require) {
      var requires = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          Uuid: this.requireUuid,
          prjSrc: "06"
        }
      };
      // ---------------------------------------------------项目表格
      getBondCustomerproject(requires)
        .then(response => {
          this.tableData = response.Data;
          this.total = response.PageInfo.Total;
          this.handleCurrentChangeGR(response.Data[0]);
        })
        .catch(() => {});
    },
    // -----------------------------------------------------股融列表的的点击事件
    handleCurrentChangeGR(val) {
      var param = {
        param: {
          Uuid: val.Uuid,
          prjSno: val.PrjSno
        }
      };
      getBondCustomerInfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //-----------------------------------------------项目类型
            this.form_project.PrjType = dictFilter(
              DICTYPE.CTCCD0101,
              this.form_project.PrjType
            );
            //-----------------------------------------------所处阶段
            this.form_project.PrjPhase = dictFilter(
              DICTYPE.CTCCD0093,
              this.form_project.PrjPhase
            );
            //-----------------------------------------------发行方式
            this.form_project.IssueMode = dictFilter(
              DICTYPE.CTCCD0100,
              this.form_project.IssueMode
            );
          }
        })
        .catch(() => {});
    },
    //------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.ShareCustomersInit();
    },
    //------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.ShareCustomersInit();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/* 股融信息 */

.yh_EditableInput {
  font-size: 14px;
  min-height: 200px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  position: relative;
  .project {
    height: 24px;
    line-height: 24px;
    margin: 10px 0;
    border-bottom: 1px solid #eeeee9;
    margin-left: 10px;
    h3 {
      float: left;
      font-size: 14px;
      font-weight: bold;
      border-bottom: 2px solid #cf8e3e;
    }
    .project_table {
      margin-top: 24px;
      .project_title {
        color: #a7703d;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        margin: 10px 0;
        font-size: 14px;
        .main_table {
          margin-top: 10px;
          .el-table td div {
            overflow: hidden;
            text-overflow: ellipsis;
            a {
              color: blue;
              text-decoration: underline;
            }
          }
          .fa {
            font-size: 14px;
          }
        }
      }
    }
    .project_main {
      height: 100%;
      margin-top: 50px;
      .project_title {
        color: #a7703d;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        margin: 10px 0;
        font-size: 14px;
      }
      .content {
        height: 100%;
      }
    }
  }
  button {
    margin: 0 3px;
  }
}
</style>
