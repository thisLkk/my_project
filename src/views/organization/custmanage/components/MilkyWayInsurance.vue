<template>
<!-- 360视图-全景视图-业务信息栏目-银河保险组件 -->
    <div class="yh_MilkyWayInsurance">
      <MilkyWayInsuranceInfo></MilkyWayInsuranceInfo>
    </div>
</template>

<script>
import MilkyWayInsuranceInfo from "@/views/organization/custmanage/components/MilkyWayInsuranceInfo";
export default {
  name: "MilkyWayInsurance",
  data() {
    return {
      
    };
  },
  components: {
    MilkyWayInsuranceInfo,
  }
};
</script>
<style scoped>
.yh_MilkyWayInsurance {
  width: 100%;
  min-height: 500px;
}
</style>