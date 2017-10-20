import Vue from 'vue'
import MuseUI from 'muse-ui'
import App from './app.vue'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import router from './router'

Vue.use(MuseUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

router.push('/home')
