<template>
    <div class="ProductBox">
        <div class="ProductHeader-Box">
        <h3 >定向产品客户</h3>
        </div>
        <div id="ProductSection-Box">
            <div class="Section-Boxs">
                <span>客户类型</span>
                <span>客户数量</span>
                <span>产品数量</span>
            </div>
            <table width="100%" height="180px" cellspacing="0" cellpadding="0">
                <tr v-for='(indexs,index) in indexmenu' :key='(indexs,index)' class="ProductBox-tr">
                    <td class="ProductBox-td">{{AmbCustTypeFormatter(indexs.AmbCustType)}}</td>
                    <td class="ProductBox-td">{{indexs.CustQty}}</td>
                    <td class="ProductBox-td">{{indexs.PrdQty}}</td>
                </tr>
            </table>
        </div>
    </div>  

</template>

<script>
import {getSOrgAmbDepDirectList} from '@/api/organization/dashboard/index.js'
import { dictItems,dictFilter } from '@/filters';
import DICTYPE from '@/utils/dictTypes.js';
export default {
name:'ProductCustomer',
data(){
    return{
            indexmenu:[]
    }

},
created(){
    if(this.$store.getters.orgid == '9060'){
        var _self=this;
        _self.init();
    }

    
},
methods:{

    AmbCustTypeFormatter(code){
        
      return dictFilter(DICTYPE.CTCCD0211,code); 
      
    },
    init(){
        var _self=this;
        var data={};
        getSOrgAmbDepDirectList(data).then(response => { 
           
            this.indexmenu=response.Data;
        })
        .catch(error=>{
           
        });
       
    }
}

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ProductBox{
    width: 50%;
        .ProductHeader-Box{
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
}


</style>
