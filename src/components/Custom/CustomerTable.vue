<template>
<ul>
  <li v-for="(data, index) in datas">
  <div class="yh-assets clearfix">
    <div class="yh-assets-role fl" >
      <div class="yh-role-inp">
        <input type="checkbox" @click="handleSelect(index)">
      </div>
      <div class="yh-role-img">
        <img src="/static/custom/logo.png" alt="用户头像">
        <div class="yh-role-name">
          {{data.clientType}}
        </div>
        <div class="yh-role-category">
          {{data.status}}
        </div>
      </div>
    </div>
    <div class="yh-assets-main fl">
      <div class="yh-main-info clearfix">
        <div class="yh-main-info-self fl">
          <ul class="clearfix">
            <li class="name">{{data.name}}</li>
            <li class="sex">
              <img src="/static/custom/logo.png" alt="性别符号">
            </li>
            <li class="number">{{data.number}}</li>
            <li class="age">{{data.age}}</li>
            <li class="vip">{{data.level}} {{data.money}}</li>
            <li class="time">{{data.birth}}</li>
            <li class="place">开户（{{data.birth}}）</li>
            <li class="trend"><a href="javascript:void(0)">资产走势</a></li>
            <li class="money"><a href="javascript:void(0)">日均资产</a></li>
            <li class="calendar"><a href="javascript:void(0)">财富日历</a></li>
          </ul>
        </div>
        <div class="yh-main-info-inte fr">
          <div class="networth"><a href="javascript:void(0)">高净值</a></div>
          <div class="integral"><a href="javascript:void(0)">积</a></div>
        </div>
      </div>
      <div class="yh-main-data">
        <ul class="clearfix">
          <li class="netassets">
            <div class="title">净资产</div>
            <div class="number"><span>{{data.real}}</span>万元</div>
          </li>
          <li class="netassets">
            <div class="title">佣金率</div>
            <div class="number"><span>{{data.rate}}</span>%</div>
          </li>
          <li class="netassets">
            <div class="title">昨日资产余额</div>
            <div class="number"><span>{{data.remain}}</span>万元</div>
          </li>
          <li class="netassets">
            <div class="title">昨日可用资金</div>
            <div class="number"><span>{{data.avaible}}</span>万元</div>
          </li>
          <li class="netassets">
            <div class="title">昨日产品市值</div>
            <div class="number"><span>{{data.oldProdValue}}</span>元</div>
          </li>
          <li class="netassets">
            <div class="title">昨日证券市值</div>
            <div class="number"><span>{{data.oldTicketValue}}</span>元</div>
          </li>
          <li class="netassets">
            <div class="title">负债</div>
            <div class="number"><span>{{data.oldTicketValue}}</span>元</div>
          </li>
          <div class="profitloss">
            <div class="profit">昨日盈利证券:<span>{{data.oldPlusTicket}}</span>市值: <span>{{data.oldPlusTicketValue}}</span>元</div>
            <div class="loss">昨日亏损证券:<span>{{data.oldMinusTicket}}</span>市值: <span>{{data.oldMinusTicketValue}}</span>元</div>
          </div>
          <div class="developer">
            <div class="name">开发人:<span>{{data.handlePerson}}</span></div>
            <div class="name_sever">服务人:<span>{{data.servPerson}}</span></div>
          </div>
        </ul>
      </div>
      <div class="yh-main-business clearfix">
        <div class="business fl">
          <div class="open">
            已开通业务(<span>3</span>): <p>{{data.ownBusiness}}</p>
          </div>
          <div class="recommend">
            推荐开通业务(<span>2</span>): <p>{{data.recommendBusiness}}</p>
          </div>
        </div>
        <div class="contact fr">
          <div class="date clearfix">
            <p>上次联系日期： <span class="nowdate">{{data.lastContractDate}}</span>近90天联系次数：<span class="count">{{data.ContractCount}}</span></p>
          </div>
          <div class="mode">
            <p>
              <a href="javascript:void(0)">电话联系</a>
              <a href="javascript:void(0)">发送短信</a>
              <a href="javascript:void(0)">添加服务记录</a>
              <a href="javascript:void(0)">App消息发送</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </li>
  </ul>
