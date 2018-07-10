<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_BusinessTable">
    <div class="BusinessTable_title  clearfix">
      <h3 class="fl">协同商机列表</h3>
      <div class="el_btn fr">
        <el-button class="btn-new-build" size="mini" round @click="new_dialog()">新建协同商机</el-button>
      </div>
    </div>
    <div class="main_table">
      <el-table :data="tableData" stripe size="mini" style="width: 100%">
        <el-table-column label="" width="40" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.Prio == '01'">⭐</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="mini" id="el_edit">
              <span style="color:red;">{{scope.row.caozuo}}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CustName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CustName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="客户类型" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CustType }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CustType }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商机名称" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BusoppName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  <a href="javascript:void(0)" @click="businessNameClick(scope.row.BusoppId,scope.row.CustNo)">{{scope.row.BusoppName}}</a>
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="服务类别" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.SrvCate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.SrvCate }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务类别" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BizCate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.BizCate }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发起机构" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.OrgFullName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.OrgFullName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发起人" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.InitiatorName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.InitiatorName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="当前状态" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.operation }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.operation }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发起时间" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.InitiateDate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.InitiateDate }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="最后处理时间" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.UpdTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.UpdTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog_">
      <el-dialog :title="dialog_title" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose">
        <div class="dialog_main">
          <BusinessPublicNewForm v-if="showDialog == 'New'" ref="BusinessPublicNewFormReset" v-on:newForma='newForm_edit'></BusinessPublicNewForm>
          <BusinessSubmitForm v-else-if="showDialog == 'Edit'" ref="Edit" v-on:newForma='newForm_edit' :key="fromUid" :fromUid="fromUid"></BusinessSubmitForm>
          <BusinessResubmitSubmitForm v-else-if="showDialog == 'Resubmit'" ref="Resubmit" v-on:newForma='newForm_edit' :key="fromUid"
            :fromUid="fromUid"></BusinessResubmitSubmitForm>
          <HandleTheEndForm v-else-if="showDialog == 'End'" ref="End" v-on:newForma='newForm_edit' :key="fromUid" :fromUid="fromUid"></HandleTheEndForm>
          <StateCancel v-else-if="showDialog == 'StateCancel'" ref="StateCancel" v-on:newForma='newForm_edit' :key="fromUid" :fromUid="fromUid"></StateCancel>
          <ExaminationAndApproval v-else-if="showDialog == 'Trial'" ref="Trial" v-on:newForma='newForm_edit' :key="fromUid" :fromUid="fromUid"></ExaminationAndApproval>
        </div>
      </el-dialog>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="协同商机信息" :visible.sync="businessNameDialog" width="900px" :before-close="businessNameDialogClose">
        <BusinessNameShowInfo v-on:businessNameDialogClose='businessNameDialogClose' ref="BusinessNameShowInfos" :businessId ="businessId" :CustNo ="CustNo"></BusinessNameShowInfo>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getMyCollaboration } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import BusinessPublicNewForm from "./BusinessPublicNewForm.vue"; //------------新建
