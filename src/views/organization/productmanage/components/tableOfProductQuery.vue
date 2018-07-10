<template>
  <!-- 产品管理下的产品查询组件L -->
  <div class="yh_tableOfProductQuery">
    <div class="table_title clearfix">
      <h3 class="fl">产品列表</h3>
    </div>
    <div class="main_table">
      <el-table :data="list" class="yh_table_auto_f" stripe size="mini"  @sort-change="sortOrder" max-height=800 style="width: 100%">
        <el-table-column prop="PrdCode" label="产品代码" sortable="custom" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">
                <a href="javascript:void(0)" @click="openDetail(scope.row)">
                  {{scope.row.PrdCode}}
                </a>
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="PrdName" label="产品名称" sortable="custom" width="" align="center">
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
        <el-table-column prop="PrdClass" sortable="custom" label="产品分类" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ prdClassFormatter(scope.row.PrdClass) }}</p>
              <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{ prdClassFormatter(scope.row.PrdClass) }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="PrdTerm" sortable="custom"  label="产品期限" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{ scope.row.PrdTerm }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="PrdScale" sortable="custom" label="产品规模" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.PrdScale }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.PrdScale }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="IndividualCallAmtBtmLmt" sortable="custom" label="认购起点" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.IndividualCallAmtBtmLmt }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.IndividualCallAmtBtmLmt }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="PrdSts" sortable="custom" label="产品状态" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ prdStsFormatter(scope.row.PrdSts) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ prdStsFormatter(scope.row.PrdSts) }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="CallBeginDate" sortable="custom" label="认购日期" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.CallBeginDate | filterFormatTime}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CallBeginDate | filterFormatTime}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="MatureDate" sortable="custom" label="到期日期" width="100" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.MatureDate | filterFormatTime}}</p>
              <div slot="reference" class="name-wrapper">
                 <el-tag size="mini">{{ scope.row.MatureDate | filterFormatTime}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="IntrAccrDate" sortable="custom" label="起息日期" width="120" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.IntrAccrDate | filterFormatTime}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.IntrAccrDate | filterFormatTime}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="CashDate" sortable="custom" label="兑付日期" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CashDate | filterFormatTime}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{scope.row.CashDate | filterFormatTime}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="SaleSys" sortable="custom" label="销售系统" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ saleSysFormatter(scope.row.SaleSys) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{saleSysFormatter(scope.row.SaleSys)}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

    <el-row>
      <div class="yh_pagination_f" v-if="list.length">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.PageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageInfo.PageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.Total">
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
import pDetailPubliclyOfferedFunds from "./pDetailPubliclyOfferedFunds";
import pDetailPrivatelylyOfferedFunds from "./pDetailPrivatelylyOfferedFunds";
import pDetailFinanceProducts from "./pDetailFinanceProducts";
import pDetailSpecialAccount from "./pDetailSpecialAccount";
import pDetailAssetsManagement from "./pDetailAssetsManagement";
import pDetailEntrust from "./pDetailEntrust";
import pDetailService from "./pDetailService";
import pDetailPreciousMetal from "./pDetailPreciousMetal";
import { detailQuery, detailShow } from "./detailHandle.js";
import { dictFilter, dictItems, isObj } from "@/filters";
import "@/filters/filters.js";
import DICTYPE from "@/utils/dictTypes.js";

export default {
  name: "BusinessTable",
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
      detailPubliclyOfferedFunds: false, //公募基金
      detailPrivatelylyOfferedFunds: false, //私募基金
      detailFinanceProducts: false, //理财产品
      detailSpecialAccount: false, //专户产品
      detailAssetsManagement: false, //资管产品
      detailEntrust: false, //信托产品
      detailService: false, //服务产品
      detailPreciousMetal: false, //实物贵金属
      detailResultData: {} //查询详情的data
    };
  },
  props: ["list", "pageInfo"],

  methods: {
    //产品分类转码
    prdClassFormatter(code) {
      return dictFilter(DICTYPE.OSPCD0232, code);
    },

    //产品状态转码
    prdStsFormatter(code) {
      return dictFilter(DICTYPE.OSPCD0233, code);
    },

    //销售系统转码
    saleSysFormatter(code) {
      return dictFilter(DICTYPE.OSPCD0234, code);
    },

    /**
     * 点击产品代码弹窗产品详情
     */
    openDetail: function(row) {
      //调用接口获取数据
      let pc = row.PrdClass.substr(0,2);
      if (pc === '14' || pc !== '09' || pc !== '04' || pc !== '07') {
        if (!row.SaleSys) {
          this.$message.error('暂无产品详情');
          return false;
        }
      };
      detailQuery(row).then(result => {
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
          this.$alert("暂时没有查询到产品详情", "温馨提示", {
            confirmButtonText: "取消"
          });
        }
      });
    },

    //弹出详情页 点击关闭之后的回调方法
    closeDetail(val) {
      //此处不再单独做判断处理  全部做隐藏处理
      this.detailPubliclyOfferedFunds = false; //公募基金
      this.detailPrivatelylyOfferedFunds = false; //私募基金
      this.detailFinanceProducts = false; //理财产品
      this.detailSpecialAccount = false; //专户产品
      this.detailAssetsManagement = false; //资管产品
      this.detailEntrust = false; //信托产品
      this.detailService = false; //服务产品
      this.detailPreciousMetal = false; //实物贵金属
    },

    /**
     * 每页数量改变
     * val pageNum
     */
    handleSizeChange(val) {
      this.$nextTick(() => {
        this.$emit("sizeChange", val);
      });
    },

    /**
     * 点击页 监听页码变化
     */
    handleCurrentChange() {
      this.$emit("pageNumCheng");
    },
    // ----------------------------------------排序
    sortOrder(column, prop, order) {
      var require = {
        SortFld: "",
        SortMode: ""
      };
      switch (column.prop) {
        case "PrdCode":
          require.SortFld = "1";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "PrdName":
          require.SortFld = "2";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "PrdClass":
          require.SortFld = "4";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "PrdTerm":
          require.SortFld = "6";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "PrdScale":
          require.SortFld = "7";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "IndividualCallAmtBtmLmt":
          require.SortFld = "8";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "PrdSts":
          require.SortFld = "10";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "CallBeginDate":
          require.SortFld = "11";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "MatureDate":
          require.SortFld = "12";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "IntrAccrDate":
          require.SortFld = "13";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "CashDate":
          require.SortFld = "14";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;
        case "SaleSys":
          require.SortFld = "15";
          if (column.order == "descending") {
            require.SortMode = "2";
          } else {
            require.SortMode = "1";
          }
          break;

        default:
          break;
      }
      this.$emit("doQuery", require);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.yh_tableOfProductQuery {
  border-top: 1px #eeeee9 solid;
  background-color: #fff;
  padding: 0 20px;
  .table_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #eeeee9 solid;
    box-sizing: border-box;
    h3 {
      padding: 0 3px;
      height: 40px;
      font-size: 14px;
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
