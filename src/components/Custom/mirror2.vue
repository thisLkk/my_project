<template>
<Mirror :data="data" @tableData="handleTableData"> </Mirror>
</template>

<script>
import Mirror from '@/components/Custom/mirror'
export default {
    components: {
        Mirror
    },

    props: {
        selectColumn: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: '放大镜'
        },
        headers: {
            type:Array,
            default: []
        },
        reqUrl: {
            type: String,
            default: '/test/mirror/'
        },
        search:{
            type: Object,
            default: function (){ return {
                label: '查詢',
                param: 'attr'
            }}
        }
    },
    created() {
        console.log("log here!");
        var self = this;
        console.log(JSON.stringify(self.headers));
        var header_array = self.headers;

        if (header_array.length > 0) {
            self.tableHeader = [];
            for (var idx = 0; idx < header_array.length; idx++){
                self.tableHeader.push({
                    prop: header_array[idx]['prop'],
                    label: header_array[idx]['label']
                })
            }
        }

        console.log(JSON.stringify(self.tableHeader));

        var new_table_header = [];
        for(var idx = 0; idx < self.tableHeader.length; idx++) {
            var new_item = {
                prop: self.tableHeader[idx].prop,
                label: self.tableHeader[idx].label,
                width:""
            }
            

            new_table_header.push(new_item);
        }

        console.log(JSON.stringify(new_table_header));


        self.data = {
            selectColumn: self.selectColumn,
            label: self.label,
            tableData: {
                controls: [
                    {
                        name: "查询",
                        event: "search"
                    }
                ],
                tableHeader: new_table_header,
                pageData: {
                    size_type: [10, 20, 50 , 100],
                    size: 10,
                    total: 100,
                    cur: 1
                },
                tableData: [],
            },
            selects: [],
            texts: [{
                name: self.search.label,
                attr: self.search.param,
                value: ''
            },],
            req: self.reqUrl
        }
    },
    data() {
        return {
            tableHeader:  [
                {
                    prop: "date",
                    label: "日期"
                },
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "address",
                    label: "地址"
                }
            ],
            data: {
                        label: "测试1",
                        selectColumn: "name",
                        tableData: {
          controls: [
            {
              name: "查询",
              event: "search"
            }
          ],
          tableHeader: [
              {
                  prop: "date",
                  label: "日期",
                  width: "180"
              },
              {
                  prop: "name",
                  label: "姓名",
                  width: "180"
              },
              {
                  prop: "address",
                  label: "地址",
                  width: "180"
              }
          ],
          pageSizeType: [10, 20, 50 , 100],
          pageData: {
            size: 10,
            total: 100,
            cur: 1
          },
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
          }]
          },
                        texts: [
                            {
                                name: "1",
                                attr: "a",
                                value:''
                            },
                            {                            
                                name: "2",
                                attr: "b",
                                value:''
                            }
                        ],
                        selects:[
                            {
                                name: "1",
                                choices:[
                                    {
                                    label: "1",
                                    value: "1"
                                    },
                                    {
                                    label: "2",
                                    value: "2"
                                    }
                                ],
                                attr: "a",
                                value: ''
                            },
                            {
                                name: "2",
                                choices:[
                                ],
                                attr: "b",
                                value:''
                            }
                        ],
                        req: "",
                    }
        }
    },
    methods: {
        handleValueChange(value) {
            this.$emit("valueChange", value);
        },
        handleTableData(value) {
            var self = this;
            console.log("table data:");
            console.log(JSON.stringify(value));
            self.data.tableData.tableData = value.tableData;
            self.data.tableData.pageData = value.pageData;
        }
    }


}



</script>