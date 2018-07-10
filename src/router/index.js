import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '@/views/layout/Layout'
import SubLayout from '@/views/layout/SubLayout'

// 客户管理   一级  CustomerManagement  客户管理  标题

/* ——————注册客户管理 */ // 二级  RegisteredCustomerManagement 注册客户管理 标题
import PublicRegistrationList from '@/views/organization/custmanage/regcustmanage/PublicRegistrationList' //公开客户列表
import RegCustManage from '@/views/organization/custmanage/regcustmanage/RegCustManage' /*注册客户管理*/
import RegCustQuery from '@/views/organization/custmanage/regcustmanage/RegCustQuery' /*注册客户查询*/
import ListedcompanySubmersible360View from '@/views/organization/custmanage/regcustmanage/ListedcompanySubmersible360View' /*上市公司潜客360视图-平铺 */
import InvestmentbankSubmersible360View from '@/views/organization/custmanage/regcustmanage/InvestmentbankSubmersible360View' /*投行潜客360视图-平铺 */
import PanoramicViewRegCust from '@/views/organization/custmanage/regcustmanage/PanoramicViewRegCust' /*注册客户-客户360视图-传统 */
/* ——————正式客户管理 */ // 二级  FormalCustomerManagement 正式客户管理 标题
import FormalCustomerManage from '@/views/organization/custmanage/formalcustmanage/FormalCustomerManage' //正式客户管理
import FormalCustomerQuery from '@/views/organization/custmanage/formalcustmanage/FormalCustomerQuery' /*正式客户查询 */
import InvestmentBankProjectSummary from '@/views/organization/custmanage/formalcustmanage/InvestmentBankProjectSummary' /*投行项目总汇 */

import Mechanism360TileView from '@/views/organization/custmanage/formalcustmanage/Mechanism360TileView' /*正式客户管理--客户360视图首页*/
import PanoramicView from '@/views/organization/custmanage/formalcustmanage/PanoramicView' /*客户360视图-传统 */
import PanoramaHead from '@/views/organization/custmanage/components/PanoramaHead' /*客户360视图头-传统 */
import PanoramicBusinessInformation from '@/views/organization/custmanage/components/PanoramicBusinessInformation' //360传统试图业务信息子路由总管lu
import EconomicAndBusinessAepartment from '@/views/organization/custmanage/components/EconomicAndBusinessAepartment' //业务信息子路由——经济业务部lu
import GalacticGoldenSink from '@/views/organization/custmanage/components/GalacticGoldenSink' //业务信息子路由--银河金汇lu
import ResearchInstitute from '@/views/organization/custmanage/components/ResearchInstitute' //业务信息子路由--研究院lu
import InvestmentBankHeadquarters from '@/views/organization/custmanage/components/InvestmentBankHeadquarters' //业务信息子路由--投资银行总部lu
import BondInvestmentDepartment from '@/views/organization/custmanage/components/BondInvestmentDepartment' //业务信息子路由--债券投资总部lu
import DerivativesHeadquarters from '@/views/organization/custmanage/components/DerivativesHeadquarters' //业务信息子路由--衍生品总部lu
import SecuritiesFinancialHeadquarters from '@/views/organization/custmanage/components/SecuritiesFinancialHeadquarters' //业务信息子路由--产品总部lu
import ProductCenter from '@/views/organization/custmanage/components/ProductCenter' //业务信息子路由--证券金融总部lu
import MilkyWayFutures from '@/views/organization/custmanage/components/MilkyWayFutures' //业务信息子路由--银河期货lu
import MilkyWayInsurance from '@/views/organization/custmanage/components/MilkyWayInsurance' //业务信息子路由--银河保险lu
import GalacticFund from '@/views/organization/custmanage/components/GalacticFund' //业务信息子路由--银河基金lu

/* ————————战略客户管理 */ // 二级  strategycustmanage 战略客户管理 标题
import CustomerManagements from '@/views/organization/custmanage/strategycustmanage/CustomerManagements' //战略客户管理
import StrategicCustomerQuery from '@/views/organization/custmanage/strategycustmanage/StrategicCustomerQuery' /*战略客户查询 */
// -----------------------------------------------------------------------------------------------------------------------------------------------------------
//资源管理        一级
//——————————资源管理        二级
import BusinessAddressBookManagement from '@/views/organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement' //业务通讯录管理
import BusinessAddressBookAuery from '@/views/organization/resourcemanage/resourcemanagement/BusinessAddressBookAuery' //业务通讯录查询lu
//——————————知识库管理      二级
import KnowledgeBaseManagement from '@/views/organization/resourcemanage/KnowledgeBaseManagement/KnowledgeBaseManagement' //知识库管理lu
import KnowledgeBaseQuery from '@/views/organization/resourcemanage/KnowledgeBaseManagement/KnowledgeBaseQuery' //知识库查询lu

