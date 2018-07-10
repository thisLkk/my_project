<template>
  <div class="yh-div">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
          <span class="yh-headerfl">
            <span class="yh-font">服务团队</span>
          </span>
          <span class="yh-headerfr">
            <span class="yh-font">更多信息</span>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div :key="item.key" :label="item.value" v-for="item in var0_items" class="yh-middle-divs">
          <div class="yh-middle">
            <div class="yh-middlefl">
              <img src="../../../../assets/organization/customermanage/person.png" alt="" class="yh-personimg" />
            </div>
            <div class="yh-middlefr">
              <div>
                <span class="yh-middle-xm">刘学军</span>
                <span class="yh-middle-bm">客户中心</span>
              </div>
              <div class="yh-middle-dh">111111111</div>
              <div>
                <div class="yh-middle-zw">
                  <span class="yh-middle-span">客户经理</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ServiceTeam',
  components: {

  },
  data() {
    return {
      var0_items: [{ value: '经纪', key: '1' }, { value: '资管', key: '2' }, { value: '投行', key: '3' }, { value: '自营', key: '4' }],
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
  width: 60px;
  height: 59px;
  line-height: 70px;
}
.yh-font {
  width: 60px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
}
.yh-middle-divs {
  display: inline;
  margin-right: 15px;
  margin-top: 10px;
  float: left;
}
.yh-middle {
  width: 228px;
  height: 70px;
  margin-left: 12%;
}
.yh-middlefl {
  float: left;
  height: 70px;
  width: 70px;
}
.yh-middlefr {
  float: right;
  height: 70px;
  width: 148px;
}
.yh-middle-xm {
  padding: 5px;
  color: #333333;
}
.yh-middle-bm {
  color: #818181;
}
.yh-middle-dh {
  margin-top: 8px;
  color: #989898;
}
.yh-middle-zw {
  margin-top: 8px;
  background-color: #a98755;
  border-radius: 10px;
  border: 1px solid #804000;
  width: 100px;
  height: 20px;
}
.yh-middle-span {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  width: 90px;
  display: block;
}
.yh-personimg {
  width: 62px;
  height: 62px;
}
</style>


