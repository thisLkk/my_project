<template>
  <el-form :model="form_data" ref="form" label-width="80px">
    <el-row>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" prop="input0">
          <el-input id="yh-input" v-model="form_data.input0" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" prop="input1">
          <el-input id="yh-input" v-model="form_data.input1" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" prop="input2">
          <el-input id="yh-input" v-model="form_data.input2" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" prop="input3">
          <el-input id="yh-input" v-model="form_data.input3" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" prop="input4">
          <el-input id="yh-input" v-model="form_data.input4" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="yh-row">
        <el-form-item label="证件号码:" prop="input5">
          <el-input id="yh-input" v-model="form_data.input5" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3" class="yh-row">
        <el-form-item label="条线标签:" prop="input6">
          <el-input v-model="form_data.input6" id="yh-small-input" />
        </el-form-item>
      </el-col>
      <el-col :span="3" class="yh-row" :key="item.key" :label="item.value" v-for="item in input0_items">
        <el-form-item>
          <el-input v-model="form_data.input7" id="yh-small-input" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3" class="yh-row">
        <el-form-item label="部门标签:" prop="input7">
          <el-input v-model="form_data.input8" id="yh-middle-input" />
        </el-form-item>
      </el-col>
      <el-col :span="3" class="yh-row" :key="item.key" :label="item.value" v-for="item in input1_items">
        <el-form-item>
          <el-input v-model="form_data.input9" id="yh-middle-input" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3" class="yh-row">
        <el-form-item label="业务标签:" prop="input8">
          <el-input v-model="form_data.input10" id="yh-large-input" />
        </el-form-item>
      </el-col>
      <el-col :span="3" class="yh-row" :key="item.key" :label="item.value" v-for="item in input2_items">
        <el-form-item>
          <el-input v-model="form_data.input11" id="yh-large-input" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'Information',
  data() {
    return {
      form_data: {
        input0: '11',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9:'',
        input10:'',
        input11:''
      },
      input0_items: [{ value: '经纪', key: '1' }, { value: '资管', key: '2' }, { value: '投行', key: '3' }, { value: '自营', key: '4' }],
      input1_items: [{ value: '经纪业务总部', key: '1' }, { value: '衍生产品总部', key: '2' }, { value: '产品总部', key: '3' }, { value: '证券金融总部', key: '4' }],
      input2_items: [{ value: '创业板', key: '1' }, { value: 'B股', key: '2' }, { value: '沪港通', key: '3' }, { value: '深港通', key: '4' }, { value: '新三板', key: '5' }, { value: '金大宗', key: '6' }],

    }
  },
  methods: {},
  mounted: function () {

  }
}
</script>
<style>
#yh-input {
  width: 140px;
  height: 24px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
}
#yh-small-input {
  width: 46px;
  height: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}
#yh-middle-input {
  width: 65px;
  height: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}
#yh-large-input{
  width: 85px;
  height: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
}
.yh-row{
  height:37px;
}
</style>


