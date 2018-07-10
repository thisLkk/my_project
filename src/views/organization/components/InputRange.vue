<template>
  <div class="yh_inputPublic">
    <el-input v-model="min"  class="yh_min yh_clean_input" placeholder="输入数字" size="mini" @focus = "oneFocus()"  @blur = "oneBlur()"></el-input>
    -
    <el-input v-model="max" class="yh_max yh_clean_input" placeholder="输入数字" size="mini" @focus = "twoFocus()" @blur = "twoBlur()"></el-input>
    <div class="dialog" v-show="showdialog">
      请输入合法数字
      <div class="triangle"></div>
    </div>
  </div>

</template>

<script scoped>
export default {
  name: "inputRange",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showdialog: false,
      min: "",
      max: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // //console.log(this.name)
    },
    oneBlur() {
      var min = parseFloat(this.min);
      var max = parseFloat(this.max);
      var re = /^\d+(\.\d+)?$/; //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
      if (re.test(this.min)) {
        if (this.max != "") {
          if (min > max) {
            var a = min ;
            this.min = max;
            this.max = a;
          }
        }
        this.transfer();
        return;
      } else if (this.min != "") {
        this.showdialog = true;
        return;
      }else {
        this.transfer();
      }
    },
    twoBlur() {
      var re = /^\d+(\.\d+)?$/; //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
      var min = parseFloat(this.min);
      var max = parseFloat(this.max);
      if (re.test(this.max)) {
        if (this.min != "") {
          if (min > max) {
            var a = min;
            this.min = max;
            this.max = a;
          }
        }
        this.transfer();
        return;
      } else if (this.max != "") {
        this.showdialog = true;
        return;
      }else {
        this.transfer();
      }
    },
    oneFocus() {
      this.showdialog = false;
    },
    twoFocus() {
      this.showdialog = false;
    },
    transfer() {//本地方法，用于向上传递数据
      var data = {
        name: this.name,
        min: String(this.min),
        max: String(this.max)
      };
      this.$emit("inputValue", data);
    },
    resetForm(value){//暴露给父组件的方法  用于置空value
    // alert(1)
    // //console.log(this.min)
      this.min = "";
      this.max = "";
    }
  }
};
</script>

<style scoped>
.yh_inputPublic {
  position: relative;
}
.dialog {
  position: absolute;
  top: -33px;
  left: 61px;
  padding: 0 10px;
  font-size: 12px;
  color: #999999;
  border: 1px solid #aaaaaa;
  background: #ffffff;
  z-index: 11;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 0px #ffffff;
  box-shadow: 0px 0px 0px #ffffff;
}
.triangle {
  width: 0;
  position: absolute;
  height: 0;
  bottom: -16px;
  left: 31px;
  border-width: 8px;
  border-style: solid;
  border-color: #aaaaaa transparent transparent transparent;
}
.yh_min {
  width: 102px;
  height: 24px;
}

.yh_max {
  width: 102px;
  height: 24px;
}
</style>