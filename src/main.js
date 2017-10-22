import Vue from 'vue'
import axios from 'axios'
import MuseUI from 'muse-ui'
import App from './app.vue'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import router from './router'
import config from './config'
import VueSee from 'vue-see'


Vue.use(MuseUI)
Vue.use(config)

var options={'mouseUsed':true}
Vue.use(VueSee,options)


Vue.prototype.$config = config

axios.defaults.baseURL = config.basePath + ''
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

Vue.prototype.$http = axios

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

router.push('/home')

