import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuesax from 'vuesax'

require('@/store/subscriber')

axios.defaults.baseURL = 'http://backpizza.test/api'
Vue.config.productionTip = false
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

Vue.use(Vuesax, {})

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
