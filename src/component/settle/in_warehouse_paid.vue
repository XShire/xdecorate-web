<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-sub-header>已结算入库单</mu-sub-header>
        <mu-list>
            <mu-list-item :title="'新料采购'" v-for="(item,index) in itemList" @click="showInGoods(item)" :describeLine="10">

                <div slot="describe">
                    <div><span class="item_label">入库时间：</span><span>{{item.param5}}</span></div>
                    <div><span class="item_label">总金额:</span><span>{{item.param8 + '元'}}</span></div>
                    <div><span class="item_label">实际支付:</span><span>{{item.param9 + '元'}}</span></div>
                </div>
                <mu-icon value="navigate_next" slot="after"/>
            </mu-list-item>
        </mu-list>

        <mu-dialog :open="dialog" @close="closeDialog" titleClass="goods-info-title" dialogClass="goods-info-box" scrollable>
            <mu-list>
                <mu-sub-header>基本信息</mu-sub-header>
                <mu-list-item title="入库类型" :afterText="inWarehouse.param4=='1'?'新料采购':'旧料入库'"></mu-list-item>
                <mu-list-item title="入库时间" :afterText="inWarehouse.param5"></mu-list-item>
                <mu-list-item title="总金额" :afterText="inWarehouse.param8"></mu-list-item>
                <mu-list-item title="实际支付" :afterText="inWarehouse.param9"></mu-list-item>
                <mu-list-item title="支付方式" :afterText="inWarehouse.param10=='1'?'签单':'现金支付'"></mu-list-item>
                <mu-list-item title="是否支付" :afterText="inWarehouse.param11=='1'?'已支付':'未支付'"></mu-list-item>
                <mu-list-item title="经办人" :afterText="inWarehouse.param7"></mu-list-item>
                <mu-list-item title="入库说明" :describeText="inWarehouse.param14"></mu-list-item>

                <mu-divider/>
                <mu-sub-header>材料信息</mu-sub-header>
                <mu-list-item v-for="(item,index) in inGoodsList" :title="item.param6" :afterText="'数量：'+item.param9">
                    <div  slot="describe">
                        <div><span>价格：</span><span>{{item.param7 + '元/' + item.param12}}</span></div>
                        <div><span>总计：</span><span>{{item.param10 + '元'}}</span></div>
                    </div>
                </mu-list-item>
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
                itemList: [],             //入库单列表
                inWarehouse: Object,     //当前选中的入库单
                inGoodsList: [],          //当前入库单的材料列表
                dialog: false            //当前入库单弹出框
            }
        },
        methods: {
            showInGoods(item){
                this.inWarehouse = item

                this.inGoodsList = JSON.parse(item.param18);

                this.dialog = true
            },
            closeDialog () {
                this.dialog = false
            },
            getReady(){
                let _this = this

                let param1 = "GetInWarehouseList";
                let param2 = "IsPaidInWarehouse";
                let param3 = null;
                let param4 = null;
                let saveData = {"param1":param1,"param2":param2,"param3":param3,"param4":param4};
                let url = "/project/getObjects";
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
        },
        created: function () {
            this.getReady()
        }
    }

</script>

<style lang="less">
    .goods-info-box{
        width: 80%;
        max-width: 80%;
    }
    .goods-info-box .mu-dialog-body{
        padding: 0;
    }
    .item_label{
        display: inline-block;
        width: 80px;
        line-height: 2;
    }
</style>

