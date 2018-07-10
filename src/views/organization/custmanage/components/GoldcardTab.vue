<template>
  <div class="yh_GoldcardTab">
    <!-- 我的正式客户，证金页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="信用账户开户日期:" prop="creditStartTime">
            <el-date-picker v-model="form_data.creditStartTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="普通账户开户日期:" prop="ordinaryStartTime">
            <el-date-picker v-model="form_data.ordinaryStartTime" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="信用账户开户日期:" prop="creditStartTime">
            <DateRange @DateRangeClick="DateRangeClick"></DateRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="业务类型:" prop="customerType">
            <el-checkbox-group v-model="form_data.customerType" >
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in customerTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行业类型代码:" prop="IndustryTypeCode">
            <el-input placeholder="" v-model="form_data.IndustryTypeCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="授信额度（万元）:" prop="creditLine">
            <inputRange :ref="resetinput.A" name = "creditLine" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="征信评级:" prop="creditRating">
            <el-input placeholder="" v-model="form_data.creditRating" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="信用账户总资产（万元）:" prop="creditAssets">
            <inputRange :ref="resetinput.B" name = "creditAssets" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="普通账户总资产（万元）:" prop="commonAssets">
            <inputRange :ref="resetinput.C" name = "commonAssets" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="信用账户持仓（万元）:" prop="creditHolding">
            <inputRange :ref="resetinput.D" name = "creditHolding" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="普通账户持仓（万元）:" prop="generalHolding">
            <inputRange :ref="resetinput.E" name = "generalHolding" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="融资利率:" prop="financingInterestRate">
            <inputRange :ref="resetinput.F" name = "financingInterestRate" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="融资费率:" prop="FinancingRate">
            <inputRange :ref="resetinput.G" name = "FinancingRate" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
import inputRange from "@/views/organization/components/InputRange";
import DateRange from "@/views/organization/components/DateRange"
export default {
  name: "GoldcardTab",
  components: {
    inputRange,
    DateRange
  },
  data() {
    return {
      resetinput: {
        //重置inputrange的值
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        E: "E",
        F: "F",
        G: "G"
      },
      form_data: {
        customerType: [""], //业务类型
        IndustryTypeCode: "", //行业类型代码
        creditRating: "", //征信评级
        creditStartTime: "", //信用账户开户时间
        ordinaryStartTime: "", //普通账户开户日期
        inputValue_: {
          MinSxed: "", //授信额度
          MaxSxed: "", //授信额度
          MinXyzhzzc: "", //信用账户总资产
          MaxXyzhzzc: "", //信用账户总资产
          MinPtzhzzc: "", //普通账户总资产
          MaxPtzhzzc: "", //普通账户总资产
          MinXyzhcc: "", //信用账户持仓
          MaxXyzhcc: "", //信用账户持仓
          MinPtzhcc: "", //普通账户持仓
          MaxPtzhcc: "", //普通账户持仓
          MinRzll: "", //融资利率
          MaxRzll: "", //融资利率
          MinRqfl: "", //融资费率
          MaxRqfl: "" //融资费率
        } //inputRange 传过来的值
      },
      customerTypeList: [
        //业务类型数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "股融客户",
          key: "01"
        },
        {
          value: "债融客户",
          key: "02"
        }
      ]
    };
  },
  methods: {
    inputValue(value) {
      //子组件传过来的值
      var name = value.name;
      switch (name) {
        case "creditLine": //授信额度；
          this.form_data.inputValue_.MinSxed = value.min;
          this.form_data.inputValue_.MaxSxed = value.max;
          break;
        case "creditAssets": //信用账户总资产
          this.form_data.inputValue_.MinXyzhzzc = value.min;
          this.form_data.inputValue_.MaxXyzhzzc = value.max;
          break;
        case "commonAssets": //普通账户总资产
          this.form_data.inputValue_.MinPtzhzzc = value.min;
          this.form_data.inputValue_.MaxPtzhzzc = value.max;
          break;
        case "creditHolding": //信用账户持仓
          this.form_data.inputValue_.MinXyzhcc = value.min;
          this.form_data.inputValue_.MaxXyzhcc = value.max;
          break;
        case "generalHolding": //普通账户持仓
          this.form_data.inputValue_.MinPtzhcc = value.min;
          this.form_data.inputValue_.MaxPtzhcc = value.max;
          break;
        case "financingInterestRate": //融资利率
          this.form_data.inputValue_.MinRzll = value.min;
          this.form_data.inputValue_.MaxRzll = value.max;
          break;
        case "FinancingRate": //融资费率
          this.form_data.inputValue_.MinRqfl = value.min;
          this.form_data.inputValue_.MaxRqfl = value.max;
          break;
        default:
          break;
      }
    },
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        case 1: //业务类型
          if (
            this.form_data.customerType[0] == "" &&
            this.form_data.customerType.length > 1
          ) {
            this.form_data.customerType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.customerType.splice(0);
            this.form_data.customerType.push("");
          }
          break;
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        advSearchType: "09", //证金
        crdInvestgnGrade: this.form_data.creditRating, //	征信评级
        industryCodeForAdv: this.form_data.IndustryTypeCode, //	行业代码
        betweenInfo: this.form_data.inputValue_
      };
      data.betweenInfo.fromXyzh = this.form_data.creditStartTime[0]? this.form_data.creditStartTime[0] : null ;
      data.betweenInfo.toXyzh = this.form_data.creditStartTime[1]? this.form_data.creditStartTime[0] : null;
      data.betweenInfo.fromPtzh = this.form_data.ordinaryStartTime[0]? this.form_data.ordinaryStartTime[0] : null;
      data.betweenInfo.toPtzh = this.form_data.ordinaryStartTime[1]? this.form_data.ordinaryStartTime[0] : null;
      this.$emit("formList", data);
    },
    resetForm(value) {
      //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
      this.$refs["form_data"].resetFields(); //重置本页面的form；
      for (const key in this.resetinput) {
        //重置inputrange的value
        this.$refs[key].resetForm("value");
      }
    },
    //从日期选择组件传递的值(start与end)
    DateRangeClick(date){
      //console.log(date)
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.c-width {
  width: 85%;
}

.yh-querytemplate {
  float: right;
}

.yh-querytemplate button {
  background-color: #876120;
}

.yh-querytemplate button span {
  color: #ffffff;
  font-weight: bold;
}
</style>
