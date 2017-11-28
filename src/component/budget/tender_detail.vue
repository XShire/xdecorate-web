<template>
    <div class="home-main-grid" id="home-main-grid">

        <div>
            <mu-sub-header>投标详情</mu-sub-header>
            <mu-list>
                <mu-list-item :describeLine="12">
                    <div slot="describe">
                        <mu-row gutter>
                            <mu-col width="100"><span class="item_label">单位：</span>{{itemData.param6}}</mu-col>
                            <mu-col width="100"><span class="item_label">标底：</span>{{itemData.param5}}</mu-col>
                            <mu-col width="100"><span class="item_label">报价：</span>{{itemData.param8}}元</mu-col>
                            <mu-col width="100"><span class="item_label">日期：</span>{{itemData.param9}}</mu-col>
                            <mu-col width="100"><span class="item_label">得分：</span>{{itemData.param11}}</mu-col>
                            <mu-col width="100"><span class="item_label">结果：</span><span v-html="getResult(itemData.param12)"></span></mu-col>
                            <mu-col width="100"><span class="item_label">投标分析：</span>{{itemData.param10}}</mu-col>
                            <mu-col width="100"><span class="item_label">结果分析：</span>{{itemData.param13}}</mu-col>
                        </mu-row>
                    </div>
                </mu-list-item>
            </mu-list>

            <mu-sub-header>其它投标者</mu-sub-header>
            <mu-list>
                <mu-list-item :title="item.param4" v-for="item in otherList" :describeLine="10">
                    <div slot="describe">
                        <mu-row gutter>
                            <mu-col width="100"><span class="item_label">报价：</span>{{item.param5}}元</mu-col>
                            <mu-col width="100"><span class="item_label">得分：</span>{{item.param6}}</mu-col>
                            <mu-col width="100"><span class="item_label">分析：</span>{{item.param7}}</mu-col>
                        </mu-row>
                    </div>
                </mu-list-item>
            </mu-list>

            <mu-divider/>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                x_code: this.$route.params.x_code,
                itemData: Object,
                otherList: []
            }
        },
        computed: {

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
            getReady(){
                let _this = this
                let url = "/project/getObject/tender/"+_this.x_code;
                this.$http.get(url

                ).then(function (response) {
                    var result = response.data
                    if(result.param0==0){
                        var _data1 = JSON.parse(result.param1)
                        var _data2 = JSON.parse(result.param2)
                        _this.itemData = _data1
                        _this.otherList = _data2
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
        width: 80px;
        line-height: 2;
    }
</style>

