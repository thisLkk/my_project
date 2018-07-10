<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary" v-if="menuManager_btn_add" icon="el-icon-plus" @click="handlerAdd">添加</el-button>
        <el-button type="primary" v-if="menuManager_btn_edit" icon="el-icon-edit" @click="handlerEdit">编辑</el-button>
        <el-button type="primary" v-if="menuManager_btn_del" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      </el-button-group>
    </div>

    <el-row>
      <el-col :span="8" style='margin-top:15px;'>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :data="treeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="menuTree"
          @node-click="getNodeData"
          default-expand-all
        >
        </el-tree>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <el-form-item label="节点代码" prop="code">
              <el-input v-model="form.code" :disabled="formEdit" placeholder="请输入节点代码"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" :disabled="formEdit" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点" readonly></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
            	<el-select class="filter-item" v-model="form.icon" :disabled="formEdit" placeholder="请选择图标">
                <el-option v-for="item in icons" :key="item" :label="item" :value="item"><i :class="'el-'+item"> el-{{item}}</i></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资源路径" prop="href">
              <el-input v-model="form.href" :disabled="formEdit" placeholder="请输入资源路径"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select class="filter-item" v-model="form.type" :disabled="formEdit" placeholder="请输入资源请求类型">
                <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sortNo">
              <el-input v-model="form.sortNo" :disabled="formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {fetchTree, getObj, addObj, delObj, putObj} from '@/api/admin/menu/index';

import { mapGetters } from 'vuex';
export default {
  name: 'menus',
  data() {
    return {
    	form:{
        code:"",
				href:"",
				icon:"",
				id:"",
				level:"",
				parentId:"",
				sortNo:"",
				status:"",
				title:"",
				type:""
      },
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['menu', 'dirt'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false,
      icons:['icon-edit','icon-share','icon-delete']
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_add = true // this.elements['menuManager:btn_add'];
    this.menuManager_btn_del = true // this.elements['menuManager:btn_del'];
    this.menuManager_btn_edit = true // this.elements['menuManager:btn_edit'];
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        var rootMenu = [{
          id: -1,
          parentId: -1,
          children: data.data,
          code: 'root',
          title: '系统菜单',
          path: '/',
          spread: false
        }]
        this.treeData = rootMenu;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      this.currentId = data.id;

      if (data.id === -1) {
        return
      }

      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getObj(data.id).then(response => {
      	this.form = response.data[0];
      });
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      this.resetForm();
      this.formEdit = false;
      this.formStatus = 'create';
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    update() {
      putObj(this.form).then(() => {
        this.getList();
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
      });
    },
    create() {
      addObj(this.form).then(() => {
        this.getList();
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        });
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined
      };
    }
  }
}
</script>

