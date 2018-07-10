<template>
  <div class="yh-course">
    <!-- 历程图展示组件 -->
    <div class="yh-course-header">
      <h4 class="clearfix">
        <span class="fl">{{title}}</span>
        <a class="fr" href="javascripit:void(0)">{{more}}</a>
      </h4>
    </div>

    <div class="yh-course-main">
      <div class="yh-course-leftbtn">
        <a @click="leftBtn()" href="javascript:void(0)">
        </a>
      </div>
      <div class="yh-course-timeline" ref="lineWidth">
        <div class="yh-course-timeline_">
          <div class="yh-course-maininfo" v-for="(main_,index) in main" :key="index" :style="'left:'+(index * 290 +10*index )+'px;'">
            <div class="yh-course-maininfo_">
              <h3>{{main_.title}}</h3>
              <ul class="clearfix">
                <li v-for="(ullil_,index) in main_.ulli" :key="index">
                  {{ullil_.name}}
                </li>
              </ul>
              <p ref="txtLength">{{main_.info}}</p>
              <span>{{main_.time}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="yh-course-rightbtn">
        <a @click="rightBtn()" href="javascript:void(0)">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InteractiveInformation",
  data() {
    return {
      liIndex: null,
      nowidx: 1,
      title: "活动信息",
      more: "更多信息",
      main: [
        {
          title: "高层互动",
          ulli: [
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            }
          ],
          info:
            "发展公司企业文化，弘扬公司企业精神，继承公司优良精神，向着统一目标前进",
          time: "2018/01/02~2018/01/03",
          id: "11"
        },
        {
          title: "研发中心",
          ulli: [
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            }
          ],
          info: "发展公司企业文化，弘扬公司企业精神，继承公司优良精神",
          time: "2018/01/02~2018/01/03",
          id: "11"
        },
        {
          title: "战略讨论",
          ulli: [
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            }
          ],
          info: "发展公司企业文化，弘扬公司企业精神，继承公司优良精神",
          time: "2018/01/02~2018/01/03",
          id: "11"
        },
        {
          title: "发展规划",
          ulli: [
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            }
          ],
          time: "2018/01/02~2018/01/03",
          id: "11"
        },
        {
          title: "企业愿景",
          ulli: [
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            },
            {
              name: "张向向"
            }
          ],
          time: "2018/01/02~2018/01/03",
          id: "11"
        }
      ]
    };
  },
  mounted() {
    this.tearLength(); //文字超过调用此方法
    this.liIndex = this.main.length;
    // //console.log(this.liIndex)
  },
  computed: {},
  methods: {
    rightBtn() {
      //右侧点击事件
      this.$refs.lineWidth.style.left = -300 * this.nowidx + "px";
      this.nowidx++;
      if (this.nowidx > this.liIndex - 3) {
        this.nowidx = this.liIndex - 3;
      }
    },
    leftBtn() {
      this.nowidx--;
      this.$refs.lineWidth.style.left = -300 * this.nowidx + "px";
      if ((this.nowidx = 1)) {
        this.nowidx = 1;
      }
    },
    tearLength() {
      //p 标签介绍控制文字显示多少字数
      const p_arr = this.$refs.txtLength;
      p_arr.forEach(function (index) {
        const p_length = index.innerText.length;
        if (p_length > 30) {
          const newText = index.innerText.substr(0, 30);
          index.innerText = newText + "......";
        }
      });
    }
  }
};
</script>

