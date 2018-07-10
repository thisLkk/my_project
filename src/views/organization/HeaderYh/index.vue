<template>
  <div class="yh-header">
    <div class="yh-head-menu clearfix">
      <ul>
        <li class="user-name">
          <i></i>
          <span>您好 ! {{this.$store.getters.userName || ''}}</span>
        </li>
        <li @click="SignOut">
          <a class="SignOut" href="javascript:void(0)">退出</a>
        </li>
        <li><img src="~@/assets/organization/customermanage/clock.png" style=""/> 当前业务时间:{{this.$store.getters.busDate}}</li>
      </ul>
    </div>
    <div class="yh-head-nav">
      <ul class="clearfix">
        <li><a href="javascript:void(0)" @click="goHomePage($event)">首页</a></li>
        <li v-for="(nav_first,index) in navMenu" :key="index" @mouseover="showderails(index,nav_first)" @mouseout="hidederails(index)"
          v-if="nav_first.meta != undefined">
          <a href="javascript:void(0)" >{{nav_first.meta.title}}
          </a>
          <!-- <div class="nav-showdetails clearfix" v-if="active===index" :style="'padding-left:'+ active * 80/5 +'px;'"> -->
          <div class="nav-showdetails clearfix" v-if="active===index" :style="'padding-left:' + padding_left + 'px'">
            <div class="showdetails_child fl" v-for="(nav_secomd,index) in nav_first.subs" :key="index">
              <h5>{{nav_secomd.meta.title}}</h5>
              <a @click="handleClick($event, nav_third.path)" v-for="(nav_third,index) in nav_secomd.children" :key="index">{{nav_third.meta.title}}</a>
              <!-- 这里是拼接处路由的可用路径，用于链接router的路由 -->
            </div>
          </div>
        </li>

        <!--<li style="font-size: 14px;color: white"><img src="" style=""/> 当前业务时间:{{this.$store.getters.busDate}}</li>-->
      </ul>
    </div>
  </div>
