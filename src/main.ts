import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App);

app
  .use(router)
  .use(vuetify)
  .use(VueQueryPlugin)

app.mount('#app')
