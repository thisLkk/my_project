<template>
  <!-- 360传统页面 机构页面 -->
  <div class="yh-demand-table">
    <div class="table-header clearfix">
      <h3>机构业务</h3>
    </div>
    <div v-if="tableData!=null" class="table-show">
      <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" stripe size="mini" style="width: 100%">
        <el-table-column label="机构业务名称" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.GrpName}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.GrpName}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务规则" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.GrpIntro}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.GrpIntro}}
                  </el-tag>
                </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务简介" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.GrpDesc}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.GrpDesc}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="营业部收入" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BizDeptIncomeDesc}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.BizDeptIncomeDesc}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="附件" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.fqr }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.fqr }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.Remk}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.Remk}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ser_page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getOrgList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
export default {
  name: "InstitutionalBusiness",
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //总页数
      total: null, //总数据条数
      tableData: null //列表数据
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //初始页面，需要拉取数据，接口还没写(只传一个Uuid与pageInfo)
      // //console.log(this.$store.getters.Uuid)//拿到客户点得UUid
      var query = {
        param: {
          Uuid: this.$store.getters.Uuid_formal, //此处的uuid是从正式客户管理或者我的正式客户列表传进来的
          grpLvl: "9",
          queryType: "01"
        },
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      getOrgList(query)
        .then(response => {
          this.total = response.PageInfo.Total; //总条数
          this.tableData = response.Data; //数据数组
        })
        .catch(() => {
          //可以用作与提示
          // this.$confirm("访问出错(机构业务)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    handleCurrentChangeTable(row) {
      //是否选中当前行，row是当前行的所有参数
      //console.log(row);
    },
    handleSizeChange(val) {
      //要显示多少页
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      //当前页是多少
      this.init();
    },
    handlePreview: function(file) {
      //alert(file);
    }
  }
};
</script>

<style scoped>
/* 服务团队信息 */

.yh-demand-table {
  margin:10px 15px;
  min-height: 500px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  padding-top: 0px;
  position: relative;
  background:#FFF;
  padding:0 20px;
  border-radius:3px;
}

.table-header {
  height: 36px;
  line-height: 36px;
  margin: 5px 0;
}

.table-header h3 {
  float: left;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid #cf8e3e;
    padding: 0 5px;
}

.table-header a {
  float: right;
  display: block;
  width: 60px;
  height: 24px;
  background: #b3844e;
  color: #ffffff;
  text-align: center;
  border-radius: 45px;
  margin-right: 20px;
  font-size: 14px;
}

/* 列表信息 */

.table-show {
  min-height: 200px;
  margin-top: 10px;
  box-sizing: border-box;
}

.el-table td div {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ser_page {
  padding: 10px 20px;
  text-align: right;
}

.fa {
  font-size: 16px;
}
</style>
