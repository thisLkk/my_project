<template>
  <!-- 正式客户查询 __ 客户信息展示页面 -->
  <div class="yh-queryresult clearfix">
    <DetailContent  name="cus" :lists="list"></DetailContent>
  </div>
</template>

<script>
import DetailContent from "./DetailContent";

export default {
  name: "QuikResultCustomer",
  props: {
    list: {
      type: Array
    }
  },
  components: {
    DetailContent
  },
  created() {

  }
};
</script>
