<template>
  <!-- 公开客户页面的客户列表 lu-->
  <div >
    <div class="yh_PublicCustomerList clearfix" v-width="40" v-for="(item, index) in institutionpubliccustomerlists" :key="index">
      <div class="company_logo fl">
        <div class="logo_box">
          <img :src="imgsrc" alt="公司图片">
          <span>{{item.name_}}</span>
          <span>一般机构</span>
          <span v-if="item.StrategyCustFlag=='1'">
              <p>战略</p>
          </span>
        </div>
      </div>
      <div class="company_main fl" v-width="180">
        <div class="main_top clearfix">
          <h3 @click="showRigsterInfo2(item.Uuid)" style="cursor: pointer">
           {{item.CustName}}
          </h3>
          {{item.CustNo}}
          <span :title="item.StkCode">{{item.potentialOrg?item.potentialOrg.StkCode:''}}</span>
          <span :title="item.SecAbbr">{{item.potentialOrg?item.potentialOrg.SecAbbr:''}}</span>
          <span :title="item.MktVal">{{item.potentialOrg?calWindPriIndustry(item.potentialOrg.WindPriIndustry):''}}</span>
        </div>
        <div class="main_center">
          <span :title="item.regCptl">注册资本(万元)：{{item.potentialOrg?item.potentialOrg.RegCptl:''}}</span>
        </div>
        <!--<div class="main_bottom clearfix">-->
          <!--<h6>-->
            <!--<a href="javascript:void(0)">部门标签：</a>-->
            <!--&lt;!&ndash;<span v-for="(name,index) in item.DepLbl" :key="index" :title="name.name">{{name.name}}</span>&ndash;&gt;-->
          <!--</h6>-->
        <!--</div>-->
        <div class="register">
          <div class="register_icon">

            <span :title="item.setupDate">成立日期：{{item.potentialOrg?item.potentialOrg.SetupDate:''}}</span>
            <span :title="item.listDate">上市日期：{{item.potentialOrg?item.potentialOrg.ListDate:''}}</span>

            <i class="fa fa-registered"></i>
            <el-button type="text" @click="showRigsterInfo(item.Uuid)">注册</el-button>
          </div>
          <p>
            <span>{{item.potentialOrg?calExcgPc(item.potentialOrg.Exchg):''}}</span>
            <span>{{item.potentialOrg?calMarket(item.potentialOrg.StkMkt):''}}</span>
            <span>{{item.potentialOrg?calPlate(item.potentialOrg.Plate):''}}</span>
          </p>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogVisible" width="900px" :before-close="handleClose">
      <div class="yh-register">
        <el-form >
          <div class="yh-register-top">
            <div class="register-top-img">
              <div class="register-top-img-lf">
                <img src="~@/assets/organization/customermanage/icn-jg.png" alt="企业图标">
              </div>
              <div class="register-top-img-lr">
                <span class="register-top-spanone">{{detailData.CustName}}</span>
                <span class="register-top-spantwo">{{detailData.potentialOrg?detailData.potentialOrg.SecAbbr:''}}</span>
                <span class="register-top-spanthree">{{detailData.potentialOrg?detailData.potentialOrg.StkCode:''}}</span>
              </div>
            </div>
            <div class="register-top-content">
              <el-row>
                <el-col :span="12">
                  <span class="yh-register-label">证件类型:</span>
                  <span class="yh-register-content">{{ calCertType(detailData.CredentialsType)}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-register-label">证件号码:</span>
                  <span class="yh-register-content">{{detailData.IDNo}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span class="yh-register-label">万德一级行业:</span>
                  <span class="yh-register-content">{{detailData.potentialOrg?calWindPriIndustry(detailData.potentialOrg.WindPriIndustry):''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-register-label">证监会行业分类(大):</span>
                  <span class="yh-register-content">{{detailData.potentialOrg?calZjhBCateGory(detailData.potentialOrg.CsrcIndustryCatalog):''}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span class="yh-register-label">万德二级行业:</span>
                  <span class="yh-register-content">{{detailData.potentialOrg?calWindSecIndustry(detailData.potentialOrg.WindSndIndustry):''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-register-label">证监会行业分类(中):</span>
                  <span class="yh-register-content">{{detailData.potentialOrg?calZjhBCateGory(detailData.potentialOrg.CsrcIndustryMidClass):''}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div :class="tabstype ? 'yh_register_bottom' : 'yh_register_bottom_v1'">
            <div class="yh-detailedinformation">
              <ul>
                <li>详细信息</li>
              </ul>
            </div>
            <div class="yh-body">
              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">注册资本(万元):</span>
                  <span class="yh-body-content" >{{detailData.potentialOrg?detailData.potentialOrg.RegCptl:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">交易所:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?calExcgPc(detailData.potentialOrg.Exchg):''}}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">股票市场:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?calMarket(detailData.potentialOrg.StkMkt):''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">板块:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?calPlate(detailData.potentialOrg.Plate):''}}</span>
                </el-col>
              </el-row>



              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">省份:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.Province:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">城市:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.City:''}}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">企业性质:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.CorpNature:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">产业分类:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.IndustryClass:''}}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">成立日期:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.SetupDate:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">上市日期:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.ListDate:''}}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">

                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">主营产品类型:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.MainPrdType:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">主营产品名称:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.MainPrdName:''}}</span>
                </el-col>
              </el-row>

              <el-row>

                <el-col :span="12">
                  <span class="yh-body-label">交易平台:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.TrdPlatform:''}}</span>
                </el-col>
              </el-row>




              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">最近一年净利润(万元):</span>
                  <span class="yh-body-content">{{detailData.potentialFin?detailData.potentialFin.RecentYear1NetProfit10ky:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">最近一年营业总收入(万元):</span>
                  <span class="yh-body-content">{{detailData.potentialFin?detailData.potentialFin.RecentYear1BizIncome10ky:''}}</span>
                </el-col>

              </el-row>

              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">最近一年资产负债率:</span>
                  <span class="yh-body-content">{{detailData.potentialFin?detailData.potentialFin.Recent1YearAssetLiabRate:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">最近一年ROE(%):</span>
                  <span class="yh-body-content">{{detailData.potentialFin?detailData.potentialFin.RecentYear1RoeRatio:''}}</span>
                </el-col>

              </el-row>

              <el-row>
                <el-col :span="12">
                  <span class="yh-body-label">最近两年ROE(%):</span>
                  <span class="yh-body-content">{{detailData.potentialFin?detailData.potentialFin.RecentYear1RoeRatio:''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">最近三年ROE(%):</span>
                  <span class="yh-body-content">{{detailData.potentialFin?detailData.potentialFin.RecentYear3RoeRatio:''}}</span>
                </el-col>
              </el-row>

              <el-row v-if="tabstype">
                <el-col :span="12">
                  <span class="yh-body-label">Wind债券一级分类:</span>
                  <span class="yh-body-content">{{detailData.potentialFin?calFriModCl(detailData.potentialFin.WindBondPriClass):''}}</span>
                </el-col>
                <el-col :span="12">
                  <span class="yh-body-label">Wind债券二级分类:</span>
                  <span class="yh-body-content">{{detailData.potentialFin?calSecModCl(detailData.potentialFin.WindBondSndClass):''}}</span>
                </el-col>

              </el-row>

              <el-row v-if="tabstype">
                <el-col :span="12">
                  <span class="yh-body-label">市值(万元):</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.StkMkt:''}}</span>
                </el-col>

                <el-col :span="12">
                  <span class="yh-body-label">债务主体:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.DebtMainBody:''}}</span>
                </el-col>

              </el-row>

              <el-row v-if="tabstype">
                <el-col :span="12">
                  <span class="yh-body-label">国家及地区:</span>
                  <span class="yh-body-content">{{detailData.potentialOrg?detailData.potentialOrg.CountryAndDistrict:''}}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <span class="yh-body-label ">主营业务:</span>
                  <span class="yh-body-content2">{{detailData.potentialOrg?detailData.potentialOrg.MainBiz:''}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="yh-body-label ">注册地址:</span>
                  <span class="yh-body-content2" :title  ="detailData.potentialOrg?detailData.potentialOrg.RegAddr:''">
                       {{detailData.potentialOrg?detailData.potentialOrg.RegAddr:''}}
                  </span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <span class="yh-body-label">办公地址:</span>
                  <span class="yh-body-content2" >{{detailData.potentialOrg?detailData.potentialOrg.WorkAddr:''}}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <span class="yh-body-label02">经营范围:</span>
                  <el-input type="textarea"   class="yh-textarea" :autosize="{ minRows: 5, maxRows: 4}" :value="detailData.potentialOrg?detailData.potentialOrg.BusiScope:''" readonly="true"></el-input>
                </el-col>
              </el-row>




              <el-row>
                <el-col :span="12">
                  &nbsp;
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <span class="yh-body-label">备注:</span>
                  <el-input type="textarea"  v-model="barkinfo" class="yh-textarea"></el-input>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div class="yh-buttons" v-if="showType1">
                    <el-button @click="registercustinfo(detailData.Uuid)" size="mini" id="yh-confirm">
                      <i class="fa fa-check icons"></i>确定
                    </el-button>
                    <el-button @click="closeRigsterDlg()" size="mini" id="yh-cancel">
                      <i class="fa fa-close icons"></i>取消
                    </el-button>
                  </div>

                  <div class="yh-buttons" v-if="showType2">
                    <el-button @click="closeRigsterDlg()" size="mini" id="yh-cancel">
                      <i class="fa fa-close icons"></i>关闭
                    </el-button>
                  </div>

                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { dictFilter,dictItems } from "@/filters";
  import DICTYPE from "@/utils/dictTypes.js";
  import { listedCompanyqueryDetail,rigsterCompyInfo } from '@/api/organization/custmanage/regcustmanage/PublicRegistrationList/index.js'
  import yjbbxx from '@/assets/organization/customermanage/icn-jg.png'

export default {
  name: "InstitutionPublicCustomerList",
  props: {
    tabstype: {
      type: Boolean
    },
    institutionpubliccustomerlists: {
      type: Array,
    }
  },
  computed:{


  },

  data() {
    return {
      imgsrc: yjbbxx,
      dialogVisible: false,
      dialogName: "",
      showType1:false,//窗口打开方式1
      showType2:false,//窗口打开方式2
      names: [{
        name: "经纪业务总部"
      },
      {
        name: "证券金融总部"
      },
      {
        name: "研究院"
      }
      ],
      barkinfo:"",
      detailData:{
        potentialOrg:{},
        potentialFin:{}
      },
    };
  },
  created() {

  },
  methods: {
    calFriModCl(code){
      var cont=dictFilter(DICTYPE.CD0236,code);
      return cont;
    },
    calSecModCl(code){
      var cont=dictFilter(DICTYPE.CD0237,code);
      return cont;
    },

    calMarket(code){
      var cont=dictFilter(DICTYPE.CTCCD0221,code);
      return cont;
    },
    calExcgPc(code){
      var cont=dictFilter(DICTYPE.CTCCD0223,code);
      return cont;
    },
    calPlate(code){
      var cont=dictFilter(DICTYPE.CTCCD0096,code);
      return cont;
    },
    calWindPriIndustry(code){//万得行业一级分类
      var cont=dictFilter(DICTYPE.CTCCD0232,code);
      return cont;
    },
    calWindSecIndustry(code){//万得行业二级分类
      var cont=dictFilter(DICTYPE.CTCCD0233,code);
      return cont;
    },
    calCertType(code){//获取证据类型
      var cont=dictFilter(DICTYPE.EDW10031,code);
      return cont;
    },
    calZjhBCateGory(code){//证监会行业分类(大)
      var cont=dictFilter(DICTYPE.CTCCD0234,code);
      return cont;
    },
    calZjhMCateGory(code){//证监会行业分类(中)
      var cont=dictFilter(DICTYPE.CTCCD0235,code);
      return cont;
    },
    calMainBiz(code){//主营业务
      //var cont=dictFilter(DICTYPE.CTCCD0235,code);
      //return cont;
    },
    showRigsterInfo(uuid){
      this.dialogName = "注册"
      var parm={"param":{"uuid":uuid}}
      listedCompanyqueryDetail(parm)
        .then(response => {
          this.detailData=response.Data;
        }).catch(() => {
         this.$message.error('查询失败!');
      })
      this.showType1=true;
      this.dialogVisible = true;
    },
    showRigsterInfo2(uuid){
      this.dialogName = "公开客户详情"
      var parm={"param":{"uuid":uuid}}
      listedCompanyqueryDetail(parm)
        .then(response => {
          this.detailData=response.Data;
        }).catch(() => {
        this.$message.error('查询失败!');
      })
      this.showType2=true;
      this.dialogVisible = true;
    },

    registercustinfo(uuid){

      //console.info(uuid);
      var parm={"param":{"uuid":uuid,"potentialOrg":{"remk":this.barkinfo}}}
      rigsterCompyInfo(parm)
        .then(response => {
          //this.detailData=response.Data;
          this.$message.success('注册成功!');
          this.closeRigsterDlg();
        }).catch((response) => {
          //console.info(error);
          //this.$message.error('保存失败!');
      })

    },
    handleClose(done) {
      this.resetData();
      done();
    },
    resetData(){
      this.barkinfo="";
      this.showType1=false;
      this.showType2=false;
    },

    closeRigsterDlg(){
      this.dialogVisible = false;
      this.resetData();
    }
  }
};

</script>
<style scoped>
.yh_PublicCustomerList {
  border-bottom:solid 1px #ebeef5;
  height: 110px;
  box-sizing: border-box;
}

.company_logo {
  width: 120px;
  height: 100%;
  overflow: hidden;
}

.company_logo .logo_box {
  margin-top: 18px;
  margin-left: 35px;
  position: relative;
  width: 65px;
  height: 70px;
}

.company_logo .logo_box img {
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
}

.company_logo .logo_box span {
  font-size: 12px;
  display: block;
  color: #919191;
}

.company_logo .logo_box p {
  position: absolute;
  width: 36px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 7px;
  background-color: #B26803;
  color: #ffffff;
  font-size: 12px;
  left: 7px;
  top: 4px;

}

/* 客户的信息展示区域 */

.company_main {
  height: 100%;
  position: relative;
}

/* 注册区域 */

.register {
  position: absolute;
  top: 10px;
  right: 0;
  width: 385px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  text-align: right;
}

.register a {
  color: #676767;
}

.register p {
  width: 100%;
  height: 100%;
  margin-top: 8px;
}

.register p span {
  border: none;
  padding-right: 0;
}

.register p span:nth-child(1) {
  border-left: 2px solid #ddd;
  padding-left:6px;
}

.fa-registered {
  color: red;
}
/*公开客户列表---ouxinsu*/
/* 主要信息区域 */

.company_main span {
  height: 14px;
  line-height: 14px;
  margin-top: 10px;
  padding:0px 6px 0 5px;
  color: #666666;
  border-left: 2px solid #ddd;
  font-size: 12px;
}

.main_top {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
  overflow: hidden;
}
.company_main .main_top h3{
  color:#374b91;
  margin-right:10px;
}

.main_top > * {
  float: left;
}

.main_top h3 a {
  font-size: 16px;
  color: #374b91;
  font-weight: bold;
  padding-right: 20px;
}

.main_top a:nth-child(2) {
  text-decoration: underline;
  color: #0000ff;
  padding-right: 10px;
}

.main_top a:nth-child(2):link {
  color: #ff00ff;
}

/* 已被访问的链接 */
/*ouxinsu 公开客户列表css---*/
.main_center {
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  border-bottom:#ddd dotted 1px;
}

.main_center span:nth-child(1) {
  border: none;
  padding-left: 0;
}

.main_bottom {
  height: 30px;
  line-height: 30px;
}

.main_bottom span:nth-child(1) {
  border: none;
  padding-left: 0;
}

.main_bottom > * {
  float: left;
}

.main_bottom h6 {
  width: 70%;
  height: 100%;
}

.main_bottom h6 a {
  display: inline-block;
  font-size: 13px;
  color: #e7a04e;
  font-weight:bold;
}

.main_bottom h6 span {
  border: none;
  padding-left: 5px;
  padding-right: 0;
}

/*dialog里的样式*/
.yh-register {
  padding: 5px 20px 0px 20px;
}
.yh-register-top {
  background-color: #fafbfd;
  border:solid 1px #EEE;
  border-radius:3px;
  height: 190px;
  margin: 0 auto;
}
.register-top-img {
  height: 90px;
  width: 750px;
}
.register-top-img-lf {
  width: 120px;
  height: 90px;
  float: left;
  margin-right: 30px;
}
.register-top-img-lf img {
  margin: 20px 45px 25px 40px;
  width:64px;
  height:64px;
  background:#F6F7F9;
  border-radius:32px;
}
.register-top-img-lr {
  width: 480px;
  height: 70px;
  padding-top: 25px;
}
.register-top-spanone {
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: 500;
  color: #6666ff;
  display: block;
}
.register-top-spantwo {
  display: inline-block;
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: normal;
  color: #c9c9c9;
  margin-right: 8px;
  margin-top: 4px;
  width: 200px;
  height: 20px;
}
.register-top-spanthree {
  display: inline-block;
  font-family: "微软雅黑";
  font-size: 13px;
  font-weight: normal;
  color: #6666ff;
  margin-top: 4px;
  width: 100px;
  height: 20px;
}
.register-top-content {
  height: 100px;
  width: 750px;
}
.yh-register-label {
  display: inline-block;
  margin-left: 45px;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: normal;
  color: #999;
  height:30px;
  line-height:30px;
}
.yh-register-content {
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: normal;
  height:30px;
  line-height:30px;
  color: #666;
}
.yh_register_bottom_v1 {
  height: 770px;/*ouxinsu*/
  margin: 0 auto;
}
.yh_register_bottom {
  height: 880px;
  margin: 0 auto;
}
.yh-detailedinformation {
  height: 45px;
}
.yh-detailedinformation li {
  width: 40%;
  float: left;
  margin-left: 15px;
  margin-top: 15px;
  list-style-image: url('~@/assets/organization/customermanage/ico.jpg');
}
.yh-body {
  height: 550px;
}
.yh-body-label {
  display: inline-block;
  float:left;
  width: 160px;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: normal;
  color: #999;
  text-align: right;
  padding-right:5px;
  height:28px;
  line-height:28px;
  margin-bottom:10px;
}
.yh-body-label02{
  display: inline-block;
  float:left;
  width: 160px;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: normal;
  color: #999;
  text-align: right;
  padding-right:5px;
  height:88px;
  line-height:88px;
  margin-bottom:10px;
}
.yh-body-content {
  display: inline-block;
  float:left;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  border-radius: 3px;
  width: 220px;
  height: 28px;
  line-height:28px;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: normal;
  text-indent:1em;
  color:#666;
  margin-bottom:10px;
}
.yh-body-content2 {
  display: inline-block;
  float:left;
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  border-radius: 3px;
  width: 650px;
  height: 28px;
  line-height:28px;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: normal;
  text-indent:1em;
  color:#666;
  margin-bottom:10px;
}

.yh-body-small-content {
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
  border-radius: 5px;
  width: 220px;
  height: 28px;
  display: inline-block;
  font-family: "微软雅黑";
  font-size: 5px;
  font-weight: normal;
}
.yh-textarea {
  width: 645px;
  height: 50px;
}
.yh-buttons {
  margin-top: 25px;
  text-align: center;
}
#yh-confirm {
  width: 80px;
  height: 28px;
  line-height:8px;
  background-color: #f19c37;
  color: #ffffff;
  border:none;
  margin-right:5px;
}
#yh-cancel {
  width: 80px;
  height: 28px;
  line-height:8px;
  background-color: #acacac;
  color: #ffffff;
  border:none;
  margin-left:5px;
}
#yh-confirm:hover {
  width: 80px;
  height: 28px;
  line-height: 8px;
  border-radius: 2px 2px 2px 2px;
  background-color: #e38f29;
  color: #ffffff;
}
#yh-cancel:hover {
  width: 80px;
  height: 28px;
  line-height: 8px;
  border-radius: 2px 2px 2px 2px;
  background-color: #c7c1b9;
  color: #ffffff;
}
.register_icon{
  /*padding-top:3px;*/
}
/*ouxinsu*/
.yh-buttons{
  margin-top:25px;
}
.yh-buttons .icons{
  margin-right:10px;
  font-size:14px;
}
</style>
