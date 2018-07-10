<template>
  <!-- 协同管理 __ 我的协同管理 __  协同商机发布 -->
  <div class="yh_CollaborativeBusinessOpportunityRelease">
    <CollaborationQuery @init="init" name="Release"></CollaborationQuery>
    <BusinessReleaseTable ref="Release" name="Release"></BusinessReleaseTable>
  </div>
</template>

<script>
  import {
    CollaborationQuery,
    BusinessReleaseTable
  } from "@/views/organization/collaborationmanage/components/index.js";
  import {
    getMyCollaboration
  } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
  export default {
    name: "CollaborativeBusinessOpportunityRelease",
    components: {
      CollaborationQuery,
      BusinessReleaseTable
    },
    data() {
      return {
        show_: false, //loading
      };
    },
    methods: {
      init(showTab) { //由于发起方与承办方共用的是一个查询组件；所以需要在此处判断
        this.$refs.Release.init(showTab);
      }
    },
  };

</script>

<style scoped>
  .yh_CollaborativeBusinessOpportunityRelease {
    margin: 0 20px;
  }

</style>