<style scoped>
.yh-course {
  min-width: 1000px;
  max-width: 1300px;
  min-height: 100px;
  box-sizing: border-box;
  padding-right: 20px;
  margin: 0 auto;
}
.yh-course-header{
  margin-top: 50px;
}
/* 此组件的title */
.yh-course h4 {
  width: 100%;
  font-size: 14px;
  height: 40px;
  color: #333333;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}
.yh-course h4 span {
  display: inline-block;
  width: 60px;
  height: 39px;
  box-sizing: border-box;
  line-height: 39px;
  border-bottom: 2px solid #cb5c2f;
}
.yh-course h4 a {
  display: inline-block;
  width: 100px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  color: #999999;
}
.yh-course h4 a:hover {
  color: #cb5c2f;
}
/* 此组件的主要区域 */
.yh-course-main {
  width: 100%;
  height: 430px;
  overflow: hidden;
  margin: 40px 0;
  position: relative;
}
/* 左侧按钮  */
.yh-course-leftbtn {
  position: absolute;
  top: 0;
  left: -10px;
  width: 40px;
  height: 430px;
  z-index: 1;
  background: #fff;
}
.yh-course-leftbtn a {
  position: absolute;
  left: 10px;
  top: 198px;
  display: block;
  width: 40px;
  height: 40px;
  background: url(../../../../assets/organization/customermanage/yh-360sjz-left.png)no-repeat;
}
.yh-course-leftbtn a:hover {
  background: url(../../../../assets/organization/customermanage/yh-360sjz-left1.png)no-repeat;
}
/* 右侧按钮 */
.yh-course-rightbtn {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 430px;
  z-index: 1;
  background: #fff;
}
.yh-course-rightbtn a {
  position: absolute;
  left: 10px;
  top: 198px;
  display: block;
  width: 40px;
  height: 40px;
  background: url(../../../../assets/organization/customermanage/yh-360sjz-right.png)no-repeat;
}
.yh-course-rightbtn a:hover {
  background: url(../../../../assets/organization/customermanage/yh-360sjz-right1.png)no-repeat;
}
/* 时间历程展示区 */
.yh-course-main .yh-course-timeline {
  width: 100000px;
  height: 4px;
  position: absolute;
  left: 0;
  top: 50%;
}
.yh-course-main .yh-course-timeline_ {
  height: 2px;
  background: #999999;
  position: relative;
}
.yh-course-main .yh-course-timeline_ .yh-course-maininfo {
  width: 350px;
  height: 210px;
  position: absolute;
  padding-right: 40px;
  padding-left: 30px;
  /* margin-left:40px; */
}
/* 时间轴中上层属性 */
.yh-course-main .yh-course-timeline_ .yh-course-maininfo:nth-child(odd) {
  bottom: 0;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo:nth-child(odd)
  .yh-course-maininfo_ {
  width: 290px;
  height: 250px;
  box-sizing: border-box;
  background: url(../../../../assets/organization/customermanage/yh-360sjz-top.png)
    no-repeat;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo:nth-child(odd)
  .yh-course-maininfo_
  h3 {
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  color: #333333;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo
  .yh-course-maininfo_
  ul {
  width: 100%;
  height: 70px;
  overflow: hidden;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo
  .yh-course-maininfo_
  ul
  li {
  float: left;
  width: 56px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin-left: 14px;
}
.yh-course-maininfo .yh-course-maininfo_ ul li:before {
  content: "•";
  color: #999999;
  display: inline-block;
  font-size: 18px;
}
.yh-course-maininfo .yh-course-maininfo_ p {
  color: #666666;
  font-size: 14px;
  padding: 0 15px;
  line-height: 20px;
}
.yh-course-maininfo:nth-child(odd) .yh-course-maininfo_ span {
  margin-top: 78px;
  display: block;
  font-size: 13px;
  text-align: center;
  color: #999999;
}
/* 时间轴中下层属性 */
.yh-course-main .yh-course-timeline_ .yh-course-maininfo:nth-child(even) {
  top: -40px;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo:nth-child(even)
  .yh-course-maininfo_ {
  position: relative;
  width: 290px;
  height: 252px;
  background: url(../../../../assets/organization/customermanage/yh-360sjz-bot.png)
    left bottom no-repeat;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo:nth-child(even)
  .yh-course-maininfo_
  h3 {
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  padding-top: 82px;
  color: #333333;
  margin-bottom: 40px;
}
.yh-course-main
  .yh-course-timeline_
  .yh-course-maininfo:nth-child(even)
  .yh-course-maininfo_
  span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: block;
  font-size: 13px;
  text-align: center;
  color: #999999;
}
</style>