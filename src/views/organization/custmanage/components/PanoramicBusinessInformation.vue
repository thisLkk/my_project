<template>
  <!-- 360客户信息-全景视图-业务信息 -->
  <div class="yh-panoramicBusinessInformation clearfix">
    <div class="fl panoramicBusinessInformation_nav">
      <!-- 经纪业务部 -->
      <div v-if="false" @click="show('Economics')" class="EconomicAndBusinessAepartment nav" v-bind:style="showNowTabs == 'Economics' ?  activeStyle : ''">
          <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-1.png" alt="经纪业务部">
          <p>经纪业务部</p>
      </div>
      <!-- 银河金汇 -->
      <div v-if="showOrgid" @click="show('Jinhui')" class="GalacticGoldenSink nav" v-bind:style="showNowTabs == 'Jinhui' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-2.png" alt="银河金汇">
        <p>银河金汇</p>
      </div>
      <!-- 研究院 -->
      <div v-if="showOrgid" @click="show('Research')" class="ResearchInstitute nav" v-bind:style="showNowTabs == 'Research' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-3.png" alt="研究院">
        <p>研究院</p>
      </div>
      <!-- 投资银行总部 -->
      <div v-if="showOrgid" @click="show('InvestmentBank')" class="InvestmentBankHeadquarters nav" v-bind:style="showNowTabs == 'InvestmentBank' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-4.png" alt="投资银行总部">
        <p>投资银行总部</p>
      </div>
      <!-- 债券投资部 -->
      <div v-if="showOrgid" @click="show('BondInvestment')" class="BondInvestmentDepartment nav" v-bind:style="showNowTabs == 'BondInvestment' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-5.png" alt="债券投资部">
        <p>债券投资部</p>
      </div>
      <!-- 衍生产品总部 -->
      <div v-if="showOrgid" @click="show('Derivatives')" class="DerivativesHeadquarters nav" v-bind:style="showNowTabs == 'Derivatives' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-6.png" alt="衍生产品总部">
        <p>衍生产品总部</p>
      </div>
      <!-- 证券金融总部 -->
      <div v-if="showOrgid" @click="show('Securities')" class="SecuritiesFinancialHeadquarters nav" v-bind:style="showNowTabs == 'Securities' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-7.png" alt="证券金融总部">
        <p>证券金融总部</p>
      </div>
      <!-- 产品中心 -->
      <div v-if="showOrgid" @click="show('Product')"  class="ProductCenter nav" v-bind:style="showNowTabs == 'Product' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-8.png" alt="产品中心">
        <p>产品中心</p>
      </div>
      <!-- 银河期货 -->
      <div v-if="showOrgid" @click="show('Futures')" class="MilkyWayFutures nav" v-bind:style="showNowTabs == 'Futures' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-9.png" alt="银河期货">
        <p>银河期货</p>
      </div>
      <!-- 银河保险 -->
      <div v-if="showOrgid" @click="show('Insurance')" class="MilkyWayInsurance nav" v-bind:style="showNowTabs == 'Insurance' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-10.png" alt="银河保险">
        <p>银河保险</p>
      </div>
      <!--银河基金 -->
      <div v-if="false" @click="show('GalacticFund')" class="GalacticFund nav" v-bind:style="showNowTabs == 'GalacticFund' ?  activeStyle : ''">
        <img src="~@/assets/organization/customermanage/yh-yewu-leftnav-11.png" alt="银河基金">
        <p>银河基金</p>
      </div>
    </div>
    <!-- 业务信息下的子元素，对应左边的各个板块 -->
      <div  class="panoramicBusinessInformation_subelement fl">
        <EconomicAndBusinessAepartment v-if="showNowTabs == 'Economics'"></EconomicAndBusinessAepartment>
        <GalacticGoldenSink v-if="showNowTabs == 'Jinhui'"></GalacticGoldenSink>
        <ResearchInstitute v-if="showNowTabs == 'Research'"></ResearchInstitute>
        <InvestmentBankHeadquarters v-if="showNowTabs == 'InvestmentBank'"></InvestmentBankHeadquarters>
        <BondInvestmentDepartment v-if="showNowTabs == 'BondInvestment'"></BondInvestmentDepartment>
        <DerivativesHeadquarters v-if="showNowTabs == 'Derivatives'"></DerivativesHeadquarters>
        <SecuritiesFinancialHeadquarters v-if="showNowTabs == 'Securities'"></SecuritiesFinancialHeadquarters>
        <ProductCenter v-if="showNowTabs == 'Product'"></ProductCenter>
        <MilkyWayFutures v-if="showNowTabs == 'Futures'"></MilkyWayFutures>
        <MilkyWayInsurance v-if="showNowTabs == 'Insurance'"></MilkyWayInsurance>
        <GalacticFund v-if="showNowTabs == 'GalacticFund'"></GalacticFund>
      </div>
  </div>
