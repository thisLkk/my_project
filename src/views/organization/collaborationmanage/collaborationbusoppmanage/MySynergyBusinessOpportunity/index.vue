<template>
  <!-- 协同管理 __ 协同管理管理 __ 我的协同商机  -->
  <div class="yh_MySynergyBusinessOpportunity">
    <el-tabs v-model="showTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="我是发起方" name="Launch" v-if="LaunchFun()">
        <CollaborationQuery @init="init" name="Launch" v-if="showTab == 'Launch'"></CollaborationQuery>
        <BusinessTable ref="Launch" name="Launch" v-if="showTab == 'Launch'"></BusinessTable>
      </el-tab-pane>
      <el-tab-pane label="我是承办方" name="Undertake" v-if="UndertakeFun()">
        <CollaborationQuery @init="init"  name="Undertake" v-if="showTab == 'Undertake'"></CollaborationQuery>
        <BusinessUndertakeTable ref="Undertake" name="Undertake" v-if="showTab == 'Undertake'"></BusinessUndertakeTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  CollaborationQuery,
  BusinessTable,
  BusinessUndertakeTable
} from "@/views/organization/collaborationmanage/components/index.js";
import { hasFuntion } from "@/filters";
import FUNCODE from "@/utils/funCode.js";
import { getMyCollaboration } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
export default {
  name: "MySynergyBusinessOpportunity",
  components: {
    CollaborationQuery,
    BusinessTable,
    BusinessUndertakeTable
  },
  data() {
    return {
      show_: false, //loading
      showTab: "Launch" //发起或承办
    };
  },
  created() {
    var Launchs = this.LaunchFun();
    var Undertakes = this.UndertakeFun();
    if (Launchs) {
      this.showTab = "Launch";
    } else if (Undertakes) {
      this.showTab = "Undertake";
    }
  },
  methods: {
    //-------------------------------------发起方权限展示
    LaunchFun() {
      let rf = hasFuntion(FUNCODE.FUNC_INITIATOR);
      return rf;
    },
    //-------------------------------------承办方权限展示
    UndertakeFun() {
      return hasFuntion(FUNCODE.FUNC_CONTRACTOR);
    },
    //切换tab表格的方法
    handleClick(tab, event) {
      // this.init(this.showTab); //确保点击tab的时候能获取到相应的数据
    },
    init(showTab) {
      //由于发起方与承办方共用的是一个查询组件；所以需要在此处判断
      if (showTab.name == "Launch") {
        //alert("协同发起")
        this.$refs.Launch.init(showTab);
      } else if (showTab.name == "Undertake") {
        //alert("协同承办")
        this.$refs.Undertake.init(showTab);
      }
    }
  }
};
</script>

<style scoped>
.yh_MySynergyBusinessOpportunity {
  margin: 0 20px;
}
</style>
