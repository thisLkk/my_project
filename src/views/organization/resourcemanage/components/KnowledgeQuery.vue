<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_KnowledgeQuery">
    <div class="KnowledgeQuery_title clearfix">
       <span class="yh-headerfl">
          <span class="yh-font">查询条件</span>
        </span>
        <span class="yh-headerfr">
          <div id="yh-advanced" @click="ssClick()">
            <i :class="icon_"></i>
          </div>
        </span> 
    </div>
    
    <template v-if="ssIsShow">
    <div yh-jbxx-content class="KnowledgeQuery_main yh-jbxx-content" :class="!show_KnowledgeQuery_main ? 'active' : ''">
      <el-form :model="form_data" ref="form_data"  label-width="103px" size="mini" label-position="right">
            
            <el-row class="yh_topSS">
                <el-col :span="5">
                <el-form-item label="快速搜索:" prop="SearchKey" class="combo-col">
                    <el-select placeholder="请选择" v-model="form_data.SearchKey" size="mini" id="yh-manageinput">
                      <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in SearchKeyItems" />
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label-width="10px" prop="SearchValue">
                    <el-input placeholder="" v-model="form_data.SearchValue" size="mini" id="yh-manageinput" />
                </el-form-item>
                </el-col>

                <el-col :span="5" v-show="serchValueValid">
                  <font color="red">选择搜索类型后，必须输入搜索内容</font>
                </el-col>

            </el-row>
            <el-row>
              <el-col :span="13" >
                <el-form-item label="知识类别：" prop="BuopKnlgCate">
                  <el-checkbox-group  @change="checkChange(form_data.BuopKnlgCate);buopKnlgCateChange()" v-model="form_data.BuopKnlgCate" size="mini">                    
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in commerceList">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row v-if="CompanyDepShow">
              <el-col :span="22">
                <el-form-item label="业务部门：" prop="CompanyDep">
                  <el-checkbox-group @change="checkChange(form_data.CompanyDep)" v-model="form_data.CompanyDep" size="mini">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in departmentList">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row> 
            <el-row>
              <el-col :span="22">
                <el-form-item label="业务类别：" prop="BizCate">
                  <el-checkbox-group @change="checkChange(form_data.BizCate)" v-model="form_data.BizCate" size="mini">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in businessList">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row> 
            <el-row>
              <el-col :span="8">
                <el-form-item label="对接人：" prop="AlignPer">
                  <el-input
                    placeholder="请输入对接人"
                    v-model="form_data.AlignPer"
                    clearable
                    size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <div class="yh-buttons"><el-button size="small" class="yh_color_query" v-on:click="lookup()">查询</el-button></div>
              </el-col>
            </el-row>
      </el-form>
    </div>
    </template>
  </div>
</template>

<script>
import { JSONArrayToString,checkAllChange } from "@/utils/datahandle.js";
import { dictFilter,dictItems } from "@/filters";
import DICTYPE from "@/utils/dictTypes.js";

export default {
  name: "KnowledgeQuery",
  data() {
    return {      
      CompanyDepShow:false,//初始化时 隐藏公司部门
      serchValueValid:false,//是否显示必填提示
      ssIsShow: true,
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      show_KnowledgeQuery_main: true,
      form_data: {//请求参数
        BuopKnlgCate: [''], //知识类别的选中值
        CompanyDep:[''],//公司部门
        BizCate: [''],//业务类别
        AlignPer:'',//对接人
        resourceCate:"02",//01--业务通讯录 ，02--知识库
        SearchType:0,
        SearchKey:"",
        SearchValue:"",
      },
      SearchKeyItems: [
        //快速搜索
        {
          value: "请选择",
          key: ""
        },
        {
          value: "知识名称",
          key: "0"
        },
        {
          value: "知识简介",
          key: "1"
        },
      ],
      commerceList:dictItems(DICTYPE.OSPCD0224), //知识类别

      departmentList:[],//公司类别

      departmentListAll:dictItems(DICTYPE.OSPCD0225),//公司类别

      businessList:dictItems(DICTYPE.OSPCD0226), //业务类别

    };
  },
  created() {
  },

  mounted(){
      //首页路由跳转根据不同id名判断加载不同查询条件
      let idquery = this.$route.query.id;
      if(idquery){
        this.form_data.BuopKnlgCate = [idquery];
        this.buopKnlgCateChange();
      }
      this.$emit("querylist",JSONArrayToString(this.form_data));
  },

  methods: {

    //商机改变
    buopKnlgCateChange(){
      //控制联动    公司部门跟随商机类别
      this.form_data.CompanyDep = [''];
      if(this.form_data.BuopKnlgCate == ''){
        this.CompanyDepShow = false;
      }else{
        this.departmentList = [];

        let t = 0;
        for(let i=0;i<this.form_data.BuopKnlgCate.length;i++){
          if('01' == this.form_data.BuopKnlgCate[i]){
            for(let j=0;j<this.departmentListAll.length;j++){
              if(this.departmentListAll[j].value == '01'){
                this.departmentList[t] = this.departmentListAll[j];
                t++;
              }
            }
          }
          if('02' == this.form_data.BuopKnlgCate[i]){
            for(let j=0;j<this.departmentListAll.length;j++){
              if(this.departmentListAll[j].value != '01'){
                this.departmentList[t] = this.departmentListAll[j];
                t++;
              }
            }
          }
        }
        this.CompanyDepShow = true;

      }
    },
    checkChange(val){
      checkAllChange(val);
    },
    ssClick() {
      this.ssIsShow = !this.ssIsShow;
      if (this.ssIsShow) {
        this.icon_ = "fa fa-angle-double-up";
        return;
      } else {
        this.icon_ = "fa fa-angle-double-down";
      }
    },
    lookup(){//查询功能
      if(''!=this.form_data.SearchKey && '' == this.form_data.SearchValue.replace(/(^\s*)|(\s*$)/g, "")){
        this.serchValueValid=true;
        return;
      }else{
        this.serchValueValid=false;
      }
      this.$emit("querylist",JSONArrayToString(this.form_data));
    },
    reset(formName){//置空选项
      this.$refs['formName'].resetFields();
    },
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.yh_KnowledgeQuery {
  background-color:#FFF;
  border: 1px solid #ebeef5;
  padding: 0 20px;
  border-radius: 4px;
  .KnowledgeQuery_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #eeeee9 solid;
    box-sizing: border-box;
    h3 {
      width: 70px;
      height: 33px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 2px solid #cb6c2f;
    }
  }
  
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
  line-height: 40px;
}
  .KnowledgeQuery_main {
    position: relative;
    margin: 10px 0;
    width: 100%;

    box-sizing: border-box;
    animation: fadein 0.2s linear 1;
    overflow: hidden;
    font-size: 14px;
    .lookup{
      position: absolute;
      top: 20px;
      right: 100px;
    }
    div {
      span {
        color: #333333;
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
  }
  .KnowledgeQuery_main.active {
    animation: fadeout 0.2s linear 1;
    height: 0;
  }

}
.yh_KnowledgeQuery .el-form-item label{
  font-weight: 100;
}
.yh-buttons{
  text-align:right;
}
.yh_color_query{
  padding:5px 20px;
  font-size:12px;
  background:#af6e20;
  border:#af6e20 solid 1px;
  color:#FFF;
  border-radius:1px;
}
.yh_color_query:hover{
   background:#e38f29;
   border:#e38f29 solid 1px;
   color:#FFF;
}
</style>
