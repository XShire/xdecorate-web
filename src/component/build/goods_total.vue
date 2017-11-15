<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-content-block>
            材料总金额：<span class="mu-color-primary">{{totalAmount}}元</span>
        </mu-content-block>
        <mu-divider/>
        <mu-list>
            <mu-sub-header>仓库材料 合计：{{goodsAmount}}元</mu-sub-header>
            <mu-list-item v-bind:title="item.param5" :describeLine="10" v-for="item in goodsList">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label">编号：</span>{{item.param4}}</mu-col>
                        <mu-col width="100"><span class="item_label">名称：</span>{{item.param5}}</mu-col>
                        <mu-col width="50"><span class="item_label">单价：</span>{{item.param6}}</mu-col>
                        <mu-col width="50"><span class="item_label">单位：</span>{{item.param7}}</mu-col>
                        <mu-col width="50"><span class="item_label">数量：</span>{{item.param20}}</mu-col>
                        <mu-col width="50"><span class="item_label">金额：</span>{{item.param21}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-list>
            <mu-sub-header>自购材料 合计：{{provAmount}}元</mu-sub-header>
            <mu-list-item v-bind:title="item.param4" :describeLine="10" v-for="item in provList">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="50"><span class="item_label">名称：</span>{{item.param4}}</mu-col>
                        <mu-col width="50"><span class="item_label">单价：</span>{{item.param5}}</mu-col>
                        <mu-col width="50"><span class="item_label">数量：</span>{{item.param20}}</mu-col>
                        <mu-col width="50"><span class="item_label">金额：</span>{{item.param21}}</mu-col>
                        <mu-col width="100"><span class="item_label">说明：</span>{{item.param6}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                goodsList: [],   //仓库材料列表
                provList: [],    //自购材料列表
                totalAmount: '', //总金额
                goodsAmount: '', //材料金额
                provAmount: '',  //临时材料金额
            }
        },
        methods:{
            getReady(){
                let _this = this
                let url = "/project/goods_item/"+_this.$store.state.projectSelected.code;
                this.$http.get(url

                ).then(function (response) {
                    var result = response.data
                    if(result.param0==0){
                        _this.goodsList = JSON.parse(result.param1)
                        _this.provList = JSON.parse(result.param2)
                        _this.totalAmount = result.param3
                        _this.goodsAmount = result.param4
                        _this.provAmount = result.param5
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        created: function () {
            this.getReady()
        }
    }

</script>

<style lang="less">
    .item_label{
        display: inline-block;
        width: 5rem;
        line-height: 2;
    }
</style>

