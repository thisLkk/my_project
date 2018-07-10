<template>
  <div class="yh-tracking">
    <!-- 快速指定位置跟踪组件 -->
    <div class="yh-tracking_">
      <div class="yh-tracking_top"></div>
      <ul class="clearfix">
        <li v-for="(first_item,index) in trackList" :key="index">
          <a href="javascript:void(0)">
            {{first_item.title}}
          </a>
          <div v-for="(two_item,index) in first_item.listChild" :key="index" class="yh-tracking-twoA">
            <a href="javascript:void(0)" >
              {{two_item.title_}}
            </a>
          </div>
        </li>
      </ul>
      <div class="yh-tracking_bot"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tracking",
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
            title: "商机信息",
            id: 3,
            listChild: [{
                title_: "商机阶段跟踪",
                id: 1
              },
              {
                title_: "商机列表",
                id: 2
              }
            ]
          },
          {
            title: "业务信息",
            id: 4,
            listChild: [{
              title_: "业务亲密度",
              id: 1
            }]
          },
          {
            title: "互动信息",
            id: 5,
            listChild: [{
              title_: "参观浏览",
              id: 1
            }]
          }
        ]
      };
    },
    mounted() {},
    computed: {},
    methods: {}
  };

</script>

<style scoped>
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
		background: url(../../../../assets/organization/customermanage/yh_tra_3.png) no-repeat;
	}
	.yh-tracking_bot {
		position: absolute;
		left: -6px;
		bottom: 0;
		width: 10px;
		height: 10px;
		background: url(../../../../assets/organization/customermanage/yh_tra_3.png) no-repeat;
	}
	.yh-tracking ul {
		position: relative;
		left: -5px;
		top: 0;
	}
  .yh-tracking ul li {
		line-height: 34px;
    padding-left: 20px;
    background: url(../../../../assets/organization/customermanage/yh_tra_1.jpg) no-repeat;
  	background-position: -1px 12px;
    background-size: 10px 10px;
  }
	.yh-tracking ul li a{
		display: block;
		font-size: 12px;
		color: #333333;
	}
  .yh-tracking ul li a:hover {
    color:#cb5c2f;
  }
	.yh-tracking ul li .yh-tracking-twoA a{
		color: #666666;
		padding-left: 12px;
	}
  .yh-tracking ul li .yh-tracking-twoA a:hover {
    color:#cb5c2f;
  }
</style>
