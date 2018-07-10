<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_TeamLaunchTable">
    <div class="TeamLaunchTable_title clearfix">
      <h3 class="fl">协同商机列表</h3>
    </div>
    <div class="main_table">
      <el-table v-show="tableData.length" :data="tableData" stripe size="mini" style="width: 100%">
        <el-table-column label="" width="40" align="center">
          <template slot-scope="scope">
             <div v-if="scope.row.Prio == '01'">⭐</div>
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
      <div v-show="!tableData.length" class="yh-data">
        暂无数据
      </div>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="协同商机信息" :visible.sync="businessNameDialog" width="900px" :before-close="businessNameDialogClose">
        <BusinessNameShowInfo ref="BusinessNameShowInfos" :CustNo="CustNo" v-on:businessNameDialogClose='businessNameDialogClose'
          :businessId="businessId"></BusinessNameShowInfo>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getMyTeamUndertakeList } from "@/api/organization/collaborationmanage/collaborationbusoppquery/MyTeamBusinessOpportunities/index.js";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
import BusinessNameShowInfo from "./BusinessNameShowInfo.vue"; //--------------商机名称(商机名称)
export default {
  name: "TeamUndertakeTable",
  props: {
    name: {
      type: String
    }
  },
  components: {
    BusinessNameShowInfo
  },
  data() {
    return {
      businessNameDialog: false, //----商机名称的弹出窗(商机名称)
      businessId: null, //-------------商机名称的UUid（商机名称）
      CustNo: null, //-----------------商机名称的CustNo（客户信息）
      fromUid: "", //------------------客户点击的时候的列表id
      fromUidTrue: false, //-----------判断deialg弹窗的按钮
      currentPage: 1, //---------------当前页
      pagesize: 10, //-----------------显示总条数
      total: null, //------------------总条数
      tableData: null, //--------------数据库
      queryList: undefined //----------保存点击查询的参数
    };
  },
  created() {
    this.init(undefined, this.name);
  },
  methods: {
    init(query, name) {
      this.queryList = query; //----------------保存点击查询的参数
      var orgTeamType = "";
      switch (name) {
        case "OrgLaunch":
          orgTeamType = "0";
          break;
        case "OrgUndertake":
          orgTeamType = "0";
          break;
        case "TeamLaunch":
          orgTeamType = "1";
          break;
        case "TeamUndertake":
          orgTeamType = "1";
          break;

        default:
          break;
      }
      var require = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: query
          ? query.param
          : {
              orgTeamType: orgTeamType
            }
      };
      getMyTeamUndertakeList(require)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.tableData = response.Data;
            this.total = response.PageInfo.Total;
            this.tableData.forEach(item => {
              // switch (item.CustType) {
              //   case "01":
              //     item.CustType = "个人";
              //     break;
              //   case "02":
              //     item.CustType = "机构";
              //     break;
              //   case "03":
              //     item.CustType = "产品";
              //     break;

              //   default:
              //     break;
              // }
              item.CustType = dictFilter(DICTYPE.EDW10015, item.CustType); //------客户类型回显
              item.SrvCate = dictFilter(DICTYPE.OSPCD0227, item.SrvCate); //-------服务类别回显
              item.BizCate = dictFilter(DICTYPE.OSPCD0226, item.BizCate); //-------业务类别回显
              if (item.InitiateDate != null) {
                var start = new Date(item.InitiateDate); //------------------------发起日期的转换时间戳
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
          // this.$confirm("访问出错(我的协同商机查询)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    init_() {
      this.tableData.forEach(function(item) {
        switch (item.BusoppSts) {
          case "00":
            item.operation = "成功";
            break;
          case "01":
            item.operation = "新建";
            break;
          case "02":
            item.operation = "已提交";
            break;
          case "03":
            item.operation = "已拒绝";
            break;
          case "04":
            item.operation = "申请协同";
            break;
          case "05":
            item.operation = "协同退回";
            break;
          case "06":
            item.operation = "已发布";
            break;
          case "07":
            item.operation = "已分发";
            break;
          case "09":
            item.operation = "推进中";
            break;
          case "98":
            item.operation = "失败";
            break;
          case "99":
            item.operation = "取消";
            break;
          case "13":
            item.operation = "发布退回";
            break;
          default:
            break;
        }
      });
    },
    //--------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.init(this.queryList, this.name);
    },
    //--------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init(this.queryList, this.name);
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
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_TeamLaunchTable {
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
  .TeamLaunchTable_title {
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
