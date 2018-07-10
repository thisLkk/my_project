<template>
  <!-- 协同管理 _ 商机名称 客户信息 协同信息 -->
  <div class="yh_Business360Tabel">
    <div v-if="tableData!=null" class="progress clearfix">
      <h3>协同商机信息</h3>
      <div class="main_table">
        <el-table :data="tableData" highlight-current-row stripe size="mini" style="width: 100%">
          <el-table-column label="商机名称" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.BusoppName }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.BusoppName }}
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
                  <el-tag size="mini">
                    {{ scope.row.SrvCate }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="业务类别" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.BizCate }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.BizCate }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="发起机构" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.OrgFullName }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.OrgFullName }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="发起人" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.InitiatorName }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.InitiatorName }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="当前状态" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.BusoppSts }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.BusoppSts }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="发起时间" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.InitiateDate }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.InitiateDate }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination ">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15,20]"
          :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="newForm_edit()" size="mini">
        <i class="fa fa-check diologBtn"></i>关闭</el-button>
      <!-- <el-button @click="newForm_close()" size="mini">
        <i class="fa fa-close diologBtn"></i> 取消</el-button> -->
    </div>
  </div>
</template>
<script>
import { getCollaborativeList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //---------------------------------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
export default {
  name: "Business360Tabel",
  props: {
    CustNo: {
      type: String
    }
  },
  data() {
    return {
      tableData: null, //---------------回显数据(协同信息)
      currentPage: 1, //----------------当前页
      pagesize: 10, //-------------------显示总条数
      total: null //--------------------总条数
    };
  },
  created() {
    // ----------------------------------------------------------------------初次拉取数据
    this.init(this.CustNo);
  },
  methods: {
    // -----------------------------------------------------------------------信息
    init(query) {
      var require = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          custNo: query
        }
      };
      getCollaborativeList(require)
        .then(response => {
          if (response.Meta.Code == "0000") {
            // item.CredentialsType = dictFilter(DICTYPE.EDW10031, item.CredentialsType); //回显证件号码数据字典转换
            this.total = response.PageInfo.Total;
            this.tableData = response.Data;
            this.tableData.forEach(item => {
              item.BusoppSts = dictFilter(DICTYPE.OSPCD0228, item.BusoppSts); //------当前状态回显
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
    //----------------------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.init(this.CustNo);
    },
    //----------------------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init(this.CustNo);
    },
    //-----------------------------------------------------------------------提交申请（请求参数ajax）
    newForm_edit() {
      this.$emit("TabelClose", {});
    },
    //-----------------------------------------------------------------------保存关闭
    newForm_close() {
      this.$emit("TabelClose", {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_Business360Tabel {
  padding-bottom: 20px;
  .progress {
    margin-top: 20px;
    border: 1px solid #eeeee9;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 14px;
    h3 {
      height: 20px;
      font-weight: bold;
      line-height: 20px;
      margin: 20px 0;
      margin-right: 30px;
      margin-left: 5px;
      padding-left: 5px;
      color: #000000;
      border-left: 3px solid #ce8f3d;
    }
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .showQuery {
    margin-top: 10px;
    animation: fadein 0.2s linear 1;
    overflow: hidden;
    .yh-buttonsdiv {
      height: 45px;
      .yh-buttons {
        float: right;
        overflow: hidden;
      }
    }
    .more {
      color: blue;
      text-decoration: underline;
    }
  }
  .showQuery.active {
    animation: fadeout 0.2s linear 1;
    height: 0;
  }
  @keyframes fadeout {
    0% {
      height: 190px;
    }
    100% {
      height: 0;
    }
  }
  @keyframes fadein {
    0% {
      height: 0;
    }
    100% {
      height: 190px;
    }
  }
  .btn {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
