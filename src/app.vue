<template>
    <mu-paper>
        <mu-appbar>
            <mu-text-field icon="search" class="appbar-search-field" slot="default" hintText="请输入搜索内容"/>
        </mu-appbar>

        <div id="home-main-grid" class="home-main-grid">

        </div>

        <mu-bottom-nav :value="bottomNav" @change="handleChange">
            <mu-bottom-nav-item value="home" title="首页" icon="home"/>
            <mu-bottom-nav-item value="view_quilt" title="工程管理" icon="view_quilt"/>
            <mu-bottom-nav-item value="dvr" title="日常工作" icon="dvr"/>
            <mu-bottom-nav-item value="person" title="个人中心" icon="person"/>
        </mu-bottom-nav>
    </mu-paper>
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
    html, body, .mu-paper {
        width: 100%;
        height: 100%;
    }

    .mu-bottom-nav {
        position: fixed;
        bottom: 0;
    }

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

    .home-main-grid {
        padding-top: 20px;
        padding-bottom: 56px;
    }
</style>

