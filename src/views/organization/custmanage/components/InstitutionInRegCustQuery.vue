<template>
  <!-- 注册客户查询————列表 -->
  <div class="yh_InstitutionInRegCustQuery">
    <div class="yh-archives clearfix">
      <div class="yh-archives-all">
        <div class="yh-archives-all-header">
          <label>
            <input type="checkbox" @click="selectAll" :checked="checked" />全选
          </label>
          <!-- <div class="yh-archives-all-header-sort">
            <a href="javascript:void(0)">企业类型</a>
          </div> -->
          <a href="javascript:void(0)" style="color: #B6B6B6;" @click="addGroupShow = true">
            <i class="fa fa-group"></i>添加分组</a>
        </div>
        <div class="yh-archives-all-main clearfix" v-for="(item, index) in proData" :key="index">
          <div class="yh-check-inp fl">
            <input type="checkbox" :value="index" v-model="selectArr">
          </div>
          <div class="main" v-width="80">
            <RegisteredCustomerList :manageFlag="false"></RegisteredCustomerList>
          </div>
        </div>
        <!-- 客户分组新增  弹出窗口 -->
        <div>
          <el-dialog title="客户分组新增" :visible.sync="addGroupShow" width="600px">
            <div class="activity_dialog clearfix">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分组名称:" prop="var1">
                    <el-input v-model="form_data.var1" placeholder="请输入内容" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创建人:" prop="var2">
                    <el-input v-model="form_data.var2" placeholder="请输入内容" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <div class="yh-timeinput">
                    <el-form-item label="创建时间:" prop="var3">
                      <el-date-picker v-model="form_data.var3" type="datetime" placeholder="选择日期时间" size="mini">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="分组描述:" prop="var4">
                    <el-input type="textarea" v-model="form_data.var4" :rows="3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addGroupShow = false" size="mini" id="yh-confirm">
                <i class="fa fa-check diologBtn"></i>确 定</el-button>
              <el-button @click="addGroupShow = false" size="mini" id="yh-cancel">
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

  export default {
    components: {
      RegisteredCustomerList
    },
    name: "InstitutionInRegCustQuery",
    data() {
      return {
        addGroupShow: false,
        form_data: {
          var1: "",
          var2: "",
          var3: "",
          var4: "1111"
        },
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
        checked: false
      };
    },
    watch: {
      selectArr(curVal) {
        if (curVal.length == this.proData.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    },

    methods: {
      selectAll(event) {        
        if (!event.currentTarget.checked) {
          this.selectArr = [];
        } else {
          //实现全选
          this.selectArr = [];
          this.proData.forEach((item, i) => {
            this.selectArr.push(i);
          });
        }
      }
    }
  };

</script>
<style scoped>
  .yh-archives {
    /* margin-top: 10px; */
    min-height: 120px;
    box-sizing: border-box;
    /* border: 3px solid #eeeeee; */
  }

  /*信息总区域*/

  .yh-archives-all {
    width: 100%;
  }

  .yh-archives-all-main {
    padding-top: 1%;
    background:#FFF;
  }

  /* 客户操作选择区域 */

  .yh-archives-all-header {
    width: 100%;
    height: 40px;
    border-bottom: 3px solid #eeeeee;
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
    width: 20px;
    min-height: 120px;
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
      border:red solid 1px;
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

</style>
