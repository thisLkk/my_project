<template>
  <div class="yh_ProductTab">
    <!-- 我的正式客户，产品页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
     
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务类型:" prop="serveraType">
            <el-checkbox-group v-model="form_data.serveraType">
              <el-checkbox-button :key="item.key" :label="item.key"  @change="checkedChange(item,1)"  v-for="item in serveraTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="机构业务范围:" prop="organization">
            <el-checkbox-group v-model="form_data.organization">
              <el-checkbox-button :key="item.key" :label="item.key"  @change="checkedChange(item,2)" v-for="item in organizationList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="机构类型:" prop="projectType">
            <el-checkbox-group v-model="form_data.projectType">
              <el-checkbox-button :key="item.key" :label="item.key"  @change="checkedChange(item,3)" v-for="item in projectTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="8">
          <el-form-item label="机构代码:" prop="actualController">
            <el-input placeholder="" v-model="form_data.actualController" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="注册地址:" prop="registerAddress">
            <el-input placeholder="" v-model="form_data.registerAddress" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="办公地址:" prop="officeAddress">
            <el-input placeholder="" v-model="form_data.officeAddress" />
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
  name: "ProductTab",
  components: {
    inputRange
  },
  data() {
    return {
      form_data: {
        registerAddress: "", //注册地址
        actualController: "", //实际控制人
        officeAddress: "", //办公地址
        serveraType: [""], //业务类型
        organization: [""], //机构业务范围
        projectType: [""] //机构类型
      },
      serveraTypeList: [
        //业务类型
        {
          value: "不限",
          key: ""
        },
        {
          value: "PB",
          key: "01"
        },
        {
          value: "外包",
          key: "02"
        },
        {
          value: "代销",
          key: "03"
        },
        {
          value: "托管",
          key: "04"
        }
      ],
      organizationList: [
        //机构业务范围
        {
          value: "不限",
          key: ""
        },
        {
          value: "销售人",
          key: "01"
        },
        {
          value: "发行人",
          key: "02"
        },
        {
          value: "托管人",
          key: "03"
        },
        {
          value: "登记人",
          key: "04"
        },
        {
          value: "证券经纪人",
          key: "05"
        }
      ],
      projectTypeList: [
        //机构类型
        {
          value: "不限",
          key: ""
        },
        {
          value: "证券交易所",
          key: "01"
        },
        {
          value: "银行",
          key: "02"
        },
        {
          value: "基金公司",
          key: "03"
        },
        {
          value: "证券公司",
          key: "04"
        },
        {
          value: "期交所",
          key: "05"
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
            this.form_data.serveraType[0] == "" &&
            this.form_data.serveraType.length > 1
          ) {
            this.form_data.serveraType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.serveraType.splice(0);
            this.form_data.serveraType.push("");
          }
          break;
        case 2: //机构业务范围
          if (
            this.form_data.organization[0] == "" &&
            this.form_data.organization.length > 1
          ) {
            this.form_data.organization.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.organization.splice(0);
            this.form_data.organization.push("");
          }
          break;
        case 3: //机构类型
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
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        advSearchType: "04", //债券
        orgBusinessScope: this.form_data.organization, //机构业务范围
        orgCategory: this.form_data.projectType, //机构类别
        orgNoForProduct: this.form_data.actualController, //机构代码
        regAddr: this.form_data.registerAddress, //归属营业部
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
