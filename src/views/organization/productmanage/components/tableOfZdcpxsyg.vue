<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_tableOfZdsfcp">
    <div class="table_title clearfix">
      <h3 class="fl">产品列表</h3>
      
    </div>
    <div class="main_table">
      <el-table :data="tableData" class="yh_table_auto_f" stripe size="mini" max-height=800 style="width: 100%">
        <el-table-column label="产品代码" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">
                <a href="javascript:void(0)" @click="openDetail(scope.row)">
                  {{ scope.row.PrdCode }}
                </a></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.PrdName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{scope.row.PrdName}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="产品分类" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ prdClassFormatter(scope.row.PrdClass) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ prdClassFormatter(scope.row.PrdClass) }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="销售限额（万）" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{ scope.row.ProxyLmtTopLmt }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="已预约金额（万）" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.ProxyLmtTopLmt }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.ProxyLmtTopLmt }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column label="认购开始日期" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CallBeginDate | filterFormatTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CallBeginDate | filterFormatTime}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="认购结束日期" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CallBeginDate | filterFormatTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CallEndDate | filterFormatTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="认购费率" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">
                <a href="javascript:void(0)" @click="openDetail(scope.row)">
                {{ scope.row.CallExps && '详见产品详情'}}</a>
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="管理费" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{ scope.row.PrdScale }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发行范围" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{scope.row.IsFullWebIssue==1?'所有机构都适用':scope.row.SaleScope }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.IsFullWebIssue==1?'所有机构都适用':scope.row.SaleScope }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="产品管理人" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.PrdManager }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.PrdManager }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="证券方风险等级" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{scope.row.SecSideRiskGdes | productFilter(dictypeObj.EDW20799, scope.row.SecSideRiskGde)}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{scope.row.SecSideRiskGdes | productFilter(dictypeObj.EDW20799, scope.row.SecSideRiskGdes)}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="销售政策" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{scope.row.SalePolicy}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.SalePolicy }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>


    <el-row>
        <div class="yh_pagination_f">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="form_data.pageInfo.PageNum" :page-sizes="[5, 10, 15, 20]"
            :page-size="form_data.pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="form_data.pageInfo.Total">
          </el-pagination> 
        </div>
    </el-row>

    </div>
      
  <!-- 公募基金详情页  弹出窗口 -->
  <pDetailPubliclyOfferedFunds :detailResultData="detailResultData" :showD="detailPubliclyOfferedFunds"  @closeDetail="closeDetail">
  </pDetailPubliclyOfferedFunds>
  
  <!-- 私募基金详情页  弹出窗口 -->
  <pDetailPrivatelylyOfferedFunds :detailResultData="detailResultData" :showD="detailPrivatelylyOfferedFunds"  @closeDetail="closeDetail">
  </pDetailPrivatelylyOfferedFunds>
 
  <!-- 理财产品详情页  弹出窗口 -->
  <pDetailFinanceProducts :detailResultData="detailResultData" :showD="detailFinanceProducts"  @closeDetail="closeDetail">
  </pDetailFinanceProducts>
 
  <!-- 专户产品详情页  弹出窗口 -->
  <pDetailSpecialAccount :detailResultData="detailResultData" :showD="detailSpecialAccount"  @closeDetail="closeDetail">
  </pDetailSpecialAccount> 

  <!-- 资管产品详情页  弹出窗口 -->
  <pDetailAssetsManagement :detailResultData="detailResultData" :showD="detailAssetsManagement"  @closeDetail="closeDetail">
  </pDetailAssetsManagement> 

  <!-- 信托产品详情页  弹出窗口 -->
  <pDetailEntrust :detailResultData="detailResultData" :showD="detailEntrust"  @closeDetail="closeDetail">
  </pDetailEntrust> 

  <!-- 服务产品详情页  弹出窗口 -->
  <pDetailService :detailResultData="detailResultData" :showD="detailService"  @closeDetail="closeDetail">
  </pDetailService>

  <!-- 实物贵金属详情页  弹出窗口 -->
  <pDetailPreciousMetal :detailResultData="detailResultData" :showD="detailPreciousMetal"  @closeDetail="closeDetail">
  </pDetailPreciousMetal>
  </div>
</template>

<script>
/** 详情页导入 */
import pDetailPubliclyOfferedFunds from "./pDetailPubliclyOfferedFunds";
import pDetailPrivatelylyOfferedFunds from "./pDetailPrivatelylyOfferedFunds";
import pDetailFinanceProducts from "./pDetailFinanceProducts";
import pDetailSpecialAccount from "./pDetailSpecialAccount";
import pDetailAssetsManagement from "./pDetailAssetsManagement";
import pDetailEntrust from "./pDetailEntrust";
import pDetailService from "./pDetailService";
import pDetailPreciousMetal from "./pDetailPreciousMetal";
import { getImportProductList } from "@/api/organization/productmanage/index.js";
import { detailQuery, detailShow } from "./detailHandle.js";
import { dictFilter, dictItems, isObj } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";

