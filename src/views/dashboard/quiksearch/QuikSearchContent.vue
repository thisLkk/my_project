<template>
  <div class="yh-formalcustomerquery">
          <QuikResultCustomer :list="list"></QuikResultCustomer>
  </div>
</template>
<script>
  import global_ from "@/common/Global";
  import QuikResultCustomer from "./QuikResultCustomer";
  export default {
    name: "QuikSearchContent",
    components: {
      QuikResultCustomer
    },
    data() {
      return {
        list:this.$store.getters.quikSearchData
      };
    },
    created() {},
    methods: {},
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  };
</script>
<style scoped>
  .yh-formalcustomerquery {
    margin: 20px;
    margin-top: 0;
  }
</style>
