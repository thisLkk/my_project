<template>
  <div class="yh_InvestmentBankTab">
    <!-- 我的正式客户，投行页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码:" prop="creditCode">
            <el-input placeholder="" v-model="form_data.creditCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item label="开户时间:" prop="startTime">
            <el-date-picker v-model="form_data.startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="注册地址:" prop="registeredAddress">
            <el-input placeholder="" v-model="form_data.registeredAddress" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item label="注册资金（万元）:" prop="registeredCapital">
            <inputRange :ref="resetinput.A" name = "registeredCapital" @inputValue = "inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="实际控制人:" prop="actualController">
            <el-input placeholder="" v-model="form_data.actualController" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-form-item label="办公地址:" prop="officeAddress">
            <el-input placeholder="" v-model="form_data.officeAddress" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="我司角色:" prop="role">
            <el-input placeholder="" v-model="form_data.role" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-form-item label="投行业务部门:" prop="department">
            <el-input placeholder="" v-model="form_data.department" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户类型:" prop="customerType">
            <el-radio-group v-model="form_data.customerType">
              <el-radio-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in customerTypeList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="企业性质:" prop="enterpriseNature">
            <el-checkbox-group v-model="form_data.enterpriseNature">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in enterpriseNatureList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目类型:" prop="projectType">
            <el-checkbox-group v-model="form_data.projectType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in projectTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="所处阶段:" prop="stage">
            <el-checkbox-group v-model="form_data.stage">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,4)" v-for="item in stageList">{{item.value}}</el-checkbox-button>
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
  name: "InvestmentBankTab",
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
        startTime:[],
        fromStandingTime:"",//开始时间
        toStandingTime:"",//结束时间
        MinRegCptl: "", //左侧的注册资金
        MaxRegCptl: "", //右侧的注册资金
        creditCode: "", //统一社会信用代码
        registeredAddress: "", //注册地址
        actualController: "", //实际控制人
        officeAddress: "", //办公地址
        role: "", //我司角色
        department: "", //投行业务部门
        customerType: "01", //客户类型
        enterpriseNature: [""], //企业性质
        projectType: [""], //项目类型
        stage: [""] //所处阶段
      },
      customerTypeList: [
        //客户类型数据
        {
          value: "股融客户",
          key: "01"
        },
        {
          value: "债融客户",
          key: "02"
        },
        {
          value: "新三板客户",
          key: "03"
        },
        {
          value: "立项登记客户",
          key: "04"
        }
      ],
      enterpriseNatureList: [
        //企业性质数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "中央国有",
          key: "01"
        },
        {
          value: "地方国企",
          key: "02"
        },
        {
          value: "公众企业",
          key: "03"
        },
        {
          value: "民营企业",
          key: "04"
        },
        {
          value: "外资企业",
          key: "05"
        }
      ],
      projectTypeList: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "IPO",
          key: "01"
        },
        {
          value: "可转债",
          key: "02"
        }
      ],
      stageList: [
        {
          value: "不限",
          key: ""
        },
        {
          value: "立项",
          key: "01"
        },
        {
          value: "辅导",
          key: "02"
        },
        {
          value: "申报",
          key: "03"
        }
      ]
    };
  },
  methods: {
    inputValue(value) {
      //子组件传过来的值
      var name = value.name;
      switch (name) {
        case "registeredCapital": //注册资金
          this.form_data.MinRegCptl = value.min;
          this.form_data.MaxRegCptl = value.max;
          break;
        default:
          break;
      }
    },
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        // case 1: //客户类型
        //   if (
        //     this.form_data.customerType[0] == "01" &&
        //     this.form_data.customerType.length > 1
        //   ) {
        //     this.form_data.customerType.splice(0, 1);
        //   }
        //   if (item.value == "不限") {
        //     this.form_data.customerType.splice(0);
        //     this.form_data.customerType.push("");
        //   }
        //   break;
        case 2: //企业性质
          if (
            this.form_data.enterpriseNature[0] == "" &&
            this.form_data.enterpriseNature.length > 1
          ) {
            this.form_data.enterpriseNature.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.enterpriseNature.splice(0);
            this.form_data.enterpriseNature.push("");
          }
          break;
        case 3: //项目类型
          if (
            this.form_data.projectType[0] == "" &&
            this.form_data.projectType.length > 1
          ) {
            this.form_data.projectType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.projectType.splice(0);
            this.form_data.projectType.push("");
          }
          break;
        case 4: //所处阶段
          if (
            this.form_data.stage[0] == "" &&
            this.form_data.stage.length > 1
          ) {
            this.form_data.stage.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.stage.splice(0);
            this.form_data.stage.push("");
          }
          break;
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        advSearchType : "02",//投行
        idNoForAdv : this.form_data.creditCode,//统一社会信息代码
        prjSrc:this.form_data.customerType.toString(),//客户类型
        corpNature:this.form_data.enterpriseNature.toString(),//企业性质
        prjType:this.form_data.projectType.toString(),//项目类型
        prjPhase:this.form_data.stage.toString(),//所处阶段
        regAddr:this.form_data.registeredAddress,//注册地址
        bizDep:this.form_data.department,//投行业务部门
        actualCtrlPer:this.form_data.actualController,//实际控制人
        ourCoRole:this.form_data.role,//实际控制人
        betweenInfo:{
          fromStandingTime:this.form_data.startTime[0] ? this.form_data.startTime[0] : null,//开始时间
          toStandingTime:this.form_data.startTime[1] ? this.form_data.startTime[1] : null,//结束时间
          MinRegCptl:this.form_data.MinRegCptl,//注册资金min
          MaxRegCptl:this.form_data.MaxRegCptl,//注册资金max
        }
      }
      this.$emit("formList",data)
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
