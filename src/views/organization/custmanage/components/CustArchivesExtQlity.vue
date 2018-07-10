<template>
  <div style="padding:20px 0;">

    <table width="100%" class="gridtable" v-if="showCont=='per'">
      <tr>
        <td class="titlec" width="16%">开户渠道</td>
        <td width="16%">{{calOpenChannel(perCustExtProperty.OpAcctMode)}}</td>

        <td class="titlec" width="16%">三方存管银行</td>
        <td width="16%">{{perCustExtProperty.CustIndividualVO?calBankCode(perCustExtProperty.CustIndividualVO.TriDepoBankCode):''}}</td>

      </tr>



      <tr>
        <td class="titlec" width="16%">行业子类</td>
        <td width="16%">{{perCustExtProperty.CustIndividualVO?calHyzlx(perCustExtProperty.CustIndividualVO.IndustryChildClass):''	}}</td>

        <td class="titlec" width="16%">职业类型</td>
        <td width="16%">{{perCustExtProperty.CustIndividualVO?calZyCategory(perCustExtProperty.CustIndividualVO.OccupType):''	}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">实际受益人</td>
        <td width="16%">{{perCustExtProperty.CustIndividualVO?perCustExtProperty.CustIndividualVO.ActualCtrlPer:''	}}</td>

        <td class="titlec" width="16%">实际控制人</td>
        <td width="16%">{{perCustExtProperty.CustIndividualVO?perCustExtProperty.CustIndividualVO.PayoffPer:''}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">工作单位</td>
        <td width="16%">{{perCustExtProperty.CustIndividualVO?perCustExtProperty.CustIndividualVO.WorkUnit	:''}}</td>
      </tr>

    </table>

    <table width="100%" class="gridtable" v-if="showCont=='org'">
      <tr>
        <td class="titlec" width="16%">企业类型</td>
        <td width="16%">{{orgCustExtProperty.CorpType?calEnterType(orgCustExtProperty.CorpType):''}}</td>

        <td class="titlec" width="16%">公司性质</td>
        <td width="16%">{{orgCustExtProperty.CorpNature?calEnterXz(orgCustExtProperty.CorpNature):''}}</td>

        <td class="titlec" width="16%">注册日期</td>
        <td width="16%">{{orgCustExtProperty.RegDate}}</td>


      </tr>

      <tr>
        <td class="titlec" width="16%">注册地址</td>
        <td width="16%">{{orgCustExtProperty.RegAddr}}</td>

        <td class="titlec" width="16%">员工人数</td>
        <td width="16%">{{orgCustExtProperty.EmpPerNum}}</td>

        <td class="titlec" width="16%">国税登记证</td>
        <td width="16%">{{orgCustExtProperty.StateTax}}</td>


      </tr>

      <tr>
        <td class="titlec" width="16%">国税证件有效期</td>
        <td width="16%">{{orgCustExtProperty.StateTaxEndDate}}</td>

        <td class="titlec" width="16%">营业执照号</td>
        <td width="16%">{{orgCustExtProperty.BusLicense}}</td>

        <td class="titlec" width="16%">执照有效期</td>
        <td width="16%">{{orgCustExtProperty.BusLicenseEndDate}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">主年检日期:</td>
        <td width="16%">{{orgCustExtProperty.BusLicenseInspectDate}}</td>


        <td class="titlec" width="16%">组织机构代码</td>
        <td width="16%">{{orgCustExtProperty.Organization}}</td>


        <td class="titlec" width="16%">代码证有效期</td>
        <td width="16%">{{orgCustExtProperty.OrganizationEndDate}}</td>

      </tr>


      <tr>
        <td class="titlec" width="16%">年检日期:</td>
        <td width="16%">{{orgCustExtProperty.OrganizationInspectDate}}</td>

        <td class="titlec" width="16%">法人代表</td>
        <td width="16%">{{orgCustExtProperty.LegalRepres}}</td>

      </tr>



      <tr>
        <td class="titlec" width="16%">法人证件类型:</td>
        <td width="16%">{{orgCustExtProperty.LegalCredentials?calEnterType(orgCustExtProperty.LegalCredentials):''}}</td>

        <td class="titlec" width="16%">法人证件号码</td>
        <td width="16%">{{orgCustExtProperty.LegalIdNo}}</td>

        <td class="titlec" width="16%">法人证件有效期</td>
        <td width="16%">{{orgCustExtProperty.LegalEndDate}}</td>

      </tr>


      <tr>
        <td class="titlec" width="16%">控股人:</td>
        <td width="16%">{{orgCustExtProperty.Controlling}}</td>

        <td class="titlec" width="16%">实际收益人:</td>
        <td width="16%">{{orgCustExtProperty.PayoffPer}}</td>

        <td class="titlec" width="16%">业务办理人</td>
        <td width="16%">{{orgCustExtProperty.BusinessOperator}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">办理人证件类型:</td>
        <td width="16%">{{orgCustExtProperty.Transactor?calCertType(orgCustExtProperty.Transactor):''}}</td>

        <td class="titlec" width="16%">办理人证件号码:</td>
        <td width="16%">{{orgCustExtProperty.TransactorIdNo}}</td>

        <td class="titlec" width="16%">办理人证件有效期:</td>
        <td width="16%">{{orgCustExtProperty.TransactorEndDate}}</td>
      </tr>


      <tr>
        <td class="titlec" width="16%">办理人移动电话:</td>
        <td width="16%">{{orgCustExtProperty.TransactorMob}}</td>

        <td class="titlec" width="16%">办理人固定电话:</td>
        <td width="16%">{{orgCustExtProperty.FixPhone}}</td>

        <td class="titlec" width="16%">联系人关系:</td>
        <td width="16%">{{orgCustExtProperty.RelaType}}</td>
      </tr>

      <tr>
        <td class="titlec" width="16%">联系人证件号码:</td>
        <td width="16%">{{orgCustExtProperty.IdNo}}</td>

        <td class="titlec" width="16%">联系人电话号码:</td>
        <td width="16%">{{orgCustExtProperty.Mob }}</td>

        <td class="titlec" width="16%">联系人通信地址:</td>
        <td width="16%">{{orgCustExtProperty.ConactAddr }}</td>
      </tr>
      <tr>
        <td class="titlec" width="16%">资质经营范围:</td>
        <td colspan="5">{{orgCustExtProperty.BusiScope}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

   import {queryOrgCustExtPropery,queryPerCustExtPropery} from "@/api/organization/custmanage/formalcustmanage/PanoramicView";
   import { dictItems,dictFilter } from '@/filters';
   import DICTYPE from '@/utils/dictTypes.js';

   export default {
    name: "CustArchivesExtQlity",
    data() {
      return {
        orgCustExtProperty:{},
        perCustExtProperty:{},
        showCont:""
      };
    },
    created() {
      this.init();
    },

    methods: {
      calHyzlx(code){//行业子类型
        return dictFilter(DICTYPE.EDW20913,code);
      },
      calBankCode(code){//银行代码
        return dictFilter(DICTYPE.EDW100422,code);
      },
      calCgBank(code){
        return dictFilter(DICTYPE.EDW20436,code);
      },
      calZyCategory(code){
        return dictFilter(DICTYPE.EDW20436,code);
      },

      calOpenChannel(code){
          return dictFilter(DICTYPE.EDW20075,code);
      },
      //专业企业类型
      calEnterType(code){
        return dictFilter(DICTYPE.EDW20251,code);
      },
      //企业性质
      calEnterXz(code){
        return dictFilter(DICTYPE.CTCCD0094,code);
      },
      //证件类型
      calCertType(code){
        return dictFilter(DICTYPE.EDW10031,code);
      },

      init() {
        var uuid=this.$store.getters.Uuid_formal;
        this.showCont=this.$store.getters.custType_formal;
        var parm={"param":{"uuid":uuid}};

        if(this.showCont=='org'){
          //var parm={"param":{"uuid":"6E56F9C93DD82D70E053DB0C010AA53A"}};
          //var parm={"param":{"uuid":uuid}};
          if(uuid){
            queryOrgCustExtPropery(parm)
              .then(response => {
                this.orgCustExtProperty = response.Data?response.Data:{};
              }).catch(() => {

            })
          }
        //个人扩展信息
        }else if(this.showCont=='per'){
          //var parm={"param":{"uuid":"6E0A6B3381AB5534E053DB0C010A3B7A"}};
          if(uuid){
            queryPerCustExtPropery(parm)
              .then(response => {
                this.perCustExtProperty = response.Data?response.Data:{};
              }).catch(() => {

            })
          }
        }

      }
    }

  };
</script>

<style scoped>
  .gridtable {
    font-family: verdana,arial,sans-serif;
    border-color: #eee;
    border-collapse: collapse;
    font-size:12px;
    color:#555;
  }

  .gridtable td {
    padding: 3px 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #DBDEE5;
    font-size:12px;
    font-family:"微软雅黑";
    color:#555;
  }
  .gridtable tr {
    height: 30px;
    line-height: 30px;
  }
  .titlec{
    background-color: #FAF8F9;
    text-align:right;
    padding-right:5px;
    font-size:12px;
    font-family:"微软雅黑";
  }
</style>
