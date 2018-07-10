<template>
  <div>
    <div class="yh-personselect">
      <div class="yh-personchoose">
        <i class="iconfont icon-fangdajing"></i>
        <span>人员选择</span>
        <div>
          <i class="fa fa-close" @click="cancel()"></i>
        </div>
      </div>
    </div>
    <div class="yh-content">
      <div class="yh-querycriteria">
        <ul>
          <li>查询条件</li>
        </ul>
      </div>
      <div class="yh-querycriteriacontent">
        <el-form ref="form" :model="form_data" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构:" prop="var1">
                <el-input v-model="form_data.var1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工工号:" prop="var2">
                <el-input v-model="form_data.var2" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工姓名:" prop="var3">
                <el-input v-model="form_data.var3" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="yh-buttons">
                <el-button id="yh-querybutton">查询</el-button>
                <el-button id="yh-resetbutton">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="yh-queryresult">
        <ul>
          <li>查询结果</li>
        </ul>
      </div>
      <div class="yh-queryresultcontent">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'PersonSelection',
  data() {
    return {
      form_data: {
        var1: "",
        var2: "",
        var3: "111",
      },
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.yh-personselect {
  height: 50px;
  background-color: #ce8f3d;
}
.yh-personchoose {
  height: 50px;
  background-color: #ce8f3d;
  padding: 10px 0px 10px 25px;
  color: #ffffff;
  margin-bottom: 23px;
}
.yh-personchoose span {
  margin-left: 20px;
}
.yh-personchoose div {
  float: right;
  margin-right: 25px;
}
.yh-content {
  width: 741px;
  height: 486px;
}
.yh-querycriteria {
  height: 50px;
}
.yh-querycriteria li {
  width: 40%;
  float: left;
  margin-left: 35px;
  margin-top: 20px;
  list-style-image: url("../../../../assets/organization/customermanage/ico.jpg");
}
.yh-querycriteriacontent {
  margin-left: 35px;
}
.yh-queryresult {
  height: 50px;
  background: #fff;
}
.yh-queryresult li {
  width: 40%;
  float: left;
  margin-left: 35px;
  margin-top: 20px;
  list-style-image: url("../../../../assets/organization/customermanage/ico.jpg");
}
.yh-queryresultcontent {
  margin-left: 35px;
}

.yh-buttons {
  float: right;
}
#yh-querybutton {
  background-color: #ce8f3d;
  color: #ffffff;
}
#yh-resetbutton {
  background-color: #808080;
  color: #ffffff;
  font-weight: bold;
}
</style>


