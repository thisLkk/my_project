<template>
  <div class="yh-projectFour">
    <div class="yh-topdiv">
      <div class="yh-active">
        <span>立项情况统计</span>
      </div>
    </div>
    <div class="yh-top20Div">
      <div class="yh-top20Div-l">
        <span>
          <span>截止时间:</span>
          <span>{{statusstatistics[0].AsTime}}</span>
        </span>
      </div>
      <div class="yh-top20Div-r">
        <el-button size="mini" id="el_query" v-on:click="doExport">导出</el-button>
      </div>
    </div>

    <div class="yh-top20Div">
      <el-table :data="statusstatistics" class="yh_table_auto_f" show-summary :summary-method="getSummaries" stripe size="mini" max-height=800 :span-method="objectSpanMethod" style="width: 100%">
        <el-table-column label="业务部门" show-overflow-tooltip width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BizDep }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  <a href="javascript:void(0)" @click="business_(scope.row.id)">
                    {{ scope.row.BizDep }}
                  </a>
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="统计口径" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.StatisticalCaliber=='01'?'新增':'累计' }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{scope.row.StatisticalCaliber=='01'?'新增':'累计'}}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="股权类项目" align="center">
          <el-table-column label="IPO" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.Ipo }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.Ipo}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="再融资" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.EquityReFin }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.EquityReFin}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="并购重组" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.Ma }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.Ma}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="财务顾问" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.FinanceAdviser}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.FinanceAdviser}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.Subtotal }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.Subtotal}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="债券类项目" align="center">
          <el-table-column label="公司债" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.ListCorpBond }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.ListCorpBond}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="企业债" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.CorpBond }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.CorpBond}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="银行间" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.InbankBond }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.InbankBond}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="其他" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{scope.row.OthBond}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.OthBond}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.BondSubtotal }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.BondSubtotal}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="新三板项目" align="center">
          <el-table-column label="推荐挂牌" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.ThirdBdRecommList}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.ThirdBdRecommList}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="再融资" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.EquityReFin }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.EquityReFin}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.ThirdBdSubtotal }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="mini">
                    {{scope.row.ThirdBdSubtotal}}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProjectFour",
  components: {},
  props: {
    statusstatistics: {
      type: Array,
    },
    statusstatisticstotaladd:{
      type: Array,
    },
    statusstatisticstotalaccumulative:{
      type: Array,
    }
  },
  data() {
    return {
      time: "2018-04-18",
      tableData: [
        {
          BizDep: "XX部门1",
          StatisticalCaliber: "新增",
          Ipo: "1",
          EquityReFin: "2",
          Ma: "3",
          FinanceAdviser: "4",
          Subtotal: "10",
          ListCorpBond: "11",
          CorpBond: "",
          InbankBond: "",
          OthBond: "",
          BondSubtotal: "",
          ThirdBdRecommList: "",
          ThirdBdSubtotal: "",
          Total: ""
        }
      ]
    };
  },
   created() {
    this.init();
  },
  methods: {
    doExport: function () {
      //导出
    },
    init(){
      
      //console.log(JSON.stringify(this.statusstatisticstotaladd));
      
      //console.log(JSON.stringify(this.statusstatisticstotalaccumulative));
      
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        // const values = data.map(item => Number(item[column.property]));
        // if (!values.every(value => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr);
        //     if (!isNaN(value)) {
        //       return prev + curr;
        //     } else {
        //       return prev;
        //     }
        //   }, 0);
        //   sums[index] += ' 元';
        // } else {
        //   sums[index] = 'N/A';
        // }
      });
      return sums;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style scoped>
.yh-projectFour {
  border: 3px #e8e8e8 solid;
  width: auto;
  min-height: 400px;
  border-radius: 10px;
  padding: 12px;
  margin: 0 auto;
}
.yh-topdiv {
  height: 40px;
  border-bottom: 1px solid #dddddd;
}
.yh-active {
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #cc6d30;
}
.yh-active span {
  font-family: "微软雅黑";
  font-weight: normal;
  font-size: 15px;
}
.yh-top20Div {
  padding-top: 20px;
  padding-bottom: 20px;
}
.yh-top20Div-l {
  float: left;
  width: 50%;
}
.yh-top20Div-r {
  float: right;
  width: 50%;
  text-align: right;
}
</style>


