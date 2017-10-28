

<template>
    <li>
        <div
                :class="{bold: isFolder}"
                @click="toggle">
            {{model.name}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <simple-tree
                    class="item"
                    v-for="model in model.children"
                    :model="model">
            </simple-tree>
            <li class="add" @click="addChild">+</li>
        </ul>
    </li>
</template>


<script>

//    树形结构，参考 https://vuefe.cn/v2/examples/tree-view.html ，没有使用

    export default {
        name: 'simple-tree',
        props: {
            model: Object
        },
        data: function () {
            return {
                open: false
            }
        },
        computed: {
            isFolder: function () {
                return this.model.children &&
                    this.model.children.length
            }
        },
        methods: {
            toggle: function () {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
            addChild: function () {
                this.model.children.push({
                    name: 'new stuff'
                })
            }
        },
        created: function () {
        }
    }

</script>

<style lang="less">

</style>

