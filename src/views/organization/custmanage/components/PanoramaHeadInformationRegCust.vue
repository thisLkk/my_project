<template>
  <div class="yh_PanoramaHeadInformationRegCust yh-jbxx-content">
    <el-form :model="info" ref="form" label-width="177px">
    <el-row>
      <el-col :span="8" class="yh-row">
        <el-form-item label="客户简称:" :title="info.CustName" prop="info.CustName">
          <a href="javascript:void(0)">{{info.CustName}}</a>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证券代码:" prop="info.potentialOrg.StkCode">
          <a href="javascript:void(0)">{{info.potentialOrg.StkCode}}</a>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="万德一级行业：" prop="info.potentialOrg.WindPriIndustry">
          <a href="javascript:void(0)">{{WindPriIndustryFormatter(info.potentialOrg.WindPriIndustry)}}</a>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件类型:" prop="info.CredentialsType">
          <a href="javascript:void(0)">{{CredentialsTypeFormatter(info.CredentialsType)}}</a>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" :title="info.IdNo" prop="info.IdNo">
          <a href="javascript:void(0)">{{info.IdNo}}</a>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="万德二级行业：" prop="info.potentialOrg.WindSndIndustry">
          <a href="javascript:void(0)">{{WindBondSndClassFormatter(info.potentialOrg.WindSndIndustry)}}</a>
           </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8" class="yh-row">
        <el-form-item label="客户类型:" prop="info.RegCustType">
          <a href="javascript:void(0)">{{RegCustTypeFormatter(info.RegCustType)}}</a>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证监会行业分类(大):" prop="info.potentialOrg.CsrcIndustryCatalog">
          <a href="javascript:void(0)">{{CsrcIndustryCatalogFormatter(info.potentialOrg.CsrcIndustryCatalog)}}</a>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证监会行业分类(中):" prop="info.potentialOrg.CsrcIndustryMidClass">
          <a href="javascript:void(0)">{{CsrcIndustryMidClassFormatter(info.potentialOrg.CsrcIndustryMidClass)}}</a>        
        </el-form-item>
      </el-col>
    </el-row>
    <div class="Label"> 
      <!-- <div class="clearfix">
        <p class="condition" :style="onresizeP">条线标签</p>
        <div v-if="info.IsBrokersBizLine==1 || info.IsAmbDep==1 || info.IsInvestBankDep==1 || info.IsBondInvestDep==1
        || info.IsFutureDep==1 || info.IsInsurDep==1 || info.IsFundDep==1 || info.IsInternationalDep==1" :style="onresizeDiv">
          <span>:</span>
          <span v-if="info.IsBrokersBizLine==1">经纪业务</span>
          <span v-if="info.IsAmbDep==1">资管</span>
          <span v-if="info.IsInvestBankDep==1">投行</span>
          <span v-if="info.IsBondInvestDep==1">自营</span>
          <span v-if="info.IsFutureDep==1">期货</span>
          <span v-if="info.IsInsurDep==1">保险</span>
          <span v-if="info.IsFundDep==1">基金</span>
          <span v-if="info.IsInternationalDep==1">国际</span>
        </div>
        <div v-else :style="onresizeDiv">
        <span>:</span>
          <span>暂无</span>
        </div>

      </div> -->
      <!-- <div class="clearfix">
        <p class="business" :style="onresizeP">业务标签</p>
        <div :style="onresizeDiv">
          <span>:</span>
          <span style="margin-left:0;" v-if="info_label.custRightVO !=null">
            <span v-if="info_label.custRightVO.IsSetupCentralTrd==1">集中交易</span>
            <span v-if="info_label.custRightVO.IsSetupCentralTrdVipChnl==1">集中交易VIP通道</span>
            <span v-if="info_label.custRightVO.IsSetupGgt==1">港股通</span>
            <span v-if="info_label.custRightVO.IsSetupGem==1">创业板</span>
            <span v-if="info_label.custRightVO.IsSetupNewThirdBd==1">新三板</span>
            <span v-if="info_label.custRightVO.IsSetupBondPledgeRepo==1">债券质押回购</span>
            <span v-if="info_label.custRightVO.IsSetupAgrBuyback==1">约定购回（金时雨）</span>
            <span v-if="info_label.custRightVO.IsSetupQtPrcRepo==1">报价回购</span>
            <span v-if="info_label.custRightVO.IsSetupStkPledgeRepo==1">股票质押回购</span>
            <span v-if="info_label.custRightVO.IsSetupMercuryNo1==1">水星1号</span>
            <span v-if="info_label.custRightVO.IsSetupMercuryNo2==1">水星2号</span>
            <span v-if="info_label.custRightVO.IsSetupMargin==1">融资融券</span>
            <span v-if="info_label.custRightVO.IsSetupMarginVipChnl==1">融资融券VIP通道</span>
            <span v-if="info_label.custRightVO.IsSetupSop==1">个股期权</span>
            <span v-if="info_label.custRightVO.IsSetupFingAcct==1">理财账户</span>
            <span v-if="info_label.custRightVO.IsSetupShQtPrcRepo==1">上海报价回购（天天利）</span>
            <span v-if="info_label.custRightVO.IsSetupSzQtPrcRepo==1">深圳报价回购（金自来）</span>
            <span v-if="info_label.custRightVO.IsSetupHgt==1">沪港通</span>
            <span v-if="info_label.custRightVO.IsSetupSgt==1">深港通</span>
            <span v-if="info_label.custRightVO.IsSetupStrucFund==1">分级基金</span>
            <span v-if="info_label.custRightVO.IsSetupCentralTrdAcct==1">集中交易账户</span>
            <span v-if="info_label.custRightVO.IsSetupRepo==1">回购业务</span>
            <span v-if="info_label.custRightVO.IsSetupAgrRepoJsy==1">约定回购金时雨</span>
            <span v-if="info_label.custRightVO.IsSetupSuspendListBond==1">暂停上市债券</span>
            <span v-if="info_label.custRightVO.IsSetupTtlAutoPurs==1">天天利自动申购</span>
            <span v-if="info_label.custRightVO.IsSetupIb==1">IB业务</span>
            <span v-if="info_label.custRightVO.IsSetupPb==1">PB业务</span>
            <span v-if="info_label.custRightVO.IsSetupOpFundAcct==1">开放式基金账户</span>
            <span v-if="info_label.custRightVO.IsSetupDelistStk==1">退市整理股票</span>
            <span v-if="info_label.custRightVO.IsSetupPr==1">质押式回购</span>
            <span v-if="info_label.custRightVO.IsSetupPrivDebt==1"> 深市私募债投资者</span>
            <span v-if="info_label.custRightVO.IsSetupSmallStkPrXyy==1"> 小额股票质押式回购（鑫易雨）</span>
            <span v-if="info_label.custRightVO.IsSetupBondBuyback==1"> 债券质押式协议（正回购）</span>
            <span v-if="info_label.custRightVO.IsSetupBondReverseRepo==1"> 债券质押式协议（逆回购）</span>
            <span v-if="info_label.custRightVO.IsSetupAssetSupSec==1">资产支持证券</span>
            <span v-if="info_label.custRightVO.IsSetupCentralTrdVipChnl==1">风险警示板</span>
            <span v-if="info_label.custRightVO.IsSetupListCoQual==1">挂牌公司合格投资者</span>
            <span v-if="info_label.custRightVO.IsSetupListCoRestred==1">挂牌公司受限投资者</span>
            <span v-if="info_label.custRightVO.IsSetupStaqnetAndDelist==1">两网和退市投资者</span>
            <span v-if="info_label.custRightVO.IsSetupBondQual==1">债券合格投资者</span>
            <span v-if="info_label.custRightVO.EifbCustnum==1"> 股权激励行权融资业务</span>
          </span>
          <span style="margin-left:0;display: inline-block;" v-else-if="info_label.custLblHandiworkBizVO !=null">
            <span v-if="info_label.custLblHandiworkBizVO.Jdz==1"> 金大宗</span>
            <span v-if="info_label.custLblHandiworkBizVO.OffSiteOption==1"> 场外期权</span>
            <span v-if="info_label.custLblHandiworkBizVO.PayoffExchange==1"> 收益互换</span>
            <span v-if="info_label.custLblHandiworkBizVO.BuyAttrnSale==1"> 买入转售</span>
            <span v-if="info_label.custLblHandiworkBizVO.StkCustodySale==1"> 股票寄售</span>
            <span v-if="info_label.custLblHandiworkBizVO.IndustryCompanyResearch==1"> 投资研究-行业公司研究</span>
            <span v-if="info_label.custLblHandiworkBizVO.BondResearch==1"> 投资研究-债券研究</span>
            <span v-if="info_label.custLblHandiworkBizVO.FinlResearch==1"> 投资研究-金融工程研究</span>
            <span v-if="info_label.custLblHandiworkBizVO.EconomyResearch==1"> 投资研究-宏观经纪研究</span>
            <span v-if="info_label.custLblHandiworkBizVO.MktStrgyResearch==1"> 投资研究-市场策略研究</span>
            <span v-if="info_label.custLblHandiworkBizVO.FundResearch==1"> 基金研究</span>
            <span v-if="info_label.custLblHandiworkBizVO.FundAppraise==1"> 基金评价</span>
            <span v-if="info_label.custLblHandiworkBizVO.FundData==1"> 基金数据</span>
            <span v-if="info_label.custLblHandiworkBizVO.FundMngCompany==1"> 机构销售-基金管理公司</span>
            <span v-if="info_label.custLblHandiworkBizVO.InsurCompany==1"> 机构销售-保险公司</span>
            <span v-if="info_label.custLblHandiworkBizVO.Qfii==1"> 机构销售-QFII</span>
            <span v-if="info_label.custLblHandiworkBizVO.Ipo==1"> IPO</span>
            <span v-if="info_label.custLblHandiworkBizVO.ReFin==1"> 再融资</span>
            <span v-if="info_label.custLblHandiworkBizVO.Ma==1"> 并购重组</span>
            <span v-if="info_label.custLblHandiworkBizVO.GeneralFinanceAdviser==1"> 一般财务顾问</span>
            <span v-if="info_label.custLblHandiworkBizVO.ObliRightFin==1"> 债权融资 </span>
            <span v-if="info_label.custLblHandiworkBizVO.ShareTrfFin==1"> 全国股转系统融资 </span>
            <span v-if="info_label.custLblHandiworkBizVO.PlateAreaFin==1"> 四板及区域融资</span>
            <span v-if="info_label.custLblHandiworkBizVO.CptlMkt==1"> 资本市场</span>
          </span>
          <span v-else style="line-height:0;">暂无</span>
        </div>
      </div> -->
      <!-- <div class="clearfix">
        <p class="group" :style="onresizeP">客户分组</p>
        <div v-if="group.length>0" :style="onresizeDiv">
          <span>:</span>
          <span v-for="(item,index) in group" :key="index">{{item.GrpDesc}}</span>
        </div>
        <div v-else :style="onresizeDiv">
          <span>:</span>
          <span>暂无</span>
        </div>
      </div> -->
    </div>


  </el-form>
  </div>
