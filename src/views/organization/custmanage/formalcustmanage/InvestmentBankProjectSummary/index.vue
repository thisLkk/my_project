<template>
    <!-- 客户管理  正式客户管理   投行项目总汇组件 -->
    <div class="yh-InvestmentBankProjectSummary">
        <el-tabs type="border-card" style="height:30px; line-height:30px;">
            <el-tab-pane label="在会/在审项目" style="border:#ebeef5 solid 1px; padding:0 20px; border-radius:4px;">
                <ProjectOne  :stockright="stockrightResultData" :bond="bondResultData" :mergerandreorganization="mergerandreorganizationResultData" :stockrightEcharts="stockrightResultEchartsData" :bondEcharts="bondResultEchartsData" :mergerandreorganizationEcharts="mergerandreorganizationResultEchartsData"></ProjectOne>
            </el-tab-pane>
            <el-tab-pane label="新增立项项目">
                <!--<ProjectTwo v-if="show__" :newprojectstockright="newprojectstockrightResultData" :newprojectbond="newprojectbondResultData" :newprojectnewthreeboard="newprojectnewthreeboardResultData" :newprojectstockrightEcharts="newprojectstockrightResultEchartsData" :newprojectbondEcharts="newprojectbondResultEchartsData" :newprojectnewthreeboardEcharts="newprojectnewthreeboardResultEchartsData"></ProjectTwo>-->
            </el-tab-pane>
            <el-tab-pane label="新增内核项目">
                <!--<ProjectThree v-if="show" :newclasscore="newclasscoreResultData" :newclasscoreEcharts="newclasscoreResultEchartsData"></ProjectThree>-->
            </el-tab-pane>
            <el-tab-pane label="立项情况统计">
                <!--<ProjectFour v-if="show____" :statusstatistics="statusstatisticsResultData" :statusstatisticstotaladd="statusstatisticstotalAddResultData" :statusstatisticstotalaccumulative="statusstatisticstotalAccumulativeResultData"></ProjectFour>-->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { meetAndtrialProjectTableData, meetAndtrialProjectEchartsData, newProjectTableData, newProjectEchartsData, newClassCoreTableData, newClassCoreEchartsData, statusStatistics, statusStatisticsTotal } from '@/api/organization/custmanage/formalcustmanage/InvestmentBankProjectSummary/index.js'
import { ProjectOne, ProjectTwo, ProjectThree, ProjectFour } from '@/views/organization/custmanage/components/index.js'

