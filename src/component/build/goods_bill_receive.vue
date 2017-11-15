<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-appbar>
            <mu-flat-button label="返回" slot="left" @click="back"/>
            <mu-flat-button label="保存" slot="right" @click="openDialog" secondary/>
        </mu-appbar>
        <div class="divider-block"></div>

        <div>
            <mu-sub-header>申请时间：{{goodsRequest.param4}}</mu-sub-header>
            <mu-divider/>
            <mu-list>
                <mu-list-item :title="item.param7" v-for="item in itemList" :describeLine="10">
                    <div slot="describe">
                        <mu-row gutter>
                            <mu-col width="50"><span class="item_label">材料类型：</span>{{item.param6}}</mu-col>
                            <mu-col width="50"><span class="item_label">申请数量：</span>{{item.param10}}</mu-col>
                            <mu-col width="50"><span class="item_label">接收数量：</span>{{item.param11}}</mu-col>
                            <mu-col width="50"><span class="item_label">剩余数量：</span>{{item.param12}}</mu-col>
                            <mu-col width="100"><mu-text-field type="number" label="本次接收数量" v-model="item.param20" fullWidth/></mu-col>
                        </mu-row>
                    </div>
                </mu-list-item>
            </mu-list>
        </div>

        <mu-dialog :open="dialog" @close="closeDialog">
            已检查数据是否正确？
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="saveItems" label="确定"/>
        </mu-dialog>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dialog: false,
                x_code: this.$route.params.x_code,
                basePath: this.$config.basePath,
                goodsRequest: Object, //提料单
                itemList: [],         //提料单中的材料项
                itemData: []          //待保存对象列表
            }
        },
        computed: {

        },
        methods: {
            back () {
                this.$router.push('/build_goods_bill')
            },
            openDialog () {
                this.dialog = true
            },
            closeDialog () {
                this.dialog = false
            },
            saveItems(){
                let _this = this

                for (var value of _this.itemList) {
                    let item_number = value.param20.toString();
                    if(!isNaN(parseFloat(item_number)) && parseFloat(item_number)>0){
                        let itemRow={item_code:value.param3, item_number:item_number}
                        _this.itemData.push(itemRow)
                    }
                }
                if(_this.itemData.length==0){
                    _this.$store.commit('showSnackBar','没有接收数据')
                    _this.dialog = false
                    return
                }

                let param0 = '';
                let param1 = "EditGoodsRequestItemList";
                let param2 = JSON.stringify(_this.itemData);
                let saveData = {
                    "param0": param0,
                    "param1": param1,
                    "param2": param2
                };
                let url = "/project/add";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    _this.$store.commit('showSnackBar',result.param1)
                    if(result.param0==0){
                        _this.dialog = false
                        _this.getReady()
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getReady(){
                let _this = this
                let url = "/project/getObject/goods_request/"+_this.x_code;
                this.$http.get(url

                ).then(function (response) {
                    var result = response.data
                    if(result.param0==0){
                        var _data1 = JSON.parse(result.param1)
                        var _data2 = JSON.parse(result.param2)
                        _this.goodsRequest = _data1
                        _this.itemList = _data2
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
        width: 8rem;
        line-height: 2;
    }
</style>

