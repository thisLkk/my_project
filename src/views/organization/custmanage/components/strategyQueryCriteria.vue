<template>
  <div class="yh-formalcustomermanage-querycriteria">
    <!-- 我的正式客户 查询组件（正在使用） -->
    <el-form :model="form_data" ref="form_data" label-width="170px">
      <el-row>
        <el-col :span="24">
          <div class="yh-headerdiv">
            <span class="yh-headerfl">
              <span class="yh-font">查询条件</span>
            </span>
            <span class="yh-headerfr">
              <div id="yh-advanced" @click="allQueryCriteriaClick()">
                <i :class="allQueryCriteriaIcon"></i>
              </div>
            </span>
          </div>
        </el-col>
      </el-row>
      <div id="querycriteria" v-show="allQuery">
        <el-row>
          <div class="yh-manage-fastsearch">
            <el-col :span="8">
              <el-form-item label="快速搜索:" prop="customerType" class="combo-col">
                <el-select placeholder="请选择" v-model="form_data.customerType" size="mini">
                  <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in customerTypeList" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="10px" prop="word">
                <el-input   :placeholder="placeholderSearch" v-model="form_data.word" size="mini"  />
              </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-button id="el_search"  size="mini" @click="fastSearch_()" >快速搜索</el-button>
            </el-col>
            <!-- <el-col v-show="false" :span="6">
              <el-button id="accurate" size="mini" @click="accurate()">精确</el-button>
              <el-button id="vague" size="mini" @click="vague()">模糊</el-button>
            </el-col> -->
          </div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称:" prop="CustomerName" size="mini">
              <el-input placeholder="模糊搜索" v-model="form_data.CustomerName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="行业:" prop="industryCode">
              <el-select placeholder="请选择" v-model="form_data.industryCode" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in industryCodeList" />
              </el-select>
            </el-form-item>
          </el-col>
           <el-col v-if="StaffInquiry" :span="8">
              <el-form-item label="客户经理:" prop="StaffInquiry" size="mini">
                  <inputButtonCE @onChooseUser="onChooseUser"/>
              </el-form-item>
            </el-col>
            <el-col v-if="OrgChooseAll" :span="8">
              <el-form-item label="机构:" prop="OrgChooseAll" size="mini">
                <OrgChoose selectType="redio" :businessName ="orgidName" dataInitType="allOrg" @onOrgSure="onOrgSure"></OrgChoose>
              </el-form-item>
            </el-col>
            <el-col v-if="OrgChooseUser" :span="8">
              <el-form-item label="机构:" prop="OrgChooseUser" size="mini">
                <OrgChoose selectType="redio" :businessName ="orgidName"  @onOrgSure="onOrgSure"></OrgChoose>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户类型:" prop="individualFlag">
              <el-checkbox-group @change="checkChange(form_data.individualFlag , '客户类型')" v-model="form_data.individualFlag" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in individualFlagList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="上市公司:" prop="var4">
              <el-checkbox v-model="ListedCompanyState" @change="ListedCompanyChange()"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证券代码:" prop="stkCode" size="mini">
              <el-input :disabled="!ListedCompanyState" placeholder="请输入证券代码" v-model="form_data.stkCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证券简称:" prop="secAbbr" size="mini">
              <el-input :disabled="!ListedCompanyState" placeholder="请输入证券简称" v-model="form_data.secAbbr" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="false">
          <el-col :span="24">
            <el-form-item label="客户级别大类:" prop="CustomerLevelZindex">
              <el-checkbox-group @change="checkChange(form_data.CustomerLevelZindex)" v-model="form_data.CustomerLevelZindex" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in CustomerLevelZindexList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="false">
          <el-col :span="24">
            <el-form-item label="客户级别:" prop="CustomerLevel">
              <el-checkbox-group @change="checkChange(form_data.CustomerLevel)" v-model="form_data.CustomerLevel" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in CustomerLevelList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户状态:" prop="CustomerStatus">
              <el-checkbox-group @change="checkChange(form_data.CustomerStatus , 'CustomerStatus')" v-model="form_data.CustomerStatus" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in CustomerStatusList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="风险等级:" prop="RiskGrade">
              <el-checkbox-group @change="checkChange(form_data.RiskGrade , 'RiskGrade')" v-model="form_data.RiskGrade" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in RiskGradeList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="条线标签:" prop="personalLabel">
              <el-checkbox-group @change="checkChange(form_data.personalLabel , 'personalLabel')" v-model="form_data.personalLabel" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in personalLabelList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务标签:" prop="businessLabel">
              <el-checkbox-group @change="checkChange(form_data.businessLabel , 'businessLabel')" v-model="form_data.businessLabel" size="mini">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in businessLabelList">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="yh-buttondiv">   
              <div class="yh-buttons">
                <el-button id="el_query" size="mini" @click="FormalQuery()">查询</el-button>
                <el-button v-show="false" id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button>
              </div>
              <div v-if="false" class="yh-fold-noactive" @click="seniorQueryCriteriaClick()">
                  <i :class="seniorQueryCriteriaIcon"></i>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="morequery" v-show="seniorQuery">
          <!-- this.$store.getters.userstatus -->
          <BrokerTab v-if="this.$store.getters.userstatus == '01'" ref="brokerTab" @formList="formList"></BrokerTab>
          <InvestmentBankTab v-if="this.$store.getters.userstatus == '02'" ref="brokerTab" @formList="formList"></InvestmentBankTab>
          <BondTab v-if="this.$store.getters.userstatus == '03'" ref="brokerTab" @formList="formList"></BondTab>
          <ProductTab v-if="this.$store.getters.userstatus == '04'" ref="brokerTab" @formList="formList"></ProductTab>
          <InsuranceTab v-if="this.$store.getters.userstatus == '05'" ref="brokerTab" @formList="formList"></InsuranceTab>
          <ResearchInstituteTab v-if="this.$store.getters.userstatus == '06'" ref="brokerTab" @formList="formList"></ResearchInstituteTab>
          <JinhuiTab v-if="this.$store.getters.userstatus == '07'" ref="brokerTab" @formList="formList"></JinhuiTab>
          <DerivativeTab v-if="this.$store.getters.userstatus == '08'" ref="brokerTab" @formList="formList"></DerivativeTab>
          <GoldcardTab v-if="this.$store.getters.userstatus == '09'" ref="brokerTab" @formList="formList"></GoldcardTab>
          <futures-tab v-if="this.$store.getters.userstatus == '10'" ref="brokerTab" @formList="formList"></futures-tab>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost } from "@/utils/request";
