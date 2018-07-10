<template>
  <!-- 360客户信息-列表查询条件-客户管理-联系信息 -->
  <div class="yh-contact-table">
    <div class="table-header clearfix">
      <h3>{{title}}</h3>
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" class="set" href="javascript:void(0)" @click="setMain()">{{title_set}}</a>
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" href="javascript:void(0)" @click="addOpen('form_data')">
        {{title_new}}
      </a>
      <!-- 新增分组弹窗-->
      <div>
        <el-dialog title="联系人新增" :visible.sync="dialogVisible" width="800px">
          <div class="activity_dialog clearfix yh-jbxx-content">
            <el-form :model="form_data"  :rules="AddBusiness" :show-message="showerroemessage"  label-width="118px" ref="form_data" size="mini" label-position="right">
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="姓名：" prop="AffliateName">
                    <el-input v-model="form_data.AffliateName" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="性别：" prop="GenderCode">
                    <el-select placeholder="请选择" v-model="form_data.GenderCode" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in sexList" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="关系类型：" prop="assocRela">
                    <el-select placeholder="请选择" v-model="form_data.assocRela" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in typeList" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="职务：" prop="OccupCode">
                    <el-input v-model="form_data.OccupCode" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="手机：" prop="Mob">
                    <el-input v-model="form_data.Mob" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="固定电话：" prop="FixPhone">
                    <el-input v-model="form_data.FixPhone" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="传真：" prop="Fax">
                    <el-input v-model="form_data.Fax" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="电子邮箱：" prop="Email">
                    <el-input v-model="form_data.Email" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="其他联系方式：" prop="OthContactMode">
                    <el-input v-model="form_data.OthContactMode" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="21">
                  <el-form-item label="描述：" prop="AssocRelaDesc">
                    <el-input type="textarea" v-model="form_data.AssocRelaDesc" :rows="3"></el-input>
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
    <div v-if="tableData!=null" class="ser-team-table">
      <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" stripe size="mini" max-height=800
        style="width: 100%">
        <el-table-column v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'" fixed="left" label="操作" width="130" align="center">
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
        <el-table-column label="是否主要" width="80" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.MainContactPerFlag=="1" ? "√" : ""}}</div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" show-overflow-tooltip width="80" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.AffliateName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="性别" show-overflow-tooltip width="60" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.GenderCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="联系人类型" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.assocRela }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.assocRela }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="职务" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.OccupCode }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.OccupCode }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="手机" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.Mob }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.Mob }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="固定电话" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.FixPhone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.FixPhone }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="电子邮件" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.Email }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.Email }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="其他联系方式" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.OthContactMode }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.OthContactMode }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="" align="center">
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
    <div class="ser_page" style="text-align: right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import {
  getContactList,
  geteditContactList,
  editContactList,
  addContactList,
  delContactList,
  mainContactList
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
import { JSONValue2JSON } from "@/utils/datahandle.js";

