<template>
  <!-- 360传统页面 研究院 投资研究院-->
  <div class="yh_ResearchInvestment">
    <div class="project_main">
      <div class="project_title"> <h3>基本信息</h3> </div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属行业:" prop="BJF">
                <el-input :title="form_project.Industry" type="text" v-model="form_project.Industry" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="子行业:" prop="CXFL">
                <el-input :title="form_project.ChildIndustry" type="text" v-model="form_project.ChildIndustry" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否调研过:" prop="CWGWF">
                <el-input :title="form_project.IsResearch" type="text" v-model="form_project.IsResearch" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="分析师:" prop="CXF">
                <el-input :title="form_project.ResearchPer" type="text" v-model="form_project.ResearchPer" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否写过报告:" prop="WSJS">
                <el-input :title="form_project.IsRpt" type="text" v-model="form_project.IsRpt" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注:" prop="TDFZR">
                <el-input type="textarea" v-model="form_project.Remk" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="其他:" prop="BZ">
                <el-input type="textarea" :rows="2" v-model="form_project.OthInfo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getresearchinvestdepinfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "ResearchInvestment",
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
          Uuid: this.$store.getters.Uuid_formal,
          // Uuid: "6FC7EC992423AA7EE0534947010AD2FC",
        }
      };
      getresearchinvestdepinfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            this.form_project.IsResearch =this.form_project.IsResearch =='1' ? "是" : this.form_project.IsResearch =='0' ? "否" :'';
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
.yh_ResearchInvestment {
  font-size: 14px;
  min-height: 200px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  position: relative;
  .project_main {
    height: 100%;
    .project_title {
      color: #a7703d;
      font-weight: bold;
      line-height: 20px;
      height: 20px;
      margin: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #eeeeee;
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
