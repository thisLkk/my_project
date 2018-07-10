<template>
  <div class="yh-div">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
          <span class="yh-headerfl">
            <span class="yh-font">商机信息</span>
          </span>
          <span class="yh-headerfr">
            <span class="yh-font">更多信息</span>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="yh-middlediv">
          <div class="yh-middle-top">
            <ul>
              <li><span>商机阶段跟踪</span></li>
              <li><span>商机列表</span></li>
            </ul>
          </div>
          <div class="yh-middle-bottom">
            <div class="yh-middlelf">
              <img src="../../../../assets/organization/customermanage/sjjdgz.png" alt="商机阶段跟踪图" class="yh-middle-img"/>
            </div>
            <div class="yh-middlelr">
              <div class="yh-tablediv">
                <BusinessList></BusinessList>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import { BusinessList } from './index.js'
export default {
  name: 'BusinessOpportunitiesInformation',
  components: {
    BusinessList
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped>
.yh-div{
  min-width: 1000px;
  max-width: 1300px;
  min-height: 100px;
  box-sizing: border-box;
  padding-right: 20px;
  margin: 0 auto;
}
.yh-headerdiv {
  height: 60px;
  margin-left: 2%;
  border-bottom: 1px solid #eeeee9;
}
.yh-headerfl {
  float: left;
  width: 60px;
  height: 59px;
  line-height: 70px;
  border-bottom: 2px solid #cb6c2f;
}
.yh-headerfr {
  float: right;
  height: 59px;
  line-height: 70px;
}
.yh-font {
  width: 60px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
}
.yh-middlediv {
  width: 1126px;
  height: 260px;
  margin-left: 2%;
}
.yh-middle-top{
  width: 1126px;
  height: 42px;
}
.yh-middle-top li{
  width: 40%;
  float: left;
  margin-left: 25px;
  list-style-image: url(../../../../assets/organization/customermanage/ico.jpg);
}
.yh-middle-top li span{
  font-family: "微软雅黑";
  font-size: 12px;
  color: #333333;
}
.yh-middle-bottom{
  width: 1226px;
  height: 350px;
}
.yh-middlelf {
  float: left;
  width: 40%;
  height: 350px;
}
.yh-middlelr{
  float: right;
  width: 60%;
  height: 350px;
}
.yh-tablediv{
  width: 100%;
  height: 350px;
}
.yh-middle-img{
  width: 396px;
  height: 218px;
}
</style>


