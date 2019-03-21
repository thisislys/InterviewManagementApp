import request from '@/utils/request';

// 登陆接口
export let login = code=>{
  return request.post('http://169.254.12.68:7001/user/code2session', {
    code
  })
}
