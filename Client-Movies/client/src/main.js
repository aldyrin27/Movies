import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use((options) => {
    options.store.$router = markRaw(router)
})

app.use(vue3GoogleLogin, {
    clientId:
    '489118845733-h98bdrg945uqga8d829mv87aundrjc29.apps.googleusercontent.com',
});

app.use(pinia)
app.use(router)

app.mount('#app')