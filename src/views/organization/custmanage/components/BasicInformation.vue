<template>
  <div class="yh-div">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
          <span class="yh-headerfl">
            <span class="yh-font">基本信息</span>
          </span>
          <span class="yh-headerfr">
            <span class="yh-panorama" @click="jumppage()">全景视图</span>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="24">
        <div class="yh-middlediv">
          <div class="yh-middlefl">
            <div>
              <span class="yh-middlespan">中国神华能源股份有限公司</span>
            </div>
            <img class="yh-img" src="~@/assets/organization/customermanage/icn-jg.png" alt="企业图片" />
            <div>
              <span class="yh-top-span">一般机构</span>
              <div class="yh-middle-zw">
                <span class="yh-bottom-span">战略</span>
              </div>
            </div>
          </div>

          <div class="yh-middlefr">
            <Information></Information>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Information } from './index.js'

export default {
  name: 'BasicInformation',
  components: {
    Information
  },
  data() {
    return {

    }
  },
  methods: {
    jumppage() {
      this.$router.push({ path: "/CustomerManagement/FormalCustomerManagement/" })
    }
  }
}
</script>
<style scoped>
.yh-div {
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
.yh-headerfr {
  float: right;
  width: 60px;
  height: 39px;
  line-height: 39px;
}
.yh-panorama {
  cursor: pointer;
  width: 60px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
}
.yh-middlediv {
  margin-top: 15px;
}
.yh-middlefl {
  float: left;
  width: 20%;
  border-right: 1px solid #e8e8e8;
}
.yh-middlefr {
  float: right;
  width: 80%;
}
.yh-middlespan {
  font-family: "微软雅黑";
  font-size: 16px;
  color: #333333;
  width: 200px;
  display: block;
  text-align: center;
  margin: 0 auto;
}
.yh-img {
  width: 64px;
  height: 64px;
  clear: both;
  display: table-cell;
  vertical-align: middle;
  margin: 20px 25px 10px 75px;
  text-align: center;
}
.yh-top-span {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
  margin: 0px 30px 15px 75px;
}
.yh-middle-zw {
  background-color: #a98755;
  border-radius: 10px;
  border: 1px solid #804000;
  width: 100px;
  height: 20px;
  text-align: center;
  margin: 15px 25px 10px 55px;
}
.yh-bottom-span {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #ffffff;
}
.yh-font {
  width: 60px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
}
</style>


