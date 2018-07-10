<template>
  <!-- 我的正式客户 __ 客户列表展示（正在使用） -->
  <div class="yh-archives clearfix">
    <div class="yh-archives-all">
      <div class="yh-archives-all-header">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <a class="yh-register" href="javascript:void(0)" v-if="false" @click="AddClick()">
          <i class="fa fa-plus"></i>
          <span>新增</span>
        </a>
        <a v-if="false" class="yh-add-labels" href="javascript:void(0)" @click="groupClick()">
          <i class="fa fa-group"></i>添加分组
        </a>
        <a class="yh-export" href="javascript:void(0)" @click="handleDownload" v-show="false">
          <i class="fa fa-download" v-show="false"></i>导出
        </a>
        <span v-show="dialogVisible_" style="color:red;">请勾选需要添加的客户</span>
      </div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div v-if="lists.length" class="yh-archives-all-main clearfix" v-for="(item, index) in lists" :key="index">
          <div class="yh-check-inp fl">
            <el-checkbox :label="item.Uuid"></el-checkbox>
          </div>
          <div class="main" v-width="100">
            <div class="yh-archives-institution fl">
              <div v-if="item.IndividualFlag == '0'" class="yh-institution-img">
                <img src="~@/assets/organization/customermanage/icn-gr.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
                <div class="yh-institution-name">
                  个人客户
                  <span class="yh-bottom-span" :style="item.StrategyCustFlag == '1'  ? 'display: inline-block;background: rgb(179, 132, 78);padding: 2px 4px;margin-top: 5px; color: #ffffff;border-radius: 9px;' : 'background:none;'">{{item.StrategyCustFlag == "1" ? "战略" : ""}}</span>
                </div>
              </div>
              <div v-else-if="item.IndividualFlag == '1'" class="yh-institution-img">
                <img src="~@/assets/organization/customermanage/icn-jg.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
                <div class="yh-institution-name">
                  机构客户
                  <span class="yh-bottom-span" :style="item.StrategyCustFlag == '1'  ? 'display: inline-block;background: rgb(179, 132, 78);padding: 2px 4px;margin-top: 5px; color: #ffffff;border-radius: 9px;' : 'background:none;'">{{item.StrategyCustFlag == "1" ? "战略" : ""}}</span>
                </div>
              </div>
              <div v-else-if="item.IndividualFlag == '2'" class="yh-institution-img">
                <img src="~@/assets/organization/customermanage/icn-cp.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
                <div class="yh-institution-name">
                  产品客户
                  <span class="yh-bottom-span" :style="item.StrategyCustFlag == '1'  ? 'display: inline-block;background: rgb(179, 132, 78);padding: 2px 4px;margin-top: 5px; color: #ffffff;border-radius: 9px;' : 'background:none;'">{{item.StrategyCustFlag == "1" ? "战略" : ""}}</span>
                </div>
              </div>
              <div v-else-if="item.IndividualFlag == '998'" class="yh-institution-img">
                <img src="~@/assets/organization/customermanage/icn-unknow44.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
                <div class="yh-institution-name">
                  未知客户
                  <span class="yh-bottom-span" :style="item.StrategyCustFlag == '1'  ? 'display: inline-block;background: rgb(179, 132, 78);padding: 2px 4px;margin-top: 5px; color: #ffffff;border-radius: 9px;' : 'background:none;'">{{item.StrategyCustFlag == "1" ? "战略" : ""}}</span>
                </div>
              </div>
              <div v-else class="yh-institution-img">
                <img src="~@/assets/organization/customermanage/icn-unknow44.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
                <div class="yh-institution-name">
                  其他客户
                  <span class="yh-bottom-span" :style="item.StrategyCustFlag == '1'  ? 'display: inline-block;background: rgb(179, 132, 78);padding: 2px 4px;margin-top: 5px; color: #ffffff;border-radius: 9px;' : 'background:none;'">{{item.StrategyCustFlag == "1" ? "战略" : ""}}</span>
                </div>
              </div>
            </div>
            <!-- 客户与机构头像展示区结束 -->
            <!-- 客户的信息区域 -->
            <div class="yh-archives-main fl" v-width="180">
              <div class="yh-main-info clearfix">
                <div class="yh-main-info-self fl">
                  <ul class="clearfix">
                    <li class="name">
                      <a @click="routerClick(item.Uuid,item.CustNo,item.IndividualFlag,item)" href="javascript:void(0)">{{item.CustFullName?item.CustFullName:"(暂无名称信息)"}}</a>
                    </li>
                    <li class="number">{{item.CustNo?item.CustNo:"(暂无编号信息)"}}</li>
                    <!-- <li class="sex" v-show="item.IndividualFlag =='0'">{{item.GenderCode == 'F' ? '女' :item.GenderCode == 'M'?'男' : item.GenderCode == '99'? '未知' : item.GenderCode == 'o'? '其他' :"(暂无性别信息)" }}</li>
                  <li class="sex" v-show="item.IndividualFlag =='1'">{{item.CorpNature ? item.CorpNature  :"(码值测试)"}}</li>
                  <li class="age" v-show="item.IndividualFlag =='0'">{{item.Age ? item.Age + "岁": "(暂无年龄信息)"}}</li>
                  <li class="age" v-show="item.IndividualFlag =='1'">{{item.IndustryCode ? item.IndustryCode : "(暂无行业信息)"}}</li>
                  <li class="education"  v-show="item.IndividualFlag =='0'">{{item.EduCode == "1" ? "本科" : item.EduCode == "2" ? "硕士" : "(暂无学历信息)"}}</li> -->
                    <li class="type">证件类型：{{item.CredentialsType}}</li>
                    <li class="type_number">证件号码：{{item.IdNo ? item.IdNo : "(暂无证件号信息)"}}</li>
                  </ul>
                </div>
                <div class="yh-main-info-add fr">
                  <a href="javascript:void(0)" @click="AddServices(item.Uuid,item.CustFullName,item.StrategyCustFlag)">
                    <i class="el-icon-tickets" style="margin-right: 10px; color:#8DA332;"></i>添加服务记录</a>
                </div>
              </div>
              <div class="yh-main-tel">
                <ul class="clearfix">
                  <!-- <li class="name">主联系人：{{item.MainContacter ? item.MainContacter : "(暂无)"}}</li> -->
                  <li class="tel" style="border:none;">电话：{{item.Mob !="****" ? item.Mob : "(暂无)"}}</li>
                  <li class="email">邮箱：{{item.OrgEmail ? item.OrgEmail : "(暂无)"}}</li>
                </ul>
              </div>
              <div class="yh-main-department clearfix">
                <div class="department fl">
                  <h6>部门标签：</h6>
                  <span v-if="item.custBatchRightVO!=null">
                    <span v-if="item.custBatchRightVO.IsAmbDep==1">银河金汇</span>
                    <span v-if="item.custBatchRightVO.IsBondInvestDep==1">债券投资部</span>
                    <span v-if="item.custBatchRightVO.IsBrokersBizDep==1">经纪业务总部</span>
                    <span v-if="item.custBatchRightVO.IsDerivativePrdDep==1">衍生产品总部</span>
                    <span v-if="item.custBatchRightVO.IsFundDep==1">银河基金</span>
                    <span v-if="item.custBatchRightVO.IsFutureDep==1">银河期货</span>
                    <span v-if="item.custBatchRightVO.IsInsurDep==1">银河保险</span>
                    <span v-if="item.custBatchRightVO.IsInternationalDep==1">银河国际</span>
                    <span v-if="item.custBatchRightVO.IsInvestBankDep==1">投资银行总部</span>
                    <span v-if="item.custBatchRightVO.IsPrdCenterDep==1">产品中心部</span>
                    <span v-if="item.custBatchRightVO.IsResearchDep==1">研究院</span>
                    <span v-if="item.custBatchRightVO.IsSecFinlDep==1">证券金融总部</span>
                  </span>
                </div>
                <div class="contact fr">
                  <span>归属机构：{{item.OrgName ? item.OrgName : "暂无"}}</span>
                  <span>服务经理：{{item.SrvMagName ? item.SrvMagName : "暂无"}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!lists.length" class="yh-data">暂无数据</div>
      </el-checkbox-group>
    </div>
    <div class="yh-addcustomergroup">
      <el-dialog title="客户分组新增" :visible.sync="addCustomerGroupDialog" width="600px">
        <div class="yh-content">
          <el-form ref="form" :model="form_data_group" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="分组名称:" prop="groupName">
                  <el-input v-model="form_data_group.groupName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建人:">
                  <el-input v-model="Establish" disabled size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建时间:">
                  <el-input v-model="EstablishTime" disabled size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="分组描述:" prop="groupDetaile">
                  <el-input type="textarea" v-model="form_data_group.groupDetaile" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="yh-buttons">
                  <el-button @click="addCustomerGroup()" size="mini" id="el_query">
                    <i class="fa fa-check"></i>确定
                  </el-button>
                  <el-button @click="addCustomerGroupDialog = false" size="mini" id="el_reset">
                    <i class="fa fa-close"></i>取消
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div class="yh-addcustomer">
      <el-dialog title="客户新增" :visible.sync="addCustomerDialog" width="800px">
        <div>
          <el-form ref="form_data" :rules="addRules" :model="form_data" label-width="140px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="客户名称:" prop="addName">
                  <el-input v-model="form_data.addName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="证件类型:" prop="addDocumentType">
                  <el-input v-model="form_data.addDocumentType" size="mini" disabled></el-input>
                  <!-- <el-select v-model="form_data.addDocumentType" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option v-for="item in addDocumenttypeoptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="客户简称:" prop="addPetName">
                  <el-input v-model="form_data.addPetName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="证件号码:" prop="addTypeNumber">
                  <el-input v-model="form_data.addTypeNumber" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="证件开始有效期:" prop="addDocumentStartTime">
                  <el-date-picker value-format="yyyyMMdd" v-model="form_data.addDocumentStartTime" type="date" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="证件结束有效期:" prop="addDocumentEndTime">
                  <el-date-picker value-format="yyyyMMdd" v-model="form_data.addDocumentEndTime" type="date" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="客户类型:" prop="addCustomerType">
                  <el-select v-model="form_data.addCustomerType" disabled @change="CustomerTypeChange()" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option v-for="item in addCustomertypeoptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="机构类型:" prop="addOrganizationType">
                  <el-select v-model="form_data.addOrganizationType" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option v-for="item in addOrganizationTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="重要程度:" prop="addZindex">
                  <el-select v-model="form_data.addZindex" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option v-for="item in addZindexList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="行业:" prop="addIndustry">
                  <el-select v-model="form_data.addIndustry" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option v-for="item in addIndustryList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="是否上市公司:" prop="addOrList">
                  <el-select v-model="form_data.addOrList" size="mini">
                    <el-option v-for="item in addOrList_" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="证劵代码:" prop="addSecuritiesCode">
                  <el-input v-model="form_data.addSecuritiesCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="成立日期:" prop="addFoundTime">
                  <el-date-picker value-format="yyyyMMdd" v-model="form_data.addFoundTime" type="date" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="注册资本(元):" prop="addRegisteredCapital">
                  <el-input v-model="form_data.addRegisteredCapital" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="注册地点:" prop="addRegisteredPlace">
                  <el-input v-model="form_data.addRegisteredPlace" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="主营业务:" prop="addMainBusiness">
                  <el-input v-model="form_data.addMainBusiness" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="归属机构:" prop="addFromOrgan">
                  <OrgChoose selectType="radio" @onOrgSure="onOrgSure"></OrgChoose>
                </el-form-item>
              </el-col>
              <el-col v-if="false" :span="10">
                <el-form-item label="业务标签:" prop="addBusinessLabel">
                  <el-select v-model="form_data.addBusinessLabel" size="mini" disabled>
                    <el-option v-for="item in addBusinessLabelList" :key="item.engName" :label="item.chnName" :value="item.engName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="条线标签:" prop="addConditionalLabel">
                  <el-select v-model="form_data.addConditionalLabel" size="mini" disabled>
                    <el-option v-for="item in addConditionalLabelList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="部门标签:" prop="addDepartmentLabel">
                  <el-select v-model="form_data.addDepartmentLabel" size="mini" disabled>
                    <el-option v-for="item in addDepartmentLabelList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="24">
                <div class="yh-buttons">
                  <el-button @click="addCustomerHandle()" size="mini" id="el_query">
                    <i class="fa fa-check"></i>确定
                  </el-button>
                  <el-button @click="addCustomerDialog = false" size="mini" id="el_reset">
                    <i class="fa fa-close"></i>取消
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div class="yh-addservicerecords">
      <el-dialog title="活动新建" :visible.sync="rightdialogVisible" width="830px">
        <div style="padding:10px 20px;box-sizing:border-box;">
          <el-form :model="form_data_servicerecord" label-width="130px" ref="form_data_servicerecord" size="mini" label-position="right">
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="活动编号：" prop="ActivityNo">
                  <el-input v-model="form_data_servicerecord.ActivityNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="创建人：" prop="CrtBy">
                  <el-input v-model="CrtBy" placeholder="请输入内容" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="活动类型：" prop="ActivityType">
                  <el-select placeholder="请选择" v-model="form_data_servicerecord.ActivityType" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in activityTypeList" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="活动状态：" prop="ActivitySts">
                  <el-select placeholder="请选择" v-model="form_data_servicerecord.ActivitySts" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in activityStateList" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="优先级：" prop="ActivityPrio">
                  <el-select placeholder="请选择" v-model="form_data_servicerecord.ActivityPrio" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in priorityList" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="活动方式：" prop="ActivityMode">
                  <el-select placeholder="请选择" v-model="form_data_servicerecord.ActivityMode" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in modeList" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="计划开始时间：" prop="PlanBeginTime">
                  <el-date-picker v-model="form_data_servicerecord.PlanBeginTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="计划结束时间：" prop="PlanEndTime">
                  <el-date-picker v-model="form_data_servicerecord.PlanEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="实际开始时间：" prop="ActualBeginTime">
                  <el-date-picker v-model="form_data_servicerecord.ActualBeginTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="实际结束时间：" prop="ActualEndTime">
                  <el-date-picker v-model="form_data_servicerecord.ActualEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="活动名称：" prop="ActivityContent">
                  <el-input type="text" v-model="form_data_servicerecord.ActivityContent" :rows="3"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="是否有领导参与：" prop="IsNeedLeaderJoinIn">
                  <el-select placeholder="请选择" v-model="form_data_servicerecord.IsNeedLeaderJoinIn" size="mini">
                    <el-option key="" label="请选择" value="">
                    </el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in items_IsNeedLeaderJoinIn" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="21">
                <el-form-item label="活动描述：" prop="ActivityDetlContent">
                  <el-input type="textarea" v-model="form_data_servicerecord.ActivityDetlContent" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="客户名称：" prop="CustName">
                  <el-input v-model="AddServicesName" placeholder="" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="10">
                <el-form-item label="参与人：" prop="JoinInName">
                  <SeacerPeople :seacerId="form_data_servicerecord.JoinInId" :seacerName="form_data_servicerecord.JoinInName" @SeacerPeopleResponse="SeacerPeopleResponse"></SeacerPeople>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="1" :span="10">
                <el-form-item label="上传需求报告:">
                  <fileUpload :relId="form_data_servicerecord.ActivityNo" :addfileList="addfileList" @setId="setId"></fileUpload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="yh-buttons">
                  <el-button id="el_query" size="mini" @click="requieAddServices()">
                    <i class="fa fa-check"></i>确定
                  </el-button>
                  <el-button id="el_reset" size="mini" @click="requieDelServices()">
                    <i class="fa fa-close"></i>取消
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
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
import { checkAllChange } from "@/utils/datahandle.js"; //----------------------------多选的方法
import { dictItems, dictFilter } from "@/filters"; //---------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //----------------------------------------数据字典的方法
import OrgChoose from "@/views/organization/components/OrgChoose.vue";
import SeacerPeople from "@/views/organization/components/SeacerPeople.vue";
export default {
  name: "strategyInstitutionFormalCustomerManage",
  props: {
    lists: {
      type: Array,
      default: ""
    },
    name: {
      type: String
    }
  },
  components: {
    OrgChoose,
    SeacerPeople,
    fileUpload
  },
  data() {
    return {
      addfileList: [], //------------------------上传（附件）
      CrtBy: this.$store.getters.userName, //----创建人
      checkAll: false, //------------------------判断全选
      checkedCities: [], //----------------------判断全选
      cities: [], //-----------------------------判断全选(含有所有列表中的Uuid)
      isIndeterminate: true, //------------------判断全选
      OrgIdNumber: false, //---------------------获取登录人的机构号判断是否可以显示新增
      orgId: this.$store.getters.orgid.split(0, 4), //--------------------------根据登录用户的姓名判断是否拥有新增的权限
      // orgId: "8007", //--------------------------根据登录用户的姓名判断是否拥有新增的权限
      orgNo: null, //----------------------------新增需要的的归属机构
      UUid: [], //-------------------------------添加分组要的id
      AddServicesUid: "", //---------------------点击添加时赋值当前的客户uid
      AddServicesName: "", //--------------------点击添加时赋值当前的客户name
      StrategyCustFlag: "", //-------------------点击添加时赋值是否查略
      Establish: "", //--------------------------创建人
      EstablishTime: null, //--------------------创建时间
      addCustomerGroupDialog: false, //----------添加分组窗口关闭开启判断标识符
      dialogVisible_: false, //------------------添加分组的窗口提示
      addCustomerDialog: false, //---------------新增窗口关闭开启判断标识符
      rightdialogVisible: false, //--------------添加服务记录窗口关闭与开启
      form_data_group: {
        groupName: "", //------------------------分组新增
        groupDetaile: "" //----------------------分组描述
      },
      //-----------------------------------------新增的必填项标识校验（ele组件功能）
      addRules: {
        addName: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur"
          }
          // {
          //   min: 3,
          //   max: 5,
          //   message: "长度在 3 到 5 个字符",
          //   trigger: "blur"
          // }
        ],
        addDocumentType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "blur"
          }
          // {
          //   min: 3,
          //   max: 5,
          //   message: "长度在 3 到 5 个字符",
          //   trigger: "blur"
          // }
        ],
        addTypeNumber: [
          {
            required: true,
            message: "请选择证件号码",
            trigger: "blur"
          }
          // {
          //   min: 3,
          //   max: 5,
          //   message: "长度在 3 到 5 个字符",
          //   trigger: "blur"
          // }
        ]
      },
      form_data: {
        //-----------------------------新增功能
        addName: "", //--------------------------新增客户名称
        addDocumentType: "统一社会信用代码", //---证件类型（暂时没有调取数据字典）
        addDocumentTypeNumber: "117", //---------证件类型(码值)
        addPetName: "", //-----------------------客户简称
        addTypeNumber: "", //--------------------证件号码
        addDocumentStartTime: "", //-------------证件开始有效期
        addDocumentEndTime: "", //---------------证件结束有效期
        addCustomerType: "1", //-----------------客户类型（暂时只有机构）
        addOrganizationType: "", //--------------机构类型
        addZindex: "", //------------------------重要程度
        addIndustry: "", //----------------------行业
        addOrList: "", //------------------------是否上市
        addSecuritiesCode: "", //----------------证券代码
        addFoundTime: "", //---------------------成立日期
        addRegisteredCapital: "", //-------------注册资本
        addRegisteredPlace: "", //---------------注册地点
        addMainBusiness: "", //------------------主营业务
        addFromOrgan: "", //---------------------归属机构
        addBusinessLabel: "", //-----------------业务标签
        addConditionalLabel: "", //--------------条件标签
        addDepartmentLabel: "" //----------------部门标签
      },
      form_data_servicerecord: {
        ActivityNo: "", //----------------------------------------------活动编号
        ActivityType: "", //--------------------------------------------活动类别
        ActivitySts: "", //---------------------------------------------状态
        ActivityPrio: "", //--------------------------------------------优先级
        ActivityMode: "", //--------------------------------------------活动方式
        PlanBeginTime: new Date(), //-----------------------------------计划开始时间
        PlanEndTime: "", //---------------------------------------------计划结束时间
        ActualBeginTime: new Date(), //---------------------------------实际开始时间
        ActualEndTime: "", //-------------------------------------------实际结束时间
        ActivityContent: "", //-----------------------------------------活动名臣
        ActivityDetlContent: "", //-------------------------------------活动描述
        JoinInId: "", //------------------------------------------------参与者ID
        JoinInName: "", //----------------------------------------------参与者姓名
        IsNeedLeaderJoinIn: "" //---------------------------------------是否有领导参与
      },
      addDocumenttypeoptions: dictItems(DICTYPE.EDW10031), //--------证件类型（新增）
      addZindexList: dictItems(DICTYPE.CTCCD0213), //----------------重要程度（新增）
      addIndustryList: dictItems(DICTYPE.EDW20504), //---------------行业代码（新增）
      serverZindexList: dictItems(DICTYPE.OSPCD0229), //-------------优先级（新增）
      //-------------------------------------------------------------客户类型（新增）（临时只有机构）
      addCustomertypeoptions: [
        {
          value: "1",
          label: "机构"
        },
        {
          value: "0",
          label: "个人"
        }
      ],
      //-----------------------------------------------------------机构类型（新增）(临时)
      addOrganizationTypeList: [
        {
          value: "1",
          label: "上市公司"
        },
        {
          value: "2",
          label: "非上市公司"
        }
      ],
      //-----------------------------------------------------------是否上市（新增）(临时)
      addOrList_: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "2",
          label: "否"
        }
      ],
      addConditionalLabelList: [], //------------------------------条线标签（新增）
      addDepartmentLabelList: [], //-------------------------------部门标签（新增）
      //-----------------------------------------------------------业务标签（新增）（临时不做传参）
      addBusinessLabelList: [
        {
          engName: "offSiteOption",
          chnName: "场外期权"
        },
        {
          engName: "payoffExchange",
          chnName: "收益互换（100%保证金收益互换、指数增强）"
        },
        {
          engName: "buyAttrnSale",
          chnName: "买入转售"
        },
        {
          engName: "stkCustodySale",
          chnName: "股票寄售"
        }
      ],
      activityTypeList: dictItems(DICTYPE.OSPCD0220), //-----------------活动类型
      activityStateList: dictItems(DICTYPE.OSPCD0222), //----------------活动状态
      priorityList: dictItems(DICTYPE.OSPCD0229), //---------------------优先级
      modeList: dictItems(DICTYPE.OSPCD0221), //-------------------------活动方式
      items_IsNeedLeaderJoinIn: dictItems(DICTYPE.CTCCD0999), //---------是否有领导参与
      //上传功能
      yh_enclosureoptions: {
        target: "//localhost:9527/upload",
        testChunks: false
      },
      attrs: {
        accept: "image/*"
      }
    };
  },
  watch: {
    lists(newlist, oldlist) {
      this.$props.lists.forEach(item => {
        item.OrgName = dictFilter(DICTYPE.CTCCD0998, item.OrgNo); //------回显证件号码数据字典转换
        item.CredentialsType = dictFilter(
          DICTYPE.EDW10031,
          item.CredentialsType
        ); //-------------------------------------------------------------回显证件号码数据字典转换
        this.cities.push(item.Uuid); //-----------------------------------全选赋值
      });
    }
  },
  created() {
    // ------------------------------------------------------------------计划结束与实际结束时间使用
    var now = new Date();
    now.setDate(now.getDate() + 1);
    this.form_data_servicerecord.PlanEndTime = now; //--------------------计划结束
    this.form_data_servicerecord.ActualEndTime = now; //------------------实际结束
    this.Establish = this.$store.getters.userName; //---------------------回显登录人姓名
    if (this.$props.lists != null) {
      this.$props.lists.forEach(item => {
        item.OrgName = dictFilter(DICTYPE.CTCCD0998, item.OrgNo); //------回显证件号码数据字典转换
        item.CredentialsType = dictFilter(
          DICTYPE.EDW10031,
          item.CredentialsType
        ); //-------------------------------------------------------------回显证件号码数据字典转换
        this.cities.push(item.Uuid); //-----------------------------------全选赋值
      });
    }
    //--------------------------------------------------------------------根据登录人的权限展示新增
    switch (String(this.$store.getters.orgid).substring(0, 4)) { //-------条线标签与部门标签的判断与显示（新增按钮显示判断）
      case "8007":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行总部"
        });
        break;
      case "8160":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行一部"
        });
        break;
      case "8170":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行二部"
        });
        break;
      case "8280":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行三部"
        });
        break;
      case "8305":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投行质控总部"
        });
        break;
      case "8304":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投行运管总部"
        });
        break;
      case "8306":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投行客服总部"
        });
        break;
      case "8312":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行五部"
        });
        break;
      case "8314":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行七部"
        });
        break;
      case "8316":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行九部"
        });
        break;
      case "8311":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行四部"
        });
        break;
      case "8313":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行八部"
        });
        break;
      case "8315":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行六部"
        });
        break;
      case "8317":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "投行"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "投资银行十部"
        });
        break;
      case "9060":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "资管"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "银河金汇"
        });
        break;
      case "8210":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "经济"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "衍生产品总部"
        });
        break;
      case "8260":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "经济"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "产品中心部"
        });
        break;
      case "8240":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "经纪"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "研究部"
        });
        break;
      case "8250":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "经纪"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "机构客户部"
        });
        break;

      case "B010":
        this.OrgIdNumber = true;
        this.addConditionalLabelList.push({
          value: "",
          label: "保险"
        });
        this.addDepartmentLabelList.push({
          value: "",
          label: "银河保险"
        });
        break;

      default:
        break;
    }
  },
  methods: {
    // ------------------------------------------------------------------参与人回显的数据
    SeacerPeopleResponse(data) {
      this.form_data_servicerecord.JoinInId = data.designPerson;
      this.form_data_servicerecord.JoinInName = data.designPersonName;
    },
    CustomerTypeChange() {
      switch (this.form_data.addCustomerType) {
        case "0":
          this.form_data.addDocumentTypeNumber = "001";
          this.form_data.addDocumentType = "身份证";
          break;
        case "1":
          this.form_data.addDocumentTypeNumber = "117";
          this.form_data.addDocumentType = "统一社会信用代码";
          break;

        default:
          break;
      }
    },
    //监听是否点击全选，全选与清空全选
    handleCheckAllChange(val) {
      this.dialogVisible_ = false; //--判断是否显示提示
      if (val) {
        this.UUid = this.cities; //----全选赋值
      } else {
        this.UUid = [];
      }
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    //---------------------------------------------------------------每一个列表变化拿到UUID
    handleCheckedCitiesChange(value) {
      this.UUid = value;
      this.dialogVisible_ = false;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // --------------------------------------------------------------机构树
    onOrgSure(val) {
      this.orgNo = val.toString();
    },
    //---------------------------------------------------------------点击新增按钮打开弹窗开关
    AddClick() {
      this.addCustomerDialog = true;
    },
    //---------------------------------------------------------------新增确定按钮的请求参数
    addCustomerHandle() {
      this.addCustomerDialog = false;
      var data = {
        custFullName: this.form_data.addName, //---------------------客户名称
        custName: this.form_data.addPetName, //----------------------客户简称
        individualFlag: this.form_data.addCustomerType, //-----------客户类型
        credentialsType: this.form_data.addDocumentTypeNumber, //----证件类型（暂时使用）
        idNo: this.form_data.addTypeNumber, //-----------------------证件号码
        impDegree: this.form_data.addZindex, //----------------------重要程度
        lineLable: "", //--------------------------------------------部门标签
        custStkCodeVO: {
          stkCode: this.form_data.addSecuritiesCode //---------------证券代码
        },
        orgNo: this.orgNo,
        custCredentialsVO: {
          idNo: this.form_data.addTypeNumber, //---------------------证件号码
          credentialsBeginDate: Number(this.form_data.addDocumentStartTime), //--证件开始有效期
          credentialsEffDt: Number(this.form_data.addDocumentEndTime) //---------证件结束有效期
        },
        custOrgVO: {
          industryCode: this.form_data.addIndustry, //----------------行业
          regDate: Number(this.form_data.addFoundTime), //------------注册日期
          mainBiz: this.form_data.addMainBusiness, //-----------------主营业务
          listProp: this.form_data.addOrList, //----------------------是否上市公司
          regCptl: this.form_data.addRegisteredCapital, //------------注册资金
          regAddr: this.form_data.addRegisteredPlace, //--------------注册地址
          corpType: this.form_data.addOrganizationType //-------------企业类型
        }
      };
      this.$refs.form_data.resetFields(); //---------------------------置空选项
      this.$emit("addformalcuslist", data);
    },
    //-----------------------------------------------------------------添加分组的判断是否可以展开
    groupClick() {
      if (this.UUid.length > 0) {
        this.addCustomerGroupDialog = true;
        const time = new Date();
        this.EstablishTime = time.toISOString().slice(0, 10);
      } else {
        this.dialogVisible_ = true;
      }
    },
    //----------------------------------------------------------------添加分组请求参数
    addCustomerGroup() {
      const data = {
        grpName: this.form_data_group.groupName,
        grpLvl: "1",
        grpDesc: this.form_data_group.groupDetaile,
        custGrpAssocVO: []
      };
      this.UUid.forEach(item => {
        data.custGrpAssocVO.push({
          custUuid: item
        });
      });
      this.handleCheckAllChange(false);
      this.checkAll = false;
      this.addCustomerGroupDialog = false;
      this.$emit("CtcLabelManagerGroud", data);
    },
    //----------------------------------------------------------------添加服务记录 （触发事件）
    AddServices(index, name, isStrater) {
      this.addfileList = [];
      this.rightdialogVisible = true;
      this.AddServicesUid = index; //添加人的uid
      this.AddServicesName = name; //添加人的uid
      this.StrategyCustFlag = isStrater; //---是否战略
    },
    //----------------------------------------------------------------添加服务记录 （请求）
    requieAddServices() {
      //校验时间
      if (
        this.form_data_servicerecord.PlanBeginTime >
        this.form_data_servicerecord.PlanEndTime
      ) {
        //验证没有通过
        this.$message({
          message: "计划开始时间不可晚于计划结束时间",
          type: "warning"
        });
        return;
      }

      //校验时间
      if (
        this.form_data_servicerecord.ActualBeginTime >
        this.form_data_servicerecord.ActualEndTime
      ) {
        //验证没有通过
        this.$message({
          message: "实际开始时间不可晚于实际结束时间",
          type: "warning"
        });
        return;
      }
      var data = this.form_data_servicerecord;
      data.uuid = this.AddServicesUid;
      data.custname = this.AddServicesName;
      data.StrategyCustFlag = this.StrategyCustFlag;
      this.$emit("AddServices", data);
      // this.$refs.form_data_servicerecord.resetFields();
      this.rightdialogVisible = false;
    },
    requieDelServices() {
      this.rightdialogVisible = false;
    },
    requieDelServices() {
      this.$refs.form_data_servicerecord.resetFields();
      this.rightdialogVisible = false;
    },
    //-----------------------------------------------------------------客户名称的路由跳转
    routerClick(uuid, number, type, item) {
      switch (type) {
        case "0":
          type = "per";
          break;
        case "1":
          type = "org";
          break;
        case "2":
          type = "org";
          break;

        default:
          break;
      }
      this.$router.push({
        path: "/CustomerManagement/FormalCustomerManagement/PanoramicView",
        query: {
          uuid: uuid,
          custNo: number,
          custType: type,
          MyName: "formal",
          IsStrategyCustFlag: item.StrategyCustFlag
        }
      });
    },
    //-----------------------------------------------------------------导出的触发事件
    handleDownload() {
      this.downloadLoading = true;
    },
    //-----------------------------------------------------------------客户分组的确定关闭弹窗（暂无调用） :before-close="customerGroupHandleClose"
    customerGroupHandleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //-----------------------------------------------------------------客户新增的确定关闭弹窗（暂无调用） :before-close="customerHandleClose"
    customerHandleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // ----------------------------------------------------------------添加服务记录的确定关闭弹窗（暂无调用） :before-close="serviceRecordsHandleClose"
    serviceRecordsHandleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //-----------------------------------------------------------------没有数据时给的提示（暂无调用）
    handleCloseFalse(done) {
      this.$confirm("暂无客户列表数据（我的正式客户提示语）")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //上传组件的回调
    setId(id, name) {
      if (name == "twoFile") {
        this.bussines_infoTwo.busoppId = id;
      } else {
        this.form_data_servicerecord.ActivityNo = id;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh-archives {
  min-height: 120px;
  box-sizing: border-box;
  font-size: 14px;
  .yh-data {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    color: #999;
    margin-top: 12px;
  }
  .yh-archives-all {
    width: 100%;
    .yh-archives-all-header {
      width: 100%;
      height: 40px;
      label {
        display: inline-block;
        height: 100%;
        line-height: 40px;
        width: 90px;
        text-align: center;
        input {
          margin-right: 6px;
        }
      }
      .yh-register,
      .yh-add-labels,
      .yh-export {
        position: relative;
        display: inline-block;
        height: 40px;
        padding: 0 30px;
        padding-right: 10px;
        line-height: 40px;
        text-align: center;
      }
      .yh-register {
        color: blue;
        i {
          position: absolute;
          font-size: 18px;
          left: 11px;
          top: 11px;
        }
      }
      .yh-add-labels {
        color: #999999;
        i {
          position: absolute;
          font-size: 14px;
          left: 8px;
          top: 11px;
        }
      }
      .yh-export {
        color: #999999;
        i {
          position: absolute;
          font-size: 14px;
          left: 12px;
          top: 12px;
        }
      }
    }
  }
  /* 客户信息展示区域 */
  .yh-archives-all-main {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #eeeeee;
    background: #fff;
    .yh-check-inp {
      height: 120px;
      width: 25px;
      overflow: hidden;
      margin-left: 0px;
      box-sizing: border-box;
      padding-left: 11px;
      padding-top: 37px;
    }
    .main {
      float: left;
      .yh-archives-institution {
        width: 78px;
        height: 120px;
        position: relative;
        .yh-institution-img {
          position: absolute;
          top: 7%;
          left: 0%;
          width: 100%;
          img {
            display: block;
            height: 50px;
            width: 50px;
            margin: 0 auto;
            margin-bottom: 8px;
          }
          .yh-institution-name {
            font-size: 12px;
            text-align: center;
            color: #999999;
            width: 100%;
            height: 40px;
            overflow: hidden;
          }
        }
      }
      /* 主要数据位置 */
      .yh-archives-main {
        height: 120px;
        box-sizing: border-box;
        padding: 10px 0;
        .yh-main-info {
          width: 100%;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          border: red solid 1px;
          .yh-main-info-self {
            max-width: 86%;
            box-sizing: border-box;
            ul {
              li {
                float: left;
                padding: 0 10px;
                margin-top: 10px;
                font-size: 13px;
                box-sizing: border-box;
                height: 20px;
                line-height: 20px;
                border-left: 1px solid #999999;
                &.name {
                  margin-top: 0;
                  font-size: 16px;
                  color: #374b91;
                  line-height: 39px;
                  height: 20px;
                  font-weight: bold;
                  border: none;
                }
                &.number {
                  border: none;
                }
              }
            }
          }
          .yh-main-info-add {
            width: 120px;
            font-size: 13px;
            a {
              display: inline-block;
              color: #676767;
              height: 16px;
              line-height: 20px;
            }
          }
        }
        /* 客户联系区域 */
        .yh-main-tel {
          width: 100%;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          box-sizing: border-box;
          ul {
            li {
              float: left;
              margin-top: 8px;
              font-size: 13px;
              box-sizing: border-box;
              height: 14px;
              line-height: 14px;
              padding: 0 10px;
              border-left: 1px solid #666;
              &:nth-child(1) {
                border: none;
              }
            }
          }
        }
        /* 部门区域 */
        .yh-main-department {
          padding-top: 5px;
          width: 100%;
          height: 30px;
          overflow: hidden;
          font-size: 12px;
          color: #444;
          .department {
            max-width: 60%;
            height: 20px;
            line-height: 20px;
            overflow: hidden;
            font-size: 13px;
            h6 {
              display: inline-block;
              padding-left: 10px;
              color: #e7a04e;
            }
            span {
              padding: 0 5px;
            }
          }
          .contact {
            max-width: 40%;
            height: 20px;
            line-height: 20px;
            color: #919191;
            padding: 0 10px;
            box-sizing: border-box;
            span {
              padding: 0 10px;
            }
          }
        }
      }
    }
  }
}

/*dialog里的样式*/

.yh-content {
  padding: 0px 15px;
  height: auto;
}

.yh-buttons {
  text-align: center;
  margin: 18px 0;
}

/*文件上传*/

.yh-uploader {
  width: 628px;
  padding: 15px;
  margin: 0 auto;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
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

.yh-uploader-application {
  width: 500px;
  padding: 15px;
  margin: 0 auto;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.yh-uploader-application .uploader-btn {
  float: right;
}

.yh-uploader-fujian {
  width: 628px;
  padding: 15px;
  margin: 0 auto;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.yh-uploader-fujian .uploader-btn {
  float: right;
}
</style>
