<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="预计工期列表" slot="left" disabled/>
            <mu-flat-button label="添加" slot="right" @click="openDialog"/>
        </mu-appbar>
        <div class="divider-block"></div>
        <mu-list>
            <mu-list-item v-bind:title="item.param6" :afterText="getStatusStr(item.param14)" :describeLine="10"
                          v-bind:to="{ name: 'build_limit_detail', params: { x_code: item.param3 }}" v-for="item in itemList">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label">计划开始时间：</span>{{item.param7}}</mu-col>
                        <mu-col width="100"><span class="item_label">计划完成时间：</span>{{item.param8}}</mu-col>
                        <mu-col width="100"><span class="item_label">实际开始时间：</span>{{item.param9}}</mu-col>
                        <mu-col width="100"><span class="item_label">实际完成时间：</span>{{item.param10}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>

        <mu-dialog :open="dialog" @close="closeDialog" dialogClass="goods-info-box" scrollable>
            <div>
                <mu-text-field label="工期名称" v-model="itemData.name" labelFloat fullWidth/>
                <mu-date-picker label="预计开始时间" v-model="itemData.date1" labelFloat fullWidth/>
                <mu-date-picker label="预计开始时间" v-model="itemData.date2" labelFloat fullWidth/>
                <mu-text-field hintText="备注" v-model="itemData.intro" multiLine :rows="3" :rowsMax="6" :maxLength="100"/>
            </div>
            <mu-flat-button primary label="关闭" @click="closeDialog" slot="actions"/>
            <mu-flat-button secondary label="保存" @click="saveObject" slot="actions"/>
        </mu-dialog>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                itemList: [],
                dialog:false,
                itemData:{
                    date1:'',
                    date2:'',
                    name:'',
                    intro:''
                }
            }
        },
        methods: {
            getStatusStr (value) {
                let nowStatus = '';
                if(value=='1'){
                    nowStatus = '未开始';
                }else if(value=='2'){
                    nowStatus = '工作中';
                }else if(value=='3'){
                    nowStatus = '完成';
                }
                return nowStatus;
            },
            openDialog () {
                this.dialog = true
            },
            closeDialog () {
                this.dialog = false
            },
            saveObject () {
                let _this = this;
                let param1 = "AddProjectLimit";
                let param2 = this.$store.state.projectSelected.code;
                let param3 = _this.itemData.name;
                let param4 = _this.itemData.date1;
                let param5 = _this.itemData.date2;
                let param8 = _this.itemData.intro;
                let saveData = {
                    param1: param1,
                    param2: param2,
                    param3: param3,
                    param4: param4,
                    param5: param5,
                    param8: param8
                }
                let url = "/project/add";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        _this.$store.commit('showSnackBar',result.param1)
                        _this.dialog = false
                        _this.getReady()
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            getReady () {
                var _this = this;
                var param1 = "GetProjectLimitList";
                var param2 = "ByProject";
                var param3 = null;
                var param4 = null;
                var param5 = this.$store.state.projectSelected.code;
                var saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
                var url = "/project/getObjects";
                this.$http.post(url,saveData,{

                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        _this.itemList = JSON.parse(result.param1)
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
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
        width: 100px;
        line-height: 2;
    }
    .goods-info-box{
        width: 80%;
        max-width: 80%;
    }
    .goods-info-box .mu-dialog-body{
        padding:10px 2% 0;
    }
</style>

