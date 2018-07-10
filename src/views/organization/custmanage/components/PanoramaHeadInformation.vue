<template>
  <div class="yh_PanoramaHeadInformation">
    <div class="switchClick" :style="!showInfoBox ? 'height:1px;top:0px;':'height:27px;'">
      <el-switch v-model="showInfoBox" @change="paddingChange" active-color="#b3844e" inactive-color="#dddddd">
      </el-switch>
    </div>
    <!-- 个人信息展示区 -->
    <div v-if="showInfoBox" class="info clearfix">
      <ul>
        <li class="clearfix" :style="onresize">
          <span>客户号 :</span>
          <a href="javascript:void(0)">{{info.CustNo}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>客户简称 :</span>
          <a href="javascript:void(0)">{{info.CustName}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>客户类型 :</span>
          <a href="javascript:void(0)">{{info.IndividualFlag == "0" ? "个人" : info.IndividualFlag == "1" ? "机构" : "其他"}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>证件类型 :</span>
          <a href="javascript:void(0)">{{info.CredentialsType !=null ? info.CredentialsType : ""}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>证件号码 :</span>
          <a href="javascript:void(0)">{{info.IdNo !=null ? info.IdNo :""}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>证件开始有效期 :</span>
          <a href="javascript:void(0)">{{info.custCredentialsVO !=null ?info.custCredentialsVO[0].CredentialsBeginDateStr : ""}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>证件结束有效期 :</span>
          <a href="javascript:void(0)">{{info.custCredentialsVO !=null ?info.custCredentialsVO[0].CredentialsEffDtStr : ""}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>是否战略客户 :</span>
          <a href="javascript:void(0)">{{info.StrategyCustFlag =="1"? "是" :'否'}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>机构类型 :</span>
          <a href="javascript:void(0)" title="暂无">暂无</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>重要程度 :</span>
          <a href="javascript:void(0)">{{info.ImpDegree !=null? info.ImpDegree :''}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>行业 :</span>
          <a href="javascript:void(0)">{{info.CustIndividualVO!=null ? srvCateFormatter(info.CustIndividualVO.IndustryCode) :''}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>是否上市公司 :</span>
          <a href="javascript:void(0)" v-if="info.custOrgVO!=null">{{info.custOrgVO.ListProp == "1" ? "是" : "否"}}</a>
          <a href="javascript:void(0)" v-else>暂无信息</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>证劵代码 :</span>
          <a href="javascript:void(0)">{{info.custOrgVO !=null? info.custOrgVO.StkCode :''}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>成立日期 :</span>
          <a href="javascript:void(0)">{{info.custOrgVO !=null? info.custOrgVO.RegDate : ''}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>注册资本（亿元） :</span>
          <a href="javascript:void(0)">{{info.custOrgVO !=null? info.custOrgVO.RegCptl :''}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>注册地点 :</span>
          <a href="javascript:void(0)">{{info.custOrgVO !=null? info.custOrgVO.RegAddr :''}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>主营业务 :</span>
          <a href="javascript:void(0)">{{info.custOrgVO !=null? info.custOrgVO.MainBiz :""}}</a>
        </li>
        <li class="clearfix" :style="onresize">
          <span>归属机构 :</span>
          <a href="javascript:void(0)">{{info.OrgNo !=null ? info.OrgNo :''}}</a>
        </li>
      </ul>
    </div>
    <div>
      <div class="Label" v-if="info_label!=null">
        <div class="clearfix">
          <p class="condition" :style="onresizeP">条线标签</p>
          <div v-if="info_label.custBatvhRightVO !=null" :style="onresizeDiv">
            <span>:</span>
            <span v-if="info_label.custBatvhRightVO.IsBrokersBizLine==1">经纪业务条线</span>
            <span v-if="info_label.custBatvhRightVO.IsAmbDep==1">资管条线</span>
            <span v-if="info_label.custBatvhRightVO.IsInvestBankDep==1">投行条线</span>
            <span v-if="info_label.custBatvhRightVO.IsBondInvestDep==1">自营条线</span>
            <span v-if="info_label.custBatvhRightVO.IsFutureDep==1">期货条线</span>
            <span v-if="info_label.custBatvhRightVO.IsInsurDep==1">保险条线</span>
            <span v-if="info_label.custBatvhRightVO.IsFundDep==1">基金条线</span>
            <span v-if="info_label.custBatvhRightVO.IsInternationalDep==1">国际条线</span>
          </div>
          <div v-else :style="onresizeDiv">
            <span>:</span>
            <span>暂无</span>
          </div>
        </div>
        <div class="clearfix">
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
        </div>
        <div v-if="false" class="clearfix">
          <p class="group" :style="onresizeP">客户分组</p>
          <div v-if="group.length>0" :style="onresizeDiv">
            <span>:</span>
            <span v-for="(item,index) in group" :key="index">{{item.GrpDesc}}</span>
          </div>
          <div v-else :style="onresizeDiv">
            <span>:</span>
            <span>暂无</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getInfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { formatCurrency } from "@/utils/index.js"; //---------------------------转换金额的方法
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
export default {
  name: "PanoramaHeadInformation",
  props: {
    info: {
      type: Object,
      default: ""
    },
    info_label: {
      type: Object,
      default: ""
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      showInfoBox: true, //-----------------------------------------展示或隐藏个人信息
      onresize: null,
      onresizeP: null,
      onresizeDiv: null,
      group: []
    };
  },
  watch: {
    // ------------------------------------------------------------客户分组赋值
    info_label(newinfo_label, oldinfo_label) {
      this.group = this.$props.info_label.custGrpInfoVOList;
    }
  },
  created() {
    //--------------------------------------------------------------监听窗口的变化
    if (this.screenWidth > 1366) {
      this.onresize = {
        width: "33.33%"
      };
      this.onresizeP = {
        width: "13%"
      };
      this.onresizeDiv = {
        width: "82%"
      };
    } else {
      this.onresize = {
        width: "50%"
      };
      this.onresizeP = {
        width: "19%"
      };
      this.onresizeDiv = {
        width: "76%"
      };
    }
    this.info.custOrgVO.RegCptl = formatCurrency(this.info.custOrgVO.RegCptl); //------------------注册资本转换为千分位
    this.info.CredentialsType = dictFilter(
      DICTYPE.EDW10031,
      this.info.CredentialsType
    ); //------=-----------------------------------------------------------------------------------服务类别回显
    this.info.ImpDegree = dictFilter(DICTYPE.CTCCD0213, this.info.ImpDegree); //-------------------重要程度
    this.info.OrgNo = dictFilter(DICTYPE.CTCCD0998, this.info.OrgNo); //---------------------------归属机构
    // --------------------------------------------------------------------------------------------成立日期
    if (this.info.custOrgVO != null) {
      if (this.info.custOrgVO.RegDate != null) {
        var RegDateTime = String(this.info.custOrgVO.RegDate);
        this.info.custOrgVO.RegDate =
          RegDateTime.substring(0, 4) +
          "-" +
          RegDateTime.substring(4, 6) +
          "-" +
          RegDateTime.substring(6, 8);
      }
    } else {
      this.info.custOrgVO.RegDate = "";
    }
    // item.BizCate = dictFilter(DICTYPE.OSPCD0226, item.BizCate); //-------业务类别回显
  },
  mounted() {
    const that = this;
    //-------------------------------------------------------------------------监听窗口的变化
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    paddingChange() {
      this.$emit("paddingChan", this.showInfoBox);
    },
    //------------------------------------------------------------------------行业
    srvCateFormatter(code) {
      return dictFilter(DICTYPE.EDW20504, code);
    },
    init() {
      //-----------------------------------------------------------------------监听窗口的变化
      if (this.screenWidth > 1166) {
        this.onresize = {
          width: "33.33%"
        };
        this.onresizeP = {
          width: "13%"
        };
        this.onresizeDiv = {
          width: "82%"
        };
      } else {
        this.onresize = {
          width: "50%"
        };
        this.onresizeP = {
          width: "19%"
        };
        this.onresizeDiv = {
          width: "76%"
        };
      }
    }
  },
  watch: {
    //-------------------------------------------------------------------------监听窗口的变化
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.init();
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh_PanoramaHeadInformation {
  box-sizing: border-box;
  font-size: 14px;
  position: relative;
  .switchClick {
    position: absolute;
    right: -50px;
    top: -20px;
    width: 100%;
    height: 27px;
    text-align: right;
    line-height: 40px;
  }
  .info {
    margin-top: 20px;
    ul {
      li {
        height: 30px;
        float: left;
        line-height: 30px;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: "微软雅黑";
        span {
          display: inline-block;
          width: 39%;
          height: 28px;
          line-height: 28px;
          text-align: right;
          color: #666666;
          overflow: hidden;
        }
        a {
          display: inline-block;
          width: 50%;
          height: 28px;
          line-height: 28px;
          text-indent: 1em;
          color: #999999;
          background: #f6f6f6;
          border-radius: 3px;
          overflow: hidden;
        }
      }
    }
  }
  .Label {
    div {
      p {
        float: left;
        height: 30px;
        line-height: 30px;
        text-align: right;
        color: #ffffff;
        overflow: hidden;
        padding-right: 8px;
        font-size: 12px;
        font-family: "微软雅黑";
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
          font-size: 12px;
          font-family: "微软雅黑";
        }
      }
    }
  }
  .condition {
    background: url("~@/assets/organization/customermanage/bq-bg_tj.png")
      no-repeat;
    background-position: right center;
  }
  .business {
    background: url("~@/assets/organization/customermanage/bq-bg_yw.png")
      no-repeat;
    background-position: right center;
  }
  .group {
    background: url("~@/assets/organization/customermanage/bq-bg_bm.png")
      no-repeat;
    background-position: right center;
  }
}
</style>