</template>

<script>
import EconomicAndBusinessAepartment from "@/views/organization/custmanage/components/EconomicAndBusinessAepartment";
import GalacticGoldenSink from "@/views/organization/custmanage/components/GalacticGoldenSink";
import ResearchInstitute from "@/views/organization/custmanage/components/ResearchInstitute";
import InvestmentBankHeadquarters from "@/views/organization/custmanage/components/InvestmentBankHeadquarters";
import BondInvestmentDepartment from "@/views/organization/custmanage/components/BondInvestmentDepartment";
import DerivativesHeadquarters from "@/views/organization/custmanage/components/DerivativesHeadquarters";
import SecuritiesFinancialHeadquarters from "@/views/organization/custmanage/components/SecuritiesFinancialHeadquarters";
import ProductCenter from "@/views/organization/custmanage/components/ProductCenter";
import MilkyWayFutures from "@/views/organization/custmanage/components/MilkyWayFutures";
import MilkyWayInsurance from "@/views/organization/custmanage/components/MilkyWayInsurance";
import GalacticFund from "@/views/organization/custmanage/components/GalacticFund";
import {OrgIdPower} from "@/filters/index.js";
export default {
  name: "PanoramicBusinessInformation",
  components: {
    EconomicAndBusinessAepartment,//------经纪
    GalacticGoldenSink,//-----------------金汇
    ResearchInstitute,//------------------研究院
    InvestmentBankHeadquarters,//---------投资银行总部
    BondInvestmentDepartment,//-----------债券投资部
    DerivativesHeadquarters,//------------衍生产品总部
    SecuritiesFinancialHeadquarters,//----证券金融总部
    ProductCenter,//----------------------产品中心
    MilkyWayFutures,//--------------------银河期货
    MilkyWayInsurance,//------------------银河保险
    GalacticFund,//-----------------------银河基金
  },
  data() {
    return {
      showNowTabs: "",//--监听组件的展示
      showOrgid:false,//--设置能看的全部部门的权限(左侧功能)
      activeStyle: {
        background: "#ffffff",
        borderRight: "1px solid #ffffff"
      }
    };
  },
  created() {
    if(OrgIdPower(this.$store.getters.orgid).isShowTabs){
      this.showOrgid = true;
      this.showNowTabs = "Jinhui";
    }else{
      this.showNowTabs = OrgIdPower(this.$store.getters.orgid).name;
    }
  },
  methods: {
    // -----------------------------监听那个组件在展示
    show(value) {
      this.showNowTabs = value;
    },
  }
};
</script>

<style scoped>
/* -全景视图-业务信息 */
.yh-panoramicBusinessInformation {
  margin: 0 20px;
  min-height: 300px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 20px;
}
.panoramicBusinessInformation_nav {
  width: 80px;
  min-height: 100px;
  box-sizing: border-box;
}
.panoramicBusinessInformation_nav .nav {
  width: 80px;
  height: 80px;
  background: #f8f8f8;
  box-sizing: border-box;
  border-left: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
}
.panoramicBusinessInformation_nav .nav:hover {
  background: #ffffff;
  border-right: 1px solid #ffffff;
}
.panoramicBusinessInformation_nav .nav.active {
  background: #ffffff;
  border-right: 1px solid #ffffff;
}
.panoramicBusinessInformation_nav .nav img {
  margin-top: 15px;
  margin-bottom: 6px;
  margin-left: 23px;
  display: inline-block;
  width: 32px;
  height: 32px;
  overflow: hidden;
}
.panoramicBusinessInformation_nav .nav p {
  font-size: 12px;
  color: #666666;
  text-align: center;
}
.panoramicBusinessInformation_nav .nav a {
  display: block;
  width: 100%;
  height: 100%;
  border-right: 1px solid #dddddd;
}
.panoramicBusinessInformation_nav .nav a.router-link-active {
  background: #ffffff;
  border-right: none;
}
.panoramicBusinessInformation_subelement {
  width: 90%;
}
</style>
