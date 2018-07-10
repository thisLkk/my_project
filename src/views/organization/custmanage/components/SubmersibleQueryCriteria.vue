<template>
  <div class="yh-sqc">
    <el-card class="box-card">
      <el-form :model="form_data" label-width="100px" size="mini" ref="form_data">
        <el-row>
          <el-col :span="24">
            <div class="yh-headerdiv">
              <span class="yh-headerfl">
                <span class="yh-font">查询条件</span>
              </span>
              <span class="yh-headerfr">
                <div id="yh-advanced" @click="ShowAndHide()">
                  <i :class="icon_" style="font-size:18px;"></i>
                </div>
              </span>
            </div>
          </el-col>
        </el-row>

        <div v-show="showquerydiv">
          <el-row>
            <div class="yh-customerlist-fastsearch clearfix">
              <el-col :span="8">
                <el-form-item label="快速搜索:" prop="customerType" class="combo-col">
                  <el-select placeholder="请选择" v-model="form_data.customerType" size="mini" id="yh-manageinput">
                    <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in customerTypeList" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label-width="10px" prop="word">
                  <el-input placeholder="" v-model="form_data.word" size="mini" />
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
                <!--<el-button id="accurate" size="mini" @click="accuratequery()">精确</el-button>-->
                <!--<el-button id="vague" size="mini" @click="fuzzyquery()">模糊</el-button>-->
              <!--</el-col>-->
            </div>
          </el-row>

          <el-row>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="一级行业:" prop="windPriIndustry">
                <el-select v-model="form_data.windPriIndustry" placeholder="请选择" size="mini" @change="windPriIndustryChange">
                  <el-option v-for="item in firstlevelindustryoptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级行业:" prop="windSndIndustry">
                <el-select v-model="form_data.windSndIndustry" placeholder="请选择" size="mini">
                  <el-option v-for="item in twolevelindustryoptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="yh-labels">
                <el-form-item label="投行潜客来源:" prop="investBankPotentCustSrc">
                  <el-checkbox-group v-model="form_data.investBankPotentCustSrc" size="mini">
                    <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,0)" v-for="item in customersourceoptions">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上市板:" prop="plate">
                <el-checkbox-group v-model="form_data.plate" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in listedboardoptions">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="企业性质:" prop="corpNature">
                <el-checkbox-group v-model="form_data.corpNature" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in companyattributesoptions">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div>
                <div class="yh-buttons">
                  <el-button id="el_query" size="mini" @click="query()">查询</el-button>
                  <!--<el-button id="el_reset" size="mini" @click="reset('form_data')">重置</el-button>-->
                </div>
                <div class="yh-icon" @click="ShowAndHideMore()">
                  <i :class="icon"></i>
                </div>
              </div>
            </el-col>
          </el-row>

          <!--<el-row>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="产业分类:" prop="industryClass">-->
                <!--<el-checkbox-group v-model="form_data.industryClass" size="mini">-->
                  <!--<el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in industrialclassificationoptions">{{item.value}}</el-checkbox-button>-->
                <!--</el-checkbox-group>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->

          <div v-show="showmorediv" id="yh-showmorediv">
            <el-row>
              <el-col :span="7">
                <el-form-item label="主营业务:" prop="mainBiz">
                  <el-input v-model="form_data.mainBiz" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="上市日期:" prop="listDate">
                  <el-date-picker v-model="form_data.listDate" type="date" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="省份:" prop="province">
                  <el-input placeholder="" v-model="form_data.province" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <div class="yh-yh-customerlistleftdiv">
                <el-col :span="7">
                  <el-form-item label="产品类型:" prop="mainPrdType">
                    <el-input v-model="form_data.mainPrdType" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </div>

              <el-col :span="8">
                <el-form-item label="城市:" prop="city">
                  <el-input v-model="form_data.city" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="发行人名称:" prop="issuerChnName">
                  <el-input v-model="form_data.issuerChnName" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item label="产品名称:" prop="mainPrdName">
                  <el-input v-model="form_data.mainPrdName" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="11">
                  <el-form-item label="最近一年资产负债率:" prop="assetliabilityratio">
                    <inputRange :ref="resetinput.A" name="assetliabilityratio" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item label="注册地址:" prop="regAddr">
                  <el-input v-model="form_data.regAddr" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="11">
                  <el-form-item label="最近一年营业收入:" prop="businessincome">
                    <inputRange :ref="resetinput.B" name="businessincome" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item label="经营范围:" prop="busiScope">
                  <el-input v-model="form_data.busiScope" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="11">
                  <el-form-item label="最近一年净利润:" prop="netprofit">
                    <inputRange :ref="resetinput.C" name="netprofit" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>


            <!--<el-row>-->
              <!--<el-col :span="24">-->
                <!--<el-form-item label="条线标签:" prop="personalLabel">-->
                  <!--<el-checkbox-group v-model="form_data.personalLabel">-->
                    <!--<el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,5)" v-for="item in stripelabeloptions">{{item.value}}</el-checkbox-button>-->
                  <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!-- <el-row>
              <el-col :span="24">
                <el-form-item label="部门标签:" prop="var23">
                  <el-checkbox-group v-model="form_data.var23">
                    <el-checkbox-button :key="item.key" :label="item.value" v-for="item in departmentlabeloptions">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row> -->

            <!--<el-row>-->
              <!--<el-col :span="24">-->
                <!--<el-form-item label="业务标签:" prop="businessLabel">-->
                  <!--<el-checkbox-group v-model="form_data.businessLabel">-->
                    <!--<el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,6)" v-for="item in businesslabeloptins">{{item.value}}</el-checkbox-button>-->
                  <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { submersiblequery } from '@/api/organization/custmanage/regcustmanage/PublicRegistrationList/index.js'
