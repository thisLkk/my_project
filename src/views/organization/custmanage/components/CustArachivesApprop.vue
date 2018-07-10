<template>
  <div style="padding:20px 0;">

    <table width="100%" class="gridtable">
      <tr>
        <td class="titlec titlec-th" colspan="6" >风测结果</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">专业投资者类型</td>
        <td width="16%">
          {{custAppropInfo.InvestorClass?calInvestType(custAppropInfo.InvestorClass):''}}
        </td>

        <td class="titlec" width="16%">风险测评得分</td>
        <td width="16%">
          {{custAppropInfo.SurveyScore}}
        </td>

        <td class="titlec" width="16%">风险承受能力分类</td>
        <td width="16%">
          {{custAppropInfo.RiskEndureAbility?calRiskClNl(custAppropInfo.RiskEndureAbility):''}}
        </td>
      </tr>

      <tr>
        <td class="titlec" width="16%">是否最低风险承受能力</td>
        <td width="16%">{{custAppropInfo.LowestRiskCateFlag?calYS(custAppropInfo.LowestRiskCateFlag):''}}</td>

        <td class="titlec" width="16%">最近风险测评日期</td>
        <td width="16%">{{custAppropInfo.RecentRiskTestingDateStr}}</td>

        <td class="titlec" width="16%">单位净资产规模(风评)</td>
        <td width="16%">{{custAppropInfo.UnitNetAsset}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">反洗钱等级</td>
        <td width="16%">{{custAppropInfo.AmlGdes?calAmlGdes(custAppropInfo.AmlGdes):''}}</td>

        <td class="titlec" width="16%">最近一次持续风测结果</td>
        <td width="16%">{{custAppropInfo.ContinuedTestingResult}}</td>

        <td class="titlec" width="16%">最近一次持续风测日期</td>
        <td width="16%">{{custAppropInfo.ContinuedTestingDateStr}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">收入来源(风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.IncomeSrc:''}}</td>

        <td class="titlec" width="16%">收入数额、营业收入(风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.BizIncome:''}}</td>

        <td class="titlec" width="16%">投资资产占家庭总资产(风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestOccFamiTotlAsset:''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">债务情况 (风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.DebtInstance:''}}</td>

        <td class="titlec" width="16%">可投资资产额(风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.CanInvestAsset:''}}</td>
      </tr>
    </table>


    <table width="100%" class="gridtable">
      <tr>
        <td class="titlec titlec-th" colspan="6" >投资经验</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">投资经验情况(风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestExperienceInstance:''}}</td>

        <td class="titlec" width="16%">系统内投资超过两年及以上金融产品类型</td>
        <td width="16%">{{custAppropInfo.custAppropIndiVO?calYS(custAppropInfo.custAppropIndiVO.TrdExperienceYear2):''}}</td>

        <td class="titlec" width="16%">投资工作人员配置情况(风评)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestStaffConf:''}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">股票首次交易日期(中登)</td>
        <td width="16%">{{custAppropInfo.custAppropIndiVO?custAppropInfo.custAppropIndiVO.CsdccFstTimeTrdDate:''}}</td>

        <td class="titlec" width="16%">股票首次交易日期(银河)</td>
        <td width="16%">{{custAppropInfo.custAppropIndiVO?custAppropInfo.custAppropIndiVO.YhFstTimeTrdDate:''}}</td>

        <td class="titlec" width="16%">月换手率（%）</td>
        <td width="16%">{{custAppropInfo.custAppropIndiVO?custAppropInfo.custAppropIndiVO.MthAvgTurnover:''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">最近12个月参与和购买不同金融产品的数量</td>
        <td width="16%">{{custAppropInfo.custAppropIndiVO?custAppropInfo.custAppropIndiVO.JoinInFinlPrdQtyMth12:''}}</td>

        <td class="titlec" width="16%">最近12个月股票交易月均交易额（元）</td>
        <td width="16%">{{stkMthAvgTrdAmtMth(custAppropInfo)}}</td>

      </tr>

    </table>


    <table width="100%" class="gridtable">
      <tr>
        <td class="titlec titlec-th" colspan="6" >风险投资偏好</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">交易频率(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.TrdFreq:''}}</td>

        <td class="titlec" width="16%">投资首要目标(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestPrimaryTgt:''}}</td>

        <td class="titlec" width="16%">投资主要目的(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestMainPurposes:''}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">平均月交易额(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.AvgMthTransAmt:''}}</td>

        <td class="titlec" width="16%">投资资产分配(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestAssetDistribute:''}}</td>

        <td class="titlec" width="16%">投资回报用途(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestRepayUsage:''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">购买金融产品数量(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.PurchaseFinlPrdQty:''}}</td>

        <td class="titlec" width="16%">投资额度</td>
        <td width="16%">{{custAppropInfo.InvestLmt}}</td>

        <td class="titlec" width="16%">投资期限(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestTerm:''}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">重点投资品种(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.InvestKind:''}}</td>

        <td class="titlec" width="16%">高收益高风险OR低收益低风险选择(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.PayoffRiskChoice:''}}</td>

        <td class="titlec" width="16%">所承受最大投资损失(风测)</td>
        <td width="16%">{{custAppropInfo.custRiskTestingVO?custAppropInfo.custRiskTestingVO.EndureMaxiumInvestLoss:''}}</td>
      </tr>
    </table>


    <table width="100%" class="gridtable">
      <tr>
        <td class="titlec titlec-th" colspan="6" >学习经历</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">投资知识(风测)</td>
        <td width="16%"></td>

        <td class="titlec" width="16%">投资工作人员金融从业经历，金融知知识学习经历，金融相关证书取得情况(风测)</td>
        <td width="16%"></td>
      </tr>
    </table>

  </div>
