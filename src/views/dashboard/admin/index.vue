<template>
  <div class="dashboard-editor-container">

    <el-row style="margin-bottom:20px;" :gutter="0">
      <el-col :span="17" :offset="0" style="text-align:center;">

        <el-row>
          <el-col :span="24" style="text-align:center;">
            <div class="yh-div-module" style="padding:5px; padding-bottom:10px;">
              <el-input placeholder="客户号,名称,手机号,证件号码" ref="searchinput" v-model="cussearch" class="input-with-select"
                size="medium" @keyup.13.native="searchCusToCusManager">
                <el-button slot="append" icon="el-icon-search" type="primary" @click="searchCusToCusManager"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>

        <div class="yh-div-module" style="height:787px;">
          <!--背景样式-->
          <div class="grid-content bg-light">
           <!---客户指标-开始-->
            <div class="yh-headerdiv">
            <span class="yh-headerfl">
            <span class="yh-font-dsj">客户指标</span>
            </span>
            <div class="yh_index_selectDiv" v-if="yingyebu">

              <div style="float:right;margin-top:5px" >
                <el-select @change="relTypeChange" v-model="relTypeS" :disabled="enableselectRelShip" placeholder="请选择" class="yh-dialogselect" size="mini">
                <el-option v-for="item in relationShip_custType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
              </div>
              <div style="float:right;margin-top:5px"  class="yh-right">
                <el-select @change="scopeChange" v-model="scopeS"   placeholder="请选择" class="yh-dialogselect" size="mini">
                <el-option v-for="item in items_custType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
              </div>

            </div>
            </div>

            <CustIndex :scopeS="scopeS" :relTypeS="relTypeS" @foucsbul="focusOnSearchInput" ref="custIndexRef" v-on:clickProvinceMap="clickProvinceMap"></CustIndex>
            <!-- 投行 -->
            <div v-if="touhang">
              <InvestmentBank></InvestmentBank>
            </div>
            <!--定向 -->
            <div v-if="jinhui">
              <Directional></Directional>
            </div>
            <!-- 集合 -->
            <div v-if="jinhui">
              <Aggregate></Aggregate>
            </div>
            <!-- 领导 其他-->
            <div v-if="other">
              <div class="yh_index_center_left_ld">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">正式客户</span>
                  </span>
                </div>
                <OfficialCustPie></OfficialCustPie>
              </div>
              <div class="yh_index_center_right_ld">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">客户钱包份额</span>
                  </span>
                </div>
                <WatchChart :indiListData="indiListDataOrg"></WatchChart>
              </div>
            </div>
            <!-- 经管领导 -->
            <div v-if='jingguanzongbu'>
              <div class="yh_index_center_left_ld">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">正式客户</span>
                  </span>
                </div>
                <OfficialCustNew></OfficialCustNew>
              </div>
              <div class="yh_index_center_right_ld">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">客户钱包份额</span>
                  </span>
                </div>
                <WatchChart :indiListData="indiListDataOrg"></WatchChart>
              </div>
            </div>
            <!---营业部-->
            <div v-if="yingyebu" >
              <div class="yh_index_center_left1_yyb" >
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">机构业务目标客户</span>
                  </span>
                </div>
                <Custgrplist :scopeS="scopeS" :relTypeS="relTypeS" ref="custgrplist"></Custgrplist>
              </div>
              <div class="yh_index_center_left2_yyb">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">客户外部资产排名TOP10</span>
                  </span>
                </div>
                <CustFinance :scopeS="scopeS" :relTypeS="relTypeS" ref="custTop10final"></CustFinance>
              </div>
              <div class="yh_index_center_right_yyb">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">客户钱包份额</span>
                  </span>
                </div>
                <WatchChart :indiListData="indiListDataOrg"></WatchChart>
              </div>
            </div>

            <!--产品和知识库-->
            <div>
              <div class="yh_index_bottom_left">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">产品概览</span>
                  </span>
                </div>

                <el-row class="yh_productVerView" style="margin-top:10px;">
                  <el-col :span="8" style="padding:25px 0 30px 0; border-right:dashed 1px #f2f3f5; border-bottom:dashed 1px #f2f3f5; cursor: pointer;">
                    <div @click="linkPage('1')">
                      <img src="~@/assets/selficon/index_zdsfcp.png" />重点首发产品
                      <br>
                      <span class="fundProductV">{{fomartMount(product.NumFundProduct)}}</span>
                    </div>
                  </el-col>
                  <el-col :span="8" style="padding:25px 0 30px 0; border-right:dashed 1px #f2f3f5; border-bottom:dashed 1px #f2f3f5; cursor: pointer;">
                    <div @click="linkPage('2')">
                      <img src="~@/assets/selficon/index_cxyxcp.png" /> 持续营销产品
                      <br>
                      <span class="derivativeProductV">{{fomartMount(product.NumDerivativeProduct)}}</span>
                    </div>
                  </el-col>
                  <el-col :span="8" style="padding:25px 0 30px 0; border-bottom:dashed 1px #f2f3f5; cursor: pointer;">
                    <div @click="linkPage('5')">
                      <img src="~@/assets/selficon/index_dqzdcp.png" /> 重点到期产品
                      <br>
                      <span class="monypropertyV">{{fomartMount(product.NumMonyproperty)}}</span>
                    </div>
                  </el-col>
                </el-row>

                <el-row class="yh_productVerView">
                  <el-col :span="12" style="padding:25px 0 30px 0; border-right:dashed 1px #f2f3f5; cursor: pointer;">
                    <div @click="linkPage('3')">
                      <img src="~@/assets/selficon/index_zdcpxsyg.png" /> 重点产品销售预告
                      <br>
                      <span class="confideProductV">{{fomartMount(product.NumConfideProduct)}}</span>
                    </div>
                  </el-col>
                  <el-col :span="12" style="padding:25px 0 30px 0; cursor: pointer;">
                    <div @click="linkPage('4')">
                      <img src="~@/assets/selficon/index_lccpfxap.png" /> 理财产品与收益凭证
                      <br>
                      <span class="serviceProductV">{{fomartMount(product.NumServiceProduct)}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="yh_index_bottom_right">
                <div class="yh-headerdiv">
                  <span class="yh-headerfl">
                    <span class="yh-font-dsj">知识库</span>
                  </span>
                </div>

                <el-row class="yh_knowledgeBase">
                  <router-link to='/ResourceManage/KnowledgeBaseManagement/KnowledgeBaseQuery?id=01'>
                  <el-col :span="24" class="yh_investmentBankType">
                    {{knowledgeData[0].Num}}
                  </el-col>
                  </router-link>
                </el-row>
                <el-row class="yh_knowledgeBase">
                  <router-link to='/ResourceManage/KnowledgeBaseManagement/KnowledgeBaseQuery?id=02'>
                  <el-col :span="24" class="yh_monyManageType">
                    {{knowledgeData[1].Num}}
                  </el-col>
                  </router-link>
                </el-row>

              </div>
            </div>

          </div>
          <!--背景样式-->
        </div>
      </el-col>

      <el-col :span="7" style="text-align:center;">
        <div class="yh-div-module" style="margin-right:12px; padding:0px;">
          <Calendar></Calendar>
          <NewsListToshow></NewsListToshow>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import NewsListToshow from "./components/NewsListToshow";
import DistributionChars from "./components/DistributionChars";
import WatchChart from "./components/WatchChart";
import OfficialCust from "./components/OfficialCust";
import OfficialCustNew from "./components/OfficialCustNew"
import OfficialCustPie from "./components/OfficialCustPie"
import { hasFuntion } from "@/filters";
import Constants from '@/utils/Constants.js';
import {isJgzb} from "@/utils";

import {
  productCalendarQuery,
  getresourcetypenumlist,
  getIndiListByIndiNos,
  quickSearch
} from "@/api/organization/dashboard/index.js";
import { formatDateTime } from "@/utils/datahandle.js"; //日期格式化
import echarts from "echarts";
import CustFinance from "./components/CustFinance";
import Custgrplist from "./components/Custgrplist";
import InvestmentBank from "./components/InvestmentBank";
import Directional from "./components/Directional";
import Aggregate from "./components/Aggregate";
import Calendar from "./components/Calendar";
import CustIndex from "./components/CustIndex";
import { dictFilter, dictItems,hasMenuItem } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";
import {formatThousands} from "@/utils";
import MENUCODE from "@/utils/menuCode.js";
import FUNCODE from "@/utils/funCode.js";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "dashboard-admin",
  components: {
    LineChart,
    BarChart,
    WatchChart,
    NewsListToshow,
    DistributionChars,
    OfficialCust,
    Custgrplist,
    CustFinance,
    InvestmentBank,
    Directional,
    Aggregate,
    Calendar,
    CustIndex,
    OfficialCustNew,
    OfficialCustPie
  },
  data() {
    return {
      watchCartName: "",
      scopeS: Constants.MYOWNERCUST,
      relTypeS: Constants.DEVRELSHIPALL,
      items_custType: [
      ],

      relationShip_custType: dictItems(DICTYPE.CTCCD0201), //业务类别

      indiListDataOrg: "0", //钱包份额机构
      indiListDataMy: "", //钱包份额我的
      lineChartData: lineChartData.newVisitis,
      cussearch: "",
      province: "",
      jingguanzongbu: false,
      yingyebu: false,
      touhang: false,
      jinhui: false,
      other:false,
      enableselectRelShip:false,//控制是否能够选择开发关系
      //产品数量
      product: {
        NumFundProduct: 0, //重点首发产品
        NumDerivativeProduct: 0, //持续营销产品
        NumMonyproperty: 0, //到期重点产品
        NumConfideProduct: 0, //重点产品销售预告
        NumServiceProduct: 0 //理财产品与收益凭证
      },
      knowledgeData: [
        {
          BuopKnlgCate: "01",
          Num: "0"
        },
        {
          BuopKnlgCate: "02",
          Num: "0"
        }
      ],
      sreachTiem: null
    };
  },
  created() {

    this.inintRelations();//加载团队关系

    //其他情况判断
    if((Number(this.$store.getters.orgid) >= 8000) && this.$store.getters.orgid != "9060" && this.$store.getters.orgid != "8160"
              && this.$store.getters.orgid != "8314" && this.$store.getters.orgid != "8280" && this.$store.getters.orgid != "8316"
              && this.$store.getters.orgid != "8170" && this.$store.getters.orgid != "8312" && this.$store.getters.orgid != "8315"
              && this.$store.getters.orgid != "8313" && this.$store.getters.orgid != "8317" && this.$store.getters.orgid != "8311"
              && this.$store.getters.orgid != "8305" && this.$store.getters.orgid != "8304" && this.$store.getters.orgid != "8306"
              && this.$store.getters.orgid != "8007" && this.$store.getters.orgid != "8140"
    ){

      this.other = true;
      this.jingguanzongbu = false;
      this.scopeS = '3';//客户钱包份额(全部)
      this.scopeChange();

    } else if (Number(this.$store.getters.orgid) < 7000||((Number(this.$store.getters.orgid))>= 7000&&(Number(this.$store.getters.orgid))<8000)) { // 根据不同用户展示不同页面  //营业部

      this.yingyebu = true;
      this.scopeS = '1';//我的
      this.scopeChange();

      let hsfmenu=hasMenuItem(MENUCODE.FORMALCUSTOMERMANAGE);
      if(hsfmenu){
        this.scopeS = '1';//我的
      }else{
        if(this.hasMyFormalFun()){
          this.scopeS = '2';//我的
        }
        if(this.hasMyOrgFun()){//判断是否有正式客户查询  我机构的Tab权限
          this.scopeS = '3';//我的
          this.enableselectRelShip=true;
        }
      }

    }else if(this.$store.getters.orgid == "8140"){//经管总部//当orgid>8000时，触发我机构客户
          this.jingguanzongbu = true;
          this.scopeS = '3';//客户钱包份额(全部)
          this.other = false;

    }else if(this.$store.getters.orgid == "9060"){//金汇
      this.jinhui = true;
      this.scopeS = '3';
      //投行信息
    }else if(this.$store.getters.orgid == "8160" || this.$store.getters.orgid == "8314" || this.$store.getters.orgid == "8280"
           || this.$store.getters.orgid == "8280" || this.$store.getters.orgid == "8316"  || this.$store.getters.orgid == "8170"
           || this.$store.getters.orgid == "8312" || this.$store.getters.orgid == "8315"  || this.$store.getters.orgid == "8313"
           || this.$store.getters.orgid == "8317" || this.$store.getters.orgid == "8311"  || this.$store.getters.orgid == "8305"
           || this.$store.getters.orgid == "8304" || this.$store.getters.orgid == "8306"
    ){
          this.touhang = true;
          this.scopeS = '3';//投行

    }

    this.doInit();




  },
  methods: {

    focusOnSearchInput(){
      this.$refs.searchinput.focus();
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
    hasAllFun(){
      //判断是否有我团队的功能权限
      return hasFuntion(FUNCODE.FUNC_ALL_CUST);
    },

    inintRelations(){

      //判断是否有客户管理-我的正式客户菜单
      let hsfmenu=hasMenuItem(MENUCODE.FORMALCUSTOMERMANAGE);
      if(hsfmenu){
         this.items_custType.push( {
           label: "我的客户",
           value: Constants.MYOWNERCUST
         });
      }

      //判断是否有客户管理-正式客户查询
      let hsfmenud=hasMenuItem(MENUCODE.FORMALCUSTOMERQUERY);
      if(hsfmenud){//判断是否有正式客户查询  我部门Tab权限
        if(this.hasMyFormalFun()){
          this.items_custType.push( {
            label: "我团队客户",
            value: Constants.MYTEAMCUST
          })
        }
        if(this.hasMyOrgFun()){//判断是否有正式客户查询  我机构的Tab权限
          this.items_custType.push({
            label: "我机构客户",
            value: Constants.MYBRANCHCUST
          });
        }
      }
    },
    fomartMount(val){
      return formatThousands(val);
    },

    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    searchCusToCusManager() {
      if (this.cussearch == "") {
        this.$message({
          message: "请输入查询条件！",
          type: "warning"
        });
        return "";
      }


      let hasMy=false;//我的客户信息
      let myteam=false;//我部门的客户信息
      let myorg=false;//我机构的客户信息
      let allcust=false;//全部客户信息
      let scole="01";//我的



      //判断是否有客户管理-我的正式客户菜单
      let hsfmenu=hasMenuItem(MENUCODE.FORMALCUSTOMERMANAGE);
      if(hsfmenu){
        hasMy=true;
      }

      let hsfmenud=hasMenuItem(MENUCODE.FORMALCUSTOMERQUERY);
      if(hsfmenud){//判断是否有正式客户查询  我部门Tab权限
        if(this.hasMyFormalFun()){
          scole="02";
          myteam=true;
        }
        if(this.hasMyOrgFun()){//判断是否有正式客户查询  我机构的Tab权限
          myorg=true;
          scole="03";
        }
        if(this.hasAllFun()){//判断是否有正式客户查询  我机构的Tab权限
          allcust=true;
          scole="04";
        }

      }

      // //跳转到客户列表查询页面
      var query = {
        "param":{
          "searchSrc":scole,
          "searchValue": this.cussearch
        },
        "pageInfo": {
          "pageNum": 1,
          "pageSize": 20
        }
      };

      let _this=this;
      quickSearch(query)
        .then(response => {
          let quesut=response.Data;
          if(quesut.length>0){
            this.$store.dispatch('setQuicksearchlist', quesut);
            if(allcust||myorg||myteam){
              _this.$router.push({name:"FormalCustomerQuery", path: '/CustomerManagement/FormalCustomerManagement/FormalCustomerQuery',params: {fromView: "indx",rand:this.cussearch}});
            }else{
              _this.$router.push({name:"FormalCustomerManage",path: '/CustomerManagement/FormalCustomerManagement/FormalCustomerManage',params: {fromView: "indxmy",rand:this.cussearch}});
            }
          }else{
            this.$message({
              showClose: true,
              message: '未查询到内容!',
              type: 'warning'
            });
          }
        })
        .catch(() => {
          this.$messages.error("查询失败!");
        });
    },

    clickProvinceMap(provinceName) {
      // console.log("主页面收到请求:" + provinceName + "即将改变数据");
      var _self = this;
      var searchAgain = true;
      if (_self.province == provinceName) {
        searchAgain = false;
      }
      if (searchAgain) {
        //根据传过来的省份 再次查找显示的数据信息 查询列表数据信息 ！！！！ (本界面接口1)
      }
    },
    doInit() {
      //加载产品概览模块数据
      this.doInitProductOverView();
      //加载知识库信息
      this.doInitKnowledgeView();
      //初始化经济业务总部数据
      this.doInitJjywzb();
      //如果是首页领导 或 营业部
      //初始化钱包我机构客户机构时速表
      this.doInitIndiList();
    },
    doInitProductOverView() {
      var query = {};
      //产品数量处理
      productCalendarQuery(query)
        .then(response => {
          if (null != response.Data) {
            var productData = response.Data;
            if (productData.length > 0) {
              for (var i = 0; i < productData.length; ++i) {
                switch (productData[i].LblCode) {
                  case "ZDSFCP":
                    this.product.NumFundProduct = productData[i].PrdQty;
                    continue;
                  case "ZDCXYXCP":
                    this.product.NumDerivativeProduct = productData[i].PrdQty;
                    continue;
                  case "LCCPFXAP":
                    this.product.NumServiceProduct = productData[i].PrdQty;
                    continue;
                  case "ZDCPXSYG":
                    this.product.NumConfideProduct = productData[i].PrdQty;
                    continue;
                  case "DQZDCP":
                    this.product.NumMonyproperty = productData[i].PrdQty;
                    continue;
                }
              }
            }
          }
        })
        .catch(() => {
          this.$message.error("访问错误！");
        });
    },
    doInitKnowledgeView() {
      var query = {
        param: {
          ResourceCate: "02"
        }
      };
      getresourcetypenumlist(query)
        .then(response => {
          if (response.Data.length == 1) {
            if (response.Data[0].BuopKnlgCate == "01") {
              this.knowledgeData[0].Num = response.Data[0].Num;
            }
            if (response.Data[0].BuopKnlgCate == "02") {
              this.knowledgeData[1].Num = response.Data[0].Num;
            }
          }
          if (response.Data.length == 2) {
            this.knowledgeData[0].Num = response.Data[0].Num;
            this.knowledgeData[1].Num = response.Data[1].Num;
          }
        })
        .catch(() => {
          this.$messages.error("访问出错");
        });
    },
    //初始化经济业务总部数据·
    doInitJjywzb() {},
    //加载钱包数据
    doInitIndiList() {
      let queryData = {
      };

      if(this.other){//通用页面 钱包份额数加载所有
         queryData = {
          param: {
            scope: "9",
            indiNos: [Constants.QBFEINDEX],
            relType: this.relTypeS

          }
        };
      }else{
         queryData = {
          param: {
            scope: this.scopeS,
            indiNos: [Constants.QBFEINDEX],
            relType: this.relTypeS
          }
        };
      }
      getIndiListByIndiNos(queryData)
        .then(response => {
          // if (3 == "scopeType") {
          //   //机构
          //   this.watchCartName = "我机构客户";
          // } else if (2 == "scopeType") {
          //   //我团队的
          //   this.watchCartName = "我团队的";
          // } else if (1 == "scopeType") {
          //   //我的客户
          //   this.watchCartName = "我的客户";
          // }
            if(response.Data.length>0){
              this.indiListDataOrg =(response.Data[0].PrsntVal*100).toFixed(2);
            }else{
              this.indiListDataOrg="0";
            }

        })
        .catch(() => {
          this.$message.error("访问错误！");
        });
    },
    //下拉框选项 改动变化
    scopeChange() {
      //console.info(this.scopeS);
      if(this.scopeS==Constants.MYBRANCHCUST){//当选择我机构的客户 客户关系 赋值所有
        this.relTypeS=Constants.DEVRELSHIPALL;
        this.enableselectRelShip=true;
      }else{
        this.enableselectRelShip=false;
      }
      let _this=this;
      setTimeout(function(){
        //加载客户指标数据
        if(_this.$refs.custIndexRef) {
          _this.$refs.custIndexRef.reCaculateCustTotal();
        }
        //加载钱包份额
        _this.doInitIndiList();
        //重新加载客户信息
        if(_this.$refs.custgrplist){
          _this.$refs.custgrplist.reloadCustInfo();
        }
        //重新加载外部资产top10
        if(_this.$refs.custTop10final) {
          _this.$refs.custTop10final.reloadCustInfo();
        }
      },50);



    },
    relTypeChange() {
      let _this=this;
      setTimeout(function(){
        //加载客户指标数据
        if(_this.$refs.custIndexRef) {
          _this.$refs.custIndexRef.reCaculateCustTotal();
        }
        //加载钱包份额
        _this.doInitIndiList();
        //重新加载客户信息
        if(_this.$refs.custgrplist){
          _this.$refs.custgrplist.reloadCustInfo();
        }
        //重新加载外部资产top10
        if(_this.$refs.custTop10final) {
          _this.$refs.custTop10final.reloadCustInfo();
        }

      },50);
    },

    /**
     * 根据id跳转产品列表
     */
    linkPage(pageId = '1') {
      let timeSreach = this.getTime();
      this.$router.push({name: 'ImportantProductSell', query: {id:pageId}})
    },

    /**
     * 获取时间
     */
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m =(m <10 ? "0"+ m :m);
      let d = date.getDate();
      return parseFloat(y + m + d);
    }
  }
};
//  background-color: rgb(240, 242, 245);
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh-right {
  margin-right: 20px;
}
.yh-headerdiv {
  height: 40px;
  border-bottom: 1px solid #eeeee9;
  // margin-bottom:10px;
}