import request from "@/utils/request";
import { checkAllChange } from "@/utils/datahandle.js"; //-------------------------多选框的方法
import { dictItems, dictFilter } from "@/filters"; //------------------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-------------------------------------数据字典的方法
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee.vue";
import OrgChoose from "@/views/organization/components/OrgChoose.vue";
import {
  BondTab, //--------------债券
  BrokerTab, //------------经纪
  DerivativeTab, //--------衍生物
  FuturesTab, //-----------期货
  GoldcardTab, //----------证金
  InsuranceTab, //---------保险
  InvestmentBankTab, //----投行
  JinhuiTab, //------------金汇
  ProductTab, //-----------产品
  ResearchInstituteTab //--研究院
} from "./index.js";
export default {
  name: "strategyQueryCriteria",
  props: {
    queryName: {
      type: String
    }
  },
  components: {
    BondTab,
    BrokerTab,
    DerivativeTab,
    FuturesTab,
    GoldcardTab,
    InsuranceTab,
    InvestmentBankTab,
    JinhuiTab,
    ProductTab,
    ResearchInstituteTab,
    inputButtonCE,
    OrgChoose
  },
  data() {
    return {
      seniorQueryCriteriaIcon: "fa fa-angle-double-up", //---展示隐藏二级筛选功能
      allQueryCriteriaIcon: "fa fa-angle-double-up", //------展示隐藏一级筛选功能
      seniorQueryCriteria: false, //------高级查询条件的开关控制
      seniorQuery: false, //--------------高级查询条件的开关控制
      allQueryCriteria: true, //----------基础与高级查询条件的开关控制
      allQuery: true, //------------------基础与高级查询条件的开关控制
      ListedCompanyState: false, //-------上市公司的判断按钮
      advSearchTypeFlag: false, //--------监听是否启用高级查询
      seniorParameter: null, //-----------高级查询请求参数（临时中转变量）
      nowQueryName: "", //----------------监听哪个组件在调用
      StaffInquiry: false, //-------------客户经理（我团队查询为true）
      OrgChooseAll: false, //-------------机构（全部查询为true）
      OrgChooseUser: false, //------------机构（我机构查询为true）
      searchSrc: null, //-----------------组件的调用的来源（提交申请用）
      strategyCustFlag: null, //----------组件的调用的来源（战略客户或正式客户）
      placeholderSearch: "请输入查询内容", //查询内容不能为空
      orgidName: "", //-------------------机构id回显汉字
      form_data: {
        customerType: "01", //------------快速搜索
        word: "", //----------------------快速搜索要匹配的字符
        StaffInquiry: null, //------------客户经理
        orgId: null, //-------------------机构号
        searchType: "0", //---------------精确或者模糊（暂无使用）
        CustomerName: "", //--------------客户名称
        industryCode: "", //--------------行业
        stkCode: "", //-------------------证券代码
        secAbbr: "", //-------------------证券简称
        listProp: "", //------------------是否上市
        individualFlag: [""], //----------客户类型
        CustomerLevelZindex: [""], //-----客户级别（大类）
        CustomerLevel: [""], //-----------客户级别
        CustomerStatus: [""], //----------客户状态
        RiskGrade: [""], //---------------风险等级
        personalLabel: [""], //-----------条线标签
        businessLabel: [""] //------------业务标签
      },
      industryCodeList: dictItems(DICTYPE.EDW20504), //----------行业代码
      // individualFlagList: dictItems(DICTYPE.EDW10015), //--------客户类型
      CustomerLevelZindexList: dictItems(DICTYPE.EDW20567), //---客户级别（大类）
      CustomerLevelList: dictItems(DICTYPE.EDW20563), //---------客户级别
      CustomerStatusList: dictItems(DICTYPE.EDW10030), //--------客户状态
      RiskGradeList: dictItems(DICTYPE.EDW20577), //-------------风险等级
      //---------------------------------------------------------业务标签
      businessLabelList: [
        {
          value: "01",
          label: "创业"
        },
        {
          value: "02",
          label: "沪港通"
        },
        {
          value: "03",
          label: "深港通"
        },
        {
          value: "04",
          label: "新三板"
        },
        {
          value: "05",
          label: "金大宗"
        },
        {
          value: "06",
          label: "场外期权"
        },
        {
          value: "07",
          label: "收益互换"
        },
        {
          value: "08",
          label: "买入转售"
        },
        {
          value: "09",
          label: "PB"
        },
        {
          value: "10",
          label: "融资融券"
        },
        {
          value: "11",
          label: "股票质押"
        },
        {
          value: "12",
          label: "基金研究"
        },
        {
          value: "13",
          label: "天天利"
        }
      ],
      //---------------------------------------------------------条线标签
      personalLabelList: [
        {
          value: "01",
          label: "经纪"
        },
        {
          value: "02",
          label: "资管"
        },
        {
          value: "03",
          label: "投行"
        },
        {
          value: "04",
          label: "自营"
        }
      ],
      //---------------------------------------------------------快速搜索
      customerTypeList: [
        {
          value: "客户号",
          key: "01"
        },
        {
          value: "证件号",
          key: "02"
        },
        {
          value: "手机号",
          key: "03"
        },
        {
          value: "股东账户",
          key: "04"
        },
        {
          value: "资金账号",
          key: "05"
        }
      ],
      //------------------------------------------------------------客户类型（临时）
      individualFlagList: [
        {
          value: "0",
          label: "个人"
        },
        {
          value: "1",
          label: "机构"
        },
        {
          value: "2",
          label: "产品"
        }
      ]
    };
  },
  created() {
    this.nowQueryName = this.queryName;
    this.orgidName = dictFilter(DICTYPE.CTCCD0998, this.$store.getters.orgid); //---机构id回显为汉字显示在机构
    //console.log(this.orgidName);
    // --------------------------------------------------------------监听是哪个组件在调动
    switch (this.queryName) {
      case "我的正式":
        this.searchSrc = "01";
        this.strategyCustFlag = "1";
        break;
      case "departmentQuery":
        this.StaffInquiry = true;
        this.searchSrc = "02";
        this.strategyCustFlag = "1";
        break;
      case "organizationQuery":
        this.OrgChooseUser = true;
        this.searchSrc = "03";
        this.strategyCustFlag = "1";
        break;
      case "allQuery":
        this.OrgChooseAll = true;
        this.searchSrc = "04";
        this.strategyCustFlag = "1";
        break;

      default:
        break;
    }
    // -------------------------------------------------------------判断高级查询组件展开
  },
  methods: {
    //---------------------------------------------------------------高级查询（收缩）
    seniorQueryCriteriaClick() {
      if (this.seniorQueryCriteria) {
        this.seniorQueryCriteriaIcon = "fa fa-angle-double-up ";
        this.seniorQueryCriteria = false;
        this.seniorQuery = false;
        this.advSearchTypeFlag = false;
        return;
      } else {
        this.seniorQueryCriteriaIcon = "fa fa-angle-double-down";
        this.seniorQueryCriteria = true;
        this.seniorQuery = true;
        this.advSearchTypeFlag = true;
      }
    },
    //---------------------------------------------------------------基础与高级查询Icon（收缩）
    allQueryCriteriaClick() {
      if (this.allQueryCriteria) {
        this.allQueryCriteriaIcon = "fa fa-angle-double-down";
        this.allQueryCriteria = false;
        this.allQuery = false;
        return;
      } else {
        this.allQueryCriteriaIcon = "fa fa-angle-double-up";
        this.allQueryCriteria = true;
        this.allQuery = true;
      }
    },
    //---------------------------------------------------------------模糊查询（暂无调用）
    vague() {
      this.searchType = "0";
    },
    //---------------------------------------------------------------精确查询（暂无调用）
    accurate() {
      this.searchType = "1";
    },
    // --------------------------------------------------------------客户经理选择
    onChooseUser(val) {
      this.form_data.StaffInquiry = val;
    },
    // --------------------------------------------------------------机构查询
    onOrgSure(val) {
      this.form_data.orgId = val.toString();
    },
    // --------------------------------------------------------------正式客户与客户查询切换时候调用刺激组件（快速搜索）
    fastSearch_() {
      if (this.form_data.word == "") {
        this.placeholderSearch = "查询内容不能为空";
      } else {
        var data = {
          param: {
            searchSrc: this.searchSrc,
            strategyCustFlag: this.strategyCustFlag,
            searchKey: this.form_data.customerType,
            searchValue: this.form_data.word
          }
        };
        this.$emit("fastSearch", data);
      }
    },
    //---------------------------------------------------------------基础查询按钮(向父组件发送请求参数)
    FormalQuery() {
      // alert(this.nowQueryName);
      if (this.advSearchTypeFlag == true) {
        // alert("########正式客户高级查询");
        this.$refs.brokerTab.uploadValue();
      } else {
        // alert("########正式客户基础查询");
        var param = {
          queryName: this.nowQueryName,
          searchSrc: this.searchSrc,
          custFullName: this.form_data.CustomerName,
          strategyCustFlag: this.strategyCustFlag,
          individualFlag: this.form_data.individualFlag.toString(),
          // custLvlCatalog: this.form_data.CustomerLevelZindex.toString(),
          // custLvl: this.form_data.CustomerLevel.toString(),
          custSts: this.form_data.CustomerStatus.toString(),
          riskLvl: this.form_data.RiskGrade.toString(),
          lineLable: this.form_data.personalLabel.toString(),
          custLblRightChar: this.form_data.businessLabel.toString(),
          custStkCodeVO: {
            stkCode: this.form_data.stkCode,
            secAbbr: this.form_data.secAbbr
          },
          custOrgVO: {
            listProp: this.form_data.listProp,
            industryType: this.form_data.industryCode
          }
        };
        if (this.form_data.orgId != null) {
          param.orgNo = this.form_data.orgId;
        }
        this.$emit("querylist", param);
      }
    },
    //---------------------------------------------------------------重置按钮（清空所有查询条件）
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.brokerTab.resetForm("value"); //--------------------可以向子组件传值
    },
    //---------------------------------------------------------------高级查询会激活方法（获取高级查询请求参数）
    formList(data) {
      this.seniorParameter = data; //--------------------------------高级字段赋值
      this.seniorQueryList();
    },
    //---------------------------------------------------------------高级查询请求命令
    seniorQueryList() {
      var param = {
        queryName: this.nowQueryName,
        searchSrc: this.searchSrc,
        custFullName: this.form_data.CustomerName,
        strategyCustFlag: this.strategyCustFlag,
        individualFlag: this.form_data.individualFlag.toString(),
        // custLvlCatalog: this.form_data.CustomerLevelZindex.toString(),
        // custLvl: this.form_data.CustomerLevel.toString(),
        custSts: this.form_data.CustomerStatus.toString(),
        riskLvl: this.form_data.RiskGrade.toString(),
        lineLable: this.form_data.personalLabel.toString(),
        custLblRightChar: this.form_data.businessLabel.toString(),
        custStkCodeVO: {
          stkCode: this.form_data.stkCode,
          secAbbr: this.form_data.secAbbr
        },
        custOrgVO: {
          listProp: this.form_data.listProp,
          industryType: this.form_data.industryCode
        }
      };
      var data = Object.assign(param, this.seniorParameter);
      this.$emit("seniorquerylist", data);
    },
    //-----------------------------------------------------------------监听上市公司属性
    ListedCompanyChange() {
      if (this.ListedCompanyState == true) {
        this.form_data.listProp = "1";
      } else {
        this.form_data.listProp = "";
      }
    },
    //-----------------------------------------------------------------监听多选框的变化
    checkChange(val, name) {
      switch (name) {
        case "客户类型":
          if (val.length == 0) {
            this.form_data.individualFlag = [""];
          }
          break;
        case "CustomerStatus":
          if (val.length == 0) {
            this.form_data.CustomerStatus = [""];
          }
          break;
        case "RiskGrade":
          if (val.length == 0) {
            this.form_data.RiskGrade = [""];
          }
          break;
        case "personalLabel":
          if (val.length == 0) {
            this.form_data.personalLabel = [""];
          }
          break;
        case "businessLabel":
          if (val.length == 0) {
            this.form_data.businessLabel = [""];
          }
          break;

        default:
          break;
      }
      checkAllChange(val);
      //---------------------------------------------------------------监听客户类型的属性是否是个人
      if (name == "客户类型") {
        if (
          this.form_data.individualFlag.length == 1 &&
          this.form_data.individualFlag[0] == "0"
        ) {
          this.form_data.industryCode = "";
          this.ListedCompanyState = false;
          this.form_data.stkCode = "";
          this.form_data.secAbbr = "";
        }
      }
    },
    PublicQueryComponentsClose() {}
  },
  mounted: function() {}
};
</script>