export default {
  name: "PrdNameTable",
  components: {
    pDetailPubliclyOfferedFunds,
    pDetailPrivatelylyOfferedFunds,
    pDetailFinanceProducts,
    pDetailSpecialAccount,
    pDetailAssetsManagement,
    pDetailEntrust,
    pDetailService,
    pDetailPreciousMetal
  },
  data() {
    return {
      /** 定义详情页显示隐藏标识 */
      detailPubliclyOfferedFunds: false, //公募基金
      detailPrivatelylyOfferedFunds: false, //私募基金
      detailFinanceProducts: false, //理财产品
      detailSpecialAccount: false, //专户产品
      detailAssetsManagement: false, //资管产品
      detailEntrust: false, //信托产品
      detailService: false, //服务产品
      detailPreciousMetal: false, //实物贵金属
      detailResultData: {}, //查询详情的data
      dictypeObj: DICTYPE, // 数据字典
      prdClass: "",
      form_data: {
        pageInfo: {
          PageNum: 1,
          PageSize: 10,
          Total: 0,
          OrderBy: "",
          Pages: 0
        },
        param: {
          LblCode: "ZDCPXSYG"
        }
      },
      tableData: [],
      getDataOff: true
    };
  },
  methods: {
    //产品分类转码
    prdClassFormatter(code) {
      return dictFilter(DICTYPE.OSPCD0232, code);
    },

    //证券方风险等级
    SecSideRiskGdesFormatter(code) {
      return dictFilter(DICTYPE.EDW20799, code);
    },

    init() {
      this.doQuery();
    },

    /**
     * 每页数量改变
     * val pageSize
     */
    handleSizeChange(val) {
      this.$nextTick(() => {
        this.form_data.pageInfo.PageSize = val;
        if (this.getDataOff) {
          this.getDataOff = false;
          this.doQuery();
        }
      });
    },

    /**
     * 点击页，监听页码变化
     */
    handleCurrentChange() {
      this.getDataOff && this.doQuery();
    },

    /**
     * 查询详情
     * row 查询参数
     */
    openDetail(row) {
      //调用接口获取数据
      console.log(row.SaleSys);
      if (row.SaleSys == "") {
        this.$alert("暂无产品详情", "温馨提示", {
          confirmButtonText: "取消"
        });
        return;
      }
      detailQuery(row)
        .then(result => {
          if (isObj(result)) {
            this.detailResultData = result;
            let showFlag = detailShow(row);
            switch (showFlag) {
              case "1": //公募基金
                this.detailPubliclyOfferedFunds = true;
                break;
              case "2": //私募基金
                this.detailPrivatelylyOfferedFunds = true;
                break;
              case "3": //理财产品
                this.detailFinanceProducts = true;
                break;
              case "4": //专户产品
                this.detailSpecialAccount = true;
                break;
              case "5": //资管产品
                this.detailAssetsManagement = true;
                break;
              case "6": //信托产品
                this.detailEntrust = true;
                break;
              case "7": //服务产品
                this.detailService = true;
                break;
              case "8": //实物贵金属
                this.detailPreciousMetal = true;
                break;
              default:
                //默认产品
                this.detailPubliclyOfferedFunds = true;
            }
          } else {
            this.$alert("暂无产品详情", "温馨提示", {
              confirmButtonText: "取消"
            });
          }
        })
        .catch(error => {});
    },

    /**
     * 查询列表
     */
    doQuery() {
      getImportProductList(this.form_data)
        .then(response => {
          if (response.Data) {
            this.tableData = response.Data;
            this.form_data.pageInfo = response.PageInfo;
          }
          this.getDataOff = true;
        })
        .catch(() => {
          this.getDataOff = true;
          this.$message.error("访问出错");
        });
    },

    //弹出详情页 点击关闭之后的回调方法
    closeDetail() {
      //此处不再单独做判断处理  全部做隐藏处理
      this.detailPubliclyOfferedFunds = false; //公募基金
      this.detailPrivatelylyOfferedFunds = false; //私募基金
      this.detailFinanceProducts = false; //理财产品
      this.detailSpecialAccount = false; //专户产品
      this.detailAssetsManagement = false; //资管产品
      this.detailEntrust = false; //信托产品
      this.detailService = false; //服务产品
      this.detailPreciousMetal = false; //实物贵金属
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.yh_tableOfZdsfcp {
  margin: 0 20px;
  margin-top: -10px;
  /*ouxinsu*/
  .table_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #eeeee9 solid;
    box-sizing: border-box;
    h3 {
      padding: 0 3px;
      height: 40px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 2px solid #cb6c2f;
    }
    .el_btn {
      margin-right: 20px;
    }
    a {
      margin-right: 15px;
      font-size: 14px;
      color: blue;
      text-decoration: underline;
    }
  }
  .main_table {
    margin-top: 10px;
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
      a {
        color: blue;
        text-decoration: underline;
      }
    }
  }
  .el-table__empty-block {
    .el-table__empty-text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
