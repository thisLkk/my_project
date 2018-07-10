<template>
<div class="settable">
    <el-row :gutter="10">
      <el-col :span="2">
    <el-button type="primary" @click="visible=true" size="mini">设置列</el-button>
     </el-col>
     <el-col v-for="item in data.controls" :span="2">
    <el-button type="primary" size="mini"  @click="handleControlClick(item.event)">{{item.name}}</el-button>
    </el-col>
    <el-col  :span="2">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.pageData.cur"
      :page-sizes="data.pageSizeType"
      :page-size="data.pageData.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.pageData.total">
    </el-pagination>
    </el-col>
    </el-row>
 <el-dialog
  title=""
  :modal="!true"
  :visible.sync="visible"
  width="10%"
  >
  <!--
  <span>
    <el-checkbox-group v-model="selectColumn">
    <el-checkbox :label="item.label" v-for="item in tableHeader"></el-checkbox>
  </el-checkbox-group>
  </span>
  -->
  <span>
    <el-table
    :data="data.tableHeader"
    tooltip-effect="dark"
    border
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="label"
      label="全选"
    >
    </el-table-column>
  </el-table>
  </span>
  <!--
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleSetColumn">确 定</el-button>
  </span>
  -->
</el-dialog>
    <el-table
      :data="data.tableData"
      strip
      border
      style="width: 80%"
      @selection-change="tableHandleSelectionChange">
      <el-table-column type="selection" width="55" v-if="showHeader.length > 0" >
      </el-table-column>
      <el-table-column 
        sortable
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        v-for="item in showHeader">
      </el-table-column>
    </el-table>
</div>

</template>

<script>
    export default {
    props: {
      data: {
        type: Object,
        default: function() {
          return {
          controls: [
            {
              name: "导出",
              event: "export"
            },
            {
              name: "查询",
              event: "search"
            }
          ],
          tableHeader: [
              {
                  prop: "date",
                  label: "日期",
                  width: "180"
              },
              {
                  prop: "name",
                  label: "姓名",
                  width: "180"
              },
              {
                  prop: "address",
                  label: "地址",
                  width: "180"
              }
          ],
          pageSizeType:[10, 20, 50, 100],
          pageData: {
            size: 10,
            total: 100,
            cur: 1
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
          }
        }
      }
    },
    
    created() {
        this.init()
    },
    data() {
        return {
          visible: false,
          showHeader: [],
          tableSetting: {},
          tableSelection:[],
          data: {

          tableHeader: [
              {
                  prop: "date",
                  label: "日期",
                  width: "180"
              },
              {
                  prop: "name",
                  label: "姓名",
                  width: "180"
              },
              {
                  prop: "address",
                  label: "地址",
                  width: "180"
              }
          ],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
        }
      },
      methods: {
         init(){
             for(var item in this.data.tableHeader){
                 this.tableSetting[this.data.tableHeader[item].label] = this.data.tableHeader[item];
                 this.showHeader = this.data.tableHeader
             }
         },
         handleSetColumn() {
             this.visible = false;
             
         },
         handleSelectionChange(val) {
            this.showHeader = val;
        },
        tableHandleSelectionChange(val) {
          console.log("1:");
          console.log(val);
          this.tableSelection = val;
          this.$emit('tableSelectChange', val);
        } ,
        handleControlClick(event) {
          console.log("test control:" + event);
          this.$emit(event, "");
        },
        handleSizeChange(val) {
          this.$emit("pageSizeChange", val);
        },
        handleCurrentChange(val){
          this.$emit("pageCurChange", val)
        }
      }
    }
  </script>