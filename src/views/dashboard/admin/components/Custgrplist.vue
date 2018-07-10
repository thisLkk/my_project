<template>
    <div class="indextableshow">
        <el-table
        :data="custData"
        stripe
        style="width: 100%; height:290px; margin-top:10px;" size="mini" >
        <el-table-column min-width="35%"
        prop="GrpName"
        label="机构业务" align="center">
        </el-table-column>
        <el-table-column min-width="65%"
        label="目标客户" align="center">
            <template slot-scope="scope">
                <span v-for="(cust,index) in scope.row.CustGrpAssocVO" :key="index">
                  <span v-if="index < 2">{{cust.CustName || ''}}</span>
                  <el-button v-if="index === 2"
                  type="text" size="small" @click="showMoreCustInfo(cust.GrpNo)">......</el-button>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <div>
      <el-dialog title="客户明细" v-if="custdetaildlgshow" :visible.sync="custdetaildlgshow" width="70%">
          <CustDetailInfo :grpNo="custGrpNo" :showTab="queryTypeStr" @closeWindow="closeWindow"></CustDetailInfo>
      </el-dialog>
    </div>
    </div>
</template>
<script>
import { InstBusTargetCustMerQuery } from "@/api/organization/businessopportunitymanage/InstitutionalBusinessTargetCustomer/index.js";
import Constants from '@/utils/Constants.js';
import CustDetailInfo  from '../../../organization/businessopportunitymanage/components/CustDetailInfo'

export default {
data() {
    return {
        custData :[],//目标客户数据
        queryType:"01",//查询方式
        queryTypeStr: '',
        custdetaildlgshow: false,
        custGrpNo: '',
        queryTypeObj: {'01': 'myTargetCust', '02': 'myTeamCust', '03': 'myDeptCust', '99': 'allCust'}
    }},
  props: {

    scopeS: {
      type: String,
      default: '01'//我的
    },
    relTypeS: {
      type: String,
      default: Constants.DEVRELSHIPALL
    }

  },
  
  watch: {
    scopeS: function(val) {
      if(val=="1"){
        this.queryType="01";
      }else if(val=="2"){
        this.queryType="02";
      }else{
        this.queryType="03";
      }
    }
  },
  
  components: {
    'CustDetailInfo': CustDetailInfo
  },

  created(){
      //if(Number(this.$store.getters.orgid) < 7000){//判断当前登录人是否是营业部员工
        //初始化目标客户数据
        this.initCustData().then(result => {
          this.custData  = result;
        });
      //}
    },
    methods:{
        //初始化指标
        initCustData(){
            let queryData = {
                param:{
                    grpLvl:9,
                    queryType:this.queryType,
                    relType:this.relTypeS
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                    orderBy: "",
                    pages: 0
                },
            }
            var p =  new Promise(function(resolve,reject) {
            InstBusTargetCustMerQuery(queryData)
                .then(response => {
                    resolve(response.Data);
                })
                .catch(() => {
                    this.$message.error("访问出错");
                });
            })
            return p;

        },

        // custNameFor(row, column){
        //     let nameVoS = row.CustGrpAssocVO;
        //     let names = "";
        //     for(let i=0;i<nameVoS.length;++i){
        //         let custName = nameVoS[i].CustName == null ? "": nameVoS[i].CustName;
        //     }
        //     return names;
        // },

        showMoreCustInfo(grpNo) {
          this.custGrpNo=grpNo;
          this.queryTypeStr = this.queryTypeObj[this.queryType];
          this.custdetaildlgshow = true;
        },

        closeWindow(){
          this.custdetaildlgshow=false;
        },

        reloadCustInfo(){

           //console.info(this.scopeS+"--"+this.relTypeS);
           if(this.scopeS=="1"){
                this.queryType="01";
           }else if(this.scopeS=="2"){
                this.queryType="02";
           }else{
                this.queryType="03";
           }
          this.initCustData().then(result => {
            this.custData  = result;
          });
        }
    }
}
</script>

<style>

</style>

