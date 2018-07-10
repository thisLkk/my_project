<!-- 当前持仓-普通账户信息 -->
<template>
<div class="holdstockinfogeneraccount">
  <!--<el-form  :model="queryCondition" ref="queryCondition"  label-width="80px">-->
    <!--<el-row>-->
      <!--<el-col :span="24">-->
        <!--<div class="yh-headerdiv">-->
              <!--<span class="yh-headerfl">-->
                <!--<span class="yh-titlelf"></span>-->
                <!--<span class="yh-font">查询条件</span>-->
              <!--</span>-->
          <!--<span class="yh-headerfr">-->
                <!--<div id="yh-advanced" >-->

                <!--</div>-->
              <!--</span>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->

    <!--<div class="sd-stockinfo-main">-->
      <!--<el-row>-->
        <!--<el-col :span="8">-->
          <!--<el-form-item label="业务类型:" prop="grpName" label-width="120">-->
            <!--<el-select v-model="queryCondition.SysCode" placeholder="请选择" size="mini">-->
              <!--<el-option v-for="item in busType" :key="item.value" :label="item.label" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="10">-->
          <!--<el-button  type="primary" size="mini"    @click="doQuery()" >查询</el-button>-->
          <!--<el-button size="mini"   @click="resetParm('form_data')">重置</el-button>-->
        <!--</el-col>-->

      <!--</el-row>-->
    <!--</div>-->
  <!--</el-form>-->
  <div v-if="Number(this.$store.getters.orgid) < '8000' || Number(this.$store.getters.orgid) == '8140' || Number(this.$store.getters.orgid) == '8000'">
    <div class="yh-queryresult-top">
      <div class="yh-fl">
        <span class="yh-queryresult-top-content">持仓明细</span>
      </div>
    </div>

    <div class="yh-queryresult-middle">
      <el-table  :data="list" stripe size="mini"  width="800"  max-height=800 >
        <el-table-column  label="业务日期" prop="BizDate" show-overflow-tooltip >
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.BizDate }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.BizDate }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column  label="资金账户" prop="AssetAcct" show-overflow-tooltip>
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.AssetAcct }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.AssetAcct }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>
        <!--<el-table-column   label="业务类型" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.grpIntro }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.grpIntro }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column  label="证劵代码" prop="StkCode">
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.StkCode }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.StkCode }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column  label="股票名称" prop="SecAbbr"   show-overflow-tooltip >
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.SecAbbr }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.SecAbbr }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>

        <el-table-column  label="股份余额">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ zformatCurrency(scope.row.SharesBal) }}</el-tag>
              </div>
          </template>
        </el-table-column>

        <el-table-column  label="冻结数量"  prop="SharesFrzNumVol" show-overflow-tooltip>
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.SharesFrzNumVol }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.SharesFrzNumVol }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>


        <el-table-column  label="持仓成本" prop="PositionCost">
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ zformatCurrency(scope.row.PositionCost) }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ zformatCurrency(scope.row.PositionCost) }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>

        <el-table-column  label="成本价"  prop="CostPrice">
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ zformatCurrency(scope.row.CostPrice) }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ zformatCurrency(scope.row.CostPrice) }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>


        <el-table-column  label="参考市值" prop="RefMktVal">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{zformatCurrency(scope.row.RefMktVal) }}</el-tag>
            </div>
          </template>
        </el-table-column>


        <el-table-column  label="参考盈亏" prop="RefPl" >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="mini">{{zformatCurrency(scope.row.RefPl)}}</el-tag>
            </div>
          </template>
        </el-table-column>


        <el-table-column  label="盈亏比例(%)" prop="RefRate">
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ scope.row.RefRate }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ scope.row.RefRate }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>


        <el-table-column  label="证劵类型" prop="NewSecCate"
                          :formatter="formatNewSecCate"
                          show-overflow-tooltip>
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>{{ calateSecate(scope.row.NewSecCate) }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="mini">{{ calateSecate(scope.row.NewSecCate)  }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>

      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="form_data.pageInfo.PageNum" :page-sizes="[5, 10, 15 , 20]"
                     :page-size="form_data.pageInfo.PageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="form_data.pageInfo.Total">
      </el-pagination>
    </div>

  </div>
  <div v-else style="margin:10px 40px;">无权限</div>
</div>
</template>

<script>
  import {JSONArrayToString} from "@/utils/datahandle";
  import {parseTime} from "@/utils";
  import {queryHoldStockInfo} from "@/api/organization/custmanage/formalcustmanage/PanoramicView";
  import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
  import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
  import {formatCurrency} from "@/utils";


  export default {
    name: "HoldStockInfoGenerlAccount",
    data() {
      return {
        list: null,
        busType:[{
          value: "",
          label: "不限"
        }],
        queryCondition:{
          Uuid:"",
          SysCode:""
        },
        form_data: {
          "pageInfo": {
            PageNum: 1,
            PageSize: 10,
            Total: 0,
            Pages: 0
          },
          "param": {}
        }
      }
    },

    created() {
      this.doQuery();
      this.initBusType();
    },

    methods:{

      formatNewSecCate(row, column){
        var cate = row[column.property];
        return this.calateSecate(cate);
      },

      initBusType(){
         var bstp=dictItems(DICTYPE.EDW50003);
        //console.info(bstp);

        var _this=this;
        bstp.forEach(function(value,index,array){
          _this.busType.push({"label":value.label,"value":value.value});
        });

      },

      zformatCurrency(currn){
        return formatCurrency(currn);
      },

      calateSecate(code){
        var label=dictFilter(DICTYPE.EDW30004,code);
        return label;
      },

      resetParm(formName){//置空选项
        //this.$refs[formName].resetFields();
        this.queryCondition.SysCode="";
      },
      doQuery(){


        var uuid=this.$store.getters.Uuid_formal;
        this.queryCondition.Uuid=uuid;

        this.form_data.param=JSONArrayToString(this.queryCondition);
        //console.info(this.form_data);
        if(uuid){
          queryHoldStockInfo(this.form_data)
            .then(response => {
              this.list = response.Data;
              this.form_data.pageInfo = response.PageInfo;
            }).catch(() => {
          })
        }
      },

      handleSizeChange(pagesiz){
        this.form_data.pageInfo.pageSize=pagesiz;
        this.doQuery();
      },
      handleCurrentChange(pageNum){
        this.form_data.pageInfo.pageNum=pageNum;
        this.doQuery();
      }
    }
  };
</script>

<style scoped>

  .holdstockinfogeneraccount{
  }
  .yh-headerdiv {
    height: 40px;
    border-bottom: 1px solid #eeeee9;
  }

  .yh-headerfl {
    float: left;
    width: 70px;
    height: 40px;
    line-height: 40px;
  }


  .yh-titlelf{

    line-height: 40px;
    border-left: 6px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;
  }

  .yh-titlelf{
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #cb6c2f;
    margin-right: 4px;
    margin-left: 2px;
  }


  .yh-queryresult-top {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeee9;
    margin-bottom: 10px;
  }
  .yh-queryresult-top-content {
    display:inline-block;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #cb6c2f;
    color: #333;
    padding:0 3px;
    font-weight: bolder;
    font-size: 14px !important;
  }

  .yh-query-content {
      height: 60px;
      margin-top: 20px;
  }
  .yh-query-content .el-input{
    width: 180px;
  }


</style>
