<template>
  <div class="yh_RegCustQeuryMyDepartment">
    <el-card class="box-card" style="box-shadow:none;">
      <el-form :model="form_data" :rules="rules" ref="form_data" size="mini" label-width="117px" label-position="right">
        <el-row>
          <el-col :span="24">
            <div class="yh-headerdiv">
              <span class="yh-headerfl">
                <span class="yh-font">查询条件</span>
              </span>
              <span class="yh-headerfr">
                <div id="yh-advanced" @click="ssClick()">
                  <i :class="icon_"></i>
                </div>
              </span> 
            </div>
          </el-col>
        </el-row>

        <template v-if="ssIsShow">

          <div class="yh-jbxx-content">
            <el-row class="yh_topSS">
            <el-col :span="5">
              <el-form-item label="快速搜索：" prop="searchKey" class="combo-col">
                <el-select placeholder="请选择" v-model="form_data.searchKey" size="mini" id="yh-manageinput">
                  <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in searchKeyList" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="10px" prop="searchValue">
                <el-input placeholder="" v-model="form_data.searchValue" size="mini" id="yh-manageinput" />
              </el-form-item>
            </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="一级行业：" prop="potentialOrg.windPriIndustry">
                  <el-select placeholder="请选择" v-model="form_data.potentialOrg.windPriIndustry" size="mini" @change="windPriIndustryChange">
                    
                <el-option key="" label="请选择" value="">
                  </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in items_windPriIndustry" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="二级行业：" prop="potentialOrg.windSndIndustry">
                  <el-select placeholder="请选择" v-model="form_data.potentialOrg.windSndIndustry" size="mini">
                    
                <el-option key="" label="请选择" value="">
                  </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in industryCodeList" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="7" v-if="parentPage == 'dept'">
                <el-form-item label="客户经理：" size="mini">
                  <inputButtonCE @onChooseUser="onChooseUser"/>
                </el-form-item>
              </el-col>

              <el-col :span="7" v-if="parentPage == 'org'">
                <el-form-item label="机构：" size="mini">
                  <OrgChoose selectType="redio" :businessName ="orgidName" @onOrgSure="onOrgSure"></OrgChoose>
                </el-form-item>
              </el-col>

            <el-col  :span="7" v-if="parentPage == 'all'">
              <el-form-item label="机构:"  size="mini">
                <OrgChoose selectType="redio" :businessName ="orgidName" dataInitType="allOrg" @onOrgSure="onOrgSure"></OrgChoose>
              </el-form-item>
            </el-col>

            </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="注册客户类型：" prop="regCustType">
                  <el-checkbox-group @change="checkChange(form_data.regCustType)" v-model="form_data.regCustType">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.key" :label="item.key" v-for="item in regCustType_items">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row> 
              <el-col :span="20">
                <el-form-item label="注册客户来源：" prop="regSrc">
                  <el-checkbox-group  @change="checkChange(form_data.regSrc)" v-model="form_data.regSrc">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in regSrc_items">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="交易所：" prop="potentialOrg.exchg">
                  <el-checkbox-group @change="checkChange(form_data.potentialOrg.exchg)" v-model="form_data.potentialOrg.exchg">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in exchg_items">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="股票市场：" prop="potentialOrg.stkMkt">
                  <el-checkbox-group  @change="checkChange(form_data.potentialOrg.stkMkt)" v-model="form_data.potentialOrg.stkMkt">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in stkMkt_items">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="14">
                <el-form-item label="板块：" prop="potentialOrg.plate">
                  <el-checkbox-group @change="checkChange(form_data.potentialOrg.plate)" v-model="form_data.potentialOrg.plate">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in plate_items">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

              <el-col :offset="0" :span="10">   
                <div style="float: right;"> 
                  <el-button size="mini" id="el_query" v-on:click="doSearch()">查询</el-button>
                  <!-- <el-button size="mini" id="el_reset" v-on:click="doReset('form_data')">重置</el-button> -->
                </div>
                <div class="yh-fold-noactive" id="yh-change" @click="gjssClick()">
                    <i :class="icon"></i>
                </div>
              </el-col>
            </el-row>

            <template v-if="gjssIsShow">
              <el-row>
                <el-col :span="22">
                  <el-form-item label="市值(亿元)：">
                    <inputRange name="form_datasz" @inputValue="inputValue"></inputRange>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="9">
                  <el-form-item label="注册地址：" class="combo-col ">
                    <el-input v-model="form_data.potentialOrg.regAddr" id="workAddrInput" resize=" both" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <el-row>
                <el-col :span="24">
                  <el-form-item label="条线标签：" prop="lineLable">
                    <el-checkbox-group  v-model="form_data.lineLable" @change="checkChange(form_data.lineLable)">
                      <el-checkbox-button v-for="item in lineLable_items" :label="item.key" :key="item.key">{{item.value}}</el-checkbox-button>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row> -->

