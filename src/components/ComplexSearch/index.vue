<template>
  <el-container>
      <el-aside width="210px" style="padding-top: 20px;">
          <el-input placeholder="请输入条件" v-model="filterText">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div style='border: 1px solid #bfcbd9;'>
              <div style='height:40px;padding:10px;font-size:16px;background-color:LightGrey;'>
                  <span>选择条件</span>
              </div>
              <div class='condition-container'>
                <el-menu :unique-opened='true' >
                  <template v-for="item in conditionMenu">
                    <el-submenu v-if="item.children != null"  :index="item.id.toString()" :key="item.id">
                      <template slot="title">
                        <span>{{item.title}}</span>
                      </template>
                      <div v-for="subitem in item.children" :key="subitem.id" draggable='true' @dragstart='drag($event,subitem)'>
                        <el-menu-item :index='subitem.id.toString()'>
                          <span slot="title">{{subitem.title}}</span>
                        </el-menu-item>
                      </div>
                    </el-submenu>
                    <el-menu-item v-else :index='item.id.toString()' :key="item.id">
                      <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                  </template>
                </el-menu>
              </div>
          </div>    
      </el-aside>
      <el-main>
        <el-card>
          <div slot="header">
            <span>组合条件一</span>
          </div>
          <el-form :model="conForm1" ref='conForm1'>
            <div class="dragArea" @drop='drop($event,conditionList1)' @dragover='allowDrop($event)'>            
                <div class="list-complete-item" v-for="(element,index) in conditionList1" :key='index' style="float:left;">
                  <el-form-item :prop="element.id" :rules="genRules(index,conditionList1)">
                    <condition-item style="margin-right: 20px;" :label="element.title" :type="element.type"
                      :dict="(element.dict !== null) ? element.dict:''"
                      :value="conForm1[element.id]"
                      @onvaluechange="val => { conForm1[element.id] = val; validateField(element.type,element.id) }">
                    </condition-item>
                    <div style="position:absolute;right:0px;">
                      <span style="float: right ;margin-top: -45px;" @click="deleteEle(element, conditionList1, conForm1)">
                        <i style="color:#ff4949" class="el-icon-remove-outline"></i>
                      </span>
                    </div>
                  </el-form-item>
                </div>
            </div>
          </el-form>
        </el-card>
        <h4><font color="red">组合条件一和组合条件二是"或"的关系</font></h4>
        <el-card class="box-card">
          <div slot="header">
            <span>组合条件二</span>
          </div>
          <el-form :model="conForm2" ref='conForm2'>
            <div class="dragArea" @drop='drop($event,conditionList2)' @dragover='allowDrop($event)'>            
                <div class="list-complete-item" v-for="(element,index) in conditionList2" :key='index' style="float:left;">
                  <el-form-item :prop="element.id" :rules="genRules(index,conditionList2)">
                    <condition-item style="margin-right: 20px;" :label="element.title" :type="element.type"
                      :dict="(element.dict !== null) ? element.dict:''"
                      :value="conForm2[element.id]"
                      @onvaluechange="val => { conForm2[element.id] = val; validateField(element.type,element.id) }">
                    </condition-item>
                    <div style="position:absolute;right:0px;">
                      <span style="float: right ;margin-top: -45px;" @click="deleteEle(element, conditionList2, conForm2)">
                        <i style="color:#ff4949" class="el-icon-remove-outline"></i>
                      </span>
                    </div>
                  </el-form-item>
                </div>
            </div>
          </el-form>
        </el-card>
        <div style="margin-top:20px;text-align:right;padding-left:10px;">
          <el-button type="primary" size="small" @click="onSave">保存条件</el-button>
          <el-button type="success" size="small" @click="onSubmit">确认</el-button>
          <el-button type="danger" size="small" @click="onReset">重置</el-button>
        </div>
      </el-main>
  </el-container>

</template>
<script>
import draggable from 'vuedraggable'
import ConditionItem from './components/ConditionItem'
// import { isArray } from '@/utils'

