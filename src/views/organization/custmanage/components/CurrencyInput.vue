<template>
  <!-- 360传统页面 基本信息  客户可以选择是否编辑选项  -->
  <div class="yh_EditableInput">
    <div class="essential-header clearfix">
      <h3>{{title}}</h3>
      <el-button @click="show_input()">
        <i class="fa fa-edit ">
        </i> 编辑</el-button>
      <el-button @click="preservation()">保存</el-button>
    </div>
    <div class="main">
      <div class="content clearfix">
        <div class="content_ clearfix" v-for="(contents,index) in contentList" :key="index">
          <span>{{contents.title}}：</span>
          <a href="javascript:void(0)" :title="contents.main">
            <el-input v-model="contents.main" :disabled="showinput ? true : contents.show" :value="contents.main"></el-input>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CurrencyInput",
    props: {
      contentList: {
        type: Array,
        default: [{
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
        showinput: true, //用来判断是否可编辑
        clickable: false,
        aa: []
      };
    },
    created: function () {
      this.title = this.$props.title;
      this.contentList = this.$props.contentList;
    },
    mounted() {
      if (this.$refs.NewThreeBoardCustomers) {}
    },
    methods: {
      show_input() {
        //用来判断是否可编辑
        this.showinput = !this.showinput;
        this.clickable = true;
      },
      preservation() {
        //用来判断是否可编辑
        if (this.clickable) {
          var self = this;
          this.showinput = true;
          this.contentList.forEach(function (item) {
            if (item.show == false) {
              self.aa.push(item.main);
            }
          });
          //console.log(this.aa);
          this.clickable = false;
          this.aa = [];
        }
      }
    },
    updated: function () {}
  };

</script>

<style scoped>
  /* 服务团队信息 */

  .yh_EditableInput {
    font-size: 14px;
    min-height: 200px;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 10px;
    position: relative;
  }

  .essential-header {
    height: 30px;
    line-height: 28px;
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

  .essential-header .el-button {
    float: right;
    background: #ffffff;
    height: 26px;
    padding: 0;
    width: 64px;
    text-align: right;
    padding-right: 10px;
  }

  .content {
    width: 100%;
    padding-top: 24px;
  }

  .content .content_ {
    width: 33.33%;
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
    width: 38%;
    text-align: left;
    display: inline-block;
    background: #f8f8f8;
  }

  .content_ span {
    text-align: right;
    float: left;
    width: 55%;
    height: 30px;
    line-height: 30px;
    color: #666666;
    display: inline-block;
  }

  .content_ a .el-input--medium .el-input__inner {
    height: 28px;
    line-height:28px;

  }

  button {
    margin: 0 3px;
  }

</style>
