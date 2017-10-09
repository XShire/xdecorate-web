<template>
    <mu-paper>
        <my-head></my-head>
        <div class="home-main-grid" id="home-main-grid">
            This is home !
        </div>
        <my-foot></my-foot>
    </mu-paper>
</template>

<script>
    import myHead from '../header/head.vue'
    import myFoot from '../footer/foot.vue'

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

    .home-main-grid {
        padding-top: 20px;
        padding-bottom: 56px;
    }
</style>

