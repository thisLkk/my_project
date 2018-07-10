<template>
  <div class="app-container calendar-list-container">
  <el-row>
    <el-col :span="24">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="handlerAdd">添加字典
        </el-button>
        <el-button type="primary" icon="el-icon-edit" :disabled="code==''?'disabled':false" @click="handlerEdit">编辑字典
        </el-button>
        <el-button type="primary" icon="el-icon-delete" :disabled="code==''?'disabled':false" @click="handleDelete">
          删除字典
        </el-button>
        <el-button type="primary" icon="el-icon-plus" :disabled="code==''?'disabled':false" @click="showAddDictsDlog">
          添加字典项
        </el-button>
        <el-button type="primary" icon="el-icon-edit" :disabled="code==''?'disabled':false" @click="showEditDictsDlog">
          编辑字典项
        </el-button>
          <el-button type="primary" icon="el-icon-delete" :disabled="code==''?'disabled':false" @click="showDelDictsDlog">
            删除字典项
          </el-button>
      </el-button-group>
    </el-col>
    <el-col :span="8" class="max-height" style='margin-top:15px;overflow: auto;'>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree class="filter-tree" :data="treeData" node-key="code" highlight-current :props="defaultProps"
               :filter-node-method="filterNode" ref="groupTree" @node-click="getNodeData" default-expand-all></el-tree>
    </el-col>
    <el-col :span="16" style='margin-top:15px;'>
      <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
        <el-form-item v-for="(item , index) in dictObj" :key="index" :label="item.item_code">
          <el-input :value="item.item_name" :disabled="formEdit"></el-input>
        </el-form-item>

      </el-form>
    </el-col>
    <el-dialog :title="dialogUserName" :visible.sync="dialogUserVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDict">确认</el-button>
          <el-button @click="dialogUserVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="dialogUserName" :visible.sync="addDictsDlog">
      <el-form :label-position="labelPosition" label-width="100px" :model="form" ref="form">
        <el-form-item label="字典代码">
          <el-input v-model="code" disabled></el-input>
        </el-form-item>
        <el-form-item label="字典项名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="字典项取值">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDicts">确认</el-button>
          <el-button @click="addDictsDlog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="dialogUserName" :visible.sync="dialogEditVisible">
      <el-form :label-position="labelPosition" label-width="100px" :model="form" ref="form">
        <el-form-item label="字典项名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editDict">确认</el-button>
          <el-button @click="dialogEditVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="dialogUserName" :visible.sync="editDictsDlog">
      <el-form :label-position="labelPosition" label-width="100px" :model="form" ref="form">
        <el-form-item label="字典代码">
          <el-input v-model="code" disabled></el-input>
        </el-form-item>
        <el-form-item label="字典项取值">
          <el-select v-model="form.code" @change="changeDictName" placeholder="请选择">
            <el-option
              v-for="item in dictArr"
              :key="item.item_code"
              :label="item.item_code + ' ' +item.item_name"
              :value="item.item_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典项名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editDictItem">确认</el-button>
          <el-button @click="editDictsDlog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      <el-dialog :title="dialogUserName" :visible.sync="delDictsDlog">
        <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
          <el-form-item label="字典代码">
            <el-input v-model="code"  disabled></el-input>
          </el-form-item>
          <el-form-item label="字典项取值">
            <el-select v-model="form.code" @change="changeDictName" placeholder="请选择">
              <el-option
                v-for="item in dictArr"
                :key="item.item_code"
                :label="item.item_code + ' ' +item.item_name"
                :value="item.item_code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="delDictItem">确认</el-button>
            <el-button @click="delDictsDlog=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </el-row>
  </div>
</template>
<style scoped>
  .max-height {
    height: 70vh
  }
