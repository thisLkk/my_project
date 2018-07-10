<template>
    <!-- 资源管理 __ 资源管理下 __ 业务通讯录管理页面L -->
    <div class="yh_KnowledgeBaseQuery">
        <KnowledgeQuery @querylist="querylist"></KnowledgeQuery>
        <KnowledgeTable :manageFlag="false" :pageInfo="form_data.pageInfo" :list="list" @queryPage = "queryPage"></KnowledgeTable>
    </div>
</template>

<script>
import {
  KnowledgeQuery,
  KnowledgeTable
} from "@/views/organization/resourcemanage/components/index.js";
import { kbManageQuery } from "@/api/organization/resourcemanage/KnowledgeBaseManagement/index.js";

export default {
    name: "KnowledgeBaseQuery",
    components: {
      KnowledgeQuery,
      KnowledgeTable
    },
    data() {
      return {
      list:null,
      form_data: {
        "pageInfo": {
	        PageNum: 1,
	        PageSize:10,
	        Total: 0,
	        OrderBy: "",
	        Pages: 0
        },
        "param": {

        }
      }
    }
  },
  //渲染完成后 初始化数据
  mounted() {
    //组件生成执行
    //this.init(this.form_data);
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  },
  methods: {
    init(query) {
        this.doQuery();
    },
    querylist(param){
      this.form_data.param = param;
      this.doQuery();
    },
    queryPage(pageInfo){
      this.form_data.pageInfo = pageInfo;
      this.doQuery();
    },
    doQuery(){
        kbManageQuery(this.form_data)
        .then(response => {
          this.list = response.Data;
          this.form_data.pageInfo = response.PageInfo;
          ////console.log("3-----------"+JSON.stringify(response));
        })
        .catch(() => {
          //alert("访问出错");
        });
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_KnowledgeBaseQuery {
  margin: 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow:none;
}
</style>
