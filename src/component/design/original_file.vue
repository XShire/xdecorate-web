<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-icon-button icon="file_upload" slot="right" @click="addFiles()"/>
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
    </div>
</template>

<script>

    import myVideo from 'vue-video'

    export default {
        data() {
            return {
                basePath: this.$config.basePath,
                fileList: []
            }
        },
        components: {
            myVideo
        },
        methods: {
            addFiles () {

            }
        },
        created: function () {
            var _this = this

            var param1 = "GetOriginalFileList";
            var param2 = "ByProject";
            var param3 = null;
            var param4 = null;
            var param5 = _this.$store.state.projectSelected.code;
            var saveData = {"param1":param1,"param2":param2,"param3":param3,"param4":param4,"param5":param5};
            var url = "/project/getObjects";
            this.$http.post(url,saveData)
                .then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.fileList = JSON.parse(result.param1);
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });
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
</style>

