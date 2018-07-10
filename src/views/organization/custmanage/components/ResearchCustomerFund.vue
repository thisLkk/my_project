<template>
  <!-- 360传统页面 研究院 投资研究院-->
  <div class="yh_ResearchInvestment">
    <!-- 基金研究院 -->
    <el-tabs type="border-card">
      <el-tab-pane v-if="IsShowList101" label="公募基金管理人">
        <div class="FundManager">
          <!-- 公募基金管理人 -->
          <ResearchCustomerFundOneOne></ResearchCustomerFundOneOne>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList102" label="公募基金托管人">
        <div class="FundCustodian">
          <!-- 公募基金托管人 -->
          <ResearchCustomerFundOneTwo></ResearchCustomerFundOneTwo>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList103" label="基金销售机构">
        <div class="FundAalesAgency">
          <!-- 基金销售机构 -->
          <ResearchCustomerFundOneThree></ResearchCustomerFundOneThree>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList201" label="私募证券管理人">
        <div class="SecuritiesManager">
          <!-- 私募证券管理人 -->
          <ResearchCustomerFundTwoOne></ResearchCustomerFundTwoOne>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList301" label="年金受托人">
        <div class="AnnuityToBeTheTrustee">
          <!-- 年金受托人 -->
          <ResearchCustomerFundThreeOne></ResearchCustomerFundThreeOne>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList302" label="年金托管人">
        <div class="AnnuityTrustee">
          <!-- 年金托管人 -->
          <ResearchCustomerFundThreeTwo></ResearchCustomerFundThreeTwo>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList303" label="年金帐管人">
        <div class="AnnuityBroker">
					<!-- 年金帐管人 -->
					<ResearchCustomerFundThreeThree></ResearchCustomerFundThreeThree>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList304" label="年金投管人">
        <div class="AnnuityInvestor">
					<!-- 年金投管人 -->
					<ResearchCustomerFundThreeFour></ResearchCustomerFundThreeFour>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList305" label="年金委托人">
        <div class="AnnuityClient">
					<!-- 年金委托人 -->
					<ResearchCustomerFundThreeFive></ResearchCustomerFundThreeFive>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList401" label="保险资产管理机构">
        <div class="InsuranceAssetManagementAgency">
					<!-- 保险资产管理机构 -->
					<ResearchCustomerFundFourOne></ResearchCustomerFundFourOne>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList501" label="信托公司">
        <div class="TrustCompany">
					<!-- 信托公司 -->
					<ResearchCustomerFundFiveOne></ResearchCustomerFundFiveOne>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="IsShowList601" label="财务公司">
        <div class="FinanceCompany">
					<!-- 财务公司 -->
					<ResearchCustomerFundSixOne></ResearchCustomerFundSixOne>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import ResearchCustomerFundOneThree from "@/views/organization/custmanage/components/ResearchCustomerFundOneThree";
  import ResearchCustomerFundOneOne from "@/views/organization/custmanage/components/ResearchCustomerFundOneOne";
  import ResearchCustomerFundOneTwo from "@/views/organization/custmanage/components/ResearchCustomerFundOneTwo";
  import ResearchCustomerFundTwoOne from "@/views/organization/custmanage/components/ResearchCustomerFundTwoOne";
  import ResearchCustomerFundThreeOne from "@/views/organization/custmanage/components/ResearchCustomerFundThreeOne";
  import ResearchCustomerFundThreeTwo from "@/views/organization/custmanage/components/ResearchCustomerFundThreeTwo";
  import ResearchCustomerFundThreeThree from "@/views/organization/custmanage/components/ResearchCustomerFundThreeThree";
  import ResearchCustomerFundThreeFour from "@/views/organization/custmanage/components/ResearchCustomerFundThreeFour";
  import ResearchCustomerFundThreeFive from "@/views/organization/custmanage/components/ResearchCustomerFundThreeFive";
  import ResearchCustomerFundFourOne from "@/views/organization/custmanage/components/ResearchCustomerFundFourOne";
  import ResearchCustomerFundFiveOne from "@/views/organization/custmanage/components/ResearchCustomerFundFiveOne";
  import ResearchCustomerFundSixOne from "@/views/organization/custmanage/components/ResearchCustomerFundSixOne";
  import {
    getresearchcenterinfo
  } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
  import {
    dictItems,
    dictFilter
  } from "@/filters"; //----数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //-----------数据字典的方法
  export default {
    name: "ResearchCustomerFund",
    data() {
      return {
        showinput: true, //------------------------------是否可编辑开关（暂无使用）
        IsShowList101: false,
        IsShowList102: false,
        IsShowList103: false,
        IsShowList201: false,
        IsShowList301: false,
        IsShowList302: false,
        IsShowList303: false,
        IsShowList304: false,
        IsShowList305: false,
        IsShowList401: false,
        IsShowList501: false,
        IsShowList601: false,
      };
    },
    components: {
      ResearchCustomerFundOneThree,
      ResearchCustomerFundOneOne,
      ResearchCustomerFundOneTwo,
      ResearchCustomerFundTwoOne,
			ResearchCustomerFundThreeOne,
			ResearchCustomerFundThreeTwo,
			ResearchCustomerFundThreeThree,
			ResearchCustomerFundThreeFour,
			ResearchCustomerFundThreeFive,
			ResearchCustomerFundFourOne,
			ResearchCustomerFundFiveOne,
			ResearchCustomerFundSixOne
    },
    created() {
      this.ShareCustomersInit(); //----------------------加载初始化数据
    },
    methods: {
      ShareCustomersInit(val) {
        var param = {
          pageInfo: {
            pageNum: 1,
            pageSize: 100,
            total: 0,
            orderBy: "",
            pages: 0
          },
          param: {
            Uuid: this.$store.getters.Uuid_formal
            // Uuid: "6FC7EC991A4AAA7EE0534947010AD2FC"
          }
        };
        getresearchcenterinfo(param)
          .then(response => {
            if (response.Meta.Code == "0000") {
              response.Data.forEach(item => {
                switch (item.ResearchCenterCustSubcls) {
                  case "101":
                    this.IsShowList101 = true;
                    break;
                  case "102":
                    this.IsShowList102 = true;
                    break;
                  case "103":
                    this.IsShowList103 = true;
                    break;
                  case "201":
                    this.IsShowList201 = true;
                    break;
                  case "301":
                    this.IsShowList301 = true;
                    break;
                  case "302":
                    this.IsShowList302 = true;
                    break;
                  case "303":
                    this.IsShowList303 = true;
                    break;
                  case "304":
                    this.IsShowList304 = true;
                    break;
                  case "305":
                    this.IsShowList305 = true;
                    break;
                  case "401":
                    this.IsShowList401 = true;
                    break;
                  case "501":
                    this.IsShowList501 = true;
                    break;
                  case "601":
                    this.IsShowList601 = true;
                    break;

                  default:
                    break;
                }
              });
            }
          })
          .catch(() => {});
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .yh_ResearchInvestment {
    font-size: 14px;
    min-height: 200px;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 10px;
    position: relative;
    .project_main {
      height: 100%;
      .project_title {
        color: #a7703d;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        margin: 10px 0;
        font-size: 14px;
        border-bottom: 1px solid #eeeeee;
        h3 {
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          border-bottom: 2px solid #cf8e3e;
        }
      }
      .content {
        height: 100%;
      }
    }
    button {
      margin: 0 3px;
    }
  }

</style>
