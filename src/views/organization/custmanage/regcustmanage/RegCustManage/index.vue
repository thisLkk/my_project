<template>
  <!-- 客户管理  我的注册客户 -->
  <div class="yh_regcustmanage">
    <RegCustManageQuery @initParam="initParam" @querylist="querylist" parentPage="manage"/>
    <QueryResultInRegCustManage parentPage="manage" manageFlag="true" :pageInfo="form_data.pageInfo" :topInfoList="list" @queryPage = "queryPage"></QueryResultInRegCustManage>
    
  </div>
</template>

<script>
import global_ from '@/common/Global'
import { RegCustManageQuery, QueryResultInRegCustManage } from '@/views/organization/custmanage/components/index.js'
import { regCustManageQuery } from "@/api/organization/custmanage/regcustmanage/RegCustManage/index.js";

export default {
  name: 'RegCustManage',
  components: {
    RegCustManageQuery,
    QueryResultInRegCustManage
  },
  data() {
    return {
      list:null,
      form_data: {
        "pageInfo": {
	        "PageNum": 1,
	        "PageSize":10,
	        "Total": 0,
	        "OrderBy": "",
	        "Pages": 0
        },
        "param": {

        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  },
  methods: {
        //初始化tab页面参数  不执行查询操作
    initParam(parentPage,param){
      this.form_data.param = param;
    },
    querylist(parentPage,param){
      this.form_data.param = param;
      this.doQuery();
    },
    queryPage(parentPage,pageInfo){
      
      this.form_data.pageInfo = pageInfo;
      this.doQuery();
    },
    doQuery(){
      regCustManageQuery(this.form_data)
        .then(response => {
          this.list = response.Data;
          this.form_data.pageInfo = response.PageInfo;
        })
        .catch(() => {
          //alert("访问出错");
        });
    }
  },
  //界面加载完成后 默认执行查询
  mounted:function(){
    this.doQuery();
  }
}
</script>
<style scoped>
.yh_regcustmanage{
  margin: 0 20px;
}
.searchresult {
  margin-bottom: 10px;
}
</style>
