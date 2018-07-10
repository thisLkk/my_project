<template>
  <!-- 360传统页面 通用列表纯文字组件  h3小标题是border-radiu -->
  <div class="yh-project-word">
    <div class="essential-header clearfix">
      <h3>{{title}}</h3>
    </div>
    <div class="main">
				<div class="project_title">项目列表</div>
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
    name: "ProjectInformationWord",
    data() {
      return {
        title: "项目信息",
        ths: [{
            th_: '项目名称',
            key: 'name',
          },
          {
            th_: '项目类型',
            key: 'type',
          },
          {
            th_: '所处阶段',
            key: 'now',
          },
        ],
        tds: [
					{
            name: 'c产品',
            type: 'IPO',
            now: '完成',
          },
					{
            name: 'c产品',
            type: 'IPO',
            now: '完成',
          },
					{
            name: 'c产品',
            type: 'IPO',
            now: '完成',
          },
        
				],
				contentList: [{
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
          },
          {
            title: "客户小类",
            main: "银行"
          },
          {
            title: "客户状态",
            main: "持有产品份额"
          },
          {
            title: "承销费(万)",
            main: ""
          },
          {
            title: "承销费率（%）",
            main: ""
          },
          {
            title: "财务顾问费（万）",
            main: ""
          },
          {
            title: "团队负责人",
            main: "李伟"
          },
          {
            title: "项目负责人",
            main: "李伟"
          },
          {
            title: "项目组成员",
            main: "汪六七"
          },
          {
            title: "承揽公司",
            main: "公司"
          },
          {
            title: "协办人",
            main: "郑职权"
          },
        ]
      };
    },
    methods: {}
  };

</script>

<style scoped>
  .yh-project-word {
    margin: 20px;
    min-height: 200px;
    box-sizing: border-box;
    border: 4px solid #eeeeee;
    padding: 20px 0;
    position: relative;
  }

  .essential-header {
    height: 24px;
    line-height: 24px;
    margin: 10px 0;
  }

  .essential-header h3 {
    float: left;
    width: 200px;
    font-size: 16px;
    color: #a7703d;
    font-weight: bold;
    border-left: 6px solid #b3844e;
    margin-left: 10px;
    text-indent: 1em;
  }

  .project_table {
    padding: 0 30px;
  }

  .project_title {
    color: #a7703d;
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    margin: 10px 0;
  }

  .project_title:before {
    content: "";
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: #b3844e;
    margin-right: 5px;
  }

  .general-page {
    padding: 0 20px;
    padding-top: 20px;
  }
	.main{
		padding: 20px 30px;
	}
  .content {
    width: 100%;
  }
  .content .content_ {
    width: 33.33%;
    float: left;
    text-align: center;
		padding: 12px 0;
		font-size: 14px;

  }

  .content_ a {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		border-radius: 4px;
		text-indent: 1em;
    float: left;
    width: 50%;
    text-align: left;
		display: inline-block;
		background: #dddddd;
  }

  .content_ span {
    text-align: right;
    float: left;
    width: 50%;
		display: inline-block;
		color: #333333;
  }
</style>