<!--               <el-row>
                <el-col :span="24">
                  <el-form-item label="部门标签：" prop="bmbq">
                    <el-checkbox-group v-model="form_data.bmbq">
                      <el-checkbox-button v-for="item in var25_items" :label="item.key" :key="item.key">{{item.value}}</el-checkbox-button>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row> -->

              <!-- <el-row>
                <el-col :span="24">
                  <el-form-item label="业务标签：" prop="custLblRightChar">
                    <el-checkbox-group v-model="form_data.custLblRightChar" @change="checkChange(form_data.custLblRightChar)">
                      <el-checkbox-button :key="item.key" :label="item.key" v-for="item in custLblRightChar_items">{{item.value}}</el-checkbox-button>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row class="padding-top:20px">
                <el-col :span="17">
                  <el-form-item label="备注：" prop="potentialOrg.remk" class="combo-col">
                    <el-input placeholder="" v-model="form_data.potentialOrg.remk" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </div>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
import inputRange from "@/views/organization/components/InputRange";
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee";
import {JSONArrayToString,checkAllChange } from "@/utils/datahandle.js";
import DICTYPE from '@/utils/dictTypes.js';
import OrgChoose from "@/views/organization/components/OrgChoose";
import { dictFilter,dictItems,treeDictItems } from "@/filters";