<style scoped>
.yh-formalcustomermanage-querycriteria {
  box-sizing: border-box;
  background: #fff;
  border:#ebeef5 solid 1px;
  padding:0 20px;
  border-radius:4px;
  padding-bottom:10px;
  margin-bottom:10px;
}

.yh-headerdiv {
  height: 40px;
  border-bottom: 1px solid #eeeee9;
}

.yh-headerfl {
  float: left;
  width: 70px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #cb6c2f;
}

.yh-headerfr {
  float: right;
  text-align:right;
  font-size:18px;
  height: 40px;
  width: 30px;
  line-height: 40px;
}

#yh-advanced {
  padding-left: 7px;
  cursor: pointer;
  box-sizing: border-box;
}

.yh-manage-fastsearch {
  height: 40px;
  /* line-height: 69px; */
  margin: 10px 0;
  border-bottom:1px dashed #eee;
}

.yh-query {
  float: left;
  width: 60px;
  height: 30px;
  line-height: 30px;
  background-color: #cc6d30;
  text-align: center;
  margin: 0 7px;
  border-radius: 3px;
  color: #ffffff;
}

.yh-query:nth-child(3) {
  background: #dbdad3;
}

.yh-reset {
  width: 60px;
  height: 27px;
  line-height: 15px;
  background-color: #ada9a1;
}

.yh-fold-noactive {
  float: right;
  height: 24px;
  width: 24px;
  line-height: 24px;
  padding-left: 7px;
  background:#e8e8e8;
  margin-right:5px;
  cursor:pointer;
}

.yh-buttondiv {
  height: 35px;
}

.yh-buttons {
  float: right;
  overflow: hidden;
}

.yh_savebutton_show {
  background-color: #cc6d30;
  height: 24px;
  width: 5%;
  border-radius: 1px;
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: bold;
}

.yh_savebutton_hide {
  background-color: #ada9a1;
  height: 24px;
  width: 5%;
  border-radius: 1px;
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: bold;
}

.morequery {
  margin: 10px 0;
  border-top:dashed 1px #eee;
  padding-top:10px;
}
#querycriteria label{
  font-size:12px;
  font-family:"微软雅黑";
  color:red;
}
</style>
