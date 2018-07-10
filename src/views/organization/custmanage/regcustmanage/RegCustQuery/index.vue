<template>
  <div class="yh_regcustqeury">
    <!-- 注册客户查询 -->
    <el-tabs type="border-card" v-model="queryName" @tab-click="tabsChange">
      <el-tab-pane label="我团队注册客户" name="department" v-if="hasMyFormalFun()">
        <div v-if="queryName == 'department'">
          <RegCustManageQuery @initParam="initParam" @querylist="querylist" parentPage="dept" />
          <QueryResultInRegCustManage manageFlag="false" parentPage="dept" :pageInfo="form_data_dept.pageInfo" :topInfoList="list_dept"
            @queryPage="queryPage" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="我机构注册客户" name="organization" v-if="hasMyOrgFun()">
        <div v-if="queryName == 'organization'">
          <RegCustManageQuery @initParam="initParam" @querylist="querylist" parentPage="org" />
          <QueryResultInRegCustManage manageFlag="false" parentPage="org" :pageInfo="form_data_org.pageInfo" :topInfoList="list_org"
            @queryPage="queryPage" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="全部注册客户" name="all"  v-if="hasMyAllFun()">
        <div v-if="queryName == 'all'">
          <RegCustManageQuery @initParam="initParam" @querylist="querylist" parentPage="all" />
          <QueryResultInRegCustManage manageFlag="false" parentPage="all" :pageInfo="form_data_all.pageInfo" :topInfoList="list_all"
            @queryPage="queryPage" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import global_ from '@/common/Global'
  import {
    RegCustManageQuery,
    QueryResultInRegCustManage
  } from '@/views/organization/custmanage/components/index.js'
  import {
    regCustDepQuery,
    regCustOrgQuery,
    regCustAllQuery
  } from "@/api/organization/custmanage/regcustmanage/RegCustManage/index.js";
  import {
    hasFuntion
  } from "@/filters";
  import FUNCODE from "@/utils/funCode.js";

  export default {
    name: 'RegCustQeury',
    components: {
      RegCustManageQuery,
      QueryResultInRegCustManage
    },
    data() {
      return {
        queryName: 'department',
        list_dept: null,
        list_org: null,
        list_all: null,
        form_data_dept: {
          "pageInfo": {
            "PageNum": 1,
            "PageSize": 10,
            "Total": 0,
            "OrderBy": "",
            "Pages": 0
          },
          "param": {

          }
        },
        form_data_org: {
          "pageInfo": {
            "PageNum": 1,
            "PageSize": 10,
            "Total": 0,
            "OrderBy": "",
            "Pages": 0
          },
          "param": {

          }
        },
        form_data_all: {
          "pageInfo": {
            "PageNum": 1,
            "PageSize": 10,
            "Total": 0,
            "OrderBy": "",
            "Pages": 0
          },
          "param": {

          }
        },

      }
    },
    created() {

         let fromView=this.$route.params.fromView;
         if(fromView){
             // console.info(fromView)
             if(fromView=="mydept"){
               var team = this.hasMyFormalFun();
               if(team){
                 this.queryName = "department";
               }
             }else if(fromView=="myorg"){
               var org = this.hasMyOrgFun();
               if(org){
                 this.queryName = "organization";
               }
               var all=this.hasMyAllFun();
               if(all){
                 this.queryName = "all";
               }
             }

         }else{
             var team = this.hasMyFormalFun();
             var org = this.hasMyOrgFun();
             var all = this.hasMyAllFun();
             if (team) {
               this.queryName = "department";
             } else if (org) {
               this.queryName = "organization";
             } else if (all) {
               this.queryName = "all";
             }
         }
         //console.info(fromView);
    },
    methods: {
      hasMyFormalFun() {
        //判断是否有我的功能权限
        let rf = hasFuntion(FUNCODE.FUNC_SELF_REGISTER_CUST);
        return rf;
      },
      hasMyOrgFun() {
        //判断是否有我团队的功能权限
        return hasFuntion(FUNCODE.FUNC_ORG_REGISTER_CUST);
      },
      hasMyAllFun() {
        //判断是否有我部门的功能权限
        return hasFuntion(FUNCODE.FUNC_ALL_REGISTER_CUST);
      },
      //初始化tab页面参数  不执行查询操作
      initParam(parentPage, param) {
        if ('dept' == parentPage) { //团队客户 查询动作
          this.form_data_dept.param = param;
        } else if ('org' == parentPage) { //机构客户查询动作
          this.form_data_org.param = param;
        } else { //全部客户查询动作
          this.form_data_all.param = param;
        }
      },
      //查询操作
      querylist(parentPage, param) {
        if ('dept' == parentPage) { //团队客户 查询动作
          this.form_data_dept.param = param;
        } else if ('org' == parentPage) { //机构客户查询动作
          this.form_data_org.param = param;
        } else { //全部客户查询动作
          this.form_data_all.param = param;
        }
        this.doQuery();
      },
      //分页改变
      queryPage(parentPage, pageInfo) {
        if ('dept' == parentPage) { //团队客户 分页改变
          this.form_data_dept.pageInfo = pageInfo;
        } else if ('org' == parentPage) { //机构客户分页改变
          this.form_data_org.pageInfo = pageInfo;
        } else { //全部客户分页改变
          this.form_data_all.pageInfo = pageInfo;
        }
        this.doQuery();
      },
      //根据 当前选中tab页 执行查询操作
      doQuery() {
        if ("department" == this.queryName) { //团队客户
          this.doQueryDept();
        } else if ("organization" == this.queryName) { //机构客户
          this.doQueryOrg();
        } else { //全部客户
          this.doQueryAll();
        }
      },
      //团队客户查询
      doQueryDept() {
        regCustDepQuery(this.form_data_dept)
          .then(response => {
            //alert("=="+JSON.stringify(responseresponse.Data))
            this.list_dept = response.Data;
            this.form_data_dept.pageInfo = response.PageInfo;
            ////console.log("3-----------"+JSON.stringify(response));
          })
          .catch(() => {
            //alert("访问出错");
          });
      },
      //机构客户查询
      doQueryOrg() {
        regCustOrgQuery(this.form_data_org)
          .then(response => {
            //alert("=="+JSON.stringify(responseresponse.Data))
            this.list_org = response.Data;
            this.form_data_org.pageInfo = response.PageInfo;
            ////console.log("3-----------"+JSON.stringify(response));
          })
          .catch(() => {
            //alert("访问出错");
          });
      },
      //全部客户查询
      doQueryAll() {
        regCustAllQuery(this.form_data_all)
          .then(response => {
            //alert("=="+JSON.stringify(responseresponse.Data))
            this.list_all = response.Data;
            this.form_data_all.pageInfo = response.PageInfo;
            ////console.log("3-----------"+JSON.stringify(response));
          })
          .catch(() => {
            // alert("访问出错");
          });
      },
      //tab页面改变 重新加载最新tab页数据
      tabsChange() {
        this.doQuery();
      },
    },
    //界面加载完成后 默认执行查询
    mounted: function () {
      this.doQuery();
    }
  }

</script>
<style scoped>
  .yh_regcustqeury {
    margin: 0 20px;
  }

  .searchresult {
    margin-bottom: 10px
  }

</style>
