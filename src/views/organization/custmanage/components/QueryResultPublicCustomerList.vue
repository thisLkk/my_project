<template>
  <div class="yh-queryresult clearfix">
    <div class="yh-customerlist">
        <InstitutionPublicCustomerList v-show="lists.length" :tabstype='tabtype' :institutionpubliccustomerlists="lists"></InstitutionPublicCustomerList>
        <div class="tempnodata" v-show="!lists.length">暂无数据</div>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[5, 10,15, 20]"
                     :page-size="pageInfo.PageSize"
                     :current-page.sync="pageInfo.PageNum"
                     :total="pageInfo.Total"
                     layout="total, sizes, prev, pager, next, jumper"
                     >
      </el-pagination>
    </div>
    <div>
      <BackToTop></BackToTop>
    </div>
  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
import { InstitutionPublicCustomerList } from "./index.js";
import BackToTop from "../../../../components/BackToTop";
export default {
  name: "QueryResultPublicCustomerList",
  components: {
    InstitutionPublicCustomerList,
    BackToTop
  },
  props: {
    tabtype: {
      type: Boolean
    },
    lists: {
      type: Array
    },
    pageInfo: {
      type: Object
    }
  },
  data() {
    return {
      page: 10,
      currentPage: 1,
    };
  },
  created() {
    // //console.log(this.$props.page);
    ////console.log(this.$props.lists);
  },
  methods: {
    hasdata(){
      if(this.lists.length==0){
        return true;
      }else{
        return false;
      }
    },

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
        pageNum: val,
        pageSize: this.page
      };
      this.$emit("queryPage", data);
    }
  }
};
</script>
<style scoped>
.yh-queryresult {
  background: #fff;
}
.yh-customerlist {
  border-top: 1px #ebeef5 solid;
}
.yh-emply {
  font-family: "微软雅黑";
  font-size: 16px;
  text-align: left;
}
.pagination {
  text-align: right;
  padding: 8px 0;
}

.tempnodata{
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  margin-top: 12px;
  color: #999;
}
</style>


