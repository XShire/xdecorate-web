<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-sub-header class="header-box">
            <div class="header-title">合同照片</div>
            <div class="header-btn">
                <mu-flat-button label="上传" primary @click="uploadImage()"/>
            </div>
        </mu-sub-header>
        <see-box>
            <see-item v-for="(item,index) in list" :key="index" :url="basePath+item.param6.replace('/upload/','/upload/original/')" :thumb="basePath+item.param6.replace('/upload/','/upload/thumb/')" :width="parseInt(item.param12.split('x')[0])" :height="parseInt(item.param12.split('x')[1])" :caption="item.param5"></see-item>
        </see-box>

        <div class="upload-progress" v-if="progress">
            <mu-circular-progress :size="60" />
        </div>

    </div>
</template>

<script>

    let wx = require('weixin-js-sdk');

    export default {
        data(){
            return {
                list: [],
                x_code: this.$route.params.x_code,
                basePath: this.$config.basePath,
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
                                            param1: 'AddProjectContractListByWX',
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
            getReady(){
                let _this = this;
                let param1 = "GetProjectContractList";
                let param2 = "ByProject";
                let param3 = null;
                let param4 = null;
                let param5 = this.$route.params.x_code;
                let saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
                let url = "/project/getObjects";
                _this.$http.post(url,saveData

                ).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        let _data = JSON.parse(result.param1);
                        _this.list = _data;
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        created: function(){

            this.getReady()

            //微信接口
            this.wxConfig()
        }
    }

</script>

<style lang="less">
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
        z-index: 10;
    }
    .upload-progress .mu-circular-progress{
        /*position:fixed;*/
        left: 50%;
        top: 50%;
        margin-top: -60px;
        margin-left: -30px;
    }
</style>

