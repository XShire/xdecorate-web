<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-list>
            <mu-sub-header>工程列表</mu-sub-header>
            <router-link to="share_detail">
                <mu-list-item title="合同管理">
                    <mu-icon value="navigate_next" slot="right"/>
                </mu-list-item>
            </router-link>
        </mu-list>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created: function () {
            var param1 = "GetProjectList";
            var param2 = "all";
            var param3 = null;
            var param4 = null;
            var saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4};
            var url = "http://localhost:8081/xdecorate/project/getObjects";
            this.$http.post(url,saveData).then(function (response) {
                console.log(response);

            }).catch(function (error) {
                console.log(error);
            });

            var getUrl = "http://api.map.baidu.com/telematics/v3/weather?location=嘉兴&output=json&ak=5slgyqGDENN7Sy7pw29IUvrZ";

        }
    }

</script>

<style lang="less">

</style>

