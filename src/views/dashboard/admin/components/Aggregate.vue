<template>
<div class="AggBox">
    <AggregateForm></AggregateForm>
    <AggregateEcharts></AggregateEcharts>
</div>

</template>

<script>
import AggregateForm from './AggregateForm'
import AggregateEcharts from './AggregateEcharts'
export default {
name:'Aggregate',
components:{
    AggregateForm,
    AggregateEcharts
    }


}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.AggBox{
  
    width: 100%;
    height: 100%;
}

</style>
