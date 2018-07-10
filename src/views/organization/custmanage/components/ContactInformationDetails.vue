<template>
  <!-- 360客户信息-列表查询条件-客户管理-联系信息 -->
  <div class="yh-contact-table">
    <div class="table-header clearfix">
      <h3>{{title}}</h3>
      <!-- <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'"
        class="set" href="javascript:void(0)" @click="setMain()">{{title_set}}</a>    -->
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'"
        href="javascript:void(0)" @click="addOpen('form_data')">
        {{title_new}}
      </a>
      <!-- 新增分组弹窗-->
      <div>
        <el-dialog title="联系人新增" :visible.sync="dialogVisible" width="800px">
          <div class="activity_dialog clearfix yh-jbxx-content">
            <el-form :model="form_data" :rules="AddBusiness" :show-message="showerroemessage" label-width="118px" ref="form_data" size="mini"
              label-position="right">
              <el-row>
                <el-col :offset="6" :span="10">
                  <el-form-item label="联系方式：" prop="ContactModeType">
                    <el-select :disabled="showContact" placeholder="请选择" v-model="form_data.ContactModeType" @change="selectChange" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in typeList" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="isSelet=='20'">
                <el-col :offset="6" :span="10">
                  <el-form-item label="移动电话：" prop="ContactMode">
                    <el-input v-model="form_data.ContactMode" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="isSelet=='11'">
                <el-col :offset="6" :span="10">
                  <el-form-item label="家庭电话：" prop="ContactMode">
                    <!-- <div class="clearfix">
                      <div class="fl" style="width:78px;"><el-input v-model="form_data.CallingCode" placeholder="区号"></el-input></div>
                      <div class="fl" style="padding:0 5px;"> - </div>
                      <div class="fl" style="width:120px;"><el-input v-model="form_data.Extension" placeholder="分机号"></el-input></div>
                    </div> -->
                    <el-input v-model="form_data.ContactMode" placeholder="请输入内容"></el-input>
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
        <el-table-column 
          fixed="left" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.SysCode =='OSP'" @click="editClick(scope.row)" type="text" size="small">
              <i class="fa fa-edit edit_icon">
                <span>编辑</span>
              </i>
            </el-button>
            <el-button v-if="scope.row.SysCode =='OSP'" @click="delClick(scope.row)" type="text" size="small">
              <i class="fa fa-trash del_icon">
                <span>删除</span>
              </i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="" align="center">
          <template slot-scope="scope">
            {{ ContactModeTypeWord(scope.row.ContactModeType) }}
          </template>
        </el-table-column>
        <el-table-column label="联系方式来源" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ SysCodeWord(scope.row.SysCode) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ SysCodeWord(scope.row.SysCode) }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="联系号码" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.ContactMode }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.ContactMode }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="是否主联系方式" width="" align="center">
          <template slot-scope="scope">
            {{ scope.row.MainContactModeFlag }}
          </template>
        </el-table-column>
        <el-table-column label="更新人" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.UpdEmpName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.UpdEmpName }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="更新日期" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.updTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.updTime }}
                </el-tag>
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
    getContactInformationDetails,
    GetEditContactInformationDetails,
    EditContactInformationDetails,
    AddContactInformationDetails,
    DeleteContactInformationDetails,
    mainContactList
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //--------------------------数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
  export default {
    name: "ContactInformationDetails",
    data() {
      return {
        showContact:false,
        showerroemessage: false, //----------------校验使用（显示提示语）
        isSelet: "20", //--------------------------监听联系方式的变化显示响应的输入框
        title: "联系信息",
        title_new: "新建",
        title_set: "设为主要",
        uuid: "", //-------------------------------所选客户UUID
        mainUuid: null, //-------------------------设为主要的Uuid
        mainAssocRela: null, //--------------------设为主要的AssocRela
        mainAssocUuid: null, //--------------------设为主要的AssocUuid
        dialogVisible: false, //-------------------新建的窗口
        addclick: false, //------------------------新增的判断
        editclick: false, //-----------------------编辑的判断
        currentPage: 1, //-------------------------默认第一页
        pagesize: 10, //---------------------------显示多少条
        total: null, //----------------------------数据总条数
        AddBusiness: {
          ContactMode: [{
            required: true,
            // pattern: /^1(3[0-9]|5[0-9]|8[0-9]|7[0-9])[0-9]{8}$/,
            // message: '请输入正确的手机号'
          }],
          CallingCode: [{
            required: true,
          }],
          ContactModeType: [{
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }]
        },
        form_data: {
          ContactMode: "", //---------联系号码
          ContactModeType: "", //-----联系方式
          CallingCode: "", //---------联系区号
          ContactTel: "", //----------家庭电话
          Extension: "", //-----------联系分机号
        },
        tableData: null,
        cliar: [{
          span: "活动编号",
          concate: "s"
        }],
        typeList: [
          {
            label: "手机号码",
            value: "20"
          },
          {
            label: "家庭电话",
            value: "11"
          },
        ]
        // typeList: dictItems(DICTYPE.EDW10070) //-------联系方式（后续增加多个）
      };
    },
    props: ["parentPage"],
    created() {
      this.init();
    },
    methods: {
      //--------------------------------------联系方式回显
      ContactModeTypeWord(code) {
        return dictFilter(
          DICTYPE.EDW10070,
          code
        )
      },
      //--------------------------------------方式来源回显
      SysCodeWord(code) {
        return dictFilter(
          DICTYPE.EDW50000,
          code
        )
      },
      selectChange(){
        switch (this.form_data.ContactModeType) {
          case "11":
            this.isSelet = "11"
            break;
          case "20":
            this.isSelet = "20"
            break;
        
          default:
            break;
        }
      },
      init() {
        if ("regCust" == this.parentPage) {
          //用注册客户uuid
          this.uuid = this.$store.getters.Uuid_Reg_Cust;
        } else {
          //使用正式客户uuid
          this.uuid = this.$store.getters.Uuid_formal;
        }
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
          }
        };
        getContactInformationDetails(require)
          .then(response => {
            if (response.Meta.Code == "0000") {
              // item.CredentialsType = dictFilter(DICTYPE.EDW10031, item.CredentialsType); //回显证件号码数据字典转换
              this.total = response.PageInfo.Total;
              this.tableData = response.Data;
              this.tableData.forEach(item => {

                item.MainContactModeFlag = dictFilter(
                  DICTYPE.CTCCD0999,
                  item.MainContactModeFlag
                ); //是否主联系方式
                if (item.updTime != null) {
                  var start = new Date(item.updTime); //---------------------------发起日期的转换时间戳
                  item.updTime =
                    start.getFullYear() +
                    "-" +
                    (start.getMonth() + 1) +
                    "-" +
                    start.getDate();
                } else {
                  item.updTime = "";
                }
              });
            }
          })
          .catch(() => {});
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
      //------------------------------------------点击编辑按钮的时候回显相应数据
      editClick(row) {
        this.showContact = true;
        var geteditlist = {
          param: {
            Uuid: row.Uuid,
            sysCode: row.SysCode,
            ContactModeType: row.ContactModeType
          }
        };
        GetEditContactInformationDetails(geteditlist)
          .then(response => {
            this.form_data = response.Data;
          })
          .catch(() => {
            //alert("访问出错 联系信息");
          });
        this.editclick = true;
        this.dialogVisible = true;
      },
      addOpen() {
        this.showContact = false;
        //点击新增的时候打开弹窗
        for (const key in this.form_data) {
          //置空
          if (this.form_data.hasOwnProperty(key)) {
            this.form_data[key] = "";
          }
        }
        this.addclick = true;
        this.dialogVisible = true;
      },
      AddClick() {
        //新增与编辑窗口 发送请求，暂时没写请求路径   编辑和新增需要给后台点击360视图的那个人的客户号
        if (this.editclick) {
          var edit = {
            param: this.form_data
          };
          EditContactInformationDetails(edit)
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
              edit.param.sysCode = "OSP"; //------------系统来源
              edit.param.mainContactModeFlag = "0"; //--是否主联系标识
              AddContactInformationDetails(edit)
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
            sysCode: row.SysCode,
            ContactModeType: row.ContactModeType
          }
        };
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            DeleteContactInformationDetails(del)
              .then(response => {
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
            // this.$message({
            //   type: "info",
            //   message: "已取消删除"
            // });
          });
      }
    }
  };

</script>

<style scoped>
  /* 联系人信息 */

  .yh-contact-table {
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
    min-height: 200px;
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

  .ser_page {
    padding-right: 20px;
    padding-bottom: 20px;
  }

</style>
