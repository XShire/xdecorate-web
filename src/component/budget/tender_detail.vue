<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-sub-header class="header-box">
            <div class="header-title">投标详情</div>
            <div class="header-btn">
                <mu-flat-button label="修改" primary @click="addToggle(false)"/>
            </div>
        </mu-sub-header>
        <mu-divider shallowInset/>
        <mu-list>
            <mu-list-item :describeLine="20">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label_1">单位：</span>{{itemData.param6}}</mu-col>
                        <mu-col width="100"><span class="item_label_1">标底：</span>{{itemData.param5 + ' 元'}}</mu-col>
                        <mu-col width="100"><span class="item_label_1">报价：</span>{{itemData.param8 + ' 元'}}</mu-col>
                        <mu-col width="100"><span class="item_label_1">日期：</span>{{itemData.param9}}</mu-col>
                        <mu-col width="100"><span class="item_label_1">得分：</span>{{itemData.param11}}</mu-col>
                        <mu-col width="100"><span class="item_label_1">结果：</span><span v-html="getResult(itemData.param12)"></span></mu-col>
                        <mu-col width="100"><span class="item_label_2">投标分析：</span>{{itemData.param10}}</mu-col>
                        <mu-col width="100"><span class="item_label_2">结果分析：</span>{{itemData.param13}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>

        <!--<mu-divider/>-->
        <mu-sub-header class="header-box">
            <div class="header-title">其它投标者</div>
            <div class="header-btn">
                <mu-flat-button label="添加" primary @click="otherToggle(false)"/>
            </div>
        </mu-sub-header>
        <mu-divider shallowInset/>
        <div v-if="!otherList || otherList.length==0" class="no-item-other">暂未添加其它投标人</div>
        <mu-list>
            <mu-list-item v-for="item in otherList" :describeLine="10">
                <div slot="title">
                    {{item.param4}}
                    <mu-flat-button label="修改" primary @click="otherToggle(item)"/>
                </div>
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label_1">报价：</span>{{item.param5}}元</mu-col>
                        <mu-col width="100"><span class="item_label_1">得分：</span>{{item.param6}}</mu-col>
                        <mu-col width="100"><span class="item_label_1">分析：</span>{{item.param7}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>

        <!--添加投标-->
        <mu-drawer width="100%" :open="add_open">
            <mu-appbar title="投标信息">
                <mu-icon-button icon="close" slot="right" @click="addToggle(false)"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <div class="add-input-box">
                <mu-text-field label="招标单位" hintText="必填" fullWidth v-model="itemData.param6"/>
                <mu-text-field label="概况" multiLine :rows="2" :rowsMax="3" :maxLength="100" fullWidth v-model="itemData.param7"/>
                <mu-text-field label="标底（元）" type="number" fullWidth v-model="itemData.param5"/>
                <mu-text-field label="信息来源" fullWidth v-model="itemData.param4"/>
                <mu-date-picker label="投标日期" autoOk fullWidth v-model="itemData.param9"/>
                <mu-text-field label="报价（元）" type="number" fullWidth v-model="itemData.param8"/>
                <mu-text-field label="得分" type="number" fullWidth v-model="itemData.param11"/>
                <mu-text-field label="投标分析" multiLine :rows="3" :rowsMax="6" :maxLength="200" fullWidth v-model="itemData.param10"/>
                <mu-text-field label="结果分析" multiLine :rows="3" :rowsMax="6" :maxLength="200" fullWidth v-model="itemData.param13"/>

                <mu-radio label="待确认" name="result" nativeValue="1" class="result-radio" v-model="itemData.param12"/>
                <mu-radio label="中标" name="result" nativeValue="2" class="result-radio" v-model="itemData.param12"/>
                <mu-radio label="未中标" name="result" nativeValue="3" class="result-radio" v-model="itemData.param12"/>

                <mu-raised-button label="取消" primary @click="addToggle(true)" class="save-btn"/>
                <mu-raised-button label="保存" secondary @click="saveItem()" class="save-btn"/>
            </div>

        </mu-drawer>
        <!--添加投标-->

        <!--添加其他投标者-->
        <mu-drawer width="100%" right :open="other_open">
            <mu-appbar title="其它投标者">
                <mu-icon-button icon="close" slot="right" @click="otherToggle(false)"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <div class="add-input-box">
                <mu-text-field label="招标单位" hintText="必填" fullWidth v-model="other_item.company"/>
                <mu-text-field label="报价（元）" type="number" fullWidth v-model="other_item.offer"/>
                <mu-text-field label="得分" type="number" fullWidth v-model="other_item.score"/>
                <mu-text-field label="投标分析" multiLine :rows="3" :rowsMax="6" :maxLength="200" fullWidth v-model="other_item.description"/>

                <mu-raised-button label="取消" primary @click="otherToggle(false)" class="save-btn"/>
                <mu-raised-button label="保存" secondary @click="saveOtherItem()" class="save-btn"/>
            </div>

        </mu-drawer>
        <!--添加其他投标者-->

    </div>
</template>

<script>

    export default {
        data() {
            return {
                x_code: this.$route.params.x_code,
                itemData: Object,
                otherList: [],
                add_open: false, //添加投标模块
                other_open: false, //其他投标者模块
                other_item: {
                    code: '', //对象code
                    tender: '', //对应投标的code
                    company: '',//招标单位
                    offer: '',//报价
                    score: '',//得分
                    description: ''//分析
                } //其他投标者临时对象
            }
        },
        computed: {

        },
        methods: {
            addToggle (_init) {
                this.add_open = !this.add_open
                if(_init) this.getReady() //判断是否刷新数据
            },
            otherToggle (otherItem) {
                this.other_open = !this.other_open
                if(otherItem) {
                    this.other_item.code = otherItem.param3
                    this.other_item.company = otherItem.param4
                    this.other_item.offer = otherItem.param5
                    this.other_item.score = otherItem.param6
                    this.other_item.description = otherItem.param7
                }else{
                    this.other_item.code = ''
                    this.other_item.company = ''
                    this.other_item.offer = ''
                    this.other_item.score = ''
                    this.other_item.description = ''
                }
            },
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
            saveItem() {
                let _this = this;
                let url = "/project/add";
                _this.$http.post(url,{
                    param0: _this.x_code,
                    param1: 'AddTender',
                    param2: _this.itemData.param6,
                    param3: _this.itemData.param7,
                    param4: _this.itemData.param5,
                    param5: _this.itemData.param4,
                    param6: _this.itemData.param9,
                    param7: _this.itemData.param8,
                    param8: _this.itemData.param11,
                    param9: _this.itemData.param12,
                    param10: _this.itemData.param14,
                    param11: _this.itemData.param15,
                    param12: _this.itemData.param10,
                    param13: _this.itemData.param13
                }).then(function (response) {
                    let result = response.data;
                    _this.$store.commit('showSnackBar',result.param1)
                    if(result.param0==0){
                        _this.add_open = false
                        _this.getReady()
                    }
                }).catch(function (error) {
                    console.info(error)
                    _this.$store.commit('showSnackBar','添加失败')
                });
            },
            saveOtherItem() {

                let _this = this;console.info(_this.other_item)
                let url = "/project/add";
                _this.$http.post(url,{
                    param0: _this.other_item.code,
                    param1: 'AddTenderOther',
                    param2: _this.other_item.tender,
                    param3: _this.other_item.company,
                    param4: _this.other_item.offer,
                    param5: _this.other_item.score,
                    param6: _this.other_item.description
                }).then(function (response) {
                    let result = response.data;
                    _this.$store.commit('showSnackBar',result.param1)
                    if(result.param0==0){
                        _this.other_open = false
                        _this.getReady()
                    }
                }).catch(function (error) {
                    console.info(error)
                    _this.$store.commit('showSnackBar','添加失败')
                });
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
            this.other_item.tender = this.x_code
            this.getReady()
        }
    }

</script>

<style lang="less">
    .item_label_1{
        display: inline-block;
        width: 50px;
        line-height: 2;
    }
    .item_label_2{
        display: inline-block;
        width: 80px;
        line-height: 2;
    }
    .no-item-other{
        padding-top: 16px;
        padding-left: 16px;
        color: rgba(0, 0, 0, 0.54);
    }
    .header-box{
        font-size: 0;
    }
    .header-title{
        display: inline-block;
        width: 40%;
        font-size: 14px;
    }
    .header-btn{
        display: inline-block;
        width:60%;
        text-align: right;
        font-size: 14px;
    }
    .add-input-box{
        padding:10px 3% 30px;
        width: 100%;
    }
    .result-radio{
        width: 32%;
    }
    .save-btn{
        margin-top: 20px;
    }

</style>

