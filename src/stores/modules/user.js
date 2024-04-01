import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true //开启当前模块的持久化，重启项目生效
  }
)