export default {
  name: 'ComplexSearch',
  components: { draggable, ConditionItem },
  props: {
    conditions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      filterText: '',
      conditionMenu: {},
      conditionList1: [],
      conditionList2: [],
      dragElement: undefined,
      conForm1: {},
      conForm2: {},
      validateNumber: (rule, value, callback) => {
        if (value == null || value.length !== 2) {
          callback(new Error('不能为空'))
        } else if (value[0] > value[1]) {
          callback(new Error('起始区间值大小错误'))
        } else {
          callback()
        }
      },
      validateSelect: (rule, value, callback) => {
        console.log('validateSelect1:' + JSON.stringify(value))
        if (value == null || value.length === 0) {
          callback(new Error('不能为空！'))
        } else {
          callback()
        }
      },
      validateDate: (rule, value, callback) => {
        if (value == null || value.length === 0) {
          callback(new Error('不能为空'))
        } else {
          callback()
        }
      }
    }
  },
  watch: {
    filterText(val) {
      // this.$refs.conditionTree.filter(val)
      var subMenu = {}
      var children = []
      this.conditionMenu = []
      if (val == null || val === '') {
        this.conditionMenu = this.conditions
      } else {
        for (var item of this.conditions) {
          subMenu = { id: item.id, title: item.title }
          children = []
          if (item.children) {
            for (var subitem of item.children) {
              if (this.filterNode(val, subitem)) {
                children.push(subitem)
              }
            }
          }
          if (children.length > 0) {
            subMenu['children'] = children
            this.conditionMenu.push(subMenu)
          } else if (this.filterNode(val, item)) {
            this.conditionMenu.push(subMenu)
          }
        }
      }
    }
  },
  mounted() {
    this.conditionMenu = this.conditions
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    drag: function(event, element) {
      // this.dom = event.currentTarget
      this.dragElement = element
    },
    drop: function(event, targetlist) {
      event.preventDefault()
      // event.target.appendChild(this.dom);
      if (this.dragElement) {
        // console.log('drop:' + JSON.stringify(this.dragElement))
        if (targetlist.length >= 6) {
          this.$message('最多设置6个条件')
          this.dragElement = undefined
          return
        }

        if (!targetlist.every(k => k.id !== this.dragElement.id)) {
          this.dragElement = undefined
          return
        }

        targetlist.push(this.dragElement)
        this.dragElement = undefined
      }
    },
    allowDrop: function(event) {
      event.preventDefault()
    },
    // select 控件校验规则在数据改变之后，未解，暂时通过重新校验来处理
    validateField(type, prop) {
      if (type === 'select') {
        this.$refs.conForm1.validateField(prop, (msg) => {})
      }
    },
    onSubmit() {
      this.$refs['conForm1'].validate((valid) => {
        if (valid) {
          this.$refs['conForm2'].validate((valid) => {
            if (valid) {
              this.$emit('submitForm', [this.conForm1, this.conForm2])
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          console.log('error submit!!');
          return false
        }
      })
    },
    onSave() {
    },
    onReset() {
      this.conditionList1 = []
      this.conditionList2 = []
      this.conForm1 = {}
      this.conForm2 = {}
    },
    deleteEle(ele, list, form) {
      for (const item of list) {
        if (item.id === ele.id) {
          const index = list.indexOf(item)
          list.splice(index, 1)
          break
        }
      }
      delete form[ele.id]
    },
    genRules(index, List) {
      var item = List[index]
      if (item.type === 'date') {
        return [
          { validator: this.validateDate, trigger: 'blur' }
        ]
      } else if (item.type === 'select') {
        return [
          { validator: this.validateSelect, trigger: 'change,blur' }
        ]
      } else if (item.type === 'number') {
        return [
          { validator: this.validateNumber, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.el-card__header {
    padding:5px 5px;
}


.condition-container {
  .el-menu {
    border: none;
    width: 100%;
    background-color: #F5FFFA;
    
  }
  .el-submenu {
    border-bottom: 1px solid #bfcbd9;
    &>.el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
    .el-menu-item {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #ffffff;
      &:hover {
        background-color: #C8EBFB;
      }
    }
  }
}

.dragArea {
  height: 180px;
  padding: 5px;
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  margin: 5px 20px 5px 0;
  transition: all 1s;
}


.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}

</style>