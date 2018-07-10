<template>
  <div >
    <el-form  :model="form_data" ref="form_data"  label-width="80px">
      <el-row>
        <el-col :span="24">
          <div class="yh-headerdiv">
              <span class="yh-headerfl">
                <span class="yh-font">查询条件</span>
              </span>
            <span class="yh-headerfr">
                <div id="yh-advanced" @click="showQuery_()">
                  <i :class="icon"></i>
                </div>
              </span>
          </div>
        </el-col>
      </el-row>
      <div class="showQuery" :class="!showQuery ? 'active' : ''">
        <el-row>
          <el-col :span="24">
            <el-form-item label="机构业务名称:" prop="grpName">
              <el-input  placeholder="请输入内容" v-model="form_data.grpName" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务规则:"  prop="grpIntro">
              <el-input  placeholder="请输入内容" v-model="form_data.grpIntro" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务简介:"  prop="grpDesc">
              <el-input  placeholder="请输入内容" v-model="form_data.grpDesc" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业部收入:"  prop="bizDeptIncomeDesc">
              <el-input  placeholder="请输入内容" v-model="form_data.bizDeptIncomeDesc" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="yh-querybuttons">
              <el-button class="btn-que"  type="primary" @click="doQuery()">查询</el-button>
              <!--<el-button class="btn-rst"  @click="resetParm('form_data')">重置</el-button>-->
              <!--<el-button  @click="jump()">跳转</el-button>-->
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { JSONArrayToString } from "@/utils/datahandle.js";

export default {
  name: "InstBusTargetCustQuery",
  data() {
    return {
      icon: "fa fa-angle-double-up",
      showQuery: true, //---------------------------------------控制查询条件div是否显示
      form_data: {
        //请求参数
        grpName: "", ///机构业务名称
        grpIntro: "", //业务规则
        grpDesc: "", //业务简介
        bizDeptIncomeDesc: "", //营业部收入
        grpLvl: "9",
        queryType: "01" //默认查询我的
      }
    };
  },
  created() {
    //组件生成执行
    this.doQuery();
  },

  methods: {
    //--------------------------------------------------------显示或隐藏搜索页面
    showQuery_() {
      if (this.showQuery) {
        this.showQuery = false;
        this.icon = "fa fa-angle-double-down";
        return;
      } else {
        this.icon = "fa fa-angle-double-up";
        this.showQuery = true;
      }
    },
    doQuery() {
      //查询功能

      if (this.currentTab == "myTargetCust") {
        this.form_data.queryType = "01"; //我的客户
      } else if (this.currentTab == "myTeamCust") {
        this.form_data.queryType = "02"; //我团队的客户
      } else if (this.currentTab == "myDeptCust") {
        this.form_data.queryType = "03"; ////我部门的客户
      } else if (this.currentTab == "allCust") {
        //全部
        this.form_data.queryType = "99"; ////全部的客户
      }

      this.$emit("querylist", JSONArrayToString(this.form_data));
    },
    resetParm(formName) {
      //置空选项
      this.$refs[formName].resetFields();
    },
    jump() {
      this.$router.push({
        path: "/CustomerManagement/FormalCustomerManagement/PanoramicView",
        query: {
          uuid: "6D16B93F2F7F2FCAE053DB0C010A735F",
          custNo: "123456",
          custType: "per"
        }
      });
    }
  },
  props: ["currentTab"]
};
</script>

<style scoped>
.yh-headerdiv {
  height: 40px;
  border-bottom: 1px solid #eeeee9;
}

.yh-headerfl {
  float: left;
  height: 40px;
  line-height: 40px;
}
.yh-headerfr {
  float: right;
  height: 40px;
  width: 30px;
  line-height: 40px;
  border-radius: 8px;
}
.yh-query-content {
  padding: 10px 0;
}
.showQuery {
  margin-top: 10px;
  animation: fadein 0.2s linear 1;
  overflow: hidden;
}
.showQuery.active {
  animation: fadeout 0.2s linear 1;
  height: 0;
}
@keyframes fadeout {
  0% {
    height: 152px;
  }
  100% {
    height: 0;
  }
}
@keyframes fadein {
  0% {
    height: 0;
  }
  100% {
    height: 152px;
  }
}
.yh-querybuttons {
  text-align: right;
}
.yh-querybuttons .btn-que,
.yh-querybuttons .btn-rst {
  height: 22px;
  line-height: 22px;
  padding: 0 20px;
  font-size: 12px;
  font-family: "微软雅黑";
  border-radius: 1px;
}
.yh-querybuttons .btn-que:hover {
  background-color: #e38f29;
  border-color: #e38f29;
}
</style>
