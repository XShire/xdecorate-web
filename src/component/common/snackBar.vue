<template>
    <div>
        <mu-snackbar v-if="this.$store.state.snackData.show" v-bind:message="this.$store.state.snackData.message" v-bind:action="this.$store.state.snackData.action" @actionClick="hideSnackBar" @close="hideSnackBar"/>
    </div>

</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            hideSnackBar () {
                this.$store.commit('hideSnackBar')
            }
        }
    }
</script>

<style lang="less">
    .mu-snackbar{
        top: 0;
        bottom: initial;
    }
</style>
