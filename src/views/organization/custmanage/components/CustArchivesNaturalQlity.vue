<template>
  <div style="padding:20px 0;">

    <table width="100%" class="gridtable">
      <tr>
        <td class="titlec" width="16%">分支机构</td>
        <td width="16%">{{calBelog(custNationProperty.OrgNo)}}</td>

        <td class="titlec" width="16%">客户姓名</td>
        <td width="16%">{{custNationProperty.CustFullName}}</td>

      </tr>

      <tr>
        <td class="titlec" width="16%">投资者类型</td>
        <td width="16%">{{calInvestType(custNationProperty.IndividualFlag)}}</td>

        <td class="titlec" width="16%">学历</td>
        <td width="16%">{{custNationProperty.CustIndividualVO?calEdition(custNationProperty.CustIndividualVO.EduCode):''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">国籍</td>
        <td width="16%">{{custNationProperty.CustIndividualVO?calNation(custNationProperty.CustIndividualVO.NatiCode):''}}</td>

        <td class="titlec" width="16%">民族</td>
        <td width="16%">{{custNationProperty.CustIndividualVO?calMz(custNationProperty.CustIndividualVO.NationCode):''}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">证件类型</td>
        <td width="16%">{{calCertType(custNationProperty.CredentialsType)}}</td>

        <td class="titlec" width="16%">证件号码</td>
        <td width="16%">{{custNationProperty.IdNo}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">证件开始有效期</td>
        <td width="16%">{{custCredentials?custCredentials.CredentialsBeginDate:''}}</td>

        <td class="titlec" width="16%">证件结束有效期</td>
        <td width="16%">{{custCredentials?custCredentials.CredentialsEffDt:''}}</td>
      </tr>

    </table>
  </div>
</template>



<script>
  import {queryCustNatureProper} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import { dictItems,dictFilter } from "@/filters"; //数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //数据字典的方法


  export default {
    name: "CustArchivesNaturalQlity",
    data() {
      return {
        custNationProperty:{},
        custCredentials:null
      };
    },
    created() {
      this.init();
    },
    methods: {

      calBelog(code){
        return dictFilter(DICTYPE.CTCCD0998,code);
      },
      calInvestType(code){
        return dictFilter(DICTYPE.EDW10016,code);
      },
      calEdition(code){
        return dictFilter(DICTYPE.EDW10025,code);
      },
      calNation(code){
        return dictFilter(DICTYPE.EDW10007,code);
      },
      calMz(code){
        return dictFilter(DICTYPE.EDW10047,code);
      },
      calCertType(code){
        return dictFilter(DICTYPE.EDW10031,code);
      },


      init() {
        var uuid=this.$store.getters.Uuid_formal;
        var parm={"param":{"uuid":uuid}};
        if(uuid){
          queryCustNatureProper(parm)
            .then(response => {
              this.custNationProperty = response.Data?response.Data:{};
              this.custCredentials=this.custNationProperty.custCredentialsVO?this.custNationProperty.custCredentialsVO[0]:null;
            }).catch(() => {
          })
        }
      },
    }
  };
</script>

<style scoped>
  .gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
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
    font-family: "微软雅黑";
    color: #555;
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
