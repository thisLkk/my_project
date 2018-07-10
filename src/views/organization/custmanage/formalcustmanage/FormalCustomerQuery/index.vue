<template>
  <div class="yh-formalcustomerquery">
    <el-tabs v-model="queryName" type="border-card" @tab-click="TabshandleClick">
      <el-tab-pane label="我团队客户" name="department" v-if="hasMyFormalFun()">
        <div v-if="queryName == 'department'">
          <QueryCriteria class="el-card__body" ref="formaldeptcustref" @querylist="querylist" @fastSearch="fastSearch" @seniorquerylist="seniorquerylist"
            queryName="departmentQuery"></QueryCriteria>
          <div class="yh-emply"></div>
          <QueryResultFormalCustomerQuery v-if="list!=null" :list="list" @queryPage="queryPage" @CtcLabelManager="CtcLabelManager"></QueryResultFormalCustomerQuery>
          <div v-if="page!=null" class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15 , 20]"
              :page-size="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="page.Total ">
            </el-pagination>
          </div>
          <BackToTop :customStyle='customStyle'></BackToTop>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我机构客户" name="organization" v-if="hasMyOrgFun()">
        <div v-if="queryName == 'organization'">
          <QueryCriteria class="el-card__body" ref="formalOrgcustref" @querylist="querylist" @fastSearch="fastSearch" @seniorquerylist="seniorquerylist"
            queryName="organizationQuery"></QueryCriteria>
          <div class="yh-emply"></div>
          <QueryResultFormalCustomerQuery v-if="list!=null" :list="list" @queryPage="queryPage" @CtcLabelManager="CtcLabelManager"></QueryResultFormalCustomerQuery>
          <div v-if="page!=null" class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15 , 20]"
              :page-size="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="page.Total ">
            </el-pagination>
          </div>
          <BackToTop :customStyle='customStyle'></BackToTop>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全部客户" name="all" v-if="hasMyAllFun()">
        <div v-if="queryName == 'all'">
          <QueryCriteria class="el-card__body"  ref="allCustQueryRef" @querylist="querylist" @fastSearch="fastSearch" @seniorquerylist="seniorquerylist" queryName="allQuery"></QueryCriteria>
          <div class="yh-emply"></div>
          <QueryResultFormalCustomerQuery v-if="list!=null" :list="list" @queryPage="queryPage" @CtcLabelManager="CtcLabelManager"></QueryResultFormalCustomerQuery>
          <div v-if="page!=null" class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15 , 20]"
              :page-size="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="page.Total ">
            </el-pagination>
          </div>
          <BackToTop :customStyle='customStyle'></BackToTop>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    hasFuntion
  } from "@/filters";
  import FUNCODE from "@/utils/funCode.js";
  import global_ from "@/common/Global";
  import {
    QueryResultFormalCustomerQuery,
    QueryCriteria
  } from "@/views/organization/custmanage/components/index.js";
  import {
    FormalQuery,
    CtcLabelManager,
    OrgFormalQuery,
    AllFormalQuery,
    fastSearch,
    seniorformalquery,
    myformalqueryPage,
    fastSearchPage
  } from "@/api/organization/custmanage/formalcustmanage/FormalCustomerQuery/index.js";
  import BackToTop from "../../../../../components/BackToTop";
  export default {
    name: "FormalCustomerQuery",
    components: {
      QueryCriteria,
      QueryResultFormalCustomerQuery,
      BackToTop
    },
    data() {
      return {
        pageSizes: 10,
        currentPage: 1,
        queryName: "department", //-----------------不同请求的tab表格名称(初始化)
        list: null, //------------------------------请求响应回来的数据
        page: null, //------------------------------请求响应回来的分页数据
        departmentQueryList: null, //----------------团队数据
        departmentQueryPage: null, //----------------团队分页
        organizationQueryList: null, //--------------机构数据
        organizationQueryPage: null, //--------------机构分页
        allQueryListList: null, //-------------------全部数据
        allQueryListPage: null, //-------------------全部分页
        responsePage: false, //---------------------监听分页数据的变化
        fastSearchTrue: false, //-------------------快速搜索的辨别（处于快速搜索，分页调快速搜索）
        querylistTrue: false, //--------------------基础查询的辨别（处于快速搜索，分页调基础搜索）
        //------------------------------------------返回顶部的按钮样式
        customStyle: {
          right: "50px",
          bottom: "50px",
          width: "36px",
          height: "36px",
          "border-radius": "10px",
          "line-height": "36px",
          background: "#d6d6d6"
        },
        //-----------------------------------------初始请求的参数
        form_data: {
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {}
        }
      };
    },
    mounted(){

    },

    created() {
      let fromView = this.$route.params.fromView;

      var team = this.hasMyFormalFun();
      var org = this.hasMyOrgFun();
      var all = this.hasMyAllFun();//全部
      if (fromView) {
        //-----------------------从首页指标进来--------------------------------
        if (fromView == "mydept") {
          if (team) {
            this.queryName = "department";
            let _this = this;
            setTimeout(function () {
              _this.$refs.formaldeptcustref.FormalQuery();
            }, 500);
          }
        } else if (fromView == "myorg") {
          let _this = this;
          if (org) {//选择机构Tab页
            this.queryName = "organization";
            setTimeout(function () {
              _this.$refs.formalOrgcustref.FormalQuery();
            }, 500);
          }
          if(all){
            this.queryName = "all";//选择全部客户Tab页
            setTimeout(function () {
              _this.$refs.allCustQueryRef.FormalQuery();
            }, 500);
          }
        //-----------------------从快捷搜索进来进来--------------------------------
        }else if(fromView=="indx"){
          //处理快速处理逻辑
          this.querySearchDetail();
        }
      } else {
        if (team) {
          this.queryName = "department";
        } else if (org) {
          this.queryName = "organization";
        } else if (all) {
          this.queryName = "all";
        }
      }
    },
    watch:{
      $route(){
        let fromView = this.$route.params.fromView;
        if(fromView=="indx"){
          this.querySearchDetail();
        }
      }
    },
    methods: {

      querySearchDetail(){

        var team = this.hasMyFormalFun();
        var org = this.hasMyOrgFun();
        var all = this.hasMyAllFun();//全部

        let _this = this;
        if (team) {
          this.queryName = "department";
          setTimeout(function () {
            _this.$refs.formaldeptcustref.closeQueryCondtion();
          }, 1000);
        }
        if (org) {//选择机构Tab页
          this.queryName = "organization";
          setTimeout(function () {
            _this.$refs.formalOrgcustref.closeQueryCondtion();
          }, 1000);
        }
        if(all){
          this.queryName = "all";//选择全部客户Tab页
          setTimeout(function () {
            _this.$refs.allCustQueryRef.closeQueryCondtion();
          }, 1000);
        }
        //搜索的内容塞到列表页面
        let list=this.$store.getters.quikSearchData;
        this.list=list;
        this.page=null;
      },

      handleSizeChange(val) { //分页查询
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
      handleCurrentChange(val) { //分页查询
        var data = {
          pageNum: this.currentPage,
          pageSize: this.pageSizes,
          total: 0,
          orderBy: "",
          pages: 0
        };
        this.queryPage(data);
      },
      hasMyFormalFun() {
        //判断是否有我的功能权限
        let rf = hasFuntion(FUNCODE.FUNC_SELF_CUST);
        return rf;
      },
      hasMyOrgFun() {
        //判断是否有我团队的功能权限
        return hasFuntion(FUNCODE.FUNC_ORG_CUST);
      },
      //全部客户
      hasMyAllFun() {
        return hasFuntion(FUNCODE.FUNC_ALL_CUST);
      },
      // tabs 的权限获取判断
      TabshandleClick(tab, event) {
        //console.log(this.queryName);
        switch (this.queryName) {
          case "department":
            this.list = this.departmentQueryList;
            this.page = this.departmentQueryPage;
            break;
          case "organization":
            this.list = this.organizationQueryList;
            this.page = this.organizationQueryPage;
            break;
          case "all":
            this.list = this.allQueryListList;
            this.page = this.allQueryListPage;
            break;

          default:
            break;
        }
        // this.list = null;
        // this.page = null;
      },
      //-------------------------------------------------基础查询
      querylist(data) {
        this.querylistTrue = true;
        this.fastSearchTrue = false;
        this.form_data.param = data;
        switch (data.queryName) {
          case "departmentQuery": //--------------------我部门的查询
            //console.log("我团队的查询");
            FormalQuery(this.form_data)
              .then(response => {
                this.departmentQueryList = response.Data;
                this.list = response.Data;
              })
              .catch(() => {
                //alert("访问出错");
              });
            myformalqueryPage(this.form_data)
              .then(response => {
                this.departmentQueryPage = response.PageInfo;
                this.page = response.PageInfo;
              })
              .catch(() => {
                //alert("访问出错");
              });
            break;
          case "organizationQuery": //-----------------我机构的查询
            //console.log("我机构的查询");
            OrgFormalQuery(this.form_data)
              .then(response => {
                this.organizationQueryList = response.Data;
                this.list = response.Data;
                myformalqueryPage(this.form_data)
                  .then(response => {
                    this.departmentQueryPage = response.PageInfo;
                    this.page = response.PageInfo;
                  })
                  .catch(() => {
                    //alert("访问出错");
                  });
              })
              .catch(() => {
                //alert("访问出错");
              });

            break;
          case "allQuery": //-------------------------我全部的查询
            //console.log("全部查询");
            AllFormalQuery(this.form_data)
              .then(response => {
                this.allQueryList = response.Data;
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
            this.form_data.param.orgNo = "";
            myformalqueryPage(this.form_data)
              .then(response => {
                this.departmentQueryPage = response.PageInfo;
                this.page = response.PageInfo;
              })
              .catch(() => {
                //alert("访问出错");
              });
            break;
          default:
            break;
        }
      },
      // ---------------------------------------------高级查询
      seniorquerylist(query) {
        this.form_data.param = query;
        this.querylistTrue = true;
        this.fastSearchTrue = false;
        switch (data.queryName) {
          case "departmentQuery": //--------------------我部门的查询
            //console.log("我团队的查询");
            FormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
                this.page = response.PageInfo;
              })
              .catch(() => {
                //alert("访问出错");
              });
            break;
          case "organizationQuery": //-----------------我机构的查询
            //console.log("我机构的查询");
            OrgFormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
                this.page = response.PageInfo;
              })
              .catch(() => {
                //alert("访问出错");
              });
            break;
          case "allQuery": //-------------------------我全部的查询
            //console.log("全部查询");
            AllFormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
                this.page = response.PageInfo;
              })
              .catch(() => {
                // alert("访问出错");
              });
            break;
          default:
            break;
        }
      },
      //---------------------------------------------分页的查询（从子组件传过来的分页参数）
      queryPage(query) {
        if (this.fastSearchTrue == true) {
          if (this.queryName == "department") {
            this.form_data.pageInfo = query;
            FormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
          } else if (this.queryName == "organization") {
            this.form_data.pageInfo = query;
            OrgFormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
          } else if (this.queryName == "all") {
            this.form_data.pageInfo = query;
            AllFormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
          }
        } else if (this.querylistTrue == true) {
          if (this.queryName == "department") {
            this.form_data.pageInfo = query;
            FormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
          } else if (this.queryName == "organization") {
            this.form_data.pageInfo = query;
            OrgFormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
          } else if (this.queryName == "all") {
            this.form_data.pageInfo = query;
            AllFormalQuery(this.form_data)
              .then(response => {
                this.list = response.Data;
              })
              .catch(() => {
                // alert("访问出错");
              });
          }
        }
      },
      //---------------------------------------------添加分组（有此功能）
      CtcLabelManager(group) {
        var data = {
          param: group
        };
        var self = this;
        CtcLabelManager(data)
          .then(response => {
            self.init(this.queryName, this.form_data);
            // alert("添加成功");
          })
          .catch(() => {
            //alert("访问出错");
          });
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
  .yh-formalcustomerquery {
    margin: 0 20px;
  }

  .yh-formalcustomerquery .el-tab-pane .el-card__body {
    border-radius: 3px;
    padding: 0 20px 10px 20px;
    background: #fff;
    border: solid 1px #ebeef5;
    /*ouxinsu*/
  }

</style>
