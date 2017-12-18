<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="返回" slot="right" to="/build_check_quality_list"/>
            <mu-flat-button label="质检记录" slot="left" disabled/>
        </mu-appbar>
        <div class="divider-block"></div>

        <div class="detail-body">
            <mu-row gutter>
                <mu-col width="100"><span class="item_label">所属工程：</span>{{itemData.param5}}</mu-col>
                <mu-col width="100"><span class="item_label">检查日期：</span>{{itemData.param7}}</mu-col>
                <mu-col width="100"><span class="item_label">检查结果：</span>{{itemData.param11}}</mu-col>
                <mu-col width="100"><span class="item_label">检查内容：</span></mu-col>
                <mu-col width="100"><span class="item_body">{{itemData.param8}}</span></mu-col>
            </mu-row>
        </div>

        <mu-divider/>
        <mu-sub-header class="header-box">
            <div class="header-title">检查图片</div>
            <div class="header-btn">
                <mu-flat-button label="上传" primary @click="uploadImage()"/>
            </div>
        </mu-sub-header>

        <see-box>
            <see-item v-for="(item,index) in attachList" :key="index" :url="basePath+item.param6.replace('/upload/','/upload/original/')" :thumb="basePath+item.param6.replace('/upload/','/upload/thumb/')" :width="parseInt(item.param11.split('x')[0])" :height="parseInt(item.param11.split('x')[1])" :caption="item.param5"></see-item>
        </see-box>


        <div class="upload-progress" v-if="progress">
            <mu-circular-progress :size="60" />
        </div>

    </div>
</template>

<script>

    let wx = require('weixin-js-sdk');

    export default {
        data() {
            return {
                x_code: this.$route.params.x_code,//地址栏的检查code参数
                basePath: this.$config.basePath,
                itemData: Object,//检查对象
                attachList: [],//检查中的附件对象
                wxReady: false, //微信接口处理成功验证
                progress: false //上传图片时的进度显示
            }
        },
        methods: {
            uploadImage(){
                let _this = this
                if(_this.wxReady){
                    let images = {
                        localId: [],
                        serverId: []
                    };

                    wx.chooseImage({
                        count: 9, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {

                            let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            images.localId = localIds;
                            images.serverId = [];
                            let i = 0, length = images.localId.length;
                            function upload() {
                                wx.uploadImage({
                                    localId: images.localId[i],
                                    success: function (res) {
                                        i++;
                                        images.serverId.push(res.serverId);
                                        if (i < length) {
                                            upload();
                                        } else {
                                            downloadImages();
                                        }
                                    },
                                    fail: function (res) {
                                        _this.$store.commit('showSnackBar',JSON.stringify(res))
                                    }
                                });
                            }
                            function downloadImages() {
                                _this.progress = true
                                let down_url = "/weixin/wxuploadimage";
                                _this.$http.post(down_url,{
                                    param1: images.serverId.join(',')
                                }).then(function (response) {
                                    let result = response.data;
                                    if(result.param0==0){
                                        let url = "/project/add";
                                        _this.$http.post(url,{
                                            param0: '',
                                            param1: 'AddCheckAttachListByWX',
                                            param2: result.param1,
                                            param3: _this.x_code
                                        }).then(function (response) {
                                            let result = response.data;
                                            _this.progress = false
                                            _this.$store.commit('showSnackBar',result.param1)
                                            if(result.param0==0){
                                                _this.getReady()
                                            }
                                        }).catch(function (error) {
                                            _this.progress = false
                                            _this.$store.commit('showSnackBar',error)
                                        });
                                    }else{
                                        _this.progress = false
                                        _this.$store.commit('showSnackBar',result.param1)
                                    }
                                }).catch(function (error) {
                                    _this.$store.commit('showSnackBar',error)
                                });
                            }
                            upload();
                        }
                    });

                }else{
                    _this.$store.commit('showSnackBar','微信接口验证失败')
                }
            },
            wxConfig(){
                let _this = this;
                let url = "/weixin/signature";
                _this.$http.post(url,{
                    param1: location.href.split('#')[0]
                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        //获取签名成功
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: result.param2, // 必填，公众号的唯一标识
                            timestamp: result.param5, // 必填，生成签名的时间戳
                            nonceStr: result.param4, // 必填，生成签名的随机串
                            signature: result.param1,// 必填，签名，见附录1
                            jsApiList: ['chooseImage','previewImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function(){
                            _this.wxReady = true
                        });
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    _this.$store.commit('showSnackBar',error)
                });
            },
            getReady () {
                let _this = this
                let url = "/project/getObject/project_check/"+_this.x_code;
                this.$http.get(url,{

                }).then(function (response) {
                    var result = response.data

                    if(result.param0==0){
                        _this.itemData = JSON.parse(result.param1)
                        _this.attachList = JSON.parse(result.param2)
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
            this.wxConfig()
        }
    }

</script>

<style lang="less">
    .detail-body{
        padding-left: 3%;
        padding-right: 3%;
        padding-top: 1rem;
        width: 94%;
    }
    .item_label{
        display: inline-block;
        width: 72px;
        line-height: 3;
        color: #777;
    }
    .item_body{
        line-height: 2;
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
    .upload-progress{
        position:fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.35);
        z-index: 1000;
    }
    .upload-progress .mu-circular-progress{
        /*position:fixed;*/
        left: 50%;
        top: 50%;
        margin-top: -60px;
        margin-left: -30px;
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

