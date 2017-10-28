
import Vue from 'vue'
import VueRouter from 'vue-router';

import Login from './component/common/login.vue'
import Home from './component/common/home.vue'
import Person from './component/common/person.vue'
import Design from './component/common/design.vue'
import Share from './component/common/share.vue'
import ShareContract from './component/share/contract.vue'
import ShareContractDetail from './component/share/contract_detail.vue'
import ShareAudit from './component/share/audit.vue'
import ShareAuditDetail from './component/share/audit_detail.vue'
import ShareDesign from './component/share/design.vue'


Vue.use(VueRouter);

const routes = [
    {path: '/', component: Login},
    {path:'/login',component: Login},
    {path:'/home',component: Home},
    {path:'/person',component: Person},
    {path:'/design',component: Design},
    {path:'/share',component: Share},
    {path:'/share_contract',component: ShareContract},
    {path:'/share_contract_detail/:x_code',name: 'share_contract_detail',component: ShareContractDetail},
    {path:'/share_audit',component: ShareAudit},
    {path:'/share_audit_detail/:x_code',name: 'share_audit_detail',component: ShareAuditDetail},
    {path:'/share_design',component: ShareDesign}
]

const router = new VueRouter({
    base: '/mobile/',
    routes
}); //这里可以带有路由器的配置参数

export default router; //将路由器导出

