<template>
  <!-- 360客户信息-列表查询条件-客户管理-财务信息 -->
  <div class="yh-activity-table">
    <div class="table-header clearfix">
      <h3>财务信息</h3>
    <div class="yh_form_row" ref="infoDiv">
        <el-form ref="refname" :model="data_form" label-position="right" label-width="185px">
                    
            <el-row>
                <el-col :span="8">
                    <el-form-item label="近1年总资产(万元)">
                        <el-input :disabled="editFlag" v-model="data_form.var1" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近1年净资产(万元)：">
                        <el-input :disabled="editFlag" v-model="data_form.var2" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近1年营业总收入(万元)：">
                        <el-input :disabled="editFlag" v-model="data_form.var3" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="近2年总资产(万元)">
                        <el-input :disabled="editFlag" v-model="data_form.var4" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近2年净资产(万元)：">
                        <el-input :disabled="editFlag" v-model="data_form.var5" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近2年营业总收入(万元)：">
                        <el-input :disabled="editFlag" v-model="data_form.var6" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="近3年总资产(万元)">
                        <el-input :disabled="editFlag" v-model="data_form.var7" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近3年净资产(万元)：">
                        <el-input :disabled="editFlag" v-model="data_form.var8" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近3年营业总收入(万元)：">
                        <el-input :disabled="editFlag" v-model="data_form.var9" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="近1年净利润(万元)">
                        <el-input :disabled="editFlag" v-model="data_form.var10" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近1年ROE(%)：">
                        <el-input :disabled="editFlag" v-model="data_form.var11" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近1年增发进度：">
                        <el-input :disabled="editFlag" v-model="data_form.var12" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="近2年净利润(万元)">
                        <el-input :disabled="editFlag" v-model="data_form.var13" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近2年ROE(%)：">
                        <el-input :disabled="editFlag" v-model="data_form.var14" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近2年增发进度：">
                        <el-input :disabled="editFlag" v-model="data_form.var15" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="近3年净利润(万元)">
                        <el-input :disabled="editFlag" v-model="data_form.var16" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近3年ROE(%)：">
                        <el-input :disabled="editFlag" v-model="data_form.var17" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="近3年增发进度：">
                        <el-input :disabled="editFlag" v-model="data_form.var18" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
      
        </el-form>
    </div>


    </div>
  </div>
</template>
<script>
  export default {
    name: "PanoramicViewMonyInfoRegCust",
    data() {
      return {
          editFlag:true,
          data_form:{
            var1:"24052294.04",
            var2:"24052294.04",
            var3:"24052294.04",
            var4:"24052294.04",
            var5:"24052294.04",
            var6:"24052294.04",
            var7:"24052294.04",
            var8:"24052294.04",
            var9:"24052294.04",
            var10:"12345.00",
            var11:"12",
            var12:"1111",
            var13:"12345.00",
            var14:"12",
            var15:"17",
            var16:"12345.00",
            var17:"19",
            var18:"12",
          },

         };

    },
    methods: {
    }
  };

</script>

<style scoped>
  /* 服务团队信息 */

  .yh-activity-table {
    margin:10px 15px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    padding-top: 0px;
    position: relative;
    background:#FFF;
    padding:0 20px;
    border-radius:3px;
  }  
  /* 本页面的ele  i的图标区 */
  .fa {
    font-size: 16px;
  }
  
.diologBtn {
  font-size: 16px;
}
.yh_form_row{
    padding: 20px;
}
.el-input,.el-select{
    width: 70%;
}
.yh-header-button-other{
    margin-right: 10px;
}
</style>
