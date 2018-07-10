<template>
  <!-- 我的战略客户 __ 客户信息展示页面 -->
  <div class="yh-queryresult clearfix">
    <strategyInstitutionFormalCustomerManage ref="InstitutionFormalCustomerManages"  name="cus" :lists="list" @addformalcuslist="addformalcuslist" @CtcLabelManagerGroud="CtcLabelManagerGroud" @AddServices ="AddServices"></strategyInstitutionFormalCustomerManage>
    <!-- <div class="paginations" v-if="pages.Total!= 0 ">
      <el-pagination   @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15 ,20]"
        :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="pages !=null ? pages.Total : 10">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
import strategyInstitutionFormalCustomerManage from "./strategyInstitutionFormalCustomerManage.vue";
export default {
  name: "strategyQueryResultFormalCustomerManage",
  props: {
    list: {
      type: Array
    },
  },
  components: {
    strategyInstitutionFormalCustomerManage
  },
  data() {
    return {
      page: 10,
      currentPage: 1
    };
  },
  created() {
    //console.log(this.list);
    // -------------------------------------------------调取父组件的方法，刺激组件更新
    // this.$emit("responsePages",'')
  },
  methods: {
    //--------------------------------------------------每次新增或者分页都会重新给分页再次赋值
    pageInit(data) {
      this.pages = data;
    },
    //--------------------------------------------------分页查询
    handleSizeChange(val) {
      this.page = val;
      var data = {
        pageNum: this.currentPage,
        pageSize: this.page,
        total: 0,
        orderBy: "",
        pages: 0
      };
      this.$emit("queryPage", data);
    },
    //-------------------------------------------------分页查询
    handleCurrentChange(val) {
      var data = {
        pageNum: this.currentPage,
        pageSize: this.page,
        total: 0,
        orderBy: "",
        pages: 0
      };
      this.$emit("queryPage", data);
    },
    //新增
    addformalcuslist(data) {
      this.$emit("addFormalcus", data);
    },
    //添加分组
    CtcLabelManagerGroud(data) {
      //console.log(data);
      this.$emit("CtcLabelManager", data);
    },
    //添加服务记录
    AddServices(data) {
      this.$emit("AddService", data);
    },
    removeAddSer() {
      this.$refs.InstitutionFormalCustomerManages.removeaddser();
    }
  }
};
</script>
<style scoped>
.yh-queryresult {
  background: #fff;
  border-top:#ebeef5 solid 1px;
  margin-top:10px;
}
.paginations {
  float: right;
  text-align: right;
  padding: 8px 0;
}
</style>
