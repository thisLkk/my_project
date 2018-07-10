<template>
  <!-- 360传统页面 银河保险部信息-->
  <div class="yh_DerivativesHeadquartersInfo">
    <div class="project_main">
      <div class="project_title">
        <h3>基本信息</h3>
      </div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户来源:" prop="BJF">
                <el-input :title="form_project.InsureCustSrc" type="text" v-model="form_project.InsureCustSrc" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家庭资产(流动产/房屋车辆等):" label-width="" prop="CXFL">
                <el-input :title="form_project.FamiAsset" type="text" v-model="form_project.FamiAsset" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="经办人:" prop="khfxdj">
                <el-input :title="form_project.ResponPer" type="text" v-model="form_project.ResponPer" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人邮箱:" prop="FXDJYXQ">
                <el-input :title="form_project.ResponPerEmail" type="text" v-model="form_project.ResponPerEmail" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人联系方式:" prop="TTLZGSQ">
                <el-input :title="form_project.ResponPerContactMode" type="text" v-model="form_project.ResponPerContactMode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注:" prop="JZDS">
                <el-input type="textarea" :rows="2" v-model="form_project.Remk" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="project_main">
      <div class="content clearfix">
        <div class="content_one">
          <h3>保险信息</h3>
        </div>
        <div>
          <div class="main_table">
            <el-table :data="LiCaiTableData" highlight-current-row size="mini" style="width: 100%">
              <el-table-column label="投保险种" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsureType }}</div>
                </template>
              </el-table-column>
              <el-table-column label="承保公司" width="" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.Underwriter }}</div>
                </template>
              </el-table-column>
              <el-table-column label="保险单号" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsurBillNo }}</div>
                </template>
              </el-table-column>
              <el-table-column label="投保人" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsurePer }}</div>
                </template>
              </el-table-column>
              <el-table-column label="被保险人" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsuredPer }}</div>
                </template>
              </el-table-column>
              <el-table-column label="受益人" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.PayoffPer }}</div>
                </template>
              </el-table-column>
              <el-table-column label="保险金额/赔偿限额" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsurAmt }}</div>
                </template>
              </el-table-column>
              <el-table-column label="保险费" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsurFee }}</div>
                </template>
              </el-table-column>
              <el-table-column label="保险期限" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.InsurTerm }}</div>
                </template>
              </el-table-column>
              <el-table-column label="理赔信息" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.SettleOfClaimsInfo }}</div>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.Remk }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pagination">
          <el-pagination @size-change="LiCaiSizeChange" @current-change="LiCaiCurrentChange" :current-page.sync="LiCaiCurrentPage"
            :page-sizes="[5, 10, 15, 20]" :page-size="LiCaiPageSize" layout=" sizes, prev, pager, next, jumper" :total="LiCaiTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getinsurancebasicinfo,
  getfamimemberlist,
  getinsuranceinsurelist
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "MilkyWayInsuranceInfo",
  data() {
    return {
      showinput: true, //------------------------------是否可编辑开关（暂无使用）
      form_project: {},
      LiCaiTableData: null, //-------------------------数据（理财）
      LiCaiCurrentPage: 1, //--------------------------当前页（理财）
      LiCaiPageSize: 10, //----------------------------展示页（理财）
      LiCaiTotal: null //------------------------------总数据（理财）
    };
  },
  created() {
    this.ShareCustomersInit(); //----------------------加载初始化数据
  },
  methods: {
    MemberRelaWord(code) {
      return dictFilter(DICTYPE.CTCCD0026, code); //--------关系类型
    },
    // ------------------------------------------------数据请求
    ShareCustomersInit(val) {
      var param = {
        pageInfo: {
          pageNum: this.LiCaiCurrentPage,
          pageSize: this.LiCaiPageSize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          Uuid: this.$store.getters.Uuid_formal
          // Uuid: "6FC7EC992515AA7EE0534947010AD2FC"
        }
      };
      var param1 = {
        pageInfo: {
          pageNum: this.LiuTongCurrentPage,
          pageSize: this.LiuTongPageSize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: this.$store.getters.Uuid_formal
      };
      getinsurancebasicinfo(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.form_project = response.Data;
            //-----------------------------------------------客户风险
            this.form_project.RiskEndureAbility = dictFilter(
              DICTYPE.OSPCD0246,
              this.form_project.RiskEndureAbility
            );
            //-----------------------------------------------客户状态 OrgName1
            this.form_project.CustSts = dictFilter(
              DICTYPE.EDW10030,
              this.form_project.CustSts
            );
            if (this.form_project.OrgName1 == "1") {
              this.form_project.OrgName1 = "是";
            } else if (this.form_project.OrgName1 == "0") {
              this.form_project.OrgName1 = "否";
            }
          }
        })
        .catch(() => {});
      getinsuranceinsurelist(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.LiCaiTableData = response.Data;
            this.LiCaiTotal = response.PageInfo.Total;
          }
        })
        .catch(() => {});
    },
    //-------------------------------------------------当前页(理财股)
    LiCaiCurrentChange(val) {
      this.ShareCustomersInit();
    },
    //-------------------------------------------------当前要展示多少条（理财股）
    LiCaiSizeChange(val) {
      this.LiCaiPageSize = val;
      this.ShareCustomersInit();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_DerivativesHeadquartersInfo {
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
    .project_title {
      color: #a7703d;
      font-weight: bold;
      line-height: 20px;
      height: 20px;
      margin: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #eeeee9;
      h3 {
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 2px solid #cf8e3e;
      }
    }
    .content {
      height: 100%;
      .content_one {
        border-left: 2px solid #cf8e3e;
        padding-left: 6px;
        margin: 20px;
        margin-left: 0;
        color: #cf8e3e;
      }
    }
  }
  button {
    margin: 0 3px;
  }
}
</style>
