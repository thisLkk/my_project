<template>
  <div>
    <div>
      <ul>
        <li>查询条件</li>
      </ul>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>

</style>


