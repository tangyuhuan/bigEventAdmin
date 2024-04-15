import request from '@/utils/request'

//注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

//登录接口
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

//获取用户基本信息
export const userGetInfoService = () => request.get('/my/userinfo')

//更新-用户基本资料
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

//更新-用户头像
export const userUpdateAvatarService = (data) =>
  request.patch('/my/update/avatar', { avatar: data })

//更新用户密码

export const userUpdatePwdService = (data) =>
  request.patch('/my/updatepwd', data)
