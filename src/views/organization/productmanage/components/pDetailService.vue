<template>
  <el-dialog class="p-detail-service" title="产品详情" :visible.sync="showBox" width="960px" @close="doClose">
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
              <el-form-item label="发行范围:" prop="var2">
                {{detailResultData.IsFullWebIssue==1?'所有机构都适用':detailResultData.SaleScope}}
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
              <el-form-item label="评价风险等级:" prop="FundAppraiseRiskGdes">
                {{detailResultData.FundAppraiseRiskGdes | productFilter(dictypeObj.OSPCD0246, detailResultData.FundAppraiseRiskGdes)}}
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
              <el-form-item label="认购对象:" prop="IndividualFlag">
                {{detailResultData.IndividualFlag | productFilter(dictypeObj.EDW10016, detailResultData.IndividualFlag)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="成立日期:" prop="SetupDate">
                {{detailResultData.SetupDate | filterFormatTime}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品状态:" prop="PrdSts">
                {{detailResultData.PrdSts | productFilter(dictypeObj.OSPCD0233, detailResultData.PrdSts)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="体验天数:" prop="ExperienceDays">
                {{detailResultData.ExperienceDays}}
              </el-form-item>
            </el-col>
            
          </el-row>
           <el-row>
            <el-col :span="24">
              <el-form-item label="准入投资者类型:" prop="AccsInvestorType">
                {{detailResultData.AccsInvestorType | productFilter(dictypeObj.OSPCD0245, detailResultData.AccsInvestorType)}}
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
              <el-form-item label="营销资料链接:" prop="MktgDatumLink">
                {{detailResultData.MktgDatumLink}}
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="4">
              <label class="el-form-item__label yh-form-label">期限(Y)</label>
            </el-col>
            <el-col :span="20">
              <label class="el-form-item__label yh-form-label">价格</label>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="24">
              <el-form-item label="1M:" prop="ThPrice">
                {{detailResultData.ThPrice}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="3M:" prop="UarPrice">
                {{detailResultData.UarPrice}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="1Y:" prop="EarPrice">
                {{detailResultData.EarPrice}}
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

import { dictFilter,dictItems, amountFormat  } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";

export default {
  name: "pDetailService",
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
      this.$emit('closeDetail', false);
    }
  },
};
</script>

<style lang="scss">
  .p-detail-service{
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
              text-align: center;
              color: #fff;
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