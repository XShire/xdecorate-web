import Vue from 'vue'
import VueRouter from 'vue-router'
import MuseUI from 'muse-ui'
import AppMain from './app.vue'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'

Vue.use(MuseUI)
Vue.use(VueRouter)

new Vue({
    el: '#app-main',
    render: h => h(AppMain)
})


