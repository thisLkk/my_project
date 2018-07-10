<template>
<!-- 360视图-全景视图-业务信息栏目-债券投资部 -->
    <div class="yh_BondInvestmentDepartment">
        <BondInvestmentDepartmentInfo></BondInvestmentDepartmentInfo>
    </div>
</template>

<script>
import BondInvestmentDepartmentInfo from "@/views/organization/custmanage/components/BondInvestmentDepartmentInfo";
export default {
  name: "BondInvestmentDepartment",
  data() {
    return {
      contentList_title: "基本信息",
      contentList_title1: "交易要素"
    };
  },
  components: {
    BondInvestmentDepartmentInfo
  }
};
</script>

<style scoped>
.yh_BondInvestmentDepartment {
  width: 100%;
  min-height: 500px;
}
</style>