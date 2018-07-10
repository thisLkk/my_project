<template>
  <div class="business-opportunity-oneId-table">
    <div class="table-header clearfix">
      <h3>ONEID列表</h3>
    </div>
    <el-table
    :data="dataList"
    border
    style="width: 100%" stripe size="mini">
    <el-table-column
        type="index"
        label="序号"
        width="50" align="center">
    </el-table-column>
    <el-table-column
        prop="CustNo"
        label="客户号"
        width="180" align="center">
    </el-table-column>
    <el-table-column
        prop="CustFullName"
        label="客户姓名"
        width="180" align="center">
    </el-table-column>
    <el-table-column
        prop="zcode"
        label="部门标签"
        width="180" align="center">
        <template slot-scope="scope"> 
        <span style="margin-left: 10px">
          {{scope.row.CustBatchRight ? scope.row.CustBatchRight.DeptStr : ''}}
        </span> 
    </template>
    </el-table-column>
    <el-table-column
        prop="OrgNo"
        label="隶属营业部" align="center">
        <template slot-scope="scope"> 
        <span	style="margin-left: 10px">
          {{scope.row.OrgNo | productFilter(dictypeObj.CTCCD0998, scope.row.OrgNo)}}
        </span> 
        </template>
    </el-table-column>
    <el-table-column
        prop="SrvMagName"
        label="服务经理" align="center">
    </el-table-column>
    <el-table-column
        prop="OpAcctDate"
        label="开户日期" align="center">
    </el-table-column>
        <el-table-column
        prop="CustSts"
        label="客户状态" align="center">
        <template slot-scope="scope"> 
        <span style="margin-left: 10px" >
          {{scope.row.CustSts | productFilter(dictypeObj.EDW10030, scope.row.CustSts)}}
        </span> 
          </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAssocRelaCustList} from '@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js'
import DICTYPE from "@/utils/dictTypes.js";
import "@/filters/filters.js";

export default {
  name: 'BusinessOpportunityOneIdTable',
  data() {
    return {
      uuid: '',
      dataList: [],
      dictypeObj: DICTYPE
    };
  },

  mounted () {
    this.init();
  },

  methods: {
    init() {
      this.getOneIdListData();
    },

    /**
     * 获取oneID名单列表接口
     */
    getOneIdListData() {
      let query = {
        Param: this.$store.getters.Uuid_formal // 客户UUID
      }
      getAssocRelaCustList(query).then((data) => {
        let successCode = data.Meta.Code;
        if (successCode === '0000') {
          this.dataList = data.Data || [];
        } else {
          this.dataList = [];
        }
      }).catch((err) => {
          this.$message.error('获取名单失败！');
      })
    }
  }
}
</script>

<style lang="scss">
  .business-opportunity-oneId-table{
    position: relative;
    margin:10px 15px;
    min-height: 200px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    padding-top: 0px;
    background:#FFF;
    padding:0 20px;
    border-radius:3px;
    font-size: 12px;
    background-color: #fff;
    .fa {
      font-size: 16px;
    }
  }
</style>

