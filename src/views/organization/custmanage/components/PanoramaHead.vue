<template>
  <div class="yh-PanoramaHead">
    <!-- 客户全景视图——logo展示区 -->
    <div v-if="info!=null" class="yh-middlediv clearfix">
      <div class="yh-middlefl fl" :style="paddingTop">
        <h3 class="yh-middlespan">{{info.CustFullName}}</h3>
        <ul>
          <li v-if="paddingTop.paddingTop=='80px'">
            <img v-if="info.IndividualFlag == '0'" class="yh-img" src="~@/assets/organization/customermanage/icn-gr64.png" alt="个人图片"
            />
            <img v-else-if="info.IndividualFlag == '1'" class="yh-img" src="~@/assets/organization/customermanage/icn-jg64.png" alt="机构图片"
            />
            <img v-else-if="info.IndividualFlag == '2'" class="yh-img" src="~@/assets/organization/customermanage/icn-cp64.png" alt="产品图片"
            />
            <img v-else-if="info.IndividualFlag == '998'" class="yh-img" src="~@/assets/organization/customermanage/icn-unknow64.png" alt="企业图片"
            />
            <img v-else class="yh-img" src="~@/assets/organization/customermanage/icn-unknow64.png" alt="企业图片" />
          </li>
          <li v-if="paddingTop.paddingTop=='80px'">
            <span style="font-size: 14px;" class="yh-top-span">{{info.IndividualFlag == "0" ? "个人客户" : info.IndividualFlag == "1" ? "机构客户" : info.IndividualFlag == "2" ? "产品客户" :
              info.IndividualFlag == "998" ? '未知客户' : '其他客户'}}</span>
          </li>
          <!-- <li>
            <span class="yh-bottom-span" :style="info.StrategyCustFlag == '1' ? 'background: #b3844e;' : 'background:none;'">{{info.StrategyCustFlag == "0" ? "" : "战略"}}</span>
          </li> -->
        </ul>
      </div>
      <div class="yh-middlefr fl" v-width="320">
        <PanoramaHeadInformation v-if="info_label!=null || info!=null " :info="info" :info_label="info_label" @paddingChan="paddingChan"></PanoramaHeadInformation>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    PanoramaHeadInformation
  } from "./index.js";
  import {
    getInfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    getLabelInfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  export default {
    name: "PanoramaHead",
    components: {
      PanoramaHeadInformation
    },
    data() {
      return {
        info: null, //----------用于展示个人信息
        info_label: null, //----个人业务标签获取
        paddingTop:{
          paddingTop:"80px"
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      paddingChan(data){
        switch (data) {
          case true:
            this.paddingTop.paddingTop = "80px"
            this.paddingTop.overflow = "none";
            this.paddingTop.height = "auto";
            break;
          case false:
           this.paddingTop.paddingTop = "0px";
           this.paddingTop.padding = "0 3px";
           this.paddingTop.overflow = "hidden";
           this.paddingTop.height = "57px";
           break;
          default:
            break;
        }
      },
      init() {
        // alert(this.$store.getters.Uuid_formal)
        //-----------------------------------------------------------拉取个人信息接口
        var query = {
          param: {
            Uuid: this.$store.getters.Uuid_formal //-----------------此处的uuid是从正式客户管理或者我的正式客户列表传进来的
          }
        };
        var querys = {
          param:this.$store.getters.Uuid_formal //-----------------此处的uuid是从正式客户管理或者我的正式客户列表传进来的
         
        };
        getInfo(query)
          .then(response => {
            this.info = response.Data;
            this.$store.dispatch("setcustName", response.Data.CustFullName);
          })
          .catch(() => {});
        getLabelInfo(querys)
          .then(response => {
            //console.log(response.Data)
            this.info_label = response.Data;
          })
          .catch(() => {});
      }
    }
  };

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .yh-PanoramaHead {
    margin: 10px 15px;
    margin-top: 0;
    background: #ffffff;
    border:solid 1px #ebeef5;
    border-radius:3px;
    
    .yh-middlediv {
      .yh-middlefl {
        float: left;
        width: 200px;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        h3 {
          color: #014aa6;
          width: 100%;
          min-height: 38px;
          font-size: 18px;
          font-weight: bold;
          line-height: 30px;
          margin-bottom: 20px;
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
              font-size: 12px;
            }
            margin-bottom: 10px;
          }
          li:nth-child(3) {
            span {
              display: inline-block;
              width: 50px;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #ffffff;
              border-radius: 3px;
            }
          }
        }
      }
      .yh-middlefr {
        min-height: 66px;
        border-left: 1px dashed #dddddd;
      }
    }
  }

</style>
e