</template>
<script>
  import nav_assessment from "@/assets/header/nav-assessment.png";
  import {
    mapGetters
  } from "vuex";
  import store from '@/store'
  import publicRegistrationList from "@/views/organization/custmanage/regcustmanage/PublicRegistrationList";

  export default {
    name: "Headeryh",
    props: {
      menu: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    created() {
      var self = this;
      if (self.menu.length != 0) {
        self.navMenu = self.menu;
      } else {
        ////console.log("allRouter:", JSON.stringify(self.allRouters))
        self.navMenu = self.allRouters;
      }
      // alert("机构")
    },
    data() {
      return {
        active: null,
        padding_left: null, //动态来给菜单绑定panding
        navMenu: [
          /*
          {
            path: "",
            meta: {
              icon: "component",
              title: "首页"
            }
          },
          {
            path: "/CustomerManagement", //客户管理  此为一级导航栏的标题，除首页外不需要跳转
            meta: {
              icon: "CustomerManagement",
              title: "客户管理"
            },
            children: [
              {
                path: "RegisteredCustomerManagement", //注册客户管理   二级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
                meta: {
                  title: "注册客户管理",
                  icon: "RegisteredCustomerManagement",
                  noCache: true
                },
                children: [
                  {
                    path: "publicRegistrationList", //下面的子元素跳转
                    component: "",
                    meta: { title: "公开客户列表", icon: "", noCache: true }
                  },
                  {
                    path: "RegCustManage",
                    component: "",
                    meta: { title: "我的注册客户", icon: "", noCache: true }
                  },
                  {
                    path: "RegCustQuery",
                    component: "",
                    meta: { title: "注册客户查询", icon: "", noCache: true }
                  }
                ]
              },
              {
                path: "FormalCustomerManagement", //正式客户管理  二级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
                meta: {
                  title: "正式客户管理",
                  icon: "documentation",
                  noCache: true
                },
                children: [
                  {
                    path: "FormalCustomerManage", //正式客户管理
                    component: "",
                    meta: { title: "我的正式客户", icon: "", noCache: true }
                  },
                  {
                    path: "FormalCustomerQuery", // 正式客户查询
                    component: "",
                    meta: { title: "正式客户查询", icon: "", noCache: true }
                  },
                  {
                    path: "InvestmentBankProjectSummary", //投资项目汇总
                    component: "",
                    meta: { title: "投行项目汇总", icon: "", noCache: true }
                  }
                ]
              },
              {
                path: "strategycustmanage", //战略客户管理  二级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
                meta: {
                  title: "战略客户管理",
                  icon: "strategycustmanage",
                  noCache: true
                },
                children: [
                  {
                    path: "CustomerManagements", //战略客户管理
                    component: "",
                    meta: { title: "我的战略客户", icon: "", noCache: true }
                  },
                  {
                    path: "StrategicCustomerQuery", //战略客户查询
                    component: "",
                    meta: { title: "战略客户查询", icon: "", noCache: true }
                  }
                ]
              }
            ]
          },
          {
            path: "/Collaborationmanage",
            meta: {
              icon: "Collaborationmanage",
              title: "协同管理"
            },
            children: [
              {
                path: "Collaborationbusoppmanage",
                meta: {
                  title: "协同商机管理",
                  icon: "Collaborationbusoppmanage",
                  noCache: true
                },
                children: [
                  {
                    path: "MySynergyBusinessOpportunity",
                    component: "",
                    meta: { title: "我的协同商机", icon: "", noCache: true }
                  },
                  {
                    path: "CollaborativeBusinessOpportunityRelease",
                    component: "",
                    meta: { title: "协同商机发布", icon: "", noCache: true }
                  }
                ]
              },
              {
                path: "Collaborationbusoppquery",
                meta: {
                  title: "协同商机查询",
                  icon: "Collaborationbusoppquery",
                  noCache: true
                },
                children: [
                  {
                    path: "MyTeamBusinessOpportunities",
                    component: "",
                    meta: { title: "我团队协同商机", icon: "", noCache: true }
                  },
                  {
                    path: "OurOrganizationBusinessOpportunities",
                    component: "",
                    meta: { title: "我机构协同商机", icon: "", noCache: true }
                  }
                ]
              }
            ]
          },
          {
            path: "/OpportunityManage",
            meta: {
              icon: "OpportunityManage",
              title: "商机管理"
            },
            children: [
              {
                path: "OpportunityManagement",
                meta: {
                  title: "商机管理",
                  icon: "OpportunityManagement",
                  noCache: true
                },
                children: [
                  {
                    path: "ExternalassetsList",
                    component: "",
                    meta: {
                      title: "我名下客户外部资产列表",
                      icon: "",
                      noCache: true
                    }
                  },
                  {
                    path: "InstitutionalBusinessTargetCustomer",
                    component: "",
                    meta: { title: "机构业务目标客户", icon: "", noCache: true }
                  }
                ]
              }
            ]
          },

          {
            path: "/ProductManage", //产品管理  此为一级导航栏的标题，除首页外不需要跳转
            meta: {
              icon: "ProductManage",
              title: "产品管理"
            },
            children: [
              {
                path: "ProductManagement", //产品管理   二级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
                meta: {
                  title: "产品管理",
                  icon: "ProductManagement",
                  noCache: true
                },
                children: [
                  {
                    path: "ProductQuery",
                    component: "",
                    meta: { title: "产品查询", icon: "", noCache: true }
                  },
                  {
                    path: "ImportantProductSell", //下面的子元素跳转
                    component: "",
                    meta: { title: "重要产品销售", icon: "", noCache: true }
                  }
                ]
              }
            ]
          },
          {
            path: "/ResourceManage", //资源管理  此为一级导航栏的标题，除首页外不需要跳转
            meta: {
              icon: "ResourceManage",
              title: "资源管理"
            },
            children: [
              {
                path: "ResourceRanagement", //资源管理   二级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
                meta: {
                  title: "资源管理",
                  icon: "ResourceRanagement",
                  noCache: true
                },
                children: [
                  {
                    path: "BusinessAddressBookManagement",
                    component: "",
                    meta: { title: "业务通讯录管理", icon: "", noCache: true }
                  },
                  {
                    path: "BusinessAddressBookAuery", //下面的子元素跳转
                    component: "",
                    meta: { title: "业务通讯录查询", icon: "", noCache: true }
                  }
                ]
              },
              {
                path: "KnowledgeBaseManagement", //正式客户管理  二级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
                meta: {
                  title: "知识库管理",
                  icon: "documentation",
                  noCache: true
                },
                children: [
                  {
                    path: "KnowledgeBaseManagements", //知识库管理
                    component: "",
                    meta: { title: "知识库管理", icon: "", noCache: true }
                  },
                  {
                    path: "KnowledgeBaseQuery", // 知识库查询
                    component: "",
                    meta: { title: "知识库查询", icon: "", noCache: true }
                  }
                ]
              }
            ]
          }
          // {
          //   path: "",
          //   meta: {
          //     icon: "component",
          //     title: "系统管理"
          //   },
          //   children: [
          //     {
          //       path: "",
          //       meta: {
          //         title: "客户管理1",
          //         icon: "documentation",
          //         noCache: true
          //       },
          //       children: [
          //         {
          //           path: "",
          //           component: "",
          //           meta: { title: "客戶管理11", icon: "", noCache: true }
          //         },
          //         {
          //           path: "",
          //           component: "",
          //           meta: { title: "客戶管理12", icon: "", noCache: true }
          //         },
          //         {
          //           path: "",
          //           component: "",
          //           meta: { title: "客戶管理13", icon: "", noCache: true }
          //         },
          //         {
          //           path: "",
          //           component: "",
          //           meta: { title: "客戶管理14", icon: "", noCache: true }
          //         }
          //       ]
          //     }
          //   ]
          // }
          */
        ]
      };
    },
    components: {
      publicRegistrationList
    },
    computed: {
      ...mapGetters(["sidebar", "name", "avatar", "allRouters"])
    },
    methods: {
      aaa() {
        //用来做零售
        this.$router.push({
          path: "/aaa"
        });
        this.$store.dispatch("setOrg", "零售");
      },
      // 鼠标移入li元素显示，移除消失详情栏
      showderails: function (index, item) {
        this.active = index;
        switch (index) {
          case 4:
            this.padding_left = 20
            break;
          case 5:
            this.padding_left = 90
            break;
          case 6:
            this.padding_left = 240
            break;
          case 7:
            this.padding_left = 390
            break;
          case 8:
            this.padding_left = 545
            break;
          case 9:
            this.padding_left = 694
            break;
          case 10:
            this.padding_left = 880
            break;

          default:
            break;
        }
      },
      hidederails: function (index) {
        this.active = null;
      },
      handleClick(event, path) {
        // //console.log(path);
        this.$router.push({
          path: path
        }); //路由
      },
      //点击首页回到首页
      goHomePage(event) {
        var name = event.target.innerText;
        if (name == "首页") {
          this.$router.push({
            path: "/"
          });
        }
      },
      //这里是做的退出
      SignOut() {
        store.dispatch("FedLogOut").then(() => {
          //this.$router.push({ path: '/login' })
          location.reload()
        })
      },
      //机构
      mechanism() {
        //alert("22");
      },
      //零售
      retail() {
        // alert("11");
      }
    }
  };

</script>
<style scoped>
  .yh-header {
    min-height: 96px;
    width: 100%;
    background: url('~@/assets/header/jg-topbg.png') center right no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .yh-header .yh-head-menu {
    width: 100%;
    height: 56px;
    background: url('~@/assets/header/top-logo.png') 3% center no-repeat;
  }

  .yh-header .yh-head-menu ul {
    height: 60px;
    margin-top: 30px;
    float: right;
    font-size: 13px;
    margin-right: 140px;
    width:230px;
  }

  .yh-header .yh-head-menu ul li {
    float: left;
    height: 30px;
    line-height: 30px;
  }

  .yh-header .yh-head-menu ul li a {
    color: #fff;
    display: block;
    width: 40px;
    height: 100%;
  }

  .yh-header .yh-head-menu ul li:nth-child(2) {
    background: url('~@/assets/header/top-loginout.png') 0 center no-repeat;
    padding-left: 28px;
    cursor: pointer;

  }

  .yh-header .yh-head-menu ul li:nth-child(1) {
    padding-right: 20px;
    min-width: 30px;
    margin: 0;
    width: 157px;
    background: url('~@/assets/header/top-man.png') left center no-repeat;
  }

  .yh-header .yh-head-menu ul li:nth-child(1) span {
    display: block;
    height: 26px;
    padding-left: 6px;
  }
  .yh-header .yh-head-menu ul li:nth-child(3){
    clear:both;
    color:#e4b149;
    font-size: 12px;
    font-family:"微软雅黑";
  }
  .yh-header .yh-head-menu ul li:nth-child(3){
    font-size:13px;
    font-weight:bold;
    font-family:"微软雅黑";
  }
  .yh-header .yh-head-menu ul li:nth-child(3) img{
    position:relative;
    top:4px;
  }

  .yh-header .yh-head-menu ul .user-name {
    color: #fff;
    display: flex;
    display: -webkit-flex;
  }

  .el-dropdown-menu {
    background: #fff;
  }

  .yh-header .yh-head-menu ul li:nth-child(1) span .el-dropdown {
    height: 16px;
  }

  .yh-header .yh-head-menu ul li:nth-child(1) i {
    display: inline-block;
    width: 20px;
  }

  /* 导航栏 */

  .yh-header .yh-head-nav {
    height: 40px;
    width: 100%;
  }

  .yh-header .yh-head-nav ul {
    position: relative;
  }

  .yh-header .yh-head-nav ul li {
    float: left;
    line-height: 40px;
    font-size: 15px;
    font-weight:bold;
    margin-right:32px;
  }

  .yh-header .yh-head-nav ul li a {
    padding-left: 30px;
    padding-right:10px;
    color: #fff;
    width: 100%;
    height: 100%;
    display: block;
    text-align: left;
    margin-left: 20px;
  }

  .yh-header .yh-head-nav ul li:hover {
    background: url(/src/assets/header/submenu-sj.png) 0% 55% no-repeat;
    background-position: 60px 32px;
  }

  .yh-header .yh-head-nav ul li:nth-child(1) a {
    background: url(/src/assets/header/nav-work.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(1):hover a,
  .yh-header .yh-head-nav ul li:nth-child(1).active a {
    color: #fff;
    background: url(/src/assets/header/nav-work.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(2) a {
    background: url(/src/assets/header/nav-business.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(2):hover a,
  .yh-header .yh-head-nav ul li:nth-child(2).active a {
    color: #fff;
    background: url(/src/assets/header/nav-business.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(3) a {
    background: url(/src/assets/header/nav-customer.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(3):hover a,
  .yh-header .yh-head-nav ul li:nth-child(3).active a {
    color: #fff;
    background: url(/src/assets/header/nav-customer.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(4) a {
    background: url(/src/assets/header/nav-assessment.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(4):hover a,
  .yh-header .yh-head-nav ul li:nth-child(4).active a {
    color: #fff;
    background: url(/src/assets/header/nav-assessment.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(5) a {
    background: url(/src/assets/header/nav-staff.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(5):hover a,
  .yh-header .yh-head-nav ul li:nth-child(5).active a {
    color: #fff;
    background: url(/src/assets/header/nav-staff.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(6) a {
    background: url(/src/assets/header/nav-product.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(6):hover a,
  .yh-header .yh-head-nav ul li:nth-child(6).active a {
    color: #fff;
    background: url(/src/assets/header/nav-product.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(7) a {
    background: url(/src/assets/header/nav-work_.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(7):hover a,
  .yh-header .yh-head-nav ul li:nth-child(7).active a {
    color: #fff;
    background: url(/src/assets/header/nav-work_.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(8) a {
    background: url(/src/assets/header/nav-set.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li:nth-child(8):hover a,
  .yh-header .yh-head-nav ul li:nth-child(8).active a {
    color: #fff;
    background: url(/src/assets/header/nav-set.png) 0% 55% no-repeat;
  }

  .yh-header .yh-head-nav ul li .nav-showdetails {
    position: absolute;
    top: 40px;
    left: 0;
    /* display: block; */
    width: 100%;
    height: 150px;
    box-shadow: #d5dcd8 0px 4px 6px;
    box-sizing: border-box;
    z-index: 100;
    background: #fff;
    opacity: 0.94;
  }

  .yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child {
    min-width: 160px;
    padding-top: 14px;
    padding-left: 85px;
    display: inline-block;
    box-sizing: border-box;
  }

  .yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child h5 {
    height: 33px;
    line-height: 33px;
    font-size: 14px;
    border-bottom: 2px solid #af6e20;
  }

  .yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child a {
    padding:0 2px;
    margin: 4px 0;
    color: #333333;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    border-bottom: 1px solid #d8d8d8;
  }

  .yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child a.active,
  .yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child a:hover {
    background: #f29d4c;
    color: #fff;
  }

</style>
