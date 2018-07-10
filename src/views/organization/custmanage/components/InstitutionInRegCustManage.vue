<template>
  <div class="yh_InstitutionInRegCustManage">
    <div class="yh-archives clearfix">
      <div class="yh-archives-all">
        <div class="yh-archives-all-header">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <!-- <div class="yh-archives-all-header-sort">
            <a href="javascript:void(0)">企业类型</a>
          </div> -->

          <a v-if="false" href="javascript:void(0)" style="color: #B6B6B6;" @click="groupClick()">
            <i class="fa fa-group"></i>添加分组
          </a> 
          <a style="margin-left: 10px;" v-if="manageFlag == 'true'" href="javascript:void(0)" @click="registerShow = true">
            <i class="fa fa-registered" style="margin-right:5px; color: #CA6D33;"></i>新建注册客户
          </a>

          <span v-show="dialogVisible_" style="color:red;">请勾选需要添加的客户</span>
        </div>

        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <div class="yh-archives-all-main clearfix" v-for="(item, index) in topInfoList" :key="index">
            <div class="yh-check-inp fl">
              <el-checkbox :label="item.Uuid"></el-checkbox>
            </div>
            <div class="main" v-show="topInfoList.length">
              <RegisteredCustomerList :manageFlag="manageFlag" :topInfoList="item" :parentPage="parentPage" @queryPage="queryPage"></RegisteredCustomerList>
            </div>
          </div>
          <div class="yh-data" v-show="!topInfoList.length">
            暂无数据
          </div>
        </el-checkbox-group>
        <!-- 客户分组新增  弹出窗口 -->
        <div>
          <el-dialog title="客户分组新增" :visible.sync="addGroupShow" width="600px" @close="doAddGroupCancle">
            <div class="activity_dialog clearfix yh-jbxx-content ">
              <el-form :model="form_data_group" ref="form_data_group" :rules="addRules" label-width="100px" size=" mini">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="分组名称:" prop="groupName">
                      <el-input v-model="form_data_group.groupName" placeholder="" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="创建人:" prop="Establish">
                      <el-input :disabled=" true" v-model="Establish" placeholder="" size="mini"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="yh-timeinput">
                      <el-form-item label="创建时间:" prop="EstablishTime">
                        <el-date-picker :disabled=" true" format="yyyy-MM-dd" v-model="EstablishTime" type="datetime" placeholder="选择日期时间" size="mini">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分组描述:" prop="groupDetaile">
                      <el-input type="textarea" v-model="form_data_group.groupDetaile" :rows="3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="AddGroud" size="mini" id="yh-confirm">
                <i class="fa fa-check diologBtn"></i>确 定</el-button>
              <el-button @click="doAddGroupCancle" size="mini" id="yh-cancel">
                <i class="fa fa-close diologBtn"></i> 取 消</el-button>
            </span>
          </el-dialog>
        </div>

        <!-- 注册功能 -->
        <div>
          <el-dialog class="dialogApplyForRegular" title="注册" :visible.sync="registerShow" width="800px">
            <div class="activity_dialog clearfix">
              <div class="yh-jbxxx">
                <el-row>
                  <el-col :span="24">
                    <el-radio-group v-model="regType" size="mini" @change="regTypeChange">
                      <el-radio label="1" border>上市公司</el-radio>
                      <el-radio label="2" border>非上市公司</el-radio>
                      <!-- <el-radio label="3" border>个人客户</el-radio> -->
                    </el-radio-group>
                  </el-col>
                </el-row>
              </div>
              <!------------------------------上市公司-------------------------------------->

              <el-form :model="form_data_reg_listed" label-width="181px" ref="form_data_reg_listed">
                <div class="yh-jbxx-content" v-show=" regType == 1">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item class="sktCode-box" label="证券代码:">
                        <el-input placeholder="" v-model="form_data_reg_listed.param.potentialOrg.sktCode" v-on:input="sktCodeChange" class="yh-dialogbiginput"
                          size="mini" />
                        <span class="sktCode" v-show="sktCodeParamShow">请填写证券代码</span>
                        <i class="required">*</i>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="客户名称:" prop="param.custFullName">
                        <el-input placeholder="" :disabled=" true" v-model="form_data_reg_listed.param.custFullName" class="yh-dialogbiginput" size="mini"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="客户简称:" prop="param.custName">
                        <el-input placeholder="" :disabled=" true" v-model="form_data_reg_listed.param.custName" class="yh-dialoginput" size="mini"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="证件类型:" prop="param.credentials.credentialsType">
                        <el-select :disabled=" true" v-model="form_data_reg_listed.param.credentials.credentialsType" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option v-for="item in documenttypeoptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="证件代码:" prop="param.credentials.idNo">
                        <el-input :disabled=" true" placeholder="" v-model="form_data_reg_listed.param.credentials.idNo" class="yh-dialoginput" size="mini"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="万德一级行业:" prop="param.potentialOrg.windPriIndustry">
                        <el-select :disabled=" true" v-model="form_data_reg_listed.param.potentialOrg.windPriIndustry" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option v-for="item in windPriIndustry_items" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="万德二级行业:" prop="param.potentialOrg.windSndIndustry">
                        <el-select :disabled=" true" v-model="form_data_reg_listed.param.potentialOrg.windSndIndustry" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option v-for="item in items_windSndIndustry_all" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="证监会行业分类(大):" prop="param.potentialOrg.csrcIndustryCatalog">
                        <el-select :disabled=" true" v-model="form_data_reg_listed.param.potentialOrg.csrcIndustryCatalog" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option v-for="item in items_csrcIndustryCatalog" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>

                    <el-col :span="12">
                      <el-form-item label="证监会行业分类(中):" prop="param.potentialOrg.csrcIndustryMidClass">
                        <el-select :disabled=" true" v-model="form_data_reg_listed.param.potentialOrg.csrcIndustryMidClass" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option v-for="item in items_csrcIndustryMidClass_all" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="重要程度:" prop="impDegree">
                        <el-select v-model="form_data_reg_listed.param.impDegree" placeholder="请选择" class="yh-dialogselect" size="mini">
                          <el-option key="" label="请选择" value=""></el-option>
                          <el-option v-for="item in zycd_items" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <!------------------------------------非上市公司------------------------------------------>

              <el-form :model="form_data_reg_unListed" label-width="181px" ref="form_data_reg_unListed">
                <div class="yh-jbxx-content" v-show="regType == 2">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item class="prompt-text-box" label="客户名称:" prop="custFullName">
                        <el-input placeholder="" v-model="form_data_reg_unListed.param.custFullName" class="yh-dialogbiginput" size="mini" />
                        <span class="prompt-text" v-show="unlistedParamArr.custFullName">请输入客户名称</span>
                        <i class="required">*</i>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="客户简称:" prop="param.custName">
                        <el-input placeholder="" v-model="form_data_reg_unListed.param.custName" class="yh-dialoginput" size="mini" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="证件类型:" prop="credentialsType">
                        <el-select v-model="form_data_reg_unListed.param.credentials.credentialsType" placeholder="请选择" class="yh-dialogselect" size="mini">
                          <el-option v-for="item in documenttypeoptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="prompt-text-box" label="证件代码:" prop="idNo">
                        <el-input placeholder="" v-model="form_data_reg_unListed.param.credentials.idNo" class="yh-dialoginput" size="mini" />
                        <span class="prompt-text"  v-show="unlistedParamArr.idNo">请输入证件代码</span>
                        <i class="required">*</i>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="万德一级行业:" prop="param.potentialOrg.windPriIndustry">
                        <el-select v-model="form_data_reg_unListed.param.potentialOrg.windPriIndustry" placeholder="请选择" class="yh-dialogselect" @change="windPriIndustryChange"
                          size="mini">
                          <el-option key="" label="请选择" value=""></el-option>
                          <el-option v-for="item in windPriIndustry_items" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="万德二级行业:" prop="param.potentialOrg.windSndIndustry">
                        <el-select v-model="form_data_reg_unListed.param.potentialOrg.windSndIndustry" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option key="" label="请选择" value=""></el-option>
                          <el-option v-for="item in items_windSndIndustry" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="证监会行业分类(大):" prop="param.potentialOrg.csrcIndustryCatalog">
                        <el-select v-model="form_data_reg_unListed.param.potentialOrg.csrcIndustryCatalog" placeholder="请选择" class="yh-dialogselect" @change="csrcIndustryCatalogChange"
                          size="mini">
                          <el-option key="" label="请选择" value=""></el-option>
                          <el-option v-for="item in items_csrcIndustryCatalog" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="证监会行业分类(中):" prop="param.potentialOrg.csrcIndustryMidClass">
                        <el-select v-model="form_data_reg_unListed.param.potentialOrg.csrcIndustryMidClass" placeholder="请选择" class="yh-dialogselect"
                          size="mini">
                          <el-option key="" label="请选择" value=""></el-option>
                          <el-option v-for="item in items_csrcIndustryMidClass" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="重要程度:" prop="param.impDegree">
                        <el-select v-model="form_data_reg_unListed.param.impDegree" placeholder="请选择" class="yh-dialogselect" size="mini">
                          <el-option key="" label="请选择" value=""></el-option>
                          <el-option v-for="item in zycd_items" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="doRegCustSave" size="mini" id="yh-confirm">
                <i class="fa fa-check diologBtn"></i>确 定</el-button>
              <el-button @click="doCloseRegDialog" size="mini" id="yh-cancel">
                <i class="fa fa-close diologBtn"></i> 取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RegisteredCustomerList from "@/views/organization/custmanage/components/RegisteredCustomerList";
  import {
    ctcLabelManager
  } from "@/api/organization/custmanage/formalcustmanage/FormalCustomerManage/index.js";
  import {
    getInfoBySktCood,
    regCustManageReg
  } from "@/api/organization/custmanage/regcustmanage/RegCustManage/index.js";
  import {
    JSONValue2JSON
  } from "@/utils/datahandle.js";

  import DICTYPE from "@/utils/dictTypes.js";
  import { dictFilter,dictItems,treeDictItems } from "@/filters";

  export default {
    components: {
      RegisteredCustomerList
    },
    name: "InstitutionInRegCustManage",
    data() {
      return {
        addRules: {
          groupName: [
          {
            required: true,
            message: "请输入分组名称",
            trigger: "blur"
            
          },
          { 
            max: 128, 
            message: '最大长度128个字符', 
            trigger: 'blur' }
          ],
        },
        manageFlagT: false,
        regType: "1", //注册客户类型  1:上市公司；2:非上市公司
        registerShow: false, //注册是否显示
        checkAll: false, //判断全选
        checkedCities: [], //判断全选
        cities: [], //判断全选
        isIndeterminate: true, //判断全选
        UUid: [], //添加分组要的id

        dialogVisible_: false, //添加分组的窗口提示
        addGroupShow: false,

        Establish: this.$store.getters.userName, //创建人
        EstablishTime: new Date(), //创建时间
        form_data_group: {
          groupName: "", //分组新增
          groupDetaile: "" //分组描述
        },
        //根据证券代码获取证券信息
        form_data_stkInfo: {
          pageInfo: {
            pageNum: 3,
            pageSize: 3,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: "", //证券代码

          between: {}
        },
        //上市公司保存
        form_data_reg_listed: {
          sysCode: " ",
          token: "",
          transitionId: "",
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            orderBy: "",
            pages: 1
          },
          param: {
            uuid: "", //uuid
            custFullName: "", //客户名称
            custName: "", //客户简称
            impDegree: dictItems(DICTYPE.CTCCD0213)[0].value || '', //重要程度
            potentialOrg: {
              windPriIndustry: "", //万德一级行业
              windSndIndustry: "", //万德二级行业
              csrcIndustryCatalog: "", //证监会分类大
              csrcIndustryMidClass: "", //证监会分类中
              sktCode: "", //证券代码
            },
            credentials: {
              credentialsType: "", //证件类型
              idNo: "" //证件号码
            }
          }
        },
        //非上市公司保存

        form_data_reg_unListed: {
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            orderBy: "",
            pages: 1
          },
          param: {
            custFullName: "", //客户名称
            custName: "", //客户简称
            impDegree: '', //重要程度
            potentialOrg: {
              windPriIndustry: "", //万德一级行业
              windSndIndustry: '', //万德二级行业
              csrcIndustryCatalog:  '', //证监会分类大
              csrcIndustryMidClass:  '', //证监会分类中
            },
            credentials: {
              credentialsType: dictItems(DICTYPE.EDW10031)[0].value || '', //证件类型
              idNo: "" //证件号码
            }
          }
        },
        //证件类型
        documenttypeoptions: dictItems(DICTYPE.EDW10031),

        //一级行业
        windPriIndustry_items: dictItems(DICTYPE.CTCCD0232),

        //二级行业 ljz
        items_windSndIndustry: dictItems(DICTYPE.CTCCD0233),



        //二级行业全部值  用于上市公司信息反显
        items_windSndIndustry_all: dictItems(DICTYPE.CTCCD0233),


        //证监会分类大
        items_csrcIndustryCatalog: dictItems(DICTYPE.CTCCD0234),


        //证监会分类中
        items_csrcIndustryMidClass: dictItems(DICTYPE.CTCCD0235),

        //证监会分类中全部值  用于上市公司信息反显
        items_csrcIndustryMidClass_all: dictItems(DICTYPE.CTCCD0235),

        zycd_items: dictItems(DICTYPE.CTCCD0213),

        proData: [{
            info: "个人客户",
            logo: require("../../../../assets/organization/customermanage/logo.png")
          },

          {
            info: "机构组织",
            logo: require("../../../../assets/organization/customermanage/logo.png")
          },

          {
            info: "个人客户",
            logo: require("../../../../assets/organization/customermanage/logo.png")
          },

          {
            info: "个人客户",
            logo: require("../../../../assets/organization/customermanage/logo.png")
          }
        ],
        selectArr: [],
        checked: false,
        sktCodeParamShow: false, // 证券代码提示是否显示
        unlistedParamArr:{custFullName: false, idNo: false}
      };
    },
    watch: {
      topInfoList(newlist, oldlist) {
        this.$props.topInfoList.forEach(item => {
          //------------------------------------------------------------------------回显证件号码数据字典转换
          this.cities.push(item.Uuid); //---------------------------------------------全选赋值
        });
      }
    },
    
    created() {
      //console.log(this.$props.topInfoList)
      if (this.$props.topInfoList != null) {
        this.topInfoList.forEach(item => {
          //给全选赋值
          this.cities.push(item.Uuid);
        });
      }
    },

    mounted () {
    },

    methods: {
      //一级行业联动二级行业
      windPriIndustryChange(){
        this.form_data_reg_unListed.param.potentialOrg.windSndIndustry = '';
        let docName = DICTYPE.CTCCD0232+'-'+this.form_data_reg_unListed.param.potentialOrg.windPriIndustry;
        //alert('###'+docName);
        this.items_windSndIndustry = treeDictItems(docName);
      },
      //证监会分类联动
      csrcIndustryCatalogChange(){
        this.form_data_reg_unListed.param.potentialOrg.csrcIndustryMidClass = '';
        let docName = DICTYPE.CTCCD0234+'-'+this.form_data_reg_unListed.param.potentialOrg.csrcIndustryCatalog;
        this.items_csrcIndustryMidClass = treeDictItems(docName);
      },

      handleCheckAllChange(val) {
        //判断全选
        this.dialogVisible_ = false; //判断是否显示提示
        if (val) {
          this.UUid = this.cities; //全选赋值
        } else {
          //alert("###3");
          this.UUid = [];
        }
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },

      handleCheckedCitiesChange(value) {
        //每一个列表变化拿到UUID
        this.UUid = value;
        this.dialogVisible_ = false;
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cities.length;
      },

      groupClick() {
        //添加分组的判断是否可以展开

        // alert("==="+this.UUid);

        if (this.UUid.length > 0) {
          this.addGroupShow = true;
        } else {
          this.dialogVisible_ = true; //判断是否显示提示
        }
      },

      queryPage() {
        //刷新列表
        this.$emit("queryPage");
      },

      AddGroud() {
        this.$refs['form_data_group'].validate((valid) => {  
          if (valid) {
            
          //添加分组请求参数
          const data = {
            param: {
              grpName: this.form_data_group.groupName,
              grpLvl: "1",
              grpDesc: this.form_data_group.groupDetaile,
              custGrpAssocVO: []
            }
          };

          this.UUid.forEach(item => {
            data.param.custGrpAssocVO.push({
              custUuid: item
            });
          });

          ctcLabelManager(data)
            .then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.doAddGroupCancle();
            })
            .catch(() => {
              this.$message.error('添加失败！');
            });
          this.handleCheckAllChange(false);
          this.checkAll = false;
          //this.$emit("CtcLabelManagerGroud", data);
        }})
      },

      doAddGroupCancle(){
        this.addGroupShow = false;
        this.$refs.form_data_group.resetFields();
      },

      //注册客户类型改变
      regTypeChange() {
        if (this.regType == 3) {
          //跳转至零售个人客户潜在客户注册界面
          this.$router.push({
            path: "/CustomerManagement/RegisteredCustomerManagement/RegCustQuery"
          });
        }
      },

      //证券代码改变  去获取证券信息
      sktCodeChange() {
        if (this.form_data_reg_listed.param.potentialOrg.sktCode.length >= 6 && this.checkSktCode()) {
          this.form_data_stkInfo.param = this.form_data_reg_listed.param.potentialOrg.sktCode;
          getInfoBySktCood(this.form_data_stkInfo)
            .then(response => {
              if (null != response.Data) {
                //根据ID得到数据后 进行JSON转换，把父JSON中的数据 录入给子JSON
                JSONValue2JSON(this.form_data_reg_listed.param, response.Data);
                //身份证信息 单独转换
                this.form_data_reg_listed.param.credentials.credentialsType =
                  response.Data.CredentialsType;
                this.form_data_reg_listed.param.credentials.IdNo =
                  response.Data.IdNo;
              }
            })
            .catch(() => {
              //alert("访问出错");
            });
          // alert("证券代码改变！"+this.form_data_reg_listed.param.sktCode);
        }
      },

      doRegCustSave() {
        //注册客户保存
        if (this.regType == '1') {
          if (this.checkSktCode()) {
            //上市公示保存
            regCustManageReg(this.form_data_reg_listed)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                this.doCloseRegDialog();
                this.queryPage();
              })
              .catch(() => {
                //alert("访问出错");
              });
          }
        } else {
          if (this.unlistedFromCheck()) {
            regCustManageReg(this.form_data_reg_unListed)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                this.doCloseRegDialog();
                this.queryPage();
              })
              .catch(() => {
                //alert("访问出错");
              });
            }
          }
      },

      doCloseRegDialog() {
        this.registerShow = false;
        this.$refs["form_data_reg_listed"].resetFields();
        this.$refs["form_data_reg_unListed"].resetFields();
      },

      /**
       * 校验上市公司弹窗内容
       */
      checkSktCode() {
        let sktCode = this.form_data_reg_listed.param.potentialOrg.sktCode || '';
        if (!sktCode || !sktCode.replace(/\s/g, '')) {
          this.sktCodeParamShow = true;
          return false;
        } else {
          this.sktCodeParamShow = false;
          return true;
        }
      },

      /**
       * 校验非上市公司弹窗提交内容
       */
      unlistedFromCheck() {
        let custFullName = this.form_data_reg_unListed.param.custFullName.replace(/\s/g, '');
        let unlistedParamArr = this.unlistedParamArr;
        let idNo = this.form_data_reg_unListed.param.credentials.idNo.replace(/\s/g, '');
        let type = 0;
        if (!custFullName) {
          unlistedParamArr.custFullName = true;
          type = type + 1;
        } else {
          unlistedParamArr.custFullName = false;
        };
        if (!idNo) {
          unlistedParamArr.idNo = true;
          type = type + 1;
        } else {
          unlistedParamArr.idNo = false;
        }
        if (type > 0) {
          return false;
        }
        return true;
      }
    },
    props:['topInfoList','parentPage','manageFlag'],
  };

