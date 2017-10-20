<template>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="home" title="首页" icon="home"/>
        <mu-bottom-nav-item value="project" title="工程管理" icon="view_quilt"/>
        <mu-bottom-nav-item value="work" title="工作日常" icon="dvr"/>
        <mu-bottom-nav-item value="person" title="个人中心" icon="person"/>
    </mu-bottom-nav>
</template>

<script>

    import router from '../../router'

    export default {
        data() {
            return {
                bottomNav: 'home'
            }
        },
        methods: {
            handleChange(val) {
                this.bottomNav = val
                router.push('/'+val)
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
