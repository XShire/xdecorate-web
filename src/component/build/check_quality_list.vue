<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="质检记录" slot="left" disabled/>
            <mu-flat-button label="添加" slot="right" @click=""/>
        </mu-appbar>
        <div class="divider-block"></div>
        <mu-list>
            <mu-list-item :describeLine="10" v-for="item in itemList">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label">质检日期：</span>{{item.param7}}</mu-col>
                        <mu-col width="100"><span class="item_label">质检人：</span>{{item.param10}}</mu-col>
                        <mu-col width="100"><span class="item_label">检查结果：</span>{{item.param11}}</mu-col>
                        <mu-col width="100"><span class="item_label">检查内容：</span>{{ item.param8.replace(/<[^>]+>/g,'').substr(0,50)}}</mu-col>
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
                let _this = this;
                let param1 = 'GetProjectCheckList';
                let param2 = 'ByProjectAndType';
                let param3 = null;
                let param4 = null;
                let param5 = this.$store.state.projectSelected.code;
                let param6 = '2';//检查类型：质检
                let saveData = {param1: param1, param2: param2, param3: param3, param4: param4, param5: param5, param6: param6};
                let url = "/project/getObjects";
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
        width: 80px;
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

