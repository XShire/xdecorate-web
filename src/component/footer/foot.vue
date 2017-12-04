<template>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="home" title="首页" icon="home" @click.native="handleClick"/>
        <mu-bottom-nav-item value="project" title="功能应用" icon="view_quilt" @click.native="handleClick"/>
        <mu-bottom-nav-item value="share" title="共享文档" icon="dvr" @click.native="handleClick"/>
        <mu-bottom-nav-item value="person" title="个人中心" icon="person" @click.native="handleClick"/>
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
            },
            handleClick() {
                //通过@click="handleClick"绑定 click 事件
                router.push('/'+this.bottomNav)
            }
        }
    }
</script>

<style lang="less">
    .mu-bottom-nav {
        position: fixed;
        bottom: 0;
        z-index: 100;
    }
</style>
