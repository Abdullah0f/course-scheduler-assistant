import 'normalize.css'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import StyleClass from 'primevue/styleclass'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import App from './App.vue'
import router from './router'
import 'primevue/resources/themes/soho-light/theme.css'
// import 'primevue/resources/themes/soho-dark/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { auth } from './firebase/confing'
import { onAuthStateChanged } from 'firebase/auth'
let app

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(ConfirmationService)
    app.use(pinia)
    app.use(router)
    app.use(ToastService)
    app.directive('styleclass', StyleClass)
    app.directive('tooltip', Tooltip)

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
  }
})
