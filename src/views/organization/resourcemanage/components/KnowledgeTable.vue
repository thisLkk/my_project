<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_KnowledgeTable">
    <div class="KnowledgeTable_title clearfix">
      <h3 class="fl">知识库</h3>
      <div class="el_btn fr" v-if="manageFlag" >
        <el-button size="mini" type="warning" round @click="new_dialog">新建</el-button>
      </div>
    </div>
    <div class="main_table">
      <el-table :data="list" stripe size="mini" max-height=800 style="width: 100%">
        <el-table-column label="名称" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.KnlgName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini"> <a href="javascript:void(0)" @click="business_(scope.row)">
                  {{ scope.row.KnlgName }}</a></el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="知识类别" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ buopKnlgCateFormatter(scope.row.BuopKnlgCate) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{buopKnlgCateFormatter(scope.row.BuopKnlgCate)}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务类别" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ bizCateFormatter(scope.row.BizCate) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{bizCateFormatter(scope.row.BizCate)}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务部门" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ companyDepFormatter(scope.row.CompanyDep) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ companyDepFormatter(scope.row.CompanyDep) }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="知识简介" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BizKnlgIntro }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.BizKnlgIntro }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="对接人" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.AlignPer }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.AlignPer }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="座机号" width="110" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.PhoneNo }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.PhoneNo }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务资料" width="" align="center">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.AppendixVO" :key="index">
              <a href="javascript:void(0)" @click="fileClick(item)">{{item.AppendixName}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center"  v-if="manageFlag">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.ResrId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.PageNum" :page-sizes="[5, 10,15, 20]"
        :page-size="pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.Total">
      </el-pagination>
    </div>
    <!---------------------------------- 知识库新建 ---------------------------------------->
    <div class="dialog_">
      <el-dialog @close="doCancle" title="知识库新增" id="dialog_add" :visible.sync="addShow"  v-if="addShow" width="800px">
        <div class="activity_dialog clearfix yh-jbxx-content ">
          <el-form  :rules="addRules"  :model="form_data_add.param" ref="form_data_add" label-width="100px" size=" mini">
            <el-row>
              <el-col :span="12">
                <el-form-item label="知识类别:" prop="buopKnlgCate">
                    <el-select @change="buopKnlgCateChange()" v-model="form_data_add.param.buopKnlgCate" placeholder="请选择" class="yh-dialogselect" size="mini">
                      <el-option v-for="item in items_zslb" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务部门:" prop="companyDep">
                    <el-select v-model="form_data_add.param.companyDep" placeholder="请选择" class="yh-dialogselect" size="mini">
                      <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务类别:" prop="bizCate">
                    <el-select v-model="form_data_add.param.bizCate" placeholder="请选择" class="yh-dialogselect" size="mini">
                      <el-option v-for="item in items_ywlb" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维护人员:" prop="preservePer">
                    <el-input :disabled="true" v-model="form_data_add.param.preservePer" placeholder="" size="mini"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称:" prop="knlgName">
                    <el-input v-model="form_data_add.param.knlgName" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维护时间:" prop="preserveTime">
                    <el-date-picker :disabled="true"
                        v-model="form_data_add.param.preserveTime"
                        type="date" size="mini" value-format="timestamp"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="对接人:" prop="alignPer">
                    <el-input v-model="form_data_add.param.alignPer" placeholder="" size="mini"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="对接人职务:" prop="alignPerDuty">
                    <el-input v-model="form_data_add.param.alignPerDuty" placeholder="" size="mini"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="座机号:" prop="phoneNo">
                    <el-input v-model="form_data_add.param.phoneNo" placeholder="" size="mini"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="手机号:" prop="mobNo">
                    <el-input v-model="form_data_add.param.mobNo" placeholder="" size="mini"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="yh-timeinput">
                  <el-form-item label="联系邮箱:" prop="contactEmail">
                    <el-input v-model="form_data_add.param.contactEmail" placeholder="" size="mini"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="知识简介:" prop="bizKnlgIntro">
                  <el-input type="textarea" v-model="form_data_add.param.bizKnlgIntro" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务资料:" prop="">
                
                <fileUpload :relId="form_data_add.param.resrId" :addfileList="addfileList" @setId="setId"></fileUpload>


                <!-- <el-upload
                      class="upload-demo yh-upload-auto"
                      :action="uploadUrl()"
                      multiple
                      :on-preview="fileClick"
                      :headers="uploadHead()"
                      :on-success = 'handleSuccess'
                      :file-list="addfileList"
                      :on-remove = "handleRemove"
                      :limit="3">
                      <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">附件修改立即生效，无需保存！</div>
                  </el-upload> -->


                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="doSave" size="mini" id="yh-confirm">
                <i class="fa fa-check diologBtn"></i>确 定</el-button>
              <el-button @click="doCancle" size="mini" id="yh-cancel">
                <i class="fa fa-close diologBtn"></i> 取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!------------------------------------ 知识库详情 ---------------------------------->
    <div class="dialog_">
      <el-dialog title="知识库详情" :visible.sync="viewShow" width="800px">
        <div class="activity_dialog clearfix yh-jbxx-content ">
          <el-form :model="form_data_view" ref="form_data_view" label-width="100px" size=" mini">
            <el-row>
              <el-col :span="12">
                <el-form-item label="知识类别:" prop="BuopKnlgCate">
                    {{buopKnlgCateFormatter(form_data_view.BuopKnlgCate)}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务部门:" prop="CompanyDep">
                    {{companyDepFormatter(form_data_view.CompanyDep)}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务类别:" prop="BizCate">
                    {{ bizCateFormatter(form_data_view.BizCate) }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维护人员:" prop="PreservePer">
                    {{form_data_view.PreservePer}}
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称:" prop="KnlgName">
                    {{form_data_view.KnlgName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维护时间:" prop="PreserveTime">
                    {{formatDateTimeS(form_data_view.PreserveTime)}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="对接人:" prop="AlignPer">
                    {{form_data_view.AlignPer}}
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="对接人职务:" prop="AlignPerDuty">
                    {{form_data_view.AlignPerDuty}}
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="座机号:" prop="PhoneNo">
                    {{form_data_view.PhoneNo}}
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="yh-timeinput">
                  <el-form-item label="手机号:" prop="MobNo">
                    {{form_data_view.MobNo}}
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="yh-timeinput">
                  <el-form-item label="联系邮箱:" prop="ContactEmail">
                    {{form_data_view.ContactEmail}}
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务简介:" prop="BizKnlgIntro">
                  {{form_data_view.BizKnlgIntro}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务资料:" prop="">

                  <el-upload  :on-preview="fileClick"
                    action = "osptest.com"
                    class="upload-demo yh-upload-auto yh-upload-only-show"
                    multiple :auto-upload="false" :file-list="viewfileList">
                  </el-upload>

                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="viewShow = false" size="mini" id="yh-cancel">
                <i class="fa fa-close diologBtn"></i> 关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { kbManageEdit,kbManageDel,kbManageAdd}
from "@/api/organization/resourcemanage/KnowledgeBaseManagement/index.js";
import {
getappendixbyassocId,downloadappendix,deleteappendix}
from "@/api/organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement/index.js";
import { dictFilter,dictItems } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";
import {JSONValue2JSON} from "@/utils/datahandle.js";
import { formatDateTime } from "@/utils/datahandle.js"; //日期格式化
import fileUpload from "@/views/organization/resourcemanage/components/FileUpload";

export default {
  name: "KnowledgeTable",  
  components: {
    fileUpload
  },
  data() {
    return {    
    addFlag:true,

    viewfileList:[],
    addfileList:[],
      addRules: {
        bizCate: [
        {
          required: true,
          message: "请选择业务类别",
          trigger: "blur"
        }],
        buopKnlgCate:[
        {
          required: true,
          message: "请选择知识类别",
          trigger: "blur"
        }],
        companyDep:[
        {
          required: true,
          message: "请选择业务部门",
          trigger: "blur"
        }],
        contactEmail:[
        {
          type: 'email', 
          message: '请输入正确的邮箱地址', 
          trigger: 'blur,change' 
        }],
        mobNo:[
        {
          pattern: /^1(3[0-9]|5[0-9]|8[0-9]|7[0-9])[0-9]{8}$/,
          message: '请输入正确的手机号'
        }],
        phoneNo:[ {
            pattern: /0\d{2,4}-\d{7,8}/,
            message: '请输入正确的座机'
          }
        ],
    },
    
      form_data_add_auto:{
        param:{
          knlgName:"",//知识名称
          buopKnlgCate: "", //知识类别的选中值
          preservePer:this.$store.getters.userName,//维护人
          //this.$store.getters.userName, //创建人
          preserveTime:new Date(),//维护时间
          companyDep:"",//公司类别
          bizCate:"",//业务类别
          srvCate:"",//服务类别
          alignPer:'',//对接人
          alignPerDuty:'',//对接职务
          phoneNo:"",//座机号
          mobNo:"",//手机号
          contactEmail:"",//联系邮箱
          bizKnlgIntro:"",//业务简介
          resourceCate:"02",//0--业务通讯录 ，1--知识库
          resrId:"",//资源ID  新增时为空   修改时有值
        }
      },

      form_data_add:{
        param:{
          knlgName:"",//知识名称
          buopKnlgCate: "", //知识类别的选中值
          preservePer:this.$store.getters.userName,//维护人
          //this.$store.getters.userName, //创建人
          preserveTime:new Date(),//维护时间
          companyDep:"",//公司类别
          bizCate:"",//业务类别
          srvCate:"",//服务类别
          alignPer:'',//对接人
          alignPerDuty:'',//对接职务
          phoneNo:"",//座机号
          mobNo:"",//手机号
          contactEmail:"",//联系邮箱
          bizKnlgIntro:"",//业务简介
          resourceCate:"02",//0--业务通讯录 ，1--知识库
          resrId:"",//资源ID  新增时为空   修改时有值
        }
      },
      form_data_view:{
        // BuopKnlgCate: [], //商机类别的选中值
        // CompanyDep:  [],//公司类别
        // BizCate: [],//业务类别
        // SrvCate: [],//服务类别
        // AlignPer:'',//对接人
        // AlignPerDuty:'',//对接职务
        // resourceCate:"1",//0--业务通讯录 ，1--知识库
        // PhoneNo:"",//座机号
        // MobNo:"",//手机号
        // ContactEmail:"",//联系邮箱
        // BizKnlgIntro:"",//业务简介
      },

      form_data_del:{
        "param": {
          resourceCate:"1",//0--业务通讯录 ，1--知识库
          resrId:"",//资源ID  新增时为空   修改时有值
        }
      },
      addShow: false, //新增修改弹出窗
      viewShow:false, //详情弹出窗

      items_zslb:dictItems(DICTYPE.OSPCD0224), //知识类别

      items_ywlb:dictItems(DICTYPE.OSPCD0226), //业务类别

      departmentList:[],//公司类别

      departmentListAll:dictItems(DICTYPE.OSPCD0225),//公司类别

    };
  },
  created() {
     //this.$emit("queryPage",this.pageInfo,true);
  },
  
  methods: {
    formatDateTimeS(date){
      return formatDateTime(date,'yyyy-MM-dd');
    },
    //商机改变
    buopKnlgCateChange(){
      //控制联动    公司部门跟随商机类别
      
        this.departmentList = [];
        this.form_data_add.param.companyDep = '';
        let t = 0;
        if('01' == this.form_data_add.param.buopKnlgCate){
          for(let j=0;j<this.departmentListAll.length;j++){
            if(this.departmentListAll[j].value == '01'){
              this.departmentList[t] = this.departmentListAll[j];
              t++;
            }
          }
        }
        if('02' == this.form_data_add.param.buopKnlgCate){
          for(let j=0;j<this.departmentListAll.length;j++){
            if(this.departmentListAll[j].value != '01'){
              this.departmentList[t] = this.departmentListAll[j];
              t++;
            }
          }
        }
    },
    //公司部门转码
    companyDepFormatter(code){
      return dictFilter(DICTYPE.OSPCD0225,code);
    },
    //业务类别转码
    bizCateFormatter(code){
      return dictFilter(DICTYPE.OSPCD0226,code);
    },
    //知识类别转码
    buopKnlgCateFormatter(code){
      return dictFilter(DICTYPE.OSPCD0224,code);
    },
    handleEdit(index, row) {
      this.edit_dialog(index,row);
      //编辑
      // //console.log(index, row);
    },
    handleDelete(index, rowId) {
      //删除
        this.form_data_del.param.resrId=rowId;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          kbManageDel(this.form_data_del)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$emit("queryPage",this.pageInfo);
          })
          .catch(() => {
           // alert("删除失败！");
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
    },
    business_(row) {
      //业务类型点击事件
      //查询附件信息
      this.form_data_view = row;
      this.viewfileList = [];
      //this.form_data_view.fileList = [];
      this.handleFileList(row.ResrId,1);
      this.viewShow = true;
    },

    handleFileList(resrId, add){
      this.getFileList(resrId).then(result => {
          let respData =result;
          if(respData!=null){
              //this.form_data_view.fileList.length=0;
              for(let i=0;i<respData.length;i++){
                let file = {};
                file.assocId = respData[i].AssocId;
                file.BatchNo = respData[i].BatchNo;
                this.$set(file, 'name', respData[i].AppendixName)
                if (add == 1) {
                  this.viewfileList.push(file);
                }else if(add = 2){
                  this.addfileList.push(file);
                }
              }
          }
        });
    },

    getFileList(resrId){
      let fileParam = {
        param:resrId,
      };
      var p =  new Promise(function(resolve,reject) {
          getappendixbyassocId(fileParam).then(result => {
              resolve(result.Data);
          });
      })
      return p;
    },
    data_(id) {
      //ppt点击事件
      //console.log(id);
    },
    handleClose(done) {
      //dialog的关闭方法
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    new_dialog() {
      this.addFlag = true;
      //新建点击时的title
      if (this.$refs['form_data_add']!=undefined) {
        this.$refs['form_data_add'].resetFields();
        this.form_data_add.param.resrId = "";
      }
      this.addfileList = [];
      this.addShow = true;
      //控制dialog弹窗title
      $("#dialog_add span.el-dialog__title").html("知识库新增");
      //console.log(this.category);
    },
    edit_dialog(index,row) {
      this.addFlag = false;
      //编辑点击时的title,并回显当前数据
      //let rowData = row;
      JSONValue2JSON(this.form_data_add.param,row);
      //this.form_data_add = rowData;
      this.addShow = true;
      this.buopKnlgCateChange();
      //再次给公司部门赋值
      this.form_data_add.param.companyDep= row.CompanyDep;
      this.form_data_add.param.preservePer =this.$store.getters.userName,//维护人
      this.form_data_add.param.preserveTime = '111111',//维护时间
      //处理附件信息
      this.addfileList = [];
      this.handleFileList(row.ResrId,2);  
      //控制dialog弹窗title
      $("#dialog_add span.el-dialog__title").html("知识库编辑");
    },
    //每页数量改变
    handleSizeChange(val) {
     this.pageInfo.PageSize=val;
     this.$emit("queryPage",this.pageInfo);
    },
    //点击页
    handleCurrentChange(val) {
     this.$emit("queryPage",this.pageInfo);
    },
    //上传组件的回调
    setId(id){
      this.form_data_add.param.resrId =  id;
    },
    //文件点击事件 执行下载操作
    fileClick(file){
      var url = "/osp-sysManager/appendix/downloadappendix?batchNo="+file.BatchNo
      window.open(url);
      //取消附件焦点 ， 不再显示按delete可删除提示 和delete删除操作
      $(".el-upload-list__item").blur();
    },

    doSave(){
      
      this.$refs['form_data_add'].validate((valid) => {  
        if (valid) {        
          if(this.addFlag){//新增
              kbManageAdd(this.form_data_add)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                });
                this.doCancle();
                this.$emit("queryPage",this.pageInfo);
              })
              .catch(() => {
                //alert("保存失败！");
              });
          }else{//修改
              kbManageEdit(this.form_data_add)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.doCancle();
                this.$emit("queryPage",this.pageInfo);
              })
              .catch(() => {
                //alert("修改失败！");
              });
          }        }
        });
    },
    doCancle(){
      this.addShow = false;
      JSONValue2JSON(this.form_data_add,this.form_data_add_auto);
    }


  },
  props: ['manageFlag','list','pageInfo']
};
</script>

<style rel="stylesheet/scss" lang="scss">
.yh_KnowledgeTable {
  margin-top:10px;
  border-top: 1px #eeeee9 solid;
  background:#FFF;
  padding: 0 20px;
  .KnowledgeTable_title {
    width: 100%;
    font-size:14px;
    font-family:"微软雅黑";
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #eeeee9 solid;
    box-sizing: border-box;
    h3 {
      padding: 0 3px;
      height: 40px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 2px solid #cb6c2f;
    }
    .el_btn {
      margin-right: 20px;
    }
    a {
      margin-right: 15px;
      font-size: 14px;
      color: blue;
      text-decoration: underline;
    }
  }
  .main_table {
    margin-top: 10px;
    .el-table td div {
      overflow: hidden;
      text-overflow: ellipsis;
      a {
        color: blue;
        text-decoration: underline;
      }
    }
  }
  .dialog_ {
    font-size: 14px;
    .dialog_main {
      margin: 20px;
      .select_ {
        margin-bottom: 8px;
        height: 28px;
        line-height: 28px;
        select {
          min-width: 190px;
          height: 28px;
          color: #606266;
          border: 1px solid #dddddd;
          border-radius: 4px;
        }
        span {
          display: inline-block;
          width: 100px;
          text-align: right;
          &:before {
            content: "*";
            color: red;
          }
        }
      }
      .input_ {
        width: 100%;
        margin-bottom: 8px;
        div {
          width: 50%;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
          }
        }
      }
      .textarea_ {
        margin-bottom: 8px;
        height: 75px;
        div {
          height: 75px;
          span {
            display: inline-block;
            width: 100px;
            height: 75px;
            text-align: right;
          }
        }
      }
    }
  }
  .el-table__empty-block{
    .el-table__empty-text{
      font-size: 16px;
      color: #999;
    }
  }
  .KnowledgeTable_title .el-button--mini,.main_table .el-button--mini{
    padding:2px 9px;
  }
}

</style>
