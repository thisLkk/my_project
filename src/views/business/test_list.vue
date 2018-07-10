<template>


<div>
    <link type="text/css" rel="stylesheet" href="/static/custom/base.49e1b9e3.css">
    <link rel="stylesheet" href="/static/custom/lufax-components.740bb1f1.css">
    <link type="text/css" rel="stylesheet" href="/static/custom/lufax-public.d13b4db7.css">
<link type="text/css" rel="stylesheet" href="/static/custom/lufax-lib.717f0a66.css">
            <link rel="stylesheet" href="/static/custom/lufax-components.lup2p.2e9d69dd.css">
                <link rel="stylesheet" href="/static/custom/index.9b7cec54.css" type="text/css">
            <link rel="stylesheet" type="text/css" href="/static/custom/index.06036816.css">


    <div class="filter-wrap">
        <dl class="clearfix invest-filter">
            <dt>剩余期限：</dt>
            <dd class="clearfix">
                <span class="all"><a :class="classes.restTime[4]" href="javascript:void(0);" @click="handleRestTime(4, 0, 0)" data-identity="period" data-val="" data-sk="syqxbuxian">不限</a></span>
                <ul class="selection clearfix">
                    <li><a :class="classes.restTime[0]" href="javascript:void(0);" @click="handleRestTime(0, 0, 360)" data-identity="period" data-val="0,360" data-sk="syqx0&amp;12">12个月以下</a></li>
                    <li><a :class="classes.restTime[1]" href="javascript:void(0);" @click="handleRestTime(1, 360, 540)" data-identity="period" data-val="360,540" data-sk="syqx12&amp;18">12个～18个月</a></li>
                    <li><a :class="classes.restTime[2]" href="javascript:void(0);" @click="handleRestTime(2, 540, 720)" data-identity="period" data-val="540,720" data-sk="syqx18&amp;24">18个～24个月</a></li>
                    <li><a :class="classes.restTime[3]" href="javascript:void(0);" @click="handleRestTime(3, 720, 0)" data-identity="period" data-val="720" data-sk="syqx24">24个月以上</a></li>
                </ul>
            </dd>
        </dl>
    </div>




<el-row>
    <el-col :span="2"><el-button type="text">排序：</el-button></el-col>
    <el-col :span="2">
        <el-button @click="handleSort('sell')">转让价格</el-button>
    </el-col>
    <el-col :span="2">
        <el-button @click="handleSort('rest')">剩余期限</el-button>
    </el-col>
    <el-col :span="2">
        <el-button @click="handleSort('change')">调价幅度</el-button>
    </el-col>
    <el-col :span="2">
        <el-button @click="handleSort('serve_percent')">信息服务费率</el-button>
    </el-col>

</el-row>





    <ul class="main-list" data-sk="p2p-transfer-list">
        <li class="product-list transfer-list clearfix" v-for="item in items">
    <dl class="product-info is-4col">
        <dt class="product-name">
            <el-checkbox v-model="item.checked"></el-checkbox>
            <a href="https://www.lup2p.com/secmkt/productDetail/p2p?productId=175029104446228&amp;from=lup2p" target="_blank" title="稳盈-安e+ 180321040807">{{item.name}}</a>
            <span class="ld-tag ld-tag-blue tooltip" title="本项目为转让项目">
    <span class="ld-tag-inner">转</span>
</span>
        </dt>

        <dd>
            <ul class="clearfix">
                <li class="interest-rate">
                    <span class="product-property-name">期望年化利率</span>
                    <p class="num-style">{{item.year}}%</p>
                </li>
                <li class="invest-period">
                    <span class="product-property-name">剩余期限</span>
                    <p>{{item.rest}}个月</p>
                </li>
                                <li class="product-value">
                    <span class="product-property-name">项目价值</span>
                    <p><span class="collection-currency">{{item.value}}元</span></p>
                </li>
                <li class="product-depreciation">
                    <span class="product-property-name">调价</span>
                    <p>
                        {{item.change}}元
                        <span class="product-depreciation-text">（降价 <b class="num-style">{{item.change_percent}}%</b>）</span>
                    </p>

                </li>

            </ul>
            <div class="acceptance-bank">
                <p>
                    <i class="ld-icon ld-icon-clock-cash"></i><span>预计下一收款日：2018-04-02</span>

                                        <span class="ml20">信息服务费率：{{item.serve_percent}}%/月</span>
                                    </p>
            </div>

        </dd>
    </dl>
    <div class="product-amount">
        <span class="product-property-name">转让价格</span>
            <p><em class="num-style">{{item.sell}}元</em></p>
    </div>
            <div class="product-status">
            <a href="https://www.lup2p.com/lup2p/productDetail?productId=175029104446228" target="_blank" class="ld-btn ld-btn-primary">投资</a>
        </div>


</li>
</ul>
</div>


</template>

<script>
import request from '@/utils/request';
export default {
    mounted: function() {
        this.updateData()
    },

    data() {
        return {
            items:[
            ],
            all_items: [],
            classes:{
                restTime:[
                    '',
                    '',
                    '',
                    '',
                    ''
                ]
            }

        }
    },
    methods: {
        handleSort(val) {
            if (val === 'sell') {
                this.items.sort((a,b) => {
                    return a.sell < b.sell?1:-1;
                })
            } else if (val === 'rest') {
                this.items.sort((a,b) => {
                    return a.rest < b.rest?1:-1;
                })

            } else if (val === 'change') {
                this.items.sort((a, b) => {
                    return a.change < b.change?1: -1;
                })
            } else {
                this.items.sort((a, b)=> {
                    return a.serve_percent < b.serve_percent?1:-1;
                })
            }
        },
        updateData() {
            var self = this;
            request({
                url: '/test/list',
                method: 'get',
                params: ''
            }).then(response => {
                //console.log(response.data);
                self.all_items = response.data.res;
                self.items = self.all_items;
                for (var i=0;i < self.classes.restTime.length; i++){
                    self.classes.restTime[i] = '';
                }

            })
        },
        handleRestTime(idx, left, right) {
            //console.log('click');
            var self = this;
            for (var i=0;i < self.classes.restTime.length; i++){
                if (i == idx) {
                    self.classes.restTime[i] = 'cur';
                } else {
                    self.classes.restTime[i] = '';
                }
            }

                var filtered = self.all_items.filter((el, idx, arr) => {
                    if (right == 0 && left != 0) {
                        return (el.rest * 30) > left;
                    } else if (right == 0 && left == 0){
                        return 1 > 0;
                    } else {
                        return (el.rest * 30) >= left && (el.rest * 30) < right;
                    }
                });
                self.items = filtered;
            }
        }
    }


</script>

<style>
.ld-btn {
    height: 30px;
}
</style>
