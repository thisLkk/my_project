<template>
<div class="Calendar-box">
    <div class="CalendarHeader">
     日历
    </div>
    <div class="CalendarFooter" style=" padding:0px 10px;">
       <!-- <CalendarSall></CalendarSall> -->
      <el-popover
        popper-class="popover-box"
        placement="bottom-end"
        width="300"
        @hide="hideFn"
        :disabled="!popoverShow"
        :value="popoverShow"
        trigger="click">
        <CalendarNew slot="reference" ref="Calendar"
          v-on:choseDay="getDayInfo"
          v-on:changeMonth="changeDate"
          :markDate="signDade"
          ></CalendarNew>
          <!-- <ul class="dade-list">
            <li v-for="(item, key) in dadeListData" :key="key">
            <i>{{item.ActivityType | productFilter(dictypeObj.OSPCD0220, item.ActivityType)}}</i>
            <span :title="item.ActivityContent || ''">{{item.ActivityContent || ''}}</span>
            <span :title="item.CustName || ''">{{item.CustName || ''}}</span>
            </li>
          </ul> -->
          <ul class="dade-list">
            <li v-for="(item, key) in dadeListData" :key="key">
            <i :title="item.LblName">{{item.LblName || ''}}</i>
            <span :title="item.PrdQty || 0">{{item.PrdQty || 0}}</span>
            </li>
          </ul>
      </el-popover>
    </div>
</div>
</template>

