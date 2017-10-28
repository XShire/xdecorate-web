<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>工程列表</mu-sub-header>
            <router-link v-bind:to="{ name: 'share_contract_detail', params: { x_code: item.param3 }}" v-for="item in projectList">
                <mu-list-item v-bind:title="item.param7">
                    <mu-icon value="navigate_next" slot="right"/>
                </mu-list-item>
            </router-link>
        </mu-list>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                projectList: []
            }
        },
        created: function () {
            var _this = this;
            var param1 = "GetProjectList";
            var param2 = "all";
            var param3 = null;
            var param4 = null;
            var saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4};
            var url = "/project/getObjects";
            this.$http.post(url,saveData

            ).then(function (response) {
                var result = response.data;
                if(result.param0==0){
                    var _data = JSON.parse(result.param1);
                    _this.projectList = _data;
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

</style>

