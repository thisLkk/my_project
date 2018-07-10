<template>
<!--注册客户 360 关联客户 -->
  <div class="yh-panoramicViewCorrelationCustRegCust">
    <div class="table-header clearfix">
      <h3>关联客户</h3>
       <a href="javascript:void(0)">
        <el-button type="text" @click="dialogVisible = true">新建</el-button>
      </a>
      <!-- 新增分组弹窗-->
      <div>
                <el-dialog title="客户关联关系新增" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
                  <div class="activity_dialog clearfix">
                    <el-form :model="form_data"  label-width="90px" ref="ruleForm" label-position="right" >
                      <el-row>
                        <el-col :offset="1" :span="10">
                          <el-form-item label="客户名称：" prop="var1">
                            <inputButtonCE></inputButtonCE>
                          </el-form-item>
                        </el-col>
                        <el-col  :offset="1" :span="10">
                          <el-form-item label="关系类型：" prop="var2">
                            <el-select placeholder="请选择" v-model="form_data.var2" size="medium">
                              <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in gxlx_items" />
                            </el-select>                          
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :offset="1" :span="10">
                          <el-form-item label="创建人：" prop="var1">
                            <el-input :disabled=" true"  v-model="form_data.var3" placeholder="请输入内容"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col  :offset="1" :span="10">
                          <div class="yh-timeinput">
                            <el-form-item label="创建时间：" prop="var3">
                              <el-date-picker :disabled=" true" v-model="form_data.var4" type="date" placeholder="选择日期">
                              </el-date-picker>
                            </el-form-item>
                          </div>
                        </el-col>
                      </el-row>
                      
                      <el-row>
                        <el-col :offset="1" :span="21">
                          <el-form-item label="描述：" prop="var4">
                            <el-input type="textarea" v-model="form_data.var5" :rows="3"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    
                    </el-form>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                      <i class="fa fa-check diologBtn"></i>确 定</el-button>
                    <el-button @click="dialogVisible = false">
                      <i class="fa fa-close diologBtn"></i> 取 消</el-button>
                  </span>
                </el-dialog>
              </div>
    </div> 
    <div class="yh-correlation-cust-table">
      <el-table :data="tds" border style="width: 100%" >
         <el-table-column prop="custName" label="客户名称"></el-table-column>
         <el-table-column prop="corrType" label="关联类型"></el-table-column>    
         <el-table-column prop="createdDate" label="建立日期"></el-table-column>    
         <el-table-column prop="createdUser" label="创建人"></el-table-column>    
         <el-table-column prop="description" label="描述"></el-table-column>          
      </el-table>
    </div>
    <div class="ser_page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { QueryList } from "@/views/organization/custmanage/components/index.js";
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee";

export default {
  name: "PanoramicViewCorrelationCustRegCust",
  components: {
    QueryList,
    inputButtonCE
  },
  data() {
    return {
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 10,
      form_data: {
        var1: "XX股份有限公司",
        var2: "2",
        var3: "李四",
        var4: "2018-07-08",
        var5:"上市公司股东"
      },
      tds: [
        {
          custName: "张氏股份有限公司",

          corrType: "金融产品推荐",

          createdDate: "2018-04-12",

          createdUser: "张三",

          description: "张三之后，再无张三"
        },
        {
          custName: "李氏股份有限公司",

          corrType: "金融产品推荐",

          createdDate: "2018-04-19",

          createdUser: "李四",

          description: "李四之后，再无李四"
        }
      ],
      gxlx_items:[
        {"value":"控股股东",
        "key":"1"},
        {"value":"上游供应商",
        "key":"2"},
        {"value":"子公司",
        "key":"3"},
        {"value":"高管",
        "key":"4"},
        {"value":"实际控制人",
        "key":"5"},
      ],
      
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.yh-panoramicViewCorrelationCustRegCust {
  position: relative;
  margin: 20px;
  min-height: 300px;
  padding-top: 20px;
  box-sizing: border-box;
  border: 4px solid #eeeeee;
}

/* 关联客户信息 */
.activity_dialog {
  margin: 0;
}

/* 列表信息 */

.yh-correlation-cust-table {
  text-align: center;
  width: 100%;
  min-height: 200px;
  padding: 0 20px;
  box-sizing: border-box;
}

.yh-correlation-cust-table table {
  width: 100%;
  padding: 0 20px;
}

.yh-correlation-cust-table table thead th {
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  font-weight: bold;
}

.yh-correlation-cust-table table tbody td {
  height: 40px;
  line-height: 40px;
}

.yh-correlation-cust-table table tbody tr:nth-child(even) {
  background: #eeeeee;
}

table,
th,
tr,
td {
  border: 2px solid #dddddd;
}

/* 分页信息 */

.ser_page {
  padding: 10px 20px;
}

</style>
