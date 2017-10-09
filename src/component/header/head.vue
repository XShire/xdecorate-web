<template>
    <mu-appbar>
        <mu-text-field icon="search" class="appbar-search-field" slot="default" hintText="请输入搜索内容"/>
    </mu-appbar>
</template>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style lang="less">
    .appbar-search-field {
        color: #FFF;
        margin-bottom: 0;
        &.focus-state {
            color: #FFF;
        }
        .mu-text-field-hint {
            color: fade(#FFF, 54%);
        }
        .mu-text-field-input {
            color: #FFF;
        }
        .mu-text-field-focus-line {
            background-color: #FFF;
        }
    }

    .mu-text-field {
        width: 94%;
    }
</style>