<template>
  <!-- 360客户信息-列表查询条件-客户管理-活动信息 -->
  <div class="yh-activity-table">
    <div class="table-header clearfix">
      <h3>{{title}}</h3>
      <a v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000'|| this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'"
        href="javascript:void(0)" @click="addOpen('form_data')">
        {{title_new}}
      </a>
      <!-- 新增分组弹窗-->
      <div class="addBox">
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
          <div class="activity_dialog clearfix yh-jbxx-content">
            <el-form :model="form_data" :rules="activityRules" :show-message="showerroemessage" label-width="120px" ref="form_data" size="mini"
              label-position="right">
              <el-row>
                <el-col v-if="false" :offset="1" :span="10">
                  <el-form-item label="活动编号：" prop="ActivityNo">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="创建人：" prop="CrtBy">
                    <el-input v-model="CrtBy" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="活动类型：" prop="ActivityType">
                    <el-select placeholder="请选择" v-model="form_data.ActivityType" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in activityTypeList" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="活动状态：" prop="ActivitySts">
                    <el-select placeholder="请选择" v-model="form_data.ActivitySts" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in activityStateList" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="优先级：" prop="ActivityPrio">
                    <el-select placeholder="请选择" v-model="form_data.ActivityPrio" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in priorityList" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="活动方式：" prop="ActivityMode">
                    <el-select placeholder="请选择" v-model="form_data.ActivityMode" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in modeList" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="计划开始时间：" prop="PlanBeginTime">
                    <el-date-picker v-model="form_data.PlanBeginTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="计划结束时间：" prop="PlanEndTime">
                    <el-date-picker v-model="form_data.PlanEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="实际开始时间：" prop="ActualBeginTime">
                    <el-date-picker v-model="form_data.ActualBeginTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="实际结束时间：" prop="ActualEndTime">
                    <el-date-picker v-model="form_data.ActualEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="活动名称：" prop="ActivityContent">
                    <el-input type="text" v-model="form_data.ActivityContent" :rows="3"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="是否有领导参与：" prop="IsNeedLeaderJoinIn">
                    <el-select placeholder="请选择" v-model="form_data.IsNeedLeaderJoinIn" size="mini">
                      <el-option key="" label="请选择" value="">
                      </el-option>
                      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in items_IsNeedLeaderJoinIn" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="21">
                  <el-form-item label="活动描述：" prop="ActivityDetlContent">
                    <el-input type="textarea" v-model="form_data.ActivityDetlContent" :rows="3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="客户名称：" prop="CustName">
                    <el-input v-model="custname" placeholder="" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="uuid!=''" :offset="1" :span="10">
                  <el-form-item label="参与人：" prop="JoinInName">
                    <SeacerPeople :seacerId="form_data.JoinInId" :seacerName="form_data.JoinInName" @SeacerPeopleResponse="SeacerPeopleResponse"></SeacerPeople>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" :offset="1">
                  <el-form-item label="上传需求报告:">
                    <fileUpload :relId="form_data.ActivityNo" :addfileList="addfileList" @setId="setId"></fileUpload>
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
    <div class="ser-team-table">
      <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" stripe size="mini" max-height=800
        style="width: 100%">
        <el-table-column v-if="this.$store.getters.myname!='' || Number(this.$store.getters.orgid) > '8000' ||this.$store.getters.orgid=='B010'||this.$store.getters.orgid=='B020'"
          fixed="left" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">
              <i class="fa fa-edit edit_icon">
                <span>编辑</span>
              </i>
            </el-button>
            <el-button @click="delClick(scope.row.ActivityNo)" type="text" size="small">
              <i class="fa fa-trash del_icon">
                <span>删除</span>
              </i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="活动类型" width="" align="center">
          <template slot-scope="scope">
            <div>{{bizCateFormatter(scope.row.ActivityType)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="活动名称" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.ActivityContent }}</div>
          </template>
        </el-table-column>
        <el-table-column label="实际开始时间" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.ActualBeginTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.ActualBeginTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="实际结束时间" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.ActualEndTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.ActualEndTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="活动详细内容" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.ActivityDetlContent }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.ActivityDetlContent }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="" align="center">
          <template slot-scope="scope">
            <div>{{ bizCateActivityPrio(scope.row.ActivityPrio) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="活动状态" width="" align="center">
          <template slot-scope="scope">
            <div>{{ bizCateActivitySts(scope.row.ActivitySts) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="活动所有者" width="" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.UserName }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ser_page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import {
  getappendixbyassocId,
  downloadappendix,
  deleteappendix
} from "@/api/organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement/index.js"; //上传接口
import fileUpload from "@/views/organization/resourcemanage/components/FileUpload"; //上传组件
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee";
import SeacerPeople from "@/views/organization/components/SeacerPeople.vue";
import {
  getActityList,
  editActityList,
  addActityList,
  delActityList
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter, DateChange } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
import { formatDateTime } from "@/utils/datahandle.js"; //日期格式化

export default {
  name: "ContactInformation",
  components: {
    inputButtonCE,
    SeacerPeople,
    fileUpload
  },
  data() {
    return {
      viewfileList: [], //--------------下载（下载）(上传与修改)
      addfileList: [], //----------------新增（浏览）(上传与修改)
      dialogTitle: "活动新建",
      showerroemessage: false, //----------------------------------------校验使用
      nowTime: "", //----------------------------------------------------计划结束时间
      title: "活动信息",
      title_new: "新建",
      uuid: "",
      dialogVisible: false, //-----------------------------------------新建的窗口
      addclick: false, //----------------------------------------------新增的判断
      editclick: false, //---------------------------------------------编辑的判断
      currentPage: 1, //-----------------------------------------------默认第一页
      pagesize: 10, //--------------------------------------------------显示多少条
      total: null, //--------------------------------------------------数据总条数
      currentRow: "", //-----------------------------------------------当前所在行
      CrtBy: this.$store.getters.userName, //--------------------------创建人
      custname: this.$store.getters.custname, //-----------------------点击跳转的那个人
      activityRules: {
        ActivityType: [
          {
            required: true,
            message: "活动类型",
            trigger: "change"
          }
        ],
        ActivityPrio: [
          {
            required: true,
            message: "优先级",
            trigger: "change"
          }
        ],
        ActivityMode: [
          {
            required: true,
            message: "活动方式",
            trigger: "change"
          }
        ],
        // ActualBeginTime: [
        //   {
        //     required: true,
        //     message: "实际开始时间",
        //     trigger: "change"
        //   }
        // ],
        // ActualEndTime: [
        //   {
        //     required: true,
        //     message: "实际结束时间",
        //     trigger: "change"
        //   }
        // ],
        // PlanBeginTime: [
        //   {
        //     required: true,
        //     message: "计划开始时间",
        //     trigger: "change"
        //   }
        // ],
        // PlanEndTime: [
        //   {
        //     required: true,
        //     message: "计划结束时间",
        //     trigger: "change"
        //   }
        // ],
        ActivityContent: [
          {
            required: true,
            message: "活动名称",
            trigger: "change"
          }
        ],
        ActivitySts: [
          {
            required: true,
            message: "活动状态",
            trigger: "change"
          }
        ]
      },
      form_data: {
        ActivityNo: "", //----------------------------------------------活动编号
        ActivityType: "", //--------------------------------------------活动类别
        ActivitySts: "", //---------------------------------------------状态
        ActivityPrio: "", //--------------------------------------------优先级
        ActivityMode: "", //--------------------------------------------活动方式
        PlanBeginTime: "", //-------------------------------------------计划开始时间
        PlanEndTime: "", //---------------------------------------------计划结束时间
        ActualBeginTime: "", //-----------------------------------------实际开始时间
        ActualEndTime: "", //-------------------------------------------实际结束时间
        ActivityContent: "", //-----------------------------------------活动名臣
        ActivityDetlContent: "", //-------------------------------------活动描述
        JoinInId: "", //------------------------------------------------参与者ID
        JoinInName: "", //----------------------------------------------参与者姓名
        StrategyCustFlag: this.$store.getters.IsStrategyCustFlag, //----是否战略客户
        IsNeedLeaderJoinIn: ""
      },
      tableData: null,
      activityTypeList: dictItems(DICTYPE.OSPCD0220), //-----------------活动类型
      activityStateList: dictItems(DICTYPE.OSPCD0222), //----------------活动状态
      priorityList: dictItems(DICTYPE.OSPCD0229), //---------------------优先级
      modeList: dictItems(DICTYPE.OSPCD0221), //-------------------------活动方式
      items_IsNeedLeaderJoinIn: dictItems(DICTYPE.CTCCD0999) //----------是否有领导参与
    };
  },

  props: ["parentPage"],

  created() {
    // ------------------------------------------------------------------计划结束与实际结束时间使用
    var now = new Date();
    now.setDate(now.getDate() + 1);
    this.nowTime = now;
    this.init();
  },
  methods: {
    //-------------------------------------------------------------------优先级(回显)
    bizCateActivityPrio(code) {
      return dictFilter(DICTYPE.OSPCD0229, code);
    },
    //-------------------------------------------------------------------活动类型（回显）
    bizCateFormatter(code) {
      return dictFilter(DICTYPE.OSPCD0220, code);
    },
    //-------------------------------------------------------------------活动状态（回显）
    bizCateActivitySts(code) {
      return dictFilter(DICTYPE.OSPCD0222, code);
    },
    // ------------------------------------------------------------------参与人回显的数据
    SeacerPeopleResponse(data) {
      this.form_data.JoinInId = data.designPerson;
      this.form_data.JoinInName = data.designPersonName;
    },
    init() {
      this.viewfileList = [];//置空（上传）
      if ("regCust" == this.parentPage) {
        this.uuid = this.$store.getters.Uuid_Reg_Cust;
      } else {
        this.uuid = this.$store.getters.Uuid_formal;
      }
      var getContactList = {
        param: {
          Uuid: this.uuid
        },
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      getActityList(getContactList)
        .then(response => {
          this.total = response.PageInfo.Total;
          this.tableData = response.Data;
        })
        .catch(() => {});
    },
    //------------------------------------------------------------当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
    //------------------------------------------------------------当前要展示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
    handleCurrentChangeTable(val) {
      //可以获取你当前点击的所在行信息
      // this.currentRow = val.ActivityNo;
    },
    //-----------------------------------------------------------点击编辑按钮的时候回显相应数据
    editClick(row) {
      this.addfileList = [];//置空（上传）
      this.viewfileList = [];//置空（上传）
      this.handleFileList(row.ActivityNo, 2); // 下载1 修改2(上传与修改)
      this.dialogTitle = "活动修改";
      var data = row;
      this.form_data = data;

      this.editclick = true;
      this.dialogVisible = true;
    },
    //-----------------------------------------------------------点击新增的时候打开弹窗
    addOpen() {
      this.viewfileList = [];//置空（上传）
      this.addfileList = [];//置空（上传）
      this.dialogTitle = "活动新建";
      this.form_data = {
        ActivityNo: "", //----------------------------------------------活动编号
        ActivityType: "", //--------------------------------------------活动类别
        ActivitySts: "", //---------------------------------------------状态
        ActivityPrio: "", //--------------------------------------------优先级
        ActivityMode: "", //--------------------------------------------活动方式
        PlanBeginTime: formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss"), //-----------------------------------计划开始时间
        PlanEndTime: formatDateTime(this.nowTime, "yyyy-MM-dd HH:mm:ss"), //-----------------------------------计划结束时间
        ActualBeginTime: formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss"), //---------------------------------实际开始时间
        ActualEndTime: formatDateTime(this.nowTime, "yyyy-MM-dd HH:mm:ss"), //---------------------------------实际结束时间
        ActivityContent: "", //-----------------------------------------活动名臣
        ActivityDetlContent: "", //-------------------------------------活动描述
        JoinInId: "", //------------------------------------------------参与者ID
        JoinInName: "", //----------------------------------------------参与者姓名
        StrategyCustFlag: this.$store.getters.IsStrategyCustFlag //-----是否战略客户
      };
      this.addclick = true;
      this.dialogVisible = true;
    },
    //-----------------------------------------------------------------新增与编辑窗口 发送请求
    AddClick() {
      if (this.editclick) {
        var edit = {
          param: this.form_data
        };

        //校验时间
        if (this.form_data.PlanBeginTime > this.form_data.PlanEndTime) {
          //验证没有通过
          this.$message({
            message: "计划开始时间不可晚于计划结束时间",
            type: "warning"
          });
          return;
        }

        //校验时间
        if (this.form_data.ActualBeginTime > this.form_data.ActualEndTime) {
          //验证没有通过
          this.$message({
            message: "实际开始时间不可晚于实际结束时间",
            type: "warning"
          });
          return;
        }

        editActityList(edit)
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
            //校验时间
            if (this.form_data.PlanBeginTime > this.form_data.PlanEndTime) {
              //验证没有通过
              this.$message({
                message: "计划开始时间不可晚于计划结束时间",
                type: "warning"
              });
              return;
            }

            //校验时间
            if (this.form_data.ActualBeginTime > this.form_data.ActualEndTime) {
              //验证没有通过
              this.$message({
                message: "实际开始时间不可晚于实际结束时间",
                type: "warning"
              });
              return;
            }

            var edit = {
              param: this.form_data
            };
            edit.param.uuid = this.uuid;
            edit.param.custname = this.custname;
            addActityList(edit)
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
    // 弹出窗确认关闭按钮  :before-close="handleClose"
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //点击删除出现的提示
    delClick(ActivityNo) {
      var del = {
        param: {
          ActivityNo: ActivityNo
        }
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delActityList(del)
            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 上传修改的方法 也是下载的方法(上传与修改)
    handleFileList(resrId, add) {
      this.getFileList(resrId).then(result => {
        let respData = result;
        if (respData != null) {
          //this.form_data_view.fileList.length=0;
          for (let i = 0; i < respData.length; i++) {
            let file = {};
            file.assocId = respData[i].AssocId;
            file.BatchNo = respData[i].BatchNo;
            this.$set(file, "name", respData[i].AppendixName);
            if (add == 1) {
              this.viewfileList.push(file);
            } else if (add == 2) {
              this.addfileList.push(file);
            }
          }
        }
      });
    },
    // 上传修改的方法 也是下载的方法(上传与修改)
    getFileList(resrId) {
      let fileParam = {
        param: resrId
      };
      var p = new Promise(function(resolve, reject) {
        getappendixbyassocId(fileParam).then(result => {
          resolve(result.Data);
        });
      });
      return p;
    },
    //上传组件的回调(上传与修改)
    setId(id, name) {
      this.form_data.ActivityNo = id;
    }
  }
};
</script>

<style scoped>
/* 联系人信息 */

.yh-activity-table {
  margin: 10px 15px;
  min-height: 500px;
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

.ser_page {
  text-align: right;
  padding-right: 20px;
  padding-bottom: 20px;
}
</style>
