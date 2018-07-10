<template>
  <div class="yh-customergroup">
    <div class="yh-personchoose">
      <i class="fa fa-plus"></i>
      <span>客户分组新增</span>
      <div>
        <i class="fa fa-close" @click="cancel()"></i>
      </div>
    </div>
    <div class="yh-content">
      <el-form ref="form" :model="form_data" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="分组名称:" prop="var1">
              <el-input v-model="form_data.var1" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人:" prop="var2">
              <el-input v-model="form_data.var2" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="yh-timeinput">
              <el-form-item label="创建时间:" prop="var3">
                <el-date-picker v-model="form_data.var3" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="分组描述:" prop="var4">
              <el-input type="textarea" v-model="form_data.var4" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="yh-buttons">
              <button class="yh-determine">
                <i class="fa fa-check"></i>确定
              </button>
              <button class="yh-cancel">
                <i class="fa fa-close"></i>取消
              </button>
            </div>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerGroup',
  data() {
    return {
      form_data: {
        var1: "",
        var2: "",
        var3: "",
        var4: "1111",
      },
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
      value3: ''
    };
  },
  methods: {
    cancel(){
      //console.log("111");
    }
  }
}
</script>
<style scoped>
.yh-customergroup{
  width: 760px;
  height: 350px;
  border: 4px #c0c0c0 solid;
}
.yh-personchoose {
  height: 50px;
  background-color: #ce8f3d;
  padding:10px 0px 10px 25px;
  color: #ffffff;
  margin-bottom: 23px;
}
.yh-personchoose span{
  margin-left: 20px;
}
.yh-personchoose div{
  float: right;
  margin-right: 25px;
}
.yh-personchoose li {
  width: 40%;
  float: left;
  margin-left: 35px;
  list-style-image: url(../../../../assets/organization/customermanage/ico.jpg);
}
.yh-personchoose li span {
  font-family: "微软雅黑";
  font-size: 20px;
  color: #ce8f3d;
  font-weight: bold;
}
.yh-content {
  width: 90%;
  height:250px;
}
.yh-timeinput {
  float: right;
}
.yh-buttons{
  margin: 0 auto;
  text-align: center;
}
.yh-determine {
  width: 80px;
  height: 28px;
  background-color: #cf8c2a;
  border-radius: 3px;
  color: #ffffff;
  margin: 0px 10px;
}
.yh-cancel {
  width: 80px;
  height: 28px;
  background-color: #acacac;
  border-radius: 5px;
  color: #ffffff;
}
</style>


