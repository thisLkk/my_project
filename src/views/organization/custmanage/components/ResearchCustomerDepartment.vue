<template>
  <!-- 360传统页面 研究院 投资客户部-->
  <div class="yh_ResearchCustomerDepartment">
    <div class="project_main">
      <div class="project_title">
        <h3>基本信息</h3>
      </div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="资金账户:" prop="XYMC">
                <el-input :title="form_project.CptlAcct" type="text" v-model="form_project.CptlAcct" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资金结算账户开户行名称:" prop="ZJJSZH">
                <el-input :title="form_project.AcctOpAcctBank" type="text" v-model="form_project.AcctOpAcctBank" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户状态:" prop="YWZT">
                <el-input :title="form_project.AcctSts" type="text" v-model="form_project.AcctSts" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户类型:" prop="KHLX">
                <el-input :title="form_project.OpAcctType" type="text" v-model="form_project.OpAcctType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务开始日期:" prop="YWKSRQ">
                <el-input :title="form_project.BizBeginDate" type="text" v-model="form_project.BizBeginDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算账户号:" prop="HTJE">
                <el-input :title="form_project.SettAcctNo" type="text" v-model="form_project.SettAcctNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="国家及地区:" prop="GJJDQ">
                <el-input :title="form_project.Country" type="text" v-model="form_project.Country" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否司法冻结:" prop="SFSFDJ">
                <el-input :title="form_project.IsJudicialFrz" type="text" v-model="form_project.IsJudicialFrz" disabled></el-input>
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
    getresearchorgcustdepinfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //----数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
  export default {
    name: "ResearchCustomerDepartment",
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
            // Uuid: "6FC7EC9923E6AA7EE0534947010AD2FC",
          }
        };
        getresearchorgcustdepinfo(param)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.form_project = response.Data;
                this.form_project.IsJudicialFrz =this.form_project.IsJudicialFrz =='1' ? "是" : this.form_project.IsJudicialFrz =='0' ? "否" :'';//是否有司法冻结
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
  .yh_ResearchCustomerDepartment {
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
