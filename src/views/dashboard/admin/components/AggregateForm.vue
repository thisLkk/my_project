<template>
<div class="AggleSmallbox" >
        <div class="AggleSmallbox-Box">
        <h3 >集合产品客户</h3>
        </div>
        <div class="AggProduct">
            <span style="width:43%">产品名称</span>
            <span style="width:17%">客户总数</span>
            <span style="width:20%">机构客户数</span>
            <span style="width:20%">个人客户数</span>
        </div>
    <table width="100%" height="245px" cellspacing="0" cellpadding="0">
        <tr v-for='(indexone,index) in aggreindex' :key='(indexone,index)' class="AggleSmallbox-tr">
            <td class="AggleSmallbox-td">{{indexone.PrdName}}</td>
            <td class="AggleSmallbox-tds">{{indexone.CustTotlNum}}</td>
            <td class="AggleSmallbox-tds">{{indexone.OrgPrdQty}}</td>
            <td class="AggleSmallbox-tds">{{indexone.IndividualPrdQty}}</td>
        </tr>

    </table>
</div>

</template>

<script>
import {getSOrgAmbDepSetList} from '@/api/organization/dashboard/index.js'

export default {
name:'AggregateForm',
data(){
    return{
        aggreindex:[]
    }
},
created(){
    let dll=this;
    dll.initbox();
},
methods:{
    initbox(){
        let dll=this;
        let data={};
        getSOrgAmbDepSetList(data).then(response =>{
            
             this.aggreindex=response.Data;
        })
        .catch(error =>{
           
        })
    }
}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.AggleSmallbox{
     width: 50%;
    height: 260px;
    float: left;
    display: block;
        .AggleSmallbox-Box{
        width: 100%;
        height: 28px;
        border-bottom: 1px solid #eeeee9;
        margin-bottom: 10px;
        h3{
            font-size: 14px;
            width: 100px;
            height: 28px;
            border-bottom: 2px solid #AF6E20;
            display: block;
        }
        }
    tr{
        border: 1px solid black;
       
    }
    td{
        border: 1px solid black;
        line-height: 34px;
        
    }
}

</style>
