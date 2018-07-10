import request from '@/utils/request'

export function getAuthDicts(query) {
  return request({
    url: '/auth/system/dicts',
    method: 'get',
    params: query
  })
}

export function list(query) {
  /*
  return request({
    url: '/sys/dict/getdicts',
    method: 'post',
    params: query
  })
  */
  // return request({
  //   url: '/auth/system/dicts',
  //   method: 'get',
  //   params: query
  // })
  // alert("list数据字典")
  // console.log(query)
  return request({
    url: '/ctc-sysManager/dataDist/getDataDistListFromRedis',
    method: 'post',
    data:query
  })
}

export function listDictTree(query) {
  return request({
    url: '/ctc-sysManager/dataDist/getDataDistTreeFromRedis',
    method: 'post',
    data:query
  })
}


export function dictList(query) {
  return request({
    url: '/sys/dict/get_dictlist',
    method: 'post',
    data: query
  })
}

export function getDictItems(query) {
  return request({
    url: '/sys/dict/get_dict',
    method: 'post',
    data: query
  })
}

export function addDict(data) {
  return request({
    url: '/sys/dict/add_dict',
    method: 'post',
    data: data
  })
}

export function addDicts(data) {
  return request({
    url: '/sys/dict/add_item',
    method: 'post',
    data: data
  })
}
export function editDictItem(data) {
  return request({
    url: '/sys/dict/update_item',
    method: 'post',
    data: data
  })
}
export function editDict(data) {
  return request({
    url: '/sys/dict/update_dict',
    method: 'post',
    data: data
  })
}

export function delDict(data) {
  return request({
    url: '/sys/dict/del_dict',
    method: 'post',
    data: data
  })
}
