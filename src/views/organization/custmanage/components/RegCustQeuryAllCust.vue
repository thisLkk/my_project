<template>
  <div class="yh_RegCustQeuryMyDepartment">
    <el-card class="box-card">
      <el-form :label-position="labelPosition" size="mini" :model="form_data" :rules="rules" label-width="115px" ref="ruleForm">
        <el-row>
          <el-col :span="24">
            <div class="yh-headerdiv">
              <span class="yh-headerfl">
                <span class="yh-font">查询条件</span>
              </span>
              <span class="yh-headerfr">
                <div id="yh-advanced" @click="ssClick()">
                  <i :class="icon_"></i>
                </div>
              </span>
            </div>
          </el-col>
        </el-row>

        <template v-if="ssIsShow">

          <div class="yh-jbxx-content">
            <el-row class="yh_topSS">
              <el-col :span="14">
                <el-form-item label="快速搜索：" prop="var15" class="combo-col ">
                  <el-input placeholder="证券代码/证券简称/客户名称/证件号码" v-model="form_data.var16" />
                </el-form-item>
              </el-col>
              <el-col  :offset="1" :span="3">
                <div style="text-align: right;" class="clearfix">
                  <el-button size="mini" id="accurate" v-on:click="onButtonClick33(form_data)">精确</el-button>
                  <el-button size="mini" id="vague" v-on:click="onButtonClick30(form_data)">模糊</el-button>
                </div>

              </el-col>
            </el-row>


            <el-row>
              <el-col :span="7">
                <el-form-item label="一级行业：" prop="var18">
                  <el-select placeholder="请选择" v-model="form_data.var18" size="mini">
                    <el-option :key="item.key" :label="item.key" :value="item.key" v-for="item in var18_items" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="二级行业：" prop="var18">
                  <el-select placeholder="请选择" v-model="form_data.var18" size="mini">
                    <el-option :key="item.key" :label="item.key" :value="item.key" v-for="item in var18_items" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="机构：" prop="var18">
                  <!-- <el-option :key="item.key" :label="item.key" :value="item.key" v-for="item in var18_items" /> -->
                  <inputButtonCE/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="潜客状态：">
                  <el-checkbox-group v-model="form_data.qkzt">
                    <el-checkbox-button :key="item.key" :label="item.key" v-for="item in qkzt_items">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="交易所：">
                  <el-checkbox-group v-model="form_data.jys">
                    <el-checkbox-button :key="item.key" :label="item.key" v-for="item in jys_items">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="股票市场：">
                  <el-checkbox-group v-model="form_data.gpsc">
                    <el-checkbox-button :key="item.key" :label="item.key" v-for="item in gpss_items">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="14">
                <el-form-item label="板块：">
                  <el-checkbox-group v-model="form_data.bk">
                    <el-checkbox-button :key="item.key" :label="item.key" v-for="item in bk_items">{{item.value}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <div style="text-align: right;" class="clearfix">
                <div class="yh-fold-noactive" id="yh-change" @click="gjssClick()">
                  <i :class="icon"></i>
                </div>
                <el-button size="mini" id="el_query" v-on:click="onButtonClick33(form_data)">查询</el-button>
                <el-button size="mini" id="el_reset" v-on:click="onButtonClick30(form_data)">重置</el-button>
                </div>
              </el-col>

            </el-row>

            <template v-if="gjssIsShow">
              <el-row>
                <el-col :span="7">
                  <el-form-item label="市值(亿元)：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="yh_maxLabel" label="流通股质押数（万）：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="7">
                  <el-form-item label="总股本(亿元)：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="yh_maxLabel" label="全部质押数（万）：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="7">
                  <el-form-item label="流通股数：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="yh_maxLabel" label="流通股质押比例（%）：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="7">
                  <el-form-item label="办公地址：" class="combo-col ">
                    <el-input v-model="form_data.var16" id="bgdzInput" resize=" both" />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item class="yh_maxLabel" label="流通股质押比例（%）：">
                    <inputRange></inputRange>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <el-form-item label="条件标签：" prop="tjbq">
                    <el-checkbox-group v-model="form_data.tjbq">
                      <el-checkbox-button v-for="item in tjbq_items" :label="item.key" :key="item.key">{{item.value}}</el-checkbox-button>
                    </el-checkbox-group>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <el-form-item label="部门标签：" prop="var25">
                    <el-checkbox-group v-model="form_data.var25">
                      <el-checkbox-button :key="item.key" :label="item.key" v-for="item in var25_items">{{item.value}}</el-checkbox-button>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <el-form-item label="业务标签：" prop="var26">
                    <el-checkbox-group v-model="form_data.var26">
                      <el-checkbox-button :key="item.key" :label="item.key" v-for="item in var26_items">{{item.value}}</el-checkbox-button>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="padding-top:20px">
                <el-col :span="7">
                  <el-form-item label="备注：" prop="bz" class="combo-col">
                    <el-input placeholder="" v-model="form_data.bz" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </div>
        </template>
      </el-form>
    </el-card>


  </div>
</template>

<script>
import global_ from "@/common/Global";
import { doRequestPost, doRequestGet } from "@/utils/request";
import inputRange from "@/views/organization/components/InputRange";
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee";

export default {
  name: "RegCustQeuryMyDepartment",
  components: {
    inputRange,
    inputButtonCE
  },
  data() {
    return {
      labelPosition: "left",
      ssIsShow: true,
      gjssIsShow: false,
      icon: "fa fa-angle-double-down", //展示隐藏二级筛选功能
      icon_: "fa fa-angle-double-up", //展示隐藏一级筛选功能
      form_data: {
        var2: "",
        var7: "",
        var8: "",
        var9: "",
        var10: "",
        bz: "",
        qkzt: ['1'],
        zckhlx: ['1'],
        zckhly: ['1'],
        jys: ['1'],
        gpsc: ['1'],
        bk: ['1'],
        tjbq: ['1'],
        var25:['1'],
        var26:['1']
      },
      var7_items: [
        {
          value: "选择1",
          key: "1"
        },
        {
          value: "选择2",
          key: "2"
        }
      ],
      var9_items: [
        {
          value: "选择1",
          key: "1"
        },
        {
          value: "选择2",
          key: "2"
        }
      ],
      var10_items: [
        {
          value: "选择1",
          key: "1"
        },
        {
          value: "选择2",
          key: "2"
        }
      ],

      var18_items: [
        {
          value: "客户号",
          key: "1"
        },
        {
          value: "客户名称",
          key: "2"
        },
        {
          value: "证件号码",
          key: "3"
        }
      ],

      qkzt_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "正常开发",
          key: "2"
        },
        {
          value: "成功转正",
          key: "3"
        },
        {
          value: "沉淀搁置",
          key: "4"
        }
      ],

      jys_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "上市公司",
          key: "2"
        },
        {
          value: "非上市公司",
          key: "3"
        },
        {
          value: "个人",
          key: "4"
        }
      ],

      gpss_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "A股",
          key: "2"
        },
        {
          value: "B股",
          key: "3"
        },
        {
          value: "个人",
          key: "4"
        }
      ],

      bk_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "主板",
          key: "2"
        },
        {
          value: "中小板",
          key: "3"
        },
        {
          value: "创业板",
          key: "4"
        }
      ],
      tjbq_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "经纪 ",
          key: "2"
        },
        {
          value: "资管 ",
          key: "3"
        },
        {
          value: "投行 ",
          key: "4"
        },
        {
          value: "自营 ",
          key: "5"
        }
      ],
      var25_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "经纪业务总部",
          key: "2"
        },
        {
          value: "衍生产品总部",
          key: "3"
        },
        {
          value: "产品中心",
          key: "4"
        },
        {
          value: "证券金融总部",
          key: "5"
        },
        {
          value: "投资研究",
          key: "6"
        },
        {
          value: "银河金汇",
          key: "7"
        },
        {
          value: "投资银行总部",
          key: "8"
        },
        {
          value: "债券投资部",
          key: "9"
        }
      ],
      var26_items: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "创业板 ",
          key: "2"
        },
        {
          value: "B股",
          key: "3"
        },
        {
          value: "沪港通 ",
          key: "4"
        },
        {
          value: "深港通 ",
          key: "5"
        },
        {
          value: "新三板 ",
          key: "6"
        },
        {
          value: "金大宗 ",
          key: "7"
        },
        {
          value: "场外期权 ",
          key: "8"
        },
        {
          value: "收益互换 ",
          key: "9"
        },
        {
          value: "买入转售 ",
          key: "10"
        },
        {
          value: "PB ",
          key: "11"
        },
        {
          value: "托管 ",
          key: "12"
        },
        {
          value: "融资融券 ",
          key: "13"
        },
        {
          value: "股票质押",
          key: "14"
        },
        {
          value: "天天利",
          key: "15"
        }
      ],
      rules: {}
    };
  },
  methods: {
    onButtonClick9(data) {
      doRequestPost(global_.rest_path + "", data)
        .then(
          function(response) {
            global_.notify(this, "模糊", response.status.code);
            global_.backPage(this);
          }.bind(this)
        )
        .catch(function(error) {
          //console.log(error);
        });
    },
    onButtonClick10(data) {
      doRequestPost(global_.rest_path + "", data)
        .then(
          function(response) {
            global_.notify(this, "精确", response.status.code);
            global_.backPage(this);
          }.bind(this)
        )
        .catch(function(error) {
          //console.log(error);
        });
    },
    ssClick() {
      this.ssIsShow = !this.ssIsShow;
      if (this.ssIsShow) {
        this.icon_ = "fa fa-angle-double-up";
        return;
      } else {
        this.icon_ = "fa fa-angle-double-down";
      }
    },
    gjssClick() {
      this.gjssIsShow = !this.gjssIsShow;
      if (this.gjssIsShow) {
        this.icon = "fa fa-angle-double-up";
      } else {
        this.icon = "fa fa-angle-double-down";
      }
    },
    lastQuery(data) {}
  },
  mounted: function() {}
};
</script>

<style scoped>
.yh-headerdiv {
  height: 40px;
  border-bottom: 1px solid #eeeee9;
}

.yh-headerfl {
  float: left;
  width: 70px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #cb6c2f;
}

.yh-headerfr {
  float: right;
  height: 40px;
  line-height: 40px;
}

.yh_inputWidth input {
  width: 30px;
}

.yh_topSS {
  margin-top: 20px;
}

.bgdzInput parent {
  width: 90%;
}

/* .el-form-item div div{
  width:97%;
} */

#yh-advanced {
  padding-left: 7px;
  cursor: pointer;
  box-sizing: border-box;
}

.yh-fold-noactive {
  float: right;
  margin-left: 15px;
  cursor: pointer;
}

.yh_color_precise {
  background-color: #cf6929;
  color: white;
}

.yh_color_query {
  background-color: #a76e39;
  color: white;
}

.yh_color_reset {
  background-color: #afa8a2;
  color: white;
}
</style>