import inputRange from '@/views/organization/components/InputRange'
import { dictFilter,dictItems,treeDictItems } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";
import {JSONArrayToString} from "@/utils/datahandle.js"


export default {
  name: 'SubmersibleQueryCriteria',
  components: {
    inputRange
  },
  props: {
    name: {
      type: String,
    }
  },

  watch:{

    personalLabel_chg(val, oldVal){
      if(val.length==0){
        this.form_data.personalLabel.push("");
      }
    },
    businessLabel_chg(val, oldVal){
      if(val.length==0){
        this.form_data.businessLabel.push("");
      }
    },
    investBankPotentCustSrc_chg(val, oldVal){
      if(val.length==0){
        this.form_data.investBankPotentCustSrc.push("");
      }
    },
    plate_chg(val, oldVal){//监听板块改变
      if(val.length==0){
        this.form_data.plate.push("");
      }
    },
    corpNature_chg(val, oldVal){//企业性质
      if(val.length==0){
        this.form_data.corpNature.push("");
      }
    }


  },

  computed: {

    personalLabel_chg(){
      return this.form_data.personalLabel;
    },
    businessLabel_chg(){
      return this.form_data.businessLabel;
    },
    investBankPotentCustSrc_chg(){
      return this.form_data.investBankPotentCustSrc;
    },
    plate_chg(){
      return this.form_data.plate;
    },
    corpNature_chg(val, oldVal){//企业性质
     return this.form_data.corpNature;
    }

  },

  data() {
    return {
      icon: 'fa fa-angle-double-down',
      show: false,//展示隐藏二级筛选功能
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      show_: true, //展示隐藏二级筛选功能
      showquerydiv: true,//控制查询条件div是否显示
      showmorediv: false,//控制显示更多的查询条件
      form_data: {
        searchType: "0", //精确或者模糊
        customerType: '',
        word: '',
        windPriIndustry: '',
        windSndIndustry: '',
        investBankPotentCustSrc: [''],
        plate: [''],
        corpNature: [''],
        industryClass: [''],
        mainBiz: '',
        listDate: '',
        province: '',
        mainPrdType: '',
        city: '',
        mainPrdName  : '',
        assetliabilityratio: '',
        issuerChnName: '',
        regAddr: '',
        businessincome: '',
        busiScope: '',
        netprofit: '',
        trdPlatform: [''],
        personalLabel: [''],
        businessLabel: [''],
      },
      customerTypeList: [
        //快速搜索
        //快速搜索
        {
          value: "证券代码",
          key: "stkCode"
        },
        {
          value: "客户简称",
          key: "custName"
        },
        {
          value: "客户名称",
          key: "custFullName"
        },
        {
          value: "证件号码",
          key: "idNo"
        }
      ],
      resetinput: {
        A: "A",
        B: "B",
        C: "C"
      },
      customersourceoptions: [{
        value: "不限",
        key: ""
      }
      ],
      listedboardoptions: [{
        value: "不限",
        key: ""
      }],
      companyattributesoptions: [
        {
          value: "不限",
          key: ""
        }, {
          value: "中央国有",
          key: "2"
        }, {
          value: "地方国企",
          key: "3"
        }, {
          value: "公众企业",
          key: "4"
        }, {
          value: "民营企业",
          key: "5"
        }, {
          value: "外资企业",
          key: "6"
        }],
      industrialclassificationoptions: [{
        value: "不限",
        key: ""      }],

      stradingplatformoptions: [
        {
          value: "不限",
          key: ""
        }
      ],
      firstlevelindustryoptions: [
        {
          value: "",
          label: "不限"
        }
      ],
      twolevelindustryoptions: [
        {
          value: "",
          label: "不限"
        }
      ],
      stripelabeloptions: [
        {
          value: "不限",
          key: ""
        }, {
          value: "经纪",
          key: "01"
        }, {
          value: "资管",
          key: "02"
        }, {
          value: "投行",
          key: "03"
        }, {
          value: "自营",
          key: "04"
        }],
      businesslabeloptins: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "创业板",
          key: "01"
        }, {
          value: "沪港通",
          key: "02"
        }, {
          value: "深港通",
          key: "03"
        }, {
          value: "新三板",
          key: "04"
        }, {
          value: "金大宗",
          key: "05"
        }, {
          value: "场外期权",
          key: "06"
        }, {
          value: "收益互换",
          key: "07"
        }, {
          value: "买入转售",
          key: "08"
        }, {
          value: "PB",
          key: "09"
        }, {
          value: "融资融券",
          key: "10"
        }, {
          value: "股票质押",
          key: "11"
        }, {
          value: "基金研究",
          key: "12"
        }, {
          value: "天天利",
          key: "13"
        }
      ]
    }

  },
  created: function () {
    this.initDict();
  },

  methods: {
    //一级行业联动二级行业
    windPriIndustryChange(){
      this.form_data.windSndIndustry="";
      let docName = DICTYPE.CTCCD0232+'-'+this.form_data.windPriIndustry;
      let windSndIndustry=treeDictItems(docName);
      let sndIndustryTmp=[{label:'不限',value:''}];
      windSndIndustry.forEach(function(value,index,array){
        sndIndustryTmp.push(value);
      });
      this.twolevelindustryoptions= sndIndustryTmp;
    },

    initDict(){
      //投行潜在客户来源
      var cont=dictItems(DICTYPE.CTCCD0220);
      for(var indx in cont){
        this.customersourceoptions.push({"key":cont[indx].value,"value":cont[indx].label})
      }

      //上市板块
      var cont=dictItems(DICTYPE.CTCCD0096);
      for(var indx in cont){
        this.listedboardoptions.push({"key":cont[indx].value,"value":cont[indx].label})
      }

      //万得一级行业
      var cont=dictItems(DICTYPE.CTCCD0232);
      for(var indx in cont){
        this.firstlevelindustryoptions.push({"value":cont[indx].value,"label":cont[indx].label})
      }



    },

    ShowAndHide() {
      if (this.show_) {
        this.icon_ = "fa fa-angle-double-down";
        this.show_ = false;
        this.showquerydiv = false;
        return;
      } else {
        this.icon_ = "fa fa-angle-double-up";
        this.show_ = true;
        this.showquerydiv = true;
      }
    },
    ShowAndHideMore() {
      if (this.show) {
        this.icon = "fa fa-angle-double-down";
        this.show = false;
        this.showmorediv = false;
        return;
      } else {
        this.icon = "fa fa-angle-double-up";
        this.show = true;
        this.showmorediv = true;
      }
    },
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        case 0: //投行潜客来源
          if (
            this.form_data.investBankPotentCustSrc[0] == "" &&
            this.form_data.investBankPotentCustSrc.length > 1
          ) {
            this.form_data.investBankPotentCustSrc.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.investBankPotentCustSrc.splice(0);
            this.form_data.investBankPotentCustSrc.push("");
          }
          break;
        case 1: //上市板
          if (
            this.form_data.plate[0] == "" &&
            this.form_data.plate.length > 1
          ) {
            this.form_data.plate.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.plate.splice(0);
            this.form_data.plate.push("");
          }
          break;
        case 2: //企业性质
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
        case 3: //产业分类
          if (
            this.form_data.industryClass[0] == "" &&
            this.form_data.industryClass.length > 1
          ) {
            this.form_data.industryClass.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.industryClass.splice(0);
            this.form_data.industryClass.push("");
          }
          break;
        case 4: //交易平台
          if (
            this.form_data.trdPlatform[0] == "" &&
            this.form_data.trdPlatform.length > 1
          ) {
            this.form_data.trdPlatform.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.trdPlatform.splice(0);
            this.form_data.trdPlatform.push("");
          }
          break;
        case 5: //条线标签
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
        case 6: //业务标签
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
    },
    query() {
      let date = new Date(this.form_data.listDate)
      let year = date.getFullYear();
      let month = (date.getMonth() + 1);
      let day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      } else {
        month
      };
      let dateStr = year + '' + month + '' + day;
      if (dateStr == 'NaNNaNNaN') {
        dateStr = '';
      }
      var param = {
        searchType: this.form_data.searchType,//快速搜索
        searchKey: this.form_data.customerType, //快速搜索K值
        searchValue: this.form_data.word, //快速搜索内容
        investBankPotentCustSrc: this.form_data.investBankPotentCustSrc,
        // lineLable:this.form_data.personalLabel,//线条标签
        // custLblRightChar:this.form_data.businessLabel,//业务标签
        potentialOrg: {
          windPriIndustry: this.form_data.windPriIndustry,
          windSndIndustry: this.form_data.windSndIndustry,
          corpNature: this.form_data.corpNature,
          exchg: this.form_data.plate,
          //industryClass: this.form_data.industryClass,//产业分类
          mainPrdType: this.form_data.mainPrdType,
          issuerChnName: this.form_data.issuerChnName,
          busiScope: this.form_data.busiScope,
          trdPlatform: this.form_data.trdPlatform,
          regAddr: this.form_data.regAddr,
          mainBiz: this.form_data.mainBiz,
          listDate: dateStr,
          province: this.form_data.province,
          city: this.form_data.city
        },
        between: {
          MaxZcfzl: this.form_data.MaxZcfzl === undefined ? '' : this.form_data.MaxZcfzl,
          MinZcfzl: this.form_data.MinZcfzl === undefined ? '' : this.form_data.MinZcfzl,
          MinYysr: this.form_data.MinYysr === undefined ? '' : this.form_data.MinYysr,
          MaxYysr: this.form_data.MaxYysr === undefined ? '' : this.form_data.MaxYysr,
          MinJlr: this.form_data.MinJlr === undefined ? '' : this.form_data.MinJlr,
          MaxJlr: this.form_data.MaxJlr === undefined ? '' : this.form_data.MaxJlr,
        }
      }
      this.$emit("querylist", { name: this.name, querydata: JSONArrayToString(param) });
    },
    reset(formName) {
      //重置按钮
      this.$refs[formName].resetFields();
      for (const key in this.resetinput) { //重置inputrange的value
        this.$refs[key].resetForm("value")
      };
      delete this.form_data.MaxSz;//最大市值
      delete this.form_data.MinSz;//最小市值
      delete this.form_data.MaxZcfzl;//最大近一年资产负债率
      delete this.form_data.MinZcfzl;//最小近一年资产负债率
      delete this.form_data.MinYysr;//最小近一年营业收入
      delete this.form_data.MaxYysr;//最大近一年营业收入
      delete this.form_data.MinJlr;//最小近一年净利润
      delete this.form_data.MaxJlr;//最大近一年净利润

    },
    inputValue(value) {
      //子组件传过来的值
      var name = value.name;
      switch (name) {
        case "assetliabilityratio": //最近一年资产负债率
          this.form_data.MaxZcfzl = value.max;//此处填写后台需要的参数
          this.form_data.MinZcfzl = value.min;
          break;
        case "businessincome": //最近一年营业收入
          this.form_data.MaxYysr = value.max;
          this.form_data.MinYysr = value.min;
          break;
        case "netprofit": //最近一年净利润
          this.form_data.MinJlr = value.min;
          this.form_data.MaxJlr = value.max;
          break;
        default:
          break;
      }
    },
    fuzzyquery() {
      //模糊查询请求参数为0
      this.searchType = "0";
    },
    accuratequery() {
      //精确查询按钮  发送请求
      this.searchType = "1";
    }

  }
}
</script>
<style scoped>
.yh-sqc {
  box-sizing: border-box;
  margin-bottom:10px;
}
/*ouxinsu*/
.box-card{
   box-shadow:none;
}
.yh-headerdiv {
  height: 40px;
  border-bottom: 1px #eeeee9 solid;
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
/*ouxinsu*/
#yh-advanced {
  text-align:right;
  font-size:14px;
  padding-top: 10px;
  cursor: pointer;
  box-sizing: border-box;
}
.yh-customerlist-fastsearch {
  height: 65px;
  box-sizing: border-box;
  padding: 15px 0;
  margin-bottom: 10px;
  border-bottom: 1px dashed #eee;

}
/*ouxinsu*/
.yh-icon {
   float: right;
  width:24px;
  height:24px;
  font-size:18px;
  background:#e8e8e8;
  margin-right: 5px;
  margin-top: 0px;
  text-align:right;
  padding-right:6px;
  padding-top:2px;
  cursor:pointer;
}
.yh-buttons {
  float: right;
  overflow: hidden;
}
.yh-query {
  float: left;
  width: 60px;
  height: 30px;
  line-height: 30px;
  background-color: #cc6d30;
  text-align: center;
  margin: 0 8px;
  border-radius: 3px;
  color: #ffffff;
}
.yh-query:nth-child(2) {
  background: #dbdad3;
}
.yh-buttondiv {
  border-bottom: 1px solid #eeeee9;
  padding-bottom: 3%;
}
.el-radio-button__inner {
  font-family: "微软雅黑";
  font-size: 12px;
  color: #333333;
}
</style>


