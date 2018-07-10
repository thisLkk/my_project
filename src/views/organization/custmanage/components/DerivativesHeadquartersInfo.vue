<template>
  <!-- 360传统页面 衍生产品部信息-->
  <div class="yh_DerivativesHeadquartersInfo">
    <div class="project_main">
      <div class="project_title">
        <h3>基本信息</h3>
      </div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户状态:" prop="XYMC">
                <el-input :title="form_project.CustSts" type="text" v-model="form_project.CustSts" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否限售股客户:" prop="HTJE">
                <el-input :title="form_project.OrgName1" type="text" v-model="form_project.OrgName1" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="托管营业部:" prop="BJF">
                <el-input :title="form_project.CustodyBizDept" type="text" v-model="form_project.CustodyBizDept" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户大类:" prop="CXFL">
                <el-input :title="form_project.CorpType" type="text" v-model="form_project.CorpType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户开户日期:" prop="CWGWF">
                <el-input :title="form_project.OpAcctDate" type="text" v-model="form_project.OpAcctDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否愿意提供券源:" prop="khfxdj">
                <el-input :title="form_project.IsProvideVoucher" type="text" v-model="form_project.IsProvideVoucher" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户小类:" prop="FXDJYXQ">
                <el-input :title="form_project.LegPerCate" type="text" v-model="form_project.LegPerCate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销户日期:" prop="TTLZGSQ">
                <el-input :title="form_project.CancelAcctDate" type="text" v-model="form_project.CancelAcctDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户等级:" prop="CXF">
                <el-input :title="form_project.CustLvl" type="text" v-model="form_project.CustLvl" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户风险:" prop="WSJS">
                <el-input :title="form_project.RiskEndureAbility" type="text" v-model="form_project.RiskEndureAbility" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="归属营业部:" prop="YFGMGSDL">
                <el-input :title="form_project.OrgName" type="text" v-model="form_project.OrgName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="股票质押市值（万元）:" prop="GPSZJZDS">
                <el-input :title="form_project.StkPledgeMktVal" type="text" v-model="form_project.StkPledgeMktVal" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="竞争对手:" prop="JZDS">
                <el-input type="textarea" :rows="2" v-model="form_project.OpponentInfo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="客户投资服务:" prop="KHTZFW">
                <el-input type="textarea" :rows="2" v-model="form_project.InvestRequire" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="客户融资服务:" prop="KHRZFW">
                <el-input type="textarea" :rows="2" v-model="form_project.FinRequire" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="project_main">
      <div class="project_title">
        <h3>交易要素</h3>
      </div>
      <div class="content clearfix">
        <div class="content_one">理财产品</div>
        <div>
          <div class="main_table">
            <el-table :data="LiCaiTableData"  highlight-current-row size="mini" style="width: 100%">
              <el-table-column  label="业务日期" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.BizDate }}</div>
                </template>
              </el-table-column>
              <el-table-column label="资金账户" width="" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.AssetAcct }}</div>
                </template>
              </el-table-column>
              <el-table-column label="产品代码" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.PrjPhase }}</div>
                </template>
              </el-table-column>
              <el-table-column label="产品名称" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.SecAbbr }}</div>
                </template>
              </el-table-column>
              <el-table-column label="持仓数量" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.PrjPhase }}</div>
                </template>
              </el-table-column>
              <el-table-column label="参考盈亏" width="" align="center">
                <template slot-scope="scope">
                  <div>{{ scope.row.RefPl }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
          <div class="pagination">
            <el-pagination @size-change="LiCaiSizeChange" @current-change="LiCaiCurrentChange" :current-page.sync="LiCaiCurrentPage" :page-sizes="[5, 10, 15, 20]"
              :page-size="LiCaiPageSize" layout=" sizes, prev, pager, next, jumper" :total="LiCaiTotal">
            </el-pagination>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getderivativeproductinfo,
  getastsecpositiondetllist
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //----数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
export default {
  name: "DerivativesHeadquartersInfo",
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
          Uuid: this.$store.getters.Uuid_formal,
          // Uuid: "6FC419C53DDEB20EE0534A47010A2C45",
          SharesNature: "1",
          SysCode: "LC"
        }
      };
      getderivativeproductinfo(param)
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
      getastsecpositiondetllist(param)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.LiCaiTableData = response.Data;
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
      }
    }
  }
  button {
    margin: 0 3px;
  }
}
</style>
