<template>
  <div class="yh_PublicRegistrationList">
    <el-tabs type="border-card" v-model="name" @tab-click="handelClick">
      <el-tab-pane label="上市公司" name="listedcompany" ref="listedcompany">
        <div class="yh-querycriteria" v-if="listedcompany">
          <ListedCompanyQueryCriteria @querylist="querylist" name="listedcompanyQuery"></ListedCompanyQueryCriteria>
          <QueryResultPublicCustomerList v-if="!show_" :lists="cplist" :pageInfo="cppage"
                                         @queryPage="queryByPageOne"></QueryResultPublicCustomerList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="投行潜客" name="submersible" ref="submersible">
        <div class="yh-querycriteria" v-if="submersible">
          <SubmersibleQueryCriteria @querylist="querylist" name="submersibleQuery"></SubmersibleQueryCriteria>
          <QueryResultPublicCustomerList v-if="!show_" :lists="qzlist" :pageInfo="qzpage" @queryPage="queryByPageTwo"
                                         :tabtype='type.submersible'></QueryResultPublicCustomerList>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {
    ListedCompanyQueryCriteria,
    SubmersibleQueryCriteria,
    QueryResultPublicCustomerList
  } from "@/views/organization/custmanage/components/index.js";
  import BackToTop from "@/components/BackToTop";
  import {
    listedcompanyquery,
    submersiblequery
  } from "@/api/organization/custmanage/regcustmanage/PublicRegistrationList/index.js";

  export default {
    name: "PublicRegistrationList",
    components: {
      ListedCompanyQueryCriteria,
      SubmersibleQueryCriteria,
      QueryResultPublicCustomerList,
      BackToTop
    },
    data() {
      return {
        name: "listedcompany",
        show_: true,
        cplist: null,
        qzlist: null,

        cppage: null,
        qzpage: null,
        listedcompany: true,
        submersible: false,
        type: {
          submersible: true
        },
        //初始化参数
        initdata: {
          sysCode: "",
          token: "",
          transitionId: "",
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            orderBy: "",
            pages: 1
          },
          param: {
            searchType: "",
            custName: "",
            idNo: "",
            potentialOrg: {
              stkCode: "",
              secAbbr: "",
              windPriIndustry: "",
              windSndIndustry: "",
              exchg: "",
              stkMkt: "",
              plate: "",
              workAddr: "",
              mainBiz: "",
              listDate: "",
              province: "",
              city: ""
            },
            between: {
              MaxSz: "",
              MinSz: "",
              MaxZcfzl: "",
              MinZcfzl: "",
              MinYysr: "",
              MaxYysr: "",
              MinJlr: "",
              MaxJlr: ""
            }
          }
        },
        //上市公司查询结果
        resultlistedcompanydata: "",
        //投行潜客查询结果
        resultsubmersibledata: ""

      };
    },

    created() {
      this.init("listedcompany", this.initdata);
    },
    methods: {

      handelClick(tab, event) {

        let initData= {
          sysCode: "",
            token: "",
            transitionId: "",
            pageInfo: {
            pageNum: 1,
              pageSize: 10,
              total: 0,
              orderBy: "",
              pages: 1
          },
          param: {
            searchType: "",
              custName: "",
              idNo: "",
              potentialOrg: {
              stkCode: "",
                secAbbr: "",
                windPriIndustry: "",
                windSndIndustry: "",
                exchg: "",
                stkMkt: "",
                plate: "",
                workAddr: "",
                mainBiz: "",
                listDate: "",
                province: "",
                city: ""
            },
            between: {
              MaxSz: "",
                MinSz: "",
                MaxZcfzl: "",
                MinZcfzl: "",
                MinYysr: "",
                MaxYysr: "",
                MinJlr: "",
                MaxJlr: ""
            }
          }
        };
        this.init(this.name, initData);
      },
      resetDateInfo(){



      },
      //初始查询
      init(name, query) {


        switch (name) {
          case "listedcompany":
            //初始数据
            listedcompanyquery(query)
              .then(response => {
                this.cplist = response.Data;
                this.cppage = response.PageInfo;
                this.show_ = false;
                this.listedcompany = true;
                this.submersible = false;
              }).catch(() => {
              this.$message.error("查询失败!");
            });
            break;
          case "submersible":
            //初始数据
            submersiblequery(query)
              .then(response => {
                this.qzlist = response.Data;
                this.qzpage = response.PageInfo;
                this.show_ = false;
                this.listedcompany = false;
                this.submersible = true;
              }).catch(() => {

            });
            break;
          default:
            break;
        }
      },
      //基础查询与高级查询
      querylist(data) {
        switch (data.name) {
          case "listedcompanyQuery"://上市公司
            this.initdata.param = data.querydata;
            listedcompanyquery(this.initdata)
              .then(response => {
                this.cplist = response.Data;
                this.cppage = response.PageInfo;
                this.show_ = false;
                this.listedcompany = true;
                this.submersible = false;
              }).catch(() => {

            });
            break;
          case "submersibleQuery"://投行潜客
            this.initdata.param = data.querydata;
            submersiblequery(this.initdata)
              .then(response => {
                this.qzlist = response.Data;
                this.qzpage = response.PageInfo;
                this.show_ = false;
                this.listedcompany = false;
                this.submersible = true;
              }).catch(() => {

            });
            break;
          default:
            break;
        }
      },
      //分页的查询
      //上市公司
      queryByPageOne(query) {
        //console.info(query);

        this.initdata.pageInfo = query;
        //console.log(this.initdata);
        listedcompanyquery(this.initdata)
          .then(response => {
            this.cplist = response.Data;
            this.cppage = response.PageInfo;
            this.show_ = false;
            this.listedcompany = true;
            this.submersible = false;
          })
          .catch(() => {
            // alert("访问出错");
          });
      },
      //投行潜客
      queryByPageTwo(query) {
        this.initdata.pageInfo = query;
        submersiblequery(this.initdata)
          .then(response => {
            this.qzlist = response.Data;
            this.qzpage = response.PageInfo;
            this.show_ = false;
            this.listedcompany = false;
            this.submersible = true;
          })
          .catch(() => {
            // alert("访问出错");
          });
      }

    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_PublicRegistrationList {
    margin: 20px;
    margin-top: 0;
  }

  .yh-querycriteria {
    margin-bottom: 10px;
  }
</style>


