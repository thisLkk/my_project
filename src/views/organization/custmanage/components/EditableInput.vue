<template>
  <!-- 360传统页面 基本信息  客户可以选择是否编辑选项  -->
  <div class="yh_EditableInput">
    <div class="essential-header clearfix">
      <h3>{{title}}</h3>
      <button @click="show_input()">aaaaaaaaa</button>
    </div>
    <div class="main">
      <div class="content clearfix">
        <div class="content_ clearfix" v-for="(contents,index) in contentList" :key="index">
          <span>{{contents.title}}：</span>
          <a href="javascript:void(0)" :title="contents.main">
              <el-input v-model="contents.main" :disabled="true" clearable>{{contents.main}}</el-input>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EditableInput",
  props: {
    contentList: {
      type: Object,
      default: [
        {
          title: "客户大类",
          main: "金融"
        },
        {
          title: "客户等级",
          main: "核心客户"
        },
        {
          title: "客户风险",
          main: "正常类"
        }
      ]
    },
    title: {
      type: String,
      default: "基本信息"
    }
  },
  data() {
    return {
      aaa: [],
      contentList: [
        {
          title: "客户大类",
          main: "金融",
          show: true
        },
        {
          title: "客户等级",
          main: "核心客户",
          show: false
        },
        {
          title: "客户风险",
          main: "正常类",
          show: true
        }
      ]
    };
  },
  created: function() {
    this.contentList = this.$props.contentList;
    this.title = this.$props.title;
    //console.log(this.$props.title)
    this.aaa = this.$props.title.map(function(a) {
      return a.show==true;
    });
    //console.log(this.aaa)
  },
  methods: {
    show_input: function() {}
  }
};
</script>

<style scoped>
/* 服务团队信息 */

.yh_EditableInput {
  min-height: 200px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  position: relative;
}

.essential-header {
  height: 24px;
  line-height: 24px;
  margin: 10px 0;
  border-bottom: 1px solid #eeeee9;
  margin-left: 10px;
}

.essential-header h3 {
  float: left;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 2px solid #cf8e3e;
}
.content {
  width: 100%;
  padding-top: 24px;
}
.content .content_ {
  width: 30.33%;
  float: left;
  text-align: center;
  margin-bottom: 14px;
}

.content_ a {
  display: inline-block;
  color: #333333;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  float: left;
  width: 50%;
  text-align: left;
  display: inline-block;
  background: #f8f8f8;
}

.content_ span {
  text-align: right;
  float: left;
  width: 50%;
  height: 30px;
  line-height: 30px;
  color: #666666;
  display: inline-block;
}
.content_ a .el-input--medium .el-input__inner {
  height: 28px;
  line-height:28px;
}
</style>
