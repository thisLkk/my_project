<template>
  <div class="yh-formalcustomermanage-querycriteria">
    <!-- 正式客户查询 首页 -->
    <el-form :model="form_data" ref="form_data" label-width="170px">
      <el-row>
        <el-col :span="24">
          <div class="yh-headerdiv">
            <span class="yh-headerfl">
              <span class="yh-font">查询条件</span>
            </span>
            <span class="yh-headerfr">
              <div id="yh-advanced" @click="ShowAndHide()">
                <i :class="icon_"></i>
              </div>
            </span>
          </div>
        </el-col>
      </el-row>
      <div id="querycriteria" v-show="showquerydiv">
        <el-row>
          <div class="yh-manage-fastsearch">
            <el-col :span="8">
              <el-form-item label="快速搜索2:" prop="customerType" class="combo-col">
                <el-select placeholder="请选择" v-model="form_data.customerType" size="mini" id="yh-manageinput">
                  <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in customerTypeList" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="10px" prop="word">
                <el-input placeholder="" v-model="form_data.word" size="mini" id="yh-manageinput" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button id="accurate" size="mini" @click="accurate()">精确</el-button>
              <el-button id="vague" size="mini" @click="vague()">模糊</el-button>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="90px" label="客户经理：" prop="manager">
                <el-input placeholder="请输入客户经理名称" v-model="form_data.manager" size="mini" id="yh-manageinput" />
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="行业:" prop="industryCode">
              <el-select placeholder="请选择" v-model="form_data.industryCode" size="mini">
                <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in industryCodeList" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户类型:" prop="individualFlag">
               <el-checkbox-group v-model="form_data.individualFlag" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,0)" v-for="item in individualFlagList">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构类型:" prop="corpNature">
                <el-checkbox-group v-model="form_data.corpNature" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in corpNatureList">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <el-form-item label="上市公司:" prop="checked">
                <el-checkbox v-model="checked" @change="listProp()"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证券代码:" prop="stkCode" size="mini">
                <el-input :disabled="!checked" placeholder="代码编号" v-model="form_data.stkCode" />
              </el-form-item>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="个人高净值:" prop="netWorth">
              <el-checkbox-group v-model="form_data.netWorth" size="mini">
                <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in netWorthList">{{item.value}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="条线标签:" prop="personalLabel">
              <el-checkbox-group v-model="form_data.personalLabel" size="mini">
                <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in personalLabelList">{{item.value}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务标签:" prop="businessLabel">
              <el-checkbox-group v-model="form_data.businessLabel" size="mini">
                <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,4)" v-for="item in businessLabelList">{{item.value}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="yh-buttondiv">
              <div class="yh-buttons">
                <el-button id="el_query" size="mini" @click="query()">查询2</el-button>
                <el-button id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button>
                <div class="yh-fold-noactive" @click="ShowAndHideTabs()">
                  <i :class="icon"></i>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="morequery" v-show="showquerytabdiv">
          <!-- <InvestmentBankTab ref="brokerTab" @formList = "formList"></InvestmentBankTab> -->
          <!-- <BrokerTab ref="brokerTab" @formList="formList"></BrokerTab> -->
          <BondTab ref="brokerTab" @formList = "formList"></BondTab>
          <!-- <ProductTab ref="brokerTab" @formList = "formList"></ProductTab> -->
          <!-- <InsuranceTab ref="brokerTab" @formList = "formList"></InsuranceTab> -->
          <!-- <ResearchInstituteTab ref="brokerTab" @formList = "formList"></ResearchInstituteTab> -->
          <!-- <JinhuiTab ref="brokerTab" @formList = "formList"></JinhuiTab> -->
          <!-- <DerivativeTab ref="brokerTab" @formList = "formList"></DerivativeTab> -->
          <!-- <GoldcardTab ref="brokerTab" @formList = "formList"></GoldcardTab> -->
          <!-- <futures-tab ref="brokerTab" @formList = "formList"></futures-tab> -->
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost } from "@/utils/request";
import request from "@/utils/request";
import {
  BondTab, //债券
  BrokerTab, //经纪
  DerivativeTab, //衍生物
  FuturesTab, //期货
  GoldcardTab, //证金
  InsuranceTab, //保险
  InvestmentBankTab, //投行
  JinhuiTab, //金汇
  ProductTab, //产品
  ResearchInstituteTab //研究院
} from "./index.js";
export default {
  name: "QueryCriterias",
  props: {
    list: {
      type: Object
    },
    name: {
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
    ResearchInstituteTab
  },
  data() {
    return {
      checked: false, //上市公司的判断按钮
      advSearchTypeFlag: true, //监听是否启用高级查询
      icon: "fa fa-angle-double-up", //展示隐藏二级筛选功能
      show_: true, //展示隐藏二级筛选功能
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      show__: true, //展示隐藏二级筛选功能
      showquerydiv: true, //控制查询条件div是否显示
      showquerytabdiv: true, //控制查询条件切换的Tabdiv是否显示
      check: true, //控制button改变显示颜色
      form_data: {
        customerType: "custNo", //快速搜索
        manager: "", //客户经理
        word: "", //快速搜索要匹配的字符
        searchType: "0", //精确或者模糊
        industryCode: "", //行业
        individualFlag: ["012"], //客户类型
        corpNature: [""], //机构类型
        listProp: "", //是否上市
        stkCode: "", //证券代码
        netWorth: [""], //个人高净值
        personalLabel: [""], //条件标签
        businessLabel: [""] //业务标签
      },
      senior: null,
      industryCodeList: [
        //行业
        {
          value: "农、林、木、渔业",
          key: "1"
        },
        {
          value: "采矿业",
          key: "2"
        },
        {
          value: "建筑业",
          key: "3"
        }
      ],
      customerTypeList: [
        //快速搜索
        {
          value: "客户号",
          key: "custNo"
        },
        {
          value: "客户名称",
          key: "custFullName"
        },
        {
          value: "证件号码",
          key: "idNo"
        },
        {
          value: "手机号",
          key: "mob"
        },
        {
          value: "股东账户",
          key: "shareholderAccount"
        },
        {
          value: "资金账号",
          key: "fundAccount"
        },
        {
          value: "证件简称",
          key: "stkName"
        }
      ],
      individualFlagList: [
        //客户机构类型
        {
          value: "不限",
          key: "012"
        },
        {
          value: "个人",
          key: "0"
        },
        {
          value: "机构",
          key: "1"
        },
        {
          value: "产品",
          key: "2"
        }
      ],
      corpNatureList: [
        //机构类型
        {
          value: "不限",
          key: ""
        },
        {
          value: "政府机构",
          key: "1"
        },
        {
          value: "金融机构",
          key: "2"
        },
        {
          value: "商业企业",
          key: "3"
        },
        {
          value: "非营利性组织",
          key: "4"
        }
      ],
      netWorthList: [
        //个人高净值
        {
          value: "不限",
          key: ""
        },
        {
          value: "上市公司控股股东",
          key: "1"
        },
        {
          value: "上市公司前十大股东",
          key: "2"
        },
        {
          value: "其他",
          key: "3"
        }
      ],
      personalLabelList: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "经纪",
          key: "01"
        },
        {
          value: "资管",
          key: "02"
        },
        {
          value: "投行",
          key: "03"
        },
        {
          value: "自营",
          key: "04"
        }
      ],
      businessLabelList: [
        //业务标签
        {
          value: "不限",
          key: ""
        },
        {
          value: "创业板 ",
          key: "01"
        },
        {
          value: "B股",
          key: "02"
        },
        {
          value: "沪港通 ",
          key: "03"
        },
        {
          value: "深港通 ",
          key: "04"
        },
        {
          value: "新三板 ",
          key: "05"
        },
        {
          value: "金大宗 ",
          key: "06"
        },
        {
          value: "场外期权 ",
          key: "07"
        },
        {
          value: "收益互换 ",
          key: "08"
        },
        {
          value: "买入转售 ",
          key: "09"
        },
        {
          value: "PB ",
          key: "10"
        },
        {
          value: "托管 ",
          key: "11"
        },
        {
          value: "融资融券 ",
          key: "12"
        },
        {
          value: "股票质押",
          key: "13"
        },
        {
          value: "天天利",
          key: "14"
        }
      ]
    };
  },
  methods: {
    ShowAndHideTabs() {
      if (this.show_) {
        this.icon = "fa fa-angle-double-down";
        this.show_ = false;
        this.showquerytabdiv = false;
        this.advSearchTypeFlag = false;
        return;
      } else {
        this.icon = "fa fa-angle-double-up";
        this.show_ = true;
        this.showquerytabdiv = true;
        this.advSearchTypeFlag = true;
      }
    },
    ShowAndHide() {
      if (this.show__) {
        this.icon_ = "fa fa-angle-double-down";
        this.show__ = false;
        this.showquerydiv = false;
        return;
      } else {
        this.icon_ = "fa fa-angle-double-up";
        this.show__ = true;
        this.showquerydiv = true;
      }
    },
    changeColor() {
      this.check = !this.check;
    },
    vague() {
      //模糊查询请求参数为0
      this.searchType = "0";
    },
    accurate() {
      //精确查询按钮  发送请求
      this.searchType = "1";
    },
    query() {
      //查询按钮  发送请求
      if (this.advSearchTypeFlag == true) {
        //最终触发本页面的forlist方法高级查询
        // alert("高级");
        this.$refs.brokerTab.uploadValue();
      } else {
        // alert("基础");
        var param = {
          searchType: this.form_data.searchType, //快速搜索精确或模糊
          searchKeys: this.form_data.customerType, //快速搜索K值
          searchValue: this.form_data.word, //快速搜索内容
          srvMagNo: this.form_data.manager, //客户经理
          individualFlag: this.form_data.individualFlag.toString(), //客户类型
          advSearchTypeFlag: this.advSearchTypeFlag, //高级查询选项
          industryCode: this.form_data.industryCode, //行业选择
          custOrg: {
            corpNature: this.form_data.corpNature.toString(), //机构类型
            listProp: this.form_data.listProp, //上市属性
            stkCode: this.form_data.stkCode //证券代码
          },
          custLblDep: this.form_data.personalLabel.toString(), //条线标签
          custLblRightChar: this.form_data.businessLabel.toString() //业务标签
        };
        this.$emit("querylist", { name: this.name, data: param });
      }
    },
    resetForm(formName) {
      //重置按钮  同时调取子组件的方法
      this.$refs[formName].resetFields();
      this.$refs.brokerTab.resetForm("value"); //可以向子组件传值
    },
    formList(data) {
      //从子组件传递过来的查询值  点击查询按钮触发  随后调取接口方法
      this.senior = data; //高级字段赋值
      this.query_();
    },
    query_() {
      //高级字段查询使用
      //真正发请求的地方
      var param = {
        searchType: this.form_data.searchType, //快速搜索精确或模糊
        searchKeys: this.form_data.customerType, //快速搜索K值
        searchValue: this.form_data.word, //快速搜索内容
        srvMagNo: this.form_data.manager, //客户经理
        individualFlag: this.form_data.individualFlag.toString(), //客户类型
        advSearchTypeFlag: this.advSearchTypeFlag, //高级查询选项
        industryCode: this.form_data.industryCode, //行业选择
        custOrg: {
          corpType: this.form_data.corpNature.toString(), //机构类型
          listProp: this.form_data.listProp, //上市属性
          stkCode: this.form_data.stkCode //证券代码
        },
        custLblDep: this.form_data.personalLabel.toString(), //条线标签
        custLblRightChar: this.form_data.businessLabel.toString() //业务标签
      };
      var data = Object.assign(param, this.senior);
      this.$emit("querylist", { name: this.name, data: data });
    },
    listProp() {
      //监听上市公司属性
      if (this.checked == true) {
        this.form_data.listProp = "1";
      } else {
        this.form_data.listProp = "0";
      }
    },
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        case 0: //机构类型
          if (
            this.form_data.individualFlag[0] == "012" &&
            this.form_data.individualFlag.length > 1
          ) {
            this.form_data.individualFlag.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.individualFlag.splice(0);
            this.form_data.individualFlag.push("");
          }
          break;
        case 1: //机构类型
          if (
            this.form_data.corpNature[0] == "" &&
            this.form_data.corpNature.length > 1
          ) {
            this.form_data.corpNature.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.corpNature.splice(0);
            this.form_data.corpNature.push("");
          }
          break;
        case 2: //个人高净值
          if (
            this.form_data.netWorth[0] == "" &&
            this.form_data.netWorth.length > 1
          ) {
            this.form_data.netWorth.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.netWorth.splice(0);
            this.form_data.netWorth.push("");
          }
          break;
        case 3: //条件标签
          if (
            this.form_data.personalLabel[0] == "" &&
            this.form_data.personalLabel.length > 1
          ) {
            this.form_data.personalLabel.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.personalLabel.splice(0);
            this.form_data.personalLabel.push("");
          }
          break;
        case 4: //业务标签
          if (
            this.form_data.businessLabel[0] == "" &&
            this.form_data.businessLabel.length > 1
          ) {
            this.form_data.businessLabel.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.businessLabel.splice(0);
            this.form_data.businessLabel.push("");
          }
          break;

        default:
          break;
      }
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.yh-formalcustomermanage-querycriteria {
  box-sizing: border-box;
  background-color: #fff;
  
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
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 8px;
}

#yh-advanced {
  padding-left: 7px;
  cursor: pointer;
  box-sizing: border-box;
}

.yh-manage-fastsearch {
  height: 50px;
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
  height: 30px;
  width: 30px;
  line-height: 30px;
  padding-left: 7px;
  border-radius: 8px;
  cursor: pointer;
}

.yh-buttondiv {
  border-bottom: 1px solid #eeeee9;
  height: 45px;
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
  margin: 20px 0;
}
</style>
