<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-list>
            <mu-sub-header>材料查看</mu-sub-header>
            <mu-list-item :title="item.param5" :afterText="'编号：'+item.param4" v-for="(item,index) in itemList" @click="showGoods(item)">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>

        <mu-dialog :open="dialog" @close="closeDialog" title="材料明细" titleClass="goods-info-title" dialogClass="goods-info-box" scrollable>
            <mu-list>
                <mu-list-item title="编号" :afterText="goods.param4"></mu-list-item>
                <mu-list-item title="名称" :afterText="goods.param5"></mu-list-item>
                <mu-list-item title="单价" :afterText="goods.param6"></mu-list-item>
                <mu-list-item title="单位" :afterText="goods.param7"></mu-list-item>
                <mu-list-item title="厂商" :afterText="goods.param9"></mu-list-item>
                <mu-list-item title="介绍"></mu-list-item>
                <div v-html="goods.param10" class="goods-intro"></div>
            </mu-list>
            <mu-flat-button primary label="关闭" @click="closeDialog" slot="actions"/>
        </mu-dialog>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                basePath: this.$config.basePath,
                itemList: [],
                goods: Object,
                dialog: false
            }
        },
        methods: {
            showGoods(item){
                this.goods = item
                this.dialog = true
            },
            closeDialog () {
                this.dialog = false
            }
        },
        created: function () {
            var _this = this

            var param1 = "GetGoodsList";
            var param2 = "all";
            var param3 = null;
            var param4 = null;
            var saveData = {"param1":param1,"param2":param2,"param3":param3,"param4":param4};
            var url = "/project/getObjects";
            this.$http.post(url,saveData)
                .then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.itemList = JSON.parse(result.param1);
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }

</script>

<style lang="less">
    .goods-info-title{
        font-size: 2rem;
        padding-top: 1rem;
        padding-bottom: 0;
    }
    .goods-info-box{
        width: 80%;
        max-width: 80%;
    }
    .goods-intro{
        width: 100%;
    }
    .goods-intro img{
        max-width: 100%;
    }
</style>

