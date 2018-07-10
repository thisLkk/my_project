<template>
  <!-- 360客户信息-列表查询条件-客户管理-关联客户 -->
  <div class="yh-activity-table">
    <div class="table-header clearfix">
      <h3>{{title}}</h3>
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" href="javascript:void(0)" @click="addOpen('form_data')">
        {{title_new}}
      </a>
      <!-- 新增分组弹窗-->
      <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
          <div class="activity_dialog clearfix yh-jbxx-content">
            <el-form :model="form_data"  label-width="130px" :rules="form_dataRules" :show-message="showerroemessage"  ref="form_data" size="mini" label-position="right">
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="客户名称：" prop="affliateName">
                    <a  :disabled="editclick" href="javascript:void(0)" @click="handleIconClick('正式')" class="choose-User" :style="editclick?'pointer-events:none;':''"></a>
                    <el-input :disabled="editclick" style="width:100%;" v-model="form_data.affliateName" >
                      <i class="el-icon-search el-input__icon" slot="suffix">
                      </i>
                    </el-input>
                    <span style="color: red;position: absolute;top: 0;left: -83px;">*</span>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="关系类型：" prop="assocRela">
                    <el-select placeholder="请选择" v-model="form_data.assocRela" size="mini">
                      <el-option key="" label="" value="请选择" />
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in assocRelaList" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="创建人：" prop="crtEmpNo">
                    <el-input :disabled="true" v-model="crtEmpNo" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="创建日期：" prop="crtTime">
                    <el-date-picker :disabled="true" v-model="crtTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="21">
                  <el-form-item label="描述：" prop="assocRelaDesc">
                    <el-input type="textarea" v-model="form_data.assocRelaDesc" :rows="3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="AddClick" size="mini">
              <i class="fa fa-check diologBtn"></i>确 定</el-button>
            <el-button @click="dialogVisible = false" size="mini">
              <i class="fa fa-close diologBtn"></i> 取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div v-if="tableData != null" class="ser-team-table">
      <el-table :data="tableData" highlight-current-row stripe size="mini" max-height=800 style="width: 100%">
        <el-table-column v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'" fixed="left" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">
              <i class="fa fa-edit edit_icon">
                <span>编辑</span>
              </i>
            </el-button>
            <el-button @click="delClick(scope.row)" type="text" size="small">
              <i class="fa fa-trash del_icon">
                <span>删除</span>
              </i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" width="" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.AffliateName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="关系类型" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <div>{{ bizCateFormatter(scope.row.AssocRela)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上市公司代码" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.StkCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否我司正式客户" width="" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.FormalCustFlag == "0"?"否" : "是"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="建立日期" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CrtTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CrtTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="" align="center">
          <template slot-scope="scope">
            <!-- <p>{{ scope.row.CrtEmpName }}</p> -->
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.CrtEmpName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.CrtEmpName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.AssocRelaDesc }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.AssocRelaDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ser_page" style="text-align: right;padding-right:10px;padding-bottom:10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="客户选择查询" append-to-body :visible.sync="CustomerGelectionGeneralShow" width="800px" top="40vh" :before-close="CustomerGelectionGeneralClose">
      <FormalOrRegsit ref="PublicQueryComponent" :queryName="queryName" isMyFormal  @CustomerGelectionGeneralClick="CustomerGelectionGeneralClick"></FormalOrRegsit>
    </el-dialog>
  </div>

</template>

