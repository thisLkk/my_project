<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_queryOfProductQuery">
    <div class="queryOfProductQuery_title clearfix">
     <el-row>
        <el-col :span="24">
          <div class="yh-headerdiv">
            <span class="yh-headerfl">
              <span class="yh-font">查询条件</span>
            </span>
            <span class="yh-headerfr">
              <div id="yh-advanced" @click="ssClick()">
                <i :class="icon_" style="font-size:18px; cursor:pointer;"></i>
              </div>
            </span> 
          </div>
        </el-col>
      </el-row>
    </div>
    <el-form :model="form_data" label-width="142px" ref="ruleForm" size="mini" label-position="right">
      <div class="queryOfProductQuery_main yh-jbxx-content"  v-if="ssIsShow">
      
        <el-row class="yh_topSS">
          <el-col :span="15">
            <el-form-item  label="产品名称：" prop="PrdFullName" class="combo-col ">
              <el-input class="seach-input" placeholder="模糊查询" v-model="form_data.PrdFullName"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="产品分类：">
              <el-radio-group v-model="isPrdClass" @change="productClassCheck(isPrdClass)">
                <el-radio-button key="" label="" chacked>不限</el-radio-button>
                <el-radio-button :key="item.value" :label="item.value" v-for="item in PrdClass_items">{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-show="prdClassShow">
          <el-col :span="22">
            <el-form-item label="产品类型：">
              <el-checkbox-group v-model="form_data.PrdType" @change="checkChange(form_data.PrdType)">

                <el-checkbox-button key="" label="" ref="checkBoxDom">不限</el-checkbox-button>

                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in PrdType_items">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="风险等级：">
              <el-radio-group v-model="form_data.SecSideRiskGdes" @change="checkChange(form_data.SecSideRiskGdes)">
                <el-radio-button key="" label="">不限</el-radio-button>
                <el-radio-button :key="item.value" :label="item.value" v-for="item in SecSideRiskGdes_items">{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="产品状态：">
              <el-checkbox-group v-model="form_data.PrdSts" @change="checkChange(form_data.PrdSts)">
                <el-checkbox-button key="" label="">不限</el-checkbox-button>
                <el-checkbox-button :key="item.value" :label="item.value" v-for="item in PrdSts_items">{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
                
          <el-col class="seach-but-box" :span="11" style="text-align:right;">
            <div class="yh-fold-noactive" id="yh-change" @click="gjssClick()">
                <i :class="icon"></i>
            </div>              
            <el-button size="small" class="yh_color_query" @click="doQuery">查询</el-button>
          </el-col>
        </el-row>

              
        <template v-if="gjssIsShow">
          <el-row>
            <el-col :span="22">
              <el-form-item label="认购日期：">
                <el-date-picker
                  @blur="clickCallBeginDateRange"
                  value-format="yyyyMMdd"
                  v-model="form_data.CallBeginDateBigin"
                  type="date"
                  clearable
                  placeholder="开始日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                  @blur="clickCallBeginDateRange"
                  clearable
                  value-format="yyyyMMdd"
                  v-model="form_data.CallBeginDateEnd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="申购日期：">
                 <el-date-picker
                  @blur="clickPursBeginDateRange"
                  value-format="yyyyMMdd"
                  v-model="form_data.PursBeginDateBigin"
                  type="date"
                  clearable
                  placeholder="开始日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                  @blur="clickPursBeginDateRange"
                  clearable
                  value-format="yyyyMMdd"
                  v-model="form_data.PursBeginDateEnd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="到期日期：">
                <el-date-picker
                  @blur="clickMaturityDateRange"
                  value-format="yyyyMMdd"
                  v-model="form_data.MaturityDateBegin"
                  type="date"
                  clearable
                  placeholder="开始日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                  @blur="clickMaturityDateRange"
                  clearable
                  value-format="yyyyMMdd"
                  v-model="form_data.MaturityDateEnd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
import { dictItems, treeDictItems } from '@/filters';
import DICTYPE from '@/utils/dictTypes.js';
import { JSONArrayToString, checkAllChange } from "@/utils/datahandle.js";
import dateRange from '../../../organization/components/DateRange';

export default {
  name: "queryOfProductQuery",

  components: {
    'DateRange': dateRange
  },

  data() {
    return {
      el_switch: true, //开关的状态
      ssIsShow: true,
      gjssIsShow: false,
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      icon: "fa fa-angle-double-down", //展示隐藏二级筛选功能
      isPrdClass: '',
      form_data: {
        PrdFullName:"",
        PrdClass: "",
        PrdType:[""],
        SecSideRiskGdes: '',
        PrdSts:[""],
        PrdTermClass:[""],
        CallBeginDateBigin: '', // 认购开始日期_开始
        CallBeginDateEnd: '', // 	认购开始日期_结束
        PursBeginDateBigin: '', // 申购开始日期_开始
        PursBeginDateEnd: '', // 申购开始日期_结束
        MaturityDateBegin: '', // 到期日期开始
        MaturityDateEnd: '' // 到期日期结束
      },
      prdClassShow: false,
      // 产品分类
      PrdClass_items:dictItems(DICTYPE.OSPCD0232),
      // 产品类型
      PrdType_items: [],
      SecSideRiskGdes_items: dictItems(DICTYPE.EDW20799),
      PrdSts_items:  dictItems(DICTYPE.OSPCD0233),
    };
  },

  methods: {
    /**
     * 认购时间选取
     * dade {} 认购时间
     */
    clickCallBeginDateRange(dade = {}) {
      this.blurChange('CallBeginDateBigin', 'CallBeginDateEnd' );
    },

    /**
     * 申购时间选取
     * dade {} 申购时间
     */
    clickPursBeginDateRange(dade = {}) {
      this.blurChange('PursBeginDateBigin', 'PursBeginDateEnd' );
    },

    /**
     * 到期日期选取
     * dade {} 到期日期
     */
    clickMaturityDateRange(dade = {}) {
       this.blurChange('MaturityDateBegin', 'MaturityDateEnd' );
    },

    /**
     * 选择商品分类根据产品分类显示产品类型,默认选中不限选项
     */
    productClassCheck(val) {
      let that = this;
      that.PrdType_items = [];
      that.form_data.PrdType = [''];
      let prdClass = treeDictItems(DICTYPE.OSPCD0232 +'-' + val);
      that.PrdType_items = that.PrdType_items.concat(prdClass);
      that.prdClassShow = that.PrdType_items.length;
    },
    
    /**
     * 如val数组为空则判定为没有选项，选择为不限，多选checkbox
     * val [] 
     */
    checkChange(val = []){
      val.length <= 0 && val.push('');
      checkAllChange(val);
    },

    /**
     * 点击查询按钮
     */
    doQuery() {
      // 有产品类型不需要传产品分类
      if (this.form_data.PrdType[0] === '') {
        this.form_data.PrdClass = this.isPrdClass;
      } else {
        this.form_data.PrdClass = '';
      };
      // 格式化时间,置空后为null置为'';
      this.formatDate();
      this.$emit("querylist", JSONArrayToString(this.form_data));
    },

    /**
     * 格式化时间,置空后为null置为'';
     */
    formatDate() {
      let dataArr = ['CallBeginDateBigin', 'CallBeginDateEnd', 'PursBeginDateBigin', 'PursBeginDateEnd', 'MaturityDateBegin', 'MaturityDateEnd'];
      dataArr.forEach((item, key) => {
        if (!this.form_data[item]) {
          this.form_data[item] = '';
        }
      })
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

    blurChange(startTime, endTime) {
      if (this.form_data[startTime]!= "" && this.form_data[endTime]!= "") {
        if (parseFloat(this.form_data[startTime]) > parseFloat(this.form_data[endTime])) {
          this.$confirm("起始日期应小于结束日期！", {
            showClose: false,
            showCancelButton: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(_ => {
              this.form_data[startTime] = "";
              this.form_data[endTime] = "";
              done();
            })
            .catch(_ => {});
        }
      } 
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.yh_queryOfProductQuery{
    border: 1px #ebeef5 solid;
    background-color:#fff;
    padding: 0 20px;
    margin-bottom:10px;
    border-radius:3px;
  .yh-fold-noactive{
    padding-left: 0;
    text-align: center;
  }
  .seach-but-box{
    display: flex;
    display: -webkit-flex;
    .yh_color_query{padding:5px 20px;}
    .yh_color_reset{padding:5px 20px;}
  }
  .seach-input{
    .el-input__inner{
      width: 240px !important;
    }
  }
  .yh-headerdiv {
    height: 40px;
    border-bottom: 1px solid #eeeee9;
    margin-bottom:10px;
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
    font-size:18px;
    cursor:pointer;
  }
  #yh-advanced{
    font-size:18px;
  }
  .yh_queryOfProductQuery {
    .queryOfProductQuery_title {
      width: 100%;
      height: 34px;
      line-height: 34px;
      border-bottom: 1px #eeeee9 solid;
      box-sizing: border-box;
      h3 {
        width: 70px;
        height: 33px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 2px solid #cb6c2f;
      }
      .el_switch {
        margin-right: 20px;
      }
    }
    .queryOfProductQuery_main {
      position: relative;
      padding: 0 40px;
      margin: 10px 0;
      width: 100%;
      box-sizing: border-box;
      animation: fadein 0.2s linear 1;
      overflow: hidden;
      font-size: 14px;
      .lookup{
        position: absolute;
        top: 20px;
        right: 100px;
      }
      div {
        span {
          color: #333333;
          display: inline-block;
          width: 100px;
          text-align: right;
        }
      }
    }
    .queryOfProductQuery_main.active {
      animation: fadeout 0.2s linear 1;
      height: 0;
    }
    @keyframes fadeout {
      0% {
        height: 190px;
      }
      100% {
        height: 0;
      }
    }
    @keyframes fadein {
      0% {
        height: 0;
      }
      100% {
        height: 190px;
      }
    }
  }
}

</style>
