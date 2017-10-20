
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './component/common/home.vue'
import Person from './component/common/person.vue'
import Project from './component/common/project.vue'
import Work from './component/common/work.vue'

Vue.use(VueRouter);

const routes = [
    {path:'/home',component: Home},
    {path:'/person',component: Person},
    {path:'/project',component: Project},
    {path:'/work',component: Work},
    {path: '/', component: Home}
]

const router = new VueRouter({
    routes,
    history: true
}); //这里可以带有路由器的配置参数

export default router; //将路由器导出

