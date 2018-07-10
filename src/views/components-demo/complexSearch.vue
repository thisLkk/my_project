<template>
  <div class="components-container">
    <code>高级搜索控件示例</code>
    <div class="editor-container">
      <el-button icon="el-icon-search" type="primary" v-on:click="dialogVisible = true">高级搜索</el-button>
    </div>
    <el-dialog :title="'高级条件'" size="large" :visible.sync="dialogVisible" width="60%">
      <ComplexSearch @submitForm="getComplexSearchResult" :conditions="conditions"></ComplexSearch>
    </el-dialog>
  </div>
</template>

<script>
import ComplexSearch from '@/components/ComplexSearch'

export default {
  name: 'complexsearch-demo',
  components: { ComplexSearch },
  data() {
    return {
      conditions: [
        {
          id: '1',
          title: '基本信息',
          children: [
            {
              id: '11',
              title: '客户号',
              type: 'string'
            },
            {
              id: '12',
              title: '专业投资者类型',
              type: 'select',
              dict: 'CUST_TYPE'
            },
            {
              id: '13',
              title: '客户标签',
              type: 'string'
            }
          ]
        },
        {
          id: '2',
          title: '资产信息',
          children: [
            {
              id: '21',
              title: '昨日资金余额',
              type: 'number'
            },
            {
              id: '22',
              title: '昨日可用余额',
              type: 'number'
            },
            {
              id: '23',
              title: '昨日总市值',
              type: 'number'
            }
          ]
        },
        {
          id: '3',
          title: '交易信息',
          children: [
            {
              id: '31',
              title: '首次交易日期（银河)',
              type: 'date'
            },
            {
              id: '32',
              title: '首次交易日期（中登)',
              type: 'date'
            }
          ]
        },
        {
          id: '4',
          title: '交易信息'
        }
      ],
      dialogVisible: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      /*
      fetchList().then(response => {
        this.conditions = response.data
      })
      */
    },
    getComplexSearchResult(val) {
      this.dialogVisible = false
      this.$message(JSON.stringify(val))
    }
  }
}
</script>


