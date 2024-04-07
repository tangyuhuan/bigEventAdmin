import request from '@/utils/request'
//获取-文章分类
export const artGetChannelService = () => request.get('/my/cate/list')
//添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
//更新-文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
//删除-文章分类
//注意：query参数需要在对象params中传递
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
