<template>
  <!-- 360 服务团队表格 -->
  <div class="yh-ser-team-table">
    <div class="table-header clearfix">
      <h3>服务团队</h3>
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" class="set" href="javascript:void(0)" @click="setMain()">设为主要</a>
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" href="javascript:void(0)" @click="AddClick()" >
        添加
      </a>
      <el-dialog title="服务团队" :visible.sync="dialogVisibleAdd" width="800px">
        <div class="activity_dialog clearfix">
          <QueryList @init="init" ref="serverInfo" :parentPage="parentPage" @doAddCancel="doAddCancel"></QueryList>
        </div>
      </el-dialog>
    </div>
    <div v-if="tableData" class="ser-team-table">
      <el-table :data="tableData" highlight-current-row @row-click="handleCurrentChangeTable" stripe size="mini" max-height=800
        style="width: 100%">
        <el-table-column v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" label="操作" width="80" align="center">
          <template slot-scope="scope">
            <div class="operate-box"  v-show="scope.row.RelaType === '9' || scope.row.RelaType === '10' || scope.row.RelaType === '11'">
              <span class="edit" @click="editCustomerType(scope.$index, scope.row)">编辑</span>
              <span class="edit" @click="removeSrvteaminfo(scope.$index, scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否主要" width="80" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.IsMain =="1" ? "√" : ""}}</div>
          </template>
        </el-table-column>
        <el-table-column label="员工工号" show-overflow-tooltip width="100" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.EmpNo }}</div>
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{scope.row.EmpName}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.EmpName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="关系类型" width="" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{scope.row.RelaType | productFilter(dictypeObj.EDW50036, scope.row.RelaType)}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="关系建立日期" width="" align="center">
          <template slot-scope="scope">
            <div>
              {{ scope.row.AppendDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分配人" width="" align="center">
          <template slot-scope="scope">
            <div>
              {{ scope.row.OrgEmployee !=null ? scope.row.OrgEmployee.EmpName : ''}}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="固定电话" width="" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.FixPhone }}</div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="ser_page">
      <el-pagination v-if="pages" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]" :page-size="page" layout="total, sizes, prev, pager, next, jumper" :total="pages.Total">
      </el-pagination>
    </div>
    <el-dialog
      title="修改服务团队人员"
      :visible.sync="dialogVisibleEdit"
      width="40%">
      <div class="edit-box">
        <ul class="edit-list-box">
          <li class="edit-name-list">
            <div class="edit-name">
              <span>员工工号：{{tableDatasObj.EmpNo}}</span>
              <span>员工姓名：{{tableDatasObj.EmpName}}</span>
            </div>
            </li>
          <li class="edit-name-list">
              <div class="edit-RelaType clearfix">
                <span class="reaTpye-title">关系类型：</span>
                <div class="relaType-box">
                  <el-select v-model="checkRelaType" placeholder="请选择">
                    <el-option
                      v-for="item in customerType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('edit')">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import QueryList from "./QueryList";
