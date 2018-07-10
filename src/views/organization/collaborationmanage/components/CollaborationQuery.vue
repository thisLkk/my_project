<template>
  <!-- 协同管理 __ 我的协同商机 __ 查询条件 -->
  <div class="yh_CollaborationQuery">
    <el-card class="box-card">
      <el-form :model="form_data" label-width="130px" size="mini" ref="form_data">
        <el-row>
          <el-col :span="24">
            <div class="yh-headerdiv clearfix">
              <span class="yh-headerfl">
                <span class="yh-font">查询条件</span>
              </span>
              <span class="yh-headerfr">
                <div id="yh-advanced" @click="showQuery_()">
                  <i :class="icon"></i>
                </div>
              </span>
            </div>
          </el-col>
        </el-row>
        <div class="showQuery" :class="!showQuery ? 'active' : ''">
          <el-row>
            <el-col :span="6">
              <el-form-item label="快速搜索:" prop="FastSearch">
                <el-select v-model="form_data.FastSearch" placeholder="请选择" size="mini">
                  <el-option v-for="item in FastSearchList" :key="item.value" :label="item.value" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="ActivityName">
                <el-input type="text" placeholder="快速搜索值" v-model="form_data.ActivityName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <!-- <el-button id="accurate" size="mini" @click="accurate()">精确</el-button>
              <el-button id="vague" size="mini" @click="vague()">模糊</el-button> -->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="商机状态:" prop="BusinessState">
                <el-checkbox-group @change="checkChange(form_data.BusinessState)" v-model="form_data.BusinessState">
                  <el-checkbox-button key="" label="">不限</el-checkbox-button>
                  <el-checkbox-button :key="item.value" :label="item.value" v-for="item in BusinessStateList">{{item.label}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务类别:" prop="seaver">
                <el-checkbox-group @change="checkChange(form_data.seaver)" v-model="form_data.seaver">
                  <el-checkbox-button key="" label="">不限</el-checkbox-button>
                  <el-checkbox-button :key="item.value" :label="item.value" v-for="item in seaverList">{{item.label}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务类别:" prop="category">
                <el-checkbox-group @change="checkChange(form_data.category)" v-model="form_data.category">
                  <el-checkbox-button key="" label="">不限</el-checkbox-button>
                  <el-checkbox-button :key="item.value" :label="item.value" v-for="item in categoryList">{{item.label}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="优先级:" prop="priority">
                <el-select v-model="form_data.priority" placeholder="请选择" size="mini">
                  <el-option key="" label="请选择" value="">
                  </el-option>
                  <el-option v-for="item in priorityList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item prop="BusinessName" label="商机名称:">
                <el-input type="text" v-model="form_data.BusinessName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="job" label="发起对接人职务:">
                <el-input type="text" v-model="form_data.job"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item prop="name_" label="客户名称:">
                <el-input type="text" v-model="form_data.name_"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发起机构:">
                <OrgChoose selectType="redio" :undertakeOrgChoose ='undertakeOrgChoose'  @onOrgSure="onOrgSure"></OrgChoose>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="yh-buttonsdiv">
                <div class="yh-buttons">
                  <el-form-item>
                    <el-button id="el_query" size="mini" @click="submitForm(form_data)">查询</el-button>
                    <!-- <el-button id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button> -->
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getMyCollaboration } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import OrgChoose from "@/views/organization/components/OrgChoose";
import { checkAllChange } from "@/utils/datahandle.js"; //--------------------------------多选的方法
import { dictItems } from "@/filters"; //-------------------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-------------------数据字典的方法
export default {
  name: "CollaborationQuery",
  props: {
    name: {
      //--------------------------------------------------------判断是哪个类别在调用此组件
      type: String
    }
  },
  components: {
    OrgChoose
  },
  data() {
    return {
      icon: "fa fa-angle-double-up",
      InitiatorShow: false, //----------------------------------发起机构使用的弹窗
      showQuery: true, //---------------------------------------控制查询条件div是否显示
      businessPush: true,
      businessPush_: "更多",
      undertakeOrgChoose: "",
      form_data: {
        FastSearch: "initiatorName", //-------------------------快速搜索inp
        ActivityName: "", //------------------------------------活动名称
        searchType: "0", //-------------------------------------精确或者模糊(默认)
        BusinessState: [""], //---------------------------------商机状态
        seaver: [""], //----------------------------------------服务类别
        category: [""], //--------------------------------------业务类别
        priority: "", //----------------------------------------优先级
        BusinessName: "", //------------------------------------商机名称
        job: "", //---------------------------------------------发起对接人职务
        name_: "", //-------------------------------------------客户名称
        Initiator: "" //----------------------------------------发起机构
      },
      BusinessStateList: dictItems(DICTYPE.OSPCD0228), //-------商机状态
      seaverList: dictItems(DICTYPE.OSPCD0227), //--------------服务类别
      categoryList: dictItems(DICTYPE.OSPCD0226), //------------业务类别
      priorityList: dictItems(DICTYPE.OSPCD0229), //------------优先级
      FastSearchList: [
        {
          value: "发起人",
          key: "initiatorName"
        },
        {
          value: "审批人",
          key: "approvePerName"
        },
        {
          value: "协同人",
          key: "coordiPerName"
        },
        {
          value: "应答人",
          key: "coordiResponsPerName"
        },
        {
          value: "承办人",
          key: "contractorName"
        },
        {
          value: "团队应答人",
          key: "teamResponsPerName"
        }
      ]
    };
  },
  created() {
    if (this.name == "Launch") {
        // alert("我是发起方的查询");
        this.undertakeOrgChoose = "";
      } else if (this.name == "Undertake") {
        this.undertakeOrgChoose = "承办";
      } else if (this.name == "Release") {
        //我发布的查询
        this.undertakeOrgChoose = "";
      } else if (this.name == "OrgLaunch") {
        //这是我机构的发起方查询
        this.undertakeOrgChoose = "";
      } else if (this.name == "OrgUndertake") {
        //这是我机构的发起方查询
        this.undertakeOrgChoose = "承办";
      } else if (this.name == "TeamLaunch") {
        //这是我团队的发起方查询
        this.undertakeOrgChoose = "";
      } else if (this.name == "TeamUndertake") {
        //这是我团队的发起方查询
        this.undertakeOrgChoose = "承办";
      }
  },
  methods: {
    // --------------------------------------------------------多选框的不限方法
    checkChange(val) {
      checkAllChange(val);
    },
    //--------------------------------------------------------用于发起机构的弹窗
    handleIconClick() {
      // this.InitiatorShow = true;
    },
    //--------------------------------------------------------显示或隐藏搜索页面
    showQuery_() {
      if (this.showQuery) {
        this.showQuery = false;
        this.icon = "fa fa-angle-double-down";
        return;
      } else {
        this.icon = "fa fa-angle-double-up";
        this.showQuery = true;
      }
    },
    //---------------------------------------------------------查询方法
    submitForm(formName) {
      var query = {
        param: {
          searchKey: formName.FastSearch,
          searchValue: formName.ActivityName,
          searchType: formName.searchType,
          busoppSts: formName.BusinessState.toString(),
          srvCate: formName.seaver.toString(),
          bizCate: formName.category.toString(),
          prio: formName.priority.toString(),
          busoppName: formName.BusinessName,
          initiateAlignPerDuty: formName.job,
          custName: formName.name_,
          initiatorOrg: formName.Initiator
        }
      };
      if (this.name == "Launch") {
        // alert("我是发起方的查询");
        this.undertakeOrgChoose = "";
        query.name = "Launch";
        this.$emit("init", query);
      } else if (this.name == "Undertake") {
        this.undertakeOrgChoose = "承办";
        // alert("我是承办方的查询");
        query.name = "Undertake";
        this.$emit("init", query);
      } else if (this.name == "Release") {
        //我发布的查询
        this.undertakeOrgChoose = "";
        query.name = "Release";
        this.$emit("init", query);
      } else if (this.name == "OrgLaunch") {
        //这是我机构的发起方查询
        // alert("我协同的发起")
        this.undertakeOrgChoose = "";
        query.name = "OrgLaunch";
        query.param.orgTeamType = "0";
        this.$emit("init", query);
      } else if (this.name == "OrgUndertake") {
        //这是我机构的发起方查询
        // alert("我协同的承办")
        this.undertakeOrgChoose = "承办";
        query.name = "OrgUndertake";
        query.param.orgTeamType = "0";
        this.$emit("init", query);
      } else if (this.name == "TeamLaunch") {
        //这是我团队的发起方查询
        // alert("我团队的发起")
        this.undertakeOrgChoose = "";
        query.name = "TeamLaunch";
        query.param.orgTeamType = "1";
        this.$emit("init", query);
      } else if (this.name == "TeamUndertake") {
        //这是我团队的发起方查询
        // alert("我团队的承办")
        this.undertakeOrgChoose = "承办";
        query.name = "TeamUndertake";
        query.param.orgTeamType = "1";
        this.$emit("init", query);
      }
      // getTableList(query) //初始请求
      // .then(response => {
      //   //console.log(response);
      //   this.tableData = response.Data;
      //   this.pages = response.PageInfo;
      // })
      // .catch(() => {
      //   this.$confirm("访问出错(服务团队)")
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // });
    },
    //------------------------------------------------------------------重置查询条件方法（暂无使用）
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form_data.searchType = "0";
    },
    //------------------------------------------------------------------精确（暂无使用）
    accurate() {
      this.form_data.searchType = "1";
    },
    //------------------------------------------------------------------模糊（暂无使用）
    vague() {
      this.form_data.searchType = "0";
    },
    //------------------------------------------------------------------设置机构选择之后的值
    onOrgSure(val) {
      this.form_data.Initiator = val.toString();
      console.log(val)
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh_CollaborationQuery {
  box-sizing: border-box;
  .box-card{
    box-shadow:none;
  }
  .yh-headerdiv {
    height: 40px;
    border-bottom: 1px #eeeee9 solid;
    .yh-headerfl {
      float: left;
      width: 70px;
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #cb6c2f;
    }
    .yh-headerfr {
      float: right;
      height: 40px;
      width: 30px;
      line-height: 40px;
      border-radius: 8px;
      #yh-advanced {
        padding-left: 7px;
        cursor: pointer;
        box-sizing: border-box;
      }
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
      label{
        font-size:12px;
        font-weight:normal;
        color:red;
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
}
</style>