</template>

<script>
  import {queryCustAppropInfo} from "@/api/organization/custmanage/formalcustmanage/PanoramicView";
  import {dictFilter,dictItems} from "@/filters";
  import DICTYPE from '@/utils/dictTypes.js';
  import {formatCurrency} from "@/utils";

  export default {
    name: "CustArachivesApprop",
    data() {
      return {
        custAppropInfo:{}
      };
    },
    created() {
      this.init();
    },
    methods: {
      calRiskClNl(code){////风险承受能力分类
        return dictFilter(DICTYPE.EDW20577,code);
      },
      calInvestType(code){//专业投资者类型
        return dictFilter(DICTYPE.EDW20790,code);
      },
      calYS(code){//是否
        return dictFilter(DICTYPE.CTCCD0999,code);
      },
      calAmlGdes(code){//反洗钱等级
        return dictFilter(DICTYPE.EDW20540,code);
      },

      /**
       * 最近12个月股票交易月均交易额（元）
       */
      stkMthAvgTrdAmtMth(val = {}) {
        let stkMthAvgTrdAmtMth = val.custAppropIndiVO ? val.custAppropIndiVO.StkMthAvgTrdAmtMth12 : '';
        if (stkMthAvgTrdAmtMth) {
          return formatCurrency(stkMthAvgTrdAmtMth);
        }
        return '';
      },

      init() {
        var uuid=this.$store.getters.Uuid_formal;
        //var parm={"param":{"uuid":"6E56F9C710512D70E053DB0C010AA53A"}};
        var parm={"param":{"uuid":uuid}};
        queryCustAppropInfo(parm)
          .then(response => {

            var rt=response.Data;
            if(rt){
              this.custAppropInfo =rt ;
            }else{
              this.custAppropInfo={};
            }
          }).catch(() => {

        })
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
    margin-bottom:10px;
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
    font-family: "微软雅黑";
    color:#555;
  }
  .gridtable tr {
    height: 30px;
    line-height: 30px;
  }
  .titlec{
    background-color: #FAF8F9;
    text-align:right;
    font-size:12px;
    font-family:"微软雅黑";
  }
  .titlec-th{
    background:#FFF;
    text-align:left;
    font-weight:bold;
    font-size:13px;
    font-family:"微软雅黑";
  }
  .gridtable td.titlec-th{
    padding:5px;
    font-size:14px;
    color:#cf8e3e;
  }

</style>
