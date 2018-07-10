<template>
  <!-- 360传统页面 基本信息展示通用组件 不带border-radius效果  -->
  <div class="yh-essential-table">
    <div class="essential-header clearfix">
      <h3>{{title}}</h3>
    </div>
    <div class="main">
      <div class="content clearfix">
        <div class="content_ clearfix" v-for="(contents,index) in contentList" :key="index">
          <span>{{contents.title}}：</span>
          <a href="javascript:void(0)" :title="contents.main">{{contents.main}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "EssentialInformation",
    props:{
      contentList:{
        type:Array,
        default:[]
      },
      title:{
        type:String,
        default:"基本信息"
      }
    },
    data() {
      return {
        title: "基本信息",
        contentList: [

        ]
      };
    },
    created:function(){
      this.contentList = this.$props.contentList;
      this.title = this.$props.title;
    },
    methods: {}
  };
</script>

<style scoped>
  /* 服务团队信息 */

  .yh-essential-table {
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
  .content {
    width: 100%;
    padding-top:24px;
  }
  .content .content_ {
    width: 33.33%;
    float: left;
    text-align: center;
    margin-bottom:14px;
  }

  .content_ a {
    display: inline-block;
    color: #333333;
		height: 30px;
		line-height: 30px;
		border-radius: 4px;
		text-indent: 1em;
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

</style>
