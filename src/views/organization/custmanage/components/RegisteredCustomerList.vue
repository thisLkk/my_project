<template>
  <!--注册客户页面的客户列表 lu-->
  <div class="yh_RegisteredCustomerList clearfix">
    <div class="main">
       <div class="yh-archives-institution fl">
          <div v-if="topInfoList.IndividualFlag == '0'" class="yh-institution-img">
            <img src="~@/assets/organization/customermanage/icn-gr.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
            <div class="yh-institution-name">
              个人客户
            </div>
          </div>
          <div v-else-if="topInfoList.IndividualFlag == '1'" class="yh-institution-img">
            <img src="~@/assets/organization/customermanage/icn-jg.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
            <div class="yh-institution-name">
              机构客户
            </div>
          </div>
          <div v-else-if="topInfoList.IndividualFlag == '2'" class="yh-institution-img">
            <img src="~@/assets/organization/customermanage/icn-cp.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
            <div class="yh-institution-name">
              产品客户
            </div>
          </div>
          <div v-else-if="topInfoList.IndividualFlag == '998'" class="yh-institution-img">
            <img src="~@/assets/organization/customermanage/icn-unknow44.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
            <div class="yh-institution-name">
              未知客户
            </div>
          </div>
          <div v-else class="yh-institution-img">
            <img src="~@/assets/organization/customermanage/icn-unknow44.png" style="color:#cccccc;font-size:12px;" alt="用户头像">
            <div class="yh-institution-name">
              其他客户
            </div>
          </div>
          <p v-if="topInfoList.StrategyCustFlag=='1'"> 战略</p>
        </div>
    </div>
    <div class="company_main fl" v-width="200">
      <div class="main_top clearfix">
        <h3 class="fullNameClass" :title="topInfoList.CustFullName">
          <a @click="routerClick(topInfoList.Uuid,topInfoList.CustNo,topInfoList.IndividualFlag,topInfoList)" href="javascript:void(0)">{{topInfoList.CustFullName ? topInfoList.CustFullName : topInfoList.CustName}}</a>
        </h3>
        <span class="custNameClass" :title="topInfoList.CustName">客户简称:{{topInfoList.CustName}}</span>
        <span class="windPriIndustryClass" :title="topInfoList.potentialOrg?WindPriIndustryFormatter(topInfoList.potentialOrg.WindPriIndustry):''">一级行业：{{topInfoList.potentialOrg?WindPriIndustryFormatter(topInfoList.potentialOrg.WindPriIndustry):""}}</span>
        <span class="windSndIndustryClass" :title="topInfoList.potentialOrg?WindSndIndustryFormatter(topInfoList.potentialOrg.WindSndIndustry):''">二级行业：{{topInfoList.potentialOrg?WindSndIndustryFormatter(topInfoList.potentialOrg.WindSndIndustry):""}}</span>
        <span :title="topInfoList.RegCustType">客户类型：{{RegCustTypeFormatter(topInfoList.RegCustType)}}</span>
      </div>
      <div class="main_center">
        <span :title="topInfoList.potentialOrg?topInfoList.potentialOrg.Province:''">所在省：{{topInfoList.potentialOrg?topInfoList.potentialOrg.Province:''}}</span>
        <span :title="topInfoList.potentialOrg?topInfoList.potentialOrg.City:''">所在市：{{topInfoList.potentialOrg?topInfoList.potentialOrg.City:''}}</span>
        <span :title="topInfoList.RegSrc">注册人：{{topInfoList.RegEmpName}}</span>
        <span :title="topInfoList.RegSrc">客户来源：{{RegSrcFormatter(topInfoList.CustDataSrc)}}</span>
        <span :title="topInfoList.ImpDegree | productFilter(dictypeObj.CTCCD0213, topInfoList.ImpDegree)">重要程度：{{topInfoList.ImpDegree | productFilter(dictypeObj.CTCCD0213, topInfoList.ImpDegree)}}</span>
      </div>
      <!-- <div class="main_bottom clearfix">
        <h6>
          <span>部门标签：</span>
         // 此处根据字段内容是否为1 判定显示与否

            <span v-if="topInfoList.IsAmbDep==1">银河金汇</span>
            <span v-if="topInfoList.IsBondInvestDep==1">债券投资部</span>
            <span v-if="topInfoList.IsBrokersBizDep==1">经纪业务总部</span>
            <span v-if="topInfoList.IsDerivativePrdDep==1">衍生产品总部</span>
            <span v-if="topInfoList.IsFundDep==1">银河基金</span>
            <span v-if="topInfoList.IsFutureDep==1">银河期货</span>
            <span v-if="topInfoList.IsInsurDep==1">银河保险</span>
            <span v-if="topInfoList.IsInternationalDep==1">银河国际</span>
            <span v-if="topInfoList.IsInvestBankDep==1">投资银行总部</span>
            <span v-if="topInfoList.IsPrdCenterDep==1">产品中心部</span>
            <span v-if="topInfoList.IsResearchDep==1">研究院</span>
            <span v-if="topInfoList.IsSecFinlDep==1">证券金融总部</span>

        </h6>
      </div> -->
      <div class="register">
        <template v-if="manageFlag == 'true'">
          <a  @click="doEdit(topInfoList.Uuid)">
            <i class="fa fa-edit" style="margin-right: 3px; color: #88A028; font-size:14px;"></i>编辑</a>
          <a href="javascript:void(0)" @click="doDelete">
            <i class="fa fa-trash" style="margin-right: 3px; color: #B74353; font-size:14px;"></i>删除</a>
          <a href="javascript:void(0)" @click="doSqzz">
            <i class="fa fa-address-card-o" style="margin-right: 3px; color:#ffa800; font-size:14px;"></i>申请转正</a>
        </template>
        <a v-else style="display:inde">

        </a>
      </div>

    </div>
    <!-- 申请转正  弹出窗口 -->
    <div>
      <el-dialog class="dialogApplyForRegular" title="申请转正" :visible.sync="applyForRegularShow" width="800px">
        <div class="activity_dialog clearfix yh-jbxx-content">
          <el-form :model="form_data_sqzz" label-width="122px" label-position="right" size="mini">

            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称:" prop="CustFullName">
                  <el-input v-model="form_data_sqzz.param.CustFullName" placeholder="" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门标签:" prop="potentialOrg.secAbbr">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.secAbbr" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证件类型:" prop="credentialsType">
                  <el-select placeholder="请选择" v-model="form_data_sqzz.param.credentialsType" size="mini">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in var18_items" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件代码:" prop="idNo">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.stkCode" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="万德一级行业:" prop="potentialOrg.windPriIndustry">

                  <el-select placeholder="请选择" v-model="form_data_sqzz.param.potentialOrg.windPriIndustry" size="mini" @change="windPriIndustryChange">
                    <el-option key="" label="请选择" value=""></el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in items_windPriIndustry" />
                  </el-select>


                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="万德二级行业:" prop="potentialOrg.windSndIndustry">
                  <el-select placeholder="请选择" v-model="form_data_sqzz.param.potentialOrg.windSndIndustry" size="mini">
                    <el-option key="" label="请选择" value=""></el-option>
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in industryCodeList" />
                  </el-select>


                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册资本（元）:" prop="potentialOrg.regCptl">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.regCptl" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="省份:" prop="potentialOrg.province">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.province" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业性质:" prop="potentialOrg.companyProp">
                  <el-select placeholder="请选择" v-model="form_data_sqzz.param.potentialOrg.companyProp" size="mini">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in var21_items" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城市:" prop="potentialOrg.city">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.city" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="产业分类:" prop="potentialOrg.industryClass">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.industryClass" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="成立日期:" prop="param.potentialOrg.setupDate">

                  <el-date-picker v-model="form_data_sqzz.param.potentialOrg.setupDate"
                  type="date" format="yyyy-MM-dd"
                  value-format="yyyyMMdd" 
                  placeholder="选择日期">
                </el-date-picker>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主营业务:" prop="potentialOrg.mainBiz">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.mainBiz" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册地址:" prop="potentialOrg.regAddr">
                  <el-input v-model="form_data_sqzz.param.potentialOrg.regAddr" placeholder="" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="doSqzzSave" size="mini" id="yh-confirm">
            <i class="fa fa-check diologBtn"></i>确 定</el-button>
          <el-button @click="applyForRegularShow = false" size="mini" id="yh-cancel">
            <i class="fa fa-close diologBtn"></i> 取 消</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {
  regCustManageDelete,
  regCustManageGetInfo,
  regCustManageSqzz
} from "@/api/organization/custmanage/regcustmanage/RegCustManage/index.js";
import { JSONValue2JSON } from "@/utils/datahandle.js";
import DICTYPE from "@/utils/dictTypes.js";
import { dictFilter, dictItems, treeDictItems } from "@/filters";
import "@/filters/filters.js";

