
<template>
  <div class="yh_PublicQueryComponents">
    <!--客户选择通用组件 -->
    <div>
      <el-form label-position="center" label-width="110px" ref="form_data" :model="form_data" size="mini">
        <el-row>
          <el-col :span="11">
            <el-form-item label="员工姓名查找:">
              <el-input v-model="form_data.name_"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="员工编号查找:">
              <el-input v-model="form_data.ID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="10">
            <el-button id="el_query" size="mini" @click="query()">查询</el-button>
            <el-button v-if="false" id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="tableData!=null" class="tabel">
      <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="TabelColHandle" style="width: 100%">
        <el-table-column label="" align="right" width="50">
          <template slot-scope="scope">
            <el-radio v-model="radio_" :label="scope.row.OrgEmployeeVO.IdNo">{{kong}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="员工编号" align="center">
          <template slot-scope="scope">
              <p>{{ scope.row.OrgEmployeeVO.EmpId }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="员工姓名" align="center">
          <template slot-scope="scope">
              <p>{{ scope.row.OrgEmployeeVO.EmpName }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="手机">
          <template slot-scope="scope">
              <p>{{ scope.row.OrgEmployeeVO.Mob }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="tableData!=null" class="ser_page">
      <el-pagination @size-change="CurPagesizeHandle" @current-change="CurPageHandle" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="btn">
      <el-button type="primary" @click="transmit()" size="mini">
        <i class="fa fa-check diologBtn"></i>确定</el-button>
      <el-button @click="CloseClick()" size="mini">
        <i class="fa fa-close diologBtn"></i> 关闭</el-button>
    </div>
  </div>
</template>

<script>
import { getUserPositionList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { GetRegisteList } from "@/api/formalOrRregister.js";
export default {
  name: "PublicQueryComponents",
  data() {
    return {
      //数据是从数据库来
      form_data: {
        name_: "",
        ID: ""
      },
      radio_: "",
      kong: "",
      currentPage: 1, //当前页
      pagesize: 5, //显示总条数
      total: null, //总条数
      currentRow: null, //这个是要传递给父组件的值
      multipleSelection: [],
      tableData: null
    };
  },
  created() {
    // this.queryName_ = this.queryName;
  },
  methods: {
    //向使用此组件的父组件传递值与请求关闭信号
    transmit() {
      var data = this.currentRow ? this.currentRow : "";
      this.$emit("CustomerGelectionGeneralClick", data);
    },
    CloseClick() {
      this.$emit("CustomerGelectionGeneralClick", "");
    },
    //列表的每一行点击事件
    TabelColHandle(val) {
      //console.log(val)
      this.radio_ = val.OrgEmployeeVO.IdNo;
      this.currentRow = {
        designPerson: val.UposId,
        designPersonName: val.OrgEmployeeVO.EmpName,
        designOrgId: val.OrgId
      };
    },
    //查询方法
    query(queryname) {
      // //console.log(this.queryName_);
      //判断是正式还是注册过来的查询
      //console.log(this.form_data);
      //用public_info 来赋值
      var query = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          orgEmployee: {
            EmpId: this.form_data.ID,
            EmpName: this.form_data.name_
          },
          orgId: this.$store.getters.orgid
        }
      };
      if (typeof this.queryName_ == "undefined") {
        // alert("######指定人员")
        getUserPositionList(query)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.tableData = response.Data;
              this.total = response.PageInfo.Total;
            }
          })
          .catch(() => {
            this.$confirm("访问出错(查询客户信息)")
              .then(_ => {
                done();
              })
              .catch(_ => {});
          });
      }
    },
    //当前页
    CurPageHandle(val) {
      this.query();
    },
    //当前要展示多少条
    CurPagesizeHandle(val) {
      this.pagesize = val;
      this.query();
    },
    //重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_PublicQueryComponents {
  padding-bottom: 20px;
  .tabel {
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