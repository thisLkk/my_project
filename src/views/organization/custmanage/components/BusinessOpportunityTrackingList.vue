<template>
  <div class="yh-table">
    <el-table :data="tableData" border style="width: 100%" :header-row-class-name="headerRowClassName" :row-class-name="tableRowClassName">
      <el-table-column prop="line" label="条线" width="180">
      </el-table-column>
      <el-table-column prop="openbusiness" label="开通业务" width="180">
      </el-table-column>
      <el-table-column prop="businesstotalnumber" label="业务总数">
      </el-table-column>
      <el-table-column prop="openproportion" label="开通比例">
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
export default {
  name: 'BusinessOpportunityTrackingList',
  data() {
    return {
      tableData: [{
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }, {
        line: '经纪',
        openbusiness: '5',
        businesstotalnumber: '9',
        openproportion: '55.56%'
      }
      ]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'yh-noactive';
      } else if (rowIndex % 2 != 0) {
        return 'yh-active';
      }
      return '';
    },
    headerRowClassName({ rowIndex }) {
      return 'yh-header';
    },
  },
}
</script>
<style scoped>
.yh-table{
  width: 100%;
  height: 270px;
}
.yh-active {
  height: 30px;
  color: #333333;
}
.yh-noactive {
  height: 30px;
  color: #ffffff;
}
.yh-header {
  height: 30px;
  color: #333333;
  font-family: "微软雅黑";
  font-weight: bold;
}
</style>


