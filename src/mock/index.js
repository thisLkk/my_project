import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import test from './test'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/api\/api\/user\/validate/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/api\/user\/front\/info\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/api\/user\/front\/menus\.*/, 'get', loginAPI.getUserMenus)
Mock.mock(/\/sys\/dict\/getdicts/, 'post', loginAPI.getDicts)

Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)

Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 测试相关
Mock.mock(/\/test\/test/, 'get', test.test)
Mock.mock(/\/test\/columnchart/, 'get', test.columnchart)
Mock.mock(/\/test\/linechart/, 'get', test.linechart)
Mock.mock(/\/test\/piechart/, 'get', test.piechart)
Mock.mock(/\/test\/barchart/, 'get', test.barchart)

Mock.mock(/\/test\/list/, 'get', test.test_list)
Mock.mock(/\/test\/mirror/, 'get', test.test_mirror)


export default Mock