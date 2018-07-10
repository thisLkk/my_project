<template>
  <!-- 协同管理 _ 我的协同商机 _ 新建商机弹窗 -->
  <div class="yh_BusinessPublicNewForm">
    <!-- <a style="color: blue;position: absolute;right: 24px;top: 160px;z-index:1000;" href="/#/ResourceManage/KnowledgeBaseManagement/KnowledgeBaseManagement">去知识库...</a> -->
    <div class="public_info">
      <h3>协同商机公共信息</h3>
      <el-form label-position="center" ref="public_info" :show-message="showerroemessage" :rules="public_infoRules" label-width="150px" :model="public_info" size="mini">
        <el-row>
          <el-col :span="9">
            <el-form-item  prop="formal" label="正式客户:">
              <a href="javascript:void(0)" @click="handleIconClick('正式')" style="position: absolute;z-index: 10;width: 100%;height: 100%;"></a>
              <el-input style="width:100%;"  v-model="public_info.formal.custName"  :placeholder="placeholder">
                <i class="el-icon-search el-input__icon" slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="registered" label="注册客户:">
              <a href="javascript:void(0)" @click="handleIconClick('注册')" style="position: absolute;z-index: 10;width: 100%;height: 100%;"></a>
              <el-input style="width:100%;" v-model="public_info.registered.custName" :placeholder="placeholder">
                <i class="el-icon-search el-input__icon" slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="客户联系人:">
              <el-input v-model="public_info.lianxiren_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="发起对接人:">
              <el-input v-model="public_info.faqiren_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="客户联系人电话:" prop="lianxiren_tel">
              <el-input v-model.number="public_info.lianxiren_tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="发起对接人电话:" prop="faqiren_tel">
              <el-input v-model.number="public_info.faqiren_tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="客户联系人职务:">
              <el-input v-model="public_info.lianxiren_job"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="发起对接人职务:" >
              <el-input v-model="public_info.faqiren_job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="发起人:">
              <el-input v-model="public_info.faqiren_" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="发起人机构:">
              <el-input v-model="public_info.faqiren_jigou" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="">
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="发起时间:">
              <el-input v-model="public_info.time" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bussines_info">
      <h3 class="clearfix">协同商机项第一项
        <el-button v-if="false" slot="reference" @click="removeBusiness(index)" id="removeBtn" size="mini">
          <i class="fa fa-close diologBtn"></i>
        </el-button>
      </h3>
      <el-form label-position="center" ref="items" :rules="itemRules" :show-message="showerroemessage" label-width="150px" :model="bussines_info" size="mini">
        <el-row>
          <el-col :span="9">
            <el-form-item prop="business_name" label="协同商机名称:">
              <el-input v-model="bussines_info.business_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="ResponseMode" label="协同商机响应模式:">
              <el-select v-model="bussines_info.ResponseMode" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in ResponseModeList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item prop="ServiceCate" label="服务类别:">
              <el-select v-model="bussines_info.ServiceCate" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in ServiceCateList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="BusinessCate" label="业务类别:">
              <el-select v-model="bussines_info.BusinessCate" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in BusinessCateList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="协同机构:"  prop="OrgChoose">
              <span style="color:red;left: -82px;top:0;position: absolute;">*</span>
              <OrgChoose selectType="check" dataInitType="allOrg" undertakeOrgChoose="新增" businessNew="one"  @onOrgSure="onOrgSure"></OrgChoose>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="priority" label="优先级:">
              <el-select v-model="bussines_info.priority" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in priorityList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="预计交易日期:">
              <el-date-picker v-model="bussines_info.expectedData" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="预计成交金额(万元):">
              <el-input v-model="bussines_info.Turnover"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="协同商机描述:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="请输入需要描述的信息..." v-model="bussines_info.describe">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="协同需求建议:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="填写特殊要求，如建议协同机构对接团队或人员等" v-model="bussines_info.proposal">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" >
           <el-form-item label="上传需求报告:">
               <fileUpload :relId="bussines_info.busoppId" :addfileList="addfileList" @setId="setId"></fileUpload>
               </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bussines_info" v-if="bussinesTwo">
      <h3 class="clearfix">协同商机项第二项
        <el-button slot="reference" @click="removeBusiness()" id="removeBtn" size="mini">
          <i class="fa fa-close diologBtn"></i>
        </el-button>
      </h3>
      <el-form label-position="center" ref="itemsTwo" :rules="itemRulesTwo" :show-message="showerroemessage" label-width="150px" :model="bussines_infoTwo" size="mini">
        <el-row>
          <el-col :span="9">
            <el-form-item prop="business_name" label="协同商机名称:">
              <el-input v-model="bussines_infoTwo.business_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="ResponseMode" label="协同商机响应模式:">
              <el-select v-model="bussines_infoTwo.ResponseMode" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in ResponseModeList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item prop="ServiceCate" label="服务类别:">
              <el-select v-model="bussines_infoTwo.ServiceCate" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in ServiceCateList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="BusinessCate" label="业务类别:">
              <el-select v-model="bussines_infoTwo.BusinessCate" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in BusinessCateList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="协同机构:"  prop="OrgChoose">
              <span style="color:red;left: -82px;top:0;position: absolute;">*</span>
              <OrgChoose selectType="check" dataInitType="allOrg" undertakeOrgChoose="新增" businessNew="two"  @onOrgSure="onOrgSure"></OrgChoose>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item prop="priority" label="优先级:">
              <el-select v-model="bussines_infoTwo.priority" placeholder="请选择" size="mini">
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option v-for="item_ in priorityList" :key="item_.value" :label="item_.label" :value="item_.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="预计交易日期:">
              <el-date-picker v-model="bussines_infoTwo.expectedData" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="预计成交金额(万元):">
              <el-input v-model="bussines_infoTwo.Turnover"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="协同商机描述:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="请输入需要描述的信息..." v-model="bussines_infoTwo.describe">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="协同需求建议:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="填写特殊要求，如建议协同机构对接团队或人员等" v-model="bussines_infoTwo.proposal">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" >
             <el-form-item label="上传需求报告:">
               <fileUpload :relId="bussines_infoTwo.busoppId" listenName="twoFile" :addfileList="addfileList" @setId="setId"></fileUpload>
               </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn">
      <el-button v-if="newBusinessBtn" type="primary" size="mini" @click="newBusiness">
        <i class="fa fa-check diologBtn"></i>新增协同商机</el-button>
      <el-button type="primary" @click="newForm_edit()" size="mini">
        <i class="fa fa-check diologBtn"></i>提交申请</el-button>
      <el-button @click="newForm_close" size="mini">
        <i class="fa fa-close diologBtn"></i> 保存关闭</el-button>
    </div>
    <el-dialog title="客户选择查询" append-to-body :visible.sync="CustomerGelectionGeneralShow" width="800px" top="40vh" :before-close="CustomerGelectionGeneralClose">
      <FormalOrRegsit ref="PublicQueryComponent"  :queryName="queryName" @CustomerGelectionGeneralClick="CustomerGelectionGeneralClick"></FormalOrRegsit>
    </el-dialog>
  </div>
