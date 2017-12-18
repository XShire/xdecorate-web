
import Vue from 'vue'
import VueRouter from 'vue-router';

// import Login from './component/common/login.vue'
// import Home from './component/common/home.vue'
// import Person from './component/common/person.vue'
// import Project from './component/common/project.vue'
// import Share from './component/common/share.vue'
// import ShareContract from './component/share/contract.vue'
// import ShareContractDetail from './component/share/contract_detail.vue'
// import ShareAudit from './component/share/audit.vue'
// import ShareAuditDetail from './component/share/audit_detail.vue'
// import ShareDesign from './component/share/design.vue'
// import DesignOriginalFile from './component/design/original_file.vue'
// import DesignDesign from './component/design/design.vue'
// import MaterialGoodsGroup from './component/material/goods_group.vue'
// import MaterialWarehouse from './component/material/warehouse.vue'
// import MaterialWarehouseNew from './component/material/warehouse_new.vue'
// import MaterialInWarehouse from './component/material/in_warehouse.vue'
// import BuildGoodsApply from './component/build/goods_apply.vue'
// import BuildGoodsBill from './component/build/goods_bill.vue'
// import BuildGoodsBillDetail from './component/build/goods_bill_detail.vue'
// import BuildGoodsBillReceive from './component/build/goods_bill_receive.vue'
// import BuildGoodsTotal from './component/build/goods_total.vue'
// import BuildLimitList from './component/build/limit_list.vue'
// import BuildLimitDetail from './component/build/limit_detail.vue'
// import BuildCheckQualityList from './component/build/check_quality_list.vue'
// import BudgetTender from './component/budget/tender.vue'
// import BudgetTenderDetail from './component/budget/tender_detail.vue'
// import SettleInWarehouse from './component/settle/in_warehouse.vue'
// import SettleInWarehousePaid from './component/settle/in_warehouse_paid.vue'
// import BudgetContract from './component/budget/contract.vue'
// import BudgetContractDetail from './component/budget/contract_detail.vue'

import Login from './component/common/login.vue'
import Home from './component/common/home.vue'
const Person = () => import('./component/common/person.vue')
const Project = () => import('./component/common/project.vue')
const Share = () => import('./component/common/share.vue')
const ShareContract = () => import('./component/share/contract.vue')
const ShareContractDetail = () => import('./component/share/contract_detail.vue')
const ShareAudit = () => import('./component/share/audit.vue')
const ShareAuditDetail = () => import('./component/share/audit_detail.vue')
const ShareDesign = () => import('./component/share/design.vue')
const DesignOriginalFile = () => import('./component/design/original_file.vue')
const DesignDesign = () => import('./component/design/design.vue')
const MaterialGoodsGroup = () => import('./component/material/goods_group.vue')
const MaterialWarehouse = () => import('./component/material/warehouse.vue')
const MaterialWarehouseNew = () => import('./component/material/warehouse_new.vue')
const MaterialInWarehouse = () => import('./component/material/in_warehouse.vue')
const BuildGoodsApply = () => import('./component/build/goods_apply.vue')
const BuildGoodsBill = () => import('./component/build/goods_bill.vue')
const BuildGoodsBillDetail = () => import('./component/build/goods_bill_detail.vue')
const BuildGoodsBillReceive = () => import('./component/build/goods_bill_receive.vue')
const BuildGoodsTotal = () => import('./component/build/goods_total.vue')
const BuildLimitList = () => import('./component/build/limit_list.vue')
const BuildLimitDetail = () => import('./component/build/limit_detail.vue')
const BuildCheckQualityList = () => import('./component/build/check_quality_list.vue')
const BuildCheckQualityDetail = () => import('./component/build/check_quality_detail.vue')
const BudgetTender = () => import('./component/budget/tender.vue')
const BudgetTenderDetail = () => import('./component/budget/tender_detail.vue')
const SettleInWarehouse = () => import('./component/settle/in_warehouse.vue')
const SettleInWarehousePaid = () => import('./component/settle/in_warehouse_paid.vue')
const BudgetContract = () => import('./component/budget/contract.vue')
const BudgetContractDetail = () => import('./component/budget/contract_detail.vue')
const BuildCheckPatrolList = () => import('./component/build/check_patrol_list.vue')
const BuildCheckPatrolDetail = () => import('./component/build/check_patrol_detail.vue')
const BuildCheckExposeList = () => import('./component/build/check_expose_list.vue')
const BuildCheckExposeDetail = () => import('./component/build/check_expose_detail.vue')

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
    {path:'/material_in_warehouse',component: MaterialInWarehouse},
    {path:'/build_goods_apply',component: BuildGoodsApply},
    {path:'/build_goods_bill',component: BuildGoodsBill},
    {path:'/build_goods_bill_detail/:x_code',name: 'build_goods_bill_detail',component: BuildGoodsBillDetail},
    {path:'/build_goods_bill_receive/:x_code',name: 'build_goods_bill_receive',component: BuildGoodsBillReceive},
    {path:'/build_goods_total',component: BuildGoodsTotal},
    {path:'/build_limit_list',component: BuildLimitList},
    {path:'/build_limit_detail/:x_code',name: 'build_limit_detail',component: BuildLimitDetail},
    {path:'/build_check_quality_list',component: BuildCheckQualityList},
    {path:'/build_check_quality_detail/:x_code',name: 'build_check_quality_detail',component: BuildCheckQualityDetail},
    {path:'/budget_tender',component: BudgetTender},
    {path:'/budget_tender_detail/:x_code',name: 'budget_tender_detail',component: BudgetTenderDetail},
    {path:'/settle_in_warehouse',component: SettleInWarehouse},
    {path:'/settle_in_warehouse_paid',component: SettleInWarehousePaid},
    {path:'/budget_contract',component: BudgetContract},
    {path:'/budget_contract_detail/:x_code',name: 'budget_contract_detail',component: BudgetContractDetail},
    {path:'/build_check_patrol_list',component: BuildCheckPatrolList},
    {path:'/build_check_patrol_detail/:x_code',name: 'build_check_patrol_detail',component: BuildCheckPatrolDetail},
    {path:'/build_check_expose_list',component: BuildCheckExposeList},
    {path:'/build_check_expose_detail/:x_code',name: 'build_check_expose_detail',component: BuildCheckExposeDetail}
]



const router = new VueRouter({
    base: '/mobile/',
    routes
}); //这里可以带有路由器的配置参数

export default router; //将路由器导出