</template>
<script>
import { dictFilter,dictItems } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";

export default {
  name: 'PanoramaHeadInformationRegCust',  
  props:{
    info:{
      type:Object,
      default:""
    },
    info_label:{
      type:Object,
      default:""
    }
  },
  data() {
    return {
      onresizeDiv: null,
      onresizeP: null,
      infoSwitch:true,
      group: [],
      input0_items: [{ label: '经纪', value: '1' }, { label: '资管', value: '2' }, { label: '投行', value: '3' }, { label: '自营', value: '4' }],
      input1_items: [{ label: '融资融券', value: '1' }, { label: '潜力vip', value: '2' }, { label: '潜在金大宗', value: '3' }],
      input2_items: [{ label: '创业板', value: '1' }, { label: 'B股', value: '2' }, { label: '沪港通', value: '3' }, { label: '深港通', value: '4' }, { label: '新三板', value: '5' }, { label: '金大宗', value: '6' }],

    }
  },
  methods: {

    
      //一级行业转码
      WindPriIndustryFormatter(code){
        return dictFilter(DICTYPE.CTCCD0232,code);
      },

      //二级行业转码
      WindBondSndClassFormatter(code){
        return dictFilter(DICTYPE.CTCCD0233,code);
      },

      //证件类型转码
      CredentialsTypeFormatter(code){
        return dictFilter(DICTYPE.EDW10031,code);
      },

      //证监会行业分类(大)转码
      CsrcIndustryCatalogFormatter(code){
        return dictFilter(DICTYPE.CTCCD0234,code);
      },

      //证监会行业分类(中)转码
      CsrcIndustryMidClassFormatter(code){
        return dictFilter(DICTYPE.CTCCD0235,code);
      },

      //客户类型转码
      RegCustTypeFormatter(code){

        if('1' == code){
          return '上市';
        }else if('2' == code){
          return '非上市';
        }else if('0'==code){
          return '个人';
        }
      },


  },
  mounted: function () {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.yh_PanoramaHeadInformationRegCust{
  padding-top: 20px;
}
.yh_PanoramaHeadInformationRegCust .el-row .el-form-item__content a
{
  display: inline-block;
  width: 120%;
  height: 28px;
  line-height: 28px;
  text-indent: 1em;
  color: #999999;
  background: #fcfcfc;
  border-radius: 3px;
  overflow: hidden;
  font-size:12px;
  font-family:"微软雅黑";
}

#yh-input {
  width: 140px;
  height: 24px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
}
#yh-small-input {
  width: 46px;
  height: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}
