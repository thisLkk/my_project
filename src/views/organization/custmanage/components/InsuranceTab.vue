<template>
  <div class="yh_InsuranceTab">
    <!-- 我的正式客户，保险页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保险号:" prop="InsuranceNumber">
            <el-input placeholder="" v-model="form_data.InsuranceNumber" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="经办人:" prop="transactor">
            <el-input placeholder="" v-model="form_data.transactor" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电话:" prop="tel">
            <el-input placeholder="" v-model="form_data.tel" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" >
          <el-form-item label="保险金额（万元）:" prop="InsuranceSum">
            <inputRange :ref="resetinput.A" name = "InsuranceSum" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="投保险种:" prop="InsuranceType">
            <el-checkbox-group v-model="form_data.InsuranceType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in InsuranceTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="承保公司:" prop="insuranceCarriers">
            <el-checkbox-group v-model="form_data.insuranceCarriers">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in insuranceCarriersList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
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
  name: "InsuranceTab",
  components: {
    inputRange
  },
  data() {
    return {
      resetinput: {
        //重置inputrange的值
        A: "A"
      },
      form_data: {
        InsuranceSum: "", //保险金额
        InsuranceNumber: "", //保险号
        transactor: "", //联系人
        tel: "", //电话
        InsuranceType: [""], //投保险种
        insuranceCarriers: [""], //承保公司
        MinBxje: null, //保险金额
        MaxBxje: null //保险金额
      },
      InsuranceTypeList: [
        //投保险种数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "车险",
          key: "01"
        },
        {
          value: "财产险",
          key: "02"
        }
      ],
      insuranceCarriersList: [
        //承保公司数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "平安",
          key: "01"
        }
      ]
    };
  },
  methods: {
    inputValue(value) {
      //子组件传过来的值
      var name = value.name;
      switch (name) {
        case "InsuranceSum": //保险金额
          this.form_data.MinBxje = value.min;
          this.form_data.MaxBxje = value.max;
          break;
        default:
          break;
      }
    },
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        case 1: //投保类型
          if (
            this.form_data.InsuranceType[0] == "" &&
            this.form_data.InsuranceType.length > 1
          ) {
            this.form_data.InsuranceType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.InsuranceType.splice(0);
            this.form_data.InsuranceType.push("");
          }
          break;
        case 2: //承保公司
          if (
            this.form_data.insuranceCarriers[0] == "" &&
            this.form_data.insuranceCarriers.length > 1
          ) {
            this.form_data.insuranceCarriers.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.insuranceCarriers.splice(0);
            this.form_data.insuranceCarriers.push("");
          }
          break;
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        insuranceInsureVO: {
          insurBillNo: this.form_data.InsuranceNumber, //保险号
          insureType: this.form_data.InsuranceType.toString(), //保险险种
          underwriter: this.form_data.insuranceCarriers.toString() //承包类型
        },
        responPer: this.form_data.transactor, //经办人
        advSearchType: "05", //保险
        responPerContactMode: this.form_data.tel, //电话
        betweenInfo: {
          MinBxje: this.form_data.MinBxje,
          MaxBxje: this.form_data.MaxBxje
        }
      };
      this.$emit("formList", data);
    },
    resetForm(value) {
      //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
      this.$refs["form_data"].resetFields(); //重置本页面的form；
      for (const key in this.resetinput) {
        //重置inputrange的value
        this.$refs[key].resetForm("value");
      }
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
