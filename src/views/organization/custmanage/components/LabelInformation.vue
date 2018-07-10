<template>
  <div class="yh-labelinformation">
    <el-row>
      <el-col :span="24">
        <div class="yh-headerdiv">
          <span class="yh-headerfl">
            <span class="yh-font">标签信息</span>
          </span>
          <span class="yh-headerfr">

          </span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="yh-titlespan">条线标签:</span>
        <span class="yh-stripelspan" v-for="item in stripelabels" :key="item.key">{{item.value}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="yh-titlespan">部门标签:</span>
        <span class="yh-departmentspan" v-for="item in departmentlabels" :key="item.key">{{item.value}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="yh-titlespan">业务标签:</span>
        <span class="yh-businessspan" v-for="item in businesslabels" :key="item.key">{{item.value}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'LabelInformation',
  components: {

  },
  props: {
    stripeitems: {
      type: Array,
      default: [
        { key: "1", value: "经纪" },
        { key: "2", value: "资管" },
        { key: "3", value: "投行" },
        { key: "4", value: "自行" }
      ]
    },
    departmentitems: {
      type: Array,
      default: [
        { key: "1", value: "经纪业务总部" },
        { key: "2", value: "衍生产品总部" },
        { key: "3", value: "产品中心" },
        { key: "4", value: "证券金融总部" },
        { key: "5", value: "投资研究" },
        { key: "6", value: "银河金汇" },
        { key: "7", value: "投资银行总部" },
        { key: "8", value: "债券投资部" }
      ]
    },
    businessitems: {
      type: Array,
      default: [
        { key: "1", value: "创业板" },
        { key: "2", value: "B股" },
        { key: "3", value: "沪港通" },
        { key: "4", value: "深港通" },
        { key: "5", value: "新三板" },
        { key: "6", value: "金大宗" },
        { key: "7", value: "场外期权" },
        { key: "8", value: "收益互换" },
        { key: "9", value: "买入转售" },
        { key: "10", value: "PB" },
        { key: "11", value: "托管" },
        { key: "12", value: "融资融券" },
        { key: "13", value: "股票质押" },
        { key: "14", value: "基金研究" },
        { key: "15", value: "股权融资" },
        { key: "16", value: "天天利" },
      ]
    }
  },
  data() {
    return {
      stripelabels: [],
      departmentlabels: [],
      businesslabels: []
    }
  },
  created() {
    var self = this;
    for (var idx = 0; idx < self.stripeitems.length; idx++) {
      var label = {
        key: self.stripeitems[idx].key,
        value: self.stripeitems[idx].value
      }
      this.stripelabels.push(label);
    }
    for (var idx = 0; idx < self.departmentitems.length; idx++) {
      var label = {
        key: self.departmentitems[idx].key,
        value: self.departmentitems[idx].value
      }
      this.departmentlabels.push(label);
    }
    for (var idx = 0; idx < self.businessitems.length; idx++) {
      var label = {
        key: self.businessitems[idx].key,
        value: self.businessitems[idx].value
      }
      this.businesslabels.push(label);
    }

  },
  methods: {

  }
}
</script>
<style scoped>
.yh-labelinformation {
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
  margin-left: 25px;
}
.yh-stripelspan {
  display: inline-block;
  width: 60px;
  height: 20px;
  line-height: 20px;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  border-radius: 10px;
  margin: 15px 20px 0px 10px;
  text-align: center;
  color: #808080;
}
.yh-departmentspan {
  display: inline-block;
  width: 100px;
  height: 20px;
  line-height: 20px;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  border-radius: 10px;
  margin: 15px 20px 0px 10px;
  text-align: center;
  color: #808080;
}
.yh-businessspan{
  display: inline-block;
  width: 100px;
  height: 20px;
  line-height: 20px;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  border-radius: 10px;
  margin: 15px 20px 0px 10px;
  text-align: center;
  color: #808080;
}
</style>

