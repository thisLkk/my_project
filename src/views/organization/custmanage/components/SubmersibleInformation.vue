<template>
  <div class="yh-submersibleinformation">
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">客户简称:</span>
        <span class="yh-contentspan">{{input0}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">证券代码:</span>
        <span class="yh-contentspan">{{input1}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">万德一级行业:</span>
        <span class="yh-contentspan">{{input2}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">证件类型:</span>
        <span class="yh-contentspan">{{input3}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">证件号码:</span>
        <span class="yh-contentspan">{{input4}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">万德二级行业:</span>
        <span class="yh-contentspan">{{input5}}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <span class="yh-titlespan">证监会行业分类(大):</span>
        <span class="yh-contentspan">{{input6}}</span>
      </el-col>
      <el-col :span="12">
        <span class="yh-titlespan">证监会行业分类(中):</span>
        <span class="yh-contentspan">{{input7}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'SubmersibleInformation',
  data() {
    return {
      input0: '00',
      input1: '11',
      input2: '22',
      input3: '33',
      input4: '44',
      input5: '55',
      input6: '66',
      input7: '77',
    }
  },
  methods: {},
  mounted: function () {

  }
}
</script>
<style scoped>
.yh-submersibleinformation{
  width: 92%;
}
.yh-titlespan {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
.yh-contentspan {
  display: inline-block;
  width: 140px;
  height: 30px;
  line-height: 30px;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  margin-top: 5px;
  border-radius: 3px;
  color: #808080;
  text-align: center;
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
</style>


