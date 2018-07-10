<template>
  <!-- 战略客户查询 __ 客户信息展示页面 -->
  <div class="yh-queryresult clearfix">
    <strategyInstitutionFormalCustomerQuery  name="cus" :lists="list"  @CtcLabelManagerGroud="CtcLabelManagerGroud" ></strategyInstitutionFormalCustomerQuery>
    <!-- <div v-if="pages.Total!= 0 " class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10,15, 20]"
        :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="pages !=null ? pages.Total : '0' ">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
import  strategyInstitutionFormalCustomerQuery  from "./strategyInstitutionFormalCustomerQuery.vue";
export default {
  name: "strategyQueryResultFormalCustomerQuery",
  props: {
    list: {
      type: Array
    },
  },
  components: {
    strategyInstitutionFormalCustomerQuery
  },
  data() {
    return {
      form: {},
      page: 10,
      currentPage: 1
    };
  },
  created() {

  },
  methods: {
    handleSizeChange(val) {//分页查询
      this.page = val;
      var data = {
        pageNum: this.currentPage,
        pageSize: this.page
      };
      this.$emit("queryPage", data);
    },
    handleCurrentChange(val) {//分页查询
      var data = {
        pageNum: this.currentPage,
        pageSize: this.page
      };
      this.$emit("queryPage", data);
    },
    CtcLabelManagerGroud(data){//添加分组
      this.$emit("CtcLabelManager",data);
    },
  }
};
</script>
<style scoped>
.yh-queryresult {
  background: #fff;
}
.pagination {
  text-align: right;
  padding: 8px 0;
}
</style>




