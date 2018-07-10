<template>
  <div class="yh_FuturesTab">
    <!-- 我的正式客户，期货页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="行业类型代码:" prop="IndustryTypeCode">
            <el-input placeholder="" v-model="form_data.IndustryTypeCode" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-form-item label="征信评级:" prop="creditRating">
            <el-input placeholder="" v-model="form_data.creditRating" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      </el-row>
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
            <el-date-picker v-model="form_data.ordinaryStartTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="授信额度（万元）:" prop="creditLine">
            <inputRange :ref="resetinput.A" name = "creditLine" @inputValue = "inputValue"></inputRange>
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
export default {
  name: "FuturesTab",
  components: {
    inputRange
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
        G: "G",
      },
      form_data: {
        creditStartTime: "", //信用账户开户时间
        ordinaryStartTime: "", //普通账户开户日期
        IndustryTypeCode: "", //行业类型代码
        creditRating: "", //征信评级
        inputValue_: {
          creditLineMin: "",//授信额度
          creditLineMax: "",//授信额度
          creditAssetsMin: "",//信用账户总资产
          creditAssetsMax: "",//信用账户总资产
          commonAssetsMin: "",//普通账户总资产
          commonAssetsMax: "",//普通账户总资产
          creditHoldingmin: "",//信用账户持仓
          creditHoldingmax: "",//信用账户持仓
          generalHoldingmin: "",//普通账户持仓
          generalHoldingmax: "",//普通账户持仓
          financingInterestRatemin: "",//融资利率
          financingInterestRatemax: "",//融资利率
          FinancingRatemin: "",//融资费率
          FinancingRatemax: "",//融资费率
        } //inputRange 传过来的值
      },
    };
  },
  methods: {
    inputValue(value) {
      //子组件传过来的值
      var name = value.name;
      switch (name) {
        case "creditLine": //授信额度；
          this.form_data.inputValue_.creditLineMin = value.min;
          this.form_data.inputValue_.creditLineMax = value.max;
          break;
        case "creditAssets": //信用账户总资产
          this.form_data.inputValue_.creditAssetsMin = value.min;
          this.form_data.inputValue_.creditAssetsMax = value.max;
          break;
        case "commonAssets": //普通账户总资产
          this.form_data.inputValue_.commonAssetsMin = value.min;
          this.form_data.inputValue_.commonAssetsMax = value.max;
          break;
        case "creditHolding": //信用账户持仓
          this.form_data.inputValue_.creditHoldingmin = value.min;
          this.form_data.inputValue_.creditHoldingmax = value.max;
          break;
        case "generalHolding": //普通账户持仓
          this.form_data.inputValue_.generalHoldingmin = value.min;
          this.form_data.inputValue_.generalHoldingmax = value.max;
          break;
        case "financingInterestRate": //融资利率
          this.form_data.inputValue_.financingInterestRatemin = value.min;
          this.form_data.inputValue_.financingInterestRatemax = value.max;
          break;
        case "FinancingRate": //融资费率
          this.form_data.inputValue_.FinancingRatemin = value.min;
          this.form_data.inputValue_.FinancingRatemax = value.max;
          break;
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      // var time_ = []
      // if (this.form_data.startTime.length > 1) { //此处是处理时间为8位数
      //   this.form_data.startTime.forEach(item => {
      //     var time = item.toISOString().slice(0, 10)
      //     time_.push(time)
      //   });
      //   this.form_data.fromStandingTime = time_[0].replace(/[^\d]/g, "");
      //   this.form_data.toStandingTime = time_[1].replace(/[^\d]/g, "");
      // }
      // var data = {
      //   idNo: this.form_data.creditCode, //统一社会信息代码
      //   priSrc: this.form_data.customerType, //客户类型
      //   corpNature: this.form_data.enterpriseNature, //企业性质
      //   prjType: this.form_data.projectType, //项目类型
      //   priPhase: this.form_data.stage, //所处阶段
      //   betweenInfo: {
      //     fromStandingTime: this.form_data.fromStandingTime, //开始时间
      //     toStandingTime: this.form_data.toStandingTime, //结束时间
      //     MinRegCptl: this.form_data.MinRegCptl, //注册资金min
      //     MaxRegCptl: this.form_data.MaxRegCptl, //注册资金max
      //   }
      // }
      //console.log(this.form_data)
      // this.$emit("formList", this.form_data);
    },
    resetForm(value) {
      //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
      this.$refs["form_data"].resetFields(); //重置本页面的form；
      for (const key in this.resetinput) {
        //重置inputrange的value
        this.$refs[key].resetForm("value");
      }
    },
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
