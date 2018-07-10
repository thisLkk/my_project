<template>
  <!-- 360传统页面 业务基本信息 投行信息  债融信息-->
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
            <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="立项备忘录签报号:">
              <el-input type="text" v-model="form_data.BusinessName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="立项备忘录名称:">
              <el-input type="text" v-model="form_data.BusinessName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item  label="立项申请表:">
              <el-input type="text" v-model="form_data.job"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
            <el-row  v-if="false">
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
                <el-form-item label="公司类型:" prop="GSLX">
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
                <el-form-item label="中国500强排名:" prop="YZ200Q">
                  <el-input type="text" v-model="form_project.BusinessName" :disabled="showinput"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  v-if="false" >
              <el-col :span="8">
                <el-form-item label="亚洲企业200强排名:" prop="ZG500Q">
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
                <el-form-item label="中债登代码:" prop="ZZDDM">
                  <el-input :title="form_project.ZzdCode" type="text" v-model="form_project.ZzdCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中债登简称:" prop="ZZDJC">
                  <el-input :title="form_project.ZzdAbbr" type="text" v-model="form_project.ZzdAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发行方式:" prop="FHFS">
                  <el-input :title="form_project.IssueMode" type="text" v-model="form_project.IssueMode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="交易所代码:" prop="JYSDM">
                  <el-input :title="form_project.ExchgCode" type="text" v-model="form_project.ExchgCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易所简称:" prop="JYSJC">
                  <el-input :title="form_project.ExchgAbbr" type="text" v-model="form_project.ExchgAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承销角色:" prop="CXJS">
                  <el-input :title="form_project.UnderwritingRole" type="text" v-model="form_project.UnderwritingRole" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发行/融资规模(亿):" prop="FHGM">
                  <el-input :title="form_project.FinScale" type="text" v-model="form_project.FinScale" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余发行/融资规模(亿):" prop="SYFH">
                  <el-input :title="form_project.SurplusFinScale" type="text" v-model="form_project.SurplusFinScale" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务部门:" prop="YWBM">
                  <el-input :title="form_project.BizDep" type="text" v-model="form_project.BizDep" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="false">
              <el-col :span="8">
                <el-form-item label="存续期我司角色:" prop="CXQWSJS">
                  <el-input :title="form_project.RecomGuaranteeFee" type="text" v-model="form_project.RecomGuaranteeFee" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存续期信用风险分类:" prop="CXQFXFL">
                  <el-input :title="form_project.UnderwritingFeeRate" type="text" v-model="form_project.UnderwritingFeeRate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存续期自评分类:" prop="CWQZPFL">
                  <el-input :title="form_project.FinanceAdviserFee" type="text" v-model="form_project.FinanceAdviserFee" disabled></el-input>
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
                  <el-input :title="form_project.PrjGrpMember" type="text" v-model="form_project.PrjGrpMember" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="承揽人:" prop="CLR">
                  <el-input :title="form_project.Contractor" type="text" v-model="form_project.Contractor" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="false">
                <el-form-item label="存续期对接人员:" prop="XBR">
                  <el-input :title="form_project.Coordinator" type="text" v-model="form_project.Coordinator" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债权代理人/受托管理人/牵头后续管理方:" prop="LXSJ">
                  <el-input :title="form_project.ObliRightAgent" type="text" v-model="form_project.ObliRightAgent" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同金额(万):" prop="BD1">
                  <el-input :title="form_project.ContAmt" type="text" v-model="form_project.ContAmt" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承销费(万):" prop="ZBR">
                  <el-input :title="form_project.UnderwritingFee" type="text" v-model="form_project.UnderwritingFee" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="财务顾问费(万):" prop="NHSJ">
                  <el-input :title="form_project.FinanceAdviserFee" type="text" v-model="form_project.FinanceAdviserFee" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="持续管理费(万):" prop="BD2">
                  <el-input :title="form_project.ContinuedMngFee" type="text" v-model="form_project.ContinuedMngFee" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承销费率(%):" prop="CHZZ">
                  <el-input :title="form_project.UnderwritingRates" type="text" v-model="form_project.UnderwritingRates" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主体评级(发行时):" prop="YJSB">
                  <el-input :title="form_project.MainBodyGradeIssue" type="text" v-model="form_project.MainBodyGradeIssue" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="债项评级(发行时):" prop="SHJG">
                  <el-input :title="form_project.DebtGradeIssue" type="text" v-model="form_project.DebtGradeIssue" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主体评级(最新):" prop="SCBS">
                  <el-input :title="form_project.LatestMainBodyGrade" type="text" v-model="form_project.LatestMainBodyGrade" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债项评级(最新):" prop="SCSL">
                  <el-input :title="form_project.DebtGradeLatest" type="text" v-model="form_project.DebtGradeLatest" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发行人最新评级展望:" prop="JGJGSH">
                  <el-input :title="form_project.IssuerLatestGradeExpect" type="text" v-model="form_project.IssuerLatestGradeExpect" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债项最新评级展望:" prop="CSHSJ">
                  <el-input :title="form_project.DebtLatestGradeExpect" type="text" v-model="form_project.DebtLatestGradeExpect" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="立项时间:" prop="FSW">
                  <el-input :title="form_project.StandingTime  " type="text" v-model="form_project.StandingTime  " disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="监管机构审核员:" prop="ZKXZ">
                  <el-input :title="form_project.RegulatoryOrgAuditor" type="text" v-model="form_project.RegulatoryOrgAuditor" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="内核时间:" prop="SHYJ">
                  <el-input :title="form_project.InterVerifyTime" type="text" v-model="form_project.InterVerifyTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申报时间:" prop="FJSJ">
                  <el-input :title="form_project.RptTime" type="text" v-model="form_project.RptTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="质控小组成员:" prop="CXSLS">
                  <el-input :title="form_project.QualityCtrlGrpMember" type="text" v-model="form_project.QualityCtrlGrpMember" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="受理时间:" prop="PWSJ">
                  <el-input :title="form_project.AcceptTime" type="text" v-model="form_project.AcceptTime" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="历次反馈/回复时间:" prop="FHRQ">
                  <el-input :title="form_project.ReTime" type="text" v-model="form_project.ReTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="承销商律师:" prop="HS">
                  <el-input :title="form_project.UnderwriterLawyer" type="text" v-model="form_project.UnderwriterLawyer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核结果:" prop="QZHJS">
                  <el-input :title="form_project.AuditResult" type="text" v-model="form_project.AuditResul " disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批文时间:" prop="SHRQ">
                  <el-input :title="form_project.ApprovalTime" type="text" v-model="form_project.ApprovalTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="会所:" prop="LS">
                  <el-input :title="form_project.AccountFirm" type="text" v-model="form_project.AccountFirm" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发行日期:" prop="QZLS">
                  <el-input :title="form_project.IssueDate" type="text" v-model="form_project.IssueDate" disabled></el-input>
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
                <el-form-item label="签字会计师:" prop="PGJG">
                  <el-input :title="form_project.SignAcct" type="text" v-model="form_project.SignAcct" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年兑付日:" prop="QZPGS">
                  <el-input :title="form_project.YearCashDate" type="text" v-model="form_project.YearCashDate" disabled></el-input>
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
                <el-form-item label="律所:" prop="FXSX">
                  <el-input :title="form_project.LawOffices" type="text" v-model="form_project.LawOffices" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="债券到期日:" prop="KCRY">
                  <el-input :title="form_project.BondMatureDate" type="text" v-model="form_project.BondMatureDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回售日期:" prop="ZKRY">
                  <el-input :title="form_project.PutDate" type="text" v-model="form_project.PutDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="签字律师:" prop="xzls">
                  <el-input :title="form_project.SignLawyer" type="text" v-model="form_project.SignLawyer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签字评估师:" prop="QZPGS1">
                  <el-input :title="form_project.SignAppraiser" type="text" v-model="form_project.SignAppraiser" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="督导期现场核查人员及日期:" prop="ZKSRY">
                  <el-input :title="form_project.SupervisionVerifyStaffDt" type="text" v-model="form_project.SupervisionVerifyStaffDt" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="评估师:" prop="xzls">
                  <el-input :title="form_project.SignAppraiser" type="text" v-model="form_project.SignAppraiser" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险事项:" prop="QZPGS1">
                  <el-input :title="form_project.RiskItem" type="text" v-model="form_project.RiskItem" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="质控现场核查人员及日期:" prop="ZKSRY">
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
  getDebtMeltsInfo,
  getDebtMeltsproject
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //----------数据字典的方法
export default {
  name: "InBackHeadDebtMelts",
  data() {
    return {
      showinput: true, //-----------------------------是否可编辑开关Uuid_formal
      requireUuid: this.$store.getters.Uuid_formal, //-点击人的Uuid
      currentPage: 1, //-------------------------------当前页
      pageSize: 10, //---------------------------------当前展示多少页
      total: null, //----------------------------------总数据
      tableData: null,
      form_project: {}
    };
  },
  created() {
    this.ShareCustomersInit(); //----------------------加载初始化数据
  },
  methods: {
    // ------------------------------------------------数据字典转码
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
          prjSrc: "02"
        }
      };
      // ---------------------------------------------项目表格
      getDebtMeltsproject(requires)
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
      // ---------------------------------------------项目信息
      var param = {
        param: {
          Uuid: val.Uuid,
          prjSno: val.PrjSno,
        }
      };
      getDebtMeltsInfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            this.form_project.IssueMode = dictFilter(DICTYPE.CTCCD0100, this.form_project.IssueMode);//发行方式
            this.form_project.AuditResult = dictFilter(DICTYPE.CTCCD0097, this.form_project.AuditResult);//审核结果
            this.form_project.DebtLatestGradeExpect = dictFilter(DICTYPE.CTCCD0106, this.form_project.DebtLatestGradeExpect);//最新评级展望
            this.form_project.IssuerLatestGradeExpect = dictFilter(DICTYPE.CTCCD0116, this.form_project.IssuerLatestGradeExpect);//发行人最新评级展望
          }
        })
        .catch(() => {});
    },
    //-------------------------------------------------编辑显示可操作
    show_input() {
      this.showinput = !this.showinput;
    },
    //-------------------------------------------------保存请求接口
    preservation() {
      if (this.showinput) {
        this.showinput = false;
      } else {
      }
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
