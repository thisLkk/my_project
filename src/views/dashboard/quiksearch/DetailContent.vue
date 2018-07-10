<template>
  <!-- 正式客户查询 __ 客户列表展示（正在使用） -->
  <div class="yh-archives clearfix">
    <div class="yh-archives-all">
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div v-show="lists.length" class="yh-archives-all-main clearfix" v-for="(item, index) in lists" :key="index">
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
                      {{item.CustFullName?item.CustFullName:"(暂无名称信息)"}}
                      <!--<a @click="routerClick(item.Uuid,item.CustNo,item.IndividualFlag)" href="javascript:void(0)">{{item.CustFullName?item.CustFullName:"(暂无名称信息)"}}</a>-->
                    </li>
                    <li class="number">{{item.CustNo?item.CustNo:"(暂无编号信息)"}}</li>
                  <li class="sex" v-show="item.IndividualFlag =='1'">{{item.CorpNature ? item.CorpNature  :"(码值测试)"}}</li>
                  <li class="age" v-show="item.IndividualFlag =='0'">{{item.Age ? item.Age + "岁": "(暂无年龄信息)"}}</li>
                  <li class="age" v-show="item.IndividualFlag =='1'">{{item.IndustryCode ? item.IndustryCode : "(暂无行业信息)"}}</li>
                  <li class="education"  v-show="item.IndividualFlag =='0'">{{item.EduCode == "1" ? "本科" : item.EduCode == "2" ? "硕士" : "(暂无学历信息)"}}</li> -->
                    <li class="type">证件类型：{{item.CredentialsType}}</li>
                    <li class="type_number">证件号码：{{item.IdNo ? item.IdNo : "(暂无证件号信息)"}}</li>
                  </ul>
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
                  <span v-for="(ite,index) in item.DepLblList" :key="index">{{ite}}</span>
                </div>
                <div class="contact fr">
                  <span>归属机构：{{item.OrgName ? item.OrgName : "暂无"}}</span>
                  <span>服务经理：{{item.SrvMagName ? item.SrvMagName : "暂无"}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!lists.length" class="yh-data">暂无数据</div>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import { checkAllChange } from "@/utils/datahandle.js"; //----------------------------多选的方法
import { dictItems, dictFilter } from "@/filters"; //---------------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //----------------------------------------数据字典的方法
export default {
  name: "InstitutionFormalCustomerQuery",
  props: {
    lists: {
      type: Array,
      default: ""
    },
  },
  data() {
    return {
      checkAll: false, //------------------------判断全选
      checkedCities: [], //----------------------判断全选
      cities: [], //-----------------------------判断全选(含有所有列表中的Uuid)
      isIndeterminate: true, //------------------判断全选
      UUid: [], //-------------------------------添加分组要的id
      Establish: "", //--------------------------创建人
      EstablishTime: null, //--------------------创建时间
      addCustomerGroupDialog: false, //----------添加分组窗口关闭开启判断标识符
      dialogVisible_: false, //------------------添加分组的窗口提示
      form_data_group: {
        groupName: "", //------------------------分组新增
        groupDetaile: "" //----------------------分组描述
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
        ); //------------------------------------------------------------------------回显证件号码数据字典转换
        this.cities.push(item.Uuid); //---------------------------------------------全选赋值
      });
    }
  },
  created() {
    this.Establish = this.$store.getters.userName; //------------------------------回显登录人姓名
    if (this.$props.lists != null) {
      this.$props.lists.forEach(item => {

        item.OrgName = dictFilter(DICTYPE.CTCCD0998, item.OrgNo); //------回显证件号码数据字典转换

        item.CredentialsType = dictFilter(
          DICTYPE.EDW10031,
          item.CredentialsType
        ); //-----------------------------------------------------------------------回显证件号码数据字典转换
        this.cities.push(item.Uuid); //---------------------------------------------全选赋值
      });
    }
  },
  methods: {
    routerClick(uuid, number, type) {
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
          custType: type
        }
      });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh-archives {
  min-height: 120px;
  box-sizing: border-box;
  font-size: 14px;
  .yh-data{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    margin-top: 12px;
    color: #999;
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
    background:#FFF;
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
        width: 120px;
        height: 120px;
        position: relative;
        .yh-institution-img {
          position: absolute;
          top: 15%;
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
      /* 主要数据位置 */
      .yh-archives-main {
        height: 110px;
        box-sizing: border-box;
        padding: 5px 0;
        .yh-main-info {
          width: 100%;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          
          .yh-main-info-self {
            max-width: 86%;
            box-sizing: border-box;
            ul {
              li {
                float: left;
                padding: 0 10px;
                margin-top: 10px;
                font-size: 12px;
                box-sizing: border-box;
                height: 20px;
                line-height: 20px;
                border-left: 2px solid #ddd;
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
          border-bottom:dotted 1px #ddd
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
