<template>
  <div class="yh_DerivativeTab">
    <!-- 我的正式客户，衍生品页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务类型:" prop="serverType">
            <el-checkbox-group v-model="form_data.serverType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in serverTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户大类:" prop="maxType">
            <el-checkbox-group v-model="form_data.maxType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,2)" v-for="item in maxTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户小类:" prop="minType">
            <el-checkbox-group v-model="form_data.minType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,3)" v-for="item in minTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户等级:" prop="grade">
            <el-checkbox-group v-model="form_data.grade">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,4)" v-for="item in gradeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户状态:" prop="state">
            <el-checkbox-group v-model="form_data.state">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,5)" v-for="item in stateList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户风险:" prop="risk">
            <el-checkbox-group v-model="form_data.risk">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,6)" v-for="item in riskList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
            <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="资金账号开通标识:" prop="openLogo">
            <el-radio-group v-model="form_data.openLogo">
              <el-radio-button :key="item.key" :label="item.key" v-for="item in openLogoList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否愿意提供券源:" prop="source">
            <el-radio-group v-model="form_data.source">
              <el-radio-button :key="item.key" :label="item.key" v-for="item in sourceList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否限售股客户:" prop="limitedSale">
            <el-radio-group v-model="form_data.limitedSale">
              <el-radio-button :key="item.key" :label="item.key" v-for="item in limitedSaleList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="12">
          <el-form-item label="归属营业部:" prop="role">
            <el-input style="width:220px;" placeholder="请输入归属营业部" v-model="form_data.role" />
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="12">
          <el-form-item label="开户日期:" prop="startTime">
            <el-date-picker v-model="form_data.startTime" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="12">
          <el-form-item label="销户日期:" prop="endtTime">
            <el-date-picker v-model="form_data.endtTime" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
export default {
  name: "DerivativeTab",
  data() {
    return {
      form_data: {
        serverType: [""], //业务类型
        maxType: [""], //客户大类
        risk: [""], //客户风险
        state: [""], //客户状态
        minType: [""], //客户小类
        grade: [""], //客户等级
        openLogo: "", //资金账号开通标识
        source: "", //是否愿意提供券源
        limitedSale: "", //是否限售股客户
        startTime: [], //开户时间
        endtTime: "", //销户时间
        role: "" //归属营业部
      },
      serverTypeList: [
        //业务类型数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "集合理财",
          key: "01"
        },
        {
          value: "定向理财",
          key: "02"
        },
        {
          value: "专项理财",
          key: "03"
        }
      ],
      maxTypeList: [
        //客户大类数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "国有银行",
          key: "01"
        },
        {
          value: "股份银行",
          key: "02"
        },
        {
          value: "其他商业银行",
          key: "03"
        },
        {
          value: "其他金融机构",
          key: "04"
        },
        {
          value: "上市公司（股东）",
          key: "05"
        },
        {
          value: "政府平台（企业、集团）",
          key: "06"
        },
        {
          value: "一般个人客户",
          key: "07"
        },
        {
          value: "高净值个人客户",
          key: "08"
        },
        {
          value: "其他",
          key: "09"
        }
      ],
      riskList: [
        //客户风险数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "积极型",
          key: "01"
        },
        {
          value: "稳健型",
          key: "02"
        },
        {
          value: "保守型",
          key: "03"
        },
        {
          value: "相对保守",
          key: "04"
        },
        {
          value: "相对稳健",
          key: "05"
        }
      ],
      stateList: [
        //客户状态数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "正常",
          key: "01"
        },
        {
          value: "冻结",
          key: "02"
        },
        {
          value: "挂失",
          key: "03"
        },
        {
          value: "休眠已确认",
          key: "04"
        },
        {
          value: "销户",
          key: "05"
        }
      ],
      minTypeList: [
        //客户小类数据
        {
          value: "不限",
          key: ""
        },
        {
          value: "定向",
          key: "01"
        },
        {
          value: "专项",
          key: "02"
        },
        {
          value: "集合",
          key: "03"
        }
      ],
      gradeList: [
        //客户等级
        {
          value: "不限",
          key: ""
        },
        {
          value: "主动",
          key: "01"
        },
        {
          value: "通道",
          key: "02"
        }
      ],
      openLogoList: [
        //资金账号开通标识数据
        {
          value: "是",
          key: "1"
        },
        {
          value: "否",
          key: "0"
        }
      ],
      sourceList: [
        //是否愿意提供券源
        {
          value: "是",
          key: "1"
        },
        {
          value: "否",
          key: "0"
        }
      ],
      limitedSaleList: [
        //是否限售股客户
        {
          value: "是",
          key: "1"
        },
        {
          value: "否",
          key: "0"
        }
      ]
    };
  },
  methods: {
    checkedChange(item, index) {
      //监听多选框的变化
      switch (index) {
        case 1: //业务类型
          if (
            this.form_data.serverType[0] == "" &&
            this.form_data.serverType.length > 1
          ) {
            this.form_data.serverType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.serverType.splice(0);
            this.form_data.serverType.push("");
          }
          break;
        case 2: //客户大类
          if (
            this.form_data.maxType[0] == "" &&
            this.form_data.maxType.length > 1
          ) {
            this.form_data.maxType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.maxType.splice(0);
            this.form_data.maxType.push("");
          }
          break;
        case 3: //业务类型
          if (
            this.form_data.minType[0] == "" &&
            this.form_data.minType.length > 1
          ) {
            this.form_data.minType.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.minType.splice(0);
            this.form_data.minType.push("");
          }
          break;
        case 4: //业务类型
          if (
            this.form_data.grade[0] == "" &&
            this.form_data.grade.length > 1
          ) {
            this.form_data.grade.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.grade.splice(0);
            this.form_data.grade.push("");
          }
          break;
        case 5: //客户状态
          if (
            this.form_data.state[0] == "" &&
            this.form_data.state.length > 1
          ) {
            this.form_data.state.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.state.splice(0);
            this.form_data.state.push("");
          }
          break;
        case 6: //客户风险
          if (this.form_data.risk[0] == "" && this.form_data.risk.length > 1) {
            this.form_data.risk.splice(0, 1);
          }
          if (item.value == "不限") {
            this.form_data.risk.splice(0);
            this.form_data.risk.push("");
          }
          break;
        default:
          break;
      }
    },
    uploadValue(data) {
      //向上传值
      var data = {
        advSearchType: "08", //研究院
        legPerCate: this.form_data.minType.toString(), //	客户小类
        custLvl: this.form_data.grade.toString(), //			客户级别
        riskLvl: this.form_data.risk.toString(), //			客户风险
        custSts: this.form_data.state.toString(), //		客户状态
        betweenInfo: {
          fromOpTime: this.form_data.startTime[0]? this.form_data.startTime[0] : null, //开户日期(左)
          toOpTime: this.form_data.startTime[1]? this.form_data.startTime[0] : null, //	开户日期(右)
          fromEndTime: this.form_data.endtTime[0]? this.form_data.endtTime[0] : null, //	销户日期（左）
          toEndTime: this.form_data.endtTime[1]? this.form_data.endtTime[0] : null //	销户日期（右）
        },
        isProvideVoucher: this.form_data.source, // 是否愿意提供券源		1:是  0：否
        isRestrictShareCust: this.form_data.limitedSale, //是否限售股客户		1：是 0：否
        orgNoForAdv: this.form_data.role //		归属营业部
      };
      this.$emit("formList", data);
    },
    resetForm(value) {
      //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
      this.$refs["form_data"].resetFields(); //重置本页面的form；
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>
