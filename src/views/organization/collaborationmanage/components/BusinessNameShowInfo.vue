<template>
  <!-- 协同管理 协同商机名称详情  -->
  <div  class="yh_BusinessNameShowInfo">
    <el-tabs v-model="showTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="协同商机信息" name="business">
          <BusinessInfo  v-if="showTab == 'business'" ref="BusinessInfoId" @businessDialogClose="businessDialogClose" :businessIds ="businessId"></BusinessInfo>
      </el-tab-pane>
      <el-tab-pane  label="客户信息" name="info_360">
        <Business360Info v-if="showTab == 'info_360'" @businessDialogClose="businessDialogClose" :CustNos ='CustNo'></Business360Info>
        <!-- <iframe src="/#/CustomerManagement/FormalCustomerManagement/PanoramicView" frameborder="0"></iframe> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BusinessInfo from "./BusinessInfo";
import { UnderProgressEdit1 } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import Business360Info from "./Business360Info";
export default {
  name: "BusinessNameShowInfo",
  props: {
    businessId: {
      type: String
    },
    CustNo: {
      type: String
    }
  },
  components: {
    BusinessInfo, //---------------------协同商机信息
    Business360Info //------------------客户信息
  },
  data() {
    return {
      showTab: "business" //------------协同商机或者客户信息
    };
  },
  watch: {
    CustNo(NewCustNo,OldCustNo) {
      // console.log(this.CustNo)
    }
  },
  created() {
    console.log(this.CustNo);
  },
  methods: {
    //----------------------------------切换tab表格的方法
    handleClick(tab, event) {
      //console.log(this.showTab); //-----确保点击tab的时候能获取到相应的数据/
    },
    // ---------------------------------父组件关闭窗口，重置为协同商机信息
    showTabName() {
      this.showTab = "business";
    },
    businessDialogClose() {
      this.showTab = "business";
      this.$emit("businessNameDialogClose", "");
    },
    businessInfoList(id) {
      // alert(2)
      this.$refs.BusinessInfoId.init(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.yh_BusinessNameShowInfo {
  margin: 0 20px;
  .el-table__empty-block {
    .el-table__empty-text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
