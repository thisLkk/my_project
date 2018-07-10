<template>
    <!-- 资源管理 >> 资源管理下的 业务通讯录管理页面 -->
    <div class="yh_ImportantProductSell">
       <el-tabs @tab-click="tabClick" v-model="tags" type="card">
        <el-tab-pane label="重点首发产品" name="1">
          <tableOfZdsfcp ref="zdsfcpT"></tableOfZdsfcp>
        </el-tab-pane>
        <el-tab-pane label="持续营销产品" name="2">
          <tableOfCxyxcp ref="cxyxcpT"></tableOfCxyxcp>
        </el-tab-pane>
        <el-tab-pane label="重点产品销售预告" name="3">
          <tableOfZdcpxsyg ref="zdcpxsygT"></tableOfZdcpxsyg>
        </el-tab-pane>  
        <el-tab-pane label="理财产品与收益凭证" name="4">
          <tableOfLccpysypz ref="lccpysypzT"></tableOfLccpysypz>
        </el-tab-pane>
        <el-tab-pane label="重点销售产品到期时间表" name="5" >
          <tableOfZdxscpdqsjb ref="zdxscpdqsjbT"></tableOfZdxscpdqsjb>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { tableOfZdsfcp,tableOfCxyxcp,tableOfZdcpxsyg,tableOfLccpysypz,tableOfZdxscpdqsjb
} from "@/views/organization/productmanage/components/index.js";
import {hasFuntion} from "@/filters"
import funCode from "@/utils/funCode.js";
export default {
  name: "ImportantProductSell",
  components: {
    tableOfZdsfcp,
    tableOfCxyxcp,
    tableOfZdcpxsyg,
    tableOfLccpysypz,
    tableOfZdxscpdqsjb,
  },

  data() {
    return {
      tags:'1',
      sreachTime: null
    }
  },

  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
     this.$destroy();
    next();
  },

  mounted(){
        //首页路由跳转根据不同id名判断加载不同组件
      let idquery = this.$route.query.id || sessionStorage.getItem('tabIndex');
      let tab = {};
      tab.name = idquery || '1';
      this.tags = tab.name;
      this.tabClick(tab);
  },

  methods: {
    /**
     * 重点首发产品权限显示
     */
    tableOfZdsfcpShow() {
      return hasFuntion(funCode.FUNC_MAJOR_PROD_SALE);
    },

    /**
     * 持续营销产品权限显示
     */
    tableOfCxyxcpShow() {
      return hasFuntion(funCode.FUNC_CONT_MARKET_PRO);
    },

    /**
     * 重点产品销售预告权限显示
     */
    tableOfZdcpxsygShow() {
      return hasFuntion(funCode.FUNC_MAJOR_PROD_SALE_FCST);
    },

    /**
     * 理财产品与收益凭证权限显示
     */
    tableOfLccpysypzShow() {
      return hasFuntion(funCode.FUNC_FIN_PRO_INCOME_RECEIPTS);
    },

    /**
     * 重点销售产品到期时间表
     */
    tableOfZdxscpdqsjbShow() {
      return hasFuntion(funCode.FUNC_MAJOR_PROD_SALE_ENDTIME);
    },

    //点击 tab时  加载该页数据
    tabClick(tab){
      switch(tab.name)
      {
        case '1': // 重点首发产品
          this.$refs.zdsfcpT.init();
        break;
        case '2': // 持续营销产品
          this.$refs.cxyxcpT.init();
        break;
        case '3': // 重点产品销售预告
          this.$refs.zdcpxsygT.init();
        break;
        case '4': // 理财产品与收益凭证
          this.$refs.lccpysypzT.init();
        break;
        case '5': // 重点销售产品到期时间表
          this.$refs.zdxscpdqsjbT.init();
        break;
        default://默认产品
          this.$refs.zdsfcpT.init();
      }
      sessionStorage.setItem('tabIndex', tab.name);
    }  
  }
};

</script>

<style lang="scss" scoped>
.yh_ImportantProductSell{
  margin:0 20px;
  background-color: #ffffff;
}
</style>