<template>
  <div class="yh-div">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
          <span class="yh-headerfl">
            <span class="yh-font">业务信息</span>
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
            </ul>
          </div>
          <div class="yh-middle-bottom">
            <div class="yh-middle-bottom-left">
              <BusinessOpportunityTrackingList></BusinessOpportunityTrackingList>
            </div> 
            <div class="yh-middle-bottom-right">
              <div>
                <ColumnChart></ColumnChart>
              </div>
            </div> 
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { BusinessOpportunityTrackingList } from './index.js'
import ColumnChart from '../../../../components/Charts/ColumnChart'
export default {
  name: 'BusinessInformation',
  components: {
    BusinessOpportunityTrackingList,
    ColumnChart
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
.yh-div {
  min-width: 1000px;
  max-width: 1300px;
  min-height: 100px;
  box-sizing: border-box;
  padding-right: 20px;
  margin: 0 auto;
}
.yh-headerdiv {
  height: 50px;
  margin-left: 2%;
  border-bottom: 1px solid #eeeee9;
}
.yh-headerfl {
  float: left;
  width: 60px;
  height: 49px;
  line-height: 60px;
  border-bottom: 2px solid #cb6c2f;
}
.yh-headerfr {
  float: right;
  height: 49px;
  line-height: 60px;
}
.yh-font {
  width: 60px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
}
.yh-middlediv {
  height: 260px;
}
.yh-middle-top{
  height: 40px;
}
.yh-middle-top li{
  width: 40%;
  float: left;
  margin-left: 35px;
  list-style-image: url(../../../../assets/organization/customermanage/ico.jpg);
}
.yh-middle-top li span{
  font-family: "微软雅黑";
  font-size: 12px;
  color: #333333;
}
.yh-middle-bottom{
  height: 270px;
}
.yh-middle-bottom-left{
  float: left;
  width: 46%;
  height: 270px;
  margin: 0px 20px 0px 25px;
}
.yh-middle-bottom-right{
  float: right;
  width: 46%;
  height: 270px;
  margin-top: 9%;
  margin-right: 15px;
}
</style>