export default {
    name: "InvestmentBankProjectSummary",
    components: {
        ProjectOne,
        ProjectTwo,
        ProjectThree,
        ProjectFour
    },
    data() {
        return {
            show: true,
            show_: true,
            show__: true,
            show____: true,
            /*------------------------在会/在审项目--------------------------*/
            /*------------------------table数据-----------------------------*/







            /*------------------------新增立项项目---------------------------*/
            /*------------------------table数据-----------------------------*/
            //新增立项项目--股权类
            newprojectstockrightparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": {
                    "prjFinType": "01"
                }
            },
            //新增立项项目--债券类
            newprojectbondparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": {
                    "prjFinType": "02"
                }
            },
            //新增立项项目--新三板类
            newprojectnewthreeboardparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": {
                    "prjFinType": "04"
                }
            },
            /*-------------------------echarts数据---------------------------*/
            //新增立项项目--股权类
            newprojectstockrightparamechartsdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": "01"
            },
            //新增立项项目--债券类
            newprojectbondparamechartsdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": "02"
            },
            //新增立项项目--新三板类
            newprojectnewthreeboardechartsdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": "04"
            },

            /*------------------------结果集(Table)------------------------*/
            //新增立项项目--股权类
            newprojectstockrightResultData: null,
            //新增立项项目--债券类
            newprojectbondResultData: null,
            //新增立项项目--新三板类
            newprojectnewthreeboardResultData: null,
            /*------------------------结果集(Echarts)----------------------------*/
            //新增立项项目--股权类
            newprojectstockrightResultEchartsData: null,
            //新增立项项目--债券类
            newprojectbondResultEchartsData: null,
            //新增立项项目--新三板类
            newprojectnewthreeboardResultEchartsData: null,
            /*------------------------新增内核项目---------------------------*/
            newclasscoreparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                }
            },
            /*------------------------结果集(Table)-------------------------*/
            newclasscoreResultData: null,
            /*------------------------结果集(Echarts)-----------------------*/
            newclasscoreResultEchartsData: null,

            /*-----------------------立项情况统计--------------------------*/
            //立项情况统计
            statusstatisticsparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                }
            },
            //立项情况统计合计(新增)
            statusstatisticstotaladdparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": {
                    "statisticalCaliber": "01"
                }
            },
            //立项情况统计合计(累计)
            statusstatisticstotalaccumulativeparamdata: {
                "sysCode": "",
                "token": "",
                "transitionId": "",
                "pageInfo": {
                    "pageNum": 2,
                    "pageSize": 4,
                    "total": 0,
                    "orderBy": "",
                    "pages": 0
                },
                "param": {
                    "statisticalCaliber": "02"
                }
            },
            /*---------------------------结果集---------------------------*/
            //立项情况统计
            statusstatisticsResultData: null,
            //立项情况统计合计(新增)
            statusstatisticstotalAddResultData: null,
            //立项情况统计合计(累计)
            statusstatisticstotalAccumulativeResultData:null,
        }
    },
    created() {

        // /*-----------------------------------echarts--------------------------------------*/
        //
        //
        // /*-----------------------------------table--------------------------------------*/
        // //新增立项项目--股权类项目
        // this.newProjectStockrightQueryData(this.newprojectstockrightparamdata);
        // //新增立项项目--债券类项目
        // this.newProjectbondQueryData(this.newprojectbondparamdata);
        // //新增立项项目--新三板项目
        // this.newProjectnewThreeBoardQueryData(this.newprojectnewthreeboardparamdata);
        // /*-----------------------------------echarts--------------------------------------*/
        // //新增立项项目--股权类项目
        // this.newProjectStockrightQueryEchartsData(this.newprojectstockrightparamechartsdata);
        // //新增立项项目--债券类项目
        // this.newProjectbondQueryEchartsData(this.newprojectbondparamechartsdata);
        // //新增立项项目--新三板项目
        // this.newProjectnewThreeBoardQueryEchartsData(this.newprojectnewthreeboardechartsdata);
        //
        //
        // /*-----------------------------------table--------------------------------------*/
        // //新增内核项目
        // this.newClassCoreQueryData(this.newclasscoreparamdata);
        // /*-----------------------------------echarts--------------------------------------*/
        // //新增内核项目
        // this.newClassCoreQueryEchartsData(this.newclasscoreparamdata);
        //
        //
        // //立项情况统计
        // this.statusStatisticsQueryData(this.statusstatisticsparamdata);
        // //立项情况统计合计--新增
        // this.statusstatisticstotalAddQueryData(this.statusstatisticstotaladdparamdata);
        // //立项情况统计合计--累计
        // this.statusstatisticstotalAccumulativeQueryData(this.statusstatisticstotalaccumulativeparamdata);
    },
    mounted() {

    },
    methods: {
        /*-------------------------------------在会/在审项目------------------------------------*/
        /*--------------------------------------tables----------------------------------------*/




        /*-------------------------------------新增立项项目------------------------------------*/
        /*--------------------------------------tables----------------------------------------*/
        //新增立项项目--股权类项目
        newProjectStockrightQueryData(querydata) {
            newProjectTableData(querydata)
                .then(response => {
                    this.newprojectstockrightResultData = response.Data;
                    if (this.newprojectstockrightResultData != null && this.newprojectbondResultData != null && this.newprojectnewthreeboardResultData != null && this.newprojectstockrightResultEchartsData != null && this.newprojectbondResultEchartsData != null && this.newprojectnewthreeboardResultEchartsData != null) {
                        this.show__ = true;
                    }

                }).catch(() => {

                })
        },
        //新增立项项目--债券类项目
        newProjectbondQueryData(querydata) {
            newProjectTableData(querydata)
                .then(response => {
                    this.newprojectbondResultData = response.Data;
                    if (this.newprojectstockrightResultData != null && this.newprojectbondResultData != null && this.newprojectnewthreeboardResultData != null && this.newprojectstockrightResultEchartsData != null && this.newprojectbondResultEchartsData != null && this.newprojectnewthreeboardResultEchartsData != null) {
                        this.show__ = true;
                    }

                }).catch(() => {

                })
        },
        //新增立项项目--新三板项目
        newProjectnewThreeBoardQueryData(querydata) {
            newProjectTableData(querydata)
                .then(response => {
                    this.newprojectnewthreeboardResultData = response.Data;
                    if (this.newprojectstockrightResultData != null && this.newprojectbondResultData != null && this.newprojectnewthreeboardResultData != null && this.newprojectstockrightResultEchartsData != null && this.newprojectbondResultEchartsData != null && this.newprojectnewthreeboardResultEchartsData != null) {
                        this.show__ = true;
                    }

                }).catch(() => {

                })
        },
        /*--------------------------------------echarts-----------------------------------------*/
        //新增立项项目--股权类项目
        newProjectStockrightQueryEchartsData(querydata) {
            newProjectEchartsData(querydata)
                .then(response => {
                    this.newprojectstockrightResultEchartsData = response.Data;
                    if (this.newprojectstockrightResultData != null && this.newprojectbondResultData != null && this.newprojectnewthreeboardResultData != null && this.newprojectstockrightResultEchartsData != null && this.newprojectbondResultEchartsData != null && this.newprojectnewthreeboardResultEchartsData != null) {
                        this.show__ = true;
                    }

                }).catch(() => {

                })
        },
        //新增立项项目--债券类项目
        newProjectbondQueryEchartsData(querydata) {
            newProjectEchartsData(querydata)
                .then(response => {
                    this.newprojectbondResultEchartsData = response.Data;
                    if (this.newprojectstockrightResultData != null && this.newprojectbondResultData != null && this.newprojectnewthreeboardResultData != null && this.newprojectstockrightResultEchartsData != null && this.newprojectbondResultEchartsData != null && this.newprojectnewthreeboardResultEchartsData != null) {
                        this.show__ = true;
                    }

                }).catch(() => {

                })
        },
        //新增立项项目--新三板项目
        newProjectnewThreeBoardQueryEchartsData(querydata) {
            newProjectEchartsData(querydata)
                .then(response => {
                    this.newprojectnewthreeboardResultEchartsData = response.Data;
                    if (this.newprojectstockrightResultData != null && this.newprojectbondResultData != null && this.newprojectnewthreeboardResultData != null && this.newprojectstockrightResultEchartsData != null && this.newprojectbondResultEchartsData != null && this.newprojectnewthreeboardResultEchartsData != null) {
                        this.show__ = true;
                    }

                }).catch(() => {

                })
        },
        /*-------------------------------------新增内核项目------------------------------------*/
        /*--------------------------------------tables----------------------------------------*/
        //新增内核项目
        newClassCoreQueryData(querydata) {
            newClassCoreTableData(querydata)
                .then(response => {
                    this.newclasscoreResultData = response.Data;
                    if (this.newclasscoreResultData != null && this.newclasscoreResultEchartsData != null) {
                        this.show = true;
                    }

                }).catch(() => {

                })
        },
        /*--------------------------------------echarts-----------------------------------------*/
        //新增内核项目
        newClassCoreQueryEchartsData(querydata) {
            newClassCoreEchartsData(querydata)
                .then(response => {
                    this.newclasscoreResultEchartsData = response.Data;
                    if (this.newclasscoreResultData != null && this.newclasscoreResultEchartsData != null) {
                        this.show = true;
                    }

                }).catch(() => {

                })
        },
        /*--------------------------------------立项情况统计-------------------------------------*/
        //立项情况统计
        statusStatisticsQueryData(querydata) {
            statusStatistics(querydata)
                .then(response => {
                    this.statusstatisticsResultData = response.Data;
                    if (this.statusstatisticsResultData != null && this.statusstatisticstotalAddResultData !=null && this.statusstatisticstotalAccumulativeResultData !=null) {
                        this.show____ = true;
                    }

                }).catch(() => {

                })
        },
        //立项情况统计合计(新增)
        statusstatisticstotalAddQueryData(querydata){
            statusStatisticsTotal(querydata)
                .then(response => {
                    this.statusstatisticstotalAddResultData = response.Data;

                    //console.log(JSON.stringify(this.statusstatisticstotalAddResultData));
                    if (this.statusstatisticsResultData != null && this.statusstatisticstotalAddResultData !=null && this.statusstatisticstotalAccumulativeResultData !=null) {
                        this.show____ = true;
                    }

                }).catch(() => {

                })
        },
        //立项情况统计合计(累计)
        statusstatisticstotalAccumulativeQueryData(querydata){
            statusStatisticsTotal(querydata)
                .then(response => {
                    this.statusstatisticstotalAccumulativeResultData = response.Data;

                    //console.log(JSON.stringify(this.statusstatisticstotalAddResultData));
                    if (this.statusstatisticsResultData != null && this.statusstatisticstotalAddResultData !=null && this.statusstatisticstotalAccumulativeResultData !=null) {
                        this.show____ = true;
                    }

                }).catch(() => {

                })
        }

    }
}
</script>

<style scoped>
.yh-InvestmentBankProjectSummary {
  padding:0 20px;
}
</style>
