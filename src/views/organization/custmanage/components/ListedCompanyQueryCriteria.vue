<template>
  <div class="yh-lcqc" >
    <el-card class="box-card">
      <el-form :model="form_data" ref="form_data" label-width="100px" size="mini">
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
                  <el-select placeholder="请选择" v-model="form_data.customerType" size="mini">
                    <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in customerTypeList" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label-width="10px" prop="word">
                  <el-input placeholder="" v-model="form_data.word" size="mini" />
                </el-form-item>
              </el-col>
              <!--<el-col :span="4">-->
                <!--<el-button id="accurate" size="mini" @click="accuratequery()">精确</el-button>-->
                <!--<el-button id="vague" size="mini" @click="fuzzyquery()">模糊</el-button>-->
              <!--</el-col>-->
            </div>
          </el-row>


          <el-row>
            <el-col :span="8">
              <el-form-item label="一级行业:" prop="windPriIndustry" >
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
              <el-form-item label="交易所:" prop="exchg">
                <el-checkbox-group v-model="form_data.exchg" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,0)" v-for="item in exchangeoptions">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="股票市场:" prop="stkMkt">
                <el-checkbox-group v-model="form_data.stkMkt" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in stockmarketoptions">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="板块:" prop="plate">
                <el-checkbox-group v-model="form_data.plate" size="mini">
                  <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in plateoptions">{{item.value}}</el-checkbox-button>
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

          <div v-show="showmorediv">
            <el-row>
              <el-col :span="8">
                <el-form-item label="注册地址:" prop="regAddr">
                  <el-input placeholder="" v-model="form_data.regAddr" id="yh-officeaddressinput" />
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <!-- <el-col :span="12">
                  <el-form-item label="流通股质押数(万):" prop="var8">
                    <inputRange name="var8" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col> -->
              </div>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="主营业务:" prop="mainBiz">
                  <el-input placeholder="" v-model="form_data.mainBiz" />
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <!-- <el-col :span="12">
                  <el-form-item label="全部质押数(万):" prop="var10">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col> -->
              </div>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上市日期:" prop="listDate">
                  <el-date-picker v-model="form_data.listDate" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="12">
                  <!-- <el-form-item label="流通股质押比例(%):" prop="var12">
                    <inputRange></inputRange>
                  </el-form-item> -->
                </el-col>
              </div>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="省份:" prop="province">
                  <el-input placeholder="" v-model="form_data.province" />
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="12">
                  <el-form-item label="最近一年资产负债率:" prop="assetliabilityratio">
                    <inputRange :ref="resetinput.A" name="assetliabilityratio" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="城市:" prop="city">
                  <el-input placeholder="" v-model="form_data.city" />
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="12">
                  <el-form-item label="最近一年营业收入:" prop="businessincome">
                    <inputRange :ref="resetinput.B" name="businessincome" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col :span="9">
                <el-form-item label="市值(万元):" prop="marketvalue">
                  <inputRange :ref="resetinput.C" name="marketvalue" @inputValue="inputValue"></inputRange>
                </el-form-item>
              </el-col>
              <div class="yh-customerlistdiv">
                <el-col :span="12">
                  <el-form-item label="最近一年净利润:" prop="netprofit">
                    <inputRange :ref="resetinput.D" name="netprofit" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <!--<el-row>-->
              <!--<el-col :span="24">-->
                <!--<el-form-item label="条线标签:" prop="lineLable">-->
                  <!--<el-checkbox-group v-model="form_data.lineLable">-->
                    <!--<el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in stripelabeloptions">{{item.value}}</el-checkbox-button>-->
                  <!--</el-checkbox-group>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row>-->
              <!--<el-col :span="24">-->
                <!--<el-form-item label="业务标签:" prop="custLblRightChar">-->
                  <!--<el-checkbox-group v-model="form_data.custLblRightChar">-->
                    <!--<el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,4)" v-for="item in custLblRightCharoptions">{{item.value}}</el-checkbox-button>-->
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
import global_ from "@/common/Global";
import {JSONArrayToString} from "@/utils/datahandle.js"
import inputRange from '@/views/organization/components/InputRange'
import { dictFilter,dictItems,treeDictItems } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";


