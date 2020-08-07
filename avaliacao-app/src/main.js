import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from '../src/commons/store'
import '@/plugins'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
