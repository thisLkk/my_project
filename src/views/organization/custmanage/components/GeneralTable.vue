<template>
  <!-- 360传统页面 不携带border-radius的通用表格组件组件 包括table与分页    -->
  <div class="yh-general-table">
    <div class="essential-header clearfix">
      <h3>{{title}}</h3>
    </div>
    <div class="main">
     <template>
  <el-table
    :data="tds"
    border
    stripe
    style="width: 100%">
    <el-table-column
      v-for="(th,index) in ths"
      :key="index"
      :prop="th.key"
      :label="th.th_"
      align="center"
      >
    </el-table-column>    
  </el-table>
</template>
    </div>
    <div class="general-page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "GeneralTable",
  props:{
    title:{
      type:String,
      default:"基本信息"
    },
    tds:{
      type:Object,
      defaule: [
          {
            name:'c产品',
            startdate:'2018-01-23',
            enddate:'2018-01-23',
            initialscale:'10,100,100.00',
            nowscale:'99,000,000.00',
            capital:'0',
            profit:'22,222,000.00',
            server:'专属服务',
            remarks:'2018-01-23',
        },
          {
            name:'c产品',
            startdate:'2018-01-23',
            enddate:'2018-01-23',
            initialscale:'10,100,100.00',
            nowscale:'99,000,000.00',
            capital:'0',
            profit:'22,222,000.00',
            server:'专属服务',
            remarks:'2018-01-23',
        },
          {
            name:'c产品',
            startdate:'2018-01-23',
            enddate:'2018-01-23',
            initialscale:'10,100,100.00',
            nowscale:'99,000,000.00',
            capital:'0',
            profit:'22,222,000.00',
            server:'专属服务',
            remarks:'2018-01-23',
        },
      ]
    }
  },
  data() {
    return {
      title: "资产信息",
       ths: [
         {
          th_: '产品名称',
          key: 'name',
        },
         {
          th_: '成立日期',
          key: 'startdate',
        },
         {
          th_: '到期日期',
          key: 'enddate',
        },
         {
          th_: '初始规模',
          key: 'initialscale',
        },
         {
          th_: '现有规模',
          key: 'nowscale',
        },
         {
          th_: '增资/赎回',
          key: 'capital',
        },
         {
          th_: '收益情况',
          key: 'profit',
        },
         {
          th_: '客户服务',
          key: 'server',
        },
         {
          th_: '备注',
          key: 'remarks',
        },
        ],
    };
  },
  created:function () {
    //console.log(this.$props.tds)
    this.tds = this.$props.tds;
  },
  methods: {}
};
</script>

<style scoped>
.yh-general-table {
  min-height: 200px;
  box-sizing: border-box;
  padding: 20px 0;
  margin-left:10px;
  position: relative;
}
.yh-general-table .el-table table thead th {
  background-color: #cf8e3e;
  color: #ffffff;
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
.main {
  padding-left: 20px;
  margin-top:24px;
}
.general-page {
  padding: 0 20px;
  padding-top: 20px;
}
                                            
</style>
