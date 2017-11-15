<template>
    <div class="home-main-grid" id="home-main-grid">
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
            <mu-list-item title="仓库清单" to="material_warehouse">
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
            <mu-sub-header>施工管理</mu-sub-header>
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

