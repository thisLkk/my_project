<template>
  <!-- 传统360全景图 -->
  <div class="yh_360_panoramic_view">
    <PanoramaHead ref="PanoramaHead"></PanoramaHead>
    <el-tabs v-model="show" type="card" @tab-click="handleClick">
      <!-- <div class="cards" v-for="(card,index) in cardList" :key="index" @click="aa()">
      <el-tab-pane :label="card.lable" :name="card.nameL" ><div>{{card.url}}</div></el-tab-pane>
    </div> -->
      <el-tab-pane label="战略客户概况" name="CustomerProfile" v-if="isShowStrategyCustFlag =='1' ? true : false">
        <CustomerProfile v-if="show=='CustomerProfile'"></CustomerProfile>
      </el-tab-pane>
      <el-tab-pane label="档案信息" name="custarchives">
        <CustArchives v-if="show=='custarchives'"></CustArchives>
      </el-tab-pane>
      <el-tab-pane label="资产信息" name="asertinfo">
        <AssertInfo v-if="show=='asertinfo'"></AssertInfo>
      </el-tab-pane>
      <el-tab-pane label="持仓信息" name="holdstockinfo">
        <HoldStockInfo v-if="show=='holdstockinfo'"></HoldStockInfo>
      </el-tab-pane>
      <el-tab-pane label="交易信息" name="transinfo">
        <TransinfoDeatil v-if="show=='transinfo'"></TransinfoDeatil>
      </el-tab-pane>
      <el-tab-pane v-if="showyewu" label="业务信息" name="main">
        <PanoramicBusinessInformation v-if="show=='main'"></PanoramicBusinessInformation>
      </el-tab-pane>
      <el-tab-pane label="关联客户" name="opportunity">
        <BusinessOpportunityOneIdTable v-if="show=='opportunity'"></BusinessOpportunityOneIdTable>
        <BusinessOpportunityTable v-if="show=='opportunity'"></BusinessOpportunityTable>
      </el-tab-pane>
      <el-tab-pane label="联系信息" name="contact">
        <ContactInformationDetails v-if="show=='contact'"></ContactInformationDetails>
        <ContactInformation v-if="show=='contact'"></ContactInformation>
        <ContactInformationAddress v-if="show=='contact'"></ContactInformationAddress>
      </el-tab-pane>
      <el-tab-pane label="服务团队" name="server">
        <ServiceTeamTable v-if="show=='server'"></ServiceTeamTable>
      </el-tab-pane>
      <el-tab-pane label="活动信息" name="activity">
        <ActivityInformation v-if="show=='activity'"></ActivityInformation>
      </el-tab-pane>
      <el-tab-pane label="协同信息" name="business">
          <CollaborativeDemandTable v-if="show=='business'"></CollaborativeDemandTable>
        </el-tab-pane>
      <el-tab-pane v-if="false" label="机构业务" name="Institutional">
        <InstitutionalBusiness v-if="show=='Institutional'"></InstitutionalBusiness>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { OrgIdPower } from "@/filters/index.js";
import {
  PanoramaHead,
  ActivityInformation,
  ContactInformation,
  CollaborativeDemandTable,
  BusinessOpportunityTable,
  Addresss,
  ServiceTeamTable,
  PanoramicBusinessInformation,
  InstitutionalBusiness,
  HoldStockInfo,
  TransinfoDeatil,
  AssertInfo,
  CustArchives,
  ContactInformationDetails,
  ContactInformationAddress,
  BusinessOpportunityOneIdTable,
  CustomerProfile
} from "@/views/organization/custmanage/components/index.js";
export default {
  name: "PanoramicView",
  components: {
    PanoramaHead,
    ActivityInformation,
    ContactInformation,
    CollaborativeDemandTable,
    BusinessOpportunityTable,
    Addresss,
    ServiceTeamTable,
    PanoramicBusinessInformation,
    InstitutionalBusiness,
    HoldStockInfo,
    TransinfoDeatil,
    AssertInfo,
    CustArchives,
    ContactInformationDetails,
    CustomerProfile,
    ContactInformationAddress,
    BusinessOpportunityOneIdTable
  },
  data() {
    return {
      showyewu:false,//---------------用于暂时屏蔽业务信息
      show:
        this.$route.query.IsStrategyCustFlag == "1"
          ? "CustomerProfile"
          : "custarchives",
      routechag: "",
      isShowStrategyCustFlag: "" //---判断是否展示战略客户概况
    };
  },
  created() {
    // 用于展示业务信息的判断
     if(OrgIdPower(this.$store.getters.orgid).isShow){
       this.showyewu = true;
    }
    this.isShowStrategyCustFlag = this.$route.query.IsStrategyCustFlag;
    var IsStrategyCustFlag = this.$route.query.IsStrategyCustFlag;
    var uuid = this.$route.query.uuid;
    var custNo = this.$route.query.custNo;
    var custType = this.$route.query.custType;
    var formal = this.$route.query.MyName;
    if (uuid) {
      this.$store.dispatch("setUuid", uuid);
    }
    if (custNo) {
      this.$store.dispatch("setCustNo", custNo);
    }
    if (custType) {
      this.$store.dispatch("setCustType", custType);
    }
    if (formal) {
      this.$store.dispatch("setMyName", formal);
    }
    if (IsStrategyCustFlag) {
      this.$store.dispatch("setIsStrategyCustFlag", IsStrategyCustFlag); //---判断是否战略客户
    }
  },

  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    this.$destroy();
    next();
  },

  methods: {
    handleClick(tab, event) {
      //console.log(this.show);//查看点击的是谁
    },
    showLtabl() {
      var custNO = this.$store.getters.custNo_formal;
      if (custNO) {
        return true;
      } else {
        return false;
      }
    },
    key() {
      return this.$store.getters.Uuid_formal;
    }
  }
};
</script>

<style scoped>
/*  */
</style>
