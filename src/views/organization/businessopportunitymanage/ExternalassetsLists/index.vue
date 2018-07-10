<template>
  <!-- 协同管理 __ 协同管理管理 __ 我的协同商机  -->
  <div class="yh_MySynergyBusinessOpportunity">
    <el-tabs v-model="showTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="我名下客户外部资产信息" name="myNameTabel" v-if="myNameTabelFun()">
        <MyNameTabel v-if="showTab == 'myNameTabel'"></MyNameTabel>
      </el-tab-pane>
      <el-tab-pane label="我团队客户外部资产信息" name="myTemaTabel" v-if="myTemaTabelFun()">
        <MyTemaTabel v-if="showTab == 'myTemaTabel'"></MyTemaTabel>
      </el-tab-pane>
      <el-tab-pane label="我机构客户外部资产信息" name="myOrgTabel" v-if="myOrgTabelFun()">
        <MyOrgTabel v-if="showTab == 'myOrgTabel'"></MyOrgTabel>
      </el-tab-pane>
      <el-tab-pane label="全部外部资产信息" name="myAllTabel" v-if="myAllTabelFun()">
        <MyAllTabel v-if="showTab == 'myAllTabel'"></MyAllTabel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  MyTemaTabel,
  MyNameTabel,
  MyOrgTabel,
  MyAllTabel
} from "@/views/organization/businessopportunitymanage/components/index.js";
import { hasFuntion } from "@/filters";
import FUNCODE from "@/utils/funCode.js";
export default {
  name: "ExternalassetsLists",
  components: {
    MyTemaTabel,
    MyNameTabel,
    MyOrgTabel,
    MyAllTabel
  },
  data() {
    return {
      showTab: "myNameTabel" //发起或承办
    };
  },
  created() {
    var myNameTabel = this.myNameTabelFun(); //----我名下
    var myTemaTabel = this.myTemaTabelFun(); //----我团队
    var myOrgTabel = this.myOrgTabelFun(); //------我机构
    var myAllTabel = this.myAllTabelFun(); //------我全部
    if (myNameTabel) {
      this.showTab = "myNameTabel";
    } else if (myTemaTabel) {
      this.showTab = "myTemaTabel";
    } else if (myOrgTabel) {
      this.showTab = "myOrgTabel";
    } else if (myAllTabel) {
      this.showTab = "myAllTabel";
    }
  },
  methods: {
    //-------------------------------------我名下权限展示
    myNameTabelFun() {
      let rf = hasFuntion(FUNCODE.FUNC_SELF_OTHER_ASSET);
      return rf;
    },
    //-------------------------------------我团队权限展示
    myTemaTabelFun() {
      return hasFuntion(FUNCODE.FUNC_TEAM_OTHER_ASSET);
    },
    //-------------------------------------我机构权限展示
    myOrgTabelFun() {
      return hasFuntion(FUNCODE.FUNC_ORG_OTHER_ASSET);
    },
    // ------------------------------------我全部权限
    myAllTabelFun() {
      return hasFuntion(FUNCODE.FUNC_ALL_OTHER_ASSET);
    },
    //切换tab表格的方法
    handleClick(tab, event) {
      // this.init(this.showTab); //确保点击tab的时候能获取到相应的数据
    }
    // init(showTab) {
    //   //由于发起方与承办方共用的是一个查询组件；所以需要在此处判断
    //   if (showTab.name == "Launch") {
    //     //alert("协同发起")
    //     this.$refs.Launch.init(showTab);
    //   } else if (showTab.name == "Undertake") {
    //     //alert("协同承办")
    //     this.$refs.Undertake.init(showTab);
    //   }
    // }
  }
};
</script>

<style scoped>
.yh_MySynergyBusinessOpportunity {
  margin: 0 20px;
}
</style>
