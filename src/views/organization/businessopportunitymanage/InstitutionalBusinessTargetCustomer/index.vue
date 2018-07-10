<template>
  <div class="yh-institutionalbusinesstargetCustomer">

    <el-tabs v-model="showTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="我的目标客户" name="myTargetCust" v-if="hasMyTargetFun()" >
         <div v-if="showTab == 'myTargetCust'" class="basecontent-targetcust">
           <InstBusTargetCustQuery @querylist="querylist" :currentTab="showTab"></InstBusTargetCustQuery>
           <InstBusTargetCustTable :pageInfo="form_data.pageInfo" :list="list" @queryPage = "queryPage" :currentTab="showTab"></InstBusTargetCustTable>
         </div>
      </el-tab-pane>
      <el-tab-pane label="我团队的目标客户" name="myTeamCust" v-if="hasMyTeamTargetFun()" >
        <div v-if="showTab == 'myTeamCust'" class="basecontent-targetcust">
          <InstBusTargetCustQuery @querylist="querylist" :currentTab="showTab"></InstBusTargetCustQuery>
          <InstBusTargetCustTable :pageInfo="form_data.pageInfo" :list="list" @queryPage = "queryPage" :currentTab="showTab"></InstBusTargetCustTable>
        </div>
      </el-tab-pane>

      <el-tab-pane label="我机构的目标客户" name="myDeptCust"  v-if="hasMyDepTargetFun()" >
        <div v-if="showTab == 'myDeptCust'" class="basecontent-targetcust">
          <InstBusTargetCustQuery @querylist="querylist" :currentTab="showTab"></InstBusTargetCustQuery>
          <InstBusTargetCustTable :pageInfo="form_data.pageInfo" :list="list" @queryPage = "queryPage" :currentTab="showTab"></InstBusTargetCustTable>
        </div>
      </el-tab-pane>

      <el-tab-pane label="全部客户" name="allCust"  v-if="hasAllTargetFun()"  >
        <div v-if="showTab == 'allCust'" class="basecontent-targetcust">
          <InstBusTargetCustQuery @querylist="querylist" :currentTab="showTab"></InstBusTargetCustQuery>
          <InstBusTargetCustTable :pageInfo="form_data.pageInfo" :list="list" @queryPage = "queryPage" :currentTab="showTab"></InstBusTargetCustTable>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>

  import InstBusTargetCustTable from "@/views/organization/businessopportunitymanage/components/InstBusTargetCustTable";
  import InstBusTargetCustQuery from "@/views/organization/businessopportunitymanage/components/InstBusTargetCustQuery";
  import { InstBusTargetCustMerQuery } from "@/api/organization/businessopportunitymanage/InstitutionalBusinessTargetCustomer/index.js";
  import {hasFuntion} from "@/filters";
  import FUNCODE from "@/utils/funCode.js";



  export default {
    name: 'InstitutionalBusinessTargetCustomer',
    components: { InstBusTargetCustQuery, InstBusTargetCustTable },
    data() {
      return {
        showTab: "", //默认是我的目标客户商机

        icon_: 'fa fa-angle-double-up',//展示隐藏一级筛选功能
        show__: true,//展示隐藏二级筛选功能
        showquerydiv: true,//控制查询条件div是否显示
        dialogVisible: false,
        list: null,
        form_data: {
          "pageInfo": {
            PageNum: 1,
            PageSize: 10,
            Total: 0,
            Pages: 0
          },
          "param": {}
        }
      }
    },
    created() {
      //组件生成执行
      //this.doQuery(); //默认拉取我部门的数据
      this.initDefaultTab();
    },
    methods:{
        initDefaultTab(){

            if(this.hasMyTargetFun()){
              this.showTab="myTargetCust";
            }else if(this.hasMyTeamTargetFun()){
                this.showTab="myTeamCust";
            }else if(this.hasMyDepTargetFun()){
              this.showTab="myDeptCust";
            }else if(this.hasAllTargetFun()){
              this.showTab="allCust";
            }
        },

        hasMyTargetFun(){//判断是否有我的功能权限
           let rf= hasFuntion(FUNCODE.FUNC_SELF_TARGET_CUST);
           return rf;
        },

        hasMyTeamTargetFun(){//判断是否有我团队的功能权限
          return hasFuntion(FUNCODE.FUNC_TEAM_TARGET_CUST);
        },

        hasMyDepTargetFun(){//判断是否有我部门的功能权限
          return  hasFuntion(FUNCODE.FUNC_DEPT_TARGET_CUST);
        },

        hasAllTargetFun(){//判断是否有我部门的功能权限
          return  hasFuntion(FUNCODE.FUNC_ALL_TARGET_CUST);
        },

        handleClick(){
          this.form_data.pageInfo.PageNum=1;
          this.form_data.pageInfo.PageSize=10;
        },

        querylist(param) {

          this.form_data.param = param;
          this.doQuery();
        }
        ,
        queryPage(pageInfo) {
          this.form_data.pageInfo = pageInfo;
          this.doQuery();
        }
        ,
        doQuery() {
          InstBusTargetCustMerQuery(this.form_data)
            .then(response => {
              this.list = response.Data;
              this.form_data.pageInfo = response.PageInfo;
            })
            .catch(() => {
              this.$message.error('查询失败!');
            });
        }
      }
  }
</script>

<style scoped>
  .yh-institutionalbusinesstargetCustomer {
    margin: 0 20px;
    padding-bottom: 10px;
    /*ouxinsu*/
    border: 0px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow:none;
  }
  .basecontent-targetcust{
    background-color: #fff;
    border: 1px solid #ebeef5;
    padding:0 20px;
  }


</style>


