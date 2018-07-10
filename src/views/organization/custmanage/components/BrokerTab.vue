<template>
  <div class="yh_BrokerTab">
    <!-- 正式客户经纪业务板块 -->
    <!-- <div>
      <a href="javascript:void(0)" v-for="(item,index) in queryTemplate" :key="index"></a>
    </div> -->
    <el-form :model="form_data" label-width="170px" ref="form_data">
      <el-row>
        <el-col :span="12">
          <el-form-item label="开户时间:" prop="startTime">
            <el-date-picker v-model="form_data.startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金余额(万元):" prop="capital">
            <inputRange :ref="resetinput.C" name="capital" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="业务起止日期:" prop="businessStartTime">
            <el-date-picker v-model="form_data.businessStartTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总资产(万元):" prop="allCapital">
            <inputRange :ref="resetinput.A" name="allCapital" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="总市值(万元):" prop="marketValue">
            <inputRange :ref="resetinput.B" name="marketValue" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>



      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户级别:" prop="customerLevel">
            <el-checkbox-group v-model="form_data.customerLevel" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in customerLevelList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="风险等级:" prop="riskLevel">
            <el-checkbox-group v-model="form_data.riskLevel" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in riskLevelList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务类型:" prop="businessType">
            <el-checkbox-group v-model="form_data.businessType" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in businessTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="账户状态:" prop="accountState">
            <el-checkbox-group v-model="form_data.accountState" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,4)" v-for="item in accountStateList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年股基净佣金(元):" prop="NetCommission">
            <inputRange :ref="resetinput.D" name="NetCommission" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="年股基交易量:" prop="yearTransaction">
            <inputRange :ref="resetinput.E" name="yearTransaction" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="普通股基佣金率(‰):" prop="ordinaryCommission">
            <inputRange :ref="resetinput.F" name="ordinaryCommission" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="担保股基佣金率(‰):" prop="guaranteeCommission">
            <inputRange :ref="resetinput.G" name="guaranteeCommission" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="信用股基佣金率(‰):" prop="creditCommission">
            <inputRange :ref="resetinput.H" name="creditCommission" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="最近一笔A股佣金率(‰):" prop="latelyCommission">
            <inputRange :ref="resetinput.M" name="latelyCommission" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="股基周转率:" prop="turnover">
            <inputRange :ref="resetinput.L" name="turnover" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄:" prop="age">
            <inputRange :ref="resetinput.K" name="age" @inputValue="inputValue"></inputRange>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="当前持仓:" prop="position" size="mini">
            <el-input placeholder="输入完整产品代码" style="width:75%" v-model="form_data.position" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-form-item label="投资偏好:" prop="preference">
            <el-checkbox-group v-model="form_data.preference" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,5)" v-for="item in preferenceList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="" prop="other">
            <el-input placeholder="其他" v-model="form_data.other" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="计划投资偏好:" prop="planPreference">
            <el-checkbox-group v-model="form_data.planPreference" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,6)" v-for="item in planPreferenceList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-form-item label="沪深市值归集率:" prop="aggregationRate">
            <el-checkbox-group v-model="form_data.aggregationRate" size="mini">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,7)" v-for="item in aggregationRateList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="" prop="custom">
            <el-input placeholder="自定义" v-model="form_data.custom" id="yh-input1" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div class="yh-querytemplate">
      <el-button size="mini" id="el_query" @click="keep()">保存查询模板</el-button>
    </div> -->
  </div>
</template>

