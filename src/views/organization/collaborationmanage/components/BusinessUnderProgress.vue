<template>
  <!-- 协同管理 _ 我的协同商机承办方 _ 进展登记的弹窗 -->
  <div class="yh_BusinessUnderProgress">
    <div class="Progress">
      <h3>进展登记</h3>
      <el-form label-position="center" label-width="150px" :model="Progress" size="mini">
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="当前阶段:">
              <el-input v-model="Progress.ProgressNow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="进展描述:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="" v-model="Progress.ProgressDetails">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="处理人:">
              <el-input v-model="Progress.ProgressName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="3">
            <el-form-item label="处理时间:">
              <el-input v-model="Progress.ProgressTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" @click="newForm_edit()" size="mini">
        <i class="fa fa-check diologBtn"></i>确定</el-button>
      <el-button @click="newForm_close()" size="mini">
        <i class="fa fa-close diologBtn"></i> 取消</el-button>
    </div>
  </div>
</template>

<script>
import { UnderProgressEdit } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
export default {
  name: "BusinessUnderProgress",
  props: {
    fromUid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      fromUid_: "",
      Progress: {
        ProgressName: this.$store.getters.userName,
        ProgressNow: "",
        ProgressTime: "",
        ProgressDetails: ""
      }
    };
  },
  created() {
    //处理时间前端自己写
    var date_ = new Date();
    this.Progress.ProgressTime =
      date_.getFullYear() +
      "-" +
      (date_.getMonth() + 1) +
      "-" +
      date_.getDate();
    // 进入页面直接拿数据
    this.fromUid_ = this.fromUid;
    this.init_(this.fromUid);
    //alert(this.$props.fromUid)
  },
  methods: {
    init_(data) {
      this.fromUid_ = data;
      // alert(data);
    },
    newForm_edit() {
      //提交申请  调接口  置空表单 CancelMyCollaboration
      var data = {
        param: {
          busoppId: this.fromUid_,
          dealPer: this.$store.getters.uposId,
          progressDesc: this.Progress.ProgressDetails,
          prsntPhase: this.Progress.ProgressNow
        }
      };
      UnderProgressEdit(data)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.Progress.ProgressNow = "";
            this.Progress.ProgressDetails = "";
            this.$emit("newForma", {}); //此方法是给父组件传递关闭信号
          }
        })
        .catch(() => {
          // this.$confirm("访问出错(我的协同商机进展登记)")
          //   .then(_ => {
          //     this.Progress.ProgressNow = "";
          //     this.Progress.ProgressDetails = "";
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    newForm_close() {
      this.Progress.ProgressNow = "";
      this.Progress.ProgressDetails = "";
      //保存关闭 临时保存
      this.$emit("newForma", {}); //此方法是给父组件传递关闭信号
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessUnderProgress {
  padding-bottom: 20px;
  .Progress {
    border: 1px solid #eeeee9;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 14px;
    h3 {
      height: 20px;
      font-weight: bold;
      line-height: 20px;
      margin: 20px 0;
      margin-left: 5px;
      padding-left: 5px;
      color: #000000;
      border-left: 3px solid #ce8f3d;
    }
  }
  .btn {
    margin: 20px 0;
    margin-left: 38%;
  }
}
</style>
