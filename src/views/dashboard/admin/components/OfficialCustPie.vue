<template>
  <div class="officalcustpie" >
      <div class="content">
        <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>客户数</div>
              <div class="numtip">{{formatNm(totalcustNum)}}</div>
            </div>

        </div>
        <div class="coltnt">
          <div class="wartpcnt">
            <div>
              <img src="~@/assets/organization/customermanage/custms.png"/>
            </div>
            <div>个人客户数</div>
            <div class="numtip">{{formatNm(percustNum)}}</div>
          </div>
        </div>
        <div class="coltnt">
          <div class="wartpcnt">
            <div>
              <img src="~@/assets/organization/customermanage/custms.png"/>
            </div>
            <div>机构客户</div>
            <div class="numtip">{{formatNm(orgcustNum)}}</div>
          </div>
        </div>
        <div class="coltnt">
          <div class="wartpcnt">
            <div>
              <img src="~@/assets/organization/customermanage/custms.png"/>
            </div>
            <div>产品客户</div>
            <div class="numtip">{{formatNm(prodcustNum)}}</div>
          </div>
        </div>
        <div class="coltnt">
          <div class="wartpcnt">
            <div>
              <img src="~@/assets/organization/customermanage/custms.png"/>
            </div>
            <div>其他</div>
            <div class="numtip">{{formatNm(othercustNum)}}</div>
          </div>
        </div>
      </div>



      <div>
        <div class="content">
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>银河证券</div>
              <div class="numtip">{{formatNm(yhzqNum)}}</div>
            </div>

          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>银河基金</div>
              <div class="numtip">{{formatNm(yhjjNum)}}</div>
            </div>
          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>银河保险</div>
              <div class="numtip">{{formatNm(yhbxNum)}}</div>
            </div>
          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>银河期货</div>
              <div class="numtip">{{formatNm(yhqhNum)}}</div>
            </div>
          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>银河金汇</div>
              <div class="numtip">{{formatNm(yhjhNum)}}</div>
            </div>
          </div>
        </div>
      </div>



      <div>
        <div class="content">
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>经纪</div>
              <div class="numtip">{{formatNm(jjywzbNum)}}</div>
            </div>

          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>投行</div>
              <div class="numtip">{{formatNm(thNum)}}</div>
            </div>
          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>自营</div>
              <div class="numtip">{{formatNm(zyNum)}}</div>
            </div>
          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>研究</div>
              <div class="numtip">{{formatNm(yjNum)}}</div>
            </div>
          </div>
          <div class="coltnt">
            <div class="wartpcnt">
              <div>
                <img src="~@/assets/organization/customermanage/custms.png"/>
              </div>
              <div>银河国际</div>
              <div class="numtip">{{formatNm(hwNum)}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>
<script>
  import { getsorgbrkdeplist } from "@/api/organization/dashboard/index.js";
  import { dictItems,dictFilter } from '@/filters';
  import DICTYPE from '@/utils/dictTypes.js';
  import {formatCurrency,formatThousands} from "@/utils";
  import {queryGenerIndexNum} from "@/api/organization/dashboard";
  import CONSTANTS from '@/utils/Constants.js';

  export default {
    data() {
      return {
        indexType:"cust",
        custData :[],//客户指标
        indexData:[],//经营指标
        totalcustNum:0,//总客户数
        percustNum:0,//个人客户数
        orgcustNum:0,//机构客户数
        prodcustNum:0,//产品客户数
        othercustNum:0,//其他客户数

        yhzqNum:0,//银河证券数
        yhjjNum:0,//银河基金数
        yhbxNum:0,//银河保险数
        yhqhNum:0,//银河期货数
        yhjhNum:0,//银河金汇数

        jjywzbNum:0,//经业务总部客户数
        thNum:0,//投行客户数
        zyNum:0,//自营
        yjNum:0,//研究
        hwNum:0,//海外

      }},

    created(){
      // if( Number(this.$store.getters.orgid) > 8000){//判断当前登录人是否是首页领导
      //初始化客户指标
      this.initCustData({}).then(result => {
        this.custData  = result;
        if(this.custData.length>0){

          this.custData.forEach((val) => {
              if(val.IndiNo==CONSTANTS.NORMALINDEX){//全部客户指标
                this.totalcustNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.PERCUSTINDEX){//个人客户指标
                this.percustNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.ORGCUSTINDEX){//机构客户
                this.orgcustNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.PROCUSTINDEX){//产品客户
                this.prodcustNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.OTHERCUSTINDEX){//其他客户
                this.othercustNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.YHZQNUMINDEX){//银河证券数
                this.yhzqNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.YHJJNUMINDEX){//银河基金数
                this.yhjjNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.YHBXNUMINDEX){//银河保险金数
                this.yhbxNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.YHQHNUMINDEX){//银河期货金数
                this.yhqhNum=val.PrsntVal;
              }else if(val.IndiNo==CONSTANTS.JHNUMINDEX){//金汇客户数
                this.yhjhNum=val.PrsntVal;
              } else if(val.IndiNo==CONSTANTS.JJYWZBINDEX){//经济数量
                this.jjywzbNum=val.PrsntVal;
              } else if(val.IndiNo==CONSTANTS.THZBINDEX){//投行数量
                this.thNum=val.PrsntVal;
              } else if(val.IndiNo==CONSTANTS.ZYZBINDEX){//自营数量
                this.zyNum=val.PrsntVal;
              } else if(val.IndiNo==CONSTANTS.YJZBINDEX){//研究数量
                this.yjNum=val.PrsntVal;
              } else if(val.IndiNo==CONSTANTS.HWZBINDEX){//海外数量
                this.hwNum=val.PrsntVal;
              }
          });

        }
      });
    },
    methods:{
      formatNm(val){
        return formatThousands(val);
      },

      custtype(row, column){

        let nameVoS = row.IndexType;
        // console.log(nameVoS)
        return dictFilter(DICTYPE.CTCCD0200,nameVoS);
      },
      formatCurrencyx(code){
        return formatCurrency(code);
      },
      //初始化指标
      initCustData(idNos){
        let queryData = {
          "param":{
            "indiNos":idNos
          }
        }
        var p =  new Promise(function(resolve,reject) {
          queryGenerIndexNum(queryData)
            .then(response => {

              resolve(response.Data);

            })
            .catch(() => {
              this.$message.error("访问出错");
            });
        })
        return p;

      }
    }
  }
</script>

<style>
    .officalcustpie{
      width: 100%;
      height: 320px;
      background: url("~@/assets/organization/customermanage/custpie-bk.png") no-repeat;

      background-size:100% 100%;
      -moz-background-size:100% 100%;
    }

    .officalcustpie .content{
        width: 100%;
        height: 106px;
        vertical-align:middle;
        text-align:center
    }
    .coltnt{
      float: left;
      width: 20%;
      height:106px;
      text-align: center;
    }
    .wartpcnt{
          line-height: 25px;
          height: 106px;
          padding-top: 10px;
    }
    .numtip{
      font-size: 13px;
      font-weight: bold;
    }

</style>

