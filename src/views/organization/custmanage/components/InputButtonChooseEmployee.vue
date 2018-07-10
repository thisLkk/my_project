<template>

  <div class="yh_inputButtonChooseEmployee">
    <section>
      <div class="search-box">
        
        
        <el-input placeholder="请选择人员" readonly="readonly" v-model="chooseNames" @focus="InputClick">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="InputClick">
          </i>
          <i slot="suffix" class="el-input__icon el-icon-close" v-if="isempty()" @click="doClean"></i>
        </el-input>
        <!-- <el-input v-model="chooseNames" :placeholder="businessName" size="mini" disabled="true" width="100%">
          <i class="el-icon-search el-input__icon" slot="suffix"  @click="dialogVisible = true">
          </i>
          <i slot="suffix" class="el-input__icon el-icon-close" v-if="isempty()" @click="clearContent"></i>
        </el-input> 

        <i class="el-icon-close icon-close" @click="doClean" v-show="chooseNames"></i>-->
      </div>
      <el-dialog title="人员选择" append-to-body :visible.sync="dialogVisible" class="yh_dialog_body" width="800px">
        <div class="yh_querylist">
          <!-- 列表查询条件-客户管理-选择人员 -->
          <div class="query">
            <div class="table-header clearfix">
              <h3>{{title_}}</h3>
            </div>
            <div class="table-main clearfix ">
              <el-form :model="form_data_query" ref="form_data_query" label-position="right" label-width="90px">

                <el-row>
                  <el-col :offset="1" :span="10">
                    <el-form-item label="员工工号：">
                      <el-input v-model="form_data_query.param.orgEmployeeVO.EmpId" size="mini" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :offset="1" :span="10">
                    <el-form-item label="员工姓名：">
                      <el-input v-model="form_data_query.param.orgEmployeeVO.EmpName" size="mini" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :offset="15" :span="5">
                    <el-button size="mini" id="el_query" @click="query()"> 查 询</el-button>
                    <!-- <el-button size="mini" id="el_reset" @click="reset('form_data_query')">重 置</el-button> -->
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="yh_querylist-table clearfix">
            <h3>人员列表</h3>
            <el-table @row-click="rowClick" :data="tableData" stripe size="mini" max-height=800 style="width: 100%;">
              <el-table-column label="选择" width="55" align="center">
                <template slot-scope="scope">
                  <el-radio v-model="radio" :label="scope.row.UposId">{{kong}}</el-radio>
                </template>
              </el-table-column>
              <el-table-column label="员工号" show-overflow-tooltip width="100" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.OrgEmployeeVO.EmpId}}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ scope.row.OrgEmployeeVO.EmpId}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="员工姓名" width="" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.OrgEmployeeVO.EmpName}}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ scope.row.OrgEmployeeVO.EmpName}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="联系电话" width="" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.OrgEmployeeVO.Mob}}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ scope.row.OrgEmployeeVO.Mob}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="职位名称" width="" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.UposName}}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ scope.row.UposName}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="所属机构" width="" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <!--orgOrg.OrgAbbr-->
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">{{ UposNameWord(scope.row.OrgId) }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <div class="ser_page">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="form_data_query.pageInfo.PageNum"
                :page-sizes="[5, 10, 15 , 20]" :page-size="form_data_query.pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="form_data_query.pageInfo.Total">
              </el-pagination>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="doChoose">
              <i class="fa fa-check diologBtn"></i>选 择</el-button>
            <el-button @click="doClose">
              <i class="fa fa-close diologBtn"></i>关 闭</el-button>
          </span>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { getTeamUserPositionList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { JSONArrayToString } from "@/utils/datahandle.js";
import { dictItems, dictFilter } from "@/filters"; //------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-------------------------数据字典的方法

export default {
  name: "InputButtonChooseEmployee",
  data() {
    return {
      chooseNames: "",
      chooseId: "",
      dialogVisible: false,
      RelaType: "01",
      form_data_query: {
        param: {
          orgEmployeeVO: {
            EmpId: "", //员工编号
            EmpName: "" //员工姓名
          }
        },
        pageInfo: {
          PageNum: 1,
          PageSize: 10,
          Total: 0,
          OrderBy: "",
          Pages: 0
        }
      },
      title_: "查询条件",
      title: "人员列表",
      radio: "", //单选的提交值
      kong: "", //单选按钮不显示文字
      tableData: null
    };
  },
  //初始化完成后加载数据
  mounted() {
    // this.query();
  },
  methods: {
    isempty() {
      if (this.chooseNames != "") {
        return true;
      } else {
        return false;
      }
    },
    UposNameWord(code) {
      return dictFilter(DICTYPE.CTCCD0998, code);
    },
    InputClick() {
      this.dialogVisible = true;
      this.query();
    },

    query() {
      //查询按钮  发查询请求
      //alert("#####"+JSON.stringify(JSONArrayToString(this.form_data_query)));
      getTeamUserPositionList(JSONArrayToString(this.form_data_query))
        .then(response => {
          this.tableData = response.Data;

          this.form_data_query.pageInfo = response.PageInfo;
          ////console.log(response)
        })
        .catch(() => {
          //alert("访问出错");
        });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      //置空查询条件
      /* this.number = "";
          this.name = "";
          this.multipleSelection = []; */
    },

    handleCurrentChange(val) {
      this.query();
    },

    handleSizeChange(val) {
      this.form_data_query.pageInfo.PageSize = val;
      this.query();
    },

    doClose() {
      //this.$destroy();
      this.dialogVisible = false;
    },

    doChoose: function() {
      this.chooseNames = this.chooseName;
      this.$emit("onChooseUser", this.chooseId);
      this.doClose();
    },

    rowClick: function(row, event, column) {
      this.chooseName = row.OrgEmployeeVO.EmpName;
      this.chooseId = row.UposId;
    },
    doClean: function() {
      this.chooseNames = "";
      this.$emit("onChooseUser", "");
      this.radio = "";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_relationType {
  // border: 2px solid #eeeeee;
  margin: 20px;
  padding-left: 30px;
}

.yh_dialog_body {
  height: 100%;
}

.yh_querylist {
  // border: 2px solid #eeeeee;
  margin: 20px;
  padding-bottom: 20px;
  .query {
    height: 100px;
    margin: 20px;
    box-sizing: border-box;
    .table-main {
      .el-form {
        .el-row:nth-child(2) {
          padding-top: 15px;
        }
      }
      .mechanism,
      .job-number,
      .job-name {
        margin-left: 20px;
      }
      .mechanism .el-cascader--medium {
        width: 90%;
      }
      div .el-input {
        width: 90%;
      }
      .job-number span {
        float: left;
        display: inline-block;
      }
      .screen_btn {
        margin-right: 20px;
        margin-top: 10px;
      }
      .screen_btn .el-button {
        padding: 0;
        margin: 0;
        width: 49px;
        height: 26px;
        line-height: 10px;
        &:nth-child(1):hover {
          background: #ffffff;
          color: #a7703d;
        }
      }
    }
  }

  .yh_querylist-table {
    margin: 20px;
    min-height: 210px;
    box-sizing: border-box;
    padding: 8px;
    padding-bottom: 20px;
    h3 {
      margin: 10px 0;
    }
    .select {
      float: left;
      margin: 10px 0;
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

  .dialog-footer {
    padding-left: 40%;
  }
}

.search-box {
  position: relative;
  .icon-close {
    text-align: center;
    display: inline-block;
    height: 100%;
    padding: 0 20px;
    position: absolute;
    right: 48px;
    top: 0px;
    cursor: pointer;
    &:hover {
      &:before {
        ransform: scale(1.6);
        -webkit-transform: scale(1.4);
        -moz-transform: scale(1.4);
        -o-transform: scale(1.4);
        -ms-transform: scale(1.4);
      }
    }
    &:before {
      display: inline-block;
      margin-top: 65%;
    }
  }
}
</style>