export default {
  name: "RegisteredCustomerList",
  props: [],
  data() {
    return {
      applyForRegularShow: false,
      regType: "1",
      form_data_getInfo: {
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          orderBy: "",
          pages: 1
        },
        param: {
          uuid: "" //UUID
        }
      },
      form_data_sqzz: {
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          orderBy: "",
          pages: 1
        },
        param: {
          uuid: "", //UUID
          custName: "", //客户简称
          CustFullName: "", //客户名称
          idNo: "", //证券号码
          credentialsType: "", //证件类型
          potentialOrg: {
            stkCode: "", //证券代码
            secAbbr: "", //客户简称
            windPriIndustry: "", //万德一级行业
            windSndIndustry: "", //万德二级行业
            regCptl: "", //注册资本
            province: "", //省份
            city: "", //城市
            companyProp: "", //公司属性
            industryClass: "", //产业分类
            setupDate:"", //成立日期
            mainBiz: "", //主营业务
            regAddr: "", //注册地址
            uuid: ""
          },

          between: {}
        }
      },

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
      //删除提供的参数
      form_data_del: {
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          orderBy: "",
          pages: 1
        },
        param: {
          uuid: ""
        }
      },
      imgsrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524561178684&di=f53bbaa982ccf94aa2e5256692bdfb33&imgtype=0&src=http%3A%2F%2Fimg2.99114.com%2F2014%2F10181%2F6%2F12%2F39643183.jpg",
      company_name: "个人客户",
      p_show: true,
      Developer: "张三",
      DeveloperStatus: "正常开发",
      DeveloperDepartment: "证券金融总部",
      CustomerSource: "投型潜客",
      centerInfoList: {
        category: "民营企业",
        province: "海南省",
        city: "海口市",
        MainProduct: "电器",
        DateOfListing: "2014-12-23",
        ROE: "7.27%",
        NetProfit: "749.23"
      },
      names: [
        {
          name: "经纪业务总部"
        },
        {
          name: "证券金融总部"
        },
        {
          name: "研究院"
        }
      ],
      mores: [
        {
          name: "上海交易所"
        },
        {
          name: "A股"
        },
        {
          name: "主板"
        }
      ],

      //一级行业
      items_windPriIndustry: dictItems(DICTYPE.CTCCD0232),

      industryCodeList: [],

      var18_items: [
        {
          label: "统一社会信用代码",
          value: "1"
        },
        {
          label: "营业执照",
          value: "2"
        },
        {
          label: "组织机构代码",
          value: "3"
        },
        {
          label: "税务登记证",
          value: "4"
        }
      ],
      var19_items: [
        {
          label: "农林、牧、渔业",
          value: "1"
        },
        {
          label: "采矿业",
          value: "2"
        },
        {
          label: "制造业",
          value: "3"
        },
        {
          label: "建筑业",
          value: "4"
        }
      ],
      var20_items: [
        {
          label: "农业",
          value: "1"
        },
        {
          label: "渔业",
          value: "2"
        },
        {
          label: "畜牧业",
          value: "3"
        },
        {
          label: "林业",
          value: "4"
        }
      ],
      var21_items: [
        {
          label: "中央国有",
          value: "1"
        },
        {
          label: "地方国企",
          value: "2"
        },
        {
          label: "民营企业",
          value: "3"
        },
        {
          label: "外资企业",
          value: "4"
        }
      ],
      departmentlabels: [
        {
          value: "1",
          label: "经纪业务总部"
        },
        {
          value: "2",
          label: "衍生产品总部"
        },
        {
          value: "3",
          label: "产品中心"
        },
        {
          value: "4",
          label: "证券金融总部"
        },
        {
          value: "5",
          label: "投资研究"
        },
        {
          value: "6",
          label: "银河金汇"
        },
        {
          value: "7",
          label: "投资银行总部"
        },
        {
          value: "8",
          label: "债券投资部"
        }
      ],
      departmentlabeloptions: [
        {
          value: "1",
          label: "产品中心"
        },
        {
          value: "2",
          label: "银河金汇",

          disabled: true
        },
        {
          value: "3",
          label: "投资中心"
        }
      ],
      exchangeoption: [
        {
          value: "1",
          label: "北京交易所"
        },
        {
          value: "2",
          label: "上海交易所"
        },
        {
          value: "3",
          label: "深圳交易所 "
        }
      ],

      stockmarketoption: [
        {
          value: "1",
          label: "A股"
        },
        {
          value: "2",
          label: "B股"
        }
      ],

      plateoption: [
        {
          value: "1",
          label: "主板"
        },
        {
          value: "2",
          label: "中小板"
        },
        {
          value: "3",
          label: "创业板"
        },
        {
          value: "4",
          label: "新三板"
        }
      ],
      provinceoption: [
        {
          value: "1",
          label: "北京"
        },
        {
          value: "2",
          label: "上海"
        },
        {
          value: "3",
          label: "广州"
        },
        {
          value: "4",
          label: "深圳"
        }
      ],
      dictypeObj: DICTYPE
    };
  },
  created: {},
  methods: {
    //一级行业转码
    WindPriIndustryFormatter(code) {
      return dictFilter(DICTYPE.CTCCD0232, code);
    },
    //二级行业转码
    WindSndIndustryFormatter(code) {
      return dictFilter(DICTYPE.CTCCD0233, code);
    },
    //客户类型转码
    RegCustTypeFormatter(code) {
      if ("1" == code) {
        return "上市";
      } else if ("2" == code) {
        return "非上市";
      } else if ("0" == code) {
        return "个人";
      }
    },
    //客户来源转码
    RegSrcFormatter(code) {
      return dictFilter(DICTYPE.CTCCD0205, code);
    },

    //一级行业联动二级行业
    windPriIndustryChange() {
      this.form_data_sqzz.param.potentialOrg.windSndIndustry = "";
      let docName =
        DICTYPE.CTCCD0232 +
        "-" +
        this.form_data_sqzz.param.potentialOrg.windPriIndustry;
      this.industryCodeList = treeDictItems(docName);
    },
    doEdit(uuid){
      this.getUuid(uuid);
      this.$router.push({ path: "/CustomerManagement/RegisteredCustomerManagement/PanoramicViewRegCust" });
    },
    doDelete() {
      /*
          if(0==this.selectArr.length){
            this.$message({
              type: 'warning',
              message: '请至少选择一条数据删除!'
            });
            return;
          }; */
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form_data_del.param.uuid = this.topInfoList.CustPotentialIndividualVO.Uuid;

          regCustManageDelete(this.form_data_del)
            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //删除成功后刷新列表
              this.$emit("queryPage");
            })
            .catch(() => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },

    //-----------------------------------------------------------------客户名称的路由跳转
    routerClick(uuid, number, type, item) {
      this.getUuid(uuid);
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
      if (this.manageFlag == "true") {
        this.$router.push({
          path:
            "/CustomerManagement/RegisteredCustomerManagement/PanoramicViewRegCust",
          query: {
            uuid: uuid,
            custNo: number,
            custType: type,
            MyName: "formal",
            IsStrategyCustFlag: item.StrategyCustFlag
          }
        });
      } else {
        this.$router.push({
          path:
            "/CustomerManagement/RegisteredCustomerManagement/PanoramicViewRegCust",
          query: {
            uuid: uuid,
            custNo: number,
            custType: type,
            MyName: ""
          }
        });
      }
    },

    regTypeChange() {
      if (this.regType == 3) {
        //跳转至零售个人客户潜在客户注册界面
        this.$router.push({
          path: "/CustomerManagement/RegisteredCustomerManagement/RegCustQuery"
        });
      }
    },
    //每页数量改变
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.$emit("queryPage", this.pageInfo);
    },
    //申请转正
    doSqzz() {

      this.form_data_getInfo.param.uuid = this.topInfoList.CustPotentialIndividualVO.Uuid;
      regCustManageGetInfo(this.form_data_getInfo)
        .then(response => {
          //根据ID得到数据后 进行JSON转换，把父JSON中的数据 录入给子JSON
          JSONValue2JSON(this.form_data_sqzz.param, response.Data);
          //日期处理（后台给的八位数字类型，此处转为字符串）
          this.form_data_sqzz.param.potentialOrg.setupDate = this.form_data_sqzz.param.potentialOrg.setupDate?this.form_data_sqzz.param.potentialOrg.setupDate.toString():"";
          

          let ejhy = this.form_data_sqzz.param.potentialOrg.windSndIndustry;

          this.windPriIndustryChange();

          this.form_data_sqzz.param.potentialOrg.windSndIndustry = ejhy;
          
          this.applyForRegularShow = true;
          

        })
        .catch(() => {
          //alert("访问出错");
        });

    },
    doSqzzSave() {
      //alert("@@@"+this.form_data_sqzz.param.potentialOrg.uuid);
      //return;
      regCustManageSqzz(this.form_data_sqzz)
        .then(response => {
          this.$message({
            type: "success",
            message: "申请成功!"
          });
          this.applyForRegularShow = false;
        })
        .catch(() => {
          //alert("访问出错");
        });
    },
    getUuid(uuid) {
      this.$store.dispatch("setUuid_RegCust", uuid);
    }
  },
  props: ["manageFlag", "topInfoList", "pageInfo"]
};
</script>

