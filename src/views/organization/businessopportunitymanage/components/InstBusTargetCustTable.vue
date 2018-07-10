<template>
  <div>
    <div class="yh-queryresult-top">
      <div class="yh-fl">
        <span class="yh-queryresult-top-content">机构业务目标客户名单</span>
      </div>
      <div class="yh-fr">
        <!--<el-button size="mini" type="primary" @click="toaddinstbuscust" round>新建名单</el-button>-->
      </div>
    </div>
    <div class="sd-queryresult-middle">
      <el-table :data="list" size="mini" max-height=800>
        <el-table-column label="机构业务名称" prop="GrpName" show-overflow-tooltip>
          <!--<template slot-scope="scope">-->
          <!--<el-popover trigger="hover" placement="top">-->
          <!--<p>{{ scope.row.GrpName }}</p>-->
          <!--<div slot="reference" class="name-wrapper">-->
          <!--<el-tag size="mini">{{ scope.row.GrpName }}</el-tag>-->
          <!--</div>-->
          <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="目标客户">
          <template slot-scope="scope">
            <span v-for="(cust,index) in scope.row.CustGrpAssocVO.slice(0, 10)" :key="index">
              <el-button :key="cust.CustNo" v-if="index<9" type="text" size="small" @click="show360view(cust)">{{cust.CustBasicInfoVO?cust.CustBasicInfoVO.CustFullName:''}}</el-button>
              <el-button :key="cust.CustUuid" v-if="index>=9" type="text" size="small" @click="showMoreCustInfo(cust.GrpNo)">......</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="业务规则">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.GrpIntro }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.GrpIntro }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务简介">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.GrpDesc }}</p>
              <div style="overflow: hidden; text-overflow: ellipsis;" slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.GrpDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="营业部收入" prop="BizDeptIncomeDesc" show-overflow-tooltip>
          <!--<template slot-scope="scope">-->
          <!--<el-popover trigger="hover" placement="top">-->
          <!--<p>{{ scope.row.BizDeptIncomeDesc }}</p>-->
          <!--<div slot="reference" class="name-wrapper">-->
          <!--<el-tag size="mini">{{ scope.row.BizDeptIncomeDesc }}</el-tag>-->
          <!--</div>-->
          <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>
        <!-- <el-table-column label="业务资料" width="" align="center">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.AppendixVO" :key="index">
              <a href="javascript:void(0)" @click="fileClick(item)">{{item.GrpNo}}</a>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.PageNum"
        :page-sizes="[5, 10,15, 20]" :page-size="pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.Total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="机构业务目标客户新建" :visible.sync="dialogVisible" width="60%" @before-close="cancelSubmit('targetCustAddForm')">
        <div class="instbustarget-add-form">
          <el-form ref="targetCustAddForm" :model="targetCustAddForm.param" :rules="rules" label-width="100px" size=" mini">
            <el-row>
              <el-col :span="11">
                <el-form-item label="机构业务名称:" prop="grpName">
                  <el-input v-model="targetCustAddForm.param.grpName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="目标客户:" prop="custName">
                  <!--<el-input v-model="targetCustAddForm.param.custName" @focus="showSelectCustWindow" size="mini" suffix-icon="el-icon-search"></el-input>-->
                  <el-input v-model="targetCustAddForm.param.custName" size="mini" suffix-icon="el-icon-search"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务规则:" prop="grpIntro">
                  <el-input type="textarea" v-model="targetCustAddForm.param.grpIntro" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务简介:" prop="grpDesc">
                  <el-input type="textarea" v-model="targetCustAddForm.param.grpDesc" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="营业部收入:" prop="bizDeptIncomeDesc">
                  <el-input type="textarea" v-model="targetCustAddForm.param.bizDeptIncomeDesc" :rows="3" class="yh-textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="24">
                <el-form-item label="附件:">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" >上传到服务器</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="24">
                <div class="yh-buttons">
                  <el-button id="el-confirm" type="primary" size="small" @click="hadlerSubmit('targetCustAddForm')">
                    <i class="fa fa-check"></i>确定
                  </el-button>
                  <el-button id="el-cancel" size="small" @click="cancelSubmit('targetCustAddForm')">
                    <i class="fa fa-close"></i>取消
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="选择目标机构客户" v-if="custDialogVisible" :visible.sync="custDialogVisible" width="70%">
        <SelectTargetCustInfo @closeWindow="hideSelectCustWindow" @setHasSelectCustInfo="setHasSelectCustInfo"></SelectTargetCustInfo>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="客户明细" v-if="custdetaildlgshow" :visible.sync="custdetaildlgshow" width="70%">
        <CustDetailInfo :grpNo="custGrpNo" :showTab="currentTab" @closeWindow="closeWindow"></CustDetailInfo>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import fileUpload from "@/views/organization/resourcemanage/components/FileUpload";
  import {
    JSONArrayToString
  } from "@/utils/datahandle.js";
  import {
    dictItems
  } from "@/filters";
  import DICTYPE from "@/utils/dictTypes.js";
  import {
    SelectTargetCustInfo
  } from "@/views/organization/businessopportunitymanage/components/index.js";
  import {
    SaveInstBusTargetCust
  } from "@/api/organization/businessopportunitymanage/InstitutionalBusinessTargetCustomer/index.js";
  import CustDetailInfo from "./CustDetailInfo";

  export default {
    name: "InstBusTargetCustTable",
    components: {
      SelectTargetCustInfo,
      CustDetailInfo
    },
    data() {
      return {
        dialogVisible: false, //新增修改弹出窗
        custDialogVisible: false, //
        custdetaildlgshow: false, //客户明细窗口
        custGrpNo: "",
        targetCustAddForm: {
          param: {
            grpName: "", //机构业务名称
            custUuid: "", //目标客户
            custName: "",
            grpIntro: "", //业务规则
            grpDesc: "", //业务简介
            bizDeptIncomeDesc: "" //营业部收入
          }
        },
        rules: {
          grpName: [{
            required: true,
            message: "请输入机构业务名称",
            trigger: "blur"
          }]
        }
      };
    },
    props: {
      currentTab: {
        //当前选择的tab
        type: String
      }
    },
    components: {
      fileUpload
    },
    created() {
      //this.$emit("queryPage",this.pageInfo,true);
    },
    methods: {
      //文件点击事件 执行下载操作
      fileClick(file) {
        var url = "/osp-sysManager/appendix/downloadappendix?batchNo=" + file.BatchNo
        window.open(url);
        //取消附件焦点 ， 不再显示按delete可删除提示 和delete删除操作
        $(".el-upload-list__item").blur();
      },
      show360view(cust) {
        let custType = "per";
        if (cust.IndividualFlag == "1") {
          //机构
          custType = "org";
        }
        this.$router.push({
          path: "/CustomerManagement/FormalCustomerManagement/PanoramicView",
          query: {
            uuid: cust.CustUuid,
            custNo: cust.CustNo,
            custType: custType
          }
        });
      },
      showMoreCustInfo(grpNo) {
        this.custGrpNo = grpNo;
        this.custdetaildlgshow = true;
      },
      closeWindow() {
        this.custdetaildlgshow = false;
      },
      setHasSelectCustInfo(custInfo) {
        var names = "";
        var ids = "";
        for (var idx in custInfo) {
          ids += custInfo[idx].id + ",";
          names += custInfo[idx].custName + ",";
        }
        if (names.length > 0) {
          ids = names.substring(0, ids.length - 1);
          names = names.substring(0, names.length - 1);
        }
        this.targetCustAddForm.param.custUuid = ids;
        this.targetCustAddForm.param.custName = names;
      },

      handleEdit(index, obj) {
        this.targetCustAddForm.param = obj;
        this.dialogVisible = true;
      },

      hideSelectCustWindow() {
        this.custDialogVisible = false;
      },
      showSelectCustWindow() {
        this.custDialogVisible = true;
      },
      toaddinstbuscust() {
        this.dialogVisible = true;
        //var dicts= dictItems(DICTYPE.OSPCD0218);
        //console.info(dicts);
      },
      hadlerSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            delete this.targetCustAddForm.param.custName;

            SaveInstBusTargetCust(this.targetCustAddForm).then(response => {
              this.$message({
                type: "success",
                message: "新增成功!"
              });
              this.$emit("queryPage", this.pageInfo);
              this.dialogVisible = false;
            });
          } else {
            return false;
          }
        });
      },
      cancelSubmit(formName) {
        this.targetCustAddForm.param.custUuid = "";
        this.$refs[formName].resetFields();
        this.dialogVisible = false;
      },

      //每页数量改变
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.$emit("queryPage", this.pageInfo);
      },
      //点击页
      handleCurrentChange(val) {
        this.$emit("queryPage", this.pageInfo);
      }
    },
    props: ["manageFlag", "list", "pageInfo", "currentTab"]
  };

</script>

<style scoped>
  .hrefcnt {
    color: #2d5dff;
    text-decoration: underline;
  }

  .instbustarget-add-form .el-form-item {
    margin-bottom: 20px;
  }

  .instbustarget-add-form .el-input {
    width: 240px;
  }

  .instbustarget-add-form .el-textarea {
    width: 600px;
  }

  .yh-queryresult-top {
    height: 34px;
    border-top: 1px solid #eeeee9;
    margin-bottom: 10px;
    /*ouxinsu需要改*/
  }

  .yh-queryresult-top-content {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #cb6c2f;
    color: #333;
    font-size: 14px;
  }

  .yh-fl {
    float: left;
  }

  .yh-fr {
    float: right;
    line-height: 40px;
    height: 40px;
    margin-right: 30px;
  }

  .yh-uploader .uploader-btn {
    float: right;
  }

  .yh-applicationform-uploader {
    width: 570px;
    padding: 15px;
    margin: 0 auto;
    font-size: 14px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }

  .yh-uploader .uploader-btn {
    margin-right: 4px;
  }

  .yh-uploader .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .yh-buttons {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;
  }

  .yh-textarea-cnt {
    width: 400px;
  }

</style>