<script>
  import { getactivitycalendarlist, getactivitylist, getCalendarEventDateList, productCalendarQuery } from "@/api/organization/dashboard/index.js";
  import CalendarSall from './CalendarSall.vue';
  import CalendarNew from 'vue-calendar-component';
  import DICTYPE from "@/utils/dictTypes.js";
  import "@/filters/filters.js";
  import {filterFormatTime} from '@/filters';


  export default {
    name:'Calendar',
    components: {
      CalendarNew,
      CalendarSall
    },
    data() {
      return{
        signDade: [],
        uposId: '',
        month: [],
        PlanBeginTime: '',
        PlanEndTime: '',
        dadeListData: [],
        popoverShow: false,
        dictypeObj: DICTYPE
      }
    },

    mounted () {
      this.uposId = this.$store.getters.uposId;
      this.init();
    },

    methods: {
      init() {
        this.getTime();
      },

      /**
       * 获取开始时间
       */
      getTime() {
        let dade = new Date();
        let y = dade.getFullYear();
        let m = dade.getMonth() + 1;
        let d = dade.getDay();
        let dadeStr = `${y}/${m}/${d}`;
        // this.getDadeList(this.formatMonth(dadeStr));
        this.getCalendarEventDateListFn(this.formatMonth(dadeStr));
      },

      /**
       * 获取产品日期列表
       */
      getCalendarEventDateListFn(dadeObj = {}) {
        let query = {
          param: {
            JoinInId: this.uposId,
            CalendarStartDate: dadeObj.start || '',
            CalendarEndDate: dadeObj.end || ''
          }
        };
        getCalendarEventDateList(query).then((data = {}) => {
          let meta = data.Meta || {};
          if (meta.Code === '0000') {
            this.signDade = this.formatTime(data.Data);
          }
        }).catch((err) => {
          console.log(err);
        });
      },

      /**
       * 格式化后端传过来的时间yyyymmmdd => yyyy/mmm/dd
       * timeArr 时间 yyyymmdd
       */
      formatTime(timeArr = []) {
        let arrTime = [];
        timeArr.forEach((ele, key) => {
          arrTime.push(filterFormatTime(ele.CalendarCurrDate))
        });
        return arrTime;
      },

      /**
       * 获取当天产品数量
       */
      getProductCalendarQuantityInfo(dade = '') {
        let dadeStr = dade.replace(/\-/g, '');
        let query = {
          param: {
            PrdCalendarBeginDate: dadeStr,
            PrdCalendarEndDate: dadeStr
          }
        }
        productCalendarQuery(query).then((data = {}) => {
          this.dadeListData = data.Data;
          if (this.dadeListData.length) {
            this.popoverShow = true;
          } else {
            this.popoverShow = false;
          }
        })
      },

      /**
       * 获取时间列表
       */
      getDadeList(dadeObj = {}) {
        let query = {
          param: {
            JoinInId: this.uposId,
            PlanBeginTime: dadeObj.start || '',
            PlanEndTime: dadeObj.end || ''
          }
        };
        getactivitycalendarlist(query).then((data = {}) => {
          this.calendarData(data.Data);
        });
      },

      /**
       * 获取当天活动列表
       */
      getactivitylistInfo(dade = '') {
        let dataObj = {
          param: {
            JoinInId: this.uposId,
            CurrDate: dade
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 5
          }
        };
        getactivitylist(dataObj).then((data) => {
          let meta = data.Meta;
          if (meta.Code == '0000') {
            this.dadeListData = data.Data;
            if (this.dadeListData.length) {
              this.popoverShow = true;
            } else {
              this.popoverShow = false;
            }
          }
        })
      },

      /**
       * 格式化日历展示数据
       * data 日历数据
       */
      calendarData(data = []) {
        let dadeArr = data;
        for (let key = 0; key < dadeArr.length; key++) {
          const dade = dadeArr[key];
          this.signDade.push(dade.ActivityDate.replace(/\-/g, '/'));
        }
      },

      /**
       * 点击当天获取当天的活动列表
       */
      getDayInfo(data = '') {
        // let dade = this.formatDade(data);
        if (this.signDade.includes(data)) {
          this.getProductCalendarQuantityInfo(data);
          // this.getactivitylistInfo(dade);
        }
      },

      /**
       * 切换月份
       * data 天 yyyy/mm/dd
       */
      changeDate(data = '') {
        let dataObj = this.formatMonth(data);
        this.getCalendarEventDateListFn(dataObj);
      },

      /**
       * 跳转到本月
       */
      clickToday(data) {
      },

      /**
       * 隐藏时触发
       */
      hideFn() {
        this.popoverShow = false;
      },

      /**
       * 格式化月份， 返回月份第一天，于最后一天 yyyy-mm-dd
       * dade 天 yyyy/mm/dd
       */
      formatMonth(dade = '') {
        let endMonth = '';
        let endDay = '';
        let dadeObj = {start: '', end: ''};
        let dadeArr = dade.split('/');
        let y = dadeArr[0] || 1994; // 年
        let m = dadeArr[1] || 1; // 月
        let newDade = new Date(y, m, 0);
        let dayNum = newDade.getDate();
        endMonth = m < 10 ? `0${m}` : m;
        dadeObj.start = `${y}-${endMonth}-01`;
        dadeObj.end = `${y}-${endMonth}-${dayNum}`;
        return dadeObj;
      },

      /**
       * 格式化日历选取的时间
       * dade yyyy/mm/dd
       */
      formatDade(dade = '') {
        let dadeArr = [];
        dadeArr = dade.split('/');
        for (let k = 0; k < dadeArr.length; k++) {
          let isDade = dadeArr[k];
          if (parseFloat(isDade) < 10) {
            dadeArr[k] = '0' + isDade;
          }
        };
        return dadeArr.join('-');
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.Calendar-box{
  width: 100%;
  .CalendarHeader{
      line-height: 40px;
      font-size:14px;
      text-align: left;
      color:#333;
      font-family:"微软雅黑";
      text-indent:1em;
      border-bottom:1px solid #ddd;
      margin-bottom:5px;
  }
  .CalendarFooter{
    span{
      .wh_container{
        .wh_content_all{
          background-color: #fff;
          .wh_top_changge{
            border-bottom:dashed #eee 1px;
            .wh_content_li{
              margin-top:10px;
              background-color: #c09846;
              font-size:14px;
              height:30px;
            }
            .wh_jiantou1, .wh_jiantou2{
              border-color: #c09846;
            }
          }
          .wh_content_item{
            color: #524c4c;
            width:14.1%;
            font-size:14px;
            height:44px;
            cursor:pointer;
            .wh_isMark{
             /* width: 100%;*/
              color: #524c4c;
              background-color: #fff;
              position: relative;
              &::before{
                content: '';
                display: inline-block;
                width: 4px;
                height: 4px;
                border-radius: 2px;
                background-color: #c09846;
                position: absolute;
                top: 30px;

              }
            }
            .wh_isToday{
              background-color: #c09846;
              color:#fff;
              cursor:pointer;
            }
            .wh_chose_day{
              color: #000;
              border:solid 1px #c09846;
              background:#fff;
              cursor:pointer;
            }
          }
        }
      }
    }
  }
}
.popover-box{
  .dade-list{
    height: 180px !important;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    li{
      font-size: 12px;
      text-align: left;
      height:30px;
      line-height:30px;
      border-bottom:dashed 1px #eee;
      i{
        font-style: normal;
        display: inline-block;
        width: 70%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-indent:5px;

        &::before{
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #c09846;
          margin-right: 4px;
        }
      }
      span{
        display: inline-block;
        width: 25%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align:right;
      }
    }
  }
}
</style>
