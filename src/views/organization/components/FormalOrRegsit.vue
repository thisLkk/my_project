<template>
  <div class="yh_FormalOrRegsit">
    <!--客户选择通用组件 -->
    <div>
      <el-form label-position="center" label-width="110px" ref="form_data" :model="form_data" size="mini">
        <el-row>
          <el-col :span="11">
            <el-form-item label="客户姓名查找:" prop="name_">
              <el-input v-model="form_data.name_"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="客户编号查找:" prop="ID">
              <el-input v-model="form_data.ID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="20">
            <el-button id="el_query" size="mini" @click="query()">查询</el-button>
            <el-button v-if="false" id="el_reset" size="mini"  @click="resetForm('form_data')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="tableData!=null" class="tabel">
      <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="TabelColHandle" style="width: 100%">
        <el-table-column label="" align="right" width="50">
          <template slot-scope="scope">
            <el-radio v-model="radioUuid" :label="scope.row.Uuid">{{kong}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="客户编号" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row. CustNo}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CustNo }}</el-tag>
              </div>
            </el-popover>

          </template>
        </el-table-column>
        <el-table-column prop="name" label="客户名称" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CustFullName}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CustFullName}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="机构号">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.OrgNo }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.OrgNo  }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="机构名称">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.OrgFullName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.OrgFullName}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="tableData!=null" class="ser_page">
      <el-pagination @size-change="CurPagesizeHandle" @current-change="CurPageHandle" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="btn">
      <el-button type="primary" @click="transmit()" size="mini">
        <i class="fa fa-check diologBtn"></i>确定</el-button>
      <el-button @click="CloseClick()" size="mini">
        <i class="fa fa-close diologBtn"></i> 关闭</el-button>
    </div>
  </div>
</template>

<script>
import { hasFuntion } from "@/filters";
import FUNCODE from "@/utils/funCode.js";
import { getTeamUserPositionList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import {
  GetRegisteList,
  GetFormalList,
  GetMyFormalList,
  GetFormalListcount,
  GetMyFormalCount
} from "@/api/formalOrRregister.js";
export default {
  name: "FormalOrRegsit",
  props: {
    queryName: {
      type: String
    },
    isMyFormal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchSrc: "",
      form_data: {
        name_: "",
        ID: ""
      },
      queryName_: null, //----------用于储存初次进入页面的值与再次进入页面的值
      custType: "", //--------------正式（可以显示客户类别提交给后台）注册（否）
      radioUuid: "", //-------------单选框表示每一列的uuid
      kong: "", //------------------列表单选框巧办法为空
      currentPage: 1, //------------当前页
      pagesize: 10, //--------------显示总条数
      total: null, //---------------总条数
      currentRow: null, //----------这个是要传递给父组件的值
      // multipleSelection: [],
      tableData: null //-----------请求数据值
    };
  },
  created() {
    if (this.myAll()) {
      this.searchSrc = "04";
    } else if (this.myOrg) {
      this.searchSrc = "03";
    } else if (this.myTeam) {
      this.searchSrc = "02";
    } else {
      this.searchSrc = "01";
    }
    this.queryName_ = this.queryName;
    this.query(this.queryName_); //----------初次进入页面调用保存一次queryName_ myTeam
  },
  methods: {
    // --------------------------------------我全部
    myAll() {
      return hasFuntion(FUNCODE.FUNC_ALL_CUST);
    },
    // --------------------------------------我机构
    myOrg() {
      return hasFuntion(FUNCODE.FUNC_ORG_CUST);
    },
    // --------------------------------------我团队
    myTeam() {
      return hasFuntion(FUNCODE.FUNC_SELF_CUST);
    },
    // --------------------------------------再次进入页面走的是这里 queryName_
    queryNameInit(data) {
      this.tableData = null;
      this.form_data.name_ = "";
      this.form_data.ID = "";

      this.queryName_ = data;
      this.query(this.queryName_);
    },
    //--------------------------------------向使用此组件的父组件传递值与请求关闭信号
    transmit() {
      var data = this.currentRow ? this.currentRow : null;
      data.queryName = this.queryName_;
      this.$emit("CustomerGelectionGeneralClick", data);
      this.radioUuid = "";
    },
    CloseClick() {
      this.radioUuid = "";
      this.$emit("CustomerGelectionGeneralClick", "");
    },
    //---------------------------------------列表的每一行点击事件
    TabelColHandle(val) {
      if (this.queryName_ == "注册") {
        this.custType = "";
        this.currentRow = {
          custNo: val.Uuid,
          custName: val.CustName,
          custType: this.custType
        };
      } else {
        this.currentRow = {
          custNo: val.Uuid,
          custName: val.CustFullName,
          custType: val.CustType
        };
      }
      this.radioUuid = val.Uuid;
    },
    //-----------------------------------------查询方法(分辨正式与注册，我团队与机构)
    query(queryname) {
      var query = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      if (this.queryName_ == "注册") {
        query.param = {
          searchType: "0",
          custFullName: this.form_data.name_
        };
        GetRegisteList(query)
          .then(response => {
            if (response.Meta.Code == "0000") {
              this.tableData = response.Data;
              this.total = response.PageInfo.Total;
            }
          })
          .catch(() => {});
      } else if (this.queryName_ == "正式") {
        if (this.isMyFormal) {
          query.param = {
            searchType: "0",
            custFullName: this.form_data.name_,
            custNo: this.form_data.ID,
            orgNo:
              this.$store.getters.orgid < 8000 ? this.$store.getters.orgid : ""
          };
          GetFormalList(query)
            .then(response => {
              if (response.Meta.Code == "0000") {
                this.tableData = response.Data;
              }
            })
            .catch(() => {});
          GetFormalListcount(query)
            .then(response => {
              if (response.Meta.Code == "0000") {
                this.total = response.PageInfo.Total;
              }
            })
            .catch(() => {});
        } else {
          query.param = {
            custFullName: this.form_data.name_,
            custNo: this.form_data.ID,
            searchSrc: this.searchSrc
          };
          GetMyFormalList(query)
            .then(response => {
              if (response.Meta.Code == "0000") {
                this.tableData = response.Data;
              }
            })
            .catch(() => {});
          GetMyFormalCount(query)
            .then(response => {
              if (response.Meta.Code == "0000") {
                this.total = response.PageInfo.Total;
              }
            })
            .catch(() => {});
        }
      }
    },
    //------------------------------------------------------当前页
    CurPageHandle(val) {
      this.query();
    },
    //------------------------------------------------------当前要展示多少条
    CurPagesizeHandle(val) {
      this.pagesize = val;
      this.query();
    },
    //-------------------------------------------------------重置查询条件
    resetForm(formName) {
      //console.log(formName)
      this.$refs.form_data.resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_FormalOrRegsit {
  padding-bottom: 20px;
  .tabel {
    padding: 15px;
  }
  .btn {
    margin-top: 20px;
    text-align: center;
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
</style>
