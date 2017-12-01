<template>
    <div class="home-main-grid" id="home-main-grid">

        <!--头部-->
        <mu-appbar>
            <mu-flat-button label="添加" slot="left" @click="addToggle()"/>
            <mu-flat-button label="统计" slot="right" @click="showTotal()"/>
        </mu-appbar>
        <div class="divider-block"></div>
        <!--头部-->

        <!--投标列表-->
        <mu-list>
            <mu-list-item v-bind:title="item.param6" :afterText="getResult(item.param12)"
                          v-bind:to="{ name: 'budget_tender_detail', params: { x_code: item.param3 }}" v-for="item in itemList">
                <mu-icon value="navigate_next" slot="right"/>
            </mu-list-item>
        </mu-list>
        <!--投标列表-->

        <!--添加投标-->
        <mu-drawer width="100%" :open="add_open">
            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="addToggle()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <div class="add-input-box">
                <mu-text-field label="招标单位" hintText="必填" fullWidth v-model="add_item.company"/>
                <mu-text-field label="概况" multiLine :rows="2" :rowsMax="3" :maxLength="100" fullWidth v-model="add_item.intro"/>
                <mu-text-field label="标底（元）" type="number" fullWidth v-model="add_item.floor"/>
                <mu-text-field label="信息来源" fullWidth v-model="add_item.source"/>
                <mu-date-picker label="投标日期" autoOk fullWidth v-model="add_item.tenderTime"/>
                <mu-text-field label="报价（元）" type="number" fullWidth v-model="add_item.offer"/>
                <mu-text-field label="得分" type="number" fullWidth v-model="add_item.score"/>
                <mu-text-field label="投标分析" multiLine :rows="3" :rowsMax="6" :maxLength="200" fullWidth v-model="add_item.description"/>
                <mu-text-field label="结果分析" multiLine :rows="3" :rowsMax="6" :maxLength="200" fullWidth v-model="add_item.resultDesc"/>

                <mu-radio label="待确认" name="result" nativeValue="1" class="result-radio" v-model="add_item.result"/>
                <mu-radio label="中标" name="result" nativeValue="2" class="result-radio" v-model="add_item.result"/>
                <mu-radio label="未中标" name="result" nativeValue="3" class="result-radio" v-model="add_item.result"/>

                <mu-raised-button label="保存" secondary @click="saveItem()" class="save-btn"/>
            </div>

        </mu-drawer>
        <!--添加投标-->

        <!--统计信息-->
        <mu-drawer width="100%" right :open="total_open">
            <mu-appbar>
                <mu-icon-button icon="close" slot="right" @click="totalToggle()"/>
            </mu-appbar>
            <div class="divider-block"></div>

            <div id="chart-tender-1" class="chart-tender-1"></div>
        </mu-drawer>
        <!--统计信息-->

    </div>
</template>

<script>

    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        data() {
            return {
                itemList: [], //投标列表
                add_open: false, //添加投标模块
                add_item: {
                    source: '',//信息来源
                    floor: '',//标底
                    company: '',//招标单位
                    intro: '',//概况
                    offer: '',//报价
                    tenderTime: '',//投标日期
                    description: '',//投标分析
                    score: '',//得分
                    result: '1',//投标结果：1-待确认；2-中标；3-未中标
                    resultDesc: '',//结果分析
                    tenderPath: '',//标书保存路径
                    tenderName: '',//标书原名
                },//添加投标的对象
                total_open: false //统计图标模块
            }
        },
        methods: {
            addToggle () {
                this.add_open = !this.add_open
            },
            totalToggle () {
                this.total_open = !this.total_open
            },
            initAddItem(){//初始化添加投标的对象
                this.add_item.source = ''
                this.add_item.floor = ''
                this.add_item.company = ''
                this.add_item.intro = ''
                this.add_item.offer = ''
                this.add_item.tenderTime = ''
                this.add_item.description = ''
                this.add_item.score = ''
                this.add_item.result = '1'
                this.add_item.resultDesc = ''
                this.add_item.tenderPath = ''
                this.add_item.tenderName = ''
            },
            getResult(value){
                var result = '';
                if(value=='1'){
                    result = '待确认';
                }else if(value=='2'){
                    result = '中标';
                }else if(value=='3'){
                    result = '未中标';
                }else{
                    result = '未填写';
                }
                return result;
            },
            saveItem() {
                let _this = this;
                let url = "/project/add";
                let saveData = {
                    param0: '',
                    param1: 'AddTender',
                    param2: _this.add_item.company,
                    param3: _this.add_item.intro,
                    param4: _this.add_item.floor,
                    param5: _this.add_item.source,
                    param6: _this.add_item.tenderTime,
                    param7: _this.add_item.offer,
                    param8: _this.add_item.score,
                    param9: _this.add_item.result,
                    param10: _this.add_item.tenderName,
                    param11: _this.add_item.tenderPath,
                    param12: _this.add_item.description,
                    param13: _this.add_item.resultDesc
                }
                _this.$http.post(url,saveData,{

                }).then(function (response) {
                    let result = response.data;
                    _this.$store.commit('showSnackBar',result.param1)
                    if(result.param0==0){
                        _this.add_open = false
                        _this.initAddItem()
                        _this.getReady()
                    }
                }).catch(function (error) {
                    console.info(error)
                    _this.$store.commit('showSnackBar','添加失败')
                });
            },
            showTotal() {
                this.total_open = true
                this.drawLine()
            },
            drawLine() {
                let _this = this
                // 基于准备好的dom，初始化echarts实例
                let ele = document.getElementById('chart-tender-1')
                let myChart = echarts.init(ele);

                let url = "/project/getTotals";
                _this.$http.post(url,{
                    param1: 'GetTenderTotal',
                    param2: 'ByResult'
                }).then(function (response) {
                    let result = response.data;
                    if(result.param0==0){
                        let data = JSON.parse(result.param1);
                        let chartData = new Array();
                        let legendData = new Array();
                        let subtext = '';
                        let numTotal = 0;
                        for (let i = 0; i < data.length; i++) {
                            let row = data[i];
                            let rowName = row.param1;
                            let rowNum = Number(row.param2);
                            let rowData = {value:rowNum, name:rowName};
                            chartData.push(rowData);
                            legendData.push(rowName);

                            numTotal = numTotal+rowNum;

                            subtext += rowName+'-'+rowNum+'；';
                            if(i==2){
                                subtext += '投标总数-'+numTotal+'';
                            }
                        }

                        // 绘制图表
                        myChart.setOption({
                            title : {
                                text: '按结果统计',
                                subtext: subtext,
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c}次 ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: legendData
                            },
                            series : [
                                {
                                    name: '结果统计',
                                    type: 'pie',
                                    radius : '60%',
                                    center: ['50%', '60%'],
                                    data:chartData,
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        });
                    }else{
                        console.info(result)
                        _this.$store.commit('showSnackBar',result.param1)
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            getReady () {
                let _this = this;
                let param1 = "GetTenderList";
                let param2 = "all";
                let param3 = null;
                let param4 = null;
                let saveData = {"param1": param1, "param2": param2, "param3": param3, "param4": param4};
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
        width: 50px;
        line-height: 2;
    }
    .add-input-box{
        padding:10px 3% 30px;
        width: 100%;
    }
    .result-radio{
        width: 32%;
    }
    .save-btn{
        margin-top: 20px;
    }
    .chart-tender-1{
        width: 100vw;
        height: auto;
        min-height: 100vw;
        padding-left: 3%;
        padding-right: 3%;
        padding-top: 1rem;
    }
</style>

