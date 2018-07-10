<template>
  <!-- 360传统页面 业务基本信息 投行信息  股融信息-->
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
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="企业性质:" prop="QYXZ">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际控制人:" prop="SJKZR">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所在区域:" prop="SZQY">
                  <el-input type="text" v-model="form_project.job" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="上市板块:" prop="SHBK">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="H股代码:" prop="HGDM">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户类型:" prop="KHLX">
                  <el-input type="text" v-model="form_project.job" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="福布斯排名:" prop="FBSPM">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="财富排名:" prop="CFPM">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="亚洲企业200强排名:" prop="YZ200Q">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="中国500强排名:" prop="ZG500Q">
                  <el-input type="text" v-model="form_project.job" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上一年度主营业务收入(万):" prop="ZYSR">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上一年末净资产(万):" prop="JZC">
                  <el-input type="text" v-model="form_project.job" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发行/融资规模(亿元):" prop="FHGM">
                  <el-input :title="form_project.FinScale" type="text" v-model="form_project.FinScale" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议名称及签署日期:" prop="XYMC">
                  <el-input :title="form_project.AgtNameAndAffixToDate" type="text" v-model="form_project.AgtNameAndAffixToDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同金额(万):" prop="HTJE">
                  <el-input :title="form_project.ContAmt" type="text" v-model="form_project.ContAmt" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="保荐费(万):" prop="BJF">
                  <el-input :title="form_project.RecomGuaranteeFee" type="text" v-model="form_project.RecomGuaranteeFee" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承销费率(%):" prop="CXFL">
                  <el-input :title="form_project.UnderwritingFeeRate" type="text" v-model="form_project.UnderwritingFeeRate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="财务顾问费(万):" prop="CWGWF">
                  <el-input :title="form_project.FinanceAdviserFee" type="text" v-model="form_project.FinanceAdviserFee" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="承销费(万):" prop="CXF">
                  <el-input :title="form_project.UnderwritingFee" type="text" v-model="form_project.UnderwritingFee" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="我司角色:" prop="WSJS">
                  <el-input :title="form_project.OurCoRole" type="text" v-model="form_project.OurCoRole" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务部门:" prop="YWBM">
                  <el-input :title="form_project.BizDep" type="text" v-model="form_project.BizDep" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="团队负责人:" prop="TDFZR">
                  <el-input :title="form_project.TeamHead" type="text" v-model="form_project.TeamHead" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目负责人:" prop="XMFZR">
                  <el-input :title="form_project.PrjHead" type="text" v-model="form_project.PrjHead" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目组成员:" prop="XMZCY">
                  <el-input :title="form_project.PrjMember" type="text" v-model="form_project.PrjMember" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="承揽人:" prop="CLR">
                  <el-input :title="form_project.Contractor" type="text" v-model="form_project.Contractor" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协办人:" prop="XBR">
                  <el-input :title="form_project.Coordinator" type="text" v-model="form_project.Coordinator" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="立项时间:" prop="LXSJ">
                  <el-input :title="form_project.StandingTime" type="text" v-model="form_project.StandingTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="保代1:" prop="BD1">
                  <el-input :title="form_project.SponsorRepr1" type="text" v-model="form_project.SponsorRepr1" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主办人:" prop="ZBR">
                  <el-input :title="form_project.HostPer" type="text" v-model="form_project.HostPer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="内核时间:" prop="NHSJ">
                  <el-input :title="form_project.InterVerifyTime" type="text" v-model="form_project.InterVerifyTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="保代2:" prop="BD2">
                  <el-input :title="form_project.SponsorRepr2" type="text" v-model="form_project.SponsorRepr2" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="撤回/终止时间:" prop="CHZZ">
                  <el-input :title="form_project.EndTime" type="text" v-model="form_project.EndTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计申报/完成时间:" prop="YJSB">
                  <el-input :title="form_project.ForecastRptTime" type="text" v-model="form_project.ForecastRptTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="审核结果:" prop="SHJG">
                  <el-input :title="form_project.AuditResult" type="text" v-model="form_project.AuditResult" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="首次报审时间:" prop="SCBS">
                  <el-input :title="form_project.FstTimeReviewApprovalTime" type="text" v-model="form_project.FstTimeReviewApprovalTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="首次受理时间:" prop="SCSL">
                  <el-input :title="form_project.FstTimeAcceptTime" type="text" v-model="form_project.FstTimeAcceptTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="监管机构审核员:" prop="JGJGSH">
                  <el-input :title="form_project.RegulatoryOrgAuditor" type="text" v-model="form_project.RegulatoryOrgAuditor" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初审会时间:" prop="CSHSJ">
                  <el-input :title="form_project.TrialTime" type="text" v-model="form_project.TrialTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发审委/重组委时间:" prop="FSW">
                  <el-input :title="form_project.IssueAuditTime" type="text" v-model="form_project.IssueAuditTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="质控小组成员:" prop="ZKXZ">
                  <el-input :title="form_project.QualityCtrlGrpMember" type="text" v-model="form_project.QualityCtrlGrpMember" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核意见下达/答复时间:" prop="SHYJ">
                  <el-input :title="form_project.AuditOpionIssuedTime" type="text" v-model="form_project.AuditOpionIssuedTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="封卷时间:" prop="FJSJ">
                  <el-input :title="form_project.ClosingTime" type="text" v-model="form_project.ClosingTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="承销商律师:" prop="CXSLS">
                  <el-input :title="form_project.UnderwriterLawyer" type="text" v-model="form_project.UnderwriterLawyer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批文时间:" prop="PWSJ">
                  <el-input :title="form_project.ApprovalTime" type="text" v-model="form_project.ApprovalTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发行日期(T日):" prop="FHRQ">
                  <el-input :title="form_project.IssueDate" type="text" v-model="form_project.IssueDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="会所:" prop="HS">
                  <el-input :title="form_project.AccountFirm" type="text" v-model="form_project.AccountFirm" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签字会计师:" prop="QZHJS">
                  <el-input :title="form_project.SignAcct" type="text" v-model="form_project.SignAcct " disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上市(完成)日期:" prop="SHRQ">
                  <el-input :title="form_project.ListDate" type="text" v-model="form_project.ListDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="律所:" prop="LS">
                  <el-input :title="form_project.LawOffices" type="text" v-model="form_project.LawOffices" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签字律师:" prop="QZLS">
                  <el-input :title="form_project.SignLawyer" type="text" v-model="form_project.SignLawyer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持续管理起始日:" prop="SXGLQSZ">
                  <el-input :title="form_project.ContinuedMngStartDaily" type="text" v-model="form_project.ContinuedMngStartDaily" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="评估机构:" prop="PGJG">
                  <el-input :title="form_project.EvalOrg" type="text" v-model="form_project.EvalOrg" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签字评估师:" prop="QZPGS">
                  <el-input :title="form_project.SignAppraiser" type="text" v-model="form_project.SignAppraiser" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持续管理结束日:" prop="CXGLJSR">
                  <el-input :title="form_project.ContinuedMngEndDaily" type="text" v-model="form_project.ContinuedMngEndDaily" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="风险事项:" prop="FXSX">
                  <el-input :title="form_project.RiskItem" type="text" v-model="form_project.RiskItem" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="督导期现场核查人员及日期:" prop="KCRY">
                  <el-input :title="form_project.SupervisionVerifyStaffDt" type="text" v-model="form_project.SupervisionVerifyStaffDt" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="质控现场核查人员及日期:" prop="ZKRY">
                  <el-input :title="form_project.QualityCtrlVerifyStaffDt" type="text" v-model="form_project.QualityCtrlVerifyStaffDt" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注:" prop="BZ">
                  <el-input type="textarea" :rows="2" v-model="form_project.Remk" disabled></el-input>
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
  getShareCustomersInfo,
  getShareCustomersproject
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "InBackHeadShareCustomersInfo",
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
          prjSrc: "01"
        }
      };
      // ---------------------------------------------项目表格
      getShareCustomersproject(requires)
        .then(response => {
          this.tableData = response.Data;
          this.total = response.PageInfo.Total;
          this.handleCurrentChangeGR(response.Data[0]);
        })
        .catch(() => {});
    },
    // -----------------------------------------------股融列表的的点击事件
    handleCurrentChangeGR(val) {
      //console.log(val);
      var param = {
        param: {
          Uuid: val.Uuid,
          prjSno: val.PrjSno
        }
      };
      getShareCustomersInfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //----------------------------------------我司角色
            this.form_project.OurCoRole = dictFilter(
              DICTYPE.CTCCD0095,
              this.form_project.OurCoRole
            );
            this.form_project.AuditResult = dictFilter(
              DICTYPE.CTCCD0097,
              this.form_project.AuditResult
            ); //审核结果
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
