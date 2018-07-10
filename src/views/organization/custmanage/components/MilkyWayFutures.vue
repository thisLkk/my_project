<template>
<!-- 360视图-全景视图-业务信息栏目-银河期货组件 -->
    <div class="yh_MilkyWayFutures">
       <MilkyWayFuturesInfo></MilkyWayFuturesInfo>
    </div>
</template>

<script>
import  MilkyWayFuturesInfo  from "@/views/organization/custmanage/components/MilkyWayFuturesInfo.vue";
export default {
  name: "MilkyWayFutures",
  data() {
    return {};
  },
  components: {
    MilkyWayFuturesInfo
  }
};
</script>
<style scoped>
.yh_MilkyWayFutures {
  width: 100%;
  min-height: 500px;
}
h3 {
  width: 100%;
  height: 24px;
  border-bottom: 1px solid #eeeee9;
  margin-left: 20px;
  font-size: 14px;
}
h3 span {
  font-weight: bold;
  border-bottom: 2px solid #cf8e3e;
  height: 24px;
  display: inline-block;
}
</style>