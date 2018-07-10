<template>
  <div class="yh-header">
    <div class="yh-head-menu clearfix">
      <ul class="clearfix">
        <li>
          <a href="javascript:void(0)">话务</a>
        </li>
        <li>
          <a href="javascript:void(0)"></a>
        </li>
        <li>
          <a href="javascript:void(0)"></a>
          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的团队</el-dropdown-item>
                <el-dropdown-item>个人</el-dropdown-item>
                <el-dropdown-item>其他</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </li>
        <li>
          <a href="javascript:void(0)"></a>
        </li>
        <li>
          <a href="javascript:void(0)">机构</a>
        </li>
        <li>
          <a  href="javascript:void(0)">零售</a>
        </li>
      </ul>
    </div>
    <div class="yh-head-nav">
      <ul class="clearfix">
        <li v-for="(nav_first,index) in navMenu" :key="index" @mouseover="showderails(index,nav_first)" @mouseout="hidederails(index)">
          <a href="javascript:void(0)" @click="goHomePage($event)">{{nav_first.meta.title}}
          </a>
          <div class="nav-showdetails clearfix" v-if="active===index" :style="'padding-left:'+ active * 80 +'px;'">
            <div class="showdetails_child fl" v-for="(nav_secomd,index) in nav_first.children" :key="index">
              <h5>{{nav_secomd.meta.title}}</h5>
              <a @click="handleClick($event,nav_first.path + '/' + nav_secomd.path  +'/' + nav_third.path)" v-for="(nav_third,index) in nav_secomd.children" :key="index">{{nav_third.meta.title}}</a>
              <!-- 这里是拼接处路由的可用路径，用于链接router的路由 -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import nav_assessment from "@/assets/header/nav-assessment.png";
import { mapGetters } from "vuex";

