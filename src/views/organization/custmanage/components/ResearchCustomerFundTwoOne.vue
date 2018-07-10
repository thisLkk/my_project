<template>
  <!-- 360传统页面 研究院 基金销售机构-->
  <div class="yh_ResearchInvestment">
    <div class="project_main">
      <div class="project_title">
        <h3>基本信息</h3>
      </div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="登记编号:" prop="TTLSCKTRQ">
                <el-input type="text" v-model="form_project.RegNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="机构类型:" prop="MGHBJJBS">
                <el-input :title="form_project.OrgType" type="text" v-model="form_project.OrgType" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="XYCC">
                <el-input :title="form_project.ConPer" type="text" v-model="form_project.ConPer" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="登记时间:" prop="JSSYPZ">
                <el-input type="text" v-model="form_project.RegTime" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系方式:" prop="RZFL">
                <el-input :title="form_project.ContactMode" type="text" v-model="form_project.ContactMode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="管理规模所在区间:" prop="LXRSJ">
                <el-input :title="form_project.RtJzlMature" type="text" v-model="form_project.RtJzlMature" disabled></el-input>
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
    getresearchcenterinfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //----数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
  export default {
    name: "ResearchCustomerFundTwoOne",
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
          pageInfo: {
            pageNum: 1,
            pageSize: 100,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            Uuid: this.$store.getters.Uuid_formal,
            ResearchCenterCustSubcls: "201"
          }
        };
        getresearchcenterinfo(param)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.form_project = response.Data[0];
              this.form_project.RtJzlMature = this.form_project.MngScaleBtmLmt + " - " + this.form_project.MngScaleTopLmt
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
