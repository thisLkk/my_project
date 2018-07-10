<template>
<div class="mirror">
 <el-input  placeholder="请输入内容" v-model="value">
     <template slot="prepend">{{data.label}}</template>
    <el-button slot="append" icon="el-icon-search" @click="dialogVisible=true"></el-button>
  </el-input>
<el-dialog
  :title="data.title"
  :visible.sync="dialogVisible"
  width="100%"
  >
  <el-row :gutter="10">
  <el-col :span="6" v-for="item in data.texts">
  <el-input  placeholder="aaaa" v-model="item.value" size="mini">
      <template slot="prepend">{{item.name}}</template>
  </el-input>
  </el-col>
  <el-col :span="6" v-for="item in data.selects">
  <el-select v-model="item.value" placeholder="请选择" size="mini">
    <el-option
      v-for="sel in item.choices"
      :key="sel.value" 
      :label="sel.label"
      :value="sel.value">
    </el-option>
  </el-select>
  </el-col>
  </el-row>
  <settable :data="data.tableData" @tableSelectChange="tableSelectChange" @pageSizeChange="handlePageSizeChange" @pageCurChange="handlePageChange" @search="handleControlSearch" @export="handleControlExport" ></settable>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="handleCommit()" size="mini">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<style>
.el-input {
    width: 220px;
}
.el-row {
    margin-bottom: 10px;
}
</style>


<script>
import settable from './setTable'
import request from '@/utils/request'
    export default {
        components:{
            settable
        },
        props: {
            data: {
                type: Object,
                default: function() {
                    return {
                        label: "测试1",
                        selectColumn: "name",
                        tableData: {
          controls: [
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
          pageSizeType: [10, 20, 50 , 100],
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
          },
                        texts: [
                            {
                                name: "1",
                                attr: "a",
                                value:''
                            },
                            {                            
                                name: "2",
                                attr: "b",
                                value:''
                            }
                        ],
                        selects:[
                            {
                                name: "1",
                                choices:[
                                    {
                                    label: "1",
                                    value: "1"
                                    },
                                    {
                                    label: "2",
                                    value: "2"
                                    }
                                ],
                                attr: "a",
                                value: ''
                            },
                            {
                                name: "2",
                                choices:[
                                ],
                                attr: "b",
                                value:''
                            }
                        ],
                        req: "",
                    }
                }
            }
        },
        created() {
            this.updateData()
        },
        data() {
            return {
                dialogVisible: false,
                label_name: "test:",
                pageCount: "",
                pageIdx: "",
                totalCount: "",
                val_set: [],
                value: ""
            }
        },
        methods: {
            handleCommit() {
                console.log("3:");
                this.dialogVisible = false;
                this.value=this.val_set.join(',')
                console.log("v:" + this.value);
                this.$emit("valueChange", this.value);

            },
            genParam() {
                var param = {};
                for(var idx=0; idx<this.data.texts.length; idx++) {
                    param[this.data.texts[idx].attr] = this.data.texts[idx].value; 
                }

                for(var idx=0; idx<this.data.selects.length; idx++) {
                    param[this.data.selects[idx].attr] = this.data.selects[idx].value;
                } 

                return param;
            },
            genReqData( param, page_size, page_idx) {
                var reqData = {};
                reqData['param'] = param;
                reqData['page_size'] = page_size;
                reqData['page_idx'] = page_idx;

                return reqData; 
            },
            updateData(req) {
                var self = this;
                var param = this.genParam();

                param = this.genReqData(param, this.data.tableData.pageData.size, this.data.tableData.pageData.cur);
                console.log("req:");
                console.log(JSON.stringify(param));
                request({
                    url: self.data.req,
                    method: 'get',
                    params: param
                }).then(response => {

                    console.log("res:");
                    console.log(JSON.stringify(response));
                    self.data.tableData.tableData = response.data.tabelData;
                    self.data.tableData.pageData = response.data.pageData;
                    self.$emit("tableData", response.data);
                })
            },
            handlePageSizeChange(val) {
                this.data.tableData.pageData.size = val;
                this.updateData(this.data.req);
                this.$emit("pageSizeChange", val);
            },
            handlePageChange(val) {
                this.data.tableData.pageData.cur = val;
                this.updateData(this.data.req);
                this.$emit("pageCurChange", val);
            },
            tableSelectChange(val){
                this.val_set = [];
                for(var idx = 0; idx < val.length; idx++) {
                    this.val_set.push(val[idx][this.data.selectColumn]);
                }
            },
            handleControlSearch() {
                var self = this;
                self.updateData();
            },
            handleControlExport() {
                var param = this.genParam();
                this.$emit("export", param);
            }

        }
    }
</script>