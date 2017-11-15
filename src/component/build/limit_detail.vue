<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-appbar>
            <mu-flat-button label="返回" slot="left" @click="back"/>
        </mu-appbar>
        <div class="divider-block"></div>

        <div>
            <mu-list>
                <mu-list-item v-bind:title="itemData.param6" :afterText="getStatusStr(itemData.param14)" :describeLine="10" disabled>
                    <div slot="describe">
                        <mu-row gutter>
                            <mu-col width="100"><span class="item_label">计划开始时间：</span>{{itemData.param7}}</mu-col>
                            <mu-col width="100"><span class="item_label">计划完成时间：</span>{{itemData.param8}}</mu-col>
                            <mu-col width="100"><span class="item_label">实际开始时间：</span>{{beginValue}}</mu-col>
                            <mu-col width="100"><span class="item_label">实际完成时间：</span>{{endValue}}</mu-col>
                            <mu-col width="100"><span class="item_label">备注：</span>{{itemData.param11}}</mu-col>
                            <mu-col width="100" v-if="actionVal"><mu-raised-button :label="actionStr" @click="actionItem" primary/></mu-col>
                        </mu-row>
                    </div>
                </mu-list-item>
            </mu-list>
            <mu-divider/>
            <mu-sub-header>工程图片</mu-sub-header>
            <div>
                <see-box>
                    <see-item v-for="(item,index) in imgList" :key="index" v-if="'gif,jpg,jpeg,bmp,png'.indexOf(item.param6.toLowerCase())>=0" :url="basePath+item.param8.replace('/upload/','/upload/original/')" :thumb="basePath+item.param8.replace('/upload/','/upload/thumb/')"
                              :width="item.param14&&item.param14.split('x')?parseInt(item.param14.split('x')[0]):0" :height="item.param14&&item.param14.split('x')?parseInt(item.param14.split('x')[1]):0" :caption="item.param10"></see-item>
                </see-box>
            </div>
        </div>

        <mu-dialog :open="dialog1" title="工期开始" @close="closeDialog1" dialogClass="goods-info-box" scrollable>
            <div>
                <mu-date-picker label="实际开始时间" v-model="beginTime" fullWidth/>
            </div>
            <mu-flat-button primary label="关闭" @click="closeDialog1" slot="actions"/>
            <mu-flat-button secondary label="保存" @click="beginLimit" slot="actions"/>
        </mu-dialog>

        <mu-dialog :open="dialog2" title="工期完成" @close="closeDialog2" dialogClass="goods-info-box" scrollable>
            <div>
                <mu-date-picker label="实际完成时间" v-model="endTime" fullWidth/>
            </div>
            <mu-flat-button primary label="关闭" @click="closeDialog2" slot="actions"/>
            <mu-flat-button secondary label="保存" @click="endLimit" slot="actions"/>
        </mu-dialog>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                x_code: this.$route.params.x_code,
                basePath: this.$config.basePath,
                itemData: Object,
                imgList: [],
                dialog1: false,
                dialog2: false,
                actionStr: '',
                actionVal: null,
                beginTime: '',
                endTime: '',
                beginValue: '',
                endValue: ''
            }
        },
        methods: {
            back () {
                this.$router.push('/build_limit_list')
            },
            closeDialog1 () {
                this.dialog1 = false
            },
            closeDialog2 () {
                this.dialog2 = false
            },
            getStatusStr (value) {
                let nowStatus = '';
                if(value=='1'){
                    nowStatus = '未开始';
                }else if(value=='2'){
                    nowStatus = '工作中';
                }else if(value=='3'){
                    nowStatus = '完成';
                }
                return nowStatus;
            },
            actionItem () {
                if(this.actionVal=='dialog1'){
                    this.dialog1 = true
                }else if(this.actionVal=='dialog2'){
                    this.dialog2 = true
                }
            },
            beginLimit () {
                let _this = this
                let param0 = _this.itemData.param3;
                let param1 = "BeginProjectLimit";
                let param2 = _this.beginTime;
                let saveData = {
                    param0: param0,
                    param1: param1,
                    param2: param2
                };
                let url = '/project/add';
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.dialog1 = false
                        _this.getReady()
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            endLimit () {
                let _this = this
                let param0 = _this.itemData.param3;
                let param1 = "EndProjectLimit";
                let param2 = _this.endTime;
                let saveData = {
                    param0: param0,
                    param1: param1,
                    param2: param2
                };
                let url = '/project/add';
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.dialog2 = false
                        _this.getReady()
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            getReady(){
                let _this = this
                let url = "/project/getObject/project_limit/"+_this.x_code;
                this.$http.get(url

                ).then(function (response) {
                    var result = response.data

                    if(result.param0==0){
                        _this.itemData = JSON.parse(result.param1)
                        _this.imgList = JSON.parse(result.param2)

                        if(_this.itemData.param14=='1'){
                            _this.actionStr = '开始'
                            _this.actionVal = 'dialog1'
                        }else if( _this.itemData.param14=='2'){
                            _this.actionStr = '完成'
                            _this.actionVal = 'dialog2'
                        }else{
                            _this.actionVal = null
                        }

                        if(_this.itemData.param14=='1' && _this.itemData.param12=='2'){
                            _this.beginValue= '(超期未开始)'
                        }else{
                            _this.beginValue = _this.itemData.param9
                        }

                        if(_this.itemData.param14!='3' && _this.itemData.param13=='2'){
                            _this.endValue= '(超期未完成)'
                        }else{
                            _this.endValue = _this.itemData.param10
                        }
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
        width: 100px;
        line-height: 2;
    }
    .goods-info-box{
        width: 80%;
        max-width: 80%;
    }
    .goods-info-box .mu-dialog-body{
        padding:10px 2% 0;
    }

    figure {
        margin: .5rem 0 1.5rem;
        position: relative;
    }
    figure a{
        font-size: 0;
        display: block;
    }
    figure img{
        max-width:100%;
        display: block;
    }
    figcaption{
        color: #fff;
        background-color: rgba(0,0,0,0.6);
        width: 100%;
        line-height: 2;
        position: absolute;
        bottom: 0;
    }
</style>

