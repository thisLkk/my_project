<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_BusinessUndertakeTable">
    <div class="BusinessUndertakeTable_title clearfix">
      <h3 class="fl">协同商机列表</h3>
    </div>
    <div class="main_table">
      <el-table :data="tableData" stripe size="mini" style="width: 100%">
        <el-table-column label="" width="40" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.Prio == '01'">⭐</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="mini" id="el_edit">
              <span style="color:red;">{{scope.row.caozuo}}</span>
            </el-button>
            <el-button v-if="scope.row.Complete" @click="handleComplete(scope.$index, scope.row)" type="text" size="mini" id="el_edit">
              <span style="color:red;">{{scope.row.Complete}}</span>
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
      </el-table>
    </div>
    <div class="dialog_">
      <el-dialog :title="dialog_title" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose">
        <div class="dialog_main">
          <BusinessUndertakeAnswer v-if="showDialog == 'Answer'" ref="BusinessUndertakeAnswer" v-on:newForma='newForm_edit' :queryName="queryName"
            :fromUid="fromUid"></BusinessUndertakeAnswer>
          <BusinessUnderProgress v-if="showDialog == 'Progress'" ref="Progress" v-on:newForma='newForm_edit' :fromUid="fromUid"></BusinessUnderProgress>
          <BusinessUnderComplete v-if="showDialog == 'Complete'" ref="Complete" v-on:newForma='newForm_edit' :fromUid="fromUid"></BusinessUnderComplete>
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
        <BusinessNameShowInfo ref="BusinessNameShowInfoId" v-on:businessNameDialogClose='businessNameDialogClose' :businessId="businessId" :CustNo="CustNo"></BusinessNameShowInfo>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GetUndertakeList } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import BusinessUndertakeAnswer from "./BusinessUndertakeAnswer.vue";
