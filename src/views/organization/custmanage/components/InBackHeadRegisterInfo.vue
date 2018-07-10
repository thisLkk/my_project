<template>
  <!-- 360传统页面 业务基本信息 投行信息  登记信息-->
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
                  <div>{{ scope.row.PrjType }}</div>
                </template>
              </el-table-column>
              <el-table-column label="项目阶段" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.PrjPhase }}</div>
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
                <el-form-item label="客户类型:" prop="XYMC">
                  <el-input type="text" v-model="form_project.InvestorBankCustType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登记人:" prop="FHGM">
                  <el-input  type="text" v-model="form_project.WrTabPer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登记日期:" prop="WSJS">
                  <el-input :title="form_project.RegDateStr" type="text" v-model="form_project.RegDateStr" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="第一大股东:" prop="HTJE">
                  <el-input  type="text" v-model="form_project.FstBigStkhld" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第一大股东占比%:" prop="CXF">
                  <el-input  type="text" v-model="form_project.FstBigStkhldRatio" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际控制人:" prop="BJF">
                  <el-input :title="form_project.ActualCtrlPer" type="text" v-model="form_project.ActualCtrlPer" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="false" :span="8">
                <el-form-item label="市值（亿）:" prop="CWGWF">
                  <el-input  type="text" v-model="form_project.MktVal" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主营业务收入（亿）:" prop="CXFL">
                  <el-input :title="form_project.MainBizIncome" type="text" v-model="form_project.MainBizIncome" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主营收入增长率（%）:" prop="YWBM">
                  <el-input :title="form_project.MainIncomeGrowthRate" type="text" v-model="form_project.MainIncomeGrowthRate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="总资产（亿）:" prop="CWGWF">
                  <el-input :title="form_project.TotlAsset" type="text" v-model="form_project.TotlAsset" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="净资产（亿）:" prop="CXGLF">
                  <el-input type="text" v-model="form_project.NetAsset" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="净利润（亿）:" prop="SHJGSHJG">
                  <el-input :title="form_project.NetProfit" type="text" v-model="form_project.NetProfit" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="扣非净利润（亿）:" prop="TDFZR">
                  <el-input :title="form_project.DeductNrlossNetProfit" type="text" v-model="form_project.DeductNrlossNetProfit" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="ROE（%）:" prop="XMFZR">
                  <el-input :title="form_project.Roe" type="text" v-model="form_project.Roe" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产负债率:" prop="XMZCY">
                  <el-input :title="form_project.AssetLiabRate" type="text" v-model="form_project.AssetLiabRate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="流动比率:" prop="CLR">
                  <el-input :title="form_project.CurrentRatio" type="text" v-model="form_project.CurrentRatio" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="速动比率:" prop="LXSJ">
                  <el-input :title="form_project.QuickRatio" type="text" v-model="form_project.QuickRatio" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="应收账款周转率:" prop="NHSJ">
                  <el-input :title="form_project.ReceiveTurnover" type="text" v-model="form_project.ReceiveTurnover" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="存货周转率:" prop="JGJGSH">
                  <el-input :title="form_project.InvTurnover" type="text" v-model="form_project.InvTurnover" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总资产周转率:" prop="CHZZ">
                  <el-input :title="form_project.TotlAssetTurnover" type="text" v-model="form_project.TotlAssetTurnover" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="立项时间:" prop="ZKXZ">
                  <el-input :title="form_project.StandingTime" type="text" v-model="form_project.StandingTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目负责人:" prop="SCBS">
                  <el-input :title="form_project.PrjHead" type="text" v-model="form_project.PrjHead" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门:" prop="SCSL">
                  <el-input :title="form_project.BelongsDep" type="text" v-model="form_project.BelongsDep" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目承揽人:" prop="CXSLS">
                  <el-input :title="form_project.PrjContractor" type="text" v-model="form_project.PrjContractor" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保荐代表人:" prop="SHYJ">
                  <el-input :title="form_project.RecomGuaranteeReprsnt" type="text" v-model="form_project.RecomGuaranteeReprsnt" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="财务顾问主办人:" prop="PWSJ">
                  <el-input :title="form_project.FinanceAdviserHostPer" type="text" v-model="form_project.FinanceAdviserHostPer" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="支持领导:" prop="HS">
                  <el-input :title="form_project.SupLeader" type="text" v-model="form_project.SupLeader" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户经理:" prop="QZHJS">
                  <el-input :title="form_project.CustMagName" type="text" v-model="form_project.CustMagName " disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户经理电话:" prop="SXGLQSZ">
                  <el-input :title="form_project.CustMagPhone" type="text" v-model="form_project.CustMagPhone" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目费用（万）:" prop="LS">
                  <el-input :title="form_project.PrjExps" type="text" v-model="form_project.PrjExps" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目收入（万）:" prop="QZLS">
                  <el-input :title="form_project.PrjIncome" type="text" v-model="form_project.PrjIncome" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计协同收入:" prop="CXGLJSR">
                  <el-input :title="form_project.ForecastCoordiIncome" type="text" v-model="form_project.ForecastCoordiIncome" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="协同部门:" prop="LSS">
                  <el-input :title="form_project.CoordiDep" type="text" v-model="form_project.CoordiDep" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协同经理:" prop="DDY">
                  <el-input :title="form_project.CoordiMag" type="text" v-model="form_project.CoordiMag" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计完成时间:" prop="KCRY">
                  <el-input :title="form_project.ForecastFinishTime" type="text" v-model="form_project.ForecastFinishTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否招投标:" prop="QZLV">
                  <el-input :title="form_project.IsTendering" type="text" v-model="form_project.IsTendering" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标被授权人:" prop="SSFC">
                  <el-input :title="form_project.TenderingAuthorizedPer" type="text" v-model="form_project.TenderingAuthorizedPer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="融资规模（亿）:" prop="ZKRY">
                  <el-input :title="form_project.FinScale" type="text" v-model="form_project.FinScale" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="经办人:" prop="QZLV">
                  <el-input :title="form_project.ResponPer" type="text" v-model="form_project.ResponPer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投标保证金（万）:" prop="SSFC">
                  <el-input :title="form_project.BidBond" type="text" v-model="form_project.BidBond" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开标时间:" prop="ZKRY">
                  <el-input :title="form_project.TenderOpenTime" type="text" v-model="form_project.TenderOpenTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="调查日期:" prop="QZLV">
                  <el-input :title="form_project.InquiryDate" type="text" v-model="form_project.InquiryDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被访谈人:" prop="SSFC">
                  <el-input :title="form_project.Interviewee" type="text" v-model="form_project.Interviewee" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被访谈人电话:" prop="ZKRY">
                  <el-input :title="form_project.IntervieweeMob" type="text" v-model="form_project.IntervieweeMob" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务水平:" prop="QZLV">
                  <el-input :title="form_project.BizLvl" type="text" v-model="form_project.BizLvl" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工作态度:" prop="SSFC">
                  <el-input :title="form_project.WorkAttitude" type="text" v-model="form_project.WorkAttitude" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="沟通及时性:" prop="ZKRY">
                  <el-input :title="form_project.CommunicationTimeliness" type="text" v-model="form_project.CommunicationTimeliness" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="综合能力:" prop="QZLV">
                  <el-input :title="form_project.SyntheticAbility" type="text" v-model="form_project.SyntheticAbility" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客服经理:" prop="SSFC">
                  <el-input :title="form_project.CustSrvMag" type="text" v-model="form_project.CustSrvMag" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="其他意见及建议:" prop="BZ">
                  <el-input type="textarea" :rows="2" v-model="form_project.OthOpionPropose" disabled></el-input>
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
  getRegisterInfo,
  getRegister
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法  InBackHeadRegisterInfo
export default {
  name: "InBackHeadRegisterInfo",
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
      return dictFilter(DICTYPE.CTCCD0092, code); //----项目类型
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
          prjSrc: "04"
        }
      };
      // ---------------------------------------------项目表格
      getRegister(requires)
        .then(response => {
          this.tableData = response.Data;
          this.total = response.PageInfo.Total;
          this.handleCurrentChangeGR(response.Data[0]);
        })
        .catch(() => {});
    },
    // -----------------------------------------------股融列表的的点击事件
    handleCurrentChangeGR(val) {
      var param = {
        param: {
          Uuid: val.Uuid,
          prjSno: val.PrjSno
        }
      };
      getRegisterInfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //-----------------------------------------------客户类型
            this.form_project.InvestorBankCustType = dictFilter(
              DICTYPE.CTCCD0113,
              this.form_project.InvestorBankCustType
            );
          }
        })
        .catch(() => {});
    },
    //-------------------------------------------------当前页
    handleCurrentChange(val) {
      this.ShareCustomersInit();
    },
    //-------------------------------------------------当前要展示多少条
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
