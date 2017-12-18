<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="曝光台" slot="left" disabled/>
        </mu-appbar>
        <div class="divider-block"></div>
        <mu-list>
            <mu-list-item :describeLine="100" v-for="item in itemList" :to="{ name: 'build_check_expose_detail', params: { x_code: item.param3 }}">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label">所在工程：</span>{{item.param5}}</mu-col>
                        <mu-col width="100"><span class="item_label">检查日期：</span>{{item.param7}}</mu-col>
                        <mu-col width="100"><span class="item_label">巡检人：</span>{{item.param10}}</mu-col>
                        <mu-col width="100"><span class="item_label">检查内容：</span>{{ item.param8.replace(/<[^>]+>/g,'').substr(0,32) + (item.param8.length>32?'...':'')}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                itemList: []
            }
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
            getReady () {
                let _this = this;
                let param1 = 'GetProjectCheckList';
                let param2 = 'ByProjectAndResult';
                let param3 = null;
                let param4 = null;
                let param5 = _this.cacheProjectCode;
                let param6 = '3';////检查结果：1-通过；2-口头警告；3-曝光台
                let saveData = {param1: param1, param2: param2, param3: param3, param4: param4, param5: param5, param6: param6};
                let url = "/project/getObjects";
                _this.$http.post(url,saveData,{

                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        _this.itemList = JSON.parse(result.param1)
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
    .item_label{
        display: inline-block;
        width: 72px;
        line-height: 2;
    }
</style>

