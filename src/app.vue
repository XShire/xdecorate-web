<template>
    <mu-paper>
        <snack-bar></snack-bar>
        <router-view></router-view>
        <my-foot></my-foot>
    </mu-paper>
</template>

<script>
    import myFoot from './component/footer/foot.vue'
    import snackBar from './component/util/snackBar.vue'

    export default {
        data () {
            return {

            }
        },
        components: {
            myFoot,
            snackBar
        },
        methods: {

        }
    }
</script>

<style lang="less">
    html, body {
        width: 100%;
        height: 100%;
    }
    .mu-paper{
        width: 100%;
        height: auto;
        min-height: 100%;
    }
    body{
        -webkit-overflow-scrolling: touch;
    }
</style>

