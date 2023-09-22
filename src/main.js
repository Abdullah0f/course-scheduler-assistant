import 'normalize.css'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import router from './router'
import 'primevue/resources/themes/soho-light/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  pt: {
    global: {
      css: `
      .p-component {
        font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      `
    }
  }
})

app.mount('#app')
