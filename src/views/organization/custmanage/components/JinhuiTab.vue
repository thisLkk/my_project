<template>
  <div class="yh_JinhuiTab">
    <!-- 我的正式客户，金汇页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务类型:" prop="serverType">
            <el-checkbox-group v-model="form_data.serverType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in serverTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="委托人类型:" prop="CustomerType">
            <el-checkbox-group v-model="form_data.CustomerType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in CustomerTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户风险:" prop="risk">
            <el-checkbox-group v-model="form_data.risk">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in riskList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户状态:" prop="state">
            <el-checkbox-group v-model="form_data.state">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,4)" v-for="item in stateList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="产品类型:" prop="productType">
            <el-checkbox-group v-model="form_data.productType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,5)" v-for="item in productTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="管理类型:" prop="adminType">
            <el-checkbox-group v-model="form_data.adminType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,6)" v-for="item in adminTypeList">{{item.value}}</el-checkbox-button>
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
export default {
  name: "JinhuiTab",
  data() {
    return {
      form_data: {
        serverType: [""], //业务类型
        CustomerType: [""], //委托人类型
        risk: [""], //客户风险
        state: [""], //客户状态
        productType: [""], //产品类型
        adminType: [""] //管理类型
      },
      serverTypeList: [
        //业务类型数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "大集合理财",
          key: "01"
        },
        {
          value: "小集合理财",
          key: "02"
        },
        {
          value: "定向理财",
          key: "04"
        },
        {
          value: "专项理财",
          key: "03"
        }
      ],
      CustomerTypeList: [
        //委托人类型数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "国有银行",
          key: "01"
        },
        {
          value: "股份银行",
          key: "02"
        },
        {
          value: "其他商业银行",
          key: "03"
        },
        {
          value: "其他金融机构",
          key: "04"
        },
        {
          value: "上市公司（股东）",
          key: "05"
        },
        {
          value: "政府平台（企业、集团）",
          key: "06"
        },
        {
          value: "一般个人客户",
          key: "07"
        },
        {
          value: "高净值个人客户",
          key: "08"
        },
        {
          value: "其他",
          key: "09"
        }
      ],
      riskList: [
        //客户风险数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "积极型",
          key: "01"
        },
        {
          value: "稳健型",
          key: "02"
        },
        {
          value: "保守型",
          key: "03"
        },
        {
          value: "相对保守",
          key: "04"
        },
        {
          value: "相对稳健",
          key: "05"
        }
      ],
      stateList: [
        //客户状态数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "正常",
          key: "01"
        },
        {
          value: "冻结",
          key: "02"
        },
        {
          value: "挂失",
          key: "03"
        },
        {
          value: "休眠已确认",
          key: "04"
        },
        {
          value: "销户",
          key: "05"
        }
      ],
      productTypeList: [
        //产品类型
        {
          value: "不限",
          key: ""
        },
        {
          value: "定向",
          key: "01"
        },
        {
          value: "专项",
          key: "02"
        },
        {
          value: "集合",
          key: "03"
        }
      ],
      adminTypeList: [
        //产品类型
        {
          value: "不限",
          key: ""
        },
        {
          value: "主动",
          key: "01"
        },
        {
          value: "通道",
          key: "02"
        }
      ]
    };
  },
  methods: {
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        case 1: //业务类型
          if (
            this.form_data.serverType[0] == "" &&
            this.form_data.serverType.length > 1
          ) {
            this.form_data.serverType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.serverType.splice(0);
            this.form_data.serverType.push("");
          }
          break;
        case 2: //委托人类型
          if (
            this.form_data.CustomerType[0] == "" &&
            this.form_data.CustomerType.length > 1
          ) {
            this.form_data.CustomerType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.CustomerType.splice(0);
            this.form_data.CustomerType.push("");
          }
          break;
        case 3: //客户风险
          if (this.form_data.risk[0] == "" && this.form_data.risk.length > 1) {
            this.form_data.risk.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.risk.splice(0);
            this.form_data.risk.push("");
          }
          break;
        case 4: //客户状态
          if (
            this.form_data.state[0] == "" &&
            this.form_data.state.length > 1
          ) {
            this.form_data.state.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.state.splice(0);
            this.form_data.state.push("");
          }
          break;
        case 5: //产品类型
          if (
            this.form_data.productType[0] == "" &&
            this.form_data.productType.length > 1
          ) {
            this.form_data.productType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.productType.splice(0);
            this.form_data.productType.push("");
          }
          break;
        case 6: //管理类型
          if (
            this.form_data.adminType[0] == "" &&
            this.form_data.adminType.length > 1
          ) {
            this.form_data.adminType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.adminType.splice(0);
            this.form_data.adminType.push("");
          }
          break;
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        advSearchType: "07", //金汇
        bussinessType: this.form_data.serverType.toString(), //	业务类型
        directAmbCustType: this.form_data.CustomerType.toString(), //	委托人类型
        directAmbPrdType: this.form_data.productType.toString(), //产品类型
        directAmbPrdMngType: this.form_data.adminType.toString(), //管理类型
        custSts: this.form_data.state.toString(), //客户状态
        riskLvl: this.form_data.risk.toString() //客户风险
      };
      this.$emit("formList", data);
    },
    resetForm(value) {
      //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
      this.$refs["form_data"].resetFields(); //重置本页面的form；
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>