<style lang="scss" scoped>
.yh_RegisteredCustomerList {
  height: 110px;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeee0;
}

.company_logo {
  width: 120px;
  height: 100%;
  overflow: hidden;
}

.company_logo .logo_box {
  margin-top: 20px;
  margin-left: 48px;
  position: relative;
  width: 60px;
  height: 70px;
}

.company_logo .logo_box img {
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 0 auto;
  overflow: hidden;
  left: -25px;
  top: -3px;
}

.company_logo .logo_box span {
  display: block;
  position: relative;
  left: -25px;
  top: 0px;
  text-align: center;
  width: 60px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  font-family: "微软雅黑";
  color: #999;
}

/* 客户的信息展示区域 */

.company_main {
  height: 100%;
  position: relative;
}

/* 注册区域 */

.register {
  position: absolute;
  top: 22px;
  right: 0;
  text-align: right;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}

.register a {
  height: 20px;
  color: #676767;
  padding: 0 6px;
  margin: 0 2px;
  border-radius: 8px;
}

.register a i {
  margin-right: 3px;
}

.register p {
  width: 100%;
  height: 100%;
  text-align: right;
  margin-top: 20px;
}

.register p span {
  padding-left: 0;
  padding-right: 17px;
  border: none;
}

.register p span:nth-child(1) {
  border-right: 2px solid #919191;
}

