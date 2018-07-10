<template>

    <div class="yh_CustIndex" :style="{height:height,width:width}" >
          <el-tooltip class="item" effect="dark" :disabled="tipEnable" placement="top" >
              <div slot="content">公开客户:上市公司、区域股权、<br/>中小500强等企业客户列表</div>
              <div class="indexD indexD_public" @click="jumpOpenPage()" >
                  <h6>公开客户</h6><p>{{formatVal(valuePublic)}}</p>
              </div>
          </el-tooltip>

      <el-tooltip class="item" effect="dark" :disabled="tipEnable"  placement="top">
          <div slot="content">注册客户:新建的潜在客户<br/>和注册过的公开客户</div>
          <div class="indexD indexD_RegCust" @click="jumpRigisterPage()">
             <h6> 注册客户</h6><p> {{formatVal(valueReg)}}</p>
          </div>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" :disabled="tipEnable"  placement="top">
        <div slot="content">正式客户:已开立账户<br/>或签署合同的正式客户</div>
        <div class="indexD indexD_normalCust" @click="jumpFormalCustPage()">
            <h6>正式客户</h6><p>{{formatVal(valueNormal)}}</p>
        </div>
      </el-tooltip>

      <el-tooltip class="item" effect="dark"  :disabled="tipEnable" placement="top">
              <div slot="content">业务通讯录:金控集团下<br/>各机构的主要业务联系人</div>
              <div class="indexD indexD_addressList " @click="jumpConnectPage()">
                 <h6>业务通讯录</h6><p>{{formatVal(valueAdressList)}}</p>
              </div>
      </el-tooltip>



    </div>

</template>

<script>
import { getIndiListByIndiNos } from "@/api/organization/dashboard/index.js";
import { babManageQuery } from "@/api/organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement/index.js";
import {formatThousands} from "@/utils";
import CONSTANTS from '@/utils/Constants.js';