import BusinessUnderProgress from "./BusinessUnderProgress.vue";
import BusinessUnderComplete from "./BusinessUnderComplete.vue";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
import BusinessNameShowInfo from "./BusinessNameShowInfo.vue"; //--------------商机名称(商机名称)
export default {
  name: "BusinessUndertakeTable",
  components: {
    BusinessUndertakeAnswer,
    BusinessUnderProgress,
    BusinessUnderComplete,
    BusinessNameShowInfo
  },
  data() {
    return {
      businessNameDialog: false, //-----商机名称的弹出窗(商机名称)
      businessId: null, //--------------商机名称的UUid（商机名称）
      CustNo: null, //--------------商机名称的UUid（商机名称）
      showBusinessTrue: false, //-------商机名称的组件加载一次后使用此判断
      fromUid: "", //--------------客户点击的时候的列表id   dataInitType selectType
      fromUidTrue: "", //----------客户点击的时候的列表id
      showDialog: "", //-----------客户点击的时候判断展示哪一个组件
      currentPage: 1, //-----------当前页
      pagesize: 10, //--------------显示总条数
      total: null, //--------------总条数
      dialogVisible: false, //-----弹出窗
      dialog_title: "协同商机新建", //弹出窗口title
      dialog_titl: false, //-------判断操作按钮可以打开的窗口
      tableData: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(query) {
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
      GetUndertakeList(require)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.tableData = response.Data;
            this.total = response.PageInfo.Total;
            this.tableData.forEach(item => {
              switch (item.CustType) {
                case "0":
                  item.CustType = "个人";
                  break;
                case "1":
                  item.CustType = "机构";
                  break;
                case "2":
                  item.CustType = "产品";
                  break;

                default:
                  break;
              }
              if (item.InitiateDate != null) {
                item.SrvCate = dictFilter(DICTYPE.OSPCD0227, item.SrvCate); //-------服务类别回显
                item.BizCate = dictFilter(DICTYPE.OSPCD0226, item.BizCate); //-------业务类别回显
                var start = new Date(item.InitiateDate); //--------------------------发起日期的转换时间戳
                item.InitiateDate =
                  start.getFullYear() +
                  "-" +
                  (start.getMonth() + 1) +
                  "-" +
                  start.getDate();
              } else {
                item.InitiateDate = "";
              }
            });
            this.init_();
          }
        })
        .catch(() => {
          // this.$confirm("访问出错(协同商机发布查询)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    init_() {
      //----------------------------------------------------------------------------拉取数据的时候判断可操作的名字
      //----------------------------------------------------------------------------数据回来之后判断是员工登录还是协同管理岗登录
      this.tableData.forEach(function(item) {
        switch (item.BusoppSts) {
          case "00":
            item.operation = "成功";
            item.caozuo = "";
            break;
          case "06":
            item.operation = "已发布";
            if (item.CoordiRespons == "01") {
              item.caozuo = "应答";
            } else if (item.CoordiRespons == "02") {
              item.caozuo = "抢应答";
            }
            break;
          case "07":
            item.operation = "已分发";
            if (item.CoordiRespons == "01") {
              item.caozuo = "应答";
            } else if (item.CoordiRespons == "02") {
              item.caozuo = "抢应答";
            }
            break;
          case "09":
            item.operation = "推进中";
            item.caozuo = "进展登记";
            item.Complete = "处理完毕";
            break;
          case "98":
            item.operation = "失败";
            item.caozuo = "";
            break;
          case "99":
            item.operation = "取消";
            item.caozuo = "";
            break;
          default:
            break;
        }
      });
    },
    //---------------------------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.init();
    },
    //---------------------------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
    //---------------------------------------------------------------------------编辑 并判断客户从哪一个地方进入
    //---------------------------------------------------------------------------获取登录人的 岗位类型 来判断所体现的操作
    handleEdit(index, row) {
      switch (row.caozuo) {
        case "应答":
          this.dialogVisible = true;
          this.showDialog = "Answer";
          this.dialog_title = "协同商机应答";
          this.fromUid = row.BusoppId;
          this.queryName = "应答";
          this.fromUidClick("Answer", row.BusoppId, "应答");
          break;
        case "抢应答":
          this.dialogVisible = true;
          this.showDialog = "Answer";
          this.dialog_title = "协同商机抢应答";
          this.fromUid = row.BusoppId;
          this.queryName = "抢应答";
          this.fromUidClick("Answer", row.BusoppId, "抢应答");
          break;
        case "进展登记":
          this.dialogVisible = true;
          this.showDialog = "Progress";
          this.dialog_title = "新建进展登记";
          this.fromUid = row.BusoppId;
          this.fromUidClick("Progress", row.BusoppId);
          break;
        default:
          break;
      }
    },
    handleComplete(index, row) {
      this.dialogVisible = true;
      this.showDialog = "Complete";
      this.dialog_title = "协同商机处理完毕";
      this.fromUid = row.BusoppId;
      this.fromUidClick("Complete", row.BusoppId);
    },
    fromUidClick(queryName_, data, name) {
      switch (queryName_) {
        case "Progress":
          if (this.fromUidTrue == "Progress") {
            this.$refs.Progress.init_(data); //init_(fromUid);
          }
          break;
        case "Answer":
          if (this.fromUidTrue == "Answer") {
            this.$refs.Progress.init_(data, name); //init_(fromUid);
          }
          break;
        case "Complete":
          if (this.fromUidTrue == "Complete") {
            this.$refs.Progress.init_(data); //init_(fromUid);
          }
          break;

        default:
          break;
      }
    },
    //------------------------------------------------------------------------------商机名称点击事件（商机名称）
    businessNameClick(id,CustNo) {
      if (this.showBusinessTrue == true) {
        this.$refs.BusinessNameShowInfoId.businessInfoList(id);
      }
      this.businessId = id;
      this.CustNo = CustNo;//-------------------------------客户信息需要的id
      this.businessNameDialog = true;
    },
    businessNameDialogClose() {
      this.showBusinessTrue = true;
      this.businessNameDialog = false;
    },
    //dialog的关闭方法
    handleClose(done) {
      // this.fromUid = '';
      this.dialogVisible = false;
      // this.$refs.BusinessUndertakeAnswer.resetForm();
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     //console.log(this.fromUid);
      //     // this.fromUidTrue = true;
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //-------------------------------------------------------------------------------新建商机子组件返回的关闭弹窗的方法
    newForm_edit(prop) {
      switch (this.showDialog) {
        case "Progress":
          this.fromUidTrue = "Progress";
          break;
        case "Answer":
          this.fromUidTrue = "Answer";
          break;
        case "Complete":
          this.fromUidTrue = "Complete";
          break;

        default:
          break;
      }
      this.init();
      this.dialogVisible = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessUndertakeTable {
  padding: 20px;
  padding-top: 0;
  border-top: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  margin-top: 10px;
  font-size: 12px;
  background: #fff;
  .yh-data{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    color: #999;
  }
  .BusinessUndertakeTable_title {
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
</style>
