<template>
  <!-- 360视图-全景视图-业务信息栏目-投资银行组件 -->
  <div class="yh_InvestmentBankHeadquarters">
    <div class="allshow none_ active">
      <el-tabs v-model="BusinessQueryName" type="border-card" @tab-click="TabshandleClick">
        <el-tab-pane v-if="isShowTabs01" label="股融客户" name="ShareCustomers">
          <div class="ShareCustomers" v-if="BusinessQueryName == 'ShareCustomers'">
            <!-- 股融客户 ShareCustomersInfo-->
            <InBackHeadShareCustomersInfo requireName="股融客户"></InBackHeadShareCustomersInfo>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="isShowTabs02" label="债融客户" name="DebtMeltedCustomers">
          <div class="DebtMeltedCustomers" v-if="BusinessQueryName == 'DebtMeltedCustomers'">
            <!-- 债融客户 Debt melts-->
            <InBackHeadDebtMelts></InBackHeadDebtMelts>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="isShowTabs03" label="新三板客户" name="NewThreeBoard">
          <div class="NewThreeBoardCustomers" v-if="BusinessQueryName == 'NewThreeBoard'">
            <!-- 新三板客户 -->
            <InBackHeadNewThreeBoardInfo></InBackHeadNewThreeBoardInfo>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="isShowTabs04" label="登记客户" name="RegisteredCustomers">
          <div class="RegisteredCustomers" >
            <!-- 登记客户 -->
            <InBackHeadRegisterInfo  v-if="BusinessQueryName == 'RegisteredCustomers'"></InBackHeadRegisterInfo>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="isShowTabs05" label="持续督导客户" name="ContinuousSupervisionOfCustomers">
          <div class="ContinuousSupervisionOfCustomers  ">
            <!-- 持续督导客户 -->
            <InBackContinuousSupervisionOfCustomers v-if="BusinessQueryName == 'ContinuousSupervisionOfCustomers'"></InBackContinuousSupervisionOfCustomers>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="isShowTabs06" label="存续期债券客户" name="BondCustomer">
          <div class="BondCustomer ">
            <!-- 存续期债券客户 -->
            <InBackHeadBondCustomer v-if="BusinessQueryName == 'BondCustomer'"></InBackHeadBondCustomer>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="isShowTabs07 " label="战略合作客户" name="StrategicCooperativeCustomers">
          <div class="StrategicCooperativeCustomers ">
            <!-- 战略合作客户 -->
            <InBackHeadStrategicCooperativeCustomers v-if="BusinessQueryName == 'StrategicCooperativeCustomers'"></InBackHeadStrategicCooperativeCustomers>
          </div>
        </el-tab-pane>
        <el-tab-pane  v-if="false" label="投资者客户" name="InvestorCustomer">
          <div class="InvestorCustomer  ">
            <!-- 投资者客户 -->
            <InBackHeadInvestorCustomer v-if="BusinessQueryName == 'InvestorCustomer'"></InBackHeadInvestorCustomer>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="color:#999999;padding:20px 40px;" v-if="isShowTabs10">
      暂无项目数据
    </div>
  </div>
</template>
<script>
import CurrencyInput from "@/views/organization/custmanage/components/CurrencyInput";
import EssentialInformation from "@/views/organization/custmanage/components/EssentialInformation";
import ProjectInformation from "@/views/organization/custmanage/components/ProjectInformation";
import ProjectInformationRegister from "@/views/organization/custmanage/components/ProjectInformation_register";
import InBackHeadShareCustomersInfo from "@/views/organization/custmanage/components/InBackHeadShareCustomersInfo";
import InBackHeadDebtMelts from "@/views/organization/custmanage/components/InBackHeadDebtMelts";
import InBackHeadNewThreeBoardInfo from "@/views/organization/custmanage/components/InBackHeadNewThreeBoardInfo";
import InBackHeadRegisterInfo from "@/views/organization/custmanage/components/InBackHeadRegisterInfo";
import InBackContinuousSupervisionOfCustomers from "@/views/organization/custmanage/components/InBackContinuousSupervisionOfCustomers";
import InBackHeadBondCustomer from "@/views/organization/custmanage/components/InBackHeadBondCustomer";
import InBackHeadStrategicCooperativeCustomers from "@/views/organization/custmanage/components/InBackHeadStrategicCooperativeCustomers";
import InBackHeadInvestorCustomer from "@/views/organization/custmanage/components/InBackHeadInvestorCustomer";
import {
  getBondCustomerInfo,
  getBondCustomerproject
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import {OrgIdPower} from "@/filters/index.js";
export default {
  name: "InvestmentBankHeadquarters",
  data() {
    return {
      showOrgid:false,
      isShowTabs01: false, //--------需要展示的tabs
      isShowTabs02: false, //--------需要展示的tabs
      isShowTabs03: false, //--------需要展示的tabs
      isShowTabs04: false, //--------需要展示的tabs
      isShowTabs05: false, //--------需要展示的tabs
      isShowTabs06: false, //--------需要展示的tabs
      isShowTabs07: false, //--------需要展示的tabs
      isShowTabs10: false, //--------没有项目做得提示
      BusinessQueryName: "" //-----用于切换tabs拉取响应组件数据
    };
  },
  components: {
    ProjectInformation,
    EssentialInformation,
    CurrencyInput,
    ProjectInformationRegister,
    InBackHeadShareCustomersInfo,
    InBackHeadDebtMelts,
    InBackHeadNewThreeBoardInfo,
    InBackHeadRegisterInfo,
    InBackContinuousSupervisionOfCustomers,
    InBackHeadBondCustomer,
    InBackHeadStrategicCooperativeCustomers,
    InBackHeadInvestorCustomer
  },
  created() {
    this.isLabelShow();
  },
  mounted() {},
  methods: {
    // --------------------------------------------用于判定是那个板块拉取接口
    TabshandleClick() {},
    // --------------------------------------------用于判断此客户能看到几个板块
    isLabelShow() {
      var requires = {
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          Uuid:  this.$store.getters.Uuid_formal,
        }
      };
      getBondCustomerproject(requires)
        .then(response => {
          console.log(response);
          response.Data.forEach(item => {
            this.HandlePrjSrc(item.PrjSrc);
          });
        })
        .catch(() => {});
    },
    // ---------------------------------------------监听客户能够看到所拥有的项目tabs
    HandlePrjSrc(code) {
      console.log(code);
      switch (code) {
        case "01":
          this.isShowTabs01 = true;
          this.BusinessQueryName = "ShareCustomers";
          break;
        case "02":
          this.isShowTabs02 = true;
          this.BusinessQueryName = "DebtMeltedCustomers";
          break;
        case "03":
          this.isShowTabs03 = true;
          this.BusinessQueryName = "NewThreeBoard";
          break;
        case "04":
          this.isShowTabs04 = true;
          this.BusinessQueryName = "RegisteredCustomers";
          break;
        case "05":
          this.isShowTabs05 = true;
          this.BusinessQueryName = "ContinuousSupervisionOfCustomers";
          break;
        case "06":
          this.isShowTabs06 = true;
          this.BusinessQueryName = "BondCustomer";
          break;
        case "07":
          this.isShowTabs07 = true;
          this.BusinessQueryName = "StrategicCooperativeCustomers";
          break;
        default:
          this.isShowTabs10 = true;
          break;
      }
    }
  }
};
</script>

<style scoped>
.yh_InvestmentBankHeadquarters {
  width: 100%;
  min-height: 500px;
}

.none_ {
  display: none;
}

.active {
  display: block;
}
</style>
