<template>
  <div class="yh_BondTab">
    <!-- 我的正式客户，债券页面 -->
    <el-form :model="form_data" ref="form_data" size="mini" label-width="170px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务类型:" prop="serverType">
            <el-checkbox-group v-model="form_data.serverType">
              <el-checkbox-button :key="item.key" :label="item.key" @change="checkedChange(item,1)" v-for="item in serviceTypeList">{{item.value}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="天天利资格申请日期:" prop="startTime">
            <el-date-picker v-model="form_data.startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属营业部:" prop="actualController">
            <el-input placeholder="请输入部门" v-model="form_data.actualController" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户经理:" prop="role">
            <el-input placeholder="请输入经理名称" v-model="form_data.role" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否有水一资格:" prop="qualifications">
            <el-radio-group v-model="form_data.qualifications">
              <el-radio-button :key="item.key" :label="item.key" v-for="item in qualificationsList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="有否购买收益凭证:" prop="profit">
            <el-radio-group v-model="form_data.profit">
              <el-radio-button :key="item.key" :label="item.key" v-for="item in profitList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否够买代销理财:" prop="sellOff">
            <el-radio-group v-model="form_data.sellOff">
              <el-radio-button :key="item.key" :label="item.key" v-for="item in sellOffList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import global_ from "@/common/Global";
  import {
    doRequestPost,
    doRequestGet
  } from "@/utils/request";
  export default {
    name: "BondTab",
    data() {
      return {
        resetinput: {
          //重置inputrange的值
        },
        form_data: {
          startTime: "", //开户时间
          actualController: "", //所属营业部
          role: "", //客户经理
          department: "", //投行业务部门
          qualifications: "", //资格
          profit: "", //收益凭证
          serverType: [""], //业务类型
          sellOff: "", //代销理财
        },
        qualificationsList: [
          //资格
          {
            value: "是",
            key: "1"
          },
          {
            value: "否",
            key: "0"
          }
        ],
        profitList: [
          //收益凭证
          {
            value: "是",
            key: "1"
          },
          {
            value: "否",
            key: "0"
          }
        ],
        serviceTypeList: [{
            value: "不限",
            key: ""
          },
          {
            value: "IPO",
            key: "01"
          },
          {
            value: "可转债",
            key: "02"
          }
        ],
        sellOffList: [ //代销理财
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
          default:
            break;
        }
      },
      uploadValue(data) { //点击查询向上传值
      var data = {
        advSearchType : "03",//投行
        isBoughtComFinPrd:this.form_data.sellOff,//有否购买代销理财
        isBoughtPayOffVou:this.form_data.profit,//有否购买收益凭证 
        isSetupMercuryNo1:this.form_data.qualifications,//是否有水一资格
        orgNoForAdv:this.form_data.actualController,//归属营业部
        srvMagNoForAdv:this.form_data.role,//客户经理
        betweenInfo:{
          fromTtl:this.form_data.startTime[0] ? this.form_data.startTime[0] : null,//开始时间
          toTtl:this.form_data.startTime[1] ? this.form_data.startTime[1] : null,//结束时间
        }
      }
      this.$emit("formList",data)
      },
      resetForm(value) {
        //暴露给父组件调用的方法  查询列表组件的点击查询更多调的方法
        this.$refs["form_data"].resetFields(); //重置本页面的form；
      }
    },
    mounted: function () {}
  };

</script>

<style scoped>


</style>
