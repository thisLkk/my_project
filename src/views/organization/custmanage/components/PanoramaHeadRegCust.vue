<template>
  <div class="yh-PanoramaHeadRegCust">
    <!-- 客户全景视图——logo展示区 -->
    <div v-if="info!=null" class="yh-middlediv clearfix">
      <div class="yh-middlefl fl">
        <h3 class="yh-middlespan">{{info.CustFullName}}</h3>
        <ul v-if="info.IndividualFlag == '0'">
          <li><img class="yh-img" src="~@/assets/organization/customermanage/icn-gr64.png" alt="企业图片" /></li>
          <li><span class="yh-top-span">个人</span></li>
          <li><span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span></li>
        </ul>
        
        <ul v-else-if="info.IndividualFlag == '1'">
          <li><img class="yh-img" src="~@/assets/organization/customermanage/icn-jg64.png" alt="企业图片" /></li>
          <li><span class="yh-top-span">机构</span></li>
          <li><span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span></li>
        </ul>
        
        <ul v-else-if="info.IndividualFlag == '2'">
          <li><img class="yh-img" src="~@/assets/organization/customermanage/icn-cp64.png" alt="企业图片" /></li>
          <li><span class="yh-top-span">产品</span></li>
          <li><span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span></li>
        </ul>
        
        <ul v-else-if="info.IndividualFlag == '998'">
          <li><img class="yh-img" src="~@/assets/organization/customermanage/icn-unknow64.png" alt="企业图片" /></li>
          <li><span class="yh-top-span">未知</span></li>
          <li><span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span></li>
        </ul>
        
        <ul v-else>
          <li><img class="yh-img" src="~@/assets/organization/customermanage/icn-unknow64.png" alt="企业图片" /></li>
          <li><span class="yh-top-span">其他</span></li>
          <li><span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span></li>
        </ul>
        </div>
      <div class="yh-middlefr fl" v-width="420">
        <PanoramaHeadInformationRegCust :info = "info" :info_label = "info_label"></PanoramaHeadInformationRegCust>
      </div>
    </div>
    <div v-else>暂无数据（暂无做无数据的展示页）</div>
  </div>
</template>
<script>

import  PanoramaHeadInformationRegCust  from './PanoramaHeadInformationRegCust'

import {regCustManageGetInfo,regCustManageGetInfoLabel
} from "@/api/organization/custmanage/regcustmanage/RegCustManage/index.js";
 import {
  getLabelInfo
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";

export default {
  name: "PanoramaHead",
  components: {
    PanoramaHeadInformationRegCust
  },
  data() {
    return {
      info:null,//用于展示个人信息
      info_label:{},//个人业务标签获取
    };
  },
  created() {
    this.init();
  },
/*   watch{
    this.$store.getters.Uuid_Reg_Cust(newlist, oldlist) {

    }
  }, */
  methods: {
    init() {
      //拉取个人信息接口
      // //console.log(this.$store.getters.Uuid)//拿到客户点得UUid
      var query = {
        param: {
          Uuid: this.$store.getters.Uuid_Reg_Cust
        }
      };
      regCustManageGetInfo(query)
        .then(response => {
          //this.$emit("init",{loading:false});//关闭父组件的loading加载
          this.info = response.Data;
          //console.log(response.Data)
        })
        .catch(() => {//可以用作与提示
          this.$confirm("访问出错")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        });

      getLabelInfo(query)
        .then(response => {
          //this.$emit("init",{loading:false});//关闭父组件的loading加载
          this.info_label = response.Data;
          //console.log(response.Data)
        })
        .catch(() => {//可以用作与提示
          this.$confirm("访问出错")
            .then(_ => {
              done();
            })
            .catch(_ => {});
        });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.yh-PanoramaHeadRegCust {
  margin: 10px 15px;
  margin-top: 0;
  //min-height: 230px;
  background: #ffffff;
  border:solid 1px #ebeef5;
  border-radius:3px;
  .yh-middlediv {
    .yh-middlefl {
      float: left;
      width: 200px;
      padding-top: 5px;
      box-sizing: border-box;
      text-align: center;
      h3 {
        color: #014aa6;
        width: 100%;
        height: 30px;
        font-size: 15px;
        font-weight: bold;
        line-height: 30px;
        margin-bottom: 10px;
      }
      ul {
        li:nth-child(1) {
          img {
            width: 66px;
            height: 64px;
            color: #dddddd;
            font-size: 12px;
            text-align: center;
          }
          margin-bottom: 8px;
        }
        li:nth-child(2) {
          span {
            display: inline-block;
            padding: 3px 10px;
            font-size: 14px;
          }
          margin-bottom: 10px;
        }
        li:nth-child(3) {
          span {
            display: inline-block;
            padding: 2px 10px;
            font-size: 12px;
            font-family:"微软雅黑";
            color:#FFF;
            background: #cb6c32;
            border-radius:20px;            
          }
        }
      }
    }
    .yh-middlefr {
      border-left: 1px dashed #dddddd;
    }
  }
}
</style>
