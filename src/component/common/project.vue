<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>预决算</mu-sub-header>
            <mu-list-item title="投标管理" to="budget_tender">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="合同管理" to="budget_contract">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>设计管理</mu-sub-header>
            <mu-list-item title="现场记录" to="design_original_file">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="设计图纸" to="db_design">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-list>
            <mu-sub-header>材料管理</mu-sub-header>
            <mu-list-item title="材料查看" to="material_goods_group">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="仓库库存" to="material_warehouse">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="新料采购" to="material_warehouse_new">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="入库单据" to="material_in_warehouse">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>施工材料管理</mu-sub-header>
            <mu-list-item title="材料申请" to="build_goods_apply">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="提料单" to="build_goods_bill">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="材料统计" to="build_goods_total">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>施工进度管理</mu-sub-header>
            <mu-list-item title="预计工期" to="build_limit_list">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>质量管理</mu-sub-header>
            <mu-list-item title="质检记录" to="build_check_quality_list">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="巡检记录">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="曝光台">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>

        <mu-list>
            <mu-sub-header>财务结算</mu-sub-header>
            <mu-list-item title="材料结算" to="settle_in_warehouse">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>

    export default {
        data(){
            return {

            }
        }
    }

</script>

<style lang="less">

</style>

