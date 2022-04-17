import Vue from 'vue'
// import VueCompositionAPI, { createApp, h } from '@vue/composition-api'

import App from './App.vue'

Vue.config.devtools = true
Vue.config.productionTip = false

// Vue.use(VueCompositionAPI)

// const app = createApp({
//   render: () => h(App)
// })

// app.mount('#app')

new Vue({
  render: h => h(App)
}).$mount('#app')