<script>
  import global_ from "@/common/Global";
  import {
    doRequestPost,
    doRequestGet
  } from "@/utils/request";
  import inputRange from "@/views/organization/components/InputRange";
  export default {
    name: "BrokerTab",
    components: {
      inputRange
    },
    data() {
      return {
        queryTemplate: [], //查询模板
        resetinput: {
          A: "A",
          B: "B",
          C: "C",
          D: "D",
          E: "E",
          F: "F",
          G: "G",
          H: "H",
          M: "M",
          L: "L",
          K: "K",
        },
        form_data: {
          startTime: "", //开户时间
          capital: "", //资金金额
          allCapital: "", //总资金
          marketValue: "", //总市值
          yearTransaction: "", //年股交易量
          businessStartTime: "", //业务起止日期 用于储存
          customerLevel: [""], //客户级别
          riskLevel: [""], //风险等级
          businessType: [""], //业务类别
          accountState: [""], //账户状态
          NetCommission: "", //年股基净佣金
          ordinaryCommission: "", //普通股基佣金率
          guaranteeCommission: "", //担保股基佣金率
          creditCommission: "", //信用股基佣金率
          latelyCommission: "", //最近一笔A股佣金率
          position: "", //当前持仓
          turnover: "", //股基周转率
          age: "", //年龄
          preference: [""], //投资偏好
          other: "", //其他
          planPreference: [""], //计划投资偏好
          aggregationRate: [""], //沪深市值归集率
          custom: "", //自定义
        },
        customerLevelList: [ //客户级别数据
          {
            value: "不限",
            key: ""
          },
          {
            value: "普通",
            key: "2"
          },
          {
            value: "VIP-A",
            key: "3"
          },
          {
            value: "VIP-B",
            key: "4"
          },
          {
            value: "VIP-C",
            key: "5"
          },
          {
            value: "VIP-D",
            key: "6"
          },
          {
            value: "VIP-E",
            key: "7"
          },
          {
            value: "VIP-F",
            key: "8"
          },
          {
            value: "核心-A",
            key: "9"
          },
          {
            value: "核心-B",
            key: "10"
          },
          {
            value: "潜力-A",
            key: "11"
          },
          {
            value: "潜力-B",
            key: "12"
          }
        ],
        riskLevelList: [ //风险等级
          {
            value: "不限",
            key: ""
          },
          {
            value: "积极型",
            key: "2"
          },
          {
            value: "稳健型",
            key: "3"
          },
          {
            value: "保守型",
            key: "4"
          },
          {
            value: "相对保守",
            key: "5"
          },
          {
            value: "相对稳健",
            key: "6"
          }
        ],
        businessTypeList: [ //业务类别
          {
            value: "不限",
            key: ""
          },
          {
            value: "正常",
            key: "2"
          },
          {
            value: "冻结",
            key: "3"
          },
          {
            value: "挂失",
            key: "4"
          },
          {
            value: "休眠已确认",
            key: "5"
          },
          {
            value: "销户",
            key: "6"
          }
        ],
        accountStateList: [ //账户状态
          {
            value: "不限",
            key: ""
          },
          {
            value: "正常",
            key: "2"
          },
          {
            value: "冻结",
            key: "3"
          },
          {
            value: "挂失",
            key: "4"
          },
          {
            value: "休眠已确认",
            key: "5"
          },
          {
            value: "销户",
            key: "6"
          }
        ],
        preferenceList: [ //投资偏好
          {
            value: "港股",
            key: ""
          },
          {
            value: "外汇",
            key: "2"
          },
          {
            value: "保险",
            key: "3"
          },
          {
            value: "黄金",
            key: "4"
          },
          {
            value: "古玩",
            key: "5"
          },
          {
            value: "权证",
            key: "6"
          },
          {
            value: "房地产",
            key: "7"
          },
          {
            value: "奢侈品税",
            key: "8"
          },
          {
            value: "风险投资",
            key: "9"
          },
          {
            value: "理财产品",
            key: "10"
          },
          {
            value: "其他产品",
            key: "11"
          },
          {
            value: "复杂金融产品",
            key: "12"
          },
          {
            value: "定向理财计划",
            key: "13"
          },
          {
            value: "期货、融资融券",
            key: "14"
          },
          {
            value: "参与上市公司发行",
            key: "15"
          },
          {
            value: "债券、货币市场基金、债券基金等固定收益类投资品种",
            key: "16"
          },
          {
            value: "股票、混合型基金、偏股型基金、股票型基金等权益类投资品种",
            key: "17"
          },
          {
            value: "股票种",
            key: "18"
          }
        ],
        planPreferenceList: [ //计划投资偏好
          {
            value: "不限",
            key: ""
          },
          {
            value: "0-1年",
            key: "2"
          },
          {
            value: "1-5年",
            key: "3"
          },
          {
            value: "无特别需求",
            key: "4"
          }
        ],
        aggregationRateList: [ //沪深市值归集率
          {
            value: "不限",
            key: ""
          },
          {
            value: "-100%",
            key: "2"
          },
          {
            value: "0-30%",
            key: "3"
          },
          {
            value: "30%-50%",
            key: "4"
          },
          {
            value: "50%-80%",
            key: "5"
          },
          {
            value: "80%-100%",
            key: "6"
          }
        ]
      };
    },
    methods: {
      inputValue(value) { //此处是拿到inputRange的值；
        //子组件传过来的值
        var name = value.name;
        switch (name) {
          case "capital": //资金金额
            // this.form_data.MinRegCptl = value.min;//此处填写后台需要的参数
            // this.form_data.MinRegCptl = value.max;
            break;
          case "allCapital": //总资金
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "marketValue": //总市值
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "NetCommission": //年股基净佣金
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "yearTransaction": //年股基交易量
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "ordinaryCommission": //普通股基佣金率
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "guaranteeCommission": //担保股基佣金率
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "creditCommission": //信用股基佣金率
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "latelyCommission": //最近一笔A股佣金率
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "turnover": //股基佣金率
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          case "age": //年龄
            // this.form_data.MinRegCptl = value.min;
            // this.form_data.MinRegCptl = value.max;
            break;
          default:
            break;
        }
        // //console.log(list)在这里进行整合当前的formdata
        this.uploadValue(list);
      },
      checkedChange(item, index) {
        //监听多选框的变化
        switch (index) {
          case 1: //客户级别
            if (
              this.form_data.customerLevel[0] == "" &&
              this.form_data.customerLevel.length > 1
            ) {
              this.form_data.customerLevel.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.customerLevel.splice(0);
              this.form_data.customerLevel.push("");
            }
            break;
          case 2: //风险等级
            if (
              this.form_data.riskLevel[0] == "" &&
              this.form_data.riskLevel.length > 1
            ) {
              this.form_data.riskLevel.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.riskLevel.splice(0);
              this.form_data.riskLevel.push("");
            }
            break;
          case 3: //业务类型
            if (
              this.form_data.businessType[0] == "" &&
              this.form_data.businessType.length > 1
            ) {
              this.form_data.businessType.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.businessType.splice(0);
              this.form_data.businessType.push("");
            }
            break;
          case 4: //账户状态
            if (
              this.form_data.accountState[0] == "" &&
              this.form_data.accountState.length > 1
            ) {
              this.form_data.accountState.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.accountState.splice(0);
              this.form_data.accountState.push("");
            }
            break;
          case 5: //投资偏好
            if (
              this.form_data.preference[0] == "" &&
              this.form_data.preference.length > 1
            ) {
              this.form_data.preference.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.preference.splice(0);
              this.form_data.preference.push("");
            }
            break;
          case 6: //计划投资偏好
            if (
              this.form_data.planPreference[0] == "" &&
              this.form_data.planPreference.length > 1
            ) {
              this.form_data.planPreference.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.planPreference.splice(0);
              this.form_data.planPreference.push("");
            }
            break;
          case 7: //计划投资偏好
            if (
              this.form_data.aggregationRate[0] == "" &&
              this.form_data.aggregationRate.length > 1
            ) {
              this.form_data.aggregationRate.splice(0, 1);
            }
            if (item.value == "不限") {
              this.form_data.aggregationRate.splice(0);
              this.form_data.aggregationRate.push("");
            }
            break;
          default:
            break;
        }
      },
      uploadValue(data) { //把结果向上一级组件继续上传
        //  var time_ = []
        // if(this.form_data.startTime.length>1){//此处是处理时间为8位数
        //   this.form_data.startTime.forEach(item => {
        //   var time = item.toISOString().slice(0,10)
        //   time_.push(time)
        // });
        // this.form_data.fromStandingTime =time_[0].replace(/[^\d]/g,"");
        // this.form_data.toStandingTime = time_[1].replace(/[^\d]/g,"");
        // }
        // var data = {
        //   idNo : this.form_data.creditCode,//统一社会信息代码
        //   priSrc:this.form_data.customerType,//客户类型
        //   corpNature:this.form_data.enterpriseNature,//企业性质
        //   prjType:this.form_data.businessType,//项目类型
        //   priPhase:this.form_data.stage,//所处阶段
        //   betweenInfo:{
        //     fromStandingTime:this.form_data.fromStandingTime,//开始时间
        //     toStandingTime:this.form_data.toStandingTime,//结束时间
        //     MinRegCptl:this.form_data.MinRegCptl,//注册资金min
        //     MaxRegCptl:this.form_data.MaxRegCptl,//注册资金max
        //   }
        // }
        this.$emit("formList", this.form_data)
      },
      resetForm(queryCriteriaValue) { //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
        this.$refs["form_data"].resetFields(); //重置本页面的form；
        for (const key in this.resetinput) { //重置inputrange的value
          this.$refs[key].resetForm("value")
        };
      }
    },
    mounted: function () {}
  };

</script>

<style scoped>
  .yh-querytemplate {
    float: right;
    margin: 10px 0;
  }

</style>
