import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './app.vue'
import config from './config'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import VueSee from 'vue-see'
import Vuex from 'vuex'
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.use(MuseUI)
Vue.use(config)


var options={'mouseUsed':true}
Vue.use(VueSee,options)

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        snackData: {
            show: false,
            message: '',
            action: '关闭',
            time: 2000
        },
        loginData: {
            isLogin: false,
            userCode: null,
            username: null,
            realName: null,
            phoneNumber: null
        },
        projectSelected: {
            code:null,
            name:null
        }
    },
    mutations: {
        showSnackBar (state,message) {
            // 显示
            state.snackData.show = true
            state.snackData.message = message
            if (this.snackTimer) clearTimeout(this.snackTimer)
            this.snackTimer = setTimeout(() => { state.snackData.show = false }, state.snackData.time)
        },
        hideSnackBar (state) {
            // 隐藏
            state.snackData.show = false
            if (this.snackTimer) clearTimeout(this.snackTimer)
        }
    }
})

Vue.prototype.$config = config

axios.defaults.baseURL = config.basePath + ''
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

Vue.prototype.$http = axios

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})


//获取登录用户，验证是否登录
axios.get('/project/this_login')
    .then(function(response){
        var result = response.data;
        if(result.param0==0){
            var _data = JSON.parse(result.param1);
            store.state.loginData.isLogin = true;
            store.state.loginData.userCode = _data.param3;
            store.state.loginData.username = _data.param4;
            store.state.loginData.realName = _data.param5;
            store.state.loginData.phoneNumber = _data.param11;
        }else{
            store.commit('showSnackBar',result.param1==null||result.param1==''?'尚未登录':result.param1)
        }

        getProjectSetting();
        routerEach();
    })
    .catch(function(error){
        console.info(error)
        routerEach();
    });

//获取当前用户默认的工程
function getProjectSetting() {
    if(store.state.loginData.isLogin){
        axios.get('/project/setting/PROJECT_SYSTEM_SELECTED')
            .then(function (response) {
                var result = response.data;
                if(result.param0==0){
                    var _data = JSON.parse(result.param1);
                    store.state.projectSelected.code = _data.param3;
                    store.state.projectSelected.name = _data.param7;
                }else{
                    store.commit('showSnackBar',result.param1==null||result.param1==''?'尚未设置默认工程':result.param1)
                }
            }).catch(function (error) {
                console.info(error)
            });
    }
}

function routerEach(){
    router.beforeEach((to, from, next) => {
        // 模拟登陆状态
        if (!store.state.loginData.isLogin) {
            if (to.path !== '/login') {
                return next({path: '/login'});
            }else {
                next();
            }
        }else {
            if (to.path === '/login') {
                return next({path: '/home'});
            }
            next();
        }
    });

    // router.push('/login')
}






