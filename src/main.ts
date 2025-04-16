import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/unocss'
import { setupStore } from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

setupStore(app)
app.use(router).mount('#app')
