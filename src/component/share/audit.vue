<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>审计列表</mu-sub-header>
            <router-link v-bind:to="{ name: 'share_detail', params: { project_code: item.param3 }}" v-for="item in auditList">
                <mu-list-item v-bind:title="item.param4">
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
                auditList: []
            }
        },
        created: function () {
            var _this = this;
            var param1 = "GetProjectAuditList";
            var param2 = "ByProject";
            var param3 = null;
            var param4 = null;
            var param5 = this.$store.state.projectSelected.code;

            var saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
            var url = "/project/getObjects";
            this.$http.post(url,saveData,{

                }).then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        var _data = JSON.parse(result.param1);
                        _this.auditList = _data;
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
                });

        }
    }

</script>

<style lang="less">

</style>

