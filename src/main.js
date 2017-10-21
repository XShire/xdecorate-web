import Vue from 'vue'
import axios from 'axios'
import MuseUI from 'muse-ui'
import App from './app.vue'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import router from './router'
import config from './config'


Vue.use(MuseUI)
Vue.use(config)

Vue.prototype.$http = axios

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

router.push('/home')

//console.info(config.getRandColor())

