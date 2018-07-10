<template>
  <!-- 360传统页面 证券金融部信息-->
  <div class="yh_ResearchInvestment">
    <div class="project_main">
      <div class="project_title"><h3>普通账户</h3></div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="普通账户开户日期:" prop="XYMC1">
                <el-input :title="form_project.OrgName" type="text" v-model="form_project.OrgName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="普通账户总资产（元）:" prop="XYMC">
                <el-input :title="form_project.RegionCode" type="text" v-model="form_project.RegionCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="普通账户持仓（元）:" prop="HTJE">
                <el-input :title="form_project.CustNo" type="text" v-model="form_project.CustNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div v-if="false" class="project_main">
      <div class="project_title"><h3>两融业务</h3></div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="信用账户开户日期:" prop="TTLSCKTRQ">
                <el-input :title="form_project.FtTtlSetupF" type="text" v-model="form_project.FtTtlSetupF" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="授信额度（万元）:" prop="JZLZJDQRQ">
                <el-input :title="form_project.RtJzlMature" type="text" v-model="form_project.RtJzlMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维持担保比例:" prop="MGHBJJBS">
                <el-input :title="form_project.BoughtCrrcFundFlag" type="text" v-model="form_project.BoughtCrrcFundFlag" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="信用账户总资产（万元）:" prop="CYRQ">
                <el-input :title="form_project.FtTtlJoin" type="text" v-model="form_project.FtTtlJoin" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="征信评级:" prop="JSSYPZ">
                <el-input :title="form_project.RtJssypzMature" type="text" v-model="form_project.RtJssypzMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="追保维持担保比例:" prop="MGGZHGBZ">
                <el-input :title="form_project.BoughtTreaReverseRepoFlag" type="text" v-model="form_project.BoughtTreaReverseRepoFlag" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="信用账户总负债（万元）:" prop="DQRQ">
                <el-input :title="form_project.RtJzlMature" type="text" v-model="form_project.RtJzlMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资利率:" prop="DRBZJ">
                <el-input :title="form_project.CptlBal" type="text" v-model="form_project.CptlBal" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平仓维持担保比例:" prop="DRAGSZ">
                <el-input :title="form_project.AbshareMktVal" type="text" v-model="form_project.AbshareMktVal" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="信用账户持仓（万元）:" prop="XYCC">
                <el-input :title="form_project.RtJzlMature" type="text" v-model="form_project.RtJzlMature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融券费率:" prop="RZFL">
                <el-input :title="form_project.CptlBal" type="text" v-model="form_project.CptlBal" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="project_main">
      <div class="project_title"><h3>股票质押业务</h3></div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="260px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="上海限售股市值（元）:" prop="SHXSSZ">
                <el-input :title="form_project.ShSecMktVal" type="text" v-model="form_project.ShSecMktVal" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否具有托管市值2000万元以上的单一股票:" prop="SFJYTU">
                <el-input :title="form_project.CustodyMktValFlagT" type="text" v-model="form_project.CustodyMktValFlagT" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="深圳限售股市值（元）:" prop="SZXSSZ">
                <el-input :title="form_project.SzSecMktVal" type="text" v-model="form_project.SzSecMktVal" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否具有托管市值5000万元以上的单一股票:" prop="SFJYTGZ">
                <el-input :title="form_project.CustodyMktValFlagF" type="text" v-model="form_project.CustodyMktValFlagF" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="流通股(持仓)市值（元）:" prop="LTG">
                <el-input :title="form_project.PositionCost" type="text" v-model="form_project.PositionCost" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否具有托管市值1亿元以上的单一股票:" prop="SFJYTGZY">
                <el-input :title="form_project.CustodyMktValFlagO" type="text" v-model="form_project.CustodyMktValFlagO" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="股票质押市值（元）:" prop="GPZYSZ">
                <el-input :title="form_project.StkPledgeMktVal" type="text" v-model="form_project.StkPledgeMktVal" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { formatCurrency } from "@/utils/index.js"; //---------------------------转换金额的方法
import { getinvestmentinbondsinfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "SecuritiesFinancialHeadquartersInfo",
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
            this.form_project.RegionCode= formatCurrency(response.Data.RegionCode); //转换为千分位
            this.form_project.CustNo= formatCurrency(response.Data.CustNo); 
            this.form_project.ShSecMktVal= formatCurrency(response.Data.ShSecMktVal); 
            this.form_project.SzSecMktVal= formatCurrency(response.Data.SzSecMktVal); 
            this.form_project.PositionCost= formatCurrency(response.Data.PositionCost); 
            this.form_project.StkPledgeMktVal= formatCurrency(response.Data.StkPledgeMktVal); 
            this.form_project.CustodyMktValFlagT == "1" ? "是" :this.form_project.CustodyMktValFlagT =="0" ? "否" :"";
            this.form_project.CustodyMktValFlagF == "1" ? "是" :this.form_project.CustodyMktValFlagF =="0" ? "否" :"";
            this.form_project.CustodyMktValFlagO == "1" ? "是" :this.form_project.CustodyMktValFlagO =="0" ? "否" :"";
            //-----------------------------------------------风险等级
            this.form_project.RiskEndureAbility = dictFilter(
              DICTYPE.OSPCD0246,
              this.form_project.RiskEndureAbility
            );
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
      h3 {
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 2px solid #cf8e3e;
      }
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
