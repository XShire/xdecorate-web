<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-sub-header>审计详情</mu-sub-header><mu-divider/>
        <mu-list>
            <mu-list-item title="工程" v-bind:afterText="object.param12" disabled/><mu-divider/>
            <mu-list-item title="审计单位" v-bind:afterText="object.param4" disabled/><mu-divider/>
            <mu-list-item title="审计时间" v-bind:afterText="object.param8" disabled/><mu-divider/>
            <mu-list-item title="审计结果" v-bind:afterText="object.param6" disabled/><mu-divider/>
            <mu-list-item title="负责人" v-bind:afterText="object.param5" disabled/><mu-divider/>
            <mu-list-item title="类型" v-bind:afterText="object.param7" disabled/><mu-divider/>
            <mu-list-item title="说明" v-bind:describeText="object.param9" disabled/>
        </mu-list>
        <mu-divider/>
        <mu-sub-header>审计图片</mu-sub-header>
        <see-box>
            <see-item v-for="(item,index) in imgList" :key="index" :url="basePath+item.param6.replace('/upload/','/upload/original/')" :thumb="basePath+item.param6.replace('/upload/','/upload/thumb/')" :width="parseInt(item.param11.split('x')[0])" :height="parseInt(item.param11.split('x')[1])" :caption="item.param8"></see-item>
        </see-box>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                object: {},
                imgList: [],
                basePath: this.$config.basePath,
                x_code: this.$route.params.x_code
            }
        },
        created: function(){
            var _this = this
            var url = "/project/getObject/project_audit/"+_this.x_code;
            this.$http.get(url

            ).then(function (response) {
                var result = response.data
                if(result.param0==0){
                    var _data1 = JSON.parse(result.param1)
                    var _data2 = JSON.parse(result.param2)
                    _this.object = _data1
                    _this.imgList = _data2
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

