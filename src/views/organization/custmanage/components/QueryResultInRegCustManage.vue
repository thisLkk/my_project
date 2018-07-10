<template>
  <!-- 客户管理——我的注册客户列表 -->
  <div class="yh-queryresultinregcustquery">
    <el-form ref="form" :model="form" label-width="80px" style="clear:both">

        <InstitutionInRegCustManage :topInfoList="topInfoList" :manageFlag="manageFlag"  @queryPage = "queryPage"/>

        <div class="clearfloat"></div>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.PageNum" :page-sizes="[5, 10, 15,20]"
            :page-size="pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.Total">
          </el-pagination>
        </div>

    </el-form>
  </div>
</template>

<script>
import global_ from '@/common/Global'
import { doRequestPost, doRequestGet } from '@/utils/request'
import { InstitutionInRegCustManage } from './index.js'
export default {
  name: 'QueryResultInRegCustQuery',
  components: {
    InstitutionInRegCustManage
  },
  data() {
    return {
      form: {},
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    //每页数量改变
    handleSizeChange(val) {
     this.pageInfo.PageSize=val;
     this.$emit("queryPage",this.parentPage,this.pageInfo);
    },
    //点击页
    handleCurrentChange(val) {
     this.$emit("queryPage",this.parentPage,this.pageInfo);
    },
    //刷新方法
    queryPage() {
     this.$emit("queryPage",this.parentPage,this.pageInfo);
    },
  },

  props: ['parentPage','topInfoList','pageInfo','manageFlag']

}
</script>
<style scoped>
.yh-queryresultinregcustquery{
  margin-top: 10px;
  background: #fff;
}
.pagination {

  text-align: right;
  padding: 8px 0;

}
  .clearfloat{
    clear: both;
  }
</style>


