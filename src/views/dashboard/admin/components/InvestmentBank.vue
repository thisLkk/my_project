<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="2018年新增立项统计" name="first">
        <div class="In-header-table">
            <span class="zaiproject">业务部门</span>
            <span class="zaiproject">IPO</span>
            <span class="zaiproject">再融资</span>
            <span class="bingproject">并购重组</span>
            <span class="caiproject">财务顾问</span>
            <span class="zhaiproject">债券类项目</span>
            <span class="xinproject">新三板项目</span>
        </div>
        <div class="foot-box">
        <table border="1" width="100%" height="336" cellspacing="0" cellpadding="0">
            <tr >
                <td class="td-top" colspan="2"  style="width:72px;"></td>
                <td class="add">新增</td>
                <td class="add">累计</td>
                <td class="add">新增</td>
                <td class="add">累计</td>
                <td class="add">新增</td>
                <td class="add">累计</td>
                <td class="add">新增</td>
                <td class="add">累计</td>
                <td class="add">新增</td>
                <td class="add">累计</td>
                <td class="add">新增</td>
                <td class="add">累计</td>
            </tr>
            <tr v-for='(indexsbox,index) in demo' :key='index'>
                <td class="td-top" colspan="2" style="width:72px;" >{{indexsbox.DepName}}</td>
                <td >{{indexsbox.IpoNew}}</td>
                <td >{{indexsbox.IpoTol}}</td>
                <td >{{indexsbox.EquityReFinNew}}</td>
                <td >{{indexsbox.EquityReFinTol}}</td>
                <td >{{indexsbox.MaNew}}</td>
                <td >{{indexsbox.MaTol}}</td>
                <td >{{indexsbox.FinanceAdviserNew}}</td>
                <td >{{indexsbox.FinanceAdviserTol}}</td>
                <td >{{indexsbox.BondSubtotalNew}}</td>
                <td >{{indexsbox.BondSubtotalTol}}</td>
                <td >{{indexsbox.ThirdBdSubtotalNew}}</td>
                <td >{{indexsbox.ThirdBdSubtotalTol}}</td>
            </tr>

        </table>
        </div>
    </el-tab-pane>
    <el-tab-pane label="2018当年承销金额" name="second" >
        <UnderwritingEcharts></UnderwritingEcharts>
    </el-tab-pane>
    <el-tab-pane label="投行存量客户" name="third">
        <StockCustomer></StockCustomer>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {getInvestBankSProjSumList} from '@/api/organization/dashboard/index.js'
import UnderwritingEcharts from './UnderwritingEcharts'
import StockCustomer from './StockCustomer'
export default {
name:'InvestmentBank',
components:{
    UnderwritingEcharts,
    StockCustomer
    },
data() {
      return {
        demo:[],
        activeName: 'first',
        chart:null,

      };
    },
    created(){

        switch(this.$store.getters.orgid){//投行
          case "8007":
        var _self=this;
        _self.inits();
            break;
          case "8160":
        var _self=this;
        _self.inits();
            break;
          case "8314":
        var _self=this;
        _self.inits();
            break;
          case "8280":
        var _self=this;
        _self.inits();
            break;
          case "8316":
         var _self=this;
        _self.inits();
            break;
          case "8170":
         var _self=this;
        _self.inits();
            break;
          case "8312":
         var _self=this;
        _self.inits();
            break;
          case "8315":
        var _self=this;
        _self.inits();
            break;

          case "8313":
         var _self=this;
        _self.inits();
            break;
          case "8317":
         var _self=this;
        _self.inits();
            break;
          case "8311":
        var _self=this;
        _self.inits();
            break;
          case "8305":
         var _self=this;
        _self.inits();
            break;
          case "8304":
         var _self=this;
        _self.inits();
            break;
          case "8306":
        var _self=this;
        _self.inits();
            break;
          }
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
        inits(){
            var data={};
            getInvestBankSProjSumList(data).then(response =>{

                this.demo=response.Data;
            })
            .catch(error=>{

            })
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.In-header-table{
    width: 100%;
    line-height: 28px;
    span{
        font-size: 12px;
        display: block;
        text-align: right;
        float: left;
         width: 14.285%;
        background: #EAEBEF;

    }
    .xinproject{
        text-align: center;
    }
    .zhaiproject{
        padding-right: 2%;
    }
    .caiproject{
        padding-right: 2%;
    }
    .bingproject{
        padding-right: 1%;
    }
    .zaiproject{
        padding-right: 1%;
    }

}
    tr{
        border:1px solid rgb(29, 22, 22);
    }
    td{
    line-height: 28px;
    border:1px solid #eee;

        #td-top{
            width: 14% ;
            font-size: 10px;
        }
    }
.add{
    color: #409EFF;
}
</style>
