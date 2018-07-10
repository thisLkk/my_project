<template>
  <!-- 协同管理 我团队协同商机  -->
  <div class="yh_MySynergyBusinessOpportunity">
    <el-tabs v-model="showTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="我是发起方" name="TeamLaunch" v-if="LaunchFun()">
        <CollaborationQuery @init="init" name="TeamLaunch" v-if="showTab == 'TeamLaunch'"></CollaborationQuery>
        <TeamLaunchTable ref="TeamLaunch" name="TeamLaunch" v-if="showTab == 'TeamLaunch'"></TeamLaunchTable>
      </el-tab-pane>
      <el-tab-pane label="我是承办方" name="TeamUndertake" v-if="UndertakeFun()">
        <CollaborationQuery @init="init"  name="TeamUndertake" v-if="showTab == 'TeamUndertake'"></CollaborationQuery>
        <TeamUndertakeTable ref="TeamUndertake" name="TeamUndertake" v-if="showTab == 'TeamUndertake'"></TeamUndertakeTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { hasFuntion } from "@/filters";
import FUNCODE from "@/utils/funCode.js";
import {
  CollaborationQuery,
  TeamLaunchTable,
  TeamUndertakeTable
} from "@/views/organization/collaborationmanage/components/index.js";
import { getMyCollaboration } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
export default {
  name: "MySynergyBusinessOpportunity",
  components: {
    CollaborationQuery,
    TeamLaunchTable,
    TeamUndertakeTable
  },
  data() {
    return {
      showTab: "TeamLaunch" //-----------------------发起或承办
    };
  },
   created() {
    // --------------------------------------------- 依据权限来判定展示
    var Launchs = this.LaunchFun();
    var Undertakes = this.UndertakeFun();
    if (Launchs) {
      this.showTab = "TeamLaunch";
    } else if (Undertakes) {
      this.showTab = "TeamUndertake";
    }
  },
  methods: {
     //-----------------------------------------------发起方
    LaunchFun() {
      let rf = hasFuntion(FUNCODE.FUNC_INITIATOR);
      return rf;
    },
    //------------------------------------------------承办方
    UndertakeFun() {
      return hasFuntion(FUNCODE.FUNC_CONTRACTOR);
    },
    //------------------------------------------------切换tab表格的方法
    handleClick(tab, event) {
      this.init(this.showTab); //---------------------确保点击tab的时候能获取到相应的数据
    },
    init(showTab) {
      //----------------------------------------------由于发起方与承办方共用的是一个查询组件；所以需要在此处判断
      if (showTab.name == "TeamLaunch") {
        this.$refs.TeamLaunch.init(showTab, "TeamLaunch");
      } else if (showTab.name == "TeamUndertake") {
        this.$refs.TeamUndertake.init(showTab, "TeamUndertake");
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
