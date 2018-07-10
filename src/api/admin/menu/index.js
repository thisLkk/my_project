import request from '@/utils/request'

export function fetchTree(query) {
    return request({
        url: '/auth/menu/tree',
        method: 'get',
        params: query
    })
}

export function fetchAll() {
    return request({
        url: '/api/menu/all',
        method: 'get'
    })
}
export function addObj(obj) {
    return request({
        url: '/auth/menu',
        method: 'post',
        data: obj
    })
}

export function getObj(id) {
    return request({
        url: '/auth/menu/'+ id,
        method: 'get'
    })
}

export function delObj(id) {
    return request({
        url: '/auth/menu/deletemenu',
        method: 'post',
        data: { 'id': id }
    })
}

export function putObj(obj) {
		var id = obj.id;
    return request({
        url: '/auth/menu/'+id,
        method: 'put',
        data: obj
    })
}