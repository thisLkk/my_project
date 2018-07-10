<template>
  <div class="yh_orgChoose">
    <section>
      <div style="position: relative;">
        <a href="javascript:void(0)" @click="chooseInput" style="position: absolute;z-index: 10;width: 100%;height: 100%;opacity: 0;"></a>
        <el-input v-model="chooseNames" :placeholder="businessName" size="mini" width="100%">
          <i class="el-icon-search el-input__icon" slot="suffix"  @click="dialogVisible = true">
          </i>
          <i slot="suffix" class="el-input__icon el-icon-close"  v-if="isempty()" @click="clearContent"></i>
        </el-input>
        <a href="javascript:void(0)" @click="clearContent" style="position: absolute;z-index: 11; top: 0px;right: 0px;width: 30px;height: 100%;opacity: 0;"></a>
      </div>

      <el-dialog title="机构选择" :visible.sync="dialogVisible" width="500px" height="500px" append-to-body>
        <div class="activity_dialog clearfix" v-if="dialogVisible">
          <el-tree
          node-key="OrgNo"
          :check-strictly="checkStrictly"
           ref="tree"
          :props="treeProps"
          :load="loadTree"
          @check-change="doCheckChange"
          lazy
          :show-checkbox="selectType !='no'"
          >
        </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="doSure">
            <i class="fa fa-check diologBtn"></i>确 定</el-button>
          <el-button @click="doClose">
            <i class="fa fa-close diologBtn"></i>关 闭</el-button>
        </span>
      </el-dialog>

    </section>
  </div>
</template>

<script>
import {
  initOrg,
  getOrg
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";

export default {
  name: "orgChoose",
  data() {
    return {
      checkStrictly: true,
      orgData: [], //树数据
      chooseNames: "", //所选机构名称
      treeProps: {
        label: "OrgAbbr",
        children: "zones",
        isLeaf: "IsLeafNode"
      },
      dialogVisible: false,
      form_data: {
        param: {
          orgNo: ""
        }
      }
    };
  },
  //selectType 选择方式： redio=单选     check=多选    no=没有选择框
  props: {
    selectType: {
      type: String,
      default: "no" //默认没有选择框
    },
    //数据加载方式 ： allOrg:加载所有机构    userOrg：加载当前登录用户下机构
    dataInitType: {
      type: String,
      default: "userOrg" //默认加载当前登录用户下机构
    },
    businessName: {
      type: String,
      default: "" //默认加载当前登录用户下机构
    },
    undertakeOrgChoose: {
      type: String,
      default: "" //默认加载当前登录用户下机构
    },
    businessNew: {
      type: String,
      default: "" //用于判断是否是协同的新建功能
    },
  },
  created() {
    
    // ---------------------------------------------------------------------初始化的时候给上级默认的登录人机构
    if (this.undertakeOrgChoose != "") {
      this.$emit("onOrgSure", []);
    } else if (this.businessName != "") {
      this.chooseNames = this.businessName;
    } else {
      this.$emit("onOrgSure", [this.$store.getters.orgid]);
    }
  },
  mounted() {
    if (this.undertakeOrgChoose != "") {
      this.chooseNames = "";
      this.form_data.param.orgNo = "";
    } else if (this.businessName != "") {
      this.chooseNames = this.businessName;
    } else {
      var chooseNamesx = dictFilter(
        DICTYPE.CTCCD0998,
        this.$store.getters.orgid
      );
      this.chooseNames = chooseNamesx;
      this.form_data.param.orgNo = this.$store.getters.orgid;
    }
  },
  watch:{
    businessName(newname,oldname){
      this.chooseNames =newname;
    }
  },
  methods: {
    chooseInput(){
      this.dialogVisible = true
    },
    doClose: function() {
      this.dialogVisible = false;
    },
    doSure: function() {
      //机构号处理
      this.$emit("onOrgSure", this.$refs.tree.getCheckedKeys(),this.businessNew);
     
      //机构名称处理
      let chooseNameArr = [];
      let chooseOrgCodes = [];
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      for (var i = 0; i < checkedNodes.length; ++i) {
        chooseNameArr[i] = checkedNodes[i].OrgAbbr;
        chooseOrgCodes.push(checkedNodes[i].OrgNo);
      }
      this.chooseNames = chooseNameArr.toString();
      this.form_data.param.orgNo = chooseOrgCodes.toString();
      this.dialogVisible = false;
    },

    //获得所选用户名称方法， 供某些界面需要调用
    getChooseNames() {
      return this.chooseNames;
    },

    clearContent(){
      this.chooseNames='请选择机构';
      this.$emit("onOrgSure", [this.$store.getters.orgid]);
    },
    isempty(){
      if(this.chooseNames!='请选择机构'){
        return true;
      }else{
        return false;
      }
    },
    //加载机构树
    loadTree(node, resolve) {
      //alert("#####"+this.$store.getters.orgid);return;
      if (node.level === 0) {
        if ("allOrg" == this.dataInitType) {
          this.form_data.param.orgNo = "0000";
        } else {
          this.form_data.param.orgNo = this.$store.getters.orgid < 8000 ? this.$store.getters.orgid : '0000';
        }
        initOrg(this.form_data)
          .then(response => {
            this.orgData = response.Data;
            return resolve(this.orgData);
          })
          .catch(() => {
            this.$message.error("访问出错");
          });
      } else {
        this.form_data.param.orgNo = node.data.OrgNo;
        getOrg(this.form_data)
          .then(response => {
            this.orgData = response.Data;
            return resolve(this.orgData);
          })
          .catch(() => {
            this.$message.error("访问出错");
          });
      }
    },
    doCheckChange(data, checked, indeterminate) {
      //如果是单选则做单选处理  否则 不处理
      if (this.selectType == "redio") {
        // 实现单选
        //console.log(data);
        if (checked) {
          // 当前点击为选择状态而不是取消选择
          this.selected = data;
        }
        // 获取当前所有被选中节点的id所组成的数组
        let nodes = this.$refs.tree.getCheckedKeys();
        if (nodes.length == 0 || nodes.length == 1) return;
        // 注意传入的参数是数组
        this.$refs.tree.setCheckedKeys([data.OrgNo]);
      }
    }
  }
};
</script>

<style scoped>
.rowright {
  text-align: right;
}

.yh_padding_top_20 {
  padding-top: 20px;
}

.el-table {
  max-height: 350px;
  min-height: 200px;
}

.button-row {
  margin-top: 30px;
  padding-bottom: 30px;
}

.yh-button-close {
  margin-left: 20% !important;
}

.yh-jbxxx li {
  width: 100%;
  float: left;
  margin-left: 35px;
  list-style-image: url(../../../assets/organization/customermanage/ico.jpg);
}

.yh-jbxxx li {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}

.el-row {
  margin-top: 2%;
}
</style>

