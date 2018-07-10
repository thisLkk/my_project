import { asyncRouterMap, constantRouterMap, componentMap } from '@/router'
import global_ from '@/common/Global'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */

function hasPermission(menus, route) {
    if (route.name && menus && menus.length) {
        for (var i in menus) {
            if (menus[i].code === route.name) {
                return i
            }
        }
    }
    return -1
}


/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */

function filterAsyncRouter(asyncRouterMap, menuDatas) {
    const accessedRouters = asyncRouterMap.filter(route => {
        var index = hasPermission(menuDatas, route)
        if (index >= 0) {
            if (menuDatas[index].title) {
                route.meta.name = menuDatas[index].title
            }
            if (menuDatas[index].icon) {
                route.meta.icon = menuDatas[index].icon
            }

            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, menuDatas[index].children)
            }
            return true
        }
        return false
    })
    return accessedRouters
}


/**
 * 构建用户路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function generateUserRouter(basepath, level, menu) {
    menu.name = menu.Code
    if (menu.Status && menu.Status == '1') {
        menu.hidden = true
    }

    menu.meta = {}
    if (menu.Title == null || menu.Title.length === 0) {
        menu.meta.title = menu.name
    } else {
        menu.meta.title = menu.Title
    }

    if (menu.Icon && menu.Icon.length) {
        menu.meta.icon = menu.Icon
    }

    menu.children = menu.Children
    if (menu.children && menu.children.length) {
        if (menu.Href) {

        menu.path = basepath + '/' + menu.Href
        } else {
        menu.path = basepath + '/' + menu.name
        }

        /*
        if (menu.component && menu.component.length) {
          menu.component = componentMap[menu.component]
        } else if (level === 1) {*/
        //if (level === 1) {
        if (level === 0) {
            menu.component = componentMap['Layout']
        } else {
            menu.component = componentMap['SubLayout']
        }

        for (var i in menu.children) {
            generateUserRouter(menu.path, level + 1, menu.children[i])
        }

        if (level === 0) {
        var subs = []
        menu.subs = menu.children
        for(var subel in menu.children) {
            for(var childel in menu.children[subel].children) {
                subs.push(menu.children[subel].children[childel])
            }
        }

        menu.children = subs

    }

    } else {

        menu.meta.noCache = false
        if (menu.Href) {
            menu.path = basepath + '/' + menu.Href
        } else {
            menu.path = basepath + '/' + menu.name
        }


        menu.component = componentMap[menu.name]
        if (menu.component == null) {
            menu.component = componentMap['page404']
        }
    }
}


function generateUserPath(basePath, menu, allPaths) {
    if (menu.children && menu.children.length) {
        for (var i in menu.children) {
            generateUserPath(menu.path, menu.children[i], allPaths)
        }
    } else {
        var realName = menu.path
        if (menu.name) {
            realName = menu.name
        }
        //allPaths[realName] = basePath + '/' + menu.path
        allPaths[realName] = basePath + '/' + realName
    }
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        allRouters: [],
        allPaths: {}
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        },
        SET_ALLROUTERS: (state, allRouters) => {
            var routers = []

            if (global_.navmenusMode === 'dropdown') {
                state.allRouters = constantRouterMap.concat(allRouters)
                for (var i in allRouters) {
                    //routers = routers.concat(allRouters[i].children)
                    routers = routers.concat(allRouters[i])
                }
            } else {
                state.allRouters = allRouters
                routers = allRouters[0].children
            }
            state.addRouters = routers
            //console.log("addRouters:" + JSON.stringify(state.addRouters))
            state.routers = constantRouterMap.concat(routers)

            var allPaths = {}
            state.routers.forEach((val) => {
                generateUserPath('', val, allPaths)
            })
            state.allPaths = allPaths
        },
        CHOOSE_ROUTERS: (state, index) => {
            state.addRouters = state.allRouters[index].children
            state.routers = constantRouterMap.concat(state.allRouters[index].children)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                var navmenus = data.navmenus

                for (var i in navmenus) {
                    generateUserRouter('', 0, navmenus[i])
                    //generateUserRouter('/', 0, navmenus[i])
                }
                /*
                navmenus.map(childData => {
                  childData.children = filterAsyncRouter(asyncRouterMap, childData.children)
                })
                */
                commit('SET_ALLROUTERS', navmenus)
                //console.log(navmenus)
                resolve()
            })
        },
        chooseRoutes({ commit }, index) {
            commit('CHOOSE_ROUTERS', index)
        }
    }
}

export function getRouterPath(name) {//路劲的跳转
    return permission.state.allPaths[name]
}

export default permission