import publicRegistrationList from "@/views/organization/custmanage/regcustmanage/PublicRegistrationList";
export default {
  name: "Headeryh",
  props: {
    menu: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {
    var self = this;
    if (self.menu.length != 0) {
      self.navMenu = self.menu;
    };
    //alert("零售")
  },
  data() {
    return {
      active: null,
      navMenu: [
        {
          path: "",
          meta: {
            icon: "component",
            title: "首页1"
          }
        },
        {
          path: "/CustomerManagement", //客户管理  此为一级导航栏的标题，除首页外不需要跳转
          meta: {
            icon: "CustomerManagement",
            title: "客户管理1"
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
                  meta: { title: "我名下客户外部资产列表", icon: "", noCache: true }
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
            },
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
                  path: "KnowledgeBaseQuery", // 知识库查询11
                  component: "",
                  meta: { title: "知识库查询", icon: "", noCache: true }
                },
              ]
            },

          ]
        },
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
      ],
    };
  },
  components: {
    publicRegistrationList
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "allRouters"])
  },
  methods: {
    // 鼠标移入li元素显示，移除消失详情栏
    showderails: function(index, item) {
      this.active = index;
    },
    hidederails: function(index) {
      this.active = null;
    },
    handleClick(event, path) {
      //console.log(path);
      this.$router.push({ path: path }); //路由
    },
    //点击首页回到首页
    goHomePage(event) {
      var a = event.target.innerHTML;
      //console.log(a);
      if (a == "首页") {
        //console.log(1);
        this.$router.push({ path: "/#/dashboard" });
      }
    }
  }
};
</script>
<style scoped>
.yh-header {
  min-height: 96px;
  width: 100%;
  background: url(/src/assets/header/top.png) center right no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.yh-header .yh-head-menu {
  width: 100%;
  height: 56px;
  background: url(/src/assets/header/top-logo.png) 3% center no-repeat;
}

.yh-header .yh-head-menu ul {
  height: 26px;
  margin-top: 30px;
  float: right;
  font-size: 13px;
}

.yh-header .yh-head-menu ul li {
  float: left;
  width: 30px;
  height: 26px;
  line-height: 26px;
  margin-right: 20px;
}

.yh-header .yh-head-menu ul li a {
  color: #fff;
  display: block;
  width: 100%;
  height: 100%;
}

.yh-header .yh-head-menu ul li:nth-child(6) {
  margin-right: 30px;
}

.yh-header .yh-head-menu ul li:nth-child(5) {
  margin-right: 37px;
}

.yh-header .yh-head-menu ul li:nth-child(4) {
  background: url(/src/assets/header/top-loginout.png) center center no-repeat;
}
.yh-header .yh-head-menu ul li:nth-child(3) {
  margin: 0;
  width: 40px;
  background: url(/src/assets/header/top-man.png) left center no-repeat;
}
.yh-header .yh-head-menu ul li:nth-child(3) span {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.el-dropdown-menu {
  background: #fff;
}
.yh-header .yh-head-menu ul li:nth-child(3) span .el-dropdown {
  height: 16px;
}
.yh-header .yh-head-menu ul li:nth-child(3) a {
  display: inline-block;
  width: 20px;
}
.yh-header .yh-head-menu ul li:nth-child(2) {
  margin-right: 6px;
  background: url(/src/assets/header/top-q.png) center center no-repeat;
}
.yh-header .yh-head-menu ul li:nth-child(1) {
  margin-right: 7px;
  margin-top: 2px;
  width: 50px;
  height: 20px;
  padding-left: 4px;
  background: #fff;
  border-radius: 5px;
}
.yh-header .yh-head-menu ul li:nth-child(1) a {
  color: #000;
  width: 40px;
  line-height: 19px;
  text-align: right;
  background: url(/src/assets/header/top-hw.png) left center no-repeat;
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
  font-size: 14px;
  margin-right:44px;
}

.yh-header .yh-head-nav ul li a {
  padding-left: 30px;
  color: #ded1c4;
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
  background: url(/src/assets/header/nav-work1.png) 0% 55% no-repeat;
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
  height: 200px;
  box-shadow: #d5dcd8 0px 4px 6px;
  box-sizing: border-box;
  z-index: 1000;
  background: #fff;
  opacity: 0.94;
}

.yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child {
  min-width: 160px;
  padding-top: 14px;
  padding-left: 50px;
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
  padding: 0 4px;
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
||||||| .r1647
<template>
  <div class="yh-header">
    <div class="yh-head-menu clearfix">
      <ul class="clearfix">
        <li>
          <a href="javascript:void(0)">话务</a>
        </li>
        <li>
          <a href="javascript:void(0)"></a>
        </li>
        <li>
          <a href="javascript:void(0)"></a>
          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的团队</el-dropdown-item>
                <el-dropdown-item>个人</el-dropdown-item>
                <el-dropdown-item>其他</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </li>
        <li>
          <a href="javascript:void(0)"></a>
        </li>
        <li>
          <a href="javascript:void(0)">机构</a>
        </li>
        <li>
          <a  href="javascript:void(0)">零售</a>
        </li>
      </ul>
    </div>
    <div class="yh-head-nav">
      <ul class="clearfix">
        <li v-for="(nav_first,index) in navMenu" :key="index" @mouseover="showderails(index,nav_first)" @mouseout="hidederails(index)">
          <a href="javascript:void(0)" @click="goHomePage($event)">{{nav_first.meta.title}}
          </a>
          <div class="nav-showdetails clearfix" v-if="active===index" :style="'padding-left:'+ active * 80 +'px;'">
            <div class="showdetails_child fl" v-for="(nav_secomd,index) in nav_first.children" :key="index">
              <h5>{{nav_secomd.meta.title}}</h5>
              <a @click="handleClick($event,nav_first.path + '/' + nav_secomd.path  +'/' + nav_third.path)" v-for="(nav_third,index) in nav_secomd.children" :key="index">{{nav_third.meta.title}}</a>
              <!-- 这里是拼接处路由的可用路径，用于链接router的路由 -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import nav_assessment from "@/assets/header/nav-assessment.png";
import { mapGetters } from "vuex";

import publicRegistrationList from "@/views/organization/custmanage/regcustmanage/PublicRegistrationList";
export default {
  name: "Headeryh",
  props: {
    menu: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {
    var self = this;
    if (self.menu.length != 0) {
      self.navMenu = self.menu;
    };
    //alert("零售")
  },
  data() {
    return {
      active: null,
      navMenu: [
        {
          path: "",
          meta: {
            icon: "component",
            title: "首页1"
          }
        },
        {
          path: "/CustomerManagement", //客户管理  此为一级导航栏的标题，除首页外不需要跳转
          meta: {
            icon: "CustomerManagement",
            title: "客户管理1"
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
                  meta: { title: "我名下客户外部资产列表", icon: "", noCache: true }
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
            },
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
            }
            ,
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
                },
              ]
            },

          ]
        },
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
      ],
    };
  },
  components: {
    publicRegistrationList
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "allRouters"])
  },
  methods: {
    // 鼠标移入li元素显示，移除消失详情栏
    showderails: function(index, item) {
      this.active = index;
    },
    hidederails: function(index) {
      this.active = null;
    },
    handleClick(event, path) {
      //console.log(path);
      this.$router.push({ path: path }); //路由
    },
    //点击首页回到首页
    goHomePage(event) {
      var a = event.target.innerHTML;
      //console.log(a);
      if (a == "首页") {
        //console.log(1);
        this.$router.push({ path: "/#/dashboard" });
      }
    }
  }
};
</script>
<style scoped>
.yh-header {
  min-height: 96px;
  width: 100%;
  background: url(/src/assets/header/top.png) center right no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.yh-header .yh-head-menu {
  width: 100%;
  height: 56px;
  background: url(/src/assets/header/top-logo.png) 3% center no-repeat;
}

.yh-header .yh-head-menu ul {
  height: 26px;
  margin-top: 30px;
  float: right;
  font-size: 13px;
}

.yh-header .yh-head-menu ul li {
  float: left;
  width: 30px;
  height: 26px;
  line-height: 26px;
  margin-right: 20px;
}

.yh-header .yh-head-menu ul li a {
  color: #fff;
  display: block;
  width: 100%;
  height: 100%;
}

.yh-header .yh-head-menu ul li:nth-child(6) {
  margin-right: 30px;
}

.yh-header .yh-head-menu ul li:nth-child(5) {
  margin-right: 37px;
}

.yh-header .yh-head-menu ul li:nth-child(4) {
  background: url(/src/assets/header/top-loginout.png) center center no-repeat;
}
.yh-header .yh-head-menu ul li:nth-child(3) {
  margin: 0;
  width: 40px;
  background: url(/src/assets/header/top-man.png) left center no-repeat;
}
.yh-header .yh-head-menu ul li:nth-child(3) span {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.el-dropdown-menu {
  background: #fff;
}
.yh-header .yh-head-menu ul li:nth-child(3) span .el-dropdown {
  height: 16px;
}
.yh-header .yh-head-menu ul li:nth-child(3) a {
  display: inline-block;
  width: 20px;
}
.yh-header .yh-head-menu ul li:nth-child(2) {
  margin-right: 6px;
  background: url(/src/assets/header/top-q.png) center center no-repeat;
}
.yh-header .yh-head-menu ul li:nth-child(1) {
  margin-right: 7px;
  margin-top: 2px;
  width: 50px;
  height: 20px;
  padding-left: 4px;
  background: #fff;
  border-radius: 5px;
}
.yh-header .yh-head-menu ul li:nth-child(1) a {
  color: #000;
  width: 40px;
  line-height: 19px;
  text-align: right;
  background: url(/src/assets/header/top-hw.png) left center no-repeat;
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
}

.yh-header .yh-head-nav ul li a {
  padding-left: 30px;
  color: #ded1c4;
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
  background: url(/src/assets/header/nav-customer1.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(3):hover a,
.yh-header .yh-head-nav ul li:nth-child(3).active a {
  color: #fff;
  background: url(/src/assets/header/nav-customer.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(4) a {
  background: url(/src/assets/header/nav-assessment1.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(4):hover a,
.yh-header .yh-head-nav ul li:nth-child(4).active a {
  color: #fff;
  background: url(/src/assets/header/nav-assessment.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(5) a {
  background: url(/src/assets/header/nav-staff1.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(5):hover a,
.yh-header .yh-head-nav ul li:nth-child(5).active a {
  color: #fff;
  background: url(/src/assets/header/nav-staff.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(6) a {
  background: url(/src/assets/header/nav-product1.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(6):hover a,
.yh-header .yh-head-nav ul li:nth-child(6).active a {
  color: #fff;
  background: url(/src/assets/header/nav-product.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(7) a {
  background: url(/src/assets/header/nav-work_1.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(7):hover a,
.yh-header .yh-head-nav ul li:nth-child(7).active a {
  color: #fff;
  background: url(/src/assets/header/nav-work_.png) 0% 55% no-repeat;
}

.yh-header .yh-head-nav ul li:nth-child(8) a {
  background: url(/src/assets/header/nav-set1.png) 0% 55% no-repeat;
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
  height: 200px;
  box-shadow: #d5dcd8 0px 4px 6px;
  box-sizing: border-box;
  z-index: 1000;
  background: #fff;
  opacity: 0.94;
}

.yh-header .yh-head-nav ul li .nav-showdetails .showdetails_child {
  min-width: 160px;
  padding-top: 14px;
  padding-left: 50px;
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
  padding: 0 4px;
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
