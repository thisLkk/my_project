<template>
  <!-- 协同管理 _ 协同商机发布 _ 协作处理 -->
  <div class="yh_BusinessReleaseTablePopup">
    <!-- <a style="color: blue;position: absolute;right: 24px;top: 300px;z-index:1000;" href="/#/ResourceManage/KnowledgeBaseManagement/KnowledgeBaseManagement">去知识库...</a> -->
    <div class="bussines_ending">
      <h3>协同商机发布</h3>
      <el-form label-position="center" label-width="150px" :model="bussines_ending" size="mini">
        <el-row>
          <el-col :span="9">
            <el-form-item label="处理人:">
              <el-input v-model="bussines_ending.faqiren_" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="处理人机构:">
              <el-input v-model="bussines_ending.faqiren_jigou" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="">
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="处理时间:">
              <el-input v-model="bussines_ending.time" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="处理意见:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="" v-model="bussines_ending.details">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="public_info">
      <h3>协同商机信息</h3>
      <el-form label-position="center" label-width="150px" :model="public_info" size="mini">
        <el-row>
          <el-col :span="9">
            <el-form-item label="正式客户:">
              <a href="javascript:void(0)" @click="handleIconClick('正式')" style="position: absolute;z-index: 10;width: 100%;height: 100%;"></a>
              <el-input style="width:100%;" v-model="public_info.formal.custName" :placeholder="placeholder">
                <i class="el-icon-search el-input__icon" slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="注册客户:">
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
            <el-form-item label="客户联系人电话:">
              <el-input v-model="public_info.lianxiren_tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="3">
            <el-form-item label="发起对接人电话:">
              <el-input v-model="public_info.faqiren_tel"></el-input>
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
            <el-form-item label="发起对接人职务:">
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
            <el-form-item label="发起日期:">
              <el-input v-model="public_info.time" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-form label-position="center" label-width="150px" :model="bussines_info" size="mini">
          <el-row>
            <el-col :span="9">
              <el-form-item label="协同商机名称:">
                <el-input v-model="bussines_info.business_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="协同商机响应模式:">
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
              <el-form-item label="服务类别:">
                <el-select v-model="bussines_info.ServiceCate" placeholder="请选择" size="mini">
                  <el-option key="" label="请选择" value="">
                  </el-option>
                  <el-option v-for="item_ in ServiceCateList" :key="item_.value" :label="item_.label" :value="item_.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="业务类别:">
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
              <el-form-item label="协同机构:">
                <OrgChoose v-if="businessName!=''" selectType="check" :businessName="businessName" dataInitType="allOrg" @onOrgSure="onOrgSure"></OrgChoose>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="优先级:">
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
              <el-form-item label="协同需求描述:">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="填写特殊要求，如建议协同机构对接团队或人员等" v-model="bussines_info.proposal">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="上传需求报告:">
                <fileUpload :relId="fromUid" :addfileList="addfileList" @setId="setId"></fileUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="newForm_edit()" size="mini">
        <i class="fa fa-check diologBtn"></i>发布申请</el-button>
      <el-button @click="newForm_close()" size="mini">
        <i class="fa fa-close diologBtn"></i> 退回申请</el-button>
    </div>
    <el-dialog title="客户选择查询" append-to-body :visible.sync="CustomerGelectionGeneralShow" width="800px" top="40vh" :before-close="CustomerGelectionGeneralClose">
      <FormalOrRegsit ref="PublicQueryComponent" :queryName="queryName" @CustomerGelectionGeneralClick="CustomerGelectionGeneralClick"></FormalOrRegsit>
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
import OrgChoose from "@/views/organization/components/OrgChoose.vue";
import { dictItems, dictFilter } from "@/filters"; //-----------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //------------------------数据字典的方法
import {
  releaseBusoppstate,
  EchoMyCollaboration
} from "@/api/organization/collaborationmanage/collaborationbusoppmanage/CollaborativeBusinessOpportunityRelease/index.js";
export default {
  name: "BusinessReleaseTablePopup",
  components: {
    FormalOrRegsit,
    TeamQueryComponents,
    OrgChoose,
    fileUpload
  },
  props: {
    fromUid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      viewfileList: [], //--------------下载（下载）(上传与修改)
      addfileList: [], //----------------新增（浏览）(上传与修改)
      CustomerGelectionGeneralShow: false, //------------------------个人的查询弹窗
      queryName: null, //--------------------------------------------正式或者注册调用
      queryNameTrue: false, //---------------------------------------正式或者注册调用
      coordiOrgInfoVO: [], //-------------------------机构树数据（同时用于判断机构是否被改变过）
      CoordiOrgID: [], //-----------------------------回显机构的数组（判断是否改变）
      businessName: "", //----------------------------回显机构的名字
      placeholder: "正式客户与注册客户只填其一",
      bussines_ending: {
        faqiren_: this.$store.getters.userName,
        faqiren_jigou: "",
        active: 0,
        time: "",
        details: ""
      },
      public_info: {
        lianxiren_name: "",
        faqiren_name: "",
        lianxiren_tel: "",
        faqiren_tel: "",
        lianxiren_job: "",
        faqiren_job: "",
        faqiren_: "", //此处需要拿到码值进行转换
        faqiren_jigou: "", //此处需要拿到码值进行转换
        time: "",
        formal: {
          custName: "",
          custNo: "",
          custType: ""
        }, //正式客户
        registered: {
          custName: "",
          custNo: "",
          custType: ""
        } //注册客户
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
        expectedData_: "",
        Turnover: "",
        describe: "",
        proposal: ""
      },
      ResponseModeList: dictItems(DICTYPE.OSPCD0231),
      ServiceCateList: dictItems(DICTYPE.OSPCD0227),
      BusinessCateList: dictItems(DICTYPE.OSPCD0226),
      priorityList: dictItems(DICTYPE.OSPCD0229)
    };
  },

  created() {
    var date = new Date();
    var nowDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.bussines_ending.time = nowDate; //-------------------------------------------登录人时间
    //--------------------------------------------------------------------------------登录人机构
    this.bussines_ending.faqiren_jigou = dictFilter(
      DICTYPE.CTCCD0998,
      this.$store.getters.orgid
    );
    this.init_(this.fromUid);
  },
  methods: {
    init_(fromUid) {
      this.addfileList = [];
      var query = {
        param: {
          busoppId: fromUid
        }
      };
      this.handleFileList(fromUid, 2); // 下载1 修改2(上传与修改)
      EchoMyCollaboration(query)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.public_info = {
              lianxiren_name: response.Data.CustConPer,
              faqiren_name: response.Data.InitiateAlignPer,
              lianxiren_tel: response.Data.CustConPerPhone,
              faqiren_tel: response.Data.InitiateAlignPerPhone,
              lianxiren_job: response.Data.CustConPerDuty,
              faqiren_job: response.Data.InitiateAlignPerDuty,
              faqiren_: response.Data.InitiatorName,
              faqiren_jigou: response.Data.OrgFullName,
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
            };
            this.bussines_info = {
              business_name: response.Data.BusoppName,
              ResponseMode: response.Data.CoordiRespons,
              ServiceCate: response.Data.SrvCate,
              BusinessCate: response.Data.BizCate,
              priority: response.Data.Prio,
              Turnover: response.Data.ForecastMatchAmt,
              describe: response.Data.BusoppDesc,
              proposal: response.Data.RequirePropose
            };
            //--------------------------------------------------------------------------------协同机构的转换（与判断是否改变）
            if (response.Data.CoordiOrgInfoVO.length != 0) {
              var string = [];
              response.Data.CoordiOrgInfoVO.forEach(item => {
                string.push(item.OrgFullName);
                //----------------------------------------------------------------------------回显的机构id用于（判断是否改变）
                this.CoordiOrgID.push({
                  CoordiOrgId: item.CoordiOrgId
                });
              });
              this.businessName = string.toString();
            }
            //--------------------------------------------------------------------------------判断是正式客户还是注册客户
            if (response.Data.CustType != null) {
              this.public_info.formal = {
                custName: response.Data.CustName,
                custNo: response.Data.CustNo,
                custType: response.Data.CustType
              };
            } else if (response.Data.CustType == null) {
              this.public_info.registered = {
                custName: response.Data.CustName,
                custNo: response.Data.CustNo,
                custType: response.Data.CustType
              };
            }
            //-------------------------------------------------------------------------------交易日期的转换时间戳

            if (response.Data.ForecastTrdDate != null) {
              this.bussines_info.expectedData = response.Data.ForecastTrdDate;
              this.bussines_info.expectedData_ = response.Data.ForecastTrdDate;
              var ForecastTrd = new Date(this.bussines_info.expectedData);
              this.bussines_info.expectedData =
                ForecastTrd.getFullYear() +
                "-" +
                (ForecastTrd.getMonth() + 1) +
                "-" +
                ForecastTrd.getDate();
            }
            //--------------------------------------------------------------------------------发起日期的转换时间戳
            this.public_info.time = response.Data.InitiateDate;
            if (this.public_info.time != null) {
              var ForecastTrd = new Date(this.public_info.time);
              this.public_info.time =
                ForecastTrd.getFullYear() +
                "-" +
                (ForecastTrd.getMonth() + 1) +
                "-" +
                ForecastTrd.getDate();
            }
          }
        })
        .catch(() => {});
    },
    //--------------------------------------------------------------------------------------正式客户或者注册客户的弹窗
    handleIconClick(data) {
      this.queryName = data;
      this.CustomerGelectionGeneralShow = true;
      if (this.queryNameTrue) {
        this.$refs.PublicQueryComponent.queryNameInit(data);
      }
    },
    // --------------------------------------------------------------------------------------机构树
    onOrgSure(val) {
      var data = val;
      var self = this;
      data.forEach(item => {
        this.coordiOrgInfoVO.push({
          coordiOrgId: item
        });
      });
    },
    //---------------------------------------------------------------------------------------提交申请  调接口  置空表单
    newForm_edit() {
      var saveType = "2";
      this.requireTrial(saveType);
    },
    newForm_close() {
      var saveType = "3";
      this.requireTrial(saveType);
    },
    requireTrial(saveType) {
      var public_info = this.public_info;
      var bussines_info = this.bussines_info;
      var custName = "";
      var custNo = "";
      var custType = "";
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
      var usopid = this.$store.getters.uposId;
      // ------------------------------------------------------------判断回显的机构是否被改变过
      var coordiOrgInfoVO = "";
      if (this.coordiOrgInfoVO.length == 0) {
        coordiOrgInfoVO = this.CoordiOrgID;
      } else {
        coordiOrgInfoVO = this.coordiOrgInfoVO;
      }
      var info = {
        busoppId: this.fromUid,
        coordiBusoppStsAlterHVO: {
          dealPer: this.$store.getters.uposId, //this.$store.getters.uposId
          remk: this.bussines_ending.details,
          busoppId: this.fromUid,
          dealSts: ""
        },
        saveType: saveType,
        custName: custName,
        custNo: custNo,
        custType: custType,
        custConPer: public_info.lianxiren_name,
        custConPerPhone: public_info.lianxiren_tel,
        custConPerDuty: public_info.lianxiren_job,
        initiateAlignPer: public_info.faqiren_name,
        initiateAlignPerPhone: public_info.faqiren_tel,
        initiateAlignPerDuty: public_info.faqiren_job,
        busoppName: bussines_info.business_name,
        coordiRespons: bussines_info.ResponseMode,
        srvCate: bussines_info.ServiceCate,
        bizCate: bussines_info.BusinessCate,
        coordiOrgInfoVO: coordiOrgInfoVO, //bussines_info.Coordination
        prio: bussines_info.priority.toString(),
        forecastTrdDate:
          typeof bussines_info.expectedData == "string"
            ? bussines_info.expectedData_
            : bussines_info.expectedData,
        forecastMatchAmt: bussines_info.Turnover,
        busoppDesc: bussines_info.describe,
        requirePropose: bussines_info.proposal
      };
      var data = {
        param: info
      };
      releaseBusoppstate(data)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.$emit("newForma", ""); //此方法是给父组件传递关闭信号
          }
        })
        .catch(() => {
          this.$confirm("访问出错(我的协同商机审批)")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        });
    },
    // 通用客户查询组件内的确定按钮关闭搜索弹窗
    CustomerGelectionGeneralClick(data) {
      this.queryNameTrue = true;
      if (data.queryName == "正式") {
        this.public_info.formal.custName = data.custName;
        this.public_info.formal.custNo = data.custNo;
        this.public_info.formal.custType = data.custType;
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
      this.CustomerGelectionGeneralShow = false;
      this.queryNameTrue = true;
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
      console.log(id);
      this.fromUid = id;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessReleaseTablePopup {
  position: relative;
  padding-bottom: 20px;
  .bussines_ending {
    border: 1px solid #eeeee9;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 14px;
    margin-bottom: 20px;
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
  .btn {
    margin: 20px 0;
    margin-left: 40%;
  }
  .v-modal {
  }
}
</style>
