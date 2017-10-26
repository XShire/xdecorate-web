
import Vue from 'vue'
import VueRouter from 'vue-router';

import Home from './component/common/home.vue'
import Person from './component/common/person.vue'
import Design from './component/common/design.vue'
import Share from './component/common/share.vue'
import ShareContract from './component/share/contract.vue'
import ShareDetail from './component/share/detail.vue'
import ShareAudit from './component/share/audit.vue'
import Login from './component/common/login.vue'

Vue.use(VueRouter);

const routes = [
    {path:'/login',component: Login},
    {path:'/home',component: Home},
    {path:'/person',component: Person},
    {path:'/design',component: Design},
    {path:'/share',component: Share},
    {path:'/share_contract',component: ShareContract},
    {path:'/share_detail/:project_code',name: 'share_detail',component: ShareDetail},
    {path:'/share_audit',component: ShareAudit},
    {path: '/', component: Home}
]

const router = new VueRouter({
    base: '/mobile/',
    routes
}); //这里可以带有路由器的配置参数

export default router; //将路由器导出