</style>
<script>
  import {
    list, dictList, getDictItems, addDict, delDict, editDict, addDicts, editDictItem
  } from '@/api/dataDictionary';
  // import { mapGetters } from 'vuex';
  import Vue from 'vue'
  import {getDictObj, getDict} from '@/utils/index'
  export default {
    name: 'dataDictionary',
    components: {},
    props: {
      type: {
        default: '1'
      }
    },
    data() {
      return {
        filterText: '',
        itemList: [],
        dictArr: [],
        total: null,
        dictObj: {},
        code: '',
        name: '',
        formEdit: true,
        formAdd: true,
        addDictsDlog: false,
        delDictsDlog: false,
        editDictsDlog: false,
        dialogUserVisible: false,
        dialogEditVisible: false,
        dialogUserName: "新增字典",
        formStatus: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        labelPosition: 'right',
        form: {
          code: undefined,
          name: undefined,
        },
        currentId: -1
      }
    },
    watch: {
      filterText(val) {
        this.$refs.groupTree.filter(val);
      }
    },
    created() {
      this.getList();
      this.getItemList();
    },
    computed: {
      // ...mapGetters([
      //   'elements'
      // ])
    },
    methods: {
      getList() {
        dictList().then(data => {
          this.treeData = data.data;
        });
      },
      getItemList() {
        list().then(data => {
          this.itemList = data.data;
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      getNodeData(data) {
        this.code = data.code;
        this.form.name = data.name;
        // let dictObj = getDictObj(data.code)
        // this.dictObj = dictObj
        getDictItems({ dict_code: data.code }).then(response => {
          this.dictObj = response.data;
        });
        // this.currentId = data.code;
      },
      changeDictName(value) {
        for (var item in this.dictArr) {
          if (this.dictArr[item].item_code === value) {
            this.form.name = this.dictArr[item].item_name
            return
          }
        }
      },
      showAddDictsDlog() {
        this.dialogUserName = '添加字典项';
        this.resetForm();
        this.addDictsDlog = true
      },
      showEditDictsDlog() {
        this.dialogUserName = '编辑字典项';
        this.resetForm();
        let dictArr = []

        for (let i in this.dictObj) {
          dictArr.push(this.dictObj[i])
        }
        this.dictArr = dictArr
        this.editDictsDlog = true
      },
      showDelDictsDlog() {
        this.dialogUserName = '删除字典项';
        this.resetForm();
        let dictArr = []
        for (let i in this.dictObj) {
          dictArr.push(this.dictObj[i])
        }
        this.dictArr = dictArr
        this.delDictsDlog = true
      },
      handlerEdit() {
        this.dialogUserName = '编辑字典';
        this.dialogEditVisible = true
      },
      handlerAdd() {
        this.resetForm();
        this.dialogUserVisible = true;
      },
      handleDelete() {
        let param = {
          dict_code: this.code
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDict(param).then(() => {
            this.getList();
            this.resetForm();
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
          });
        });
      },
      editDictItem() {
        let param = {
          item_code: this.form.code,
          item_name: this.form.name,
          dict_code: this.code
        }
        editDictItem(param).then(() => {
          this.getList();
          this.editDictsDlog = false
          this.$notify({
            title: '成功',
            message: '编辑成功',
            type: 'success',
            duration: 2000
          });
        });
      },
      delDictItem() {
        let param = {
          item_code: this.form.code,
          dict_code: this.code
        }
        delDict(param).then(() => {
          this.getList();
          this.deltDictsDlog = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
        });
      },
      editDict() {
        let param = {
          dict_name: this.form.name,
          dict_code: this.code
        }
        editDict(param).then(() => {
          this.getList();
          this.dialogEditVisible = false
          this.$notify({
            title: '成功',
            message: '编辑成功',
            type: 'success',
            duration: 2000
          });
        });
      },
      addDict() {
        let param = {
          dict_name: this.form.name,
          dict_code: this.form.code
        }
        addDict(param).then(() => {
          this.getList();
          this.dialogUserVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
        });
      },
      addDicts() {
        let param = {
          item_name: this.form.name,
          item_code: this.form.code,
          dict_code: this.code
        }
        addDicts(param).then(() => {
          this.getList();
          this.$store.dispatch('itemList')
          this.addDictsDlog = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
        });
      },
      resetForm() {
        this.form = {
          code: undefined,
          name: undefined,

        };
      }
    }
  }
</script>
