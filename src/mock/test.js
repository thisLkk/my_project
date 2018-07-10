import Mock from 'mockjs'
/*
export default {
    test: () => {
      return {
        status: { message: '登录成功', code: '1' },
        data: [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }]
      }
    }
  }
*/
  export default {
    test: () => {
      return {
        status: { message: '登录成功4444', code: '0' },
        data: {
            data: [{
                label: '一级 22222',
                children: [{
                  label: '二级 1-1',
                  children: [{
                    label: '三级 1-1-1'
                  }]
                }]
              }]
        }
      }
    },
    columnchart: () => {
        return {
          status: { message: '登录成功3333', code: '0' },
          data: {
            xAxisData: ['Mon1', 'Tuecolumn', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            seriesData: [
              { name: 'expected', data: [100, 120, 161, 134, 105, 160, 165] },
              { name: 'actual', data: [120, 82, 91, 154, 162, 140, 145] }
            ]
          }
        }
      },
    linechart: () => {
        return {
          status: { message: '登录成功3333', code: '0' },
          data: {
            xAxisData: ['Mon2', 'TueLine', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            seriesData: [
              { name: 'expected', data: [100, 120, 161, 134, 105, 160, 165] },
              { name: 'actual', data: [120, 82, 91, 154, 162, 140, 145] }
            ]
          }
        }
      },
      piechart: () => {
        return {
          status: { message: '登录成功3333', code: '0' },
          data: {
            legendData: ['Industries', 'Technology', 'ForexDDD', 'Gold', 'Forecasts'],
            seriesData: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'ForexDDD' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ]
          }
        }
      },
      barchart: () => {
        return {
          status: { message: '登录成功3333', code: '0' },
          data: {
            xAxisData: ['Mon3', 'TueBar', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            seriesData: [
              { name: 'expected', data: [100, 120, 161, 134, 105, 160, 165] },
              { name: 'actual', data: [120, 82, 91, 154, 162, 140, 145] }
            ]
          }
        }
      },
      test_list: () => {
        return {
          status: { message: '成功', code: '0' },
          data: {
            res: [
              {
                name: '稳盈-安e+ 180321040807',
                url: '',
                year: '8.40',
                rest: '31',
                value: '98605.58',
                change: '-55.58',
                change_percent: '0.06',
                sell: '985500.0',
                serve_percent: '0.0700',
                action: '',
                checked: false
            },
            {
               name: '稳盈-安d+ 180321040807',
                url: '',
                year: '8.40',
                rest: '33',
                value: '98605.58',
                change: '-56.58',
                change_percent: '0.07',
                sell: '98550.0',
                serve_percent: '0.0800',
                action: '',
                checked: true
            }
            ]
          }
        }
      },
      test_mirror: () => {
        return {
          status: { message: '成功', code: '0' },
          data: {
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            pageData: {
              size: 10,
              total: 100,
              cur: 1
            }
          }
        }

      }
    
  }