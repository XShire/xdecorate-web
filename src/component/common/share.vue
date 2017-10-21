<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>共享文档</mu-sub-header>
            <router-link to="share_contract">
                <mu-list-item title="合同管理">
                    <mu-icon value="navigate_next" slot="right"/>
                </mu-list-item>
            </router-link>
            <mu-list-item title="审计管理">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
            <mu-list-item title="施工图纸">
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

