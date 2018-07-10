<template>
  <div class="yh-table">
    <el-table :data="tableData" border style="width: 100%" :header-row-class-name="headerRowClassName" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="商机编号">
      </el-table-column>
      <el-table-column prop="businessname" label="商机名称">
      </el-table-column>
      <el-table-column prop="customername" label="客户名称">
      </el-table-column>
      <el-table-column prop="customernumber" label="客户号">
      </el-table-column>
      <el-table-column prop="businessstate" label="商机状态">
      </el-table-column>
      <el-table-column prop="businessopportunity" label="商机推进阶段">
      </el-table-column>
      <el-table-column prop="sources" label="来源渠道">
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="150px">
        <template slot-scope="scope">
          <el-button @click="modifyClick(scope.row)" type="text" size="small">
            <i class="el-icon-edit">修改</i>
          </el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small">
            <i class="el-icon-delete">删除</i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="yh-pagination">
      <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BusinessList',
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 10,
      tableData: [{
        id: '1',
        businessname: '上海市',
        customernumber: '王小虎',
        businessstate: '上海市',
        businessopportunity: '王小虎',
        sources: '88'
      }, {
        id: '2',
        businessname: '上海市',
        customernumber: '王小虎',
        businessstate: '上海市',
        businessopportunity: '王小虎',
        sources: '88'
      }, {
        id: '3',
        businessname: '上海市',
        customernumber: '王小虎',
        businessstate: '上海市',
        businessopportunity: '王小虎',
        sources: '88'
      }, {
        id: '4',
        businessname: '上海市',
        customernumber: '王小虎',
        businessstate: '上海市',
        businessopportunity: '王小虎',
        sources: '88'
      }]
    }
  },
  methods: {
    modifyClick(row) {
      //console.log(row);
    },
    deleteClick(row) {
      //console.log(row);
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    },
    headerRowClassName({ rowIndex }) {
      return 'yh-header';
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'yh-noactive';
      } else if (rowIndex % 2 != 0) {
        return 'yh-active';
      }
      return '';
    }
  }
}
</script>
<style scoped>
.yh-table{
  width: 100%;
  height: 300px;
}
.yh-pagination {
  margin-top: 10px;
  float: right;
}
.yh-header {
  height: 30px;
  background-color: #f8f8f8 !important;
}
.yh-active {
  background-color: #f8f8f8 !important;
}
.yh-noactive {
  background-color: #ffffff !important;
}
</style>