export default {
  name: "RegCustManageQuery",
  components: {
    inputRange,
    inputButtonCE,
    OrgChoose,
  },
  data() {
    return {
      orgidName : dictFilter(DICTYPE.CTCCD0998, this.$store.getters.orgid), //---机构id回显为汉字显示在机构
      ssIsShow: true,
      gjssIsShow: false,
      icon: "fa fa-angle-double-down", //展示隐藏二级筛选功能
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      form_data: {
        searchType:"0",//模糊搜索  0-模糊  1-精确
        searchKey:"",//快速搜索下拉框
        searchValue:"",//快速搜索文本框
        regCustType: [''],//客户类型
        regSrc: [''],//客户来源
        lineLable: [''],//条线标签
        bmbq: [''],//部门标签
        reg_emp_org_no:"",//机构
        regEmpNo:"",//客户经理
        custLblRightChar: [''],//业务标签
        potentialOrg:{
          windPriIndustry:"",//一级行业
          windSndIndustry:"",//二级行业
          remk:"",//备注
          exchg: [''],//交易所
          stkMkt: [''],//证券代码
          plate: [''],//板块
          workAddr:"",//办公地址
        },
        between:{
          MinSz:"",//最小市值
          MaxSz:"",//最大市值
        },
      },
      searchKeyList: [
        //快速搜索
        {
          value: "请选择",
          key: ""
        },
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
      //一级行业
      items_windPriIndustry:dictItems(DICTYPE.CTCCD0232),

      industryCodeList: [],
   

      regCustType_items: [
        {
          value: "上市公司",
          key: "1"
        },
        {
          value: "非上市公司",
          key: "2"
        },
        {
          value: "个人",
          key: "0"
        }
      ],

      regSrc_items:dictItems(DICTYPE.CTCCD0120),

      exchg_items: dictItems(DICTYPE.CTCCD0223),

      stkMkt_items: dictItems(DICTYPE.CTCCD0221),

      plate_items: [
        {
          label: "主板",
          value: "01"
        },
        {
          label: "中小企业板",
          value: "02"
        },
        {
          label: "创业板",
          value: "03"
        },
      ],

      lineLable_items: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "经纪 ",
          key: "01"
        },
        {
          value: "资管 ",
          key: "02"
        },
        {
          value: "投行 ",
          key: "03"
        },
        {
          value: "自营 ",
          key: "04"
        }
      ],
      var25_items: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "经纪业务总部",
          key: "01"
        },
        {
          value: "衍生产品总部",
          key: "02"
        },
        {
          value: "产品中心",
          key: "03"
        },
        {
          value: "证券金融总部",
          key: "04"
        },
        {
          value: "投资研究",
          key: "05"
        },
        {
          value: "银河金汇",
          key: "06"
        },
        {
          value: "投资银行总部",
          key: "07"
        },
        {
          value: "债券投资部",
          key: "08"
        }
      ],
      custLblRightChar_items: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "创业板 ",
          key: "01"
        },
        {
          value: "沪港通 ",
          key: "02"
        },
        {
          value: "深港通 ",
          key: "03"
        },
        {
          value: "新三板 ",
          key: "04"
        },
        {
          value: "金大宗 ",
          key: "05"
        },
        {
          value: "场外期权 ",
          key: "06"
        },
        {
          value: "收益互换 ",
          key: "07"
        },
        {
          value: "买入转售 ",
          key: "08"
        },
        {
          value: "PB ",
          key: "09"
        },
        {
          value: "融资融券 ",
          key: "10"
        },
        {
          value: "股票质押",
          key: "11"
        },
        {
          value: "基金研究",
          key: "12"
        },
        {
          value: "天天利",
          key: "13"
        }
      ],
      rules: {}
    };
  },

  props: ['parentPage'],

  created() {
    //判断是否默认加载数据
    //if("true" == this.autoInit){
      this.$emit("initParam",this.parentPage,JSONArrayToString(this.form_data));
    //}
  },

  methods: {
    checkChange(val){
      checkAllChange(val);
    },
    doSearch() {
      this.$emit("querylist",this.parentPage,JSONArrayToString(this.form_data));
    },
    doReset(formName) {
      this.$refs[formName].resetFields();
      //清空inputRange组件内值
      $('.yh_clean_input input').val('');
    },
    onButtonClick9(data) {
      doRequestPost(global_.rest_path + "", data)
        .then(
        function (response) {
          global_.notify(this, "模糊", response.status.code);
          global_.backPage(this);
        }.bind(this)
        )
        .catch(function (error) {
          //console.log(error);
        });
    },
    onButtonClick10(data) {
      doRequestPost(global_.rest_path + "", data)
        .then(
        function (response) {
          global_.notify(this, "精确", response.status.code);
          global_.backPage(this);
        }.bind(this)
        )
        .catch(function (error) {
          //console.log(error);
        });
    },
    ssClick() {
      this.ssIsShow = !this.ssIsShow;
      if (this.ssIsShow) {
        this.icon_ = "fa fa-angle-double-up";
        return;
      } else {
        this.icon_ = "fa fa-angle-double-down";
      }
    },
    gjssClick() {
      this.gjssIsShow = !this.gjssIsShow;
      if (this.gjssIsShow) {
        this.icon = "fa fa-angle-double-up";
      } else {
        this.icon = "fa fa-angle-double-down";
      }
    },
    //一级行业联动二级行业
    windPriIndustryChange(){
      this.form_data.potentialOrg.windSndIndustry = '';
      let docName = DICTYPE.CTCCD0232+'-'+this.form_data.potentialOrg.windPriIndustry;
      //alert('###'+docName);
      this.industryCodeList = treeDictItems(docName);
    },
    inputValue(value) {
      //子组件传过来的值
      var list = [];
      var name = value.name;
      switch (name) {
        case "form_datasz":
          this.form_data.between.MinSz = value.min;
          this.form_data.between.MaxSz = value.max;
          break;
        case "marketvalue":
          var marketvalues = {
            MinSz: value.min,
            MaxSz: value.max
          }
          list.push(marketvalues);
          break;
        case "assetliabilityratio":
          var assetliabilityratios = {
            MinZcfzl: value.min,
            MaxZcfzl: value.max
          }
          list.push(assetliabilityratios);
          break;
        case "businessincome":
          var businessincomes = {
            MinYysr: value.min,
            MaxYysr: value.max
          }
          list.push(businessincomes);
          break;
        default:
          break;
      }
    },
    
    //设置机构选择之后的值
    onOrgSure(val){
      this.form_data.reg_emp_org_no = val;
    },
    onChooseUser(val){
      this.form_data.regEmpNo = val;
    },
    lastQuery(data) { }
  }
};
</script>

<style scoped>
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
  height: 40px;
  line-height: 40px;
}
.yh_inputWidth input {
  width: 30px;
}
.yh_topSS {
  margin-top: 20px;
}
.workAddrInput parent {
  width: 90%;
}
/* .el-form-item div div{
  width:97%;
} */
#yh-advanced {
  padding-left: 7px;
  cursor: pointer;
  box-sizing: border-box;
}
.yh-fold-noactive {
  float: right;
  margin-right:5px;
  background:#e8e8e8;
  width:24px;
  height:24px;
  font-size:18px;
  text-align:center;
  padding-top:3px;
  margin-left: 15px;
  cursor:pointer;
}
.yh_color_precise {
  background-color: #cf6929;
  color: white;
}
.yh_color_query {
  background-color: #a76e39;
  color: white;
}
.yh_color_reset {
  background-color: #afa8a2;
  color: white;
}
</style>
