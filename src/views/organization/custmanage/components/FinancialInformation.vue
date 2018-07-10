<template>
  <div class="yh-financialinformation">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
          <span class="yh-headerfl">
            <span class="yh-font">财务信息</span>
          </span>
          <span class="yh-headerfr">

          </span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">近1年总资产(万元):</span>
        <span class="yh-contentspan">{{input0}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近1年净资产(万元):</span>
        <span class="yh-contentspan">{{input1}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近1年营业总收入(万元):</span>
        <span class="yh-contentspan">{{input2}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">近2年总资产(万元):</span>
        <span class="yh-contentspan">{{input3}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近2年净资产(万元):</span>
        <span class="yh-contentspan">{{input4}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近2年营业总收入(万元):</span>
        <span class="yh-contentspan">{{input5}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">近3年总资产(万元):</span>
        <span class="yh-contentspan">{{input6}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近3年净资产(万元):</span>
        <span class="yh-contentspan">{{input7}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近3年营业总收入(万元):</span>
        <span class="yh-contentspan">{{input8}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">近1年净利润(万元):</span>
        <span class="yh-contentspan">{{input9}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近1年ROE(%):</span>
        <span class="yh-contentspan">{{input10}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近1年增发进度:</span>
        <span class="yh-contentspan">{{input11}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">近2年净利润(万元):</span>
        <span class="yh-contentspan">{{input12}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近2年ROE(%):</span>
        <span class="yh-contentspan">{{input13}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近2年增发进度:</span>
        <span class="yh-contentspan">{{input14}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="yh-titlespan">近3年净利润(万元):</span>
        <span class="yh-contentspan">{{input15}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近3年ROE(%):</span>
        <span class="yh-contentspan">{{input16}}</span>
      </el-col>
      <el-col :span="8">
        <span class="yh-titlespan">近3年增发进度:</span>
        <span class="yh-contentspan">{{input17}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'FinancialInformation',
  components: {

  },
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
      input8: '88',
      input9: '99',
      input10: '111',
      input11: '222',
      input12: '333',
      input13: '444',
      input14: '555',
      input15: '666',
      input16: '777',
      input17: '888'
    }
  },
  methods: {},
  mounted: function () {

  }
}
</script>
<style scoped>
.yh-financialinformation {
  min-width: 1000px;
  max-width: 1300px;
  min-height: 100px;
  box-sizing: border-box;
  padding-right: 20px;
  margin: 0 auto;
}
.yh-headerdiv {
  height: 40px;
  margin-left: 2%;
  border-bottom: 1px solid #eeeee9;
}
.yh-headerfl {
  float: left;
  width: 60px;
  height: 39px;
  line-height: 39px;
  border-bottom: 2px solid #cb6c2f;
}
.yh-font {
  width: 60px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
}
.yh-headerfr {
  float: right;
  width: 60px;
  height: 39px;
  line-height: 39px;
}
.yh-titlespan {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
  display: inline-block;
  margin-top: 20px;
  margin-left: 35px;
}
.yh-contentspan {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  margin-top: 5px;
  border-radius: 5px;
  color: #808080;
  text-align: center;
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
}
</style>