.yh-headerfl {
  float: left;
  // width: 180px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #cb6c2f;
}

/* 地图展示区域设置*/

.distributionchars-showmap {
  margin-bottom: 15px;
}

/*模块背景图div css设置*/

.index-show-background-style {
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 5px;
  background-color: aliceblue;
}

.dashboard-editor-container {
  padding: 0px;
  min-width:1220px;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.yh-div-module {
  padding: 20px;
  padding-top: 0;
  background-color: #fff;
  border-radius: 3px;
  /*//overflow: hidden;*/
  color: #303133;
  margin-top:0px;
  margin-left: 12px;
  margin-bottom:12px;
  border: 1px #ebeef5 solid;
  font-size: 12px;
  background: #fff;
  padding-bottom:6px;
}

.yh_index_center_left_ld {
  float: left;
  width: 70%;
  height: 370px;
}

.yh_index_center_right_ld {
  float: right;
  width: 29%;
}

.yh_index_center_left1_yyb {
  float: left;
  width: 47%;
  margin-right: 10px;
}

.yh_index_center_left2_yyb {
  float: left;
  width: 25%;
}
.yh_index_center_right_yyb {
  float: right;
  width: 25%;
}

.yh_index_bottom_left {
  float: left;
  width: 49%;
  margin-right: 6px;
}

.yh_index_bottom_right {
  float: right;
  width: 50%;
}

.yh_productVerView {
  height: 102px;
  font-size: 14px;
}

.yh_productVerView span {
  font-size: 17px;
  display: inline-block;
  padding-top: 10px;
  font-weight: 800;
}

/* //产品概览字体颜色 */
.fundProductV {
  color: #37c993;
}

.derivativeProductV {
  color: #fb9146;
}

.monypropertyV {
  color: #8830b0;
}

.confideProductV {
  color: #44abff;
}

.serviceProductV {
  color: #af6e20;
}

.otherProductV {
  color: #ca7a3a;
}

.yh_knowledgeBase {
  height: 102px;
  padding-top: 15px;
  font-size: 15px;
}

.yh_knowledgeBase div {
  height: 100%;
  padding-top: 22px;
  font-size: 18px;
  padding-left: 45%;
}

.yh_investmentBankType {
  background: url("~@/assets/selficon/index_investmentBankType.png") no-repeat
    60% 5px;
}

.yh_monyManageType {
  background: url("~@/assets/selficon/index_monyManageType.png") no-repeat 60%
    5px;
}
/*ouxinsu*/
.input-with-select{width:61.8%;margin-top:15px; margin-bottom:10px;}
</style>
