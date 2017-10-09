import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './component/common/home.vue'

Vue.use(VueRouter);

const router = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
]

//必须写在文件底部，而且后面还需要接一空行，否则无法通过 ESlint 语法验证
export default router
