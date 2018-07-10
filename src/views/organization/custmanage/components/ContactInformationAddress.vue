<template>
  <!-- 客户管理360 联系板块 联系信息详细 -->
  <div class="yh_Business360Tabel-contack-info">
    <div class="progress clearfix">
      <div class="table-header clearfix">
        <h3>联系地址</h3>
        <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" href="javascript:void(0)" @click="addOpen('add')">
            {{title_new}}
          </a>
          <!-- <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" class="set" href="javascript:void(0)" @click="setMain()">{{title_set}}</a> -->
      </div>
      <div class="main_table">
        <el-table :data="tableData" highlight-current-row stripe size="mini" style="width: 100%">
          <el-table-column label="操作" width="130" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.SysCode =='OSP'" @click="editClick(scope.$index, scope.row)" type="text" size="small">
                <i class="fa fa-edit edit_icon">
                  <span>编辑</span>
                </i>
              </el-button>
              <el-button v-if="scope.row.SysCode =='OSP'" @click="removeContactList(scope.$index, scope.row)" type="text" size="small">
                <i class="fa fa-trash del_icon">
                  <span>删除</span>
                </i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系地址类型" width="" align="center">
            <template slot-scope="scope">
              {{ scope.row.AddrType | productFilter(DICTYPEData.EDW10071, scope.row.AddrType) }}
            </template>
          </el-table-column>
          <el-table-column label="联系地址来源" width="" align="center">
            <template slot-scope="scope">
              {{ SysCodeWord(scope.row.SysCode)}}
            </template>
          </el-table-column>
          <el-table-column label="联系地址" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.DetlAddr }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{ scope.row.DetlAddr }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="是否主联系方式" width="" align="center">
            <template slot-scope="scope">
              {{ scope.row.MainAddrFlag == "1" ? "是" : "否" }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="更新人" width="" align="center">
            <template slot-scope="scope">
              {{ scope.row.UpdEmpName }}
            </template>
          </el-table-column> -->
          <el-table-column label="更新日期" width="" align="center">
            <template slot-scope="scope">
              {{ scope.row.UpdTime }}
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
    <el-dialog title="新增联系地址" :visible.sync="addrTypeDialog" width="50%">
      <div class="add-eide-box">
        <div class="contact-type clearfix">
          <span class="contact-type-title">联系地址类型：</span>
          <el-select class="new-contact-Info" v-model="newContactInfo.AddrTypeNew" placeholder="请选择">
            <el-option
              v-for="item in addrTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="contact-text clearfix">
          <span class="contact-text-title">联系信息：</span>
          <el-input
            class="contact-text-input"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="detlAddr">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmClick" size="mini">
          <i class="fa fa-check diologBtn"></i>确 定</el-button>
        <el-button @click="addrTypeDialog = false" size="mini">
          <i class="fa fa-close diologBtn"></i> 取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getaddrlist,
  addaddrinfo,
  updateaddrinfo,
  deleteaddrinfo
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
import "@/filters/filters.js";

export default {
  name: "ContactInformationAddress",
  props: ["parentPage"],
  data() {
    return {
      tableData: null, //---------------回显数据(协同信息)
      uuid: null, //--------------------回显数据(协同信息)
      currentPage: 1, //----------------当前页
      pagesize: 10, //-------------------显示总条数
      total: null, //--------------------总条数
      DICTYPEData: DICTYPE,
      title_new: "新建联系地址",
      title_set: "设为主要",
      addrTypeList: dictItems(DICTYPE.EDW10071),
      detlAddr: "",
      newContactInfo: {
        AddrTypeNew: "",
        AddrType: "",
        DetlAddr: "",
        uuId: "",
        SysCode: "OSP"
      },
      AddBusiness: [],
      addrTypeDialog: false,
      addEditCode: "add",
      editAddIndex: null
    };
  },
  created() {
    // ----------------------------------------------------------------------初次拉取数据
    this.init();
  },
  methods: {
    //--------------------------------------方式来源回显
    SysCodeWord(code) {
      return dictFilter(DICTYPE.EDW50000, code);
    },
    // -----------------------------------------------------------------------信息
    init() {
      if (this.parentPage == "regCust") {
        //用注册客户uuid
        this.uuid = this.$store.getters.Uuid_Reg_Cust;
      } else {
        //使用正式客户uuid
        this.uuid = this.$store.getters.Uuid_formal;
      }
      // 获取联系地址列表
      this.getContactList();
    },

    /**
     * 获取联系地址列表
     */
    getContactList() {
      var require = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          Uuid: this.uuid
          // Uuid: "6EBB6798874EAC8DE0534A47010A7308"
        }
      };

      getaddrlist(require)
        .then(response => {
          let meat = response.Meta || {};
          if (meat.Code == "0000") {
            this.total = response.PageInfo.Total;
            this.tableData = response.Data;
            this.tableData.forEach(item => {
              item.MainContactModeFlag = dictFilter(
                DICTYPE.CTCCD0999,
                item.MainContactModeFlag
              ); //-----------------------------------------------------------是否主联系方式
              if (item.UpdTime != null) {
                var start = new Date(item.UpdTime); //------------------------发起日期的转换时间戳
                item.UpdTime =
                  start.getFullYear() +
                  "-" +
                  (start.getMonth() + 1) +
                  "-" +
                  start.getDate();
              } else {
                item.UpdTime = "";
              }
            });
          }
        })
        .catch(() => {});
    },

    /**
     * 打开新增弹窗
     */
    addOpen() {
      this.detlAddr = "";
      this.newContactInfo = {
        AddrTypeNew: this.addrTypeList[0].value,
        AddrType: "",
        DetlAddr: "",
        Uuid: "",
        SysCode: "OSP"
      };
      this.addEditCode = "add";
      this.addrTypeDialog = true;
    },

    /**
     * 编辑
     * index 当前条的index
     * data  编辑的当前条数据
     */
    editClick(index, data) {
      this.newContactInfo = data;
      this.editAddIndex = index;
      this.detlAddr = data.DetlAddr || "";
      this.newContactInfo.SysCode = "OSP";
      this.addEditCode = "edit";
      this.$set(
        this.newContactInfo,
        "AddrTypeNew",
        this.newContactInfo["AddrType"]
      );
      this.addrTypeDialog = true;
    },

    /**
     * 确定 添加 修改 地址信息
     * addEditCode add=>添加操作 edit=>修改操作
     */
    confirmClick() {
      this.newContactInfo["Uuid"] = this.uuid;
      this.addEditCode === "add"
        ? this.addContactInfo()
        : this.editContactInfo();
    },

    /**
     * 地址信息新增
     */
    addContactInfo() {
      this.newContactInfo["AddrType"] = this.newContactInfo.AddrTypeNew;
      this.newContactInfo["DetlAddr"] = this.detlAddr;
      let contactInfo = {
        param: this.newContactInfo
      };
      addaddrinfo(contactInfo)
        .then((data = {}) => {
          let meta = data.Meta || {};
          if (meta.Code == "0000") {
            //  this.tableData.unshift(this.newContactInfo);
            // 获取列表
            this.getContactList();
            this.addrTypeDialog = false;
          } else {
            this.$message.error("地址添加失败");
          }
        })
        .catch(err => {
          this.$message.error("地址添加失败");
        });
    },

    /**
     * 地址信息修改
     */
    editContactInfo() {
      this.newContactInfo["DetlAddr"] = this.detlAddr;
      let contactInfo = {
        param: this.newContactInfo
      };
      contactInfo.param.UpdTime = "";
      updateaddrinfo(contactInfo)
        .then((data = {}) => {
          let meta = data.Meta || {};
          if (meta.Code == "0000") {
            // let tableData = this.tableData;
            // let key = this.editAddIndex;
            // this.$set(tableData, key, this.newContactInfo);
            // 获取列表
            this.getContactList();
            this.addrTypeDialog = false;
          } else {
            this.$message.error("地址修改失败");
          }
        })
        .catch(err => {
          this.$message.error("地址修改失败");
        });
    },

    /**
     * index 当前条的index
     * 删除地址信息
     */
    removeContactList(index, data = {}) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let contactObj = {
            param: {
              AddrType: data.AddrType,
              Uuid: this.uuid,
              SysCode: "OSP"
            }
          };
          deleteaddrinfo(contactObj)
            .then((data = {}) => {
              let meta = data.Meta || "";
              if (meta.Code === "0000") {
                // let tableData = this.tableData;
                // tableData.splice(index, 1);
                // 获取列表
                this.getContactList();
                this.addrTypeDialog = false;
              } else {
                this.$message.error("地址删除失败");
              }
            })
            .catch(err => {
              this.$message.error("地址删除失败");
            });
        })
        .catch(() => {});
    },

    //----------------------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.init();
    },

    //----------------------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.yh_Business360Tabel-contack-info {
  padding-bottom: 20px;
  .clearfix:after {
    content: "";
    clear: both;
    display: block;
  }
  .clearfix {
    zoom: 1; /* for ie6 */
  }
  .fa {
    font-size: 16px;
  }
  .progress {
    margin: 10px 15px;
    min-height: 200px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    padding-top: 0px;
    position: relative;
    background: #fff;
    padding: 0 20px;
    border-radius: 3px;
    font-size: 12px;
    h3 {
      float: left;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #333;
      font-weight: bold;
      border-bottom: 2px solid #cf8e3e;
      padding: 0 5px;
    }
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .main_table {
      margin-top: 10px;
    }
  }
  .add-eide-box {
    padding: 0 20px;
    .contact-type {
      width: 100%;
      margin-bottom: 20px;
      .contact-type-title {
        display: block;
        width: 20%;
        float: left;
        text-align: right;
      }
      .new-contact-Info {
        display: block;
        float: left;
        width: 70%;
      }
    }
    .contact-text {
      margin-bottom: 20px;
      .contact-text-title {
        display: block;
        float: left;
        width: 20%;
        text-align: right;
      }
      .contact-text-input {
        float: left;
        width: 70%;
      }
    }
  }
}
</style>
