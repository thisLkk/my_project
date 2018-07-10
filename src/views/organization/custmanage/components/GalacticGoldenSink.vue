<template>
  <!-- 360-全景-业务信息-银河金汇组件 -->
  <div class="yh_GalacticGoldenSink">
    <div class="project_main" v-if="false">
      <div class="project_title">基本信息</div>
      <div class="content clearfix">
        <el-form ref="form_project" :model="form_project" label-width="190px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户大类:" prop="XYMC1">
                <el-input :title="form_project.PrjSno" type="text" v-model="form_project.PrjSno" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户等级:" prop="XYMC">
                <el-input :title="form_project.CustAbbr" type="text" v-model="form_project.CustAbbr" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户风险:" prop="HTJE">
                <el-input :title="form_project.SecAbbr" type="text" v-model="form_project.SecAbbr" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户小类:" prop="BJF">
                <el-input :title="form_project.ListDate" type="text" v-model="form_project.ListDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户状态:" prop="CXFL">
                <el-input :title="form_project.BelongsLayer" type="text" v-model="form_project.BelongsLayer" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品类型:" prop="CWGWF">
                <el-input :title="form_project.RiskClass" type="text" v-model="form_project.RiskClass" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="管理类型:" prop="CXF">
                <el-input :title="form_project.Team" type="text" v-model="form_project.Team" disabled></el-input>
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
    <div class="project_main">
      <div class="project_title">资产信息</div>
      <div class="content clearfix">
        <el-table :data="tableData" highlight-current-row stripe size="mini" style="width: 100%">
          <el-table-column label="证券简称" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.SecAbbr }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.SecAbbr }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="证券代码" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.StkCode }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.StkCode }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="股东账号" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.StkhldAcct }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.StkhldAcct }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="资产账号" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.AssetAcct }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.AssetAcct }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="股份余额" width="" align="center">
            <template slot-scope="scope">
              {{ scope.row.SharesBal }}
            </template>
          </el-table-column>
          <el-table-column label="持仓成本" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.PositionCost }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.PositionCost }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="成本价" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.CostPrice }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.CostPrice }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="参考盈亏" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.RefPl }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.RefPl }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="盈亏比例" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.RefRate }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.RefRate }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination ">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15 , 20]"
          :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getGalacticGoldenSinkInfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //----数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
  export default {
    name: "GalacticGoldenSink",
    data() {
      return {
        tableData: null, //---------------回显数据(资产信息)
        form_project: {}, //------------基本信息
        currentPage: 1, //----------------当前页
        pagesize: 10, //------------------显示总条数
        total: null //--------------------总条数
      };
    },
    created() {
      this.requireInfo(); //-----------------加载初始化数据
    },
    methods: {
      // // -------------------------------------------------数据字典转码
      // PrjTypeDictionaries(code) {
      //   return dictFilter(DICTYPE.CTCCD0092, code); //----项目类型
      // },
      // PrjPhaseDictionaries(code) {
      //   return dictFilter(DICTYPE.CTCCD0093, code); //----项目阶段
      // },
      // -----------------------------------------------股融列表的的点击事件
      requireInfo(val) {
        var require = {
          pageInfo: {
            pageNum: this.currentPage,
            pageSize: this.pagesize,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            Uuid: this.$store.getters.Uuid_formal,
            orgNo:this.$store.getters.orgid
            // Uuid: "6D16B9B66C3A2FCAE053DB0C010A735F",
          }
        };
        getGalacticGoldenSinkInfo(require)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.tableData = response.Data;
              this.total = response.PageInfo.Total;
            }
          })
          .catch(() => {});
      },
      //----------------------------------------------------------------------当前页
      handleCurrentChange(val) {
        this.requireInfo();
      },
      //----------------------------------------------------------------------当前要展示多少条
      handleSizeChange(val) {
        this.pagesize = val;
        this.requireInfo();
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_GalacticGoldenSink {
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
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

</style>
