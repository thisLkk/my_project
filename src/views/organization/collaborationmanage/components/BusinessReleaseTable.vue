<template>
  <!-- x协同管理发布L -->
  <div class="yh_BusinessReleaseTable">
    <div class="BusinessReleaseTable_title clearfix">
      <h3 class="fl">协同商机列表</h3>
      <div class="el_btn fr">
        <!-- <el-button size="mini" round @click="new_dialog()">新建协同商机</el-button> -->
      </div>
    </div>
    <div v-if="tableData != null" class="main_table">
      <el-table :data="tableData" stripe size="mini" style="width: 100%">
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
      </el-table>
    </div>
    <div class="dialog_">
      <el-dialog :title="dialog_title" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose">
        <div class="dialog_main">
          <BusinessReleaseTablePopup  ref="BusinessReleaseTablePopup" v-on:newForma='newForm_edit' :fromUid="fromUid"></BusinessReleaseTablePopup>
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
        <BusinessNameShowInfo v-on:businessNameDialogClose='businessNameDialogClose' ref="BusinessNameShowInfos" :businessId="businessId"  :CustNo ="CustNo"></BusinessNameShowInfo>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCoordibusopprele } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/CollaborativeBusinessOpportunityRelease/index.js";
import BusinessReleaseTablePopup from "./BusinessReleaseTablePopup.vue";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
import BusinessNameShowInfo from "./BusinessNameShowInfo.vue"; //--------------商机名称(商机名称)
export default {
  name: "BusinessReleaseTable",
  components: {
    BusinessReleaseTablePopup,
    BusinessNameShowInfo
  },
  data() {
    return {
      businessNameDialog: false, //--------------------------------------------商机名称的弹出窗(商机名称)
      businessId: null, //-----------------------------------------------------商机名称的UUid（商机名称）
      CustNo: null, //--------------------------------------------------------商机名称的CustNo（客户信息）
      fromUid: "", //----------------------------------------------------------客户点击的时候的列表id
      fromUidTrue: false, //---------------------------------------------------客户点击的时候的列表id
      currentPage: 1, //-------------------------------------------------------当前页
      pagesize: 10, //----------------------------------------------------------显示总条数
      total: null, //----------------------------------------------------------总条数
      dialogVisible: false, //-------------------------------------------------弹出窗
      dialog_title: "协同商机新建", //------------------------------------------弹出窗口title
      dialog_titl: false, //---------------------------------------------------判断操作按钮可以打开的窗口
      tableData: null //-------------------------------------------------------数据回显
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
      getCoordibusopprele(require)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.tableData = response.Data; //--------------------------------------数据赋值
            this.total = response.PageInfo.Total; //--------------------------------数据赋值
            this.tableData.forEach(item => {
              //console.log(item.CustType);
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
              // item.CustType = dictFilter(DICTYPE.EDW10015, item.CustType); //------客户类型回显
              item.SrvCate = dictFilter(DICTYPE.OSPCD0227, item.SrvCate); //----------服务类别回显
              item.BizCate = dictFilter(DICTYPE.OSPCD0226, item.BizCate); //----------业务类别回显
              if (item.InitiateDate != null) {
                var start = new Date(item.InitiateDate); //---------------------------发起日期的转换时间戳
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
      //拉取数据的时候判断可操作的名字     这个地方是数据字典的值
      //数据回来之后判断是员工登录还是协同管理岗登录 从store里面来做判断
      this.tableData.forEach(function(item) {
        //此处会调用数据字典的方法
        switch (item.BusoppSts) {
          case "00":
            item.operation = "成功";
            item.caozuo = "";
            break;
          case "03":
            item.operation = "已拒绝";
            item.caozuo = "协作处理";
            break;
          case "04":
            item.operation = "申请协同";
            item.caozuo = "协作处理";
            break;
          case "06":
            item.operation = "已发布";
            item.caozuo = "";
            break;
          case "07":
            item.operation = "已分发";
            item.caozuo = "";
            break;
          case "09":
            item.operation = "推进中";
            item.caozuo = "";
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
          //console.log(1);
        }
      });
    },
    //当前页
    handleCurrentChange(val) {
      this.init();
    },
    //当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
    //编辑 并判断客户从哪一个地方进入
    //获取登录人的 岗位类型 来判断所体现的操作
    handleEdit(index, row) {
      switch (row.caozuo) {
        case "协作处理":
          this.dialogVisible = true;
          this.dialog_title = "协同商机协作处理";
          this.fromUid = row.BusoppId;
          this.fromUidClick(row.BusoppId);
          break;
        default:
        //console.log(1);
      }
      // this.edit_dialog(index, row);
    },
    fromUidClick(fromUid) {
      if (this.fromUidTrue) {
        this.$refs.BusinessReleaseTablePopup.init_(fromUid); //init_(fromUid);
      }
    },
    handleDelete(index, row) {
      //删除
      // //console.log(index, row);
    },
    //----------------------------------------------------商机名称点击事件（商机名称）
    businessNameClick(id, CustNo) {
      this.businessId = id;
      this.CustNo = CustNo; //-------------------------------客户信息需要的id
      this.businessNameDialog = true;
    },
    businessNameDialogClose() {
      this.$refs.BusinessNameShowInfos.showTabName();
      this.businessNameDialog = false;
    },
    //dialog的关闭方法
    handleClose(done) {
      // this.fromUid = '';
      this.dialogVisible = false;
      this.fromUidTrue = true;
      // this.$refs.BusinessReleaseTablePopup.resetForm();
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     //console.log(this.fromUid);
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //新建商机子组件返回的关闭弹窗的方法
    newForm_edit(prop) {
      this.init();
      this.fromUidTrue = true;
      this.dialogVisible = false;
    }
    //操作是点击商机名称,并回显当前数据
    // edit_dialog(index, row) {
    //   this.dialogVisible = true;
    // },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessReleaseTable {
  padding: 20px;
  padding-top: 0;
  border-top: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  margin-top: 10px;
  font-size: 12px;
  background: #fff;
  .BusinessReleaseTable_title {
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
