<template>
  <!-- 360传统页面->投资总部->登记客户专属页面  -->
  <div class="yh-project_">
    <div class="essential-header clearfix">
      <h3>{{title}}</h3>
    </div>
    <div class="project_table ">
      <div class="project_title">项目列表</div>
      <div class="project_table_">
        <template>
          <el-table :data="tds" border stripe style="width: 100%">
            <el-table-column v-for="(th,index) in ths" :key="index" :prop="th.key" :label="th.th_" align="center">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <div class="main">
      <div class="project_title">项目详情
        <el-button @click="show_input()"><i class="fa fa-edit ">
              </i>  编辑</el-button>
      </div>

      <div class="content clearfix">
        <div class="content_ clearfix" v-for="(contents,index) in contentList" :key="index">
          <span>{{contents.title}}：</span>
          <a href="javascript:void(0)" :title="contents.main">
            <el-input v-model="contents.main" :disabled="showinput ? true : contents.show" :value="contents.main"></el-input>
          </a>
        </div>
      </div>
    </div>
    <div>
        <div class="main">
            <div class="project_title">招标信息
              <el-button @click="show_input()"><i class="fa fa-edit ">
              </i>  编辑</el-button>
            </div>
      
            <div class="content clearfix">
              <div class="content_ clearfix" v-for="(contents,index) in contentListTendering" :key="index">
                <span>{{contents.title}}：</span>
                <a href="javascript:void(0)" :title="contents.main">
                  <el-input v-model="contents.main" :disabled="showinput ? true : contents.show" :value="contents.main"></el-input>
                </a>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="project_title">跟踪信息
              <el-button @click="show_input()"><i class="fa fa-edit ">
              </i>  编辑</el-button>
            </div>
      
            <div class="content clearfix">
              <div class="content_ clearfix" v-for="(contents,index) in contentListTrack" :key="index">
                <span>{{contents.title}}：</span>
                <a href="javascript:void(0)" :title="contents.main">
                  <el-input v-model="contents.main" :disabled="showinput ? true : contents.show" :value="contents.main"></el-input>
                </a>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProjectInformation_register",
    props: {
      tds: {//通用的表格内容字段
        type: Array,
        default: ""
      },
      ths: {//通用的表头字段
        type: Array,
        default: ""
      },
      contentList: {//通用的文字内容显示字段
        type: Array,
        default: ""
      },
      antherShow:{//单独用来判断是不是登记客户项
        type:String,
        default:''
      },
      contentListTendering:{
        type: Array,
        default: ""
      },
      contentListTrack:{
        type: Array,
        default: ""
      }
    },
    data() {
      return {
        title: "项目信息",
        showinput: true
      };
    },
    created: function () {
      this.tds = this.$props.tds; //动态获取所需要展示的td
      this.ths = this.$props.ths; //动态获取所需要设置的th
      this.contentList = this.$props.contentList; //列表内容
      this.antherShow = this.$props.antherShow;//控制  是否显示登记客户 
      this.contentListTendering = this.$props.contentListTendering;//登记客户的 招标详情
      this.contentListTrack = this.$props.contentListTrack;//登记客户的 跟踪详情
    },
    mounted(){

    },
    methods: {
      show_input() { //用来判断是否可编辑
        this.showinput = !this.showinput;
      }

    },
  };

</script>

<style scoped>
  .yh-project_ {
    font-size: 14px;
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

  .project_table {
    padding: 0 30px;
    margin-top: 24px;
  }

  .project_title {
    color: #a7703d;
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    margin: 10px 0;
    font-size: 14px;
  }

  .project_title .el-button {
    float: right;
    background: #ffffff;
    height: 26px;
    padding: 0;
    width: 64px;
    text-align: right;
    padding-right: 10px;
  }

  .project_title:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #b3844e;
    margin-right: 5px;
  }

  .general-page {
    padding: 0 20px;
    padding-top: 20px;
  }

  .main {
    padding: 20px 30px;
  }

  .content {
    width: 100%;
  }

  .content .content_ {
    width: 33.33%;
    float: left;
    text-align: center;
    height: 44px;
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
</style>
