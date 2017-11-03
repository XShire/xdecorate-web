<template>
    <div class="home-main-grid" id="home-main-grid">

        <div class="request_box">

            <mu-text-field label="所在工程" :value="this.$store.state.projectSelected.name" fullWidth disabled/>
            <mu-text-field label="申请人" :value="this.$store.state.loginData.realName" fullWidth disabled/>

            <mu-date-picker label="申请时间" v-model="goodsRequest.time" fullWidth/>
            <mu-text-field label="申请说明" v-model="goodsRequest.intro" hintText="不允许超过100个字符" :errorText="multiLineInputErrorText" @textOverflow="requestIntroOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="100" fullWidth/>

            <div class="request_action">
                <mu-raised-button label="重置" class="request_btn" @click="getReady"/>
                <mu-raised-button label="保存" class="request_btn" @click="saveRequest" secondary/>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                goodsRequest: {
                    time: '',
                    intro: ''
                }, //提料单
                multiLineInputErrorText: ''
            }
        },
        methods: {
            requestIntroOverflow (isOverflow) {
                this.multiLineInputErrorText = isOverflow ? '字数超过限制' : ''
            },
            saveRequest(){
                let _this = this
                let param0 = '';//采购单code
                let param1 = "AddGoodsRequest";
                let param2 = _this.$store.state.projectSelected.code;//project code
                let param3 = _this.goodsRequest.time;//申请时间 yyyy-MM-dd
                let param4 = _this.$store.state.loginData.userCode;//申请人code
                let param5 = _this.goodsRequest.intro;//备注
                let saveData = {
                    "param0": param0,
                    "param1": param1,
                    "param2": param2,
                    "param3": param3,
                    "param4": param4,
                    "param5": param5
                };
                let url = "/project/add";
                this.$http.post(url,saveData)
                    .then(function (response) {
                        var result = response.data;
                        _this.$store.commit('showSnackBar',result.param1)
                        if(result.param0==0){
                            _this.$router.push({ name: 'build_goods_bill_detail', params: { x_code: result.param2 }})
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            },
            getReady(){
                this.goodsRequest.time = this.$config.new_date//申请时间 yyyy-MM-dd
                this.goodsRequest.intro = ''//备注
            }
        },
        created: function () {
            this.getReady()
        }
    }

</script>

<style lang="less">
    .request_box{
        padding: 2rem 4% 0 4%;
    }
    .request_action{
        padding-top: 3rem;
        text-align: center;
    }
    .request_action .request_btn{
        margin-left: 8%;
        margin-right: 8%;
    }
</style>

