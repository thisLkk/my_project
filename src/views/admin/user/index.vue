<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名" v-model="form_data.EMP_NAME"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="userManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary"
        icon="el-icon-edit">添加
      </el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.EMP_NO}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.EMP_NAME}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.GENDER_CODE|dictFilter('GENDER_CODE') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300" align="center" label="入职日期">
        <template slot-scope="scope">
          <span>{{scope.row.REG_DATE}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination :current-page.sync="form_data.page_no" :page-size.sync="form_data.page_size" :total="form_data.page_total"
        layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="编号" prop="EMP_NO">
          <el-input v-if="dialogStatus == 'create'" v-model="form.EMP_NO" placeholder="请输入编号"></el-input>
          <el-input v-else v-model="form.EMP_NO" placeholder="请输入编号" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="EMP_NAME">
          <el-input v-model="form.EMP_NAME" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="EMP_PASS">
          <el-input type="password" v-model="form.EMP_PASS"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select class="filter-item" v-model="form.GENDER_CODE" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.REMARK"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllUsers,
  addObj,
  getObj,
  delObj,
  putObj
} from "@/api/admin/user/index";

import global_ from "@/common/Global";

// import { mapGetters } from 'vuex'

export default {
  name: "user",
  data() {
    return {
      form: {
        EMP_NO: undefined,
        EMP_NAME: undefined,
        GENDER_CODE: "男",
        group: undefined,
        EMP_PASS: undefined,
        REMARK: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入账户",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      form_data: {
        page_total: 0,
        page_size: 10,
        page_no: 1,
        EMP_NAME: undefined
      },
      sexOptions: global_.dictItems("GENDER_CODE"),
      dialogFormVisible: false,
      dialogStatus: "",
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created() {
    this.getList();
    this.userManager_btn_edit = true;
    this.userManager_btn_del = true;
    this.userManager_btn_add = true;
  },
  // computed: {
  //   ...mapGetters([
  //     'elements'
  //   ])
  // },
  methods: {
    getList() {
      this.listLoading = true;
      getAllUsers(this.form_data).then(response => {
        this.list = response.data;
        this.form_data.page_total = response.status.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.form_data.page_size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.form_data.page_no = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getAllUsers(row).then(response => {
        this.form = response.data[0];
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        username: undefined,
        name: undefined,
        sex: "男",
        group: undefined,
        password: undefined,
        description: undefined
      };
    }
  }
};
</script>