//-------------------------------------------------------------------------------------------------------------------------------------------
//协同管理        一级
//——————————协同商机管理 二级       collaborationbusoppmanage 标题
import MySynergyBusinessOpportunity from '@/views/organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity' //我的协同管理lu
import CollaborativeBusinessOpportunityRelease from '@/views/organization/collaborationmanage/collaborationbusoppmanage/CollaborativeBusinessOpportunityRelease' //协同商机发布lu
//——————————协同商机查询 二级       collaborationbusoppquery 标题
import MyTeamBusinessOpportunities from '@/views/organization/collaborationmanage/collaborationbusoppquery/MyTeamBusinessOpportunities' //我团队的协同商机lu
import OurOrganizationBusinessOpportunities from '@/views/organization/collaborationmanage/collaborationbusoppquery/OurOrganizationBusinessOpportunities' //我机构的协同商机lu
//-------------------------------------------------------------------------------------------------------------------------------------------

//产品管理--产品查询
import ProductQuery from '@/views/organization/productmanage/ProductQuery'
import ImportantProductSell from '@/views/organization/productmanage/ImportantProductSell'

//--------------------------------------------------------------------------------------------------------------------------------------------

//商机管理      一级
//——————————我名下客户外部资产列表  二级
import ExternalassetsList from '@/views/organization/businessopportunitymanage/ExternalassetsLists'
//——————————机构业务目标客户   二级
import InstitutionalBusinessTargetCustomer from '@/views/organization/businessopportunitymanage/InstitutionalBusinessTargetCustomer'
//--------------------------------------------------------------------------------------------------------------------------------------------
//快速查询内容
import QuikSearchContent from '@/views/dashboard/quiksearch/QuikSearchContent'


