<template>
    <div style="padding:20px 0;">

      <table width="100%" class="gridtable">
        <tr>
          <td class="titlec" width="16%">股票首次交易日期(银河)</td>
          <td width="16%">{{transFlowDetail.YhFstTimeTrdDate}}</td>

          <td class="titlec" width="16%">本年交易量</td>
          <td width="16%">{{zformcurent(transFlowDetail.YearAllMatchAmt)}}</td>

          <td class="titlec" width="16%">上年交易量</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.LastYearAllAmtAmt):''}}</td>
        </tr>

        <tr>
          <td class="titlec" width="16%">股票首次交易日期(中登)</td>
          <td width="16%">{{transFlowDetail.CsdccFstTimeTrdDate}}</td>

          <td class="titlec" width="16%">本月股基周转率</td>
          <td width="16%">
              {{transFlowDetail.trdContrbMVO?transFlowDetail.trdContrbMVO.AssetTurnover+'%':''}}
          </td>

          <td class="titlec" width="16%">本月股基成交量</td>
          <td width="16%">{{transFlowDetail.MthStkFundMatchAmt 	}}</td>
        </tr>

        <tr>
          <td class="titlec" width="16%">最近3个月交易金额</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.RecentMth3StkFundMatchAmt):''}}</td>

          <td class="titlec" width="16%">本月总成交量</td>
          <td width="16%">{{zformcurent(transFlowDetail.MthAllMatchAmt)}}</td>

          <td class="titlec" width="16%">昨日净手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.StkFundNetComm)}}</td>
        </tr>


        <tr>
          <td class="titlec" width="16%">最近6个月交易金额</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.RecentMth6AllMatchAmt):''}}</td>

          <td class="titlec" width="16%">本月股基净手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.MthStkFundNetComm)}}</td>

          <td class="titlec" width="16%">本月股基手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.MthStkFundCms)}}</td>
        </tr>


        <tr>
          <td class="titlec" width="16%">本月服务手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.MthSrvCms)}}</td>

          <td class="titlec" width="16%">本月总净手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.MthStkFundNetComm)}}</td>

          <td class="titlec" width="16%">本月总手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.MthStkFundCms)}}</td>
        </tr>


        <tr>
          <td class="titlec" width="16%">最近3个月总净手续费</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.RecentMth3AllNetComm):''}}</td>

          <td class="titlec" width="16%">最近6个月总手续费</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.RecentMth6AllCms):''}}</td>

          <td class="titlec" width="16%">本年手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.YearStkFundCms)}}</td>
        </tr>


        <tr>
          <td class="titlec" width="16%">最近3个月总手续费</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.RecentMth3AllCms):''}}</td>

          <td class="titlec" width="16%">本年净手续费</td>
          <td width="16%">{{zformcurent(transFlowDetail.YearStkFundNetComm)}}</td>

          <td class="titlec" width="16%">上年净手续费</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.LastYearNetCms):''}}</td>
        </tr>


        <tr>
          <td class="titlec" width="16%">最近6个月总净手续费</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.RecentMth6AllNetComm):''}}</td>

          <td class="titlec" width="16%">上年手续费</td>
          <td width="16%">{{transFlowDetail.trdContrbMVO?zformcurent(transFlowDetail.trdContrbMVO.LastYearCms):''}}</td>

          <td class="titlec" width="16%">最近一笔A股佣金率‰</td>
          <td width="16%">{{transFlowDetail.LastShaCmsRate*1000}}</td>
        </tr>


        <tr>
          <td class="titlec" width="16%">保品买卖佣金率‰</td>
          <td width="16%">{{transFlowDetail.CollateralBsCmsRate*1000}}</td>

          <td class="titlec" width="16%">信用买卖佣金率‰</td>
          <td width="16%">{{transFlowDetail.CrdBsCmsRate*1000}}</td>

          <td class="titlec" width="16%"></td>
          <td width="16%"></td>
        </tr>
      </table>
    </div>
</template>

<script>
  import {queryTransdetail} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {formatCurrency} from "@/utils";

  export default {
    name: "TransinfoFlow",
    data() {
      return {
        transFlowDetail:{}
      };
    },
    created() {
      this.init();
    },
    methods: {

      zformcurent(my){
        return formatCurrency(my);
      },

      init() {
        var uuid=this.$store.getters.Uuid_formal;
        ///var parm={"param":{"uuid":"6CDB6FF691955FF1E053DB0C010AD8E2"}};
        var parm={"param":{"uuid":uuid}};
        if(uuid){
          queryTransdetail(parm)
            .then(response => {
              //this.TransinfoFlow = response.Data;
              var rt=response.Data;
              if(rt){
                this.transFlowDetail =rt ;
              }else{
                this.transFlowDetail={};
              }

            }).catch(() => {

          })
        }
      }
    }
  };
</script>

<style scoped>
  .gridtable {
         font-family: verdana,arial,sans-serif;
         border-width: 1px;
         border-color: #eee;
         border-collapse: collapse;
         font-size:12px;
    font-family:"微软雅黑";
    color:#555;
  }

  .gridtable td {
    padding: 3px 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #DBDEE5;
    font-size: 12px;
    font-family:"微软雅黑";
    color: #555;
  }
  .gridtable tr {
    height: 30px;
    line-height: 30px;
  }
  .titlec{
    background-color: #FAF8F9;
    text-align: right;
    font-size: 12px;
    font-family:"微软雅黑";
  }
</style>
