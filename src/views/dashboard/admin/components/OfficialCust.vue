<template>
    <!--<el-tabs v-model="indexType">-->
        <!--<el-tab-pane label="● 客户指标" name="cust">-->

            <div class="indextableshow" style="width:100%">
                <el-table
                :data="custData"
                stripe
                style="width: 100%; height:290px; margin-top:10px;" size="mini" >
                <el-table-column
                label="客户指标"
                 align="center"
                  :formatter="custtype"
                 >
                </el-table-column>
                <el-table-column
                prop="PrsntQty"
                label="指标数值"
                 align="center">
                </el-table-column>
                <!-- <el-table-column
                prop="PrsntQty"
                label="今日"
                width="80%" align="center">
                </el-table-column>  -->
                <!-- <el-table-column
                prop="YestQty"
                label="昨日"
                align="left"
                width="108%"
                >
                    <template slot-scope="scope">
                        <img v-if="scope.row.YestQty<0" src="~@/assets/selficon/down-green.png"/>
                        <img v-if="scope.row.YestQty>0" src="~@/assets/selficon/up-red.png"/>
                        <span style="margin-left: 10px">{{ scope.row.YestQty }}</span>&nbsp;&nbsp;
                    </template>
                </el-table-column>
                <el-table-column
                prop="DailyLink"
                label="目标环比变化"
                 align="center">
                </el-table-column>
                <el-table-column
                prop="CurrYrAvgVal"
                label="本年日均值"
                align="center">
                </el-table-column> -->
                <!-- <el-table-column
                prop="CurrYrAvgValRate"
                label="当日较本年日均变化"
                align="center"
                width="104%"
                vertical-align: middle>

                    <template slot-scope="scope">
                        <img v-if="scope.row.CurrYrAvgValRate<0" src="~@/assets/selficon/down-green.png"/>
                        <img v-if="scope.row.CurrYrAvgValRate>0" src="~@/assets/selficon/up-red.png"/>
                        <span >{{ scope.row.CurrYrAvgValRate }}</span>&nbsp;&nbsp;
                    </template>
                </el-table-column> -->

            </el-table>
            </div>

        <!--</el-tab-pane>-->
        <!-- <el-tab-pane label="● 经营指标" name="manage">

            <div class="indextableshow">
                <el-table
                :data="indexData"
                stripe
                style="width: 98%;margin-left:10px;" size="mini" >
                <el-table-column
                prop="IndexType"
                label="经营指标"
                width="90%" align="center">
                </el-table-column>
                <el-table-column
                prop="PrsntQty"
                label="今日"
                width="80%" align="center">
                </el-table-column>
                <el-table-column
                prop="YestQty"
                label="昨日" align="center">
                </el-table-column>
                <el-table-column
                prop="CurrYrAvgVal"
                label="本年累计日均" align="center">
                </el-table-column>
                <el-table-column
                prop="LastYearAvgVal"
                label="上年累计日均"
                 align="left"
                width="106%"
                 >

                    <template slot-scope="scope">
                        <img v-if="scope.row.LastYearAvgVal<0" src="~@/assets/selficon/down-green.png"/>
                        <img v-if="scope.row.LastYearAvgVal>0" src="~@/assets/selficon/up-red.png"/>
                        <span >{{ scope.row.LastYearAvgVal }}</span>&nbsp;&nbsp;
                    </template>
                </el-table-column>
                <el-table-column
                prop="YrAvgValRate"
                label="环比上年" align="center">
                </el-table-column>

            </el-table>
            </div>

        </el-tab-pane> -->
    <!--</el-tabs>-->

</template>
<script>
import { getsorgbrkdeplist } from "@/api/organization/dashboard/index.js";
import { dictItems,dictFilter } from '@/filters';
import DICTYPE from '@/utils/dictTypes.js';
export default {
data() {
    return {
        indexType:"cust",
        custData :[],//客户指标
        indexData:[],//经营指标

    }},

  created(){
      // if( Number(this.$store.getters.orgid) > 8000){//判断当前登录人是否是首页领导
        //初始化客户指标
        this.initCustData(["00010000","00010001","00010003","00010004","00240000","00460000","00530000"]).then(result => {
          this.custData  = result;
        });
        // //初始化经营指标
        // this.initCustData(['00250000','00250001','00250002','00250003','00260000','00270000','00270001','00270002','00270003']).then(result => {
        //         this.indexData  = result;
        // });

      // }
    },
    methods:{

    custtype(row, column){

        let nameVoS = row.IndexType;
        // console.log(nameVoS)
        return dictFilter(DICTYPE.CTCCD0200,nameVoS);
    },

        //初始化指标
        initCustData(idNos){
            let queryData = {
                "param":{
                "indiNos":idNos
                }
            }
                var p =  new Promise(function(resolve,reject) {
                getsorgbrkdeplist(queryData)
                    .then(response => {

                        resolve(response.Data);

                    })
                    .catch(() => {
                        this.$message.error("访问出错");
                    });
                })
                return p;

        }
    }
}
</script>

<style>

</style>

