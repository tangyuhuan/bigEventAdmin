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
