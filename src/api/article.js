import request from '@/utils/request'
//获取-文章分类
export const artGetChannelService = () => request.get('/my/cate/list')
//添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
//更新-文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
