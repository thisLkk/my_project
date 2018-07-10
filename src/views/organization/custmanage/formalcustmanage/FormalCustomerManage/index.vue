<template>
  <!-- 客户管理__ 我的正式客户页面（正在使用） v-if="list!=null"  -->
  <div class="yh-organization-customermanage">
    <div class="yh_query">
      <QueryCriteria queryName="我的正式" ref="mysearchcust" @fastSearch="fastSearch" @querylist="querylist" @seniorquerylist="seniorquerylist"></QueryCriteria>
    </div>
    <div class="yh_table">
      <QueryResultFormalCustomerManage ref="QueryResultFormalCustomerManageRef" v-if="list!=null" :list="list" @queryPage="queryPage"
        @addFormalcus="addFormalcus" @CtcLabelManager="CtcLabelManager" @AddService="AddService"></QueryResultFormalCustomerManage>
      <div v-if="page!=null" class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15 , 20]"
          :page-size="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="page.Total ">
        </el-pagination>
      </div>
    </div>
    <div>
      <BackToTop :customStyle='customStyle'></BackToTop>
    </div>
  </div>
</template>
<script>
  import global_ from "@/common/Global";
  import {
    QueryResultFormalCustomerManage,
    QueryCriteria
  } from "@/views/organization/custmanage/components/index.js";
  import BackToTop from "../../../../../components/BackToTop";
  import {
    myformalquery,
    addformalcus,
    ctcLabelManager,
    addService,
    fastSearch,
    seniorformalquery,
    myformalqueryPage,
    fastSearchPage
  } from "@/api/organization/custmanage/formalcustmanage/FormalCustomerManage/index.js";

  export default {
    name: "FormalCustomerManage",
    components: {
      QueryCriteria,
      QueryResultFormalCustomerManage,
      BackToTop
    },
    data() {
      return {
        pageSizes: 10,
        currentPage: 1,
        list: null, //--------------------响应回来的数据信息
        page: null, //--------------------响应的分页信息
        responsePage: false, //-----------监听分页数据的变化
        fastSearchTrue: false, //---------快速搜索的辨别（处于快速搜索，分页调快速搜索）
        querylistTrue: false, //----------基础查询的辨别（处于快速搜索，分页调基础搜索）
        //--------------------------------返回顶部
        customStyle: {
          right: "50px",
          bottom: "50px",
          width: "36px",
          height: "36px",
          "border-radius": "10px",
          "line-height": "36px",
          background: "#d6d6d6"
        },
        form_data: {
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            searchType: "0",
            individualFlag: "",
            industryCode: "",
            simpleDif: "01",
            custLblDep: "",
            custLblRightChar: "",
            custOrg: {}
          }
        }
      };
    },
    created() {
      let fromView = this.$route.params.fromView;
      if(fromView){
        this.querySearchDetail();
      }
      //组件生成执行
      // this.init(this.form_data);
    },
    watch:{
      $route(){
        let fromView = this.$route.params.fromView;
        if(fromView=="indxmy"){
          this.querySearchDetail();
        }
      }
    },

    methods: {
      querySearchDetail(){
        let _this = this;
        setTimeout(function () {
          _this.$refs.mysearchcust.closeQueryCondtion();
        }, 500);

        //搜索的内容塞到列表页面
        let list=this.$store.getters.quikSearchData;
        this.list=list;
        this.page=null;
      },

      handleSizeChange(val) {
        //分页查询
        this.page = val;
        var data = {
          pageNum: this.currentPage,
          pageSize: this.pageSizes,
          total: 0,
          orderBy: "",
          pages: 0
        };
        this.queryPage(data);
      },
      handleCurrentChange(val) {
        //分页查询
        var data = {
          pageNum: this.currentPage,
          pageSize: this.pageSizes,
          total: 0,
          orderBy: "",
          pages: 0
        };
        this.queryPage(data);
      },
      //----------------------------------------------------------------------发送请求的地方
      init(query) {
        myformalquery(query)
          .then(response => {
            this.list = response.Data;
            this.page = response.PageInfo;
          })
          .catch(() => {
            //alert("访问出错");
          });
      },
      //-----------------------------------------------------------------------监听分页数据的变化
      // responsePages(data) {
      //   this.responsePage = true;
      // },
      //-----------------------------------------------------------------------基础查询接口
      querylist(query) {
        this.form_data.param = query;
        this.querylistTrue = true;
        this.fastSearchTrue = false;
        myformalquery(this.form_data)
          .then(response => {
            this.list = response.Data;
          })
          .catch(() => {});
        myformalqueryPage(this.form_data)
          .then(response => {
            this.page = response.PageInfo;
          })
          .catch(() => {});
      },
      //-----------------------------------------------------------------------高级查询接口
      seniorquerylist(query) {
        this.form_data.param = query;
        this.querylistTrue = true;
        this.fastSearchTrue = false;
        seniorformalquery(this.form_data)
          .then(response => {
            this.list = response.Data;
            this.page = response.PageInfo;
          })
          .catch(() => {});
      },
      //------------------------------------------------------------------------分页查询功能
      queryPage(query) {
        this.form_data.pageInfo = query;
        // ---------------------------------------------------------------------快速搜索的分页
        if (this.fastSearchTrue == true) {
          fastSearch(this.form_data)
            .then(response => {
              this.list = response.Data;
            })
            .catch(() => {});
        } else if (this.querylistTrue == true) {
          myformalquery(this.form_data)
            .then(response => {
              this.list = response.Data;
            })
            .catch(() => {});
        }
      },
      //------------------------------------------------------------------------新建功能（请求）
      addFormalcus(query) {
        var data = {
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            searchType: "0",
            individualFlag: "0",
            industryCode: "1",
            advSearchTypeFlag: "false"
          }
        };
        var self = this;
        data.param = query;
        addformalcus(data)
          .then(response => {
            // self.init(this.form_data);
          })
          .catch(() => {});
      },
      //-----------------------------------------------------------------------添加分组
      CtcLabelManager(group) {
        var data = {
          param: group
        };
        var self = this;
        ctcLabelManager(data)
          .then(response => {})
          .catch(() => {});
      },
      //-----------------------------------------------------------------------添加服务记录
      AddService(group) {
        var data = {
          param: group
        };
        //console.log(data);
        var self = this;
        addService(data)
          .then(response => {
            this.$refs.QueryResultFormalCustomerManageRef.removeAddSer();
          })
          .catch(() => {});
      },
      //----------------------------------------------------------------------快速搜索
      fastSearch(query) {
        this.querylistTrue = false;
        this.fastSearchTrue = true;
        this.form_data.param = query.param;
        var self = this;
        fastSearch(this.form_data)
          .then(response => {
            this.list = response.Data;
          })
          .catch(() => {});
        fastSearchPage(this.form_data)
          .then(response => {
            this.page = response.PageInfo;
          })
          .catch(() => {});
      }
    }
    // beforeRouteLeave(to, from, next) {
    //   this.$destroy();
    //   next();
    // }
  };

</script>
<style scoped>
  .yh-organization-customermanage {}

  /*ouxinsu*/

  .yh_query {
    margin: 20px;
    margin-top: 0;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    padding: 0 20px;
    padding-bottom: 10px;
    font-size: 12px;
  }

  .yh_table {
    background-color: #ffffff;
    margin: 10px 20px 20px 20px;
    margin-top: 0;
    padding-bottom: 10px;
  }

</style>
