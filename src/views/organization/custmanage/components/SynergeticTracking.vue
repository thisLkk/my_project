<template>
  <!-- 360传统页面 协同信息 协同跟踪列表 -->
  <div class="yh-synergetic-table">
    <div class="table-header clearfix">
      <h3>{{title}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "SynergeticTracking",
  data() {
    return {
      title: "协同需求",
      ths: [
        {
          th_: "需求编号",
          key: "number"
        },
        {
          th_: "需求名称",
          key: "name"
        },
        {
          th_: "需求子类",
          key: "type"
        },
        {
          th_: "客户需求描述",
          key: "cuetomername"
        },
        {
          th_: "要求与建议",
          key: "cuetomernumber"
        },
        {
          th_: "需求状态",
          key: "state"
        },
        {
          th_: "响应方",
          key: "source"
        },
        {
          th_: "响应日期",
          key: "details"
        }
      ],
      tds: [
        {
          number: "0299323",

          name: "投资需求",

          type: "股票质押",

          cuetomername: "客户方准备开展员工股权激励，部分员工要做股权质押,部分员工要做股权质押部分员工要做股权质押",

          cuetomernumber: "如有意参与，请尽快与我联系",

          state: "新建",

          source: "银河",
          details: "2017-02-23"
        },
        {
          number: "0299323",

          name: "金融产品推荐",

          type: "投资需求",

          cuetomername: "北京铝业集团",

          cuetomernumber: "213214342",

          state: "推进中",

          source: "自建",
          details: "重点产品需要"
        },
        {
          number: "0299323",

          name: "金融产品推荐",

          type: "投资需求",

          cuetomername: "北京铝业集团",

          cuetomernumber: "213214342",

          state: "推进中",

          source: "自建",
          details: "重点产品需要。。。。。"
        }
      ]
    };
  },
  methods: {
  
  }
};
</script>

<style scoped>
/* 服务团队信息 */

.yh-synergetic-table {
  margin: 20px;
  min-height: 300px;
  box-sizing: border-box;
  border: 4px solid #eeeeee;
  padding-top: 20px;
  position: relative;
}
.table-header {
  height: 36px;
  line-height: 36px;
  margin: 5px 0;
}

.table-header h3 {
  float: left;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid #cf8e3e;
    padding: 0 5px;
}


</style>
