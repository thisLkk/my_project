<template>
  <div class="sd-stockinfo-main">
    <el-tabs  :tab-position="tabPosition" style="min-height: 400px;" >
      <el-tab-pane label="汇总资产">
        <AssertSummary  v-if="Number(this.$store.getters.orgid) < '8000' || Number(this.$store.getters.orgid) == '8140' || Number(this.$store.getters.orgid) == '8000'"></AssertSummary>
        <div v-else style="margin:10px 40px;">无权限</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AssertSummary from "@/views/organization/custmanage/components/AssertSummary";

  export default {
    name:"AssertInfo",
    components: { AssertSummary},
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>

<style scoped>

</style>
