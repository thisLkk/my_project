<template>
  <Calendar ref="Calendar"
    v-on:choseDay="clickDay"
    v-on:changeMonth="changeDate"
    :markDate="signDade"
    ></Calendar>
</template>

<script>
  import Calendar from 'vue-calendar-component';

  export default {
    name: "CalendarNew",
    components: {
      Calendar
    },
    data() {
      return{
        signDade: ['2018/6/29','2018/6/30']
      }
    },

    methods:{
      /**
       * 选中一天
       */
      clickDay(data) {
        console.log(data); //选中某天
        this.$emit('dayClick', data);
      },

      /**
       * 切换月份
       */
      changeDate(data) {
        console.log(data); //左右点击切换月份
      },

      /**
       * 跳转到本月
       */
      clickToday(data) {
        console.log(data); //跳到了本月
      }
    }
  };
</script>

<style scoped>

</style>
