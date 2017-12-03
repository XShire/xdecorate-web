<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>选择工程</mu-sub-header>
            <router-link v-bind:to="{ name: 'budget_contract_detail', params: { x_code: item.param3 }}" v-for="item in projectList">
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
        methods: {
            getReady(){
                let _this = this;
                let param1 = "GetProjectList";
                let param2 = "all";
                let param3 = null;
                let param4 = null;
                let saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4};
                let url = "/project/getObjects";
                _this.$http.post(url,saveData

                ).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        let _data = JSON.parse(result.param1);
                        _this.projectList = _data;
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

</style>

