<template>
  <!-- 公开客户页面的客户列表 lu-->
  <div class="yh_PublicCustomerList clearfix" v-width="40">
    <div class="company_logo fl">
      <div class="logo_box">
        <img :src="imgsrc" alt="公司图片">
        <span>{{company_name}}</span>
        <p>{{p_show ? "战略" : ""}}</p>
      </div>
    </div>
    <div class="company_main fl" v-width="180">
      <div class="main_top clearfix">
        <h3>
          <a href="javascript:void(0)">{{topInfoList.name}}</a>
        </h3>
        <a href="http://www.baidu.com">{{topInfoList.number}}</a>
        <span :title="topInfoList.name_">{{topInfoList.name_}}</span>
        <span :title="topInfoList.alias">{{topInfoList.alias}}</span>
        <span :title="topInfoList.marketValue">总市值(亿元)：{{topInfoList.marketValue}}</span>
        <span :title="topInfoList.TotalCapitalStock">总股本(亿股)：{{topInfoList.TotalCapitalStock}}</span>
        <span :title="topInfoList.CirculationStock">流通股(亿股)：{{topInfoList.CirculationStock}}</span>
      </div>
      <div class="main_center">
        <span :title="centerInfoList.zhuce">注册资本(元)：{{centerInfoList.zhuce}}</span>
        <span :title="centerInfoList.liutong">流通股质押数(万)：{{centerInfoList.liutong}}</span>
        <span :title="centerInfoList.shichang1">全市场总质押比例：{{centerInfoList.shichang1}}</span>
        <span :title="centerInfoList.chengli">成立日期：{{centerInfoList.chengli}}</span>
        <span :title="centerInfoList.shangshi">上市日期：{{centerInfoList.shangshi}}</span>
      </div>
      <div class="main_bottom clearfix">
        <h6>
          <a href="javascript:void(0)">部门标签：</a>
          <span v-for="(name,index) in names" :key="index" :title="name.name">{{name.name}}</span>
        </h6>
        <p>
          <span v-for="(more,index) in mores" :key="index" :title="more.name">{{more.name}}</span>
        </p>
      </div>
      <div class="register">
        <i class="fa fa-registered"></i>
        <a href="javascript:void(0)">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicCustomerList",
  props: [],
  data() {
    return {
      imgsrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524561178684&di=f53bbaa982ccf94aa2e5256692bdfb33&imgtype=0&src=http%3A%2F%2Fimg2.99114.com%2F2014%2F10181%2F6%2F12%2F39643183.jpg",
      company_name: "个人客户",
      p_show: true,
      topInfoList: {
        name: "晋西车轴股份有限公司",
        number: "600495",
        name_: "晋西车轴",
        alias: "铁船/船舶",
        marketValue: "87.1",
        TotalCapitalStock: "11.84",
        CirculationStock: "23.1"
      },
      centerInfoList: {
        zhuce: "1,223,323,232,11",
        liutong: "1,223",
        shichang1: "32%",
        chengli: "2000-12-17",
        shangshi: "2014-12-23"
      },
      names: [
        {
          name: "经纪业务总部"
        }, {
          name: "证券金融总部"
        }, {
          name: "研究院"
        }
      ],
      mores: [
        {
          name: "上海交易所"
        },
        {
          name: "A股"
        },
        {
          name: "主板"
        }
      ]
    };
  },
  created: {},
  methods: {

  }
};
</script>

<style scoped>
.yh_PublicCustomerList {
  /* margin: 0 20px; */
  height: 120px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #eeeee0; */
}
.company_logo {
  width: 140px;
  height: 100%;
  overflow: hidden;
}
.company_logo .logo_box {
  margin: 0 auto;
  margin-top: 25px;
  position: relative;
  width: 50px;
  height: 70px;
}
.company_logo .logo_box img {
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.company_logo .logo_box span {
  font-size: 12px;
  display: block;
  color: #919191;
}
.company_logo .logo_box p {
  position: absolute;
  width: 36px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 7px;
  background-color: #B26803;
  color: #ffffff;
  font-size: 12px;
  left: 7px;
  top: 4px;
}
/* 客户的信息展示区域 */
.company_main {
  height: 100%;
  position: relative;
}
/* 注册区域 */
.register {
  position: absolute;
  top: 32px;
  right: 6%;
  width: 60px;
  height: 16px;
  line-height: 16px;
  font-size: 13px;
  margin-right: 10px;
}
.register a {
  color: #676767;
}
.fa-registered {
  color: red;
}
/* 主要信息区域 */
.company_main span {
  height: 16px;
  line-height: 16px;
  margin-top: 7px;
  padding: 0 15px;
  color: #666666;
  border-left: 2px solid #919191;
  font-size: 12px;
}
.main_top {
  height: 30px;
  margin-top: 25px;
  line-height: 30px;
  overflow: hidden;
}
.main_top > * {
  float: left;
}
.main_top h3 a {
  font-size: 16px;
  color: #374b91;
  font-weight: bold;
  padding-right: 20px;
}
.main_top a:nth-child(2) {
  text-decoration: underline;
  color: #0000ff;
  padding-right: 10px;
}
.main_top a:nth-child(2):link {
  color: #ff00ff;
} /* 已被访问的链接 */
.main_center {
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  border-bottom:#DDD dotted 1px;
}
.main_center span:nth-child(1) {
  border: none;
  padding-left: 0;
}
.main_bottom {
  height: 30px;
  line-height: 30px;
}
.main_bottom span:nth-child(1) {
  border: none;
  padding-left: 0;
}
.main_bottom > * {
  float: left;
}
.main_bottom h6 {
  width: 70%;
  height: 100%;
}
.main_bottom h6 a {
  display: inline-block;
  font-size: 13px;
  color: #e7a04e;
}
.main_bottom h6 span {
  border: none;
  padding-left: 5px;
  padding-right: 0;
}
.main_bottom p {
  width: 30%;
  height: 100%;
}
.main_bottom p span {
  border: none;
  padding-left: 30px;
  padding-right: 0;
}
.main_bottom p span:nth-child(1) {
  border-left: 2px solid #919191;
  padding-left: 8px;
}
</style>