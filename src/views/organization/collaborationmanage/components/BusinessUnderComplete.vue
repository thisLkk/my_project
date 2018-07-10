<template>
  <!-- 协同管理 _ 我的协同商机承办方 _ 处理弹窗 -->
  <div class="yh_BusinessUnderComplete">
    <!-- <a style="color: blue;position: absolute;right: 24px;top: 300px;z-index:1000;" href="/#/ResourceManage/KnowledgeBaseManagement/KnowledgeBaseManagement">去知识库...</a> -->
    <div class="bussines_ending">
      <h3>协同商机完毕</h3>
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
          <el-col :span="12">
            <el-form-item label="商机状态:">
              <el-radio-group v-model="bussines_ending.active">
                <el-radio :label="10">成功</el-radio>
                <el-radio :label="20">失败</el-radio>
                <el-radio :label="30">取消</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="处理时间:">
              <el-input v-model="bussines_ending.time" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="说明:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="" v-model="bussines_ending.details">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bussines_info">
      <h3 class="clearfix">协同商机信息
        <div class="showDetails" @click="showQuery_()">
          <i :class="icon"></i>
        </div>
      </h3>
      <div class="showQuery" :class="!showQuery ? 'active' : ''">
        <el-form label-position="center" label-width="150px" :model="bussines_info" size="mini">
          <el-row>
            <el-col v-if="bussines_info.CustType !=''" :span="9">
              <el-form-item label="正式客户:">
                <el-input v-model="bussines_info.CustName" disabled>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="bussines_info.CustType ==''" :span="9">
              <el-form-item label="注册客户:">
                <el-input v-model="bussines_info.CustName" disabled>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="客户联系人:">
                <el-input v-model="bussines_info.CustConPer" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="发起对接人:">
                <el-input v-model="bussines_info.InitiateAlignPer" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="客户联系人电话:">
                <el-input v-model="bussines_info.CustConPerPhone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="发起对接人电话:">
                <el-input v-model="bussines_info.InitiateAlignPerPhone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="客户联系人职务:">
                <el-input v-model="bussines_info.CustConPerDuty" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="发起对接人职务:">
                <el-input v-model="bussines_info.InitiateAlignPerDuty" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="发起人:">
                <el-input v-model="bussines_info.InitiatorName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="发起人机构:">
                <el-input v-model="bussines_info.InitiatorOrg" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="发起日期:">
                <el-input v-model="bussines_info.InitiateDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="协同商机名称:">
                <el-input v-model="bussines_info.BusoppName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="协同商机状态:">
                <el-input v-model="bussines_info.BusoppSts" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="服务类别:">
                <el-input v-model="bussines_info.SrvCate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="业务类别:">
                <el-input v-model="bussines_info.BizCate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="协同机构:">
                <el-input v-model="bussines_info.CoordiOrg" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="优先级:">
                <el-input v-model="bussines_info.Prio" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="预计交易日期:">
                <el-input v-model="bussines_info.ForecastTrdDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="3">
              <el-form-item label="预计成交金额(万元):">
                <el-input v-model="bussines_info.ForecastMatchAmt" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="协同商机描述:">
                <el-input type="textarea" disabled :autosize="{ minRows: 2, maxRows: 2}" placeholder="无" v-model="bussines_info.BusoppDesc">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="协同需求描述:">
                <el-input type="textarea" disabled :autosize="{ minRows: 2, maxRows: 2}" placeholder="无" v-model="bussines_info.RequirePropose">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="上传需求报告:">
                <el-upload v-if="viewfileList.length!=0" :on-preview="fileClick" action="osptest.com" class="upload-demo yh-upload-auto yh-upload-only-show yh-360info-lu clearfix"
                  multiple :auto-upload="false" :file-list="viewfileList">
                </el-upload>
                <span v-else style="color:#999999;">暂无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="newForm_edit()" size="mini">
        <i class="fa fa-check diologBtn"></i>确定</el-button>
      <el-button @click="newForm_close()" size="mini">
        <i class="fa fa-close diologBtn"></i> 取消</el-button>
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
import {
  UnderAnswerEdit,
  UnderAnswerList
} from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import { dictItems, dictFilter } from "@/filters"; //------------------------------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //-------------------------------------------------------------数据字典的方法
import OrgChoose from "@/views/organization/components/OrgChoose.vue";
export default {
  name: "BusinessUnderComplete",
  props: {
    fromUid: {
      type: String,
      default: ""
    }
  },
  components: {
    fileUpload
  },
  data() {
    return {
      viewfileList: [], //--------------下载（下载）
      addfileList: [], //----------------新增（浏览）
      icon: "fa fa-angle-double-up",
      showQuery: true, //--------------------------------------控制查询条件div是否显示
      CustomerGelectionGeneralShow: false, //------------------个人的查询弹窗
      queryNameTrue: false, //---------------------------------正式或者注册调用
      fromUid_: null, //---------------------------------------fromUid_保存值
      bussines_ending: {
        faqiren_: this.$store.getters.userName,
        faqiren_jigou: "",
        active: 10,
        time: "",
        details: "",
        personnel: ""
      },
      bussines_info: null //回显数据
    };
  },
  created() {
    //---------------------------------------------------------处理时间（可操作）
    var date_ = new Date();
    this.bussines_ending.time =
      date_.getFullYear() +
      "-" +
      (date_.getMonth() + 1) +
      "-" +
      date_.getDate();
    //----------------------------------------------------------登录人的机构
    this.bussines_ending.faqiren_jigou = dictFilter(
      DICTYPE.CTCCD0998,
      this.$store.getters.orgid
    );
    // ----------------------------------------------------------初次（数据）
    this.init_(this.fromUid);
    this.fromUid_ = this.fromUid; //-----------------------------保存点击的fromUid
    this.viewfileList = []; //下载（附件下载）
  },
  methods: {
    init_(data) {
    this.handleFileList(data, 1); //下载（附件下载）
      var query = {
        param: {
          busoppId: data
        }
      };
      UnderAnswerList(query)
        .then(response => {
          //---------------------------------------------------商机状态
          response.Data.BusoppSts = dictFilter(
            DICTYPE.OSPCD0228,
            response.Data.BusoppSts
          );
          //--------------------------------------------------服务类别
          response.Data.SrvCate = dictFilter(
            DICTYPE.OSPCD0227,
            response.Data.SrvCate
          );
          //-------------------------------------------------业务类别
          response.Data.BizCate = dictFilter(
            DICTYPE.OSPCD0226,
            response.Data.BizCate
          );
          //-------------------------------------------------优先级
          response.Data.Prio = dictFilter(
            DICTYPE.OSPCD0229,
            response.Data.Prio
          );
          this.bussines_info = response.Data;

          //-------------------------------------------------协同机构的转换CoordiOrg
          if (this.bussines_info.CoordiOrgInfoVO.length != 0) {
            var string = [];
            this.bussines_info.CoordiOrgInfoVO.forEach(item => {
              string.push(item.OrgFullName);
            });
            this.bussines_info.CoordiOrg = string.toString();
          }
          //--------------------------------------------发起日期的转换时间戳
          if (this.bussines_info.InitiateDate != null) {
            var Initiate = new Date(this.bussines_info.InitiateDate);
            this.bussines_info.InitiateDate =
              Initiate.getFullYear() +
              "-" +
              (Initiate.getMonth() + 1) +
              "-" +
              Initiate.getDate();
          }
          //--------------------------------------------交易日期的转换时间戳
          if (this.bussines_info.ForecastTrdDate != null) {
            var ForecastTrd = new Date(this.bussines_info.ForecastTrdDate);
            this.bussines_info.ForecastTrdDate =
              ForecastTrd.getFullYear() +
              "-" +
              (ForecastTrd.getMonth() + 1) +
              "-" +
              ForecastTrd.getDate();
          }
        })
        .catch(() => {
          // this.$confirm("访问出错(我的承办方处理登记)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    showQuery_() {
      //--------------------------------------------------------------------------------显示或隐藏搜索页面
      if (this.showQuery) {
        this.showQuery = false;
        this.icon = "fa fa-angle-double-down";
        return;
      } else {
        this.icon = "fa fa-angle-double-up";
        this.showQuery = true;
      }
    },
    newForm_edit() {
      //---------------------------------------------------------------------------------提交申请  调接口  置空表单
      var data = {
        param: {
          busoppId: this.fromUid,
          saveType: "8",
          coordiBusoppStsAlterHVO: {
            dealPer: this.$store.getters.uposId, // this.$store.getters.uposId
            remk: this.bussines_ending.details,
            busoppId: this.fromUid,
            dealSts:
              this.bussines_ending.active.toString() == "10"
                ? "00"
                : this.bussines_ending.active.toString() == "20" ? "98" : "99"
          }
        }
      };
      UnderAnswerEdit(data)
        .then(response => {
          this.$emit("newForma", {});
        })
        .catch(() => {
          // this.$confirm("访问出错(我的承办方处理登记)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    newForm_close() {
      //--------------------------------------------------------------------------------保存关闭 临时保存
      this.$emit("newForma", {});
    },
    //文件点击事件 执行下载操作（附件下载）
    fileClick(file) {
      var url =
        "/osp-sysManager/appendix/downloadappendix?batchNo=" + file.BatchNo;
      window.open(url);
      //取消附件焦点 ， 不再显示按delete可删除提示 和delete删除操作
      $(".el-upload-list__item").blur();
    },
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
            } else if ((add = 2)) {
              this.addfileList.push(file);
            }
          }
        }
      });
    },
    //附件的下载（附件）
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
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessUnderComplete {
  position: relative;
  padding-bottom: 20px;
  .bussines_ending {
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
      .showDetails {
        float: right;
        display: inline-block;
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
  .btn {
    margin: 20px 0;
    margin-left: 38%;
  }
}
</style>
