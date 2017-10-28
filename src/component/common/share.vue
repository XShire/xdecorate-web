<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>共享文档</mu-sub-header>
            <mu-list-item title="合同管理" to="share_contract" afterText="全部工程">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="审计管理" to="share_audit" afterText="当前工程">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="施工图纸" to="share_design" afterText="当前工程">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style lang="less">

</style>

