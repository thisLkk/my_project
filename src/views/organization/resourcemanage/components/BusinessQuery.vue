<template>
  <!-- 资源管理下的业务功能查询条件组件L -->
  <div class="yh_BusinessQuery">
    <div class="BusinessQuery_title clearfix">
      <span class="yh-headerfl">
          <span class="yh-font">查询条件</span>
        </span>
        <span class="yh-headerfr">
          <div class="yh-advanced" id="yh-advanced" @click="ssClick()">
            <i :class="icon_"></i>
          </div>
        </span> 
    </div>
    
    <template v-if="ssIsShow">
    <div yh-jbxx-content class="BusinessQuery_main yh-jbxx-content">
      <el-form :model="form_data" ref="form_data"  label-width="103px" size="mini" label-position="right">
            <el-row>
              <el-col :span="13" >
                <el-form-item label="商机类别：" prop="BuopKnlgCate">

                  <el-checkbox-group @change="checkChange(form_data.BuopKnlgCate);buopKnlgCateChange()" v-model="form_data.BuopKnlgCate" size="mini">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in commerceList">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col> 
            </el-row>
            <el-row v-if="CompanyDepShow">
              <el-col :span="22">
                <el-form-item label="公司/部门：" prop="CompanyDep">
                  <el-checkbox-group @change="checkChange(form_data.CompanyDep)" v-model="form_data.CompanyDep" size="mini">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="index" :label="item.value" v-for="(item,index) in departmentList">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row> 
            <!-- 6月26日 隐藏  根据需求  ljz -->
            <!-- <el-row>
              <el-col :span="22">
                <el-form-item label="业务类别：" prop="BizCate">
                  <el-checkbox-group  @change="checkChange(form_data.BizCate)" v-model="form_data.BizCate" size="mini">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in businessList">{{item.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>  -->
            <el-row>
              <el-col :span="22">
                <el-form-item label="服务类型：" prop="SrvCate">
                  <el-checkbox-group @change="checkChange(form_data.SrvCate)" v-model="form_data.SrvCate" size="mini">
                    <el-checkbox-button key="" label="">不限</el-checkbox-button>
                    <el-checkbox-button :key="item.value" :label="item.value" v-for="item in serviceList">{{item.label}}</el-checkbox-button>
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
              
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="对接人职务：" prop="AlignPerDuty">
                  <el-input
                    placeholder="请输入对接职务"
                    v-model="form_data.AlignPerDuty"
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
import DICTYPE from "@/utils/dictTypes.js";
import { dictFilter,dictItems,treeDictItems } from "@/filters";

export default {
  name: "BusinessQuery",
  data() {
    return {
      CompanyDepShow:false,//初始化时 隐藏公司部门
      ssIsShow: true,
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      show_KnowledgeQuery_main: true,
      form_data: {//请求参数
        BuopKnlgCate: [''], //商机类别的选中值
        CompanyDep:[''],//公司类别
        BizCate: [''],//业务类别
        SrvCate: [''],//服务类别
        AlignPer:'',//对接人
        AlignPerDuty:'',//对接职务
	      resourceCate:"01"//01--业务通讯录 ，02--知识库
      },

      commerceList:dictItems(DICTYPE.OSPCD0224), //商机类别

      departmentList:[],//公司类别

      departmentListAll:dictItems(DICTYPE.OSPCD0225),//公司类别
        
      businessList:dictItems(DICTYPE.OSPCD0226), //业务类别

      serviceList: dictItems(DICTYPE.OSPCD0227), //服务类别
      
    };
  },
  created() {
    this.$emit("querylist",JSONArrayToString(this.form_data));
  },
  methods: {
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
      ////console.log(this.form_data)//请求参数
      this.$emit("querylist",JSONArrayToString(this.form_data));
    },
    reset(formName){//置空选项
      this.$refs['formName'].resetFields();
    },
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

      //this.$refs.CompanyDepFef;


    //alert(DICTYPE.OSPCD0224+'-'+this.form_data.BuopKnlgCate[0]+"###"+JSON.stringify(treeDictItems('OSP-CD0224-01')));

    //this.departmentList = treeDictItems('OSP-CD0224-01');

/* 
     if(this.form_data.BuopKnlgCate == ''){
        this.departmentList=dictItems(DICTYPE.OSPCD0225);//公司类别
      }else{
        this.departmentList = [];
        for(let i=0;i<this.form_data.BuopKnlgCate.length;i++){
          this.departmentList =  this.departmentList.concat(treeDictItems(DICTYPE.OSPCD0224+'-'+this.form_data.BuopKnlgCate[i]));//(DICTYPE.OSPCD0225),//公司类别
        }
      } */

    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.yh_BusinessQuery {
  border: 1px #ebeef5 solid;
  border-radius:4px;
  background:#fff;
  padding: 0 20px;
  padding-bottom:10px;
  .BusinessQuery_title {
    width: 100%;
    height: 40px;
    line-height: 40px;/*ouxinsu*/
    border-bottom: 1px #eeeee9 solid;
    box-sizing: border-box;
    h3 {
      width: 70px;
      height: 40px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 2px solid #cb6c2f;
    }
    .el_switch {
      margin-right: 20px;
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
  .BusinessQuery_main {
    position: relative;
    padding: 0px;
    margin: 10px 0;
    width: 100%;
    //height: 270px;
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
  .BusinessQuery_main.active {
    animation: fadeout 0.2s linear 1;
    height: 0;
  }

}
.yh_BusinessQuery .el-form-item label{
  font-weight: 100;
}
/*ouxinsu*/
.yh-advanced{
  font-size:18px;
  width:24px;
  height:40px;
  line-height:40px;
  text-align:right;
  cursor:pointer;
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
