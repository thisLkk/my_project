<template>
  <div class="yh_DateRange">
    <el-date-picker
      @clear="removeDate"
      @blur="blurChange"
      value-format="yyyyMMdd"
      v-model="startTime"
      type="date"
      clearable
      placeholder="开始日期">
    </el-date-picker>
    <span>至</span>
    <el-date-picker
      @clear="removeDate"
      @blur="blurChange"
      clearable
      value-format="yyyyMMdd"
      v-model="endTime"
      type="date"
      placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DateRange",
  props: {},
  data() {
    return {
      startTime: "",
      endTime: ""
    };
  },
  methods: {
    blurChange() {
      if (this.startTime != "" && this.endTime != "") {
        var start = this.startTime;
        var end = this.endTime;
        if (start > end) {
          this.$confirm("起始日期应小于结束日期！")
            .then(_ => {
              this.startTime = "";
              this.endTime = "";
              done();
            })
            .catch(_ => {});
        } else if (end > start) {
          // alert(2);
          var date = {
            start: this.startTime,
            end: this.endTime
          };
          this.$emit("DateRangeClick", date);
        }
      }
      //   //console.log(typeof(this.startTime));
      //   //console.log(typeof(this.endTime));
    },

    /**
     * 点击清空按钮
     */
    removeDate() {
      console.log('---------------');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_DateRange {
  .el-date-editor.el-input {
    width: 146px;
  }
  .el-date-editor.el-input__inner {
    width: 146px;
  }
  .el-date-editor.el-input__inner {
    padding: 0;
  }
  .el-date-editor.el-input--suffix {
    padding: 0;
  }
}
</style>