export default {


data() {
    return {
        //custData:[],//目标客户数据
        valuePublic:0,//公开客户
        valueReg:0,// 注册客户
        valueNormal:0,// 正式客户
        valueAdressList:0,// 业务通讯录
        tipEnable:false
    }},

    props: {
        width: {
        type: String,
        default: '100%'
        },
        height: {
            type: String,
            default: '80px'
        },
        scopeS: {
            type: String,
            default: '1'//我的
        },
        relTypeS: {
            type: String,
            default: '99'
        }

    },

    created(){
        if(1==1){//判断当前登录人是否是营业部员工
            //初始化目标客户数据

            this.getCustTotal().then(result => {
            let custData  = result;
            for(let i=0;i<custData.length;++i){
              if(custData[i].IndiNo == CONSTANTS.PUBCUSTINDEX){//公开客户的数量
                this.valuePublic=custData[i].PrsntVal;
              }else if(custData[i].IndiNo == CONSTANTS.ZCKHINDEX){//注册客户
                this.valueReg=custData[i].PrsntVal;
              }else if(custData[i].IndiNo == CONSTANTS.NORMALINDEX){
                this.valueNormal=custData[i].PrsntVal;//正式客户
              }
            }
          });

            //初始化业务通讯录数量
            this.getAdressTotal().then(result => {
                    //this.custData  = result.Data;
                    this.valueAdressList = result;
            });




        }
    },



    methods:{

        jumpOpenPage(){
          this.$emit('foucsbul');
          this.$router.push({path: '/CustomerManagement/RegisteredCustomerManagement/PublicRegistrationList'});
        },
        jumpConnectPage(){
          this.$emit('foucsbul');
          this.$router.push({path: '/ResourceManage/ResourceRanagement/BusinessAddressBookAuery'});
        },
        jumpRigisterPage(){
          this.$emit('foucsbul');
          //>8000  注册客户 直接到我机构的注册客户  正式客户 直接到我机构的正式客户
          if(this.$store.getters.orgid > 8000){
            this.$router.push({name:"RegCustQuery", path: '/CustomerManagement/RegisteredCustomerManagement/RegCustQuery',params: {fromView: "myorg"}});
            //根据选择的内容 跳转到对应的视图上
          }else{
              if(this.scopeS=='1'){//选择是我的客户 直接跳转到 我的注册客户页面
                this.$router.push({path: '/CustomerManagement/RegisteredCustomerManagement/RegCustManage'});
              }else if(this.scopeS=='2'){//跳转到我注册客户查询，我部门的客户tab
                this.$router.push({name:"RegCustQuery", path: '/CustomerManagement/RegisteredCustomerManagement/RegCustQuery',params: {fromView: "mydept"}});
              }else if(this.scopeS=='3'){//跳转到我注册客户查询，我机构的客户tab
                this.$router.push({name:"RegCustQuery", path: '/CustomerManagement/RegisteredCustomerManagement/RegCustQuery',params: {fromView: "myorg"}});
              }
          }

        },
        jumpFormalCustPage(){
          this.$emit('foucsbul');
          //>8000  注册客户 直接到我机构的注册客户  正式客户 直接到我机构的正式客户
          if(this.$store.getters.orgid > 8000){
             this.$router.push({name:"FormalCustomerQuery", path: '/CustomerManagement/FormalCustomerManagement/FormalCustomerQuery',params: {fromView: "myorg"}});
          //根据选择的内容 跳转到对应的视图上
          }else{
            if(this.scopeS=='1'){//选择是我的客户 直接跳转到 我的客户页面
              this.$router.push({path: '/CustomerManagement/FormalCustomerManagement/FormalCustomerManage'});
            }else if(this.scopeS=='2'){//跳转到客户查询，我部门的客户tab
              this.$router.push({name:"FormalCustomerQuery", path: '/CustomerManagement/FormalCustomerManagement/FormalCustomerQuery',params: {fromView: "mydept"}});
            }else if(this.scopeS=='3'){//跳转到客户查询，我机构的客户tab
              this.$router.push({name:"FormalCustomerQuery", path: '/CustomerManagement/FormalCustomerManagement/FormalCustomerQuery',params: {fromView: "myorg"}});
            }
          }
        },
        formatVal(val){
          return formatThousands(val);
        },
        //初始化客户数量
        getCustTotal(){
            let queryData = {
                "param":{
                    scope:this.scopeS,//1:我的,2:我团队,3:我机构
                    relType:this.relTypeS, //服务关系 01  开发关系02  全部 99  字典：CTC-CD0201
                    indiNos:[CONSTANTS.PUBCUSTINDEX,CONSTANTS.ZCKHINDEX,CONSTANTS.NORMALINDEX]
                },
            }
            var p =  new Promise(function(resolve,reject) {
            getIndiListByIndiNos(queryData)
                .then(response => {
                    resolve(response.Data);
                })
                .catch(() => {
                    // this.$message.error("访问出错");
                });
            })
            return p;

        },
        reCaculateCustTotal(){//重新计算客户数量

          this.getCustTotal().then(result => {
            let custData  = result;
            for(let i=0;i<custData.length;++i){
               if(custData[i].IndiNo == CONSTANTS.ZCKHINDEX){//注册客户
                this.valueReg=custData[i].PrsntVal;
              }else{
                 this.valueReg=0;
               }

              if(custData[i].IndiNo == CONSTANTS.NORMALINDEX){
                this.valueNormal=custData[i].PrsntVal;//正式客户
              }else{
                this.valueNormal=0;
              }
            }
          });
        },
        //初始化业务通讯录数量
        getAdressTotal(){
            let queryData = {
                "param":{
                    ResourceCate:"01"
                },
                pageInfo:{
                    pageSize:10,
                    pageNum:1
                }
            }
            var p =  new Promise(function(resolve,reject) {
            babManageQuery(queryData)
                .then(response => {
                    resolve(response.PageInfo.Total);
                })
                .catch(() => {
                    this.$message.error("访问出错");
                });
            })
            return p;

        },
    }

}
</script>

<style scoped>
.yh_CustIndex{
    margin-top: 15px;
}
.indexD{
    border-radius:4px;
    width: 21.5%;
    line-height: 26px;
    color: white;
    font-size: 16px;
    padding-top: 10px;
    padding-bottom: 15px;
    font-family:"微软雅黑";
}
.indexD h6{
    font-size:14px;
    margin-left:45px;
    font-weight:500;
    text-align:left;
}
.indexD p{
    font-size:26px;
    margin-left:45px;
    font-family:"微软雅黑";
    text-align:left;

}
.indexD_public{
    float: left;
    margin-right:2%;
    cursor: pointer;
    background:#F29D4C url("~@/assets/selficon/jg-bigicon04.png") no-repeat bottom left;

}
.indexD_RegCust{
    float: left;
    margin-right:2%;
    margin-left:2.7%;
    background: #BA2739 url("~@/assets/selficon/jg-bigicon01.png") no-repeat bottom left;
    cursor: pointer;
}
.indexD_normalCust{
    float: left;
    margin-right:2%;
    margin-left:2.7%;
    cursor: pointer;
    background:#5D1794 url("~@/assets/selficon/jg-bigicon02.png") no-repeat bottom left;
}
.indexD_addressList {
    float: right;
    margin-left:2%;
    background:#721426 url("~@/assets/selficon/jg-bigicon03.png") no-repeat bottom left;
    cursor: pointer;
}

</style>