export default {
  name: "ContactInformation",
  data() {
    return {
      showerroemessage: false, //----------------校验使用（显示提示语）
      title: "联系人",
      title_new: "新建",
      title_set: "设为主要",
      uuid: "", //所选客户UUID
      mainUuid: null, //设为主要的Uuid
      mainAssocRela: null, //设为主要的AssocRela
      mainAssocUuid: null, //设为主要的AssocUuid
      dialogVisible: false, //新建的窗口
      addclick: false, //新增的判断
      editclick: false, //编辑的判断
      currentPage: 1, //默认第一页
      pagesize: 10, //显示多少条
      total: null, //数据总条数
      AddBusiness: {
        AffliateName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        assocRela: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ]
      },
      form_data: {
        AssocUuid: "",
        AffliateName: "", //姓名
        OccupCode: "", //职务
        GenderCode: "", //性别
        assocRela: "", //类别
        assocRelaOld: "", //-------------------------------旧的关系类别 用于修改时 修改关系类型
        Mob: "", //手机
        FixPhone: "", //固定电话
        Fax: "", //传真
        Email: "", //邮箱
        OthContactMode: "", //其他联系方式
        AssocRelaDesc: "" //描述
      },
      tableData: null,
      cliar: [
        {
          span: "活动编号",
          concate: "s"
        }
      ],
      sexList: dictItems(DICTYPE.EDW10024), //--------性别类型
      typeList: dictItems(DICTYPE.CTCCD0026) //-------联系人类型
    };
  },
  props: ["parentPage"],
  created() {
    this.init();
  },
  methods: {
    init() {
      //由于无数据  所以上方为写死custNo  有数据后直接用下方五行替换即可
      if ("regCust" == this.parentPage) {
        //用注册客户uuid
        this.uuid = this.$store.getters.Uuid_Reg_Cust;
      } else {
        //使用正式客户uuid
        this.uuid = this.$store.getters.Uuid_formal;
      }

      var getContact = {
        param: {
          Uuid: this.uuid, //可以从store取出来
          formalCustFlag: "0"
        },
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      getContactList(getContact)
        .then(response => {
          this.total = response.PageInfo.Total;
          this.tableData = response.Data;
          this.tableData.forEach(item => {
            item.assocRela = dictFilter(DICTYPE.CTCCD0026, item.AssocRela); //--------关系类型
            item.GenderCode = dictFilter(DICTYPE.EDW10024, item.GenderCode); //-----性别关系
          });
        })
        .catch(() => {
          // this.$confirm("访问出错(联系信息)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
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
    handleCurrentChangeTable(val) {
      if (val != null) {
        this.mainUuid = val.Uuid; //设为主要的Uuid
        this.mainAssocRela = val.AssocRela; //设为主要的AssocRela
        this.mainAssocUuid = val.AssocUuid; //设为主要的AssocUuid
      }
    },
    setMain() {
      //设为主要点击事件
      if (this.mainAssocRela == null) {
        this.$confirm("请选择需要设置的列点击！")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      } else {
        var main = {
          param: {
            Uuid: this.mainUuid,
            AssocRela: this.mainAssocRela,
            AssocUuid: this.mainAssocUuid,
            MainContactPerFlag: "1"
          }
        };
        this.$confirm("是否确定设为主要", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            //确定设置
            mainContactList(main)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "设置成功!"
                });
                this.init();
              })
              .catch(() => {
                // alert("访问出错 联系信息");
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
    editClick(row) {

      //点击编辑按钮的时候回显相应数据
      var geteditlist = {
        param: {
          Uuid: row.Uuid,
          AssocRela: row.AssocRela,
          AssocUuid: row.AssocUuid
        }
      };
      geteditContactList(geteditlist)
        .then(response => {
          JSONValue2JSON(this.form_data,response.Data);
          //修改时把旧关系类型储存
          this.form_data.assocRelaOld = row.AssocRela;
        })
        .catch(() => {
          //alert("访问出错 联系信息");
        });

        this.editclick = true;
        this.addclick = false;
        this.dialogVisible = true;
    },
    addOpen() {
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
    AddClick() {
      //新增与编辑窗口 发送请求，暂时没写请求路径   编辑和新增需要给后台点击360视图的那个人的客户号
      if (this.editclick) {
        var edit = {
          param: this.form_data
        };
        edit.param.Uuid = this.uuid;
        editContactList(edit)
          .then(response => {
            this.init();
          })
          .catch(() => {});
        this.addclick = false;
        this.editclick = false;
        this.dialogVisible = false;
      } else if (this.addclick) {
        this.$refs["form_data"].validate(valid => {
          if (valid) {
            var edit = {
              param: this.form_data
            };
            edit.param.Uuid = this.uuid;
            edit.param.formalCustFlag = "0";
            addContactList(edit)
              .then(response => {
                this.init();
              })
              .catch(() => {});
            this.addclick = false;
            this.editclick = false;
            this.dialogVisible = false;
          } else {
            //验证没有通过
            this.$message({
              message: "请按规则填入和选择必填项",
              type: "warning"
            });
          }
        });
      }
    },
    // 弹出窗确认关闭按钮 :before-close="handleClose"
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
          AssocRela: row.AssocRela,
          AssocUuid: row.AssocUuid
        }
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delContactList(del)
            .then(response => {
              this.mainAssocRela = null
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            })
            .catch(() => {
              // this.$confirm("访问出错(活动编辑信息)")
              //   .then(_ => {
              //     done();
              //   })
              //   .catch(_ => {});
            });
        })
        .catch(() => {
          this.mainAssocRela == null
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
/* 联系人信息 */

.yh-contact-table {
  margin:10px 15px;
    min-height: 200px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    padding-top: 0px;
    position: relative;
    background:#FFF;
    padding:0 20px;
    border-radius:3px;
    font-size: 12px;
}

.set {
  color: #ffffff;
}

.set:hover {
  color: #b3844e;
  background: #ffffff;
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
  margin-top:10px;
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

.ser_page {
  padding-right: 20px;
  padding-bottom: 20px;
}
</style>