</template>

<script>
import {
  getappendixbyassocId,
  downloadappendix,
  deleteappendix
} from "@/api/organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement/index.js"; //上传接口
import fileUpload from "@/views/organization/resourcemanage/components/FileUpload"; //上传组件
import FormalOrRegsit from "@/views/organization/components/FormalOrRegsit.vue";
import TeamQueryComponents from "@/views/organization/components/TeamQueryComponents.vue";
import { AddMyCollaboration } from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import OrgChoose from "@/views/organization/components/OrgChoose.vue";
import { dictItems, dictFilter } from "@/filters"; //数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //数据字典的方法
export default {
  name: "BusinessPublicNewForm",
  components: {
    FormalOrRegsit,
    TeamQueryComponents,
    OrgChoose,
    fileUpload
  },
  data() {
    return {
      CustomerGelectionGeneralShow: false, //-------个人的查询弹窗
      queryName: null, //---------------------------正式或者注册调用
      queryNameTrue: false, //----------------------正式或者注册调用（刺激组件调用方法）
      coordiOrgInfoVO: [], //-----------------------机构树数据
      showerroemessage: false, //-------------------校验show-messageshowerroemessage
      bussinesTwo: false, //------------------------第二个商机是否展示
      newBusinessBtn: true, //----------------------新增商机的显示
      addfileList: [], //---------------------------上传的临时文件（可用于判断新建或是修改）
      placeholder: "正式客户与注册客户只填其一",
      public_info: {
        lianxiren_name: "",
        faqiren_name: "",
        lianxiren_tel: "",
        faqiren_tel: "",
        lianxiren_job: "",
        faqiren_job: "",
        faqiren_: this.$store.getters.userName,
        faqiren_jigou: "",
        time: "",
        formal: {
          custName: "",
          custNo: "",
          custType: ""
        },
        registered: {
          custName: "",
          custNo: "",
          custType: ""
        }
      },
      bussines_info: {
        business_name: "",
        ResponseMode: "",
        ServiceCate: "",
        BusinessCate: "",
        Coordination_: "", //机构回显的值
        Coordination: [],
        priority: "",
        expectedData: "",
        Turnover: "",
        describe: "",
        proposal: "",
        busoppId: ""
      },
      bussines_infoTwo: {
        business_name: "",
        ResponseMode: "",
        ServiceCate: "",
        BusinessCate: "",
        Coordination_: "", //机构回显的值
        Coordination: [],
        priority: "",
        expectedData: "",
        Turnover: "",
        describe: "",
        proposal: "",
        busoppId: ""
      },
      public_infoRules: {
        formal: [
          {
            required: true,
            message: "请输入客户名称"
          }
          // { type: 'string', message: ''}
        ],
        registered: [
          {
            required: true,
            message: "请输入客户名称"
          }
        ],
        lianxiren_tel: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        faqiren_tel: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      itemRules: {
        business_name: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        ResponseMode: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        ServiceCate: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        BusinessCate: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        priority: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      itemRulesTwo: {
        business_name: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        ResponseMode: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        ServiceCate: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        BusinessCate: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        priority: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      ResponseModeList: dictItems(DICTYPE.OSPCD0231), //----相应
      ServiceCateList: dictItems(DICTYPE.OSPCD0227), //-----服务
      BusinessCateList: dictItems(DICTYPE.OSPCD0226), //----业务
      priorityList: dictItems(DICTYPE.OSPCD0229) //---------优先级
    };
  },
  created() {
    this.getOrgInfo();
  },
  methods: {
    // ---------------------------------------------------------------获取回显信息
    getOrgInfo() {
      var date = new Date();
      var nowDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.public_info.time = nowDate;
      this.public_info.faqiren_jigou = dictFilter(
        DICTYPE.CTCCD0998,
        this.$store.getters.orgid
      );
      this.public_info.faqiren_ = this.$store.getters.userName;
    },
    //正式客户或者注册客户的弹窗
    handleIconClick(data) {
      this.queryName = data;
      this.CustomerGelectionGeneralShow = true;
      if (this.queryNameTrue) {
        this.getOrgInfo();
        this.$refs.PublicQueryComponent.queryNameInit(data);
      }
    },
    //----------------------------------------------------------------发送完接口在清空
    resetForm() {
      for (const key in this.bussines_info) {
        this.bussines_info[key] = "";
        if (key == "Coordination") {
          this.bussines_info.Coordination = [];
        }
      }
      for (const key in this.bussines_infoTwo) {
        this.bussines_infoTwo[key] = "";
        if (key == "Coordination") {
          this.bussines_infoTwo.Coordination = [];
        }
      }
      for (const key in this.public_info) {
        if (key == "formal") {
          for (const keys in this.public_info.formal) {
            this.public_info.formal[keys] = "";
          }
        } else if (key == "registered") {
          for (const key_ in this.public_info.registered) {
            this.public_info.registered[key_] = "";
          }
        } else {
          this.public_info[key] = "";
        }
      }
    },
    // ----------------------------------------------------------------机构树
    onOrgSure(val, name) {
      if (name == "one") {
        val.forEach(item => {
          this.bussines_info.Coordination.push({
            coordiOrgId: item
          });
        });
      } else if (name == "two") {
        val.forEach(item => {
          this.bussines_infoTwo.Coordination.push({
            coordiOrgId: item
          });
        });
      }
      // var data = val;
      // var self = this;
      // data.forEach(item => {
      //   this.coordiOrgInfoVO.push({
      //     coordiOrgId: item
      //   });
      // });
    },
    //提交申请，调接口，置空表单
    newForm_edit() {
      this.submitRequire("0");
      this.addfileList = [];//------------(上传与修改)
      this.bussines_info.busoppId = "";
    },
    //保存关闭 临时保存
    newForm_close() {
      this.submitRequire("1");
      this.addfileList = [];//------------(上传与修改)
      this.bussines_info.busoppId = "";
    },
    submit(saveType) {
      //验证通过 需要处理提交表单的逻辑 做表单后期处理 (处理附加数据 提交和控制显示，清除数据等等)
      var public_info = this.public_info;
      var require = [];
      var custName = "";
      var custNo = "";
      var custType = "";
      //监听是注册客户还是正式客户
      if (public_info.formal.custName == "") {
        custName = public_info.registered.custName;
        custNo = public_info.registered.custNo;
        custType = public_info.registered.custType;
      } else if (public_info.registered.custName == "") {
        custName = public_info.formal.custName;
        custNo = public_info.formal.custNo;
        custType = public_info.formal.custType;
      } else {
        custName = "";
      }
      if (
        this.bussines_info.Coordination.length != 0 &&
        this.bussines_info.business_name != "" &&
        this.bussines_info.business_name.length < 32
      ) {
        this.$refs["items"].validate(valid => {
          if (valid) {
            var info = {
              saveType: saveType, // custName custNo custType
              custName: custName,
              custNo: custNo,
              custType: custType,
              custConPer: public_info.lianxiren_name,
              custConPerPhone: public_info.lianxiren_tel,
              custConPerDuty: public_info.lianxiren_job,
              initiateAlignPer: public_info.faqiren_name,
              initiateAlignPerPhone: public_info.faqiren_tel,
              initiateAlignPerDuty: public_info.faqiren_job,
              busoppName: this.bussines_info.business_name,
              coordiRespons: this.bussines_info.ResponseMode,
              srvCate: this.bussines_info.ServiceCate,
              bizCate: this.bussines_info.BusinessCate,
              coordiOrgInfoVO: this.bussines_info.Coordination,
              prio: this.bussines_info.priority,
              forecastTrdDate: this.bussines_info.expectedData,
              forecastMatchAmt: this.bussines_info.Turnover,
              busoppDesc: this.bussines_info.describe,
              requirePropose: this.bussines_info.proposal,
              busoppId: this.bussines_info.busoppId
            };
            require.push(info);
            var data = {
              param: require
            };
            if (!this.bussinesTwo) {
              AddMyCollaboration(data)
                .then(response => {
                  if (response.Meta.Code == "0000") {
                    this.$emit("newForma", ""); //此方法是给父组件传递关闭信号
                    this.resetForm(); //-----------清空form表单
                  }
                })
                .catch(() => {
                  // this.$confirm("访问出错(我的协同商机)")
                  // .then(_ => {
                  // done();
                  // })
                  // .catch(_ => {});
                });
            }
          } else {
            this.$message({
              message: "请按规则填入和选择必填项",
              type: "warning"
            });
          }
        });
      } else {
        this.$message({
          message: "商机名称为32位字符之内或协同机构未填写",
          type: "warning"
        });
        return;
      }
      if (
        this.bussines_infoTwo.Coordination.length != 0 &&
        this.bussines_infoTwo.business_name != "" &&
        this.bussines_infoTwo.business_name.length < 32
      ) {
        if (this.bussinesTwo) {
          this.$refs["itemsTwo"].validate(valid => {
            if (valid) {
              var info = {
                saveType: saveType, // custName custNo custType
                custName: custName,
                custNo: custNo,
                custType: custType,
                custConPer: public_info.lianxiren_name,
                custConPerPhone: public_info.lianxiren_tel,
                custConPerDuty: public_info.lianxiren_job,
                initiateAlignPer: public_info.faqiren_name,
                initiateAlignPerPhone: public_info.faqiren_tel,
                initiateAlignPerDuty: public_info.faqiren_job,
                busoppName: this.bussines_infoTwo.business_name,
                coordiRespons: this.bussines_infoTwo.ResponseMode,
                srvCate: this.bussines_infoTwo.ServiceCate,
                bizCate: this.bussines_infoTwo.BusinessCate,
                coordiOrgInfoVO: this.bussines_infoTwo.Coordination,
                prio: this.bussines_infoTwo.priority,
                forecastTrdDate: this.bussines_infoTwo.expectedData,
                forecastMatchAmt: this.bussines_infoTwo.Turnover,
                busoppDesc: this.bussines_infoTwo.describe,
                requirePropose: this.bussines_infoTwo.proposal,
                busoppId: this.bussines_infoTwo.busoppId
              };
              require.push(info);
              var data = {
                param: require
              };
              console.log(data)
              if (this.bussinesTwo) {
                AddMyCollaboration(data)
                  .then(response => {
                    if (response.Meta.Code == "0000") {
                      this.$emit("newForma", ""); //此方法是给父组件传递关闭信号
                      this.resetForm(); //-----------清空form表单
                    }
                  })
                  .catch(() => {
                    // this.$confirm("访问出错(我的协同商机)")
                    // .then(_ => {
                    // done();
                    // })
                    // .catch(_ => {});
                  });
              }
            } else {
              this.$message({
                message: "请按规则填入和选择必填项",
                type: "warning"
              });
            }
          });
        }
      } else {
        this.$message({
          message: "商机名称为32位字符之内或协同机构未填写",
          type: "warning"
        });
        return;
      }
    },
    submitRequire(saveType) {
      if (
        this.public_info.formal.custName != "" ||
        this.public_info.registered.custName != ""
      ) {
        if (
          this.public_info.lianxiren_tel != "" &&
          this.public_info.faqiren_tel != ""
        ) {
          if (
            !isNaN(this.public_info.lianxiren_tel) &&
            !isNaN(this.public_info.faqiren_tel)
          ) {
            if (
              String(this.public_info.lianxiren_tel).length == 11 &&
              String(this.public_info.faqiren_tel).length == 11
            ) {
              this.submit(saveType);
            } else {
              this.$message({
                message: "联系方式格式错误",
                type: "warning"
              });
            }
          } else {
            this.$message({
              message: "联系方式格式错误",
              type: "warning"
            });
          }
        } else {
          this.$message({
            message: "请输入联系电话",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "请按规则填入和选择必填项",
          type: "warning"
        });
      }
    },
    //新建商机
    newBusiness() {
      this.bussinesTwo = true; //----------判断第二个商机显示
      this.newBusinessBtn = false; //--------
    },
    //移除商机
    removeBusiness() {
      if (this.bussinesTwo) {
        this.newBusinessBtn = true;
        this.bussinesTwo = false; //---------清空第二个商机
        for (const key in this.bussines_infoTwo) {
          this.bussines_infoTwo[key] = "";
          if (key == "Coordination") {
            this.bussines_infoTwo.Coordination = [];
          }
        }
      }
    },
    // 通用客户查询组件内的确定按钮关闭搜索弹窗
    CustomerGelectionGeneralClick(data) {
      this.queryNameTrue = true;
      var self = this;
      self.public_info.formal.custName = "";
      if (data.queryName == "正式") {
        self.public_info.formal.custName = data.custName;
        self.public_info.formal.custNo = data.custNo;
        self.public_info.formal.custType = data.custType;
        if (this.public_info.formal.custName != "") {
          this.public_info.registered.custName = "";
        }
      } else if (data.queryName == "注册") {
        this.public_info.registered.custName = data.custName;
        this.public_info.registered.custNo = data.custNo;
        this.public_info.registered.custType = data.custType;
        if (this.public_info.registered.custName != "") {
          this.public_info.formal.custName = "";
        }
      }
      this.CustomerGelectionGeneralShow = false;
    },
    //通用客户查询组件的dialog关闭方法
    CustomerGelectionGeneralClose(done) {
      this.queryNameTrue = true;
      this.CustomerGelectionGeneralShow = false;
    },
    //上传组件的回调
    setId(id, name) {
      if (name == "twoFile") {
        this.bussines_infoTwo.busoppId = id;
      } else {
        this.bussines_info.busoppId = id;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessPublicNewForm {
  position: relative;
  padding-bottom: 20px;
  .public_info {
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
      margin-left: 5px;
      padding-left: 5px;
      color: #000000;
      border-left: 3px solid #ce8f3d;
    }
  }
  .bussines_info {
    margin-top: 20px;
    border: 1px solid #eeeee9;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 14px;
    padding-bottom: 20px;
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
      .fa {
        font-size: 18px;
      }
    }
  }
  .btn {
    margin: 20px 0;
    margin-left: 36%;
  }
  .v-modal {
    z-index: 1500;
  }
}
</style>
