<template>
  <el-dialog title="产品详情" :visible.sync="showBox" width="960px" @close="doClose">
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
              <el-form-item label="销售系统:" prop="SaleSys">
                {{detailResultData.SaleSys}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="交易渠道:" prop="TrdChnl">
                {{detailResultData.TrdChnl}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付方式:" prop="PayMode">
                {{detailResultData.PayMode | productFilter(dictypeObj.OSPCD0239, detailResultData.PayMode)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
           <el-col :span="12">
              <el-form-item label="撤单控制:" prop="WithdrawCtrl">
                {{detailResultData.WithdrawCtrl}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约方式:" prop="SignContMode">
                {{detailResultData.SignContMode | productFilter(dictypeObj.OSPCD0243, detailResultData.SignContMode)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否逐笔签约:" prop="IsTrdByTrdSignCont">
                {{detailResultData.IsTrdByTrdSignCont}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购买缴款日:" prop="PurchasePaymentDaily">
                {{detailResultData.PurchasePaymentDaily | filterFormatTime}}
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="12">
              <el-form-item label="开市时间:" prop="OpMktTime">
                {{detailResultData.OpMktTime}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收市时间:" prop="CloseTime">
                {{detailResultData.CloseTime}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销售范围:" prop="SaleScope">
                {{detailResultData.SaleScope}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="承销关系:" prop="UnderwritingRela">
                {{detailResultData.UnderwritingRela}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发行日期:" prop="IssueDate">
                {{detailResultData.IssueDate | filterFormatTime}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品供应商:" prop="SupplierOrgCode">
                {{detailResultData.SupplierOrgCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="实物贵金属类别:" prop="EntityNobleMetalCate">
                {{detailResultData.EntityNobleMetalCate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品状态:" prop="PrdSts">
                {{detailResultData.PrdSts | productFilter(dictypeObj.OSPCD0233, detailResultData.PrdSts)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="成色:" prop="QualityCode">
                {{detailResultData.QualityCode | productFilter(dictypeObj.OSPCD0240, detailResultData.QualityCode)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="材质:" prop="MaterialType">
                {{detailResultData.MaterialType | productFilter(dictypeObj.OSPCD0244, detailResultData.MaterialType)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="规格:" prop="Spec">
                {{detailResultData.Spec}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计价方式:" prop="PricingMode">
                {{detailResultData.PricingMode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="重量:" prop="Weight">
                {{detailResultData.Weight}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售单价:" prop="SaleUnitPrice">
                {{detailResultData.SaleUnitPrice}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="优惠开始时期:" prop="PreferentialBeginDate">
                {{detailResultData.PreferentialBeginDate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优惠结束日期:" prop="PreferentialEndDate">
                {{detailResultData.PreferentialEndDate | filterFormatTime}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="优惠金额:" prop="PreferentialAmt">
                {{detailResultData.PreferentialAmt}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售起始日:" prop="SaleBeginDate">
                {{detailResultData.PrdSts==1?detailResultData.CallBeginDate:detailResultData.PursBeginDate | filterFormatTime}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销售终止日:" prop="SaleEndDate">
                {{detailResultData.PrdSts==1?detailResultData.CallEndDate:detailResultData.PursEndDate | filterFormatTime}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手续费:" prop="Chrg">
                {{detailResultData.Chrg}}
              </el-form-item>
            </el-col>
          </el-row>
       <el-row>
            <el-col :span="12">
              <el-form-item label="快递费收费模式:" prop="ExpressFeeCollectFeeMdl">
                {{detailResultData.ExpressFeeCollectFeeMdl | productFilter(dictypeObj.OSPCD0237, detailResultData.ExpressFeeCollectFeeMdl)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递公司:" prop="ExpressCo">
                {{detailResultData.ExpressCo | productFilter( dictypeObj.OSPCD0241, detailResultData.ExpressCo)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发货说明:" prop="DeliveryRemk">
                {{detailResultData.DeliveryRemk}}
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
        </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="doClose" size="mini" id="yh-cancel">
          <i class="fa fa-close diologBtn"></i> 关 闭</el-button>
      </span>
  </el-dialog>


</template>

<script scoped>
import { dictFilter,dictItems } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";
import "@/filters/filters.js";

export default {
  name: "pDetailPreciousMetal",
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
      dictypeObj: DICTYPE
    };
  },

  watch: {
    /**
     * 监听弹窗关闭变量
     */
    showD: function(val) {
      this.showBox = val;
    }
  },

  methods: {
    doClose:function(){
      this.$emit('closeDetail');
    }
  },
};
</script>

<style scoped>

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
</style>