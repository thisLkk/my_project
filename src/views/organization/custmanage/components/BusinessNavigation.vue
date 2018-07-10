<template>
    <!-- 360全景视图的-业务信息-左侧导航图 -->
    <div class="yh-businessnavigation">

    </div>
</template>

<script>
import {
  PanoramaHead,
  ActivityInformation,
  ContactInformation,
  CollaborativeDemandTable,
  BusinessOpportunityTable,
  Addresss,
  ServiceTeamTable
} from "@/views/organization/custmanage/components/index.js";
export default {
  name: "BusinessNavigation",
  components: {
    PanoramaHead,
    ActivityInformation,
    ContactInformation,
    CollaborativeDemandTable,
    BusinessOpportunityTable,
    Addresss,
    ServiceTeamTable
  },
  methods:{
      
  }
};
</script>

<style scoped>

</style>