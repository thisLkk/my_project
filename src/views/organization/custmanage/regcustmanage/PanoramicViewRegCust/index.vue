<template>
  <!-- 传统360全景图 -->
  <div class="yh_360_panoramic_view">
    <PanoramaHeadRegCust></PanoramaHeadRegCust>
    <el-tabs v-model="show" type="card" @tab-click="handleClick">
      <!-- <div class="cards" v-for="(card,index) in cardList" :key="index" @click="aa()">
      <el-tab-pane :label="card.lable"PanoramicView :name="card.nameL" ><div>{{card.url}}</div></el-tab-pane>
    </div> -->
      <el-tab-pane label="详细信息" name="main">
        <PanoramicViewdetailInfoRegCust parentPage="regCust" />
      </el-tab-pane>

      <el-tab-pane label="协同信息" name="business">
        <CollaborativeDemandTable parentPage="regCust"></CollaborativeDemandTable>
      </el-tab-pane>

      <el-tab-pane label="关联客户" name="opportunity">
        <BusinessOpportunityTable parentPage="regCust"></BusinessOpportunityTable>
      </el-tab-pane>

      <el-tab-pane label="服务团队" name="server">
        <ServiceTeamTable parentPage="regCust"></ServiceTeamTable>
      </el-tab-pane>

      <el-tab-pane label="联系信息" name="contact">
        <ContactInformationDetails parentPage="regCust"></ContactInformationDetails>
        <ContactInformation parentPage="regCust"></ContactInformation>
        <ContactInformationAddress parentPage="regCust"></ContactInformationAddress>
      </el-tab-pane>

      <el-tab-pane label="活动信息" name="activity">
        <ActivityInformation parentPage="regCust"></ActivityInformation>
      </el-tab-pane>
      <el-tab-pane label="战略客户概况" name="CustomerProfile" v-if="isShowStrategyCustFlag =='1' ? true : false">
        <CustomerProfile v-if="show=='CustomerProfile'"></CustomerProfile>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  PanoramaHeadRegCust,
  ActivityInformation,
  ContactInformation,
  CollaborativeDemandTable,
  BusinessOpportunityTable,
  Addresss,
  ServiceTeamTable,
  PanoramicBusinessInformation,
  PanoramicViewdetailInfoRegCust,
  PanoramicViewMonyInfoRegCust,
  PanoramicViewCorrelationCustRegCust,
  ContactInformationDetails,
  CustomerProfile,
  ContactInformationAddress
} from "@/views/organization/custmanage/components/index.js";
export default {
  name: "PanoramicView",
  // prop: "",
  data() {
    return {
      ceshi: "aa",
      show: "main",
      isShowStrategyCustFlag: "", //---判断是否展示战略客户概况
      currenView: "ActivityInformation",
      cardList: [
        {
          lable: "业务信息",
          nameL: "a",
          url: "<div><ActivityInformation></ActivityInformation></div>"
        },
        {
          lable: "协同信息",
          nameL: "b",
          url: "<div><ActivityInformation></ActivityInformation></div>"
        }
      ]
    };
  },
  components: {
    PanoramaHeadRegCust,
    ActivityInformation,
    ContactInformation,
    CollaborativeDemandTable,
    BusinessOpportunityTable,
    Addresss,
    ServiceTeamTable,
    PanoramicBusinessInformation,
    PanoramicViewdetailInfoRegCust,
    PanoramicViewMonyInfoRegCust,
    PanoramicViewCorrelationCustRegCust,
    ContactInformationDetails,
    CustomerProfile,
    ContactInformationAddress
  },

  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    this.$destroy();
    next();
  },

  created() {
    this.isShowStrategyCustFlag = this.$route.query.IsStrategyCustFlag;
    var uuid = this.$route.query.uuid;
    var formal = this.$route.query.MyName;
    if (uuid) {
      this.$store.dispatch("setUuid_RegCust", uuid);
    }
    if (formal) {
      this.$store.dispatch("setMyName", formal);
    }
    //  var custNo = this.$route.query.custNo;
    // var custType = this.$route.query.custType;
    // if (custNo) {
    //   this.$store.dispatch("setUuid_RegCust", custNo);
    // }
    // if (custType) {
    //   this.$store.dispatch("setUuid_RegCust", custType);
    // }
  },

  methods: {
    handleClick(tab, event) {
      //alert("id========"+this.$route.params.id);
    },
    aa() {
      //alert(1);
    }
  }
};
</script>

<style scoped>
.yh_360_panoramic_view {
}
</style>
