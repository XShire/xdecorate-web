<template>
    <mu-paper>
        <my-head></my-head>
        <router-view></router-view>
        <my-foot></my-foot>
    </mu-paper>
</template>

<script>
    import myHead from './component/header/head.vue'
    import myFoot from './component/footer/foot.vue'

    export default {
        components: {
            myHead,
            myFoot,
        }
    }
</script>

<style lang="less">
    html, body, .mu-paper {
        width: 100%;
        height: 100%;
    }
</style>

