import request from '@/utils/request'
//分类：获取-文章分类
export const artGetChannelService = () => request.get('/my/cate/list')
//分类：添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
//分类：更新-文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
//分类：删除-文章分类
//注意：query参数需要在对象params中传递
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

//管理：获取-文章列表(文章管理-搜索)
export const artGetManageService = (params) =>
  request.get('/my/article/list', {
    params: { ...params }
  })

// axios.get('/user', {
//   params: {
//     ID: 12345
//   }
// })

//管理：获取-文章详情
export const artGetInfo = (id) =>
  request.get('/my/article/info', {
    params: { id }
  })

//管理：更新-文章详情
export const artUpdateInfo = (data) => request.put('/my/article/info', data)

//管理：发布-文章
export const artAddInfo = (data) => request.post('/my/article/add', data)
