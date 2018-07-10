<template>
  <!-- 360传统页面 业务基本信息 投行信息  战略客户信息-->
  <div class="yh_EditableInput">
    <div class="project_main">
      <div class="project_title">基本信息</div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户名称:" prop="XYMC1">
                <el-input :title="form_project.PrjSno" type="text" v-model="form_project.PrjSno" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" prop="XYMC">
                <el-input :title="form_project.CustAbbr" type="text" v-model="form_project.CustAbbr" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记日期:" prop="HTJE">
                <el-input :title="form_project.RegDate" type="text" v-model="form_project.RegDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="拜访日期:" prop="BJF">
                <el-input :title="form_project.VisitDate" type="text" v-model="form_project.VisitDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户经理:" prop="CXFL">
                <el-input :title="form_project.CustMag" type="text" v-model="form_project.CustMag" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户经理电话:" prop="CWGWF">
                <el-input :title="form_project.CustMagPhone" type="text" v-model="form_project.CustMagPhone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户关键联系人:" prop="CXF">
                <el-input :title="form_project.CustKeyContact" type="text" v-model="form_project.CustKeyContact" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户关键联系人电话:" prop="WSJS">
                <el-input :title="form_project.CustKeyContactPhone" type="text" v-model="form_project.CustKeyContactPhone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务:" prop="XMFZR">
                <el-input :title="form_project.Duty" type="text" v-model="form_project.Duty" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="8">
                <el-form-item label="是否董监高:" prop="YWBM">
                  <el-input :title="form_project.Supervisor" type="text" v-model="form_project.Supervisor" disabled></el-input>
                </el-form-item>
              </el-col> -->
            <!-- <el-col :span="8">
                <el-form-item label="所在部门:" prop="TDFZR">
                  <el-input :title="form_project.CompanyProp" type="text" v-model="form_project.CompanyProp" disabled></el-input>
                </el-form-item>
              </el-col> -->
            <!-- <el-col :span="8">
                <el-form-item label="第一大股东占比%:" prop="CLR">
                  <el-input :title="form_project.CsrcIndustryCategory" type="text" v-model="form_project.CsrcIndustryCategory" disabled></el-input>
                </el-form-item>
              </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="第一大股东:" prop="XMZCY">
                <el-input :title="form_project.FstBigStkhld" type="text" v-model="form_project.FstBigStkhld" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际控制人:" prop="XBR">
                <el-input :title="form_project.ActualCtrlPer" type="text" v-model="form_project.ActualCtrlPer" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="支持领导:" prop="LXSJ">
                <el-input :title="form_project.SupLeader" type="text" v-model="form_project.SupLeader" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业注册地:" prop="QYZCD">
                <el-input :title="form_project.CorpRegAddr" type="text" v-model="form_project.CorpRegAddr" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合作单位性质:" prop="HZDWXZ">
                <el-input :title="form_project.CoopUnitNature" type="text" v-model="form_project.CoopUnitNature" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属行业:" prop="SSHY">
                <el-input :title="form_project.BelongsIndustry" type="text" v-model="form_project.BelongsIndustry" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="8">
              <el-form-item label="客户联系地址:" prop="KHLXDZ">
                <el-input :title="form_project.CsrcIndustryMajorCategory" type="text" v-model="form_project.CsrcIndustryMajorCategory" disabled></el-input>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
                <el-form-item label="报告接收邮箱:" prop="BGJSYX">
                  <el-input :title="form_project.CsrcIndustryMajorCategory" type="text" v-model="form_project.CsrcIndustryMajorCategory" disabled></el-input>
                </el-form-item>
              </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="协议名称:" prop="XYMC">
                <el-input :title="form_project.AgtName" type="text" v-model="form_project.AgtName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签署时间:" prop="QSSJ">
                <el-input :title="form_project.AffixToTime" type="text" v-model="form_project.AffixToTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签署代表:" prop="QSDB">
                <el-input :title="form_project.AffixToReprsnt" type="text" v-model="form_project.AffixToReprsnt" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="有效期:" prop="YXQ">
                <el-input :title="form_project.EffTerm" type="text" v-model="form_project.EffTerm" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到期日期:" prop="DQRQ">
                <el-input :title="form_project.MatureDate" type="text" v-model="form_project.MatureDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户说明:" prop="FXSX">
                <el-input :title="form_project.CustRemk" type="text" v-model="form_project.CustRemk" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注:" prop="BZ">
                <el-input type="textarea" :rows="2" v-model="form_project.Remk" disabled></el-input>
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
    getStrategicCooperativeCustomersInfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //-----------------------------------数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
  export default {
    name: "InBackHeadStrategicCooperativeCustomers",
    data() {
      return {
        showinput: true, //------------------------------是否可编辑开关Uuid_formal
        requireUuid: this.$store.getters.Uuid_formal, //-点击人的Uuid
        tableData: null,
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
            // Uuid: this.requireUuid,
            Uuid: "6F7AE5F5A44E50D4E0536F4A010A019F",
            prjSno: "1"
          }
        };
        getStrategicCooperativeCustomersInfo(param)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.form_project = response.Data;
            }
          })
          .catch(() => {});
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /* 股融信息 */

  .yh_EditableInput {
    font-size: 14px;
    min-height: 200px;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 10px;
    position: relative;
    .project_main {
      height: 100%;
      margin-top: 50px;
      .project_title {
        color: #a7703d;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        margin: 10px 0;
        font-size: 14px;
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
