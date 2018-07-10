<template>
<div class="ProBox">
    <ProductCustomer></ProductCustomer>
    <ProductCustomerEcharts></ProductCustomerEcharts>
</div>

</template>

<script>
import ProductCustomer from './ProductCustomer'
import ProductCustomerEcharts from './ProductCustomerEcharts'
export default {
name:'Directional',
components:{
    ProductCustomer,
    ProductCustomerEcharts
    }


}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ProBox{
    display: flex;
    width: 100%;
    height: 100%;
}

</style>
