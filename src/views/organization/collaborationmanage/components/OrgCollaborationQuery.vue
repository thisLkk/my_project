<template>
  <!-- 协同管理 __ 我的协同商机 __ 查询条件 -->
  <div class="yh_CollaborationQuery">
    <el-card class="box-card">
      <el-form :model="form_data" label-width="130px" size="mini" ref="form_data">
        <el-row>
          <el-col :span="24">
            <div class="yh-headerdiv clearfix">
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
            <el-col :span="5">
              <el-form-item label="快速搜索:" prop="FastSearch">
                <el-select v-model="form_data.FastSearch" placeholder="请选择" size="mini">
                  <el-option v-for="item in FastSearchList" :key="item.value" :label="item.value" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col  :span="5">
                <el-form-item prop="ActivityName" id="item_input">
                  <el-input type="text" v-model="form_data.ActivityName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3">
                <el-button  id="accurate" size="mini" @click="accurate()">精确</el-button>
                <el-button  id="vague" size="mini" @click="vague()">模糊</el-button>
            </el-col>
            <el-col :span="5">
                <el-form-item label="机构：" prop="orgName" id="item_lable">
                  <!-- <el-input type="text" v-model="form_data.orgName"/> -->
                  <inputButtonCE/>
                </el-form-item>
            </el-col>
            <el-col :span="5">
              <div class="yh-buttonsdiv">
                <div class="yh-buttons">
                  <el-form-item id="item_input">
                   <el-button  id="el_query" size="mini" @click="submitForm(form_data)">查询</el-button>
                   <el-button  id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button>
                   </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="商机状态:" prop="BusinessState">
                <el-checkbox-group v-model="form_data.BusinessState">
                  <el-checkbox-button :key="item.key" :label="item.key" v-for="item in BusinessStateList">{{item.value}}</el-checkbox-button>
                  <el-checkbox-button> <a class="more" href="javascript:void(0)" @click="BusinessList()">{{businessPush_}}</a> </el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务类别:" prop="seaver">
                <el-checkbox-group v-model="form_data.seaver">
                  <el-checkbox-button :key="item.key" :label="item.key" v-for="item in seaverList">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务类别:" prop="category">
                <el-checkbox-group v-model="form_data.category">
                  <el-checkbox-button :key="item.key" :label="item.key" v-for="item in categoryList">{{item.value}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="优先级:" prop="priority">
                <el-select v-model="form_data.priority" placeholder="请选择" size="mini">
                  <el-option v-for="item in priorityList" :key="item.value" :label="item.value" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
                <el-form-item prop="BusinessName" label="商机名称:">
                  <el-input type="text" v-model="form_data.BusinessName" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="job" label="发起对接人职务:">
                  <el-input type="text" v-model="form_data.job"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
                <el-form-item prop="name" label="客户名称:">
                  <el-input type="text" v-model="form_data.name" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="Initiator" label="发起机构:">
                  <el-input type="text" v-model="form_data.Initiator"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import inputButtonCE from "@/views/organization/components/InputButtonChooseOrg";
export default {
  name: "CollaborationQuery",
  components: {
    inputButtonCE
  },
  data() {
    return {
      icon: "fa fa-angle-double-up",
      showQuery: true, //控制查询条件div是否显示
      businessPush:true,
      businessPush_:"更多",
      form_data: {
        FastSearch: "1", //快速搜索inp
        ActivityName: "", //活动名称
        BusinessState: [], //商机状态
        seaver: [], //服务类别
        category: [],//业务类别
        priority:'',//优先级
        BusinessName:"",//商机名称
        job: "",//发起对接人职务
        name:"",//客户名称
        Initiator:"",//发起机构
      },
      BusinessStateList: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "已提交",
          key: "2"
        },
        {
          value: "协同退回",
          key: "3"
        },
        {
          value: "已发布",
          key: "4"
        },
        {
          value: "推进中",
          key: "5"
        },
        {
          value: "成功",
          key: "6"
        }
      ],
      seaverList: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "综合金融服务",
          key: "2"
        },
        {
          value: "投资服务",
          key: "3"
        },
        {
          value: "融资服务",
          key: "6"
        }
      ],
      categoryList: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "股权质押",
          key: "2"
        },
        {
          value: "资产证券化",
          key: "3"
        },
        {
          value: "债券融资",
          key: "4"
        }
      ],
      FastSearchList:  
      [
        {
          value: "商机名称",
          key: "1"
        },
        {
          value: "客户名称",
          key: "2"
        },
        {
          value: "发起人",
          key: "3"
        },
        {
          value: "审批人",
          key: "4"
        },
        {
          value: "协同人",
          key: "5"
        },
        {
          value: "应答人",
          key: "6"
        },
        {
          value: "承办人",
          key: "7"
        }
      ],
      priorityList:[
        {
          value: "紧急",
          key: "1"
        },
        {
          value: "高",
          key: "2"
        },
        {
          value: "中",
          key: "3"
        },
        {
          value: "低",
          key: "4"
        },
      ]
    };
  },
  methods: {
    showQuery_() {
      //显示或隐藏搜索页面
      if (this.showQuery) {
        this.showQuery = false;
        this.icon = "fa fa-angle-double-down";
        return;
      } else {
        this.icon = "fa fa-angle-double-up";
        this.showQuery = true;
      }
    },
    BusinessList(){//商机状态展示更多选项
    if(this.businessPush){
      this.BusinessStateList.push(
        {
          value:"新建",
          key:"7"
        },
        {
          value:"申请协同",
          key:"8"
        },
        {
          value:"已分发",
          key:"9"
        },
        {
          value:"已拒绝",
          key:"10"
        },
        {
          value:"取消",
          key:"11"
        },
        {
          value:"失败",
          key:"12"
        },
        )
      this.businessPush_ = "精简...";
      }else{
        this.BusinessStateList.splice(6);
        this.businessPush_ = "更多...";
      }
      this.businessPush = !this.businessPush
    },
    submitForm(formName) {
      //查询方法
      var require = {
        BusinessState: this.form_data.BusinessState,
        FastSearch: this.form_data.FastSearch,
        seaver: this.form_data.seaver,
        category: this.form_data.category
      };
      //console.log(formName);
    },
    resetForm(formName) {
      //重置查询条件方法
      this.$refs[formName].resetFields();
    },
    accurate() {
      //精确
      var accurate = { id: "1" };
      var accurate_ = Object.assign(accurate, this.form_data); //合并
      //console.log(accurate_);
    },
    vague() {
      //精确
      var vague = { id: "0" };
      var vague_ = Object.assign(vague, this.form_data); //合并
      //console.log(vague_);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh_CollaborationQuery {
  box-sizing: border-box;
  .yh-headerdiv {
    height: 40px;
    border-bottom: 1px #eeeee9 solid;
    .yh-headerfl {
      float: left;
      width: 70px;
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #cb6c2f;
    }
    .yh-headerfr {
      float: right;
      height: 40px;
      width: 30px;
      line-height: 40px;
      border-radius: 8px;
      #yh-advanced {
        padding-left: 7px;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
  }
  .showQuery {
    margin-top: 10px;
    animation: fadein 0.2s linear 1;
    overflow: hidden;
    .yh-buttonsdiv {
      height: 45px;
      .yh-buttons {
        float: right;
        overflow: hidden;
      }
    }
    .more{
      color: blue;
      text-decoration: underline;
    }
  }
  .showQuery.active {
    animation: fadeout 0.2s linear 1;
    height: 0;
  }
  @keyframes fadeout {
    0% {
      height: 190px;
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
      height: 190px;
    }
  }
}
</style>


