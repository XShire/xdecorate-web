<template>
    <mu-paper>
        <router-view></router-view>
        <my-foot></my-foot>
    </mu-paper>
</template>

<script>
    import myFoot from './component/footer/foot.vue'

    export default {
        components: {
            myFoot,
        }
    }
</script>

<style lang="less">
    html, body, .mu-paper {
        width: 100%;
        height: 100%;
    }
    body{
        -webkit-overflow-scrolling: touch;
    }
</style>

