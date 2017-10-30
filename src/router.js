
import Vue from 'vue'
import VueRouter from 'vue-router';

import Login from './component/common/login.vue'
import Home from './component/common/home.vue'
import Person from './component/common/person.vue'
import Project from './component/common/project.vue'
import Share from './component/common/share.vue'
import ShareContract from './component/share/contract.vue'
import ShareContractDetail from './component/share/contract_detail.vue'
import ShareAudit from './component/share/audit.vue'
import ShareAuditDetail from './component/share/audit_detail.vue'
import ShareDesign from './component/share/design.vue'
import DesignOriginalFile from './component/design/original_file.vue'
import DesignDesign from './component/design/design.vue'
import MaterialGoodsGroup from './component/material/goods_group.vue'
import MaterialWarehouse from './component/material/warehouse.vue'
import MaterialWarehouseNew from './component/material/warehouse_new.vue'
import MaterialInWarehouse from './component/material/in_warehouse.vue'

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Login},
    {path:'/login',component: Login},
    {path:'/home',component: Home},
    {path:'/person',component: Person},
    {path:'/project',component: Project},
    {path:'/share',component: Share},
    {path:'/share_contract',component: ShareContract},
    {path:'/share_contract_detail/:x_code',name: 'share_contract_detail',component: ShareContractDetail},
    {path:'/share_audit',component: ShareAudit},
    {path:'/share_audit_detail/:x_code',name: 'share_audit_detail',component: ShareAuditDetail},
    {path:'/share_design',component: ShareDesign},
    {path:'/design_original_file',component: DesignOriginalFile},
    {path:'/db_design',component: DesignDesign},
    {path:'/material_goods_group',component: MaterialGoodsGroup},
    {path:'/material_warehouse',component: MaterialWarehouse},
    {path:'/material_warehouse_new',component: MaterialWarehouseNew},
    {path:'/material_in_warehouse',component: MaterialInWarehouse}
]

const router = new VueRouter({
    base: '/mobile/',
    routes
}); //这里可以带有路由器的配置参数

export default router; //将路由器导出

