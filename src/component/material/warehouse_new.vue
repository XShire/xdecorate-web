<template>
    <div class="home-main-grid" id="home-main-grid">

        <mu-appbar>
            <mu-icon-button icon="menu" slot="left" @click="toggle"/>
            <mu-icon-button icon="done" slot="right" @click="changeStep (2)" v-if="activeStep==1"/>
            <mu-icon-button icon="done" slot="right" @click="finish" v-if="activeStep>=2"/>
        </mu-appbar>
        <div class="divider-block"></div>

        <div v-if="activeStep===0">
            <mu-list>
                <mu-list-item :title="item.param4" :titleClass="item.param3==supplier.param3?'mu-color-primary':''" v-for="item in supplierList" @click="selectSupplier(item)">
                </mu-list-item>
                <mu-divider/>
            </mu-list>
        </div>

        <div v-if="activeStep===1">
            <mu-list>
                <mu-sub-header>{{supplier.param4}}</mu-sub-header>
                <mu-list-item v-for="(item,index) in supplierGoodsList" :describeLine="10" disabled>
                    <div class="title-manage" slot="title">
                        <span class="title-info">{{item.param4}}</span>
                        <div class="number-info">
                            <mu-icon-button icon="remove_circle_outline" @click="addInGoods(item,index,'g-code-',-1)"/>
                            <input type="number" class="goods-number" :id="'g-code-'+item.param3" min="0" max="999999" v-model="item.param20" @input="addInGoods(item,index,'g-code-',0)">
                            <mu-icon-button icon="add_circle_outline" @click="addInGoods(item,index,'g-code-',1)"/>
                        </div>
                    </div>
                    <div  slot="describe">
                        <div><span>名称：</span><span>{{item.param5}}</span></div>
                        <div><span>价格:</span><span>{{item.param6 + '元/' + item.param7}}</span><mu-flat-button label="修改" @click="editGoodsPrice(item,index)" primary/></div>
                    </div>
                </mu-list-item>
                <mu-divider/>
            </mu-list>
        </div>

        <div v-if="activeStep>=2" class="active-step-2">
            <mu-text-field label="入库类型" value="新料采购" disabled fullWidth/>
            <mu-text-field label="供应商" v-model="supplier.param4" disabled fullWidth/>
            <mu-text-field label="操作员" :value="this.$store.state.loginData.realName" disabled fullWidth/>
            <mu-text-field label="总金额（元）" v-model="amount" disabled fullWidth/>

            <mu-select-field v-model="inWarehouseData.userCode" label="经办人" fullWidth>
                <mu-menu-item v-for="item,index in userList" :value="item.param3" :title="item.param5" />
            </mu-select-field>
            <mu-text-field type="number" label="实付金额" v-model="inWarehouseData.realAmount" fullWidth/>
            <mu-select-field v-model="inWarehouseData.payType" label="支付方式" fullWidth>
                <mu-menu-item value="1" title="签单" />
                <mu-menu-item value="2" title="现金支付" />
            </mu-select-field>
            <mu-date-picker label="入库时间" fullWidth v-model="inWarehouseData.in_time"/>
            <mu-text-field label="入库说明" hintText="小于100个字符" multiLine :rows="3" :rowsMax="6" :maxLength="100" @blur="introOverflow" v-model="inWarehouseData.intro"/>
        </div>


        <mu-drawer width="100%" :open="open" :docked="docked" @close="toggle()">
            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="toggle()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <mu-stepper :activeStep="activeStep" orientation="vertical" :linear="false" class="stepper-box">
                <mu-step>
                    <mu-step-button @click="changeStep(0)">
                        选择供应商
                    </mu-step-button>
                    <mu-step-content v-if="activeStep==0">
                        <p>
                            每张入库单只能有一个供应商
                        </p>
                        <p>
                            当前选择的供应商：<span class="mu-color-primary">{{supplier.param4}}</span>
                        </p>
                        <mu-raised-button label="开始" class="demo-step-button" @click="toggle" primary/>
                    </mu-step-content>
                </mu-step>
                <mu-step>
                    <mu-step-button @click="changeStep(1)">
                        选择入库材料
                    </mu-step-button>
                    <mu-step-content v-if="activeStep==1">
                        <p>
                            在材料库中选择要入库的材料
                        </p>
                        <mu-list-item class="show-selected-goods" v-for="(item,index) in inGoodsList" :describeLine="10" disabled>
                            <div class="title-manage" slot="title">
                                <span class="title-info">{{supplierGoodsList[item.gl_index].param4}}</span>
                                <div class="number-info">
                                    <mu-icon-button icon="remove_circle_outline" @click="addInGoods(supplierGoodsList[item.gl_index],item.gl_index,'s-code-',-1)"/>
                                    <input type="number" class="goods-number" :id="'s-code-'+item.goods_code" min="0" max="999999" v-model="item.number" @input="addInGoods(supplierGoodsList[item.gl_index],item.gl_index,'s-code-',0)">
                                    <mu-icon-button icon="add_circle_outline" @click="addInGoods(supplierGoodsList[item.gl_index],item.gl_index,'s-code-',1)"/>
                                </div>
                            </div>
                            <div  slot="describe">
                                <div><span>名称：</span><span>{{supplierGoodsList[item.gl_index].param5}}</span></div>
                                <div><span>价格：</span><span>{{item.price + '元/' + supplierGoodsList[item.gl_index].param7}}</span><mu-flat-button label="修改" @click="editGoodsPrice(supplierGoodsList[item.gl_index],item.gl_index)" primary/></div>
                                <div><span>总计：</span><span>{{item.price * item.number + '元'}}</span></div>
                            </div>
                        </mu-list-item>
                    </mu-step-content>
                </mu-step>
                <mu-step>
                    <mu-step-button @click="changeStep(2)">
                        填写入库信息
                    </mu-step-button>
                    <mu-step-content v-if="activeStep==2">
                        <p>
                            添加入库单金额、支付方式、经办人、备注等基本信息
                        </p>
                        <mu-list>
                            <mu-list-item title="入库类型" afterText="新料采购" disabled/>
                            <mu-list-item title="供应商" :afterText="supplier.param4" disabled/>
                            <mu-list-item title="操作员" :afterText="this.$store.state.loginData.realName" disabled/>
                            <mu-list-item title="总金额" :afterText="amount.toString()" disabled/>
                            <mu-list-item title="经办人" :afterText="getUserRealName" disabled/>
                            <mu-list-item title="实付金额" :afterText="inWarehouseData.realAmount" disabled/>
                            <mu-list-item title="支付方式" :afterText="getPayType" disabled/>
                            <mu-list-item title="入库时间" :afterText="inWarehouseData.in_time" disabled/>
                            <mu-list-item title="入库说明" :describeText="inWarehouseData.intro" :describeLine="10" disabled/>
                        </mu-list>
                        <mu-raised-button label="完成" @click="changeStep(3)" primary/>
                    </mu-step-content>
                </mu-step>
            </mu-stepper>

            <div v-if="finished" class="finished-box">
                <p class="mu-color-primary">请依次查看上面三个步骤，检查入库信息是否正确</p>

                <mu-raised-button label="重置" @click="reset"/>
                <mu-raised-button label="提交" @click="saveInInWarehouse" secondary/>
            </div>

        </mu-drawer>

        <mu-dialog :open="editPriceDialog" @close="closePriceDialog">
            <div>
                <span>{{editPrice.oldInfo}}</span>
                <mu-text-field type="number" label="请输入新的价格" v-model="editPrice.newPrice"/>
                <span>注：只修改本次价格</span>
            </div>
            <mu-flat-button slot="actions" primary @click="closePriceDialog" label="取消"/>
            <mu-flat-button slot="actions" primary @click="doneEditPrice" label="确定"/>
        </mu-dialog>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                open: true,
                docked: false,
                editPriceDialog: false,
                editPrice: {
                    oldInfo: '',
                    newPrice: 0,
                    index: 0
                },
                basePath: this.$config.basePath,
                activeStep: 0,
                supplierList: [],//供应商
                supplierGoodsList: [],//供应商所有材料
                supplier: Object,//当前选中的供应商
                inGoodsList:[],//当前选择的入库材料
                amount: 0,//当前选择的入库材料的总金额
                userList: [],
                inWarehouseData: {
                    in_type: '1', //入库类型
                    in_time: '',  //入库时间
                    userCode: this.$store.state.loginData.userCode, //选择的经办人code
                    payType: '1',   //支付方式
                    realAmount: '', //实付金额
                    intro: ''
                }
            }
        },
        computed: {
            finished () {
                return this.activeStep > 2
            },
            getUserRealName () {
                let _this = this
                let user_item = _this.userList.find((value) => {
                    return value.param3 === _this.inWarehouseData.userCode
                })
                return user_item?user_item.param5:_this.$store.state.loginData.realName
            },
            getPayType () {
                let payTypeCode = this.inWarehouseData.payType
                if(payTypeCode==1){
                    return '签单'
                }else{
                    return '现金支付'
                }
            }
        },
        methods: {
            toggle () {
                this.open = !this.open
            },
            changeStep (index) {
                this.activeStep = index

                //统计入库单总价
                if(index==2){
                    let _amount = 0
                    for(let inGoods of this.inGoodsList){
                        _amount += (this.supplierGoodsList[inGoods.gl_index].param6) * inGoods.number
                    }
                    this.amount = _amount
                }
            },
            reset () {
                let _this = this
                _this.activeStep = 0
                _this.supplier = Object
                _this.resetData()
            },
            resetData () {
                let _this = this
                _this.inGoodsList = []
                _this.amount = 0
                _this.inWarehouseData = {
                    in_type: '1', //入库类型
                    in_time: '',  //入库时间
                    userCode: _this.$store.state.loginData.userCode, //选择的经办人code
                    payType: '1',   //支付方式
                    realAmount: '', //实付金额
                    intro: ''
                }
            },
            finish () {
                this.activeStep++
                this.open = !this.open
            },
            closePriceDialog () {
                this.editPriceDialog = false
            },
            introOverflow () {
                let _this = this
                _this.inWarehouseData.intro =  _this.inWarehouseData.intro.substring(0,100)
            },
            selectSupplier (item) {
                let _this = this

                if(item.param3 === _this.supplier.param3){
                    _this.changeStep (1)//跳转到第二个步骤
                    return
                }

                _this.resetData() //重置数据

                _this.supplier = item //设置当前选中的供应商

                _this.changeStep (1)//跳转到第二个步骤

                //加载材料库数据
                let param1 = "GetGoodsList";
                let param2 = "BySupplier";
                let param3 = null;
                let param4 = null;
                let param5 = item.param3;
                let saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
                let url = "/project/getObjects";
                this.$http.post(url,saveData)
                    .then(function (response) {
                        var result = response.data;
                        if(result.param0==0){
                            _this.supplierGoodsList = JSON.parse(result.param1);
                        }else{
                            _this.$store.commit('showSnackBar',result.param1)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            },
            addInGoods(item,index,eleId,num){
                let _this = this

                //修改输入框数量
                let old_num = document.getElementById(eleId+item.param3).value;
                let new_num = Number(old_num) + num;
                if(new_num<0) new_num=0;

                //修改已选择的数据
                let in_goods_index = _this.inGoodsList.findIndex((value) => {
                    return value.goods_code == item.param3
                })

                if(new_num==0 && in_goods_index!==-1){
                    _this.inGoodsList.splice(in_goods_index,1);
                }else if(new_num==0 && in_goods_index==-1){
                    //不执行操作
                }else if(in_goods_index==-1){
                    let _inGoods = {}
                    _inGoods.goods_code = item.param3
                    _inGoods.gl_index = index
                    _inGoods.number = new_num
                    _inGoods.price = item.param6
                    _this.inGoodsList.push(_inGoods)
                }else{
                    _this.inGoodsList[in_goods_index].number = new_num
                }

                //supplierGoodsList使用 param20 保存数量临时字段
                _this.supplierGoodsList[index].param20 = new_num

            },
            editGoodsPrice(item,index){
                this.editPriceDialog = true

                this.editPrice.oldInfo = '当前价格：'+item.param6 + '元/' + item.param7
                this.editPrice.newPrice = isNaN(Number(item.param6))?0:Number(item.param6)
                this.editPrice.index = index
            },
            doneEditPrice(){
                let _this = this
                _this.supplierGoodsList[_this.editPrice.index].param6 = _this.editPrice.newPrice
                for(let inGoods of _this.inGoodsList){
                    if(inGoods.goods_code == _this.supplierGoodsList[_this.editPrice.index].param3){
                        inGoods.price = _this.editPrice.newPrice
                        break
                    }
                }
                this.editPriceDialog = false
            },
            saveInInWarehouse () {
                let _this = this
                let goodsList = new Array();
                for(let inGoods of _this.inGoodsList){
                    let goodsItem = {
                        param1: 'inGoods',
                        param2: inGoods.goods_code,
                        param3: inGoods.price,
                        param4: inGoods.number,
                        param5: ''
                    }
                    goodsList.push(goodsItem);
                }

                let param0 = '';
                let param1 = "AddInWarehouse";
                let param2 = _this.inWarehouseData.in_type;
                let param3 = _this.inWarehouseData.in_time;
                let param4 = _this.inWarehouseData.userCode;
                let param5 = _this.amount;
                let param6 = _this.inWarehouseData.realAmount;
                let param7 = _this.inWarehouseData.payType;
                let param8 = _this.supplier.param3;
                let param9 = _this.inWarehouseData.intro;
                let param10 = JSON.stringify(goodsList);
                if(goodsList.length==0){
                    _this.$store.commit('showSnackBar','入库材料不能为空')
                }else if(param2==''){
                    _this.$store.commit('showSnackBar','入库类型不能为空')
                }else if(param3==''){
                    _this.$store.commit('showSnackBar','入库时间不能为空')
                }else if(param6=='' || parseInt(param6)==0){
                    _this.$store.commit('showSnackBar','实收金额不能为空')
                }else if(param7==''){
                    _this.$store.commit('showSnackBar','支付方式不能为空')
                }else{
                    let saveData = {"param0":param0,"param1":param1,"param2":param2,"param3":param3,"param4":param4,"param5":param5,"param6":param6,"param7":param7,"param8":param8,"param9":param9,"param10":param10};
                    let url = "/project/add";
                    this.$http.post(url,saveData)
                        .then(function (response) {
                            var result = response.data;
                            _this.$store.commit('showSnackBar',result.param1)
                            if(result.param0==0){//保存成功后重置页面
                                _this.reset()
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },
        created: function () {
            let _this = this
            let param1 = "GetSupplierList";
            let param2 = "all";
            let param3 = null;
            let param4 = null;
            let saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4};
            let url = "/project/getObjects";
            this.$http.post(url,saveData)
                .then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.supplierList = JSON.parse(result.param1)
                    }else{
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            param1 = "DepartmentUser";
            param2 = "byOrganization";
            param3 = null;
            param4 = null;
            let param5 = _this.$config.org_code;
            saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5};
            url = "/company/getObjects";
            this.$http.post(url,saveData)
                .then(function (response) {
                    var result = response.data;
                    if(result.param0==0){
                        _this.userList = JSON.parse(result.param1)

                        let userIndex = _this.userList.findIndex((value) => {
                            return value.param3 == _this.inWarehouseData.userCode
                        })
                        if(userIndex==-1){
                            if(_this.userList!=null && _this.userList.length>0){
                                _this.inWarehouseData.userCode = _this.userList[0].param3
                            }else{
                                _this.inWarehouseData.userCode = ''
                            }
                        }
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
    .mu-appbar{
        height: 48px;
        position: fixed;
        top: 0;
        left: 0;
    }
    .divider-block{
        height: 48px;
    }
    .demo-step-button {
        margin-top: 12px;
        margin-right: 12px;
    }

    .title-manage{
        font-size: 0;
    }
    .title-manage .title-info{
        font-size: 16px;
        line-height: 40px;
    }
    .title-manage .number-info{
        display: inline-block;
        float: right;
    }
    .title-manage .mu-icon-button{
        vertical-align:middle;
        width: 40px;
        height: 40px;
        padding: 8px;
    }
    .title-manage .goods-number{
        vertical-align:middle;
        font-size: 14px;
        width: 50px;
        height: 26px;
        line-height: 26px;
        text-align: center;
    }
    .show-selected-goods .mu-item{
        padding: 0;
    }
    .active-step-2{
        padding-left: 4%;
        padding-right: 4%;
    }
    .finished-box{
        padding-left: 7%;
        padding-right: 7%;
    }
    .stepper-box{
        padding-bottom: 20px;
    }
</style>

