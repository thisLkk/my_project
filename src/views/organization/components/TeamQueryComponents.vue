<template>
  <div class="yh_TeamQueryComponents">
    <!--客户选择通用组件应答 -->
    <div>
      <el-form label-position="center" label-width="110px" ref="form_data" :model="public_info" size="mini">
        <el-row>
          <el-col :span="11">
            <el-form-item label="查询客户姓名:">
              <el-input v-model="public_info.name_"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="查询客户ID:">
              <el-input v-model="public_info.ID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="12">
            <el-button id="el_query" size="mini" @click="query()">查询</el-button>
            <el-button id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="query">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.date }}</p>
              <div slot="reference">
                <el-tag size="mini">{{ scope.row.date }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>
              <div slot="reference">
                <el-tag size="mini">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="地址">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.address }}</p>
              <div slot="reference">
                <el-tag size="mini">{{ scope.row.address }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ser_page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="40">
      </el-pagination>
    </div>
    <div class="btn">
      <el-button type="primary" @click="transmit()" size="mini">
        <i class="fa fa-check diologBtn"></i>确定1</el-button>
      <el-button @click="transmit()" size="mini">
        <i class="fa fa-close diologBtn"></i> 关闭1</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TeamQueryComponents",
    data() {
      return {
        public_info: {
          name_: "",
          ID: "",
          radio: "",
        },
        radio_: "",
        kong: "",
        currentPage: 1, //当前页
        pagesize: 5, //显示总条数
        total: null, //总条数
        currentRow: null,
        multipleSelection: [],
        tableData: [{
            date: '1',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '3',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 ssssssssssssssss弄'
          }
        ]
      };
    },
    created() {},
    methods: {
      //向使用此组件的父组件传递值
      transmit() {
        var data = {};
        // alert(1)
        //console.log(this.multipleSelection)
        this.$emit("TeamQueryComponentsDialog", data);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.radio_ = val.date;
        this.currentRow = val;
      },
      radioChange(radios){
        // alert(radios)
      },
      //当前页
      handleCurrentChange(val) {

      },
      //当前要展示多少条
      handleSizeChange(val) {
        this.pagesize = val;

      },
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_TeamQueryComponents {
    padding-bottom: 20px;
    .query {
      padding: 15px;
    }
    .btn {
      margin-top: 20px;
      text-align: center;
    }
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ser_page {
      padding: 10px 20px;
      text-align: right;
    }
  }

</style>