<script>
import FormalOrRegsit from "@/views/organization/components/FormalOrRegsit.vue";
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee";
import {
  getRelationList,
  editRelationList,
  addRelationList,
  delRelationList
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { JSONValue2JSON } from "@/utils/datahandle.js";
import { dictItems, dictFilter } from "@/filters"; //------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-------------------------数据字典的方法
export default {
  name: "BusinessOpportunityTable",
  components: {
    inputButtonCE,
    FormalOrRegsit
  },
  data() {
    return {
      dialogTitle:"客户关联关系新增",
      showerroemessage: false, //------------------------校验使用
      title: "关联关系客户",
      title_new: "新建",
      uuid: "",
      CustomerGelectionGeneralShow: false, //-----------客户查询弹窗（客户查询）
      queryName: null, //-------------------------------正式或者注册调用（客户查询）
      queryNameTrue: false, //--------------------------正式或者注册调用（客户查询）
      dialogVisible: false, //--------------------------新建的窗口的判断
      currentPage: 1, //--------------------------------默认页数
      pagesize: 10, //-----------------------------------需要展示的条数
      addclick: false, //-------------------------------新增的判断
      editclick: false, //------------------------------编辑的判断
      total: null, //-----------------------------------数据总条数（展示）
      crtTime: new Date(), //---------------------------创建时间（）
      crtEmpNo: this.$store.getters.userName, //---------创建人
      form_data: {
        uuid: "", //------------------------------------选择客户uuid
        assocUuid: "", //-------------------------------关联客户uuid
        affliateName: "", //----------------------------关联客户名称
        assocRela: "", //-------------------------------关系类别
        assocRelaDesc: "", //---------------------------描述
        assocRelaOld: "", //-------------------------------旧的关系类别 用于修改时 修改关系类型
      },
      form_dataRules: {
        assocRela: [
          {
            required: true,
            message: "关系类型",
            trigger: "change"
          }
        ],
        affliateName: [
          {
            required: true,
            message: "关系类型",
            trigger: "change"
          }
        ]
      },
      tableData: null, //--------------------------------请求数据赋值
      assocRelaList: dictItems(DICTYPE.CTCCD0026)
    };
  },
  created() {
    this.init();
    // addDocumenttypeoptions: dictItems(DICTYPE.EDW10031), //--------证件类型（新增）
    // item.CredentialsType = dictFilter(DICTYPE.EDW10031, item.CredentialsType); //-----------------------------------------------------------------------回显证件号码数据字典转换
  },
  mounted() {},
  props: ["parentPage"],
  methods: {
    //-----------------------------------------------------------关系类型回显
    bizCateFormatter(code) {
      return dictFilter(DICTYPE.CTCCD0026, code);
    },
    //-----------------------------------------------------------正式客户查询（客户查询）
    handleIconClick(data) {
      this.queryName = data;
      this.CustomerGelectionGeneralShow = true;
      if (this.queryNameTrue) {
        this.$refs.PublicQueryComponent.queryNameInit(data);
      }
    },
    init() {
      //let uuid = "10100016184";
      //由于无数据  所以上方为写死custNo  有数据后直接用下方五行替换即可
      if ("regCust" == this.parentPage) {
        //用注册客户uuid
        this.uuid = this.$store.getters.Uuid_Reg_Cust;
      } else {
        //使用正式客户uuid
        this.uuid = this.$store.getters.Uuid_formal;
      }

      var query = {
        param: {
          Uuid: this.uuid,
          formalCustFlag: "1"
        },
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      getRelationList(query)
        .then(response => {
          this.total = response.PageInfo.Total;
          this.tableData = response.Data;
          this.tableData.forEach(item => {
            if (item.CrtTime != null) {
              var start = new Date(item.CrtTime); //-----------------------------------发起日期的转换时间戳
              item.CrtTime =
                start.getFullYear() +
                "-" +
                (start.getMonth() + 1) +
                "-" +
                start.getDate();
            } else {
              item.CrtTime = "";
            }
          });
          // item.CredentialsType = dictFilter(DICTYPE.EDW10031, item.CredentialsType)
        })
        .catch(() => {
          // this.$confirm("访问出错(关联关系)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    // --------------------------------------------------------------客户人员的选择
    onChooseUser(val) {
      this.form_data.StaffInquiry = val;
    },
    handleCurrentChange(val) {
      //当前页
      this.currentPage = val;
      this.init();
    },
    handleSizeChange(val) {
      //当前要展示多少条
      this.pagesize = val;
      this.init();
    },
    //------------------------------------------------------------------点击编辑按钮的时候回显相应数据
    editClick(row) {
      
      this.dialogTitle="客户关联关系修改";
      // var geteditlist = {
      //   param: {
      //     Uuid: row.Uuid,
      //     AssocRela: row.AssocRela,
      //     AssocUuid: row.AssocUuid
      //   }
      // };
      // geteditContactList(geteditlist)
      //   .then(response => {
      //     this.form_data = response.Data;
      //   })
      //   .catch(() => {
      //     alert("访问出错 联系信息");
      //   });
      // //console.log(row) 
      this.form_data.assocRelaOld = row.AssocRela;
      this.form_data.affliateName = row.AffliateName;
      this.form_data.assocRelaDesc = row.AssocRelaDesc;
      this.form_data.assocRela = row.AssocRela;
      this.form_data.assocUuid = row.AssocUuid;
      this.editclick = true;
      this.addclick = false;
      this.dialogVisible = true;
    },
    addOpen() {
      
      this.dialogTitle="客户关联关系新增";
      //点击新增的时候打开弹窗
      for (const key in this.form_data) {
        //置空
        if (this.form_data.hasOwnProperty(key)) {
          this.form_data[key] = "";
        }
      }
      this.addclick = true;
      this.editclick = false;
      this.dialogVisible = true;
    },
    //---------------------------------------------------------------新增与编辑请求地址
    AddClick() {
      //console.log(this.form_data);
      //-------------------------------------------------------------编辑接口
      if (this.editclick) {
        var edit = {
          param: {
            uuid: this.uuid,
            assocRela: this.form_data.assocRela,
            assocRelaOld: this.form_data.assocRelaOld,
            assocUuid: this.form_data.assocUuid,
            assocRelaDesc: this.form_data.assocRelaDesc,
            affliateName: this.form_data.affliateName
          }
        };
        editRelationList(edit)
          .then(response => {
            this.init();
            this.addclick = false;
            this.editclick = false;
            this.dialogVisible = false;
          })
          .catch(() => {});
      } else if (this.addclick) {
        // ---------------------------------------------------------新增接口
        this.$refs["form_data"].validate(valid => {
          if (valid) {
            var edit = {
              param: {
                uuid: this.uuid,
                assocRela: this.form_data.assocRela,
                assocUuid: this.form_data.assocUuid,
                assocRelaDesc: this.form_data.assocRelaDesc,
                affliateName: this.form_data.affliateName,
                formalCustFlag: "1"
              }
            };
            addRelationList(edit)
              .then(response => {
                this.addclick = false;
                this.editclick = false;
                this.dialogVisible = false;
                this.init();
              })
              .catch(() => {});
          } else {
            this.$message({
              message: "请按规则填入和选择必填项",
              type: "warning"
            });
          }
        });
      }
    },
    // 弹出窗确认关闭按钮:before-close="handleClose"
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //点击删除出现的提示
    delClick(row) {
      var del = {
        param: {
          Uuid: row.Uuid,
          AssocRela: row.AssocRela ? row.AssocRela : "",
          AssocUuid: row.AssocUuid
        }
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delRelationList(del)
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
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // --------------------------------------------------------通用客户查询组件内的确定按钮关闭搜索弹窗（客户查询）
    CustomerGelectionGeneralClick(data) {
      //console.log(data);
      this.queryNameTrue = true;
      if (data.queryName == "正式") {
        this.form_data.assocUuid = data.custNo;
        this.form_data.affliateName = data.custName;
      } else if (data.queryName == "注册") {
        // this.public_info.registered.custName = data.custName;
        // this.public_info.registered.custNo = data.custNo;
        // this.public_info.registered.custType = data.custType;
        // if (this.public_info.registered.custName != "") {
        //   this.public_info.formal.custName = "";
        // }
      }
      this.CustomerGelectionGeneralShow = false;
    },
    //--------------------------------------------------------通用客户查询组件的dialog关闭方法（客户查询）
    CustomerGelectionGeneralClose(done) {
      this.queryNameTrue = true;
      this.CustomerGelectionGeneralShow = false;
    }
  }
};
</script>

<style scoped>
/* 联系人信息 */

.yh-activity-table {
  margin: 10px 15px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  padding-top: 0px;
  position: relative;
  background: #fff;
  padding: 0 20px;
  border-radius: 3px;
}

/* 图标的大小。只能在这里才能层叠ele样式 */

.fa {
  font-size: 16px;
}

.diologBtn {
  font-size: 16px;
}

.ser-team-table {
  text-align: center;
  width: 100%;
  /* min-height: 200px; */
  margin-top: 10px;
  box-sizing: border-box;
}

.ser-team-table table {
  width: 100%;
  padding: 0 20px;
}

.ser-team-table .el-table td div {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ser-team-table table thead th {
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  font-weight: bold;
}

.ser-team-table table tbody td {
  height: 40px;
  line-height: 40px;
}

.ser-team-table table tbody tr:nth-child(even) {
  background: #eeeeee;
}
.choose-User{
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%; 
  opacity: 0;
  top:-10px;
}
</style>
