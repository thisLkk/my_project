<template>
  <!-- 360传统页面 产品中心部信息-->
  <div class="yh_ResearchInvestment">
    <div class="project_main">
      <div class="project_title">
        <h3>基本信息</h3>
      </div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="与上市公司关系:" prop="TTLSCKTRQ">
                <el-input type="text" v-model="form_project.ListCompanyRela" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品中心机构代码:" prop="JZLZJDQRQ">
                <el-input type="text" v-model="form_project.PrdCenterOrgCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品中心TA代码:" prop="MGHBJJBS">
                <el-input :title="form_project.PrdCenterTaCode" type="text" v-model="form_project.PrdCenterTaCode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="产品中心英文简称:" prop="CYRQ">
                <el-input type="text" v-model="form_project.PrdCenterEngAbbr" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品中心拼音代码:" prop="JSSYPZ">
                <el-input type="text" v-model="form_project.PrdCenterPhnCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品中心机构类别:" prop="MGGZHGBZ">
                <el-input type="text" v-model="form_project.PrdCenterOrgCate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="机构业务服务:" prop="DQRQ">
                <el-input type="text" v-model="form_project.PrdCenterOrgBizScope" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="私募基金管理人登记编号:" prop="DRBZJ">
                <el-input :title="form_project.PrdCenterPrivFundManager" type="text" v-model="form_project.PrdCenterPrivFundManager" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getformalcustbaseproductinfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //----数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
  export default {
    name: "ProductCenterInfo",
    data() {
      return {
        showinput: true, //------------------------------是否可编辑开关（暂无使用）
        form_project: {}
      };
    },
    created() {
      this.ShareCustomersInit(); //----------------------加载初始化数据
    },
    methods: {
      ShareCustomersInit(val) {
        var param = {
          param: {
            Uuid: this.$store.getters.Uuid_formal
            // Uuid: "6FC419B130F1B20EE0534A47010A2C45"
          }
        };
        getformalcustbaseproductinfo(param)
          .then(response => {
            if (response.Meta.Code == "0000") {
              if (response.Data != null && response.Data.CustExpandInfo != null) {
                this.form_project = response.Data.CustExpandInfo;
              }
            }
          })
          .catch(() => {});
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_ResearchInvestment {
    font-size: 14px;
    min-height: 200px;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 10px;
    position: relative;
    .project_main {
      height: 100%;
      margin-top: 20px;
      padding: 20px 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .project_title {
        color: #a7703d;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        margin: 10px 0;
        font-size: 14px;
        h3 {
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          border-bottom: 2px solid #cf8e3e;
        }
      }
      .content {
        height: 100%;
      }
    }
    button {
      margin: 0 3px;
    }
  }

</style>