</script>
<style lang="scss" scoped>
  .yh_InstitutionInRegCustManage {
    /* height: 100%; */
  }

  .yh-data {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    color: #999;
    margin-top: 12px;
  }

  .yh-archives {
    /*height: 120px;*/
    box-sizing: border-box;
  }

  /*信息总区域*/

  .yh-archives-all {
    width: 100%;
  }

  /* 客户操作选择区域 */

  .yh-archives-all-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px dashed #eeeeee;
    border-top: 1px solid #ebeef5;
  }

  .yh-archives-all-header label input {
    margin-right: 6px;
  }

  .yh-archives-all-header label {
    display: inline-block;
    height: 100%;
    width: 60px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .yh-archives-all-header-sort {
    display: inline-block;
    width: 120px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    background: #b3844e;
    margin-right: 10px;
  }

  .yh-archives-all-header-sort a {
    color: #ffffff;
  }

  .yh-register,
  .yh-edit-delete,
  .yh-sqzz,
  .yh-addgroup {
    position: relative;
    display: inline-block;
    width: 115px;
    height: 47px;
    line-height: 25px;
    text-align: center;
    color: blue;
  }

  .yh-register i {
    position: absolute;
    font-size: 22px;
    left: 10px;
    top: 2px;
  }

  .yh-edit-delete i {
    position: absolute;
    font-size: 20px;
    left: 18px;
    top: 0px;
  }

  .yh-sqzz i {
    position: absolute;
    font-size: 20px;
    left: 0px;
    top: 0px;
  }

  .yh-addgroup i {
    position: absolute;
    font-size: 20px;
    left: 5px;
    top: 1px;
  }

  .yh-add-labels {
    color: #999999;
  }

  .yh-edit-delete,
  .yh-sqzz,
  .yh-addgroup {
    color: #999999;
    height: 100px;
  }

  /* 客户信息展示区域 */

  .yh-check-inp {
    width: 1%;
    min-height: 120px;
    padding-left: 11px;
    padding-top: 37px;
    border:red solid 0px;
  }

  .yh-check-inp input {
    margin-left: 6px;
    margin-top: 50px;
  }

  .yh-archives-all-main {
    width: 100%;
    min-height: 120px;
    background:#FFF;
  }

  .main {
    float: left;
  }

  .yh-archives .yh-archives-institution {
    width: 78px;
    height: 120px;
    position: relative;
  }

  .yh-archives .yh-archives-institution .yh-institution-img {
    position: absolute;
    top: 15%;
    left: 0%;
    width: 56px;
  }

  .yh-archives .yh-archives-institution .yh-institution-img img {
    display: block;
    height: 50px;
    width: 50px;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  .yh-archives .yh-archives-institution .yh-institution-img .yh-institution-name {
    font-size: 10px;
    text-align: center;
    color: #999999;
    width: 100%;
    height: 20px;
    overflow: hidden;
  }

  /* 主要数据位置 */

  .yh-archives .yh-archives-main {
    width: 91%;
    height: 120px;
    box-sizing: border-box;
    padding: 10px 0;
  }

  /* 主要数据个人信息区 */

  .yh-archives .yh-archives-main .yh-main-info {
    width: 100%;
    max-height: 30px;
    overflow: hidden;
  }

  .yh-archives .yh-archives-main .yh-main-info .yh-main-info-self {
    max-width: 86%;
    box-sizing: border-box;
  }

  .yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li {
    float: left;
    padding: 0 10px;
    font-size: 13px;
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border-left: 1px solid #999999;
  }

  .yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li {
    float: left;
    padding: 0 10px;
    font-size: 13px;
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border-left: 1px solid #999999;
  }

  .yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li.name {
    margin-top: 0;
    font-size: 16px;
    color: #374b91;
    line-height: 20px;
    font-weight: bold;
    border: none;
  }

  .yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li.number {
    border: none;
  }

  .yh-main-info-add {
    max-width: 30%;
    padding-right: 20px;
    font-size: 13px;
  }

  .yh-main-info-add a {
    display: inline-block;
    color: #676767;
    padding-left: 10px;
    height: 16px;
    line-height: 20px;
  }

  .yh-main-info-add ul li {
    float: left;
    padding: 0 10px;
    font-size: 13px;
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border-left: 1px solid #999999;
  }

  /* 客户联系区域 */

  .yh-main-tel {
    width: 100%;
    padding: 10px 0;
    max-height: 50px;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 23px;
  }

  .yh-main-tel ul li {
    float: left;
    font-size: 13px;
    box-sizing: border-box;
    height: 14px;
    line-height: 14px;
    padding: 0 10px;
    border-left: 1px solid #666;
  }

  .yh-main-tel ul li:nth-child(1) {
    border: none;
  }

  /* 部门区域 */

  .yh-main-department {
    width: 100%;
    height: 20px;
    overflow: hidden;
    font-size: 12px;
    color: #444;
    margin-top: 15px;
  }

  .yh-main-department .department {
    max-width: 62%;
    height: 20px;
    overflow: hidden;
    font-size: 13px;
  }

  .yh-main-department .department h6 {
    display: inline-block;
    padding-left: 10px;
    color: #e7a04e;
  }

  .yh-main-department .department span {
    padding: 0 5px;
  }

  .yh-main-department .contact {
    max-width: 40%;
    color: #919191;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .yh-main-department .contact span {
    padding: 0 10px;
  }

  .yh-main-department .contact .date p {
    float: right;
  }

  .yh-main-department .contact p {
    margin-top: 5px;
  }

  .yh-main-department .contact .count {
    color: red;
    font-weight: bold;
  }

  .yh-main-department .contact .nowdate {
    margin-right: 8px;
    padding-right: 8px;
    border-right: 1px solid #444;
  }

  .yh-main-department .contact .mode a {
    color: #444;
    height: 15px;
    display: inline-block;
    padding: 0 8px;
    border-right: 1px solid #444;
    padding-left: 20px;
  }

  .yh-main-department .contact .mode p a:nth-child(1),
  .yh-main-department .contact .mode p a:nth-child(2),
  .yh-main-department .contact .mode p a:nth-child(3) {
    background: url(../../../../assets/organization/customermanage/logo.png) no-repeat left bottom;
    background-size: 15px 12px;
  }

  .yh-main-department .contact .mode p a:nth-child(4) {
    border-right: none;
    background: url(../../../../assets/organization/customermanage/logo.png) no-repeat left bottom;
    background-size: 15px 12px;
  }

  .fa-group {
    padding-right: 10px;
  }

  .yh-jbxx-content {
    padding-top: 23px;
    .el-form-item__content{
      position: relative;
    }
    .sktCode-box, .prompt-text-box{
      .sktCode, .prompt-text{
        position: absolute;
        font-size: 14px;
        color: red;
        bottom: -22px;
      }
      .required{
        position: absolute;
        top: 0;
        left: -77px;
        color: red;
      }
    }
  }

</style>
