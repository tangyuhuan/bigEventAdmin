import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

//用户模块token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    //数据（state）
    const token = ref('')
    //action
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser
    }
  },
  {
    persist: true //开启当前模块的持久化，重启项目生效
  }
)
