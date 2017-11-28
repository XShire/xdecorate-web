<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="投标管理" slot="left" disabled/>
            <mu-flat-button label="添加" slot="right" @click=""/>
            <mu-flat-button label="统计" slot="right" @click=""/>
        </mu-appbar>
        <div class="divider-block"></div>

        <mu-list>
            <mu-list-item v-bind:title="item.param6" :afterText="getResult(item.param12)"
                          v-bind:to="{ name: 'budget_tender_detail', params: { x_code: item.param3 }}" v-for="item in itemList">
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
        methods: {
            getResult(value){
                var result = '';
                if(value=='1'){
                    result = '待确认';
                }else if(value=='2'){
                    result = '中标';
                }else if(value=='3'){
                    result = '未中标';
                }
                return result;
            },
            getReady () {
                let _this = this;
                let param1 = "GetTenderList";
                let param2 = "all";
                let param3 = null;
                let param4 = null;
                let saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4};
                let url = "/project/getObjects";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        _this.itemList = JSON.parse(result.param1)
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
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
        width: 50px;
        line-height: 2;
    }
</style>

