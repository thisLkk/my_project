<template>
  <!-- 360传统页面 携带border-radius的通用表格组件 -->
  <div class="yh-project-table">
    <div class="project_table ">
      <div class="project_title">{{title}}</div>
      <div class="project_table_">
        <template>
          <el-table :data="tds" border stripe style="width: 100%">
            <el-table-column v-for="(th,index) in ths" :key="index" :prop="th.key" :label="th.th_" align="center">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProjectInformationTabel",
    props:{
      title:{
        type:String,
        default:"项目列表"
      },
      tds:{
        type:Object,
        default:[
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
            name: 'a产品',
            type: 'IPO',
            now: '完成',
          },
				],
      }
    },
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
      };
    },
    created:function(){
      this.tds = this.$props.tds;
      this.title = this.$props.title;
    },
    methods: {}
  };

</script>

<style scoped>
  .yh-project-table {
    margin-left: 10px;
    min-height: 200px;
    box-sizing: border-box;
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
    color: #cf8e3e;
    font-weight: bold;
    border-left: 6px solid #cf8e3e;
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
    font-size: 14px;
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
</style>
