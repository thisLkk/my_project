<template>
  <div style="padding:20px 0;">

    <table width="100%" class="gridtable">
      <tr>
        <td class="titlec" width="16%">昨日净资产</td>
        <td width="16%">{{zformcurent(assertSuminfo.Asset)}}</td>

        <td class="titlec" width="16%">10日均资产</td>
        <td width="16%">{{zformcurent(assertSuminfo.ShareTrfSetupAsset)}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">昨日总资产(含限售股份)</td>
        <td width="16%">{{zformcurent(assertSuminfo.TotlAsset)}}</td>
        <td class="titlec" width="16%">上年平均资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.LastYearAvgAsset):''}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">昨日总负债</td>
        <td width="16%">{{zformcurent(assertSuminfo.Liab)}}</td>

        <td class="titlec" width="16%">20日均资产（分级）</td>
        <td width="16%">{{zformcurent(assertSuminfo.StrucFundSetupAsset)}}</td>


      </tr>


      <tr>
        <td class="titlec" width="16%">本月日均资产</td>
        <td width="16%">{{zformcurent(assertSuminfo.astMVO.AvgAsset)}}</td>

        <td class="titlec" width="16%">20日均资产(两融)</td>
        <td width="16%">{{zformcurent(assertSuminfo.MarginSetupAsset)}}</td>


      </tr>


      <tr>
        <td class="titlec" width="16%">月资产峰值</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.AssetPeak):''}}</td>

        <!--<td class="titlec" width="16%">本月日均资产</td>-->
        <!--<td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.AvgCptlBal):''}}</td>-->


      </tr>


      <tr>
        <td class="titlec" width="16%">年初资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.BegyearAsset):''}}</td>

        <td class="titlec" width="16%">三个月均资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.Recent3MthAvgAsset):''}}</td>

      </tr>


      <tr>
        <td class="titlec" width="16%">年未资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.YearEndAsset):''}}</td>

        <td class="titlec" width="16%">最近三月平均资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.Recent3MthAvgAsset):''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">年均资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.CurryearAvgAsset):''}}</td>

        <td class="titlec" width="16%">最近六月平均资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.Recent6MthAvgAsset):''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">本年平均资产</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.CurryearAvgAsset):''}}</td>

        <td class="titlec" width="16%">年资产峰值</td>
        <td width="16%">{{assertSuminfo.astMVO?zformcurent(assertSuminfo.astMVO.YearAssetPeak):''}}</td>
      </tr>

    </table>
  </div>
</template>

<script>
  import {queryAssertSumry} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {formatCurrency} from "@/utils";


  export default {
    name: "AssertSummary",
    created() {
      this.init();
    },
    data() {
      return {
        assertSuminfo:{}
      };
    },
    methods: {
      zformcurent(my){
        return formatCurrency(my);
      },

      init() {
          var uuid=this.$store.getters.Uuid_formal;
          //var parm={"param":{"uuid":"6CDB6FE8535E5FF1E053DB0C010AD8E2"}};
          var parm={"param":{"uuid":uuid}};
          if(uuid){
            queryAssertSumry(parm)
              .then(response => {
                var rt=response.Data;
                if(rt){
                  this.assertSuminfo =rt ;
                }else{
                  this.assertSuminfo={};
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
    font-size:12px;
    font-family:"微软雅黑";

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
</style>
