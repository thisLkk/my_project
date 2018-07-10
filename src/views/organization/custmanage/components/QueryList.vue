<template>
  <div clss="yh_QueryList">
    <!-- <div class="yh_relationType">
      关系类型：
      <el-radio v-for="item in relationTypeList" :key="item.value" :label="item.value" :value="item.value" v-model="form_data_add.param.RelaType">{{item.label}}</el-radio>
    </div> -->
    <div class="Type">
      <div class="clearfix">
        <h3>请选择关系类型</h3>
      </div>
      <div class="Type_main">
        <el-form :model="TypeList" :rules="TypeListRules" :show-message="showerroemessage" ref="TypeList" label-position="right"
          label-width="90px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="关系类型:" prop="relaType">
                <el-select v-model="TypeList.relaType" size="mini">
                  <el-option key="" label="请选择" value="">
                  </el-option>
                  <el-option v-for="item in RelaTypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="People">
      <div class="clearfix">
        <h3>请选择人员</h3>
      </div>
      <div class="yh_querylist">
        <!-- 列表查询条件-客户管理-选择人员 -->
        <div class="query">
          <div class="table-header clearfix">
            <h3>{{title_}}</h3>
          </div>
          <div class="table-main clearfix ">
            <el-form :model="form_data_query" ref="form_data_query" label-position="right" label-width="90px">
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="机构:">
                    <OrgChoose selectType="redio" @onOrgSure="onOrgSure"></OrgChoose>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="员工工号:">
                    <el-input v-model="form_data_query.param.orgEmployeeVO.EmpId" size="mini" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="员工姓名:">
                    <el-input v-model="form_data_query.param.orgEmployeeVO.EmpName" size="mini" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="10" :span="5">
                  <el-button size="mini" id="el_query" @click="query()"> 查 询</el-button>
                  <!--<el-button size="mini" id="el_reset" @click="reset('form_data_query')">重 置</el-button>-->
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div v-if="tableData!=null" class="yh_querylist-table table-header clearfix">
          <h3>人员列表</h3>
          <el-table :data="tableData" stripe size="mini" max-height=800 style="width: 100%;">
            <el-table-column label="选择" width="55" align="center">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.UposId">{{kong}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="员工号" show-overflow-tooltip width="100" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.OrgEmployeeVO.EmpId}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="mini">{{ scope.row.OrgEmployeeVO.EmpId}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="员工姓名" width="" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.OrgEmployeeVO.EmpName}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="mini">{{ scope.row.OrgEmployeeVO.EmpName}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" width="" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.OrgEmployeeVO.Mob}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="mini">{{ scope.row.OrgEmployeeVO.Mob}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="岗位名称" width="" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.UposName}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="mini">{{ scope.row.UposName}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="所属机构" width="" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <!--orgOrg.OrgAbbr-->
                  <p>{{ UposNameWord(scope.row.UposName) }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="mini">{{ UposNameWord(scope.row.OrgId) }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="pages!=null" class="ser_page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="PageNum" :page-sizes="[5, 10, 15 , 20]"
              :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pages.Total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="AddServer()">
        <i class="fa fa-check diologBtn"></i>添 加</el-button>
      <el-button @click="CloseServer()" size="mini">
        <i class="fa fa-close diologBtn"></i> 取 消</el-button>
    </span>
  </div>
</template>

<script>
  import {
    addTableList,
    getUserPositionList
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //------------------数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-------------------------数据字典的方法
  import OrgChoose from "@/views/organization/components/OrgChoose";
  import {
    JSONArrayToString
  } from "@/utils/datahandle.js";

  export default {
    name: "QueryList",
    components: {
      OrgChoose
    },

    data() {
      return {
        showerroemessage: false, //-----------------------------校验使用
        RelaType: "01",
        PageNum: 1,
        pageSize: 10,
        pages: null,
        total: null,
        TypeListRules: {
          relaType: [{
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }]
        },
        TypeList: {
          relaType: "" //-----关系类型
        },
        form_data_query: {
          param: {
            OrgId: this.$store.getters.orgid > "8000" ? "" :this.$store.getters.orgid, //---------------默认当前用户机构
            orgEmployeeVO: {
              EmpId: "", //------------------------------------员工编号
              EmpName: "" //-----------------------------------员工姓名
            },
          },
          pageInfo: {
            PageNum: 1,
            PageSize: 10,
            Total: 0,
            OrderBy: "",
            Pages: 0
          }
        },
        form_data_add: {
          param: {
            Uuid: "", //	------------------------------------客户ID
            UposId: "", //	----------------------------------用户岗位ID
            RelaType: "", //	--------------------------------关系类型
            BizDir: "", //	----------------------------------业务方向
            MobNo: "", //	------------------------------------手机号
            FixPhone: "", //	--------------------------------座机号
            Email: "", //	------------------------------------电子邮箱
            ComAddr: "" //	----------------------------------通信地址
          }
        },
        title_: "查询条件",
        title: "人员列表",
        radio: "", //-----------------------------------------单选的提交值
        kong: "", //------------------------------------------单选按钮不显示文字
        tableData: null,
        RelaTypeList: [{
            value: "9",
            label: "首席客户官"
          },
          {
            value: "10",
            label: "客户经理"
          },
          {
            value: "11",
            label: "业务联系人"
          }
        ],
        // RelaTypeList:dictItems(DICTYPE.EDW50036)
      };
    },
    //-------------------------------------------------------------------------------初始化完成后加载数据
    mounted() {
      this.query();
      //console.log(this.$store.getters.orgid)
    },
    props: ["parentPage"],
    methods: {
      UposNameWord(code) {
        return dictFilter(DICTYPE.CTCCD0998, code);
      },
      query() {
        //---------------------------------------------------------------------------查询按钮  发查询请求
        var data = this.form_data_query;
        data.pageInfo.PageSize = this.pageSize;
        data.pageInfo.PageNum = this.PageNum;
        getUserPositionList(data)
          .then(response => {
            this.radio = "";
            this.tableData = response.Data;
            this.pages = response.PageInfo;
          })
          .catch(() => {
            //alert("访问出错");
          });
      },
      reset(formName) {
        this.$refs[formName].resetFields();
      },
      AddServer() {

        if ("" == this.radio) {
          this.$message.error("请选择一条人员信息！");
          return;
        }
        //----------------------------------------------------------------------------设置客户UUID(正式或注册)
        if ("regCust" == this.parentPage) {
          this.form_data_add.param.Uuid = this.$store.getters.Uuid_Reg_Cust;
        } else {
          this.form_data_add.param.Uuid = this.$store.getters.Uuid_formal;
        }
        //----------------------------------------------------------------------------设置选择人员信息
        this.tableData.forEach(item => {
          if (item.UposId == this.radio) {
            this.form_data_add.param.UposId = item.UposId; //	-------------------------用户岗位ID
            this.form_data_add.param.OrgId = item.OrgId; //	---------------------------机构编号
            this.form_data_add.param.EmpNo = item.OrgEmployeeVO.EmpId; //	-------------员工编号
            this.form_data_add.param.EmpName = item.OrgEmployeeVO.EmpName; //	---------员工姓名
            this.form_data_add.param.MobNo = item.OrgEmployeeVO.Mob; //	---------------手机号
            this.form_data_add.param.FixPhone = item.OrgEmployeeVO.HomePhone; //	-----座机号
            this.form_data_add.param.Email = item.OrgEmployeeVO.Email; //	-------------电子邮箱
            this.form_data_add.param.ComAddr = item.OrgEmployeeVO.ContactAddr; //	-----通信地址
            this.form_data_add.param.RelaType = this.TypeList.relaType; // -关系类型
          }
        });
        this.$refs["TypeList"].validate(valid => {
          if (valid) {
            addTableList(this.form_data_add)
              .then(response => {
                this.$message.success("添加成功！");
                this.$emit("doAddCancel");
              })
              .catch(() => {
                //alert("访问出错");
              });
          } else {
            //验证没有通过
            this.$message({
              message: "请按规则填入和选择必填项",
              type: "warning"
            });
          }
        });
      },
      CloseServer() {
        this.$emit("doAddCancel");
      },
      handleCurrentChange(val) {
        this.PageNum = val;
        this.query();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.query();
      },
      //------------------------------------------------------------------------------设置机构选择之后的值
      onOrgSure(val) {
        //console.info(val);
        this.form_data_query.param.OrgId = val.toString();
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_relationType {
    border: 2px solid #eeeeee;
    margin: 20px;
    padding-left: 30px;
  }

  .Type {
    margin: 20px;
    .Type_main {
      margin-top: 10px;
    }
  }

  .People {
    margin: 20px;
    .yh_querylist {
      margin-top: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border: 1px solid #ebeef5;
      .query {
        height: 160px;
        margin: 20px;
        box-sizing: border-box;
        .table-main {
          .mechanism,
          .job-number,
          .job-name {
            margin-left: 20px;
          }
          .mechanism .el-cascader--medium {
            width: 90%;
          }
          .job-number span {
            float: left;
            display: inline-block;
          }
          .screen_btn {
            margin-right: 20px;
            margin-top: 10px;
          }
          .screen_btn .el-button {
            padding: 0;
            margin: 0;
            width: 49px;
            height: 26px;
            line-height: 10px;
            &:nth-child(1):hover {
              background: #ffffff;
              color: #a7703d;
            }
          }
        }
      }
      .yh_querylist-table {
        margin: 20px;
        height: 100%;
        box-sizing: border-box;
        padding: 8px;
        padding-bottom: 20px;
        h3 {
          margin: 10px 0;
        }
        .select {
          float: left;
          margin: 10px 0;
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
    }
  }

  .dialog-footer {
    display: block;
    padding-left: 40%;
    padding-bottom: 20px;
  }

</style>