import {
  getTableList,
  mainTableList,
  updatesrvteaminfo,
  deletesrvteaminfo
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import "@/filters/filters.js"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
export default {
  name: "ServiceTeamTable",
  components: {
    QueryList
  },
  data() {
    return {
      uuid: "", //---------------------------------------------选择的客户uuid
      mainProwId: null, //-------------------------------------设为主要的ProwId
      uuid_: null, //------------------------------------------设为主要的uuid
      mainUposId: null, //-------------------------------------设为主要的用户ID
      mainRelaType: null, //-----------------------------------设为主要的关系类型
      dialogVisibleAdd: false, //------------------------------父组件的添加判断
      addClickShow: false, //----------------------------------父组件的添加判断
      tableData: null, //--------------------------------------后台数据
      pages: null, //------------------------------------------后台数据
      currentPage: 1, //---------------------------------------当前页
      page: 10, //-----------------------------------------------要展示的多少页
      checkCustomerType: null,
      dictypeObj: DICTYPE,
      customerType: [], // 客户员工关系类型
      oldRelaType: null,
      // isEdit: false,
      tabeEditkey: -1,
      dialogVisibleEdit: false,
      relaTypeList: [],
      tableDatasObj: {},
      checkRelaType: 0
    };
  },
  props: ["parentPage"],

  created() {
    this.init();
    this.getrelaType();
  },

  mounted() {},

  methods: {
    init(query) {
      if ("regCust" == this.parentPage) {
        this.uuid = this.$store.getters.Uuid_Reg_Cust;
      } else {
        this.uuid = this.$store.getters.Uuid_formal;
      }
      var query = {
        param: {
          Uuid: this.uuid,
          sysPosition: {
            department: ""
          }
        },
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.page,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      //console.log(query);
      getTableList(query)
        .then(response => {
          response.Data.forEach(item => {
            item.edit = false; //点击编辑修改显示下拉框隐藏关系类型框
          });
          this.pages = response.PageInfo;
          this.tableData = response.Data;
        })
        .catch(() => {});
    },

    /**
     * 获取相应的关系类型
     */
    getrelaType() {
      let trelaType = dictItems(DICTYPE.EDW50036);
      trelaType.forEach((item, key) => {
        if (item.value === "9" || item.value === "10" || item.value === "11") {
          this.customerType.push(item);
        }
      });
    },

    // ---------------------------------------------------所有数据
    handleSizeChange(val) {
      this.page = val;
      this.init();
    },
    // ---------------------------------------------------当前页
    handleCurrentChange(val) {
      this.init();
    },
    handleCurrentChangeTable(val) {
      if (val != null) {
        this.uuid_ = val.Uuid;
        this.mainProwId = val.ProwId; //-------------------设为主要的Uuid
        this.mainUposId = val.UposId; //-------------------设为主要的用户ID
        this.mainRelaType = val.RelaType; //---------------设为主要的关系类型
      }
    },
    //-----------------------------------------------------设为主要点击事件
    setMain() {
      if (this.mainUposId == null) {
        this.$confirm("请选择需要设置的列点击！")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      } else {
        var main = {
          param: {
            ProwId: this.mainProwId,
            UposId: this.mainUposId,
            RelaType: this.mainRelaType,
            uuid: this.uuid_,
            IsMain: "1"
          }
        };
        this.$confirm("是否确定设为主要", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            mainTableList(main)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "设置成功!"
                });
                this.init();
              })
              .catch(() => {
                //alert("访问出错 联系信息");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消设置"
            });
          });
      }
    },
    // -----------------------------------------------------------添加点击按钮
    AddClick() {
      this.dialogVisibleAdd = true;
      this.mainUposId = null;
      if (this.addClickShow == true) {
        this.$refs.serverInfo.query();
      }
    },
    //-------------------------------------------------------------服务团队的添加请求后的返回方法
    doAddCancel() {
      this.init();
      this.addClickShow = true;
      this.dialogVisibleAdd = false;
    },
    //------------------------------------------------------------服务团队关闭添加的弹窗确认（暂无使用） :before-close="handleCloseAdd"
    handleCloseAdd(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /**
     * 编辑客户类型
     * key index
     * data {} 当条的数据
     */
    editCustomerType(key, data = {}) {
      this.mainUposId = null;
      this.dialogVisibleEdit = true;
      this.tableDatasObj = data;
      this.oldRelaType = data.RelaType;
      this.checkRelaType = data.RelaType;
      this.tabeEditkey = key;
      // let tableObj = data;
      // let tableArr = this.tableData;
      // if (this.isEdit) {
      //   let oldTableObj = tableArr[this.tabeEditkey];
      //   for (let k = 0; k < tableArr.length; k++) {
      //     const element = tableArr[k];
      //     if (k !== key) {
      //       element.edit = false;
      //     }
      //   };
      //   this.$set(oldTableObj, 'RelaType', this.oldRelaType);
      // };
      // this.oldRelaType = data.RelaType;
      // this.isEdit = true; // 是否处于编辑状态
      // this.$set(tableObj, 'edit', true);
    },

    /**
     * 确认修改客户类型
     * key index
     * data {} 当前条数据
     * type 确认 取消
     */
    confirmEdit(type = "") {
      let that = this;
      that.dialogVisibleEdit = false;
      // let tableObj = data;
      // this.isEdit = false;`
      if (type === "edit") {
        this.tableDatasObj.RelTypeOld = this.oldRelaType;
        that.$set(this.tableDatasObj, "RelaType", this.checkRelaType);
        that.editsrvteaminfo(this.tableDatasObj);
      }
    },

    /**
     * 删除团队成员
     */
    removeSrvteaminfo(index, data) {
      let removeData = {
        param: {
          ProwId: data.ProwId,
          Uuid: data.Uuid,
          UposId: data.UposId,
          RelTypeOld: data.RelaType
        }
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.mainUposId = null;
          deletesrvteaminfo(removeData)
            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            })
            .catch(() => {});
        })
        .catch(() => {
          this.mainUposId = null;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /**
     * 通过客户ID编辑服务团队成员详细信息
     * data 提交当前条修改的数据
     */
    editsrvteaminfo(data) {
      let sideFromData = {
        param: data
      };
      updatesrvteaminfo(sideFromData)
        .then(data => {
          if (data.Meta.Success) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "修改失败，请重新修改",
              type: "error"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clearfix:after {
  content: "";
  clear: both;
  display: block;
}
.clearfix {
  zoom: 1; /* for ie6 */
}
.yh-ser-team-table {
  position: relative;
  margin: 10px 15px;
  min-height: 500px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  padding-top: 0px;
  background: #fff;
  padding: 0 20px;
  border-radius: 3px;
  .set {
    color: #ffffff;
  }

  .set:hover {
    color: #b3844e;
    background: #ffffff;
  }
  .ser-team-table {
    text-align: center;
    width: 100%;
    min-height: 200px;
    margin-top: 10px;
    box-sizing: border-box;
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .ser_page {
    text-align: right;
    padding: 10px 20px;
  }
  .activity_dialog {
    margin: 0;
  }
  .operate-box {
    .edit,
    .confirm {
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .edit-box {
    .edit-list-box {
      padding: 0 20px;
      .edit-name-list {
        width: 100%;
        .edit-name {
          width: 60%;
          margin: 0 auto;
          span {
            &:first-child {
              padding-right: 12px;
            }
          }
        }
        .edit-RelaType {
          padding: 16px 0;
          width: 60%;
          margin: 0 auto;
          .relaType-box,
          .reaTpye-title {
            float: left;
          }
        }
        li {
          padding: 14px 0;
        }
      }
    }
  }
}
</style>
