<template>
  <div class="yh_Business360Info">
    <!--协同商机_商机名称_客户信息 -->
    <div v-if="info!=null" class="yh-middlediv clearfix">
      <div class="yh-middlefl fl">
        <h3 class="yh-middlespan">{{info.CustFullName}}</h3>
        <ul>
          <li>
            <img v-if="info.IndividualFlag == '0'" class="yh-img" src="~@/assets/organization/customermanage/icn-gr64.png" alt="个人图片"
            />
            <img v-else-if="info.IndividualFlag == '1'" class="yh-img" src="~@/assets/organization/customermanage/icn-jg64.png" alt="机构图片"
            />
            <img v-else-if="info.IndividualFlag == '2'" class="yh-img" src="~@/assets/organization/customermanage/icn-cp64.png" alt="产品图片"
            />
            <img v-else-if="info.IndividualFlag == '998'" class="yh-img" src="~@/assets/organization/customermanage/icn-unknow64.png"
              alt="企业图片" />
            <img v-else class="yh-img" src="~@/assets/organization/customermanage/icn-unknow64.png" alt="企业图片" />
          </li>
          <li>
            <span class="yh-top-span">{{info.IndividualFlag == "0" ? "个人客户" : info.IndividualFlag == "1" ? "机构客户" : info.IndividualFlag == "2" ? "产品客户"
              : info.IndividualFlag == "998" ? '未知客户' : '其他客户'}}</span>
          </li>
          <li>
            <span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span>
          </li>
        </ul>
      </div>
      <div class="yh-middlefr fl">
        <div class="Label" v-if="info_label!=null">
          <div class="clearfix">
            <p class="condition" >条线标签</p>
            <div v-if="info_label.custBatvhRightVO !=null" >
              <span>:</span>
              <span v-if="info_label.custBatvhRightVO.IsBrokersBizLine==1">经纪业务</span>
              <span v-if="info_label.custBatvhRightVO.IsAmbDep==1">资管</span>
              <span v-if="info_label.custBatvhRightVO.IsInvestBankDep==1">投行</span>
              <span v-if="info_label.custBatvhRightVO.IsBondInvestDep==1">自营</span>
              <span v-if="info_label.custBatvhRightVO.IsFutureDep==1">期货</span>
              <span v-if="info_label.custBatvhRightVO.IsInsurDep==1">保险</span>
              <span v-if="info_label.custBatvhRightVO.IsFundDep==1">基金</span>
              <span v-if="info_label.custBatvhRightVO.IsInternationalDep==1">国际</span>
            </div>
            <div v-else >
              <span>:</span>暂无
            </div>
          </div>
          <div class="clearfix">
            <p class="business" >业务标签</p>
            <div >
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
          </div>
          <div class="clearfix">
            <p class="group" >客户分组</p>
            <div v-if="group.length>0" >
              <span>:</span>
              <span v-for="(item,index) in group" :key="index">{{item.GrpDesc}}</span>
            </div>
            <div v-else >
              <span>: 暂无</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
        <Business360Tabel @TabelClose="TabelClose" :CustNo="CustNos"></Business360Tabel>
    </div>
  </div>
</template>
<script>
import Business360Tabel from "./Business360Tabel";
import { getInfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { getLabelInfo } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
export default {
  name: "PanoramaHead",
  components: {
    Business360Tabel
  },
  props: {
    CustNos: {
      type: String
    }
  },
  data() {
    return {
      info: null, //----------用于展示个人信息
      info_label: null, //----个人业务标签获取
      group: []
    };
  },
  created() {
    // console.log(this.CustNos)
    this.init();
  },
  methods: {
    init() {
      //-----------------------------------------------------------拉取个人信息接口
      var query = {
        param: {
          Uuid: this.CustNos //-----------------此处的uuid是从正式客户管理或者我的正式客户列表传进来的
        }
      };
      var querys = {
        param: this.CustNos //-----------------此处的uuid是从正式客户管理或者我的正式客户列表传进来的
      };
      getInfo(query)
        .then(response => {
          this.info = response.Data;
          this.$store.dispatch("setcustName", response.Data.CustFullName);
        })
        .catch(() => {});
      getLabelInfo(querys)
        .then(response => {
          //console.log(response.Data);
          this.info_label = response.Data;
          this.group = this.info_label.custGrpInfoVOList;
        })
        .catch(() => {});
    },
    TabelClose(){
        this.$emit("businessDialogClose",'')
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh_Business360Info {
  margin: 10px 15px;
  margin-top: 0;
  background: #ffffff;
  .yh-middlediv {
  box-shadow: 0px 0px 7px #dddddd;
    .yh-middlefl {
      float: left;
      width: 170px;
      height: 100%;
      padding-top: 25px;
      box-sizing: border-box;
      text-align: center;
      h3 {
        color: #014aa6;
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
        margin-bottom: 20px;
      }
      ul {
        li:nth-child(1) {
          img {
            width: 66px;
            height: 64px;
            color: #dddddd;
            font-size: 12px;
            text-align: center;
          }
          margin-bottom: 8px;
        }
        li:nth-child(2) {
          span {
            display: inline-block;
            padding: 3px 10px;
            font-size: 14px;
          }
          margin-bottom: 10px;
        }
        li:nth-child(3) {
          span {
            display: inline-block;
            width: 50px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #ffffff;
            border-radius: 8px;
          }
        }
      }
    }
    .yh-middlefr {
      width: 660px;
      min-height: 220px;
      border-left: 1px dashed #dddddd;
      .Label {
        padding-left: 20px;
        padding-top: 30px;
        div {
          min-height: 50px;
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
  }
}
</style>
