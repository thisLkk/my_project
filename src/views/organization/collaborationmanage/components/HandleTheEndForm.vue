<template>
  <!-- 协同管理办结弹窗 -->
  <div class="yh_StateCancel">
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
          <el-col :span="9">
            <el-form-item label="商机状态:">
              <el-radio-group v-model="bussines_ending.active">
    						<el-radio :label="10">成功</el-radio>
    						<el-radio :label="98">失败</el-radio>
    						<el-radio :label="99">取消</el-radio>
  						</el-radio-group>
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
            <el-form-item label="办结说明:">
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
        <el-form v-if="bussines_info != null" label-position="center" label-width="150px" :model="bussines_info" size="mini">
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
                <el-input v-model="bussines_info.OrgFullName" disabled></el-input>
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
                <el-input v-model="bussines_info.CoordiOrg" placeholder="(暂无协同机构)" disabled></el-input>
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
               <el-upload  :on-preview="fileClick"
                    action = "osptest.com"
                    class="upload-demo yh-upload-auto yh-upload-only-show yh-360info-lu clearfix"
                    multiple :auto-upload="false" :file-list="viewfileList">
                  </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="newForm_edit()" size="mini">
        <i class="fa fa-check diologBtn"></i>处理完毕</el-button>
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
  CancelMyCollaboration,
  EchoMyCollaboration
} from "@/api/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index.js";
import { dictItems, dictFilter } from "@/filters"; //--------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------数据字典的方法
import { formatCurrency } from "@/utils/index.js"; //------------金额转换
export default {
  name: "StateCancel",
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
      showQuery: true, //----------------------------------------控制查询条件div是否显示
      //----------------------------------------------------------登录人的信息（可操作区域）
      bussines_ending: {
        faqiren_: this.$store.getters.userName,
        faqiren_jigou: "",
        active: 10,
        time: "",
        details: ""
      },
      bussines_info: null //--------------------------------------回显数据（不可在操作区域）
    };
  },
  created() {
    //------------------------------------------------------------登录人的处理时间
    var date_ = new Date();
    this.bussines_ending.time =
      date_.getFullYear() +
      "-" +
      (date_.getMonth() + 1) +
      "-" +
      date_.getDate();
    //------------------------------------------------------------登录人的机构
    this.bussines_ending.faqiren_jigou = dictFilter(
      DICTYPE.CTCCD0998,
      this.$store.getters.orgid
    );
    // -----------------------------------------------------------请求数据（只执行初次组件渲染）
    this.init_(this.fromUid);
    this.viewfileList = []; //下载（附件下载）
  },
  methods: {
    //------------------------------------------------------------组件注册后暴露给父组件方法刺激组件更新
    init_(fromUid) {
      this.handleFileList(fromUid, 1); //下载（附件下载）
      var query = {
        param: {
          busoppId: fromUid
        }
      };
      EchoMyCollaboration(query)
        .then(response => {
          //-------------------------------------------------------商机状态
          response.Data.BusoppSts = dictFilter(
            DICTYPE.OSPCD0228,
            response.Data.BusoppSts
          );
          //-------------------------------------------------------服务类别
          response.Data.SrvCate = dictFilter(
            DICTYPE.OSPCD0227,
            response.Data.SrvCate
          );
          //-------------------------------------------------------业务类别
          response.Data.BizCate = dictFilter(
            DICTYPE.OSPCD0226,
            response.Data.BizCate
          );
          //-------------------------------------------------------优先级
          response.Data.Prio = dictFilter(
            DICTYPE.OSPCD0229,
            response.Data.Prio
          );
          this.bussines_info = response.Data; //--------------------赋值需要放在数据字典转换后
          this.bussines_info.ForecastMatchAmt = formatCurrency(
            response.Data.ForecastMatchAmt
          ); //金额转换
          //-------------------------------------------------------协同机构的回显
          if (this.bussines_info.CoordiOrgInfoVO.length != 0) {
            var string = [];
            this.bussines_info.CoordiOrgInfoVO.forEach(item => {
              string.push(item.OrgFullName);
            });
            this.bussines_info.CoordiOrg = string.toString();
          }
          //-------------------------------------------------------发起日期转换（时间戳）
          if (this.bussines_info.InitiateDate != null) {
            var Initiate = new Date(this.bussines_info.InitiateDate);
            this.bussines_info.InitiateDate =
              Initiate.getFullYear() +
              "-" +
              (Initiate.getMonth() + 1) +
              "-" +
              Initiate.getDate();
          }
          //-------------------------------------------------------交易日期的转换（时间戳）
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
          // this.$confirm("访问出错(我的协同商机取消)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    //------------------------------------------------------------显示或隐藏搜索页面
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
    //------------------------------------------------------------提交申请（请求参数）
    newForm_edit() {
      var data = {
        param: {
          busoppId: this.fromUid,
          saveType: "8",
          coordiBusoppStsAlterHVO: {
            dealPer: this.$store.getters.uposId,
            remk: this.bussines_ending.details,
            busoppId: this.fromUid,
            dealSts:
              this.bussines_ending.active.toString() == "10"
                ? "00"
                : this.bussines_ending.active.toString()
          }
        }
      };
      CancelMyCollaboration(data)
        .then(response => {
          this.$emit("newForma", {});
        })
        .catch(() => {
          this.$confirm("办结失败（后期填原因提示）")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        });
    },
    //------------------------------------------------------------保存关闭
    newForm_close() {
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
.yh_StateCancel {
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
