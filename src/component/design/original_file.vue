<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-icon-button icon="file_upload" slot="right" @click="uploadImage()"/>
        </mu-appbar>
        <div class="divider-block"></div>

        <mu-sub-header>图片文件</mu-sub-header>
        <div>
            <see-box>
                <see-item v-for="(item,index) in fileList" :key="index" v-if="'gif,jpg,jpeg,bmp,png'.indexOf(item.param9.toLowerCase())>=0" :url="basePath+item.param12" :thumb="basePath+item.param13" :width="parseInt(item.param16.split('x')[0])" :height="parseInt(item.param16.split('x')[1])" :caption="item.param15"></see-item>
            </see-box>
        </div>

        <mu-sub-header>视频文件</mu-sub-header>
        <div class="video-container" v-for="(item,index) in fileList" v-if="'asx,asf,mpg,wmv,3gp,mp4,mov,avi,flv'.indexOf(item.param9.toLowerCase())>=0">
            <my-video :sources="[{src: basePath+item.param11,type: 'video/mp4'}]"
                      :options="{autoplay: false,volume: 0.6,poster: basePath+item.param13}">
            </my-video>
        </div>

        <div class="upload-progress" v-if="progress">
            <mu-circular-progress :size="60" />
        </div>

    </div>
</template>

<script>

//    import myVideo from 'vue-video'
    let myVideo = require('vue-video');
    let wx = require('weixin-js-sdk');

    export default {
        data() {
            return {
                basePath: this.$config.basePath,
                fileList: [],
                wxReady: false, //微信接口处理成功验证
                progress: false //上传图片时的进度显示
            }
        },
        components: {
            myVideo
        },
        computed: {
            cacheProjectCode: function () {
                let p_code = this.$store.state.projectSelected.code
                if(p_code){
                    window.localStorage.setItem('p_s_code',p_code);
                }else{
                    p_code = window.localStorage.getItem('p_s_code')
                }
                return p_code
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
                                            param1: 'AddOriginalFileListByWX',
                                            param2: 'OriginalImages',
                                            param3: result.param1,
                                            param4: _this.cacheProjectCode
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
            getReady(){
                let _this = this
                let url = "/project/getObjects";
                _this.$http.post(url,{
                    param1:'GetOriginalFileList',
                    param2:'ByProject',
                    param3:null,
                    param4:null,
                    param5:_this.cacheProjectCode
                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        _this.fileList = JSON.parse(result.param1);
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
    .video-container{
        margin: .5rem 0 1.5rem;
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
</style>