/* 主要信息区域 */

.company_main span {
  margin-top: 10px;
  color: #666666;
  font-size: 12px;
}

.main_top {
  height: 30px;
  margin-top: 12px;
  line-height: 30px;
  overflow: hidden;
}

.main_top > * {
  float: left;
}

.main_top h3 a {
  font-size: 16px;
  color: #374b91;
  font-weight: 500;
  padding-right: 10px;
}

.main_top a:nth-child(2) {
  text-decoration: underline;
  color: #0000ff;
  padding-right: 10px;
}

.main_top a:nth-child(2):link {
  color: #ff00ff;
}

.yh-jbxxx {
  margin-top: 23px;
}
.main {
  float: left;
  .yh-archives-institution {
    width: 120px;
    height: 110px;
    position: relative;
    p {
      position: absolute;
      width: 36px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      border-radius: 7px;
      background-color: #b26803;
      color: #fff;
      font-size: 12px;
      left: 26%;
      top: 86px;
    }

    .yh-institution-img {
      position: absolute;
      top: 4%;
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
        height: 20px;
        overflow: hidden;
      }
    }
  }
}

.yh-jbxxx li {
  width: 100%;
  float: left;
  margin-left: 10px;
  list-style-image: url(../../../../assets/organization/customermanage/ico.jpg);

  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}