export default {
  name: 'ListedCompanyQueryCriteria',
  components: {
    inputRange
  },
  props: {
    name: {
      type: String,
    }
  },
  watch:{
    exchg_chg(val, oldVal){//监听交易市场
      if(val.length==0){
        this.form_data.exchg.push("");
      }
    },
    stkMkt_chg(val, oldVal){//监听股票市场改变
      if(val.length==0){
        this.form_data.stkMkt.push("");
      }
    },
    plate_chg(val, oldVal){//监听板块改变
      if(val.length==0){
        this.form_data.plate.push("");
      }
    },
    lineLable_chg(val, oldVal){
      if(val.length==0){
        this.form_data.lineLable.push("");
      }
    },
    custLblRightChar_chg(val, oldVal){
      if(val.length==0){
        this.form_data.custLblRightChar.push("");
      }
    },

  },
  computed: {
    exchg_chg() {
      return this.form_data.exchg;
    },
    stkMkt_chg(){
      return this.form_data.stkMkt;
    },
    plate_chg(){
      return this.form_data.plate;
    },
    lineLable_chg(){
      return this.form_data.lineLable;
    },
    custLblRightChar_chg(){
      return this.form_data.custLblRightChar;
    }

  },


  data() {
    return {
      icon: 'fa fa-angle-double-down',
      show: false,
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      show_: true, //展示隐藏二级筛选功能
      showquerydiv: true,//控制查询条件div是否显示
      showmorediv: false,//控制显示更多的查询条件
      // firstlevelindustryoptions: global_.dictItems('101'),
      // exchangeoptions: global_.dictItems('102'),
      form_data: {
        searchType: "0", //精确或者模糊
        customerType: 'stkCode',
        word: '',
        windPriIndustry: '',
        windSndIndustry: '',
        exchg: [''],
        stkMkt: [''],
        plate: [''],
        regAddr: '',
        mainBiz: '',
        listDate: '',
        province: '',
        assetliabilityratio: '',
        city: '',
        businessincome: '',
        marketvalue: '',
        netprofit: '',
        // var19: '',
        // var20: '',
        lineLable: [''],
        // var22: [],
        custLblRightChar: ['']
      },
      customerTypeList: [
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
        C: "C",
        D: "D",
      },
      fastsearchoptions: [
        {
          value: "证券代码",
          key: "1"
        },
        {
          value: "证券简称",
          key: "2"
        },
        {
          value: "客户名称",
          key: "3"
        },
        {
          value: "证件号码",
          key: "4"
        },
      ],
      exchangeoptions: [{
        value: "不限",
        key: ""
      }],
      stockmarketoptions: [{
        value: "不限",
        key: ""
      }],
      plateoptions: [
        {
          value: "不限",
          key: ""
        }],
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

      custLblRightCharoptions: [
        {
          value: "不限",
          key: ""
        }, {
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
        }],
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
      //股票市场
      var cont=dictItems(DICTYPE.CTCCD0221);
      for(var indx in cont){
        this.stockmarketoptions.push({"key":cont[indx].value,"value":cont[indx].label})
      }
      //交易场所
      var cont=dictItems(DICTYPE.CTCCD0223);
      for(var indx in cont){
        this.exchangeoptions.push({"key":cont[indx].value,"value":cont[indx].label})
      }
      //交易版本
      var cont=dictItems(DICTYPE.CTCCD0096);
      for(var indx in cont){
        this.plateoptions.push({"key":cont[indx].value,"value":cont[indx].label})
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
        case 0: //交易所
          if (
            this.form_data.exchg[0] == "" &&
            this.form_data.exchg.length > 1
          ) {
            this.form_data.exchg.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.exchg.splice(0);
            this.form_data.exchg.push("");
          }
          break;
        case 1: //股票市场
          if (
            this.form_data.stkMkt[0] == "" &&
            this.form_data.stkMkt.length > 1
          ) {
            this.form_data.stkMkt.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.stkMkt.splice(0);
            this.form_data.stkMkt.push("");
          }
          break;
        case 2: //板块
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
        case 3: //条线标签StkCode
          if (
            this.form_data.lineLable[0] == "" &&
            this.form_data.lineLable.length > 1
          ) {
            this.form_data.lineLable.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.lineLable.splice(0);
            this.form_data.lineLable.push("");
          }
          break;
        case 4: //业务标签
          if (
            this.form_data.custLblRightChar[0] == "" &&
            this.form_data.custLblRightChar.length > 1
          ) {
            this.form_data.custLblRightChar.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.custLblRightChar.splice(0);
            this.form_data.custLblRightChar.push("");
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
      if(dateStr=='NaNNaNNaN'){
        dateStr="";
      }

      var param = {
        searchType: this.form_data.searchType,//快速搜索
        searchKey: this.form_data.customerType, //快速搜索K值
        searchValue: this.form_data.word, //快速搜索内容
        // lineLable:this.form_data.lineLable,
        // custLblRightChar:this.form_data.custLblRightChar,
        potentialOrg: {
          windPriIndustry: this.form_data.windPriIndustry,//万德一级行业
          windSndIndustry: this.form_data.windSndIndustry,//万德二级行业
          exchg: this.form_data.exchg,//交易所
          stkMkt: this.form_data.stkMkt,//股票市场
          plate: this.form_data.plate,//板块
          regAddr: this.form_data.regAddr,//办公地址
          mainBiz: this.form_data.mainBiz,//主营业务
          listDate: dateStr,//上市日期
          province: this.form_data.province,//省份
          city: this.form_data.city//城市
        },
        between: {
          MaxSz: this.form_data.MaxSz ?this.form_data.MaxSz:'',//最大市值
          MinSz: this.form_data.MinSz ? this.form_data.MinSz:'',//最小市值
          MaxZcfzl: this.form_data.MaxZcfzl? this.form_data.MaxZcfzl:'',//最大近一年资产负债率
          MinZcfzl: this.form_data.MinZcfzl? this.form_data.MinZcfzl:'',//最小近一年资产负债率
          MinYysr: this.form_data.MinYysr? this.form_data.MinYysr:'',//最小近一年营业收入
          MaxYysr: this.form_data.MaxYysr? this.form_data.MaxYysr:'',//最大近一年营业收入
          MinJlr: this.form_data.MinJlr? this.form_data.MinJlr:'',//最小近一年净利润
          MaxJlr: this.form_data.MaxJlr? this.form_data.MaxJlr:''//最大近一年净利润
        }
      };

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
    accuratequery() {
      //精确查询按钮  发送请求
      this.searchType = "1";
    },
    fuzzyquery() {
      //模糊查询请求参数为0
      this.searchType = "0";
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
          this.form_data.MinYysr = value.min;
          this.form_data.MaxYysr = value.max;
          break;
        case "marketvalue": //市值(亿元)
          this.form_data.MaxSz = value.max;
          this.form_data.MinSz = value.min;
          break;
        case "netprofit": //最近一年净利润
          this.form_data.MinJlr = value.min;
          this.form_data.MaxJlr = value.max;
          break;
        default:
          break;

      }
    },

  }
}
</script>
<style scoped>
.box-card{
  margin-bottom:10px;
  box-shadow:none;
}
.yh-lcqc {
  box-sizing: border-box;
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
  border-bottom:1px dashed #eee;
}
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
.yh-buttons {
  float: right;
  overflow: hidden;
}
.el-radio-button__inner {
  font-family: "微软雅黑";
  font-size: 12px;
  color: #333333;
}
</style>


