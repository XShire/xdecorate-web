<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-appbar>
            <mu-icon-button icon="menu" slot="left" @click="toggle"/>
            <mu-flat-button label="自行购买" secondary slot="right" @click="addProvGoods"/>
            <mu-flat-button label="材料库添加" secondary slot="right" @click="toggleR"/>
        </mu-appbar>
        <div class="divider-block"></div>

        <mu-drawer width="100%" :open="open" :docked="docked" @close="toggle()">
            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="toggle()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <div class="request_box">

                <mu-text-field label="所在工程" v-model="goodsRequest.param10" fullWidth disabled/>
                <mu-text-field label="申请人" v-model="goodsRequest.param6" fullWidth disabled/>

                <mu-date-picker label="申请时间" v-model="goodsRequest.param4" fullWidth/>
                <mu-text-field label="申请说明" v-model="goodsRequest.param8" hintText="不允许超过100个字符" :errorText="multiLineInputErrorText" @textOverflow="requestIntroOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="100" fullWidth/>

                <div class="request_action">
                    <mu-raised-button label="重置" class="request_btn" @click="getReady"/>
                    <mu-raised-button label="保存" class="request_btn" @click="saveRequest" secondary/>
                </div>
            </div>

        </mu-drawer>

        <div>
            <mu-sub-header>采购材料列表</mu-sub-header>
            <mu-list>
                <mu-list-item :title="item.param7" v-for="item in itemList" :describeLine="10">
                    <div slot="describe">
                        <mu-row gutter>
                            <mu-col width="50"><span class="item_label">材料类型：</span>{{item.param6}}</mu-col>
                            <mu-col width="50"><span class="item_label">申请数量：</span>{{item.param10}}</mu-col>
                            <mu-col width="50"><span class="item_label">接收数量：</span>{{item.param11}}</mu-col>
                            <mu-col width="50"><span class="item_label">剩余数量：</span>{{item.param12}}</mu-col>
                        </mu-row>
                    </div>
                </mu-list-item>
            </mu-list>
            <mu-divider/>
        </div>

        <mu-drawer right width="100%" :open="open_r" :docked="docked" @close="toggleR()" @hide="resetGoods">
            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="toggleR()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <mu-sub-header>材料列表</mu-sub-header>
            <mu-list>
                <mu-list-item v-for="(item,index) in goodsList" :describeLine="10" disabled>
                    <div class="title-manage" slot="title">
                        <span class="title-info">编号：{{item.param4}}</span>
                        <div class="number-info">
                            <mu-icon-button icon="remove_circle_outline" @click="addInGoods(item,index,'g-code-',-1)"/>
                            <input type="number" class="goods-number" :id="'g-code-'+item.param3" min="0" max="999999" v-model="item.param20" @input="addInGoods(item,index,'g-code-',0)">
                            <mu-icon-button icon="add_circle_outline" @click="addInGoods(item,index,'g-code-',1)"/>
                        </div>
                    </div>
                    <div  slot="describe">
                        <div class="save-goods-box">
                            <mu-raised-button label="保存" secondary v-if="selectedGoodsCode===item.param3" @click="saveRequestItem"/>
                        </div>
                        <mu-row gutter>
                            <mu-col width="100"><span class="item_label">材料名称：</span>{{item.param5}}</mu-col>
                            <mu-col width="100"><span class="item_label">材料价格：</span>{{item.param6 + '元/' + item.param7}}</mu-col>
                        </mu-row>
                    </div>
                </mu-list-item>
            </mu-list>

        </mu-drawer>


        <mu-dialog :open="dialog" @close="closeDialog" dialogClass="goods-info-box" scrollable>
            <div>
                <mu-text-field label="材料名称" v-model="goods.name"/>
                <mu-text-field label="采购单价(元)" type="number" v-model="goods.price"/>
                <mu-text-field label="计量单位" v-model="goods.unit"/>
                <mu-text-field label="采购数量" type="number" v-model="goods.number"/>
            </div>
            <mu-flat-button primary label="关闭" @click="closeDialog" slot="actions"/>
            <mu-flat-button secondary label="保存" @click="saveRequestItem" slot="actions"/>
        </mu-dialog>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                open: false,
                open_r: false,
                docked: false,
                x_code: this.$route.params.x_code,
                basePath: this.$config.basePath,
                goodsRequest: Object, //提料单
                itemList: [],         //提料单中的材料项
                goodsList: [],        //材料列表
                goods: {
                    itemCode: '',//申请项code
                    goodsCode: '',//材料项code
                    name: '',
                    price: '',
                    unit: '',
                    number: ''
                },  //临时材料容器
                dialog: false,
                multiLineInputErrorText: '',
                selectedGoodsCode: ''  //当前修改的材料code
            }
        },
        computed: {

        },
        methods: {
            toggle () {
                this.open = !this.open
            },
            toggleR () {
                this.open_r = !this.open_r
            },
            resetGoods(){
                this.goods = {
                    itemCode: '',
                    goodsCode: '',
                    name: '',
                    price: '',
                    unit: '',
                    number: ''
                }
                this.selectedGoodsCode = ''
            },
            addProvGoods(){
                this.goods = {
                    itemCode: '',
                    goodsCode: '',
                    name: '',
                    price: '',
                    unit: '',
                    number: ''
                }
                this.dialog = true
            },
            closeDialog () {
                this.dialog = false
            },
            requestIntroOverflow (isOverflow) {
                this.multiLineInputErrorText = isOverflow ? '字数超过限制' : ''
            },
            saveRequest(){
                let _this = this
                let param0 = _this.goodsRequest.param3;//采购单code
                let param1 = "AddGoodsRequest";
                let param2 = _this.goodsRequest.param9;//project code
                let param3 = _this.goodsRequest.param4;//申请时间 yyyy-MM-dd
                let param4 = _this.goodsRequest.param5;//申请人code
                let param5 = _this.goodsRequest.param8;//备注
                let saveData = {
                    "param0": param0,
                    "param1": param1,
                    "param2": param2,
                    "param3": param3,
                    "param4": param4,
                    "param5": param5
                };
                let url = "/project/add";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    _this.$store.commit('showSnackBar',result.param1)
                    if(result.param0==0){
                        _this.toggle()
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            saveRequestItem(){
                let _this = this
                let param0 = _this.goods.itemCode;
                let param1 = "AddGoodsRequestItem";
                let param2 = _this.goods.goodsCode;
                let param3 = _this.goods.name;
                let param4 = _this.goods.price;
                let param5 = _this.goods.unit;
                let param6 = _this.goods.number;
                let param7 = _this.x_code;
                let saveData = {
                    "param0": param0,
                    "param1": param1,
                    "param2": param2,
                    "param3": param3,
                    "param4": param4,
                    "param5": param5,
                    "param6": param6,
                    "param7": param7
                };
                let url = "/project/add";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    _this.$store.commit('showSnackBar',result.param1)
                    if(result.param0==0){
                        _this.getReady()
                        _this.dialog = false
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
                        _this.getGoodsList()
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getGoodsList(){
                let _this = this
                let param1 = "GetGoodsList";
                let param2 = "all";
                let param3 = null;
                let param4 = null;
                let saveData = {"param1":param1,"param2":param2,"param3":param3,"param4":param4};
                let url = "/project/getObjects";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.goodsList = JSON.parse(result.param1);

                        for(let item of _this.itemList){
                            let goodsIndex = _this.goodsList.findIndex((value) => {
                                return item.param4 == value.param3
                            })
                            if(goodsIndex!==-1){
                                _this.goodsList[goodsIndex].param20 = item.param10
                            }
                        }
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            addInGoods(item,index,eleId,num){
                let _this = this

                //修改输入框数量
                let old_num = document.getElementById(eleId+item.param3).value;
                let new_num = Number(old_num) + num;
                if(new_num<0) new_num=0;

                //设置当前修改的材料code,显示保存按钮
                _this.selectedGoodsCode = item.param3

                //设置当前的材料项数据
                let itemValue = _this.itemList.find((value) => {
                    return value.param4 == item.param3
                })

                if(itemValue){
                    _this.goods = {
                        itemCode: itemValue.param3,
                        goodsCode: itemValue.param4,
                        name: itemValue.param7,
                        price: itemValue.param8,
                        unit: itemValue.param9,
                        number: new_num
                    }
                }else{
                    _this.goods = {
                        itemCode: '',
                        goodsCode: item.param3,
                        name: item.param5,
                        price: item.param6,
                        unit: item.param7,
                        number: new_num
                    }
                }

                //goodsList 使用 param20 保存数量临时字段
                _this.goodsList[index].param20 = new_num

            }
        },
        created: function () {
            this.getReady()
        }
    }

</script>

<style lang="less">
    .request_box{
        padding: 2rem 4% 0 4%;
    }
    .request_action{
        padding-top: 3rem;
        text-align: center;
    }
    .request_action .request_btn{
        margin-left: 8%;
        margin-right: 8%;
    }
    .goods-info-box{
        width: 80%;
        max-width: 80%;
    }
    .goods-info-box .mu-dialog-body{
        padding-top:10px;
        padding-bottom: 0;
    }
    .item_label{
        display: inline-block;
        width: 8rem;
        line-height: 2;
    }
    .title-manage{
        font-size: 0;
    }
    .title-manage .title-info{
        font-size: 16px;
        line-height: 40px;
    }
    .title-manage .number-info{
        display: inline-block;
        float: right;
    }
    .title-manage .mu-icon-button{
        vertical-align:middle;
        width: 40px;
        height: 40px;
        padding: 8px;
    }
    .title-manage .goods-number{
        vertical-align:middle;
        font-size: 14px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
    }
    .save-goods-box{
        text-align: right;
        padding-right: 8px;
    }
    .save-goods-box .mu-raised-button{
        width: 114px;
    }
</style>