/* 已被访问的链接 */

.main_center {
  overflow: hidden;
  height: 30px;
  line-height: 28px;
  border-bottom: dotted 1px #ddd;
}

.main_center span:nth-child(1) {
  border: none;
  padding-right: 7px;
  width: 445px;
}

.main_center span:nth-child(2),
.main_center span:nth-child(3),
.main_center span:nth-child(4),
.main_center span:nth-child(5) {
  border: none;
  border-left: solid 2px #ddd;
  padding-left: 10px;
  padding-right: 7px;
}

.main_bottom {
  height: 30px;
  line-height: 30px;
}

.main_bottom span:nth-child(1) {
  border: none;
  padding-left: 0;
}

.main_bottom > * {
  float: left;
}

.main_bottom h6 {
  width: 100%;
  height: 100%;
}

.main_bottom h6 a {
  display: inline-block;
  font-size: 13px;
  color: #e7a04e;
  font-weight: bold;
}

.main_bottom h6 span {
  border: none;
  padding-left: 5px;
  padding-right: 0;
  width: 120px;
}

.el-date-editor {
  width: 100%;
}

.fullNameClass {
  max-width: 220px;
}
.custNameClass {
  white-space: nowrap; /*强制span不换行*/
  //display: inline-block;  /*将span当做块级元素对待*/
  // width: 32px;  /*限制宽度*/
  overflow: hidden; /*超出宽度部分隐藏*/
  text-overflow: ellipsis; /*超出部分以点号代替*/
  //line-height: 0.9;  /*数字与之前的文字对齐*/
  max-width: 150px;
}
.windPriIndustryClass {
  white-space: nowrap;
  overflow: hidden; /*超出宽度部分隐藏*/
  text-overflow: ellipsis; /*超出部分以点号代替*/
  max-width: 140px;
}
.windSndIndustryClass {
  white-space: nowrap; /*强制span不换行*/
  overflow: hidden; /*超出宽度部分隐藏*/
  text-overflow: ellipsis; /*超出部分以点号代替*/
  max-width: 150px;
}
.yh_RegisteredCustomerList .company_main .main_top span {
  /*ouxinsu*/
  display: block;
  height: 14px;
  line-height: 14px;
  border-left: solid 2px #ddd;
  float: left;
  padding: 0 10px 0 6px;
}
</style>
