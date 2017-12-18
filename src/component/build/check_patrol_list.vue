<template>
    <div class="home-main-grid" id="home-main-grid">
        <mu-appbar>
            <mu-flat-button label="巡检记录" slot="left" disabled/>
            <mu-flat-button label="添加" slot="right" @click="addToggle()"/>
        </mu-appbar>
        <div class="divider-block"></div>
        <mu-list>
            <mu-list-item :describeLine="100" v-for="item in itemList" :to="{ name: 'build_check_patrol_detail', params: { x_code: item.param3 }}">
                <div slot="describe">
                    <mu-row gutter>
                        <mu-col width="100"><span class="item_label">巡检日期：</span>{{item.param7}}</mu-col>
                        <mu-col width="100"><span class="item_label">巡检人：</span>{{item.param10}}</mu-col>
                        <mu-col width="100"><span class="item_label">检查结果：</span>{{item.param11}}</mu-col>
                        <mu-col width="100"><span class="item_label">检查内容：</span>{{ item.param8.replace(/<[^>]+>/g,'').substr(0,32) + (item.param8.length>32?'...':'')}}</mu-col>
                    </mu-row>
                </div>
            </mu-list-item>
        </mu-list>

        <!--添加巡检记录-->
        <mu-drawer width="100%" :open="add_open">
            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="addToggle()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <div class="add-input-box">
                <mu-text-field label="巡检人" v-model="itemData.checkUserName" labelFloat fullWidth disabled/>
                <mu-date-picker label="巡检时间" v-model="itemData.checkTime" autoOk labelFloat fullWidth/>
                <mu-text-field label="检查内容" v-model="itemData.description" multiLine labelFloat fullWidth :rows="3" :rowsMax="6" :maxLength="200"/>

                <mu-radio label="通过" name="result" nativeValue="1" class="result-radio" v-model="itemData.result"/>
                <mu-radio label="警告" name="result" nativeValue="2" class="result-radio" v-model="itemData.result"/>
                <mu-radio label="曝光台" name="result" nativeValue="3" class="result-radio" v-model="itemData.result"/>

                <mu-raised-button label="取消" primary @click="addToggle()" class="save-btn"/>
                <mu-raised-button label="保存" secondary @click="saveItem()" class="save-btn"/>
            </div>

        </mu-drawer>
        <!--添加巡检记录-->

    </div>
</template>

<script>

    export default {
        data() {
            return {
                itemList: [],
                add_open: false, //添加巡检记录模块
                itemData:{
                    x_code: '',//对象code
                    project_code: this.cacheProjectCode,//所属工程（当前选择工程）
                    checkType: '3',//2-质检记录；3-巡检记录
                    checkTime: this.$config.new_date,//检查日期(默认当前日期)
                    description: '',//检查内容（图文）
                    checkUserCode: this.$store.state.loginData.userCode,//检查人
                    checkUserName: this.$store.state.loginData.username,//检查人
                    result: '1'//检查结果：1-通过；2-口头警告；3-曝光台
                }
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
            addToggle () {
                let _this = this
                _this.add_open = !_this.add_open

                _this.itemData.x_code = '';
                _this.itemData.project_code = _this.cacheProjectCode;
                _this.itemData.checkType = '3';
                _this.itemData.checkTime = _this.$config.new_date;
                _this.itemData.description = '';
                _this.itemData.checkUserCode = _this.$store.state.loginData.userCode;
                _this.itemData.checkUserName = _this.$store.state.loginData.username;
                _this.itemData.result = '1';

                event.stopPropagation();
            },
            saveItem () {
                let _this = this;
                let url = "/project/add";
                this.$http.post(url,{
                    param0: _this.itemData.x_code,
                    param1: 'AddProjectCheck',
                    param2: _this.itemData.project_code,
                    param3: _this.itemData.checkType,
                    param4: _this.itemData.checkUserCode,
                    param5: _this.itemData.checkTime,
                    param6: _this.itemData.description,
                    param7: _this.itemData.result
                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        //添加后跳转到详情页面
                        _this.$router.push({ name: 'build_check_patrol_detail', params: { x_code: result.param2 }})
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
//                    console.info(error);
                    _this.$store.commit('showSnackBar',error);
                });
            },
            getReady () {
                let _this = this;
                let param1 = 'GetProjectCheckList';
                let param2 = 'ByProjectAndType';
                let param3 = null;
                let param4 = null;
                let param5 = _this.cacheProjectCode;
                let param6 = '3';//检查类型：巡检
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
    .goods-info-box .mu-dialog-body{
        padding:10px 2% 0;
    }
    .add-input-box{
        padding:10px 3% 30px;
        width: 94%;
    }
    .result-radio{
        width: 32%;
    }
    .save-btn{
        margin-top: 20px;
    }
</style>

