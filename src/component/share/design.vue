<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-icon-button icon="menu" slot="left" @click="toggle()"/>
        </mu-appbar>
        <div class="divider-block"></div>
        <mu-list>
            <mu-sub-header>CAD文件</mu-sub-header>
            <mu-list-item v-for="item in designList" v-if="'dwg,dxf'.indexOf(item.param9.toLowerCase())>=0" :title="(item.param10.length>20?(item.param10.substring(0,20)+'...'):item.param10)" :describeText="item.param14" :href="basePath+'/project/download/draw_file/'+item.param3" target="_blank">
                <mu-icon slot="right" value="file_download"/>
            </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-list>
            <mu-sub-header>文档文件</mu-sub-header>
            <mu-list-item v-for="item in designList" v-if="'doc,docx,xls,xlsx'.indexOf(item.param9.toLowerCase())>=0" :title="(item.param10.length>20?(item.param10.substring(0,20)+'...'):item.param10)" :describeText="item.param14" :href="basePath+'/project/download/draw_file/'+item.param3" target="_blank">
                <mu-icon slot="right" value="file_download"/>
            </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-sub-header>图片文件</mu-sub-header>
        <div>
            <see-box>
                <see-item v-for="(item,index) in designList" :key="index" v-if="'gif,jpg,jpeg,bmp,png'.indexOf(item.param9.toLowerCase())>=0" :url="basePath+item.param11.replace('/upload/','/upload/original/')" :thumb="basePath+item.param11.replace('/upload/','/upload/thumb/')" :width="parseInt(item.param15.split('x')[0])" :height="parseInt(item.param15.split('x')[1])" :caption="item.param14"></see-item>
            </see-box>
        </div>

        <mu-drawer width="67%" :open="open" :docked="docked" @close="toggle()">

            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="toggle()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <mu-list>
                <mu-list-item v-for="item in contentList" :title="item.nodeName" toggleNested  disableRipple >
                    <mu-icon slot="left" value="folder_open"/>
                    <mu-list-item v-for="child in item.childList" slot="nested" :title="child.nodeName" disableRipple @click="getDesign(child.obj)" >
                        <mu-icon slot="left" value="crop_original"/>
                    </mu-list-item>
                </mu-list-item>
            </mu-list>

        </mu-drawer>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                open: true,
                docked: false,
                basePath: this.$config.basePath,
                contentList: [],
                designList: []
            }
        },
        methods: {
            toggle () {
                this.open = !this.open
            },
            getDesign(content_code){

                var _this = this
                _this.toggle()

                var param1 = "GetDrawFileList";
                var param2 = "ByContent";
                var param3 = null;
                var param4 = null;
                var param5 = content_code;
                var saveData = {"param1":param1,"param2":param2,"param3":param3,"param4":param4,"param5":param5};
                var url = "/project/getObjects";
                this.$http.post(url,saveData)
                    .then(function (response) {
                        console.log(response.data);
                        var result = response.data;
                        if(result.param0==0){
                            _this.designList = JSON.parse(result.param1);
                        }else{
                            _this.$store.commit('showSnackBar',result.param1)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            }
        },
        created: function () {
            var _this = this
            var url = "/project/drawContentJsTree/ByProjectAndOnlyDisplay2/"+_this.$store.state.projectSelected.code;
            this.$http.get(url)
                .then(function (response) {
                    _this.contentList = response.data
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }

</script>

<style lang="less">
    .mu-appbar{
        height: 48px;
        position: fixed;
        top: 0;
        left: 0;
    }
    .divider-block{
        height: 48px;
    }
    figure {
        margin: 1rem 0;
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

