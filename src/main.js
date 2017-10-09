import Vue from 'vue'
import VueRouter from 'vue-router'
import MuseUI from 'muse-ui'
import App from './app.vue'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'


Vue.use(MuseUI)
Vue.use(VueRouter)



new Vue({
    el: '#app',
    render: h => h(App)
})

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]

const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
})

const MainGrid = new Vue({
    router
}).$mount('#home-main-grid')
