<template>
  <!-- 360视图-全景视图-业务信息栏目-研究院组件 -->
  <div class="yh_ResearchInstitute">
    <div class="allshow none_ active">
      <!-- 最大权限的展示所有 -->
      <el-tabs v-if="this.$store.getters.orgid == '0000'" type="border-card">
        <el-tab-pane label="投资研究院">
          <div class="ResearchInvestment">
            <!-- 投资研究院 831805 -->
            <ResearchInvestment></ResearchInvestment>
          </div>
        </el-tab-pane>
        <el-tab-pane label="机构客户部">
          <div class="ResearchCustomerDepartment ">
            <!-- 机构客户部 831804 -->
            <ResearchCustomerDepartment></ResearchCustomerDepartment>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基金研究院">
          <!-- 基金研究院 831806-->
          <ResearchCustomerFund></ResearchCustomerFund>
        </el-tab-pane>
      </el-tabs>
      <div>
        <ResearchCustomerFund  v-if="this.$store.getters.orgid == '831806'"></ResearchCustomerFund>
        <ResearchCustomerDepartment v-if="this.$store.getters.orgid == '831804'"></ResearchCustomerDepartment>
        <ResearchInvestment v-if="this.$store.getters.orgid == '831805'"></ResearchInvestment>
      </div>
    </div>

  </div>
</template>

<script>
import CurrencyInput from "@/views/organization/custmanage/components/CurrencyInput";
import ResearchInvestment from "@/views/organization/custmanage/components/ResearchInvestment"; //---投资研究院
import ResearchCustomerDepartment from "@/views/organization/custmanage/components/ResearchCustomerDepartment"; //---投资客户部
import ResearchCustomerFund from "@/views/organization/custmanage/components/ResearchCustomerFund"; //---投资客户部
export default {
  name: "ResearchInstitute",
  data() {
    return {};
  },
  created() {},
  components: {
    CurrencyInput,
    ResearchInvestment,
    ResearchCustomerDepartment,
    ResearchCustomerFund
  }
};
</script>

<style scoped>
.yh_ResearchInstitute {
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