</template>
<script>
  export default {
    name:'Assets',
    created () {
      var self = this;
      self.status = [];
      for(var idx=0; idx < self.datas.length; idx++) {
        self.status.push(false);
      }
    },
    props: {
      datas: {
        type: Array,
        default: function() {
          return []
          }
        }
      
    },
    data () {
      return {
        status: [],
        default_item: {
            name: '李小强',
            status: '正常',
            clientType: '个人客户',
            number: '020223920',
            age: '39岁',
            level: 'VIP-A',
            money: '100~200万',
            birth: '1994-12-14',
            place: '北京营业部',
            real: '6.15',
            rate: '0.17',
            remain: '80.5',
            avaible: '80.25',
            oldProdValue: '10,000',
            oldTicketValue: '10,1000',
            debt: '109,092',
            oldPlusTicket: '600517',
            oldPlusTicketValue: '10000',
            oldMinusTicket: '600517',
            oldMinusTicketValue: '10000',
            handlePerson: '易小平',
            servPerson: '易小平',
            ownBusiness: '证券走势、泸市分级基金、天天利',
            recommendBusiness: '证券走势、泸市分级基金',
            lastContractDate: '2017-01-02',
            ContractCount: '2'
        }        
      }
    },
    methods: {
      handleSelect(index) {
        var self = this;
        if (self.status[index]) {
          self.status[index] = false;
        } else {
          self.status[index] = true;
        }
        var res = [];
        for (var idx = 0; idx < self.status.length; idx++) {
          if (self.status[idx]) {
            res.push(self.datas[idx]);
          }
        }

        this.$emit("valueChange", res);
      }
    }
  }
</script>
<style scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  font-weight: normal;
}

input {
  background: none;
  outline: none;
  border: 0px;
  text-indent: 10px;
}

a {
  text-decoration: none;
  color: #000;
}

body {
  line-height: 1;
  font-family: "微软雅黑", "Franklin Gothic Medium", "Arial Narrow", Arial,
    sans-serif;
}

ol,
ul {
  list-style: none;
}

