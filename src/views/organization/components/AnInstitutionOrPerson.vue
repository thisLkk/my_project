<template>
  <div class="yh_AnInstitutionOrPerson">
    <!--客户选择通用组件应答 -->
    <div>
      <el-form label-position="center" label-width="110px" ref="form_data" :model="choose" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="查询选择:">
              <el-radio-group v-model="choose.radio" @change="radioChange()">
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">团队</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-show="choose.show_=='1'">
      <PublicQueryComponents queryName="a"  @CustomerGelectionGeneralClick="CustomerGelectionGeneralClick"></PublicQueryComponents>
    </div>
    <div v-show="choose.show_=='2'">
      <el-form label-position="center" label-width="110px" ref="form_data" :model="choose" size="mini">
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="机构选择:">
              <OrgChoose selectType="check"  @onOrgSure="onOrgSure"></OrgChoose>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="mechanismClick()" size="mini">
          <i class="fa fa-check diologBtn"></i>确定</el-button>
        <!-- <el-button @click="mechanismClick()" size="mini">
          <i class="fa fa-close diologBtn"></i> 取消</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import PublicQueryComponents from "@/views/organization/components/PublicQueryComponents.vue";
  import OrgChoose from "@/views/organization/components/OrgChoose.vue";
  export default {
    name: "yh_AnInstitutionOrPerson",
    components: {
      PublicQueryComponents,
      OrgChoose
    },
    data() {
      return {
        choose: {
          //个人或者团队
          radio: 1,
          show_: "1",
        },
        mechanism:[],//机构
      };
    },
    created() {},
    methods: {
      //向使用此组件的父组件传递值
      CustomerGelectionGeneralClick(val) {
        this.$emit("AnInstitutionOrPersonMethod", val);
        // //console.log(val)
      },
      //判断选项
      radioChange() {
        if (this.choose.radio == 1) {
          this.choose.show_ = "1";
        } else {
          this.choose.show_ = "2";
        }
      },
      //机构树
      onOrgSure(val) {
        var data = val;
        var self  = this;
        data.forEach(item => {
          this.mechanism.push({coordiOrgId:item})
        });
      },
      // 确定事件
      mechanismClick() {
        var data = {
          mechanism: this.mechanism,
          name:"JIGOU"
        }
        this.$emit("AnInstitutionOrPersonMethod",data);
        this.mechanism=[]
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_AnInstitutionOrPerson {
    padding-bottom: 20px;
    .query {
      padding: 15px;
    }
    .btn {
      margin-top: 20px;
      text-align: center;
    }
    .ser_page {
      padding: 10px 20px;
      text-align: right;
    }
  }

</style>
