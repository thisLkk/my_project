<template>
  <div class="yh-archives clearfix">
    <div class="yh-archives-all">
      <div class="yh-archives-all-header">
        <label>
          <input type="checkbox" @click="selectAll" :checked="checked" />全选
        </label>
        <div class="yh-archives-all-header-sort">
          <a href="javascript:void(0)">企业类型</a>
        </div>
        <a class="yh-register" href="javascript:void(0)">
          <i class="fa fa-registered"></i>
          <span>注册</span>
        </a>
        <a class="yh-add-labels" href="javascript:void(0)">
          <i class="fa fa-plus"></i>添加标签</a>
        <a class="yh-export" href="javascript:void(0)">
          <i class="fa fa-download"></i>导出</a>
      </div>
      <div class="yh-archives-all-main clearfix" v-for="(item, index) in proData" :key="index">
        <div class="yh-check-inp fl">
          <input type="checkbox" :value="index" v-model="selectArr">
        </div>
        <div class="main" v-width="120">
          <div class="yh-archives-institution fl">
            <div class="yh-institution-img">
              <img :src="item.logo" alt="用户头像">
              <div class="yh-institution-name">
                {{item.info}}
              </div>
            </div>
          </div>
          <!-- 客户与机构头像展示区结束 -->
          <!-- 客户的信息区域 -->
          <div class="yh-archives-main fl">
            <div class="yh-main-info clearfix">
              <div class="yh-main-info-self fl">
                <ul class="clearfix">
                  <li class="name">李小强</li>
                  <li class="number">020223920</li>
                  <li class="sex">男</li>
                  <li class="age">47岁</li>
                  <li class="education">本科</li>
                  <li class="type">证件类型：身份证</li>
                  <li class="type_number">证件号码：412564178602125634</li>
                </ul>
              </div>
              <div class="yh-main-info-add fr">
                <a href="javascript:void(0)">
                  <i class="iconfont icon-xierushujuku" style="margin-right: 10px; color: red;"></i>添加服务记录</a>
              </div>
            </div>
            <div class="yh-main-tel">
              <ul class="clearfix">
                <li class="name">主联系人：张一舟</li>
                <li class="tel">电话：13412373472</li>
                <li class="email">邮箱：lixiaoqiang../../../../126.com</li>
              </ul>
            </div>
            <div class="yh-main-department clearfix">
              <div class="department fl">
                <h6>部门标签：</h6>
                <span>经纪业务部</span>
                <span>债券投资部</span>
                <span>债券投资部</span>
                <span>债券投资部</span>
                <span>债券投资部</span>
              </div>
              <div class="contact fr">
                <span>归属机构：北京中山东路营业部</span>
                <span>服务经理：张晓晓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Institution",
  props:[
    {
      
    }
  ],
  data() {
    return {
      proData: [
        {
          info: '个人客户',
          logo: require('../../../../assets/organization/customermanage/logo.png'),
        },

        {
          info: '机构组织',
          logo: require('../../../../assets/organization/customermanage/logo.png'),
        },

        {
          info: '个人客户',
          logo: require('../../../../assets/organization/customermanage/logo.png'),
        },

        {
          info: '个人客户',
          logo: require('../../../../assets/organization/customermanage/logo.png'),
        },

      ],
      selectArr: [],
      checked: false,
      
    };
  },
  watch: {
    selectArr(curVal) {
      if (curVal.length == this.proData.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },

  methods: {
    selectAll(event) {
      if (!event.currentTarget.checked) {
        this.selectArr = [];
      } else { //实现全选
        this.selectArr = [];
        this.proData.forEach((item, i) => {
          this.selectArr.push(i);
        });
      }
    }
  },
};

</script>
<style scoped>
.yh-archives {
  /* margin-top: 10px; */
  min-height: 120px;
  box-sizing: border-box;
  /* border: 3px solid #eeeeee; */
}

/*信息总区域*/

.yh-archives-all {
  width: 100%;
}

/* 客户操作选择区域 */

.yh-archives-all-header {
  width: 100%;
  height: 40px;
  border-bottom: 3px solid #eeeeee;
}
.yh-archives-all-header label input {
  margin-right: 6px;
}
.yh-archives-all-header label {
  display: inline-block;
  height: 100%;
  width: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
.yh-archives-all-header-sort {
  display: inline-block;
  width: 120px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  background: #b3844e;
  margin-right: 10px;
}
.yh-archives-all-header-sort a {
  color: #ffffff;
}
.yh-register,
.yh-add-labels,
.yh-export {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 47px;
  line-height: 25px;
  text-align: center;
  color: blue;
}
.yh-register i {
  position: absolute;
  font-size: 22px;
  left: 6px;
  top: 2px;
}
.yh-add-labels i {
  position: absolute;
  font-size: 19px;
  left: -12px;
  top: 0px;
}
.yh-export i {
  position: absolute;
  font-size: 20px;
  left: 6px;
  top: 0px;
}
.yh-add-labels {
  color: #999999;
}
.yh-export {
  color: #999999;
  height: 100px;
}
/* 客户信息展示区域 */

.yh-check-inp {
  width: 50px;
  min-height: 120px;
}
.yh-check-inp input {
  margin-left: 20px;
  margin-top: 50px;
}
.yh-archives-all-main {
  width: 100%;
  min-height: 120px;
  background:#FFF;
}
.main {
  width: 90%;
  float: left;
  border-bottom: 1px solid #dddddd;
}

.yh-archives .yh-archives-institution {
  width: 78px;
  height: 120px;
  position: relative;

}

.yh-archives .yh-archives-institution .yh-institution-img {
  position: absolute;
  top: 15%;
  left: 0%;
  width: 56px;
}

.yh-archives .yh-archives-institution .yh-institution-img img {
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
  margin-bottom: 8px;
}

.yh-archives .yh-archives-institution .yh-institution-img .yh-institution-name {
  font-size: 10px;
  text-align: center;
  color: #999999;
  width: 100%;
  height: 20px;
  overflow: hidden;
}

/* 主要数据位置 */

.yh-archives .yh-archives-main {
  width: 91%;
  height: 120px;
  box-sizing: border-box;
}

/* 主要数据个人信息区 */

.yh-archives .yh-archives-main .yh-main-info {
  width: 100%;
  max-height: 30px;
  overflow: hidden;
  margin-top: 25px;
}

.yh-archives .yh-archives-main .yh-main-info .yh-main-info-self {
  max-width: 86%;
  box-sizing: border-box;
}

.yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li {
  float: left;
  padding: 0 10px;
  font-size: 13px;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  border-left: 1px solid #999999;
}

.yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li.name {
  margin-top: 0;
  font-size: 16px;
  color: #374b91;
  line-height: 20px;
  height: 20px;
  font-weight: bold;
  border: none;
}

.yh-archives .yh-archives-main .yh-main-info .yh-main-info-self ul li.number {
  border: none;
}

.yh-main-info-add {
  max-width: 15%;
  padding-right: 20px;
  font-size: 13px;
}

.yh-main-info-add a {
  display: inline-block;
  color: #676767;
  padding-left: 20px;
  height: 16px;
  line-height: 20px;
}

/* 客户联系区域 */

.yh-main-tel {
  width: 100%;
  padding: 10px 0;
  max-height: 50px;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 16px;
}

.yh-main-tel ul li {
  float: left;
  font-size: 13px;
  box-sizing: border-box;
  height: 14px;
  line-height: 14px;
  padding: 0 10px;
  border-left: 1px solid #666;
}

.yh-main-tel ul li:nth-child(1) {
  border: none;
}

/* 部门区域 */

.yh-main-department {
  width: 100%;
  height: 20px;
  overflow: hidden;
  font-size: 12px;
  color: #444;
  margin-top: 10px;
}

.yh-main-department .department {
  max-width: 62%;
  height: 20px;
  overflow: hidden;
  font-size: 13px;
}

.yh-main-department .department h6 {
  display: inline-block;
  padding-left: 10px;
  color: #e7a04e;
}

.yh-main-department .department span {
  padding: 0 5px;
}

.yh-main-department .contact {
  max-width: 40%;
  color: #919191;
  padding: 0 10px;
  box-sizing: border-box;
}

.yh-main-department .contact span {
  padding: 0 10px;
}

.yh-main-department .contact .date p {
  float: right;
}

.yh-main-department .contact p {
  margin-top: 5px;
}

.yh-main-department .contact .count {
  color: red;
  font-weight: bold;
}

.yh-main-department .contact .nowdate {
  margin-right: 8px;
  padding-right: 8px;
  border-right: 1px solid #444;
}

.yh-main-department .contact .mode a {
  color: #444;
  height: 15px;
  display: inline-block;
  padding: 0 8px;
  border-right: 1px solid #444;
  padding-left: 20px;
}

.yh-main-department .contact .mode p a:nth-child(1),
.yh-main-department .contact .mode p a:nth-child(2),
.yh-main-department .contact .mode p a:nth-child(3) {
  background: url(../../../../assets/organization/customermanage/logo.png)
    no-repeat left bottom;
  background-size: 15px 12px;
}

.yh-main-department .contact .mode p a:nth-child(4) {
  border-right: none;
  background: url(../../../../assets/organization/customermanage/logo.png)
    no-repeat left bottom;
  background-size: 15px 12px;
}
</style>
