<template>
  <div class="sd-stockinfo-main">
      <el-tabs  :tab-position="tabPosition" style="min-height: 400px;" >
        <el-tab-pane label="持仓信息">
          <HoldStockInfoGenerlAccount></HoldStockInfoGenerlAccount>
        </el-tab-pane>
        <!--<el-tab-pane label="信用账户">-->
          <!--<HoldStockInfoCreditAccount></HoldStockInfoCreditAccount>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="OTC">-->
          <!--<HoldStockInfoOTC></HoldStockInfoOTC>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="其他">-->
          <!--<HoldStockInfoOther></HoldStockInfoOther>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="回购">-->
          <!--<HoldStockInfoReBuy></HoldStockInfoReBuy>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="限购">-->
          <!--<HoldStockInfoLimsell></HoldStockInfoLimsell>-->
        <!--</el-tab-pane>-->
      </el-tabs>
  </div>
</template>

<script>

  import HoldStockInfoGenerlAccount from "@/views/organization/custmanage/components/HoldStockInfoGenerlAccount";
  import HoldStockInfoCreditAccount from "@/views/organization/custmanage/components/HoldStockInfoCreditAccount";
  import HoldStockInfoOTC from "@/views/organization/custmanage/components/HoldStockInfoOTC";
  import HoldStockInfoOther from "@/views/organization/custmanage/components/HoldStockInfoOther";
  import HoldStockInfoReBuy from "@/views/organization/custmanage/components/HoldStockInfoReBuy";
  import HoldStockInfoLimsell from "@/views/organization/custmanage/components/HoldStockInfoLimsell";


  export default {
    name:"HoldStockInfo",
    components: { HoldStockInfoGenerlAccount,HoldStockInfoCreditAccount,HoldStockInfoOTC,HoldStockInfoOther,HoldStockInfoReBuy,HoldStockInfoLimsell },
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>

<style scoped>

</style>
