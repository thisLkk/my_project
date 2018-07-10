<template>
  <el-dialog class="p-detail-default" title="产品详情" :visible.sync="showBox" width="960px" @close="doClose">
    <div class="yh_product_detail_title">
     {{detailResultData.PrdName}}
    </div>
    <div class="activity_dialog clearfix yh-tabel-content">
      <el-form :model="detailResultData" label-width="153px" size=" mini">
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品代码:" prop="PrdCode">
            {{detailResultData.PrdCode}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名称:" prop="PrdName">
            {{detailResultData.PrdName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品分类:" prop="PrdClass">
            {{detailResultData.PrdClass | productFilter(dictypeObj.OSPCD0232, detailResultData.PrdClass)}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发行范围:" prop="SaleScope">
            {{detailResultData.IsFullWebIssue==1?'所有机构都适用':detailResultData.SaleScope }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="业绩报酬分成比例:" prop="PerforRewardDivideRatio">
            {{detailResultData.PerforRewardDivideRatio}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证券方风险等级:" prop="SecSideRiskGdes">
            {{detailResultData.SecSideRiskGdes | productFilter(dictypeObj.EDW20799, detailResultData.SecSideRiskGdes)}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="管理费:" prop="MngFee">
            {{detailResultData.MngFee}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售服务费:" prop="SaleSrvFee">
            {{detailResultData.SaleSrvFee}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品管理人:" prop="PrdManager">
            {{detailResultData.PrdManager}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理费分成比例:" prop="MngFeeDivideRatio">
            {{detailResultData.MngFeeDivideRatio}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="赎回费分成比例:" prop="RedeemFeeDivideRatio">
            {{detailResultData.RedeemFeeDivideRatio}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="托管费:" prop="CustodyFee">
            {{detailResultData.CustodyFee}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="准入投资者类型:" prop="AccsInvestorType">
            {{detailResultData.AccsInvestorType | productFilter(dictypeObj.OSPCD0245, detailResultData.AccsInvestorType)}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易时间:">
            {{detailResultData.OpMktTime}} - 
            {{detailResultData.CloseTime}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="参与人数上限:" prop="JoinInAllPerNumTopLmt">
            {{detailResultData.JoinInAllPerNumTopLmt}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="认购起点(万):" prop="IndividualCallAmtBtmLmt">
            {{detailResultData.IndividualCallAmtBtmLmt}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="追加金额(万):" prop="IdvAddCallAmtBtmLmt">
            {{detailResultData.IdvAddCallAmtBtmLmt}}
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="是否允许转让或质押:" prop="var2">
            {{detailResultData.var2}}
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售起始日:" prop="PursBeginDate">
            {{detailResultData.PrdSts==1?detailResultData.CallBeginDate :detailResultData.PursBeginDate | filterFormatTime}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售终止日:" prop="PursEndDate">
            {{detailResultData.PrdSts==1?detailResultData.CallEndDate:detailResultData.PursEndDate | filterFormatTime}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预期收益率:" prop="ExpectPayoffRate">
            {{detailResultData.ExpectPayoffRate}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评价风险等级:" prop="FundAppraiseRiskGdes">
            {{detailResultData.FundAppraiseRiskGdes | productFilter(dictypeObj.OSPCD0246, detailResultData.FundAppraiseRiskGdes)}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
          <el-form-item label="销售限额(万):" prop="ProxyLmtTopLmt">
            {{detailResultData.ProxyLmtTopLmt}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易状态:" prop="TrdSts">
            {{detailResultData.TrdSts | productFilter(dictypeObj.OSPCD0242, detailResultData.TrdSts)}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品状态:" prop="PrdSts">
            {{detailResultData.PrdSts | productFilter(dictypeObj.OSPCD0233, detailResultData.PrdSts)}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投资品种:" prop="InvestKind">
            {{detailResultData.InvestKind | productFilter(dictypeObj.OSPCD0238, detailResultData.InvestKind)}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="投资期限:" prop="PrdInvestTerm">
            {{detailResultData.PrdInvestTerm}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="销售要点:" prop="SaleMainPoint">
            {{detailResultData.SaleMainPoint}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
          <el-form-item label="销售政策:" prop="SalePolicy">
            {{detailResultData.SalePolicy}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="产品咨询:" prop="PrdMag">
            {{detailResultData.PrdMag}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="营销资料链接:" prop="MktgDatumLink">
            {{detailResultData.MktgDatumLink}}
          </el-form-item>
        </el-col>
      </el-row>

      <div class="subscription-amount">
        <span class="list-name">认购金额</span>
        <el-table
          :data="detailResultArr"
          border
          style="width: 100%">
          <el-table-column
            prop="amount"
            label="认购金额（M）（万）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="strategies"
            label="计费策略"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rates"
            label="认购费率（%）">
          </el-table-column>
        </el-table>
      </div>

      <div class="subscription-amount">
        <span class="list-name">申购金额</span>
        <el-table
          :data="pursExpsArr"
          border
          style="width: 100%">
          <el-table-column
            prop="amount"
            label="申购金额(M)（万）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="strategies"
            label="计费策略"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rates"
            label="申购费率（%）">
          </el-table-column>
        </el-table>
      </div>

      <div class="subscription-amount">
        <span class="list-name">赎回费率</span>
        <el-table
          :data="redeemExpsArr"
          border
          style="width: 100%">
          <el-table-column
            prop="amount"
            label="持有时间(Y)（天）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="strategies"
            label="计费策略"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rates"
            label="赎回费率（%）">
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="doClose" size="mini" id="yh-cancel">
        <i class="fa fa-close diologBtn"></i> 关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script scoped>
import { dictFilter,dictItems, amountFormat} from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";
import "@/filters/filters.js";

export default {
  name: "pDetailDefault",
  props: {
    name: {
      type: String,
      default: ""
    },
    showD:{
      type: Boolean,
      default: false,
    },
    detailResultData:{
      type:Object,
      default:{}
    }
  },

  data() {
    return {
      showBox: false,
      dictypeObj: DICTYPE,
      detailResultArr: [], // 认购金额数组
      pursExpsArr: [], // 申购金额数组
      redeemExpsArr: [] // 赎回费率
    };
  },

  watch: {
    /**
     * 监听弹窗关闭变量
     */
    showD: function(val) {
      this.showBox = val;
    },

    /**
     * 监听产品详情数据
     */
    detailResultData: function(val) {
      this.detailResultArr = amountFormat(val.CallExps, 'money');
      this.pursExpsArr = amountFormat(val.PursExps, 'money');
      this.redeemExpsArr = amountFormat(val.RedeemExps, 'time');
    }
  },

  methods: {
    doClose:function(){
      this.$emit('closeDetail');
    }
  },
};
</script>

<style lang="scss">
  .p-detail-default{
    .yh-tabel-content{
      color: #606464;
      font-size: 12px; 
    }
    .yh-form-label{ 
      width:100%;
      text-align:center;
    }
    .yh_product_detail_title{
      text-align: center;
      color: #D1974A;
      font-size: 18px;
    }
    .subscription-amount{
      .el-table--border{
        border: 0;
      }
      .list-name{
        padding-left: 12px;
        font-weight: 100;
        font-size: 14px;
      }
      .has-gutter{
        .is-leaf{
          padding-top: 0;
          padding-bottom: 0;
          background-color: #F4F4F4;
          color: #666666;
        }
        tr{
          th{
            .cell{
              color: #fff;
              text-align: center;
            }
          }
        }
      }
      .el-table__body{
        tbody {
          .el-table__row{
            td {
              padding-top: 0;
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>