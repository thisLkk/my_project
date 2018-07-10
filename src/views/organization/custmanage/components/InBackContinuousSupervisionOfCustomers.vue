<template>
  <!-- 360传统页面 业务基本信息 投行信息  持续督导客户信息-->
  <div class="yh_EditableInput">
      <div class="project_main">
        <div class="project_title">基本信息</div>
        <div class="content clearfix">
          <el-form ref="form_project" :model="form_project" label-width="190px">
              <el-row>
              <el-col :span="8">
                <el-form-item label="项目序号:" prop="XYMC1">
                  <el-input :title="form_project.PrjSno" type="text" v-model="form_project.PrjSno" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户简称:" prop="XYMC">
                  <el-input :title="form_project.CustAbbr" type="text" v-model="form_project.CustAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证券简称:" prop="HTJE">
                  <el-input :title="form_project.SecAbbr" type="text" v-model="form_project.SecAbbr" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="挂牌日期:" prop="BJF">
                  <el-input :title="form_project.ListDate" type="text" v-model="form_project.ListDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属分层:" prop="CXFL">
                  <el-input :title="form_project.BelongsLayer" type="text" v-model="form_project.BelongsLayer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险分类:" prop="CWGWF">
                  <el-input :title="form_project.RiskClass" type="text" v-model="form_project.RiskClass" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="投行团队:" prop="CXF">
                  <el-input :title="form_project.Team" type="text" v-model="form_project.Team" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复核人/辅导员:" prop="WSJS">
                  <el-input :title="form_project.ChkPer" type="text" v-model="form_project.ChkPer" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="督导员:" prop="YWBM">
                  <el-input :title="form_project.Supervisor" type="text" v-model="form_project.Supervisor" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="公司属性:" prop="TDFZR">
                  <el-input :title="form_project.CompanyProp" type="text" v-model="form_project.CompanyProp" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册地:" prop="XMFZR">
                  <el-input :title="form_project.RegAddr" type="text" v-model="form_project.RegAddr" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="定增对接人:" prop="XMZCY">
                  <el-input :title="form_project.PrivPlaceCoinper" type="text" v-model="form_project.PrivPlaceCoinper" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="证监会行业（门类）:" prop="CLR">
                  <el-input :title="form_project.CsrcIndustryCategory" type="text" v-model="form_project.CsrcIndustryCategory" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证监会行业（大类）:" prop="XBR">
                  <el-input :title="form_project.CsrcIndustryMajorCategory" type="text" v-model="form_project.CsrcIndustryMajorCategory" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="wind行业:" prop="LXSJ">
                  <el-input :title="form_project.WindIndustry" type="text" v-model="form_project.WindIndustry" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="督导类型:" prop="FXSX">
                  <el-input :title="form_project.SupervisionType" type="text" v-model="form_project.SupervisionType" disabled></el-input>
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
import { getContinuousSupervisionInfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "InBackContinuousSupervisionOfCustomers",
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
    // -------------------------------------------------数据字典转码
    PrjTypeDictionaries(code) {
      return dictFilter(DICTYPE.CTCCD0092, code); //----项目类型
    },
    PrjPhaseDictionaries(code) {
      return dictFilter(DICTYPE.CTCCD0093, code); //----项目阶段
    },
    // -----------------------------------------------股融列表的的点击事件
    ShareCustomersInit(val) {
      var param = {
        param: {
          Uuid: this.requireUuid,
          prjSno: "1"
        }
      };
      getContinuousSupervisionInfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //-----------------------------------------------督导类型
            this.form_project.SupervisionType = dictFilter(
              DICTYPE.CTCCD0115,
              this.form_project.SupervisionType
            );
            //-----------------------------------------------所属分层
            this.form_project.BelongsLayer = dictFilter(
              DICTYPE.CTCCD0099,
              this.form_project.BelongsLayer
            );
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
