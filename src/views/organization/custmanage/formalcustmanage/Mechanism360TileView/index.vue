<template>
  <div>
    <div class="yh-fl">
      <div class="yh-tracking">
        <!-- 快速指定位置跟踪组件 -->
        <div class="yh-tracking_">
          <div class="yh-tracking_top"></div>
          <ul class="clearfix">
            <li v-for="(first_item,index) in trackList" :key="index" @click="movetoposition(first_item.title)">
              <a href="javascript:void(0)">
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
      <div id="basicinformation">
        <BasicInformation></BasicInformation>
      </div>
      <div id="serviceteam">
        <ServiceTeam></ServiceTeam>
      </div>
      <div id="businessinformation">
        <BusinessInformation></BusinessInformation>
      </div>
      <div id="interactiveinformation">
        <InteractiveInformation></InteractiveInformation>
      </div>
    </div>
    <div>
      <BackToTop></BackToTop>
    </div>
  </div>
</template>
<script>
import { BasicInformation, ServiceTeam, BusinessInformation, InteractiveInformation } from '@/views/organization/custmanage/components/index.js'
import BackToTop from '../../../../../components/BackToTop'
export default {
  name: 'Mechanism360TileView',
  components: {
    BasicInformation,
    ServiceTeam,
    BusinessInformation,
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
        title: "服务团队",
        id: 2,
        listChild: [{
          title_: "",
          id: 1
        }]
      },
      {
        title: "业务信息",
        id: 3,
        listChild: [{
          title_: "业务亲密度",
          id: 1
        }]
      },
      {
        title: "互动信息",
        id: 4,
        listChild: [{
          title_: "参观浏览",
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
      var basicinformation = document.getElementById("basicinformation");
      var serviceteam = document.getElementById("serviceteam");
      var businessinformation = document.getElementById("businessinformation");
      var interactiveinformation = document.getElementById("interactiveinformation");
      if (title === '基本信息') {
        window.scrollTo(0, basicinformation.offsetTop);
      } else if (title === '服务团队') {
        window.scrollTo(0, serviceteam.offsetTop);
      } else if (title === '业务信息') {
        window.scrollTo(0, businessinformation.offsetTop);
      } else {
        window.scrollTo(0, businessinformation.offsetTop);
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
/*导航栏*/
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
  background: url(../../../../../assets/organization/customermanage/yh_tra_3.png)
    no-repeat;
}
.yh-tracking_bot {
  position: absolute;
  left: -6px;
  bottom: 0;
  width: 10px;
  height: 10px;
  background: url(../../../../../assets/organization/customermanage/yh_tra_3.png)
    no-repeat;
}
.yh-tracking ul {
  position: relative;
  left: -5px;
  top: 0;
}
.yh-tracking ul li {
  line-height: 34px;
  padding-left: 20px;
  background: url(../../../../../assets/organization/customermanage/yh_tra_1.jpg)
    no-repeat;
  background-position: -1px 12px;
  background-size: 10px 10px;
}
.yh-tracking ul li a {
  display: block;
  font-size: 12px;
  color: #333333;
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

