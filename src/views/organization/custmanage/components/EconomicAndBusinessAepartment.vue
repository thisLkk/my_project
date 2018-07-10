<template>
    <div>
        我是经纪业务部 {{ceshi}}
    </div>
</template>

<script>
import {
  GeneralTable,
  ActivityInformation
} from "@/views/organization/custmanage/components/index.js";
    export default {
        name:"EconomicAndBusinessAepartment",
        props:["ceshi"],
        created:function(){
            //console.log(this.$route.query)
        },
        components:{
  GeneralTable,
  ActivityInformation
        }
    }
</script>

<style scoped>

</style>