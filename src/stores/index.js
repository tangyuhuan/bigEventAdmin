import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
// import { useUserStore } from './modules/user'
// export { useUserStore }
// 简单写法
export * from './modules/user' //接收user模块的所有按需导出，再将所有内容导出
