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
        <el-table-column label="销售系统" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ saleSysFormatter(scope.row.SaleSys) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ saleSysFormatter(scope.row.SaleSys) }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="成立日期" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.SetupDate | filterFormatTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.SetupDate | filterFormatTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="到期日期" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.MatureDate | filterFormatTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.MatureDate | filterFormatTime}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="兑付日期" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CashDate | filterFormatTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CashDate | filterFormatTime}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="存续规模(万)" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.SaveHoldScale }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.SaveHoldScale }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="持仓规模(万)" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{ scope.row.PositionScale }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="持有客户名单" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">
                <a href="javascript:void(0)" @click="getAstPrdHoldList(scope.row.PrdCode, scope.row.MatureDate)">
                  <!-- {{ scope.row.PositionScale }} -->
                  客户名单
                </a>
              </el-tag>
            </div>
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

    <el-dialog title="客户名单" :visible.sync="dialogCustList" width="800px">
      <div class="activity_dialog clearfix main_table">
          <el-table :data="dataCustList" class="yh_table_auto_f" stripe size="mini" max-height=800 style="width: 100%">         
            <el-table-column label="客户姓名" width="" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.CustBasicInfoVO.CustFullName}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="持有数量" width="" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.HoldQty}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="持有成本" width="" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.HoldCost}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
             <el-table-column label="产品市值" width="" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.PrdMktVal}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="到期时间" width="" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.EndTime | filterFormatTime}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          @size-change="dialogCustListSizeChange"
          @current-change="dialogCustListCurrentChange"
          :current-page.sync="dialogCustData.pageInfo.PageNum"
          :page-size="dialogCustData.pageInfo.PageSize"
          layout="prev, pager, next, jumper"
          :total="dialogCustData.pageInfo.Total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCustList = false" size="mini" id="yh-cancel">
          <i class="fa fa-close diologBtn"></i> 关 闭</el-button>
      </span>
    </el-dialog>

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
import {detailQuery, detailShow, getAstPrdHoldListFn} from "./detailHandle.js";
import { dictFilter,dictItems, isObj } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";
import  "@/filters/filters.js";

  export default {
    name: "PrdNameTable",
    components:{
      pDetailPubliclyOfferedFunds,
      pDetailPrivatelylyOfferedFunds,
      pDetailFinanceProducts,
      pDetailSpecialAccount,
      pDetailAssetsManagement,
      pDetailEntrust,
      pDetailService,
      pDetailPreciousMetal,
    },
    data() {
      return {
        /** 定义详情页显示隐藏标识 */
        detailPubliclyOfferedFunds:false,//公募基金
        detailPrivatelylyOfferedFunds:false,//私募基金
        detailFinanceProducts:false,//理财产品
        detailSpecialAccount:false,//专户产品
        detailAssetsManagement:false,//资管产品
        detailEntrust:false,//信托产品
        detailService:false,//服务产品
        detailPreciousMetal:false,//实物贵金属
        dialogCustList:false,//名单是否可见
        detailResultData:{},//查询详情的data
        prdClass:"",
        form_data: {
          pageInfo: {
            PageNum: 1,
            PageSize:10,
            Total: 0,
            OrderBy: "",
            Pages: 0
          },
          param: {
            LblCode:"DQZDCP",
            PrdBizScope: '1' // 查询重点销售产品加产品分类字段（6/25日）
          }
        },
        dialogCustData: {
          pageInfo: {
            PageNum: 1,
            PageSize:15,
            Total: 0,
            OrderBy: "",
            Pages: 0
          },
          Param:'' // 产品代码
        },
        tableData: [],
        dataCustList: [], // 人员列表
        MatureDate: '', // 到期日期
        getDataOff: true
      };
    },

    methods: {
      init() {
        // 查询接口
        this.doQuery();
      },

      //产品分类转码
      prdClassFormatter(code){
        return dictFilter(DICTYPE.OSPCD0232,code);
      },

      //销售系统转码
      saleSysFormatter(code){
        return dictFilter(DICTYPE.OSPCD0234,code);
      },

      //每页数量改变
      handleSizeChange(val) {
        this.$nextTick(() => {
          this.form_data.pageInfo.PageSize = val;
          if (this.getDataOff) {
            this.getDataOff = false;
            this.doQuery();
          }
        });
      },

      //点击页
      handleCurrentChange(val) {
        this.getDataOff && this.doQuery();
      },
      
      openDetail(row) {
        //调用接口获取数据
        detailQuery(row).then(result => {
          if (isObj(result)) {
            this.detailResultData = result;
            let showFlag = detailShow(row);
            switch(showFlag){
              case '1'://公募基金
              this.detailPubliclyOfferedFunds = true;
              break;
              case '2'://私募基金
                this.detailPrivatelylyOfferedFunds = true;
                break;
              case '3'://理财产品
                this.detailFinanceProducts = true;
                break;
              case '4'://专户产品
                this.detailSpecialAccount = true;
                break;
              case '5'://资管产品
                this.detailAssetsManagement = true;
                break;
              case '6'://信托产品
                this.detailEntrust = true;
                break; 
              case '7'://服务产品
                this.detailService = true;
                break;
              case '8'://实物贵金属 
                this.detailPreciousMetal = true;
                break;
              default://默认产品
                this.detailPubliclyOfferedFunds = true;
            }
          } else {
            this.$alert('暂无产品详情', '温馨提示', {
              confirmButtonText: '取消'
            });
          }
        });
      },

      /**
       * 获取持有用户名单
       */
      getAstPrdHoldList(PrdCode = '', MatureDate = '') {
        this.dialogCustData.Param = PrdCode;
        this.MatureDate = MatureDate;
        getAstPrdHoldListFn(this.dialogCustData).then((datas = {}) => {
          if (datas) {
            this.dialogCustList = true;
            this.setCustList(datas.Data); // 增加到期时间字段
            this.dialogCustData.pageInfo = datas.PageInfo;
          } else {
            this.$alert('持有用户名单查询失败', '温馨提示', {
              confirmButtonText: '取消'
            });
          }
        }).catch((err) => {
          this.$alert('持有用户名单查询失败', '温馨提示', {
            confirmButtonText: '取消'
          });
        });;
      },

      /**
       * 查询列表
       */
      doQuery(){
        getImportProductList(this.form_data)
        .then(response => {
          if (response.Data) {
            this.tableData = response.Data;
            this.form_data.pageInfo = response.PageInfo;
          }
          this.getDataOff = true;
        })
        .catch(() => {
          this.$message.error("访问出错");
          this.getDataOff = true;
        });
      },

      /**
       * 修改人员列表数据，增加到期时间字段（EndTime）
       */
      setCustList(data = []) {
        for (let k = 0; k < data.length; k++) {
          const client = data[k];
          client.EndTime = this.MatureDate;
        }
        this.dataCustList = data;
      },

      /**
       * 每页多少条数据
       */
      dialogCustListSizeChange(val) {
      },

      /**
       * 当前页数
       */
      dialogCustListCurrentChange(val) {
        this.dialogCustData.pageInfo.PageNum = val || 1;
        this.getAstPrdHoldList(this.dialogCustData.Param, this.MatureDate);
      },

      //弹出详情页 点击关闭之后的回调方法
      closeDetail:function(){
        //此处不再单独做判断处理  全部做隐藏处理
        this.detailPubliclyOfferedFunds=false;//公募基金
        this.detailPrivatelylyOfferedFunds=false;//私募基金
        this.detailFinanceProducts=false;//理财产品
        this.detailSpecialAccount=false;//专户产品
        this.detailAssetsManagement=false;//资管产品
        this.detailEntrust=false;//信托产品
        this.detailService=false;//服务产品
        this.detailPreciousMetal=false;//实物贵金属
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  .yh_tableOfZdsfcp {
    margin:0 20px;
    margin-top:-10px;
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
        font-size:14px;/*ouxinsu ---重要产品销售*/
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
    .page-box{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      display: -webkit-flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .el-table__empty-block{
      .el-table__empty-text{
        font-size: 16px;
        color: #999;
      }
    }
    .el-dialog__footer{
      margin-top: 52px;
    }
  }
</style>
