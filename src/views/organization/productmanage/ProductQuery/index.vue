<template>
    <!-- 资源管理 >> 资源管理下的 业务通讯录管理页面 -->
    <div class="yh_ProductQuery">
        <queryOfProductQuery @querylist="queryProductList"></queryOfProductQuery>
        <tableOfProductQuery ref="fdd" :pageInfo="formData.pageInfo" :list="list" @doQuery="doQuery" @sizeChange="querySizeChange" @pageNumCheng="queryPageNumCheng"></tableOfProductQuery>
    </div>
</template>

<script>
import { queryOfProductQuery,tableOfProductQuery } from "@/views/organization/productmanage/components/index.js";
import { productListQuery } from "@/api/organization/productmanage/index.js";

export default {
  name: "ProductQuery",
  components: {
    queryOfProductQuery,
    tableOfProductQuery
  },

  data() {
    return {
      list: [],
      formData: {
        pageInfo: {
          PageNum: 1,
          PageSize:10,
          Total: 0,
          OrderBy: "",
          Pages: 0
        },
        param: {
        }
      },
      pageOff: true
    }
  },

  mounted () {
    this.init();
  },

  methods: {
    init(query) {
      this.doQuery();
    },

    /**
     * 点击查询按钮
     * param {} 查询条件
     */
    queryProductList(param){
      this.formData.param = param;
      this.formData.pageInfo = {PageNum: 1, PageSize:10, Total: 0,OrderBy: '', Pages: 0};
      this.doQuery();
    },

    /**
     * 监听选择的每页显示多少条
     * val pageSize
     */
    querySizeChange(val) {
      this.formData.pageInfo.PageSize = val;
      if (this.pageOff) {
        this.pageOff = false;
        this.doQuery();
      };
    },

    /**
     * 监听当前页数
     * pageSize 每页显示多少条
     */
    queryPageNumCheng() {
      this.pageOff && this.doQuery();
    },

    /**
     * 查询接口
     */
    doQuery(require){
      if(require){
        this.formData.param.SortFld = require.SortFld;
        this.formData.param.SortMode = require.SortMode;
      }
      productListQuery(this.formData)
      .then(response => {
        if (response.Data) {
          this.list = response.Data;
          this.formData.pageInfo = response.PageInfo;
        } else {
          this.list = [];
          this.formData.pageInfo = {PageNum: 1, PageSize:10, Total: 0,OrderBy: '', Pages: 0};
          this.formData.param = {};
        };
        this.pageOff = true;
      })
      .catch(() => {
        this.$message.error("访问出错");
        this.pageOff = true;
      }); 
    }
  }
};
</script>

<style scoped>
  .yh_ProductQuery{
    margin:0 20px;
  }
</style>