export const componentMap = {
  'Layout': Layout,
  /*
  'SubLayout': {
    render(c) {
      return c('router-view')
    }
  },*/
  'SubLayout': SubLayout,
  'userManager': _import('admin/user/index'),
  'menuManager': _import('admin/menu/index'),
  'groupManager': _import('admin/group/index'),
  'groupTypeManager': _import('admin/groupType/index'),
  'gateLogManager': _import('admin/gateLog/index'),
  'permission': _import('permission/index'),
  'dataDictionary': _import('sys/dataDictionary/index'),
  'icons': _import('svg-icons/index'),
  'tinymce-demo': _import('components-demo/tinymce'),
  'markdown-demo': _import('components-demo/markdown'),
  'jsonEditor-demo': _import('components-demo/jsonEditor'),
  'dndList-demo': _import('components-demo/dndList'),
  'splitpane-demo': _import('components-demo/splitpane'),
  'avatarUpload-demo': _import('components-demo/avatarUpload'),
  'dropzone-demo': _import('components-demo/dropzone'),
  'sticky-demo': _import('components-demo/sticky'),
  'countTo-demo': _import('components-demo/countTo'),
  'componentMixin-demo': _import('components-demo/mixin'),
  'backToTop-demo': _import('components-demo/backToTop'),
  'easyTable-demo': _import('components-demo/easyTable'),
  'complexSearch-demo': _import('components-demo/complexSearch'),
  'keyboardChart': _import('charts/keyboard'),
  'lineChart': _import('charts/line'),
  'mixChart': _import('charts/mixChart'),
  'dynamicTable': _import('example/table/dynamicTable/index'),
  'dragTable': _import('example/table/dragTable'),
  'inlineEditTable': _import('example/table/inlineEditTable'),
  'treeTable': _import('example/table/treeTable/treeTable'),
  'customTreeTable': _import('example/table/treeTable/customTreeTable'),
  'complexTable': _import('example/table/complexTable'),
  'tab': _import('example/tab/index'),
  'createForm': _import('form/create'),
  'editForm': _import('form/edit'),
  'page401': _import('errorPage/401'),
  'page404': _import('errorPage/404'),
  'errorLog': _import('errorLog/index'),
  'exportExcel': _import('excel/exportExcel'),
  'selectExcel': _import('excel/selectExcel'),
  'uploadExcel': _import('excel/uploadExcel'),
  'exportZip': _import('zip/index'),
  'theme': _import('theme/index'),
  'clipboardDemo': _import('clipboard/index'),
  'i18n': _import('i18n-demo/index'),
  // 银河路由
  'PublicRegistrationList': _import('organization/custmanage/regcustmanage/PublicRegistrationList/index'), //公开客户列表
  'RegCustManage': _import('organization/custmanage/regcustmanage/RegCustManage/index'),
  /*注册客户管理*/
  'RegCustQuery': _import('organization/custmanage/regcustmanage/RegCustQuery/index'),
  /*注册客户查询*/
  'ListedcompanySubmersible360View': _import('organization/custmanage/regcustmanage/ListedcompanySubmersible360View/index'),
  /*上市公司潜客360视图-平铺 */
  'InvestmentbankSubmersible360View': _import('organization/custmanage/regcustmanage/InvestmentbankSubmersible360View/index'),
  /*投行潜客360视图-平铺 */
  'PanoramicViewRegCust': _import('organization/custmanage/regcustmanage/PanoramicViewRegCust/index'),
  /*注册客户-客户360视图-传统 */
  /* ——————正式客户管理 */ // 二级  FormalCustomerManagement 正式客户管理 标题
  'FormalCustomerManage': _import('organization/custmanage/formalcustmanage/FormalCustomerManage/index'), //正式客户管理
  'FormalCustomerQuery': _import('organization/custmanage/formalcustmanage/FormalCustomerQuery/index'),
  /*正式客户查询 */
  'InvestmentBankProjectSummary': _import('organization/custmanage/formalcustmanage/InvestmentBankProjectSummary/index'),
  /*投行项目总汇 */

  'Mechanism360TileView': _import('organization/custmanage/formalcustmanage/Mechanism360TileView/index'),
  /*正式客户管理--客户360视图首页*/
  'PanoramicView': _import('organization/custmanage/formalcustmanage/PanoramicView/index'),
  /*客户360视图-传统 */
  'PanoramaHead': _import('organization/custmanage/components/PanoramaHead'),
  /*客户360视图头-传统 */
  'PanoramicBusinessInformation': _import('organization/custmanage/components/PanoramicBusinessInformation'), //360传统试图业务信息子路由总管lu
  'EconomicAndBusinessAepartment': _import('organization/custmanage/components/EconomicAndBusinessAepartment'), //业务信息子路由——经济业务部lu
  'GalacticGoldenSink': _import('organization/custmanage/components/GalacticGoldenSink'), //业务信息子路由--银河金汇lu
  'ResearchInstitute': _import('organization/custmanage/components/ResearchInstitute'), //业务信息子路由--研究院lu
  'InvestmentBankHeadquarters': _import('organization/custmanage/components/InvestmentBankHeadquarters'), //业务信息子路由--投资银行总部lu
  'BondInvestmentDepartment': _import('organization/custmanage/components/BondInvestmentDepartment'), //业务信息子路由--债券投资总部lu
  'DerivativesHeadquarters': _import('organization/custmanage/components/DerivativesHeadquarters'), //业务信息子路由--衍生品总部lu
  'SecuritiesFinancialHeadquarters': _import('organization/custmanage/components/SecuritiesFinancialHeadquarters'), //业务信息子路由--产品总部lu
  'ProductCenter': _import('organization/custmanage/components/ProductCenter'), //业务信息子路由--证券金融总部lu
  'MilkyWayFutures': _import('organization/custmanage/components/MilkyWayFutures'), //业务信息子路由--银河期货lu
  'MilkyWayInsurance': _import('organization/custmanage/components/MilkyWayInsurance'), //业务信息子路由--银河保险lu
  'GalacticFund': _import('organization/custmanage/components/GalacticFund'), //业务信息子路由--银河基金lu

  /* ————————战略客户管理 */ // 二级  strategycustmanage 战略客户管理 标题
  'CustomerManagements': _import('organization/custmanage/strategycustmanage/CustomerManagements/index'), //战略客户管理
  'StrategicCustomerQuery': _import('organization/custmanage/strategycustmanage/StrategicCustomerQuery/index'),
  /*战略客户查询 */
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------
  //资源管理        一级
  //——————————资源管理        二级
  'BusinessAddressBookManagement': _import('organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement/index'), //业务通讯录管理
  'BusinessAddressBookAuery': _import('organization/resourcemanage/resourcemanagement/BusinessAddressBookAuery/index'), //业务通讯录查询lu
  //——————————知识库管理      二级
  'KnowledgeBaseManagement': _import('organization/resourcemanage/KnowledgeBaseManagement/KnowledgeBaseManagement/index'), //知识库管理lu
  'KnowledgeBaseQuery': _import('organization/resourcemanage/KnowledgeBaseManagement/KnowledgeBaseQuery/index'), //知识库查询lu

  //-------------------------------------------------------------------------------------------------------------------------------------------
  //协同管理        一级
  //——————————协同商机管理 二级       collaborationbusoppmanage 标题
  'MySynergyBusinessOpportunity': _import('organization/collaborationmanage/collaborationbusoppmanage/MySynergyBusinessOpportunity/index'), //我的协同管理lu
  'CollaborativeBusinessOpportunityRelease': _import('organization/collaborationmanage/collaborationbusoppmanage/CollaborativeBusinessOpportunityRelease/index'), //协同商机发布lu
  //——————————协同商机查询 二级       collaborationbusoppquery 标题
  'MyTeamBusinessOpportunities': _import('organization/collaborationmanage/collaborationbusoppquery/MyTeamBusinessOpportunities/index'), //我团队的协同商机lu
  'OurOrganizationBusinessOpportunities': _import('organization/collaborationmanage/collaborationbusoppquery/OurOrganizationBusinessOpportunities/index'), //我机构的协同商机lu
  //-------------------------------------------------------------------------------------------------------------------------------------------

  //产品管理--产品查询
  'ProductQuery': _import('organization/productmanage/ProductQuery/index'),
  'ImportantProductSell': _import('organization/productmanage/ImportantProductSell/index'),

  //--------------------------------------------------------------------------------------------------------------------------------------------

  //商机管理      一级
  //——————————我名下客户外部资产列表  二级
  'ExternalassetsList': _import('organization/businessopportunitymanage/ExternalassetsLists/index'),
  //——————————机构业务目标客户   二级
  'InstitutionalBusinessTargetCustomer': _import('organization/businessopportunitymanage/InstitutionalBusinessTargetCustomer/index'),
  //------------------------------
  //快速查询内容
  'QuikSearchContent': _import('dashboard/quiksearch/QuikSearchContent')


}

export const constantRouterMap = [{
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: _import('errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    // meta: {
    //   icon: 'component',
    //   title: '首页'
    // },
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      hidden: true,
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: false
      }
    },{
      path: '/CustomerManagement/FormalCustomerManagement/PanoramicView',
      component: PanoramicView,
      hidden: true,
      name: 'listedcompanySubmersible360View',
      meta: {
        icon: 'PanoramicView',
        title: '客户360全景视图',
        noCache: false
      }
    },{
      path: '/CustomerManagement/RegisteredCustomerManagement/PanoramicViewRegCust',
      component: PanoramicViewRegCust,
      hidden: true,
      name: 'listedcompanySubmersible360ViewRegCust',
      meta: {
        icon: 'PanoramicViewRegCust',
        title: '注册客户360全景视图'
      }
    },{
      path: '/ResourceManage/KnowledgeBaseManagement/KnowledgeBaseQuery',
      component: KnowledgeBaseQuery,
      hidden: true,
      name: 'KnowledgeBaseQuery',
      meta: {
        icon: 'KnowledgeBaseQuery',
        title: '知识库查询'
      }
    },
      {
        path: '/SearchContent',
        component: QuikSearchContent,
        hidden: true,
        name: 'SearchContent',
        meta: {
          icon: 'SearchContent',
          title: '查询结果'
        }
      }
    ]
  }
]
  /*
  {
    path: '/CustomerManagement', //客户管理  此为一级导航栏的标题
    name: 'CustomerManagement',
    component: Layout, //一级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
    meta: {
      title: '客户管理',
      icon: 'CustomerManagement',
      noCache: false
    }, //---------------------------------------------注册客户管理--------------------------------------------------
    children: [{
        path: '/CustomerManagement/RegisteredCustomerManagement', //注册客户管理   此处为二级导航，不需要跳转
        name: 'RegisteredCustomerManagement',
        component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
        meta: {
          title: '注册客户管理',
          icon: 'RegisteredCustomerManagement',
          noCache: false
        },
        children: [{
          path: 'PublicRegistrationList', // 注册客户管理--公开客户列表     此处为三级导航，也是最后需要切换路由的导航
          name: 'PublicRegistrationList',
          component: PublicRegistrationList,
          meta: {
            title: '公开客户列表',
            icon: 'PublicRegistrationList',
            noCache: false
          }
        }, {
          path: 'RegCustManage', //注册客户管理--注册客户管理   此处为三级导航，也是最后需要切换路由的导航
          name: 'RegCustManage',
          component: RegCustManage,
          meta: {
            title: '我的注册客户',
            icon: 'RegCustManage',
            noCache: false
          }
        }, {
          path: 'RegCustQuery', //注册客户管理--注册客户查询   此处为三级导航，也是最后需要切换路由的导航
          name: 'RegCustQuery',
          component: RegCustQuery,
          meta: {
            title: '注册客户查询',
            icon: 'RegCustQuery',
            noCache: true
          }
        }, {
          path: 'ListedcompanySubmersible360View', //上市公司潜客360视图-平铺
          name: 'ListedcompanySubmersible360View',
          component: ListedcompanySubmersible360View,
          meta: {
            title: '上市公司潜客360视图-平铺',
            icon: 'ListedcompanySubmersible360View',
            noCache: false
          }
        }, {
          path: 'InvestmentbankSubmersible360View', //我的投行潜客360视图-平铺
          name: 'InvestmentbankSubmersible360View',
          component: InvestmentbankSubmersible360View,
          meta: {
            title: '我的投行潜客360视图-平铺',
            icon: 'InvestmentbankSubmersible360View',
            noCache: false
          }
        }, {
          path: 'PanoramicViewRegCust', //注册客户-客户360视图-传统在     暂时不用
          name: 'PanoramicViewRegCust',
          component: PanoramicViewRegCust,
          meta: {
            title: '注册客户-客户360视图',
            icon: 'panoramicviewregcust',
            noCache: false
          }
        }, ]
      }, //----------------------------------------------------正式客户管理--------------------------------------------------------
      {
        path: 'FormalCustomerManagement', //正式客户管理   此处为二级导航，不需要跳转
        name: 'FormalCustomerManagement',
        component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
        meta: {
          title: '正式客户管理',
          icon: 'FormalCustomerManagement',
          noCache: false
        },
        children: [{
            path: 'FormalCustomerManage', // 正式客户管理--正式客户管理     此处为三级导航，也是最后需要切换路由的导航
            name: 'FormalCustomerManage',
            component: FormalCustomerManage,
            meta: {
              title: '我的正式客户',
              icon: 'FormalCustomerManage',
              noCache: false
            },
          }, {
            path: 'FormalCustomerQuery', //正式客户管理--正式客户查询   此处为三级导航，也是最后需要切换路由的导航
            name: 'FormalCustomerQuery',
            component: FormalCustomerQuery,
            meta: {
              title: '正式客户查询',
              icon: 'FormalCustomerQuery',
              noCache: false
            }
          }, {
            path: 'InvestmentBankProjectSummary', //正式客户管理--投行项目总汇  此处为三级导航，也是最后需要切换路由的导航
            name: 'InvestmentBankProjectSummary',
            component: InvestmentBankProjectSummary,
            meta: {
              title: '投行项目总汇',
              icon: 'InvestmentBankProjectSummary',
              noCache: true
            }
          },
          {
            path: 'Mechanism360TileView', // 正式客户管理--正式客户管理--客户360视图首页
            name: 'Mechanism360TileView',
            component: Mechanism360TileView,
            meta: {
              title: '客户360视图',
              icon: 'Mechanism360TileView',
              noCache: false
            }
          },
          {
            path: 'PanoramicView', //正式客户管理--正式客户管理--客户360视图首页/全景视图页
            name: 'PanoramicView',
            component: PanoramicView,
            meta: {
              title: '客户360全景视图',
              icon: 'PanoramicView',
              noCache: false
            },
            children: [{
              path: '/panoramicview/EconomicAndBusinessAepartment',
              name: '经济业务信息',
              component: EconomicAndBusinessAepartment,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/GalacticGoldenSink',
              name: '银河金汇',
              component: GalacticGoldenSink,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/ResearchInstitute',
              name: '研究院',
              component: ResearchInstitute,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/InvestmentBankHeadquarters',
              name: '投资银行总部',
              component: InvestmentBankHeadquarters,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/BondInvestmentDepartment',
              name: '债券投资总部',
              component: BondInvestmentDepartment,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/DerivativesHeadquarters',
              name: '衍生品总部',
              component: DerivativesHeadquarters,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/SecuritiesFinancialHeadquarters',
              name: '证券金融总部',
              component: SecuritiesFinancialHeadquarters,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/ProductCenter',
              name: '产品中心总部',
              component: ProductCenter,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/MilkyWayFutures',
              name: '银河期货',
              component: MilkyWayFutures,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/MilkyWayInsurance',
              name: '银河保险',
              component: MilkyWayInsurance,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, {
              path: '/panoramicview/GalacticFund',
              name: '银河基金',
              component: GalacticFund,
              meta: {
                title: '客户360全景视图',
                icon: 'PanoramicView',
                noCache: false
              },
            }, ]
          }
        ]
      }, //-----------------------------------------------------战略客户管理------------------------------------------------------------------------
      {
        path: 'strategycustmanage', //战略客户管理   此处为二级导航，不需要跳转
        name: 'strategycustmanage',
        component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
        meta: {
          title: '我的战略客户',
          icon: 'strategycustmanage',
          noCache: false
        },
        children: [{
          path: 'CustomerManagements', // 战略客户管理--战略客户管理     此处为三级导航，也是最后需要切换路由的导航
          name: 'CustomerManagements',
          component: CustomerManagements,
          meta: {
            title: '战略客户管理',
            icon: 'CustomerManagements',
            noCache: false
          }
        }, {
          path: 'StrategicCustomerQuery', //战略客户管理--战略客户查询   此处为三级导航，也是最后需要切换路由的导航
          name: 'StrategicCustomerQuery',
          component: StrategicCustomerQuery,
          meta: {
            title: '战略客户查询',
            icon: 'StrategicCustomerQuery',
            noCache: false
          }
        }]
      }
    ]
  },
  //*********************************************
  {
    path: '/ResourceManage', //资源管理  此为一级导航栏的标题
    name: 'ResourceManage',
    component: Layout, //一级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
    meta: {
      title: '资源管理',
      icon: 'setting',
      noCache: false
    }, //---------------------------------------------资源管理--------------------------------------------------
    children: [{
        path: 'ResourceRanagement', //资源管理   此处为二级导航，不需要跳转
        name: 'ResourceRanagement',
        component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
        meta: {
          title: '资源管理',
          icon: 'ResourceRanagement',
          noCache: false
        },
        children: [{
          path: 'BusinessAddressBookManagement', // 资源管理--业务通讯录管理    此处为三级导航，也是最后需要切换路由的导航
          name: 'BusinessAddressBookManagement',
          component: BusinessAddressBookManagement,
          meta: {
            title: '业务通讯录管理',
            icon: 'PublicRegistrationList',
            noCache: false
          }
        }, {
          path: 'BusinessAddressBookAuery', //资源管理--业务通讯录查询   此处为三级导航，也是最后需要切换路由的导航
          name: 'BusinessAddressBookAuery',
          component: BusinessAddressBookAuery,
          meta: {
            title: '业务通讯录查询',
            icon: 'BusinessAddressBookAuery',
            noCache: false
          }
        }, ]
      },
      //----------------------------------------------------知识库管理--------------------------------------------------------

  {
    path: '/ProductManage', //产品管理  此为一级导航栏的标题
    name: 'ProductManage',
    component: Layout, //一级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
    meta: {
      title: '产品管理',
      icon: 'ProductManage',
      noCache: false
    }, //---------------------------------------------产品管理--------------------------------------------------
    children: [{
      path: 'ProductManagement', //产品管理   此处为二级导航，不需要跳转
      name: 'ProductManagement',
      component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
      meta: {
        title: '产品管理',
        icon: 'ProductManagement',
        noCache: false
      },
      children: [{
        path: 'ProductQuery', // 产品管理--产品查询    此处为三级导航，也是最后需要切换路由的导航
        name: 'ProductQuery',
        component: ProductQuery,
        meta: {
          title: '产品查询',
          icon: 'ProductQuery',
          noCache: false
        }
      }, {
        path: 'ImportantProductSell', //产品管理--重点产品销售   此处为三级导航，也是最后需要切换路由的导航
        name: 'ImportantProductSell',
        component: ImportantProductSell,
        meta: {
          title: '重点产品销售',
          icon: 'ImportantProductSell',
          noCache: false
        }
      }, ]
    }, ]
  },
  //*********************************************
  {
    path: '/OpportunityManage', //商机管理  此为一级导航栏的标题
    name: 'OpportunityManage',
    component: Layout, //一级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
    meta: {
      title: '商机管理',
      icon: 'OpportunityManage',
      noCache: false
    }, //---------------------------------------------商机管理--------------------------------------------------
    children: [{
      path: 'OpportunityManagement', //商机管理   此处为二级导航，不需要跳转
      name: 'OpportunityManagement',
      component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
      meta: {
        title: '商机管理',
        icon: 'OpportunityManagement',
        noCache: false
      },
      children: [{
        path: 'ExternalassetsList', // 商机管理--我名下客户外部资产列表    此处为三级导航，也是最后需要切换路由的导航
        name: 'ExternalassetsList',
        component: ExternalassetsList,
        meta: {
          title: '我名下客户外部资产列表',
          icon: 'ExternalassetsList',
          noCache: false
        }
      }, {
        path: 'InstitutionalBusinessTargetCustomer', // 商机管理--机构业务目标客户   此处为三级导航，也是最后需要切换路由的导航
        name: 'InstitutionalBusinessTargetCustomer',
        component: InstitutionalBusinessTargetCustomer,
        meta: {
          title: '机构业务目标客户',
          icon: 'InstitutionalBusinessTargetCustomer',
          noCache: false
        }
      }]
    }]
  },
  //*********************************************
  {
    path: '/Collaborationmanage', //协同管理  此为一级导航栏的标题
    name: 'Collaborationmanage',
    component: Layout, //一级导航栏不需要跳转，所以给点击是回到此栏目下的第一个路由节点
    meta: {
      title: '协同管理',
      icon: 'Collaborationmanage',
      noCache: false
    }, //---------------------------------------------协同管理--------------------------------------------------
    children: [{
        path: 'Collaborationbusoppmanage', //协同管理   此处为二级导航，不需要跳转
        name: 'Collaborationbusoppmanage',
        component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
        meta: {
          title: '协同商机管理',
          icon: 'Collaborationbusoppmanage',
          noCache: false
        },
        children: [{
          path: 'MySynergyBusinessOpportunity', // 协同管理--我的协同商机    此处为三级导航，也是最后需要切换路由的导航
          name: 'MySynergyBusinessOpportunity',
          component: MySynergyBusinessOpportunity,
          meta: {
            title: '我的协同商机',
            icon: 'MySynergyBusinessOpportunity',
            noCache: false
          }
        }, {
          path: 'CollaborativeBusinessOpportunityRelease', // 协同商机发布--机构业务目标客户   此处为三级导航，也是最后需要切换路由的导航
          name: 'CollaborativeBusinessOpportunityRelease',
          component: CollaborativeBusinessOpportunityRelease,
          meta: {
            title: '协同商机发布',
            icon: 'CollaborativeBusinessOpportunityRelease',
            noCache: false
          }
        }]
      }, //-----------------------------------------------协同商机查询---------------------------------------------------------
      {
        path: 'Collaborationbusoppquery', //协同商机查询   此处为二级导航，不需要跳转
        name: 'Collaborationbusoppquery',
        component: componentMap['SubLayout'], //此处不添加过滤的话，会加载所写的组件，若不想使用此组件则需要过滤，原理是render的时候只渲染里面的router-view内容
        meta: {
          title: '协同商机查询',
          icon: 'Collaborationbusoppquery',
          noCache: false
        },
        children: [{
          path: 'MyTeamBusinessOpportunities', // 协同商机查询--我团队协同商机    此处为三级导航，也是最后需要切换路由的导航
          name: 'MyTeamBusinessOpportunities',
          component: MyTeamBusinessOpportunities,
          meta: {
            title: '我团队协同商机',
            icon: 'MyTeamBusinessOpportunities',
            noCache: false
          }
        }, {
          path: 'OurOrganizationBusinessOpportunities', // 协同商机查询--我机构协同商机   此处为三级导航，也是最后需要切换路由的导航
          name: 'OurOrganizationBusinessOpportunities',
          component: OurOrganizationBusinessOpportunities,
          meta: {
            title: '我机构协同商机',
            icon: 'OurOrganizationBusinessOpportunities',
            noCache: false
          }
        }]
      }
    ]
  },
  // //*********************************************
  {
    path: '/aaa', //用来做零售测试
    component: Layout,
    meta: {
      icon: 'component',
      title: '零售首页'
    },
  },
  {
    path: '/baseManager',
    name: 'authManager',
    component: Layout,
    meta: {
      icon: 'lock',
      title: 'authManager'
    },
  } */


export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
    path: '/baseManager',
    name: 'authManager',
    component: Layout,
    meta: {
      icon: 'lock',
      title: 'authManager'
    },
    children: [{
        path: 'userManager',
        component: _import('admin/user/index'),
        name: 'userManager',
        meta: {
          title: 'userManager',
          icon: 'fa-user'
        }
      },
      {
        path: 'menuManager',
        component: _import('admin/menu/index'),
        name: 'menuManager',
        meta: {
          title: 'menuManager',
          icon: 'category'
        }
      },
      {
        path: 'groupManager',
        component: _import('admin/group/index'),
        name: 'groupManager',
        meta: {
          title: 'groupManager',
          icon: 'group_fill'
        }
      },
      {
        path: 'groupTypeManager',
        component: _import('admin/groupType/index'),
        name: 'groupTypeManager',
        meta: {
          title: 'groupTypeManager',
          icon: 'fa-users'
        }
      },
      {
        path: 'gateLogManager',
        component: _import('admin/gateLog/index'),
        name: 'gateLogManager',
        meta: {
          title: 'gateLogManager',
          icon: 'viewlist'
        }
      }
    ]
  },
  {
    path: '/sysManage',
    name: 'sysManage',
    component: Layout,
    redirect: '/sys/dataDictionary/index',
    meta: {
      title: 'sysManage',
      icon: 'lock'
    },
    // children: [{
    //   path: 'index',
    //   component: _import('sys/dataDictionary/index'),
    //   name: 'dataDictionary',
    //   meta: {
    //     title: 'dataDictionary',
    //     icon: 'lock'
    //   }
    // }]
  }, {
    path: '/ProductManage/ProductManagement/ImportantProductSell', //重要产品销售
    name: 'ImportantProductSell',
    component: ImportantProductSell,
    meta: {
      title: '重点产品销售',
      icon: 'ImportantProductSell',
      noCache: false
    }
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: {
        title: 'icons',
        icon: 'icon',
        noCache: true
      }
    }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [{
        path: 'tinymce',
        component: _import('components-demo/tinymce'),
        name: 'tinymce-demo',
        meta: {
          title: 'tinymce'
        }
      },
      {
        path: 'markdown',
        component: _import('components-demo/markdown'),
        name: 'markdown-demo',
        meta: {
          title: 'markdown'
        }
      },
      {
        path: 'json-editor',
        component: _import('components-demo/jsonEditor'),
        name: 'jsonEditor-demo',
        meta: {
          title: 'jsonEditor'
        }
      },
      {
        path: 'dnd-list',
        component: _import('components-demo/dndList'),
        name: 'dndList-demo',
        meta: {
          title: 'dndList'
        }
      },
      {
        path: 'splitpane',
        component: _import('components-demo/splitpane'),
        name: 'splitpane-demo',
        meta: {
          title: 'splitPane'
        }
      },
      {
        path: 'avatar-upload',
        component: _import('components-demo/avatarUpload'),
        name: 'avatarUpload-demo',
        meta: {
          title: 'avatarUpload'
        }
      },
      {
        path: 'dropzone',
        component: _import('components-demo/dropzone'),
        name: 'dropzone-demo',
        meta: {
          title: 'dropzone'
        }
      },
      {
        path: 'sticky',
        component: _import('components-demo/sticky'),
        name: 'sticky-demo',
        meta: {
          title: 'sticky'
        }
      },
      {
        path: 'count-to',
        component: _import('components-demo/countTo'),
        name: 'countTo-demo',
        meta: {
          title: 'countTo'
        }
      },
      {
        path: 'mixin',
        component: _import('components-demo/mixin'),
        name: 'componentMixin-demo',
        meta: {
          title: 'componentMixin'
        }
      },
      {
        path: 'back-to-top',
        component: _import('components-demo/backToTop'),
        name: 'backToTop-demo',
        meta: {
          title: 'backToTop'
        }
      },
      {
        path: 'easy-table',
        component: _import('components-demo/easyTable'),
        name: 'easyTable-demo',
        meta: {
          title: 'easyTable'
        }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [{
        path: 'keyboard',
        component: _import('charts/keyboard'),
        name: 'keyboardChart',
        meta: {
          title: 'keyboardChart',
          noCache: true
        }
      },
      {
        path: 'line',
        component: _import('charts/line'),
        name: 'lineChart',
        meta: {
          title: 'lineChart',
          noCache: true
        }
      },
      {
        path: 'mixchart',
        component: _import('charts/mixChart'),
        name: 'mixChart',
        meta: {
          title: 'mixChart',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [{
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [{
            path: 'dynamic-table',
            component: _import('example/table/dynamicTable/index'),
            name: 'dynamicTable',
            meta: {
              title: 'dynamicTable'
            }
          },
          {
            path: 'drag-table',
            component: _import('example/table/dragTable'),
            name: 'dragTable',
            meta: {
              title: 'dragTable'
            }
          },
          {
            path: 'inline-edit-table',
            component: _import('example/table/inlineEditTable'),
            name: 'inlineEditTable',
            meta: {
              title: 'inlineEditTable'
            }
          },
          {
            path: 'tree-table',
            component: _import('example/table/treeTable/treeTable'),
            name: 'treeTable',
            meta: {
              title: 'treeTable'
            }
          },
          {
            path: 'custom-tree-table',
            component: _import('example/table/treeTable/customTreeTable'),
            name: 'customTreeTable',
            meta: {
              title: 'customTreeTable'
            }
          },
          {
            path: 'complex-table',
            component: _import('example/table/complexTable'),
            name: 'complexTable',
            meta: {
              title: 'complexTable'
            }
          }
        ]
      },
      {
        path: 'tab/index',
        icon: 'tab',
        component: _import('example/tab/index'),
        name: 'tab',
        meta: {
          title: 'tab'
        }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [{
        path: 'create-form',
        component: _import('form/create'),
        name: 'createForm',
        meta: {
          title: 'createForm',
          icon: 'table'
        }
      },
      {
        path: 'edit-form',
        component: _import('form/edit'),
        name: 'editForm',
        meta: {
          title: 'editForm',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [{
        path: '401',
        component: _import('errorPage/401'),
        name: 'page401',
        meta: {
          title: 'page401',
          noCache: true
        }
      },
      {
        path: '404',
        component: _import('errorPage/404'),
        name: 'page404',
        meta: {
          title: 'page404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'log',
      component: _import('errorLog/index'),
      name: 'errorLog',
      meta: {
        title: 'errorLog',
        icon: 'bug'
      }
    }]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [{
        path: 'export-excel',
        component: _import('excel/exportExcel'),
        name: 'exportExcel',
        meta: {
          title: 'exportExcel'
        }
      },
      {
        path: 'export-selected-excel',
        component: _import('excel/selectExcel'),
        name: 'selectExcel',
        meta: {
          title: 'selectExcel'
        }
      },
      {
        path: 'upload-excel',
        component: _import('excel/uploadExcel'),
        name: 'uploadExcel',
        meta: {
          title: 'uploadExcel'
        }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    children: [{
      path: 'download',
      component: _import('zip/index'),
      name: 'exportZip',
      meta: {
        title: 'exportZip',
        icon: 'zip'
      }
    }]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'index',
      component: _import('theme/index'),
      name: 'theme',
      meta: {
        title: 'theme',
        icon: 'theme'
      }
    }]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'index',
      component: _import('clipboard/index'),
      name: 'clipboardDemo',
      meta: {
        title: 'clipboardDemo',
        icon: 'clipboard'
      }
    }]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('i18n-demo/index'),
      name: 'i18n',
      meta: {
        title: 'i18n',
        icon: 'international'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