#yh-middle-input {
  width: 65px;
  height: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}
#yh-large-input{
  width: 85px;
  height: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}
.yh-row{
  height:37px;

}
label{
  width: auto !important;
}
span{
  color:#606266;
}
.wideFont{
  font-weight: 700;
  font-size: 12px;

  color:red;
}

span[data-v-e8bdabc8]{
  width: 90%;
  overflow: hidden;
}
.el-tag{
  transition-delay: "asdfasdf";
}
.yh-border-radius-30{
  border-radius: 30px;
  padding-right:10px;
  width: auto !important;
}

  .Label {
    padding-left: 12%;
    div {
      p {
        float: left;
        line-height: 30px;
        text-align: right;
        color: #ffffff;
        overflow: hidden;
        padding-right: 8px;
      }
      div {
        overflow: hidden;
        margin-left: 5px;
        margin-right: 3px;
        color: #999999;
        span {
          line-height: 30px;
          text-indent: 1em;
          margin: 0 5px;
        }
      }
    }
  }
  .condition {
    font-size: 12px;
    background: url("~@/assets/organization/customermanage/bq-bg_tj.png")
      no-repeat;
    background-position: right center;
  }
  .business {
    font-size: 12px;
    background: url("~@/assets/organization/customermanage/bq-bg_yw.png")
      no-repeat;
    background-position: right center;
  }
  .group {
    font-size: 12px;
    background: url("~@/assets/organization/customermanage/bq-bg_bm.png")
      no-repeat;
    background-position: right center;
  }
</style>


