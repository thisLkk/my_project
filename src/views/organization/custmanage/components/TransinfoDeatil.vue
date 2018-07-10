<template>
  <div class="sd-stockinfo-main">
    <el-tabs  :tab-position="tabPosition" style="height: 400px;" >
      <el-tab-pane label="交易明细">
        <TransinfoFlow v-if="Number(this.$store.getters.orgid) < '8000' || Number(this.$store.getters.orgid) == '8140' || Number(this.$store.getters.orgid) == '8000'"></TransinfoFlow>
        <div v-else style="margin:10px 40px;">无权限</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TransinfoFlow from "@/views/organization/custmanage/components/TransinfoFlow";

  export default {
    name:"TransDetail",
    components:{
      TransinfoFlow
    },
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>

<style scoped>

</style>