li {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

/* remember to define focus styles! */

:focus {
  outline: 0;
}

/* remember to highlight inserts somehow! */

ins {
  text-decoration: none;
}

del {
  text-decoration: line-through;
}

/* tables still need 'cellspacing="0"' in the markup */

table {
  border-collapse: collapse;
  border-spacing: 0;
}


.yh-assets {
  min-width:1000px;
  height: 140px;
  box-sizing: border-box;
  padding: 0px;
}
.yh-assets .yh-assets-role{
  width:10%;
  height: 150px;
  background: #ccc;
  /* overflow: hidden; */
  position: relative;
}
.yh-assets .yh-assets-role .yh-role-inp{
  position: absolute;
  top:35%;
  left:5%;
}
.yh-assets .yh-assets-role .yh-role-img {
  position: absolute;
  top:20%;
  left:30%;
  width:50%;
  height: 60%;
  /* background: red; */
}
.yh-assets .yh-assets-role .yh-role-img img {
  display: block;
  height:60%;
  width:100%;
}
.yh-assets .yh-assets-role .yh-role-img .yh-role-name{
  font-size:10px;
  text-align: center;
  color:#333;
  width: 100%;
  height:20px;
  overflow: hidden;
}
.yh-assets .yh-assets-role .yh-role-img .yh-role-category{
  width:35px;
  height:18px;
  line-height: 18px;
  background: rgb(245, 161, 6);
  font-size: 10px;
  color:#fff;
  text-align: center;
  margin:5px auto;
  border-radius: 50px;
}
/* 主要数据位置 */
.yh-assets .yh-assets-main {
  width:90%;
  height: 150px;
  background: #ddd;
  box-sizing: border-box;
  padding: 10px 0;
}
/* 主要数据个人信息区 */
.yh-assets .yh-assets-main .yh-main-info {
  width: 100%;
  height:30px;
  overflow: hidden;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self{
  width:86%;
  height:30px;
  box-sizing: border-box;
  border-bottom:1px dashed #ccc;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li {
  float: left;
  line-height: 22px;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.name {
  font-size: 16px;
  color: blue;
  font-weight: bold;
  padding-right:5px;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.sex {
  padding-top:4px;
  width:20px;
  height:16px;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul {
  height:22px;
  overflow: hidden;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.sex img{
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.number, .yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.place{
  padding-left:10px;
  font-size: 10px;
}
.yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.vip, .yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.age, .yh-assets .yh-assets-main .yh-main-info .yh-main-info-self ul li.time{
  box-sizing: border-box;
  padding-left:8px;
  font-size: 10px;
  border-left: 1px solid #000;
  height: 12px;
  line-height:12px;
  margin-top:5px;
  margin-left: 5px;
}
.yh-main-info-self ul li.trend a,.yh-main-info-self ul li.money a,.yh-main-info-self ul li.calendar a{
  margin-left: 15px;
  font-size: 13px;
  color: blue;
}
.yh-main-info-inte {
  padding-right: 20px;
  font-size: 13px;
}
.yh-main-info-inte div{
  display: inline-block;
  height:16px;
  line-height: 16px;
}
.yh-main-info-inte div.networth a{
  display: block;
  color: blue;
  border: 1px solid blue;
  width:45px;
  text-align: center;
}
.yh-main-info-inte div.integral a{
  display: block;
  width: 16px;
  background: rgb(243, 207, 3);
  text-align: center;
  padding: 1px;
  color: #fff;
}
/* 主要数据资产区 */
.yh-main-data {
  width: 100%;
  padding: 10px 0;
  height:60px;
  overflow: hidden;
  box-sizing: border-box;
}
.yh-main-data ul li {
  position: relative;
  float: left;
  width:9%;
  height: 50px;
  overflow: hidden;
  font-size: 12px;
  box-sizing: border-box;
  /* background: red; */
  /* border-right: 1px  */
}
.yh-main-data ul li .title{
  width: 100%;
  height:14px;
  color: #000;
  text-align: center;
}
.yh-main-data ul li .number {
  margin-top: 15px;
  text-align: center;
}
.yh-main-data ul li:nth-child(1),.yh-main-data ul li:nth-child(2),.yh-main-data ul li:nth-child(7) {
  width:8%;
}
.yh-main-data ul li:nth-child(1) .number span{
  color: red;
  padding-right: 3px;
  font-weight: bold;
}
.yh-main-data ul li:nth-child(2) .number span,.yh-main-data ul li:nth-child(7) .number span{
  color: rgb(255, 102, 0);
  padding-right: 3px;
  font-weight: bold;
}
.yh-main-data ul li:nth-child(3) .number span,.yh-main-data ul li:nth-child(5) .number span,.yh-main-data ul li:nth-child(6) .number span{
  color: rgb(68, 0, 255);
  padding-right: 3px;
  font-weight: bold;
}
.yh-main-data ul li:nth-child(4) .number span{
  color: red;
  padding-right: 3px;
  font-weight: bold;
}
.yh-main-data ul li:after{
  content: "";
  display: block;
  position: absolute;
  top: 8px;
  right: 1px;
  /* float: left; */
  height:36px;
  border-right: 1px solid #666;
}
.yh-main-data ul .profitloss{
  font-size: 12px;
  float: left;
  width:27%;
  height: 50px;
  overflow: hidden;
  box-sizing: border-box;
  padding-left:5px; 
}
.yh-main-data ul .profitloss .profit{
  line-height: 23px;
  height: 20px;
  margin-bottom: 7px;
  overflow: hidden;
}
.yh-main-data ul .profitloss .loss{
  height: 20px;
  line-height: 21px;
  overflow: hidden;
}
.yh-main-data ul .profitloss .profit span {
  box-sizing: border-box;
  padding: 0 8px;
  color: red;
  font-weight: bold;
}
.yh-main-data ul .profitloss .loss span {
  box-sizing: border-box;
  padding: 0 8px;
  color: green;
  font-weight: bold;
}
/* 开发人样式 */
.yh-main-data ul .developer{
  font-size: 12px;
  float: right;
  height: 50px;
  overflow: hidden;
  box-sizing: border-box;
  padding-right:20px; 
  color: #999;
}
.yh-main-data ul .developer .name {
  line-height: 23px;
  height: 20px;
  margin-bottom: 7px;
  overflow: hidden;
}
.yh-main-business {
  width: 100%;
  height: 40px;
  overflow: hidden;
  font-size: 12px;
  color: #444;
}
.yh-main-business .business .open,.yh-main-business .recommend{
  color: rgb(250, 115, 4);
  margin-top: 5px;
}

.yh-main-business .business .open p,.yh-main-business .business .recommend p{
  display: inline-block;
  color: #444;
}
.yh-main-business .contact {
  color: #444;
  padding-right: 20px;
}
.yh-main-business .contact .date p{
  float: right;
}
.yh-main-business .contact  p{
  margin-top: 5px;
}
.yh-main-business .contact .count {
  color: red;
  font-weight: bold;
}
.yh-main-business .contact .nowdate{
  margin-right: 8px;
  padding-right: 8px;
  border-right:1px solid #444;
}
.yh-main-business .contact .mode a{
  color: #444;
  height: 15px;
  display: inline-block;
  padding: 0 8px;
  border-right:1px solid #444;
  padding-left:20px;
}
.yh-main-business .contact .mode p a:nth-child(1),.yh-main-business .contact .mode p a:nth-child(2),.yh-main-business .contact .mode p a:nth-child(3){
   background: url(/static/custom/logo.png) no-repeat left bottom;
   background-size: 15px 12px;
}
.yh-main-business .contact .mode p a:nth-child(4){
   border-right:none;
   background: url(/static/custom/logo.png) no-repeat left bottom;
   background-size: 15px 12px;
}
</style>
