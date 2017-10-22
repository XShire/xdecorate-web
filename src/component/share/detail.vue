<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-sub-header>合同照片</mu-sub-header>
        <see-box>
            <see-item v-for="(item,index) in list" :key="index" :url="basePath+item.param6.replace('/upload/','/upload/original/')" :thumb="basePath+item.param6.replace('/upload/','/upload/thumb/')" :width="parseInt(item.param12.split('x')[0])" :height="parseInt(item.param12.split('x')[1])" :caption="item.param5"></see-item>
        </see-box>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                list: [],
                basePath: this.$config.basePath
            }
        },
        created: function(){
            console.log('project_code: ' + this.$route.params.project_code);
            var _this = this;
            var param1 = "GetProjectContractList";
            var param2 = "ByProject";
            var param3 = null;
            var param4 = null;
            var param5 = this.$route.params.project_code;
            var saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
            var url = "/project/getObjects";
            this.$http.post(url,saveData

            ).then(function (response) {
                var result = response.data;
                console.info(result)
                if(result.param0==0){
                    var _data = JSON.parse(result.param1);
                    _this.list = _data;
                }else{
                    alert(result.param1);
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

