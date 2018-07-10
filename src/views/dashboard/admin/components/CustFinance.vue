<template>
    <div class="yh_custFinance" >
        <div v-for="(item,index)  in custData" :key="(item,index)">

          <div v-if="index==0" class="topC top1" ><div style="padding-top:4px">1</div></div>
          <div v-else-if="index==1" class="topC top2" ><div style="padding-top:4px">2</div></div>
          <div v-else-if="index==2" class="topC top3" ><div style="padding-top:4px">3</div></div>
            <div v-else class="topC topOthers" ><div style="padding-top:4px">{{index+1}}</div></div>
            <div class="name">{{item.CustName}}&nbsp;&nbsp;{{formatCurrencyx(item.ExteriorAssetAmt)}}</div>
        </div>
    </div>
</template>
<script>
import { GetInfo } from "@/api/organization/businessopportunitymanage/ExternalassetsLists/index.js";
import Constants from '@/utils/Constants.js';
import {formatCurrency} from "@/utils";

export default {

data() {
    return {
        custData :[],//目标客户数据
        tops:null
    }},
    props: {

      scopeS: {
        type: String,
        default: '1'//我的
      },
      relTypeS: {
        type: String,
        default: Constants.DEVRELSHIPALL
      }
    },

  created(){
        //初始化目标客户数据
        this.GetInfos().then(result => {
                this.custData  = result;
        });
    },
    methods:{
         formatCurrencyx(vale){
           return formatCurrency(vale);
         },

        //初始化指标
        GetInfos(){
            let queryData = {
                "param":{
                    scope:this.scopeS,
                    relType:this.relTypeS
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    orderBy: "",
                    pages: 0
                },
            }
            var p =  new Promise(function(resolve,reject) {
            GetInfo(queryData)
                .then(response => {
                    resolve(response.Data);
                })
                .catch(() => {
                    this.$message.error("访问出错");
                });
            })
            return p;

        },
        reloadCustInfo(){//重新加载资产信息


          this.GetInfos().then(result => {
            this.custData  = result;
          });
        }
    }
}
</script>
<style scoped>
.yh_custFinance .name{
    /* float: left; */
    width: 90%;
    text-align: left;
    padding: 9px;
    line-height: 16px;
}

/*.yh_custFinance .value{*/
    /*float: right;*/
    /*width: 30%;*/
    /*text-align: right;*/
    /*padding: 10px;*/
/*}*/
.yh_custFinance .topC{
    margin: 7px;
    float: left;
    width: 20px;
    height: 20px;
    color: white;
}
.yh_custFinance .top1{
    background-color: red;
}
.yh_custFinance .top2{
    background-color:#E16D2B;
}
.yh_custFinance .top3{
    background-color:#D1A808;
}
.yh_custFinance .topOthers{
    background-color: #79AFF7;
}
</style>