import BusinessSubmitForm from "./BusinessSubmitForm.vue"; //------------------提交
import BusinessNameShowInfo from "./BusinessNameShowInfo.vue"; //--------------商机名称(商机名称)
import BusinessResubmitSubmitForm from "./BusinessResubmitSubmitForm.vue"; //--重新提交
import HandleTheEndForm from "./HandleTheEndForm.vue"; //-----------------------办结窗口
import StateCancel from "./StateCancel.vue"; //--------------------------------取消窗口
import ExaminationAndApproval from "./ExaminationAndApproval.vue"; //----------审批窗口
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
export default {
  name: "BusinessTable",
  props: {
    name: {
      type: String
    }
  },
  components: {
    BusinessPublicNewForm,
    BusinessSubmitForm,
    HandleTheEndForm,
    BusinessResubmitSubmitForm,
    StateCancel,
    ExaminationAndApproval,
    BusinessNameShowInfo
  },
  data() {
    return {
      showDialog: "New", //-------------用作判断客户的点击路劲
      fromUid: "", //-------------------客户点击的时候的列表id
      fromUidTrue: false, //------------判断deialg弹窗的按钮
      currentPage: 1, //----------------当前页
      pagesize: 10, //-------------------显示总条数
      total: null, //-------------------总条数
      dialogVisible: false, //----------弹出窗
      businessNameDialog: false, //-----商机名称的弹出窗(商机名称)
      businessId: null, //--------------商机名称的UUid（商机名称）
      CustNo: null, //------------------商机名称的CustNo（客户信息）
      dialog_title: "协同商机新建", //---弹出窗口title
      dialog_titl: false, //------------判断操作按钮可以打开的窗口
      queryList: undefined, //----------保存点击查询的参数
      tableData: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    //列表数据请求（地址）
    init(query) {
      this.queryList = query;
      var require = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: query ? query.param : {}
      };
      getMyCollaboration(require)
        .then(response => {
          if (response.Meta.Code == "0000") {
            // item.CredentialsType = dictFilter(DICTYPE.EDW10031, item.CredentialsType); //回显证件号码数据字典转换
            this.tableData = response.Data; //------------------------------------数据赋值
            this.total = response.PageInfo.Total; //------------------------------数据赋值
            this.tableData.forEach(item => {
              // switch (item.CustType) {
              //   case "0":
              //     item.CustType = "个人类型";
              //     break;
              //   case "1":
              //     item.CustType = "机构类型";
              //     break;
              //   case "2":
              //     item.CustType = "产品类型";
              //     break;

              //   default:
              //     break;
              // }
              item.CustType = dictFilter(DICTYPE.EDW10015, item.CustType); //------客户类型回显
              item.SrvCate = dictFilter(DICTYPE.OSPCD0227, item.SrvCate); //-------服务类别回显
              item.BizCate = dictFilter(DICTYPE.OSPCD0226, item.BizCate); //-------业务类别回显
              var start = new Date(item.InitiateDate); //--------------------------发起日期的转换时间戳
              item.InitiateDate =
                start.getFullYear() +
                "-" +
                (start.getMonth() + 1) +
                "-" +
                start.getDate();
              if (item.UpdTime != null) {
                var end = new Date(item.UpdTime); //-------------------------------最后处理日期的转换
                item.UpdTime =
                  end.getFullYear() +
                  "-" +
                  (end.getMonth() + 1) +
                  "-" +
                  end.getDate();
              } else {
                item.UpdTime = "";
              }
            });
            this.businessState();
          }
        })
        .catch(() => {
          // this.$confirm("访问出错(我的协同商机发起方数据)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    //-----------------------------------------------------------------------------商机状态判断可操作项
    businessState() {
      this.tableData.forEach(item => {
        switch (item.BusoppSts) {
          case "00":
            item.operation = "成功";
            item.caozuo = "";
            break;
          case "01":
            item.operation = "新建";
            item.caozuo = "提交";
            break;
          case "02":
            // --------------------------------------------------------------------协同管理岗
            if (this.$store.getters.PosType == "24") {
              item.operation = "已提交";
              item.caozuo = "审批";
            } else {
              item.operation = "已提交";
              item.caozuo = "取消";
            }
            break;
          case "03":
            item.operation = "已拒绝";
            item.caozuo = "取消";
            break;
          case "04":
            item.operation = "申请协同";
            item.caozuo = "取消";
            break;
          case "05":
            item.operation = "协同退回";
            item.caozuo = "重新提交";
            break;
          case "06":
            item.operation = "已发布";
            item.caozuo = "取消";
            break;
          case "07":
            item.operation = "已分发";
            item.caozuo = "取消";
            break;
          case "09":
            item.operation = "推进中";
            item.caozuo = "办结";
            break;
          case "98":
            item.operation = "失败";
            item.caozuo = "";
            break;
          case "99":
            item.operation = "取消";
            item.caozuo = "";
            break;
          case "13":
            item.operation = "发布退回";
            if (this.$store.getters.PosType == "24") {
              item.caozuo = "重新提交";
            } else {
              item.caozuo = "取消";
            }
            break;
          default:
            break;
        }
      });
    },
    //---------------------------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.init(this.queryList);
    },
    //---------------------------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init(this.queryList);
    },
    //---------------------------------------------------------------------------编辑 并判断客户从哪一个地方进入
    //---------------------------------------------------------------------------获取登录人的 岗位类型 来判断所体现的操作
    handleEdit(index, row) {
      switch (row.caozuo) {
        case "取消":
          this.showDialog = "StateCancel";
          this.dialogVisible = true;
          this.dialog_title = "协同商机取消";
          this.fromUid = row.BusoppId;
          this.fromUidClick("StateCancel", row.BusoppId);
          break;
        case "提交":
          this.showDialog = "Edit";
          this.dialogVisible = true;
          this.dialog_title = "协同商机提交";
          this.fromUid = row.BusoppId;
          this.fromUidClick("Edit", row.BusoppId);
          break;
        case "重新提交":
          this.showDialog = "Resubmit";
          this.dialogVisible = true;
          this.dialog_title = "协同商机重新提交";
          this.fromUid = row.BusoppId;
          // this.fromUidClick("Resubmit", row.BusoppId);
          break;
        case "办结":
          this.showDialog = "End";
          this.dialogVisible = true;
          this.dialog_title = "协同商机办结";
          this.fromUid = row.BusoppId;
          this.fromUidClick("End", row.BusoppId);
          break;
        case "审批":
          this.showDialog = "Trial";
          this.dialogVisible = true;
          this.dialog_title = "协同商机审批";
          this.fromUid = row.BusoppId;
          this.fromUidClick("Trial", row.BusoppId);
          break;
        default:
          break;
      }
    },
    //目的是激活二次进入相同页面的时候能动态获取回显数据
    fromUidClick(name, data) {
      switch (name) {
        case "StateCancel":
          if (this.fromUidTrue == "StateCancel") {
            this.$refs.StateCancel.init_(data);
          }
          break;
        case "Edit":
          if (this.fromUidTrue == "Edit") {
            this.$refs.Edit.init_(data);
          }
          break;
        case "Resubmit":
          if (this.fromUidTrue == "Resubmit") {
            this.$refs.Resubmit.init_(data);
          }
          break;
        case "End":
          if (this.fromUidTrue == "End") {
            this.$refs.End.init_(data);
          }
          break;
        case "Trial":
          if (this.fromUidTrue == "Trial") {
            this.$refs.Trial.init_(data);
          }
          break;
        default:
          break;
      }
    },
    //------------------------------------------------------商机名称点击事件（商机名称）
    businessNameClick(id, CustNo) {
      this.businessId = id; //-------------------------------协同商机需要的id
      this.CustNo = CustNo; //-------------------------------客户信息需要的id
      this.businessNameDialog = true;
    },
    businessNameDialogClose() {
      this.$refs.BusinessNameShowInfos.showTabName();
      this.businessNameDialog = false;
    },
    //dialog的关闭方法
    handleClose(done) {
      this.dialogVisible = false;
      this.showDialog = "";
      // this.$refs.BusinessPublicNewFormReset.resetForm();
    },
    //新建协同商机
    new_dialog() {
      this.dialogVisible = true;
      this.showDialog = "New";
      this.dialog_title = "协同商机新建";
    },
    //新建商机子组件返回的关闭弹窗的方法
    newForm_edit(prop) {
      this.init();
      this.dialogVisible = false;
      switch (this.showDialog) {
        case "StateCancel":
          this.fromUidTrue = "StateCancel";
          break;
        case "Edit":
          this.fromUidTrue = "Edit";
          break;
        case "Resubmit":
          this.fromUidTrue = "Resubmit";
          break;
        case "End":
          this.fromUidTrue = "End";
          break;
        case "Trial":
          this.fromUidTrue = "Trial";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessTable {
  padding: 20px;
  padding-top: 0;
  border: 1px solid #ebeef5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  color: #303133;
  margin-top: 10px;
  border: 1px #eeeee9 solid;
  font-size: 12px;
  background: #fff;
  .yh-data {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    color: #999;
  }
  .BusinessTable_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #eeeee9 solid;
    box-sizing: border-box;
    h3 {
      padding: 0 3px;
      height: 40px;
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 2px solid #cb6c2f;
    }
    .el_btn {
      margin-right: 20px;
    }
    a {
      margin-right: 15px;
      font-size: 14px;
      color: blue;
      text-decoration: underline;
    }
  }
  .main_table {
    margin-top: 10px;
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
      a {
        color: blue;
        text-decoration: underline;
      }
    }
    .fa {
      font-size: 14px;
    }
  }
  .dialog_ {
    font-size: 14px;
    .dialog_main {
      margin: 10px;
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
    margin-right: 20px;
  }
}
/*ouxinsu补充按钮样式*/
.el_btn .el-button--mini.is-round {
  padding: 2px 9px;
  margin-left: 10px;
}
.BusinessTable_title .btn-new-build {
  background: #cf8e3e;
  color: #fff;
  border: #cf8e3e solid 1px;
}
.BusinessTable_title .btn-new-build:hover {
  border: #cf8e3e solid 1px;
  color: #cf8e3e;
  background: #fff;
}
</style>
