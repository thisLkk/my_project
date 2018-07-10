<template>
  <div class="yh_ResearchInstituteTab">
    <!-- 我的正式客户，研究所页面搜索页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户类型:" prop="CustomerType">
            <el-checkbox-group v-model="form_data.CustomerType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in CustomerTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系部门:" prop="department">
            <el-input placeholder="请输入联系部门" v-model="form_data.department" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人:" prop="name">
            <el-input placeholder="请输入联系人" v-model="form_data.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="城市:" prop="city">
            <el-input placeholder="请输入城市" v-model="form_data.city" />
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
  name: "ResearchInstituteTab",
  components: {
    inputRange
  },
  data() {
    return {
      form_data: {
        department: "", //联系部门
        name: "", //联系人
        city: "", //城市
        CustomerType: [""] //客户类别
      },
      CustomerTypeList: [
        //客户类别数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "基金公司",
          key: "01"
        },
        {
          value: "商业银行",
          key: "02"
        },
        {
          value: "销售机构",
          key: "03"
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
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        advSearchType: "06", //研究院
        legPerCate: this.form_data.CustomerType.toString(), //客户类别
        researchCenterVO: {
          contactDep:this.form_data.department, //联系部门
          conPer: this.form_data.name, //	联系人
          workAddrLocusCity: this.form_data.city//	城市
        }
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
