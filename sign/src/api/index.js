import request from '@/utils/request';

// 登陆接口
export let login = code => {
  return request.post('http://123.206.55.50:7001/user/code2session', {
    code
  })
}
// 添加面试
export let addSign = params => {
  return request.post('http://123.206.55.50:7001/sign',
    params
  )
}
