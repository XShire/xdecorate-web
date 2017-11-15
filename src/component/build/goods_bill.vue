<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>材料单</mu-sub-header>
            <mu-list-item v-bind:title="item.param7" :describeLine="10"
                          v-bind:to="{ name: 'build_goods_bill_detail', params: { x_code: item.param3 }}" v-for="item in itemList">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label">申请人：</span>{{item.param6}}</mu-col>
                        <mu-col width="100"><span class="item_label">申请时间：</span>{{item.param4}}</mu-col>
                        <mu-col width="100"><span class="item_label">所在工程：</span>{{item.param10}}</mu-col>
                        <mu-col width="100"><span class="item_label">申请说明：</span>{{item.param8}}</mu-col>
                        <mu-col width="100"><mu-raised-button label="接收材料" :to="{ name: 'build_goods_bill_receive', params: { x_code: item.param3 }}" primary/></mu-col>
                    </mu-row>
                </div>
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                itemList: []
            }
        },
        created: function () {
            var _this = this;
            var param1 = "GetGoodsRequestList";
            var param2 = "ByProject";
            var param3 = null;
            var param4 = null;
            var param5 = this.$store.state.projectSelected.code;
            var saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
            var url = "/project/getObjects";
            this.$http.post(url,saveData,{

            }).then(function (response) {
                var result = response.data;
                if(result.param0==0){
                    var _data = JSON.parse(result.param1);
                    _this.itemList = _data;
                }else{
                    _this.$store.commit('showSnackBar',result.param1)
                }
            }).catch(function (error) {
                console.info(error);
            });

        }
    }

</script>

<style lang="less">
    .item_label{
        display: inline-block;
        width: 8rem;
        line-height: 2;
    }
</style>

