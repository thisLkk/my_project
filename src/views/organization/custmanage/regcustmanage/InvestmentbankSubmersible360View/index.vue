<template>
  <div class="yh-investmentbanksubmersible360view">
    <div class="yh-fl">
      <div class="yh-tracking">
        <!-- 快速指定位置跟踪组件 -->
        <div class="yh-tracking_">
          <div class="yh-tracking_top"></div>
          <ul class="clearfix">
            <li v-for="(first_item,index) in trackList" :key="index">
              <a href="javascript:void(0)" @click="movetoposition(first_item.title)">
                {{first_item.title}}
              </a>
              <div v-for="(two_item,index) in first_item.listChild" :key="index" class="yh-tracking-twoA">
                <a href="javascript:void(0)">
                  {{two_item.title_}}
                </a>
              </div>
            </li>
          </ul>
          <div class="yh-tracking_bot"></div>
        </div>
      </div>
    </div>
    <div class="yh-fr">
      <div id="SubmersibleBasicInformation">
        <SubmersibleBasicInformation :showandhide=true></SubmersibleBasicInformation>
      </div>
      <div id="LabelInformation">
        <LabelInformation></LabelInformation>
      </div>
      <div id="DetailedInformation">
        <DetailedInformation></DetailedInformation>
      </div>
      <div id="FinancialInformation">
        <FinancialInformation></FinancialInformation>
      </div>
      <div id="InteractiveInformation">
        <InteractiveInformation></InteractiveInformation>
      </div>
    </div>
    <div>
      <BackToTop></BackToTop>
    </div>
  </div>
</template>
<script>
import { SubmersibleBasicInformation, LabelInformation, DetailedInformation, FinancialInformation, InteractiveInformation } from '@/views/organization/custmanage/components/index.js'
import BackToTop from '../../../../../components/BackToTop'
export default {
  name: 'InvestmentbankSubmersible360View',
  components: {
    SubmersibleBasicInformation,
    LabelInformation,
    DetailedInformation,
    FinancialInformation,
    InteractiveInformation,
    BackToTop
  },
  data() {
    return {
      trackList: [{
        title: "基本信息",
        id: 1,
        listChild: [{
          title_: "",
          id: 1
        }]
      },
      {
        title: "标签信息",
        id: 2,
        listChild: [{
          title_: "",
          id: 1
        }]
      },
      {
        title: "详细信息",
        id: 3,
        listChild: [{
          title_: "",
          id: 1
        }
        ]
      },
      {
        title: "财务信息",
        id: 4,
        listChild: [{
          title_: "",
          id: 1
        }]
      },      {
        title: "活动信息",
        id: 5,
        listChild: [{
          title_: "",
          id: 1
        }]
      }
      ]
    }
  },
  mounted() { },
  computed: {},
  methods: {
    movetoposition(title) {
      var SubmersibleBasicInformation = document.getElementById("SubmersibleBasicInformation");
      var LabelInformation = document.getElementById("LabelInformation");
      var DetailedInformation = document.getElementById("DetailedInformation");
      var FinancialInformation = document.getElementById("FinancialInformation");
      var InteractiveInformation = document.getElementById("InteractiveInformation");
      if (title === '基本信息') {
        window.scrollTo(0, SubmersibleBasicInformation.offsetTop);
      } else if (title === '标签信息') {
        window.scrollTo(0, LabelInformation.offsetTop);
      } else if (title === '详细信息') {
        window.scrollTo(0, DetailedInformation.offsetTop);
      } else if (title === '财务信息') {
        window.scrollTo(0, FinancialInformation.offsetTop);
      }else{
        window.scrollTo(0, InteractiveInformation.offsetTop);
      }
    }
  }

}
</script>
<style scoped>

.yh-fl {
  float: left;
  width: 8%;
  margin-left: 15px;
}
.yh-fr {
  float: right;
  width: 87%;
}
.yh-tracking {
  width: 180px;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  z-index: 10;
}
.yh-tracking_ {
  border-left: 2px solid #eaeaea;
  padding: 30px 0;
  margin-left: 8px;
  position: relative;
}
.yh-tracking_top {
  position: absolute;
  left: -6px;
  top: 0;
  width: 10px;
  height: 10px;
  background: url(../../../../../assets/organization/customermanage/yh_tra_3.png)no-repeat;
}
.yh-tracking_bot {
  position: absolute;
  left: -6px;
  bottom: 0;
  width: 10px;
  height: 10px;
  background: url(../../../../../assets/organization/customermanage/yh_tra_3.png)no-repeat;
}
.yh-tracking ul {
  position: relative;
  left: -5px;
  top: 0;
}
.yh-tracking ul li {
  line-height: 34px;
  padding-left: 20px;
  background: url(../../../../../assets/organization/customermanage/yh_tra_1.jpg)no-repeat;
  background-position: -1px 12px;
  background-size: 10px 10px;
}
.yh-tracking ul li a {
  display: block;
  color: #333333;
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: normal;
}
.yh-tracking ul li a:hover {
  color: #cb5c2f;
}
.yh-tracking ul li .yh-tracking-twoA a {
  color: #666666;
  padding-left: 12px;
}
.yh-tracking ul li .yh-tracking-twoA a:hover {
  color: #cb5c2f;
}
</style>


