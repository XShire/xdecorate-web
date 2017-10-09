<template>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="home" title="首页" icon="home"/>
        <mu-bottom-nav-item value="view_quilt" title="工程管理" icon="view_quilt"/>
        <mu-bottom-nav-item value="dvr" title="日常工作" icon="dvr"/>
        <mu-bottom-nav-item value="person" title="个人中心" icon="person"/>
    </mu-bottom-nav>
</template>

<script>
    export default {
        data() {
            return {
                bottomNav: 'home'
            }
        },
        methods: {
            handleChange(val) {
                this.bottomNav = val
            }
        }
    }
</script>

<style lang="less">
    .mu-bottom-nav {
        position: fixed;
        bottom: 0;
    }
</style>
