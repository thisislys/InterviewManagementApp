import request from '@/utils/request'

// 登陆接口
export let login = code => {
  console.log('code...', code)
  return request.post('/user/code2session', {
    code
  })
}
export let addSign = params => {
  console.log('code...', params)
  return request.post('/sign', params)
}
export let getSign = params => {
  console.log('cccc', params)
  return request.get('/sign', params)
}
