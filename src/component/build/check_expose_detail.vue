<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="返回" slot="right" to="/build_check_expose_list"/>
            <mu-flat-button label="曝光详情" slot="left" disabled/>
        </mu-appbar>
        <div class="divider-block"></div>

        <mu-sub-header>
            检查信息
        </mu-sub-header>

        <div class="detail-body">
            <mu-row gutter>
                <mu-col width="100"><span class="item_label">所在工程：</span>{{itemData.param5}}</mu-col>
                <mu-col width="100"><span class="item_label">检查日期：</span>{{itemData.param7}}</mu-col>
                <mu-col width="100"><span class="item_label">检查结果：</span>{{itemData.param11}}</mu-col>
                <mu-col width="100"><span class="item_label">检查内容：</span></mu-col>
                <mu-col width="100"><span class="item_body">{{itemData.param8}}</span></mu-col>
            </mu-row>
        </div>

        <mu-divider/>
        <mu-sub-header>
            检查图片
        </mu-sub-header>

        <see-box>
            <see-item v-for="(item,index) in attachList" :key="index" :url="basePath+item.param6.replace('/upload/','/upload/original/')" :thumb="basePath+item.param6.replace('/upload/','/upload/thumb/')" :width="parseInt(item.param11.split('x')[0])" :height="parseInt(item.param11.split('x')[1])" :caption="item.param5"></see-item>
        </see-box>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                x_code: this.$route.params.x_code,//地址栏的检查code参数
                basePath: this.$config.basePath,
                itemData: Object,//检查对象
                attachList: []//检查中的附件对象
            }
        },
        methods: {
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
                    _this.$store.commit('showSnackBar',error)
                });
            }
        },
        created: function () {
            this.getReady()
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
        line-height: 2;
        color: rgba(0, 0, 0, 0.54);
    }
    .item_body{
        line-height: 2;
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

