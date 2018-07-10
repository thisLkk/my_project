<template>
  <!-- 360传统页面 债券投资部信息-->
  <div class="yh_ResearchInvestment">
    <div class="project_main">
      <div class="project_title">基本信息</div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属营业部:" prop="XYMC1">
                <el-input :title="form_project.OrgName" type="text" v-model="form_project.OrgName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属地区:" prop="XYMC">
                <el-input :title="form_project.RegionCode" type="text" v-model="form_project.RegionCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户代码:" prop="HTJE">
                <el-input :title="form_project.CustNo" type="text" v-model="form_project.CustNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="资金账户:" prop="BJF">
                <el-input :title="form_project.SecAcct" type="text" v-model="form_project.SecAcct" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上海股东账户:" prop="CXFL">
                <el-input :title="form_project.SecAcctSh" type="text" v-model="form_project.SecAcctSh" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="深圳股东账户:" prop="CWGWF">
                <el-input :title="form_project.SecAcctSz" type="text" v-model="form_project.SecAcctSz" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户风险等级:" prop="khfxdj">
                <el-input :title="form_project.RiskEndureAbility" type="text" v-model="form_project.RiskEndureAbility" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="风险等级有效期:" prop="FXDJYXQ">
                <el-input :title="form_project.LatestTestingEffDdlnDate" type="text" v-model="form_project.LatestTestingEffDdlnDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="天天利资格申请日期:" prop="TTLZGSQ">
                <el-input :title="form_project.FtTtlSetup" type="text" v-model="form_project.FtTtlSetup" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="有否水一资格:" prop="CXF">
                <el-input :title="form_project.IsSetupMercuryNo1" type="text" v-model="form_project.IsSetupMercuryNo1" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="有否购买收益凭证:" prop="WSJS">
                <el-input :title="form_project.BoughtPayoffVou" type="text" v-model="form_project.BoughtPayoffVou" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="有否购买公司代销理财产品:" prop="YFGMGSDL">
                <el-input :title="form_project.BoughtComFinPrd" type="text" v-model="form_project.BoughtComFinPrd" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="project_main">
      <div class="project_title">交易要素</div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="天天利首次开通日期:" prop="TTLSCKTRQ">
                <el-input :title="form_project.FtTtlSetupF" type="text" v-model="form_project.FtTtlSetupF" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金自来最近到期日期:" prop="JZLZJDQRQ">
                <el-input :title="form_project.RtJzlMature" type="text" v-model="form_project.RtJzlMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="买过货币基金标志:" prop="MGHBJJBS">
                <el-input :title="form_project.BoughtCrrcFundFlag" type="text" v-model="form_project.BoughtCrrcFundFlag" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="天天利首次参与日期:" prop="CYRQ">
                <el-input :title="form_project.FtTtlJoin" type="text" v-model="form_project.FtTtlJoin" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银河金山收益凭证最近到期日期:" prop="JSSYPZ">
                <el-input :title="form_project.RtJssypzMature" type="text" v-model="form_project.RtJssypzMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="买过国债逆回购标志:" prop="MGGZHGBZ">
                <el-input :title="form_project.BoughtTreaReverseRepoFlag" type="text" v-model="form_project.BoughtTreaReverseRepoFlag" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="天天利最近到期日期:" prop="DQRQ">
                <el-input :title="form_project.RtJzlMature" type="text" v-model="form_project.RtJzlMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当日保证金（元）:" prop="DRBZJ">
                <el-input :title="form_project.CptlBal" type="text" v-model="form_project.CptlBal" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当日A股市值（不含基金）:" prop="DRAGSZ">
                <el-input :title="form_project.AbshareMktVal" type="text" v-model="form_project.AbshareMktVal" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getinvestmentinbondsinfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "BondInvestmentDepartmentInfo",
  data() {
    return {
      showinput: true, //------------------------------是否可编辑开关（暂无使用）
      form_project: {}
    };
  },
  created() {
    this.ShareCustomersInit(); //----------------------加载初始化数据
  },
  methods: {
    ShareCustomersInit(val) {
      var param = {
        param: {
          Uuid: this.$store.getters.Uuid_formal
          //   Uuid: "6FC419E6C49DB20EE0534A47010A2C45",
        }
      };
      getinvestmentinbondsinfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //-----------------------------------------------督导类型
            this.form_project.OrgNo = dictFilter(
              DICTYPE.CTCCD0998,
              this.form_project.OrgNo
            );
            //-----------------------------------------------所属分层
            this.form_project.BelongsLayer = dictFilter(
              DICTYPE.CTCCD0099,
              this.form_project.BelongsLayer
            );
            //-----------------------------------------------风险等级
            this.form_project.RiskEndureAbility = dictFilter(
              DICTYPE.OSPCD0246,
              this.form_project.RiskEndureAbility
            );
            //-----------------------------------------------有否水一资格
            switch (this.form_project.IsSetupMercuryNo1) {
              case "0":
                this.form_project.IsSetupMercuryNo1 = "否";
                break;
              case "1":
                this.form_project.IsSetupMercuryNo1 = "有";
                break;
              default:
                break;
            }
            //-----------------------------------------------有否购买收益凭证:
            switch (this.form_project.BoughtPayoffVou) {
              case "0":
                this.form_project.BoughtPayoffVou = "否";
                break;
              case "1":
                this.form_project.BoughtPayoffVou = "有";
                break;
              default:
                break;
            }
            //-----------------------------------------------有否购买公司代销理财产品:
            switch (this.form_project.BoughtPayoffVou) {
              case "0":
                this.form_project.BoughtComFinPrd = "否";
                break;
              case "1":
                this.form_project.BoughtComFinPrd = "有";
                break;
              default:
                break;
            }
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_ResearchInvestment {
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
  button {
    margin: 0 3px;
  }
}
</style>
