<template>
  <!-- 360客户信息-列表查询条件-客户管理-详细信息 -->
  <div class="yh-activity-table">
    <div class="table-header clearfix">
      <h3>详细信息</h3>
        <a href="javascript:void(0)" v-show="editFlag" class="yh-header-button-edit"  @click="editFlag = false">
        编辑
        </a>
        <a href="javascript:void(0)" v-show="!editFlag" class="yh-header-button-other"  @click="doCancel">
        取消
        </a>
        <a href="javascript:void(0)" v-show="!editFlag" class="yh-header-button-other"  @click="doSave">
        保存
        </a>
    </div>
    <div class="yh_form_row yh-jbxx-content" ref="infoDiv">
        <el-form ref="refname" :model="info" label-position="right" label-width="165px" size="mini">
                    
            <el-row>
                <el-col :span="6">
                    <el-form-item label="注册资本：">
                        <el-input :disabled="editFlag" v-model="info.RegCptl" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="交易所：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.Exchg">
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in exchg_items" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="股票市场：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.StkMkt" >
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in stkMkt_items" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="板块：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.Plate">
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in plate_items" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
      
            <el-row>
                <el-col :span="6">
                    <el-form-item label="市值：">
                        <el-input :disabled="editFlag" v-model="info.MktVal" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="省份：">
                        <!-- <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.Province" size="medium">
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in var7_items" />
                        </el-select> -->
                        <el-input :disabled="editFlag" :title=info.Province v-model="info.Province" placeholder=""></el-input>
                    
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="城市：">
                        <!-- <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.City" size="medium">
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in var8_items" />
                        </el-select> -->
                        <el-input :disabled="editFlag" :title=info.City v-model="info.City" placeholder=""></el-input>

                    </el-form-item>
                </el-col>
                
                <el-col :span="6">
                    <el-form-item label="企业性质：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.CorpNature">
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in CorpNature_items" />
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>
       
            <el-row>
<!--                 <el-col :span="6">
                    <el-form-item label="产业分类：">
                        <el-input :disabled="editFlag" v-model="info.IndustryClass" placeholder=""></el-input>
                        </el-form-item>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item label="成立日期：">
                        <el-date-picker
                        v-model="info.SetupDate"
                        type="date"
                        value-format="yyyyMMdd"
                        format="yyyyMMdd"
                        placeholder="选择日期"
                        :disabled="editFlag" 
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="上市日期：">
                        <el-date-picker
                        v-model="info.ListDate"
                        value-format="yyyyMMdd"
                        format="yyyyMMdd"
                        type="date"
                        placeholder="选择日期"
                        :disabled="editFlag" 
                        >
                        </el-date-picker></el-form-item>
                </el-col>
                
                <el-col :span="6">
                    <el-form-item label="主营业务：">
                        <el-input :disabled="editFlag" v-model="info.MainBiz" placeholder=""></el-input></el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="主营产品类型：">
                        <el-input :disabled="editFlag" v-model="info.MainPrdType" placeholder=""></el-input></el-form-item>
                </el-col>
            </el-row>
      
            <el-row>
                <el-col :span="6">
                    <el-form-item label="主营产品名称：">
                        <el-input :disabled="editFlag" v-model="info.MainPrdName" placeholder=""></el-input></el-form-item>
                </el-col>
                
                <el-col :span="6">
                    <el-form-item label="重要程度：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.custPotentialBasicInfo.ImpDegree">
                            <el-option key="" label="请选择" value="" />
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in zycd_items" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item 
                      label="最近一年净利润(万元)："
                      prop="RecentYear1NetProfit10Ky"
                    >
                      <el-input :disabled="editFlag" :title="info.custPotentialfincae.RecentYear1NetProfit10Ky" v-model.number="info.custPotentialfincae.RecentYear1NetProfit10ky" placeholder="">
                      </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item 
                      label="最近一年营业总收入(万元)："
                      prop="RecentYear1BizIncome10ky"
                    >
                        <el-input :disabled="editFlag" :title="info.custPotentialfincae.RecentYear1BizIncome10ky" v-model.number="info.custPotentialfincae.RecentYear1BizIncome10ky" placeholder="">
                        </el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="交易平台：">
                        <el-input :disabled="editFlag" v-model="info.TrdPlatform" placeholder=""></el-input></el-form-item>
                </el-col> -->
            </el-row>
      
            <el-row>
                
                <el-col :span="6">
                    <el-form-item 
                      label="最近一年资产负债率(%)："
                      prop="Recent1YearAssetLiabRate"
                    >
                        <el-input :disabled="editFlag" :title="info.custPotentialfincae.Recent1YearAssetLiabRate" v-model.number="info.custPotentialfincae.Recent1YearAssetLiabRate" placeholder=""></el-input></el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="最近一年ROE(%)：" prop="RecentYear1RoeRatio">
                        <el-input :disabled="editFlag" :title="info.custPotentialfincae.RecentYear1RoeRatio" v-model.number="info.custPotentialfincae.RecentYear1RoeRatio" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="6">
                    <el-form-item 
                      label="最近两年ROE(%)："
                      prop="RecentYear2RoeRatio"
                    >
                        <el-input :disabled="editFlag" :title="info.custPotentialfincae.RecentYear2RoeRatio" v-model.number="info.custPotentialfincae.RecentYear2RoeRatio" placeholder=""></el-input></el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item 
                      label="最近三年ROE(%)："
                      prop="RecentYear3RoeRatio"
                    >
                      <el-input :disabled="editFlag" :title="info.custPotentialfincae.RecentYear3RoeRatio" v-model.number="info.custPotentialfincae.RecentYear3RoeRatio" placeholder=""></el-input></el-form-item>
                </el-col>

               <!--  <el-col :span="6">
                    <el-form-item label="Wind债券一级分类：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.WindBondPriClass" size="medium">
                            <el-option :key="item.key" :label="item.label" :value="item.value" v-for="item in var19_items" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Wind债券二级分类：">
                        <el-select placeholder="请选择"  :disabled="editFlag" v-model="info.WindBondSndClass" size="medium">
                            <el-option :key="item.key" :label="item.label" :value="item.value" v-for="item in var20_items" />
                        </el-select>
                    </el-form-item>
                </el-col> -->
            </el-row>
      
            <el-row>
               <!--  <el-col :span="6">
                    <el-form-item label="债务主体：">
                        <el-input :disabled="editFlag" :title=info.DebtMainBody v-model="info.DebtMainBody" placeholder=""></el-input></el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="国家及地区：">
                        <el-cascader :disabled="editFlag" 
                            :options="var20_items"
                            v-model="info.CountryAndDistrict">
                        </el-cascader>
                        </el-form-item>
                </el-col> -->
               
            </el-row>
      
            <el-row>
                <el-col :span="24">
                    <el-form-item label="办公地址：">
                        <el-input :disabled="editFlag" :title=info.WorkAddr v-model="info.WorkAddr" placeholder=""></el-input></el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="注册地址：">
                        <el-input :disabled="editFlag" :title=info.RegAddr v-model="info.RegAddr" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="经营范围：">
                        <el-input :disabled="editFlag" v-model="info.BusiScope" placeholder=""></el-input></el-form-item>
                </el-col> 
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注：">
                        <el-input :disabled="editFlag" v-model="info.Remk" placeholder=""></el-input></el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
  </div>
</template>
<script>
import {regCustManageGetInfoPotentialOrg,regCustInfoDetailSave
} from "@/api/organization/custmanage/regcustmanage/RegCustManage/index.js";
import DICTYPE from '@/utils/dictTypes.js';
import { dictFilter,dictItems,treeDictItems } from "@/filters";
  export default {
    name: "PanoramicViewdetailInfoRegCust",
    data() {
      return {
        editFlag:true,
        info:{custPotentialfincae:{}},
        //详细信息保存
        form_data_detail:
        {
          pageInfo: null,
          param: {
          }
        },
        
        //交易所
        exchg_items: dictItems(DICTYPE.CTCCD0223),
        
        //股票市场
        stkMkt_items: dictItems(DICTYPE.CTCCD0221),

        //企业性质
        CorpNature_items: dictItems(DICTYPE.CTCCD0094),
        //重要程度    
        zycd_items: dictItems(DICTYPE.CTCCD0213),
        
        var3_items: [
        {
          value: "A股",
          key: "1"
        },
        {
          value: "B股",
          key: "2"
        },
        {
          value: "C股",
          key: "3"
        }
      ],

        //板块
      plate_items: [
        {
          label: "主板",
          value: "01"
        },
        {
          label: "中小企业板",
          value: "02"
        },
        {
          label: "创业板",
          value: "03"
        },
      ],

        var7_items: [
        {
          value: "北京",
          key: "1"
        },
        {
          value: "上海",
          key: "2"
        },
        {
          value: "广州",
          key: "3"
        }
      ],
        var8_items: [
        {
          value: "昌平",
          key: "1"
        },
        {
          value: "海淀",
          key: "2"
        },
        {
          value: "朝阳",
          key: "3"
        }
      ],
        var9_items: [
        {
          value: "公公企业",
          key: "1"
        },
        {
          value: "私营企业",
          key: "2"
        },
        {
          value: "家族产业",
          key: "3"
        }
      ],var19_items: [
        {
          label: "短期融资券",
          value: "1"
        },
        {
          label: "长期",
          value: "2"
        },
        {
          label: "其他 ",
          value: "3"
        }
      ],var20_items: [
        {
          label: "超短期融资债券",
          value: "1"
        },
        {
          label: "超长",
          value: "2"
        },
        {
          label: "其他 ",
          value: "3"
        }
      ],
        var20_items: [ {
            value:'0',
            label: '中国',
            children: [{
              label:"北京",
              value: '01',
            },{
              label:"香港",
              value: '02',
            },{
              label:"台湾",
              value: '03',
            },{
                label: '江苏',
                value:'04',
                children: [{
                    label:"南京",
                    value: '041',
                },{
                    label:"吴江",
                    value: '042',
                },{
                    label:"苏州",
                    value: '043',
                }]
            }]
        },{
            label:'美国',
            value:'1',
            children:[
                {
                    label:"加利福尼亚",
                    value:'11'
                }
            ]
        },],
         };
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            //拉取个人信息接口
            // //console.log(this.$store.getters.Uuid)//拿到客户点得UUid
            this.regCustManageGetInfoPotentialOrg();
        },

      /**
       * 获取显示数据接口
       */
      regCustManageGetInfoPotentialOrg() {
        var query = {
          param: {
            Uuid: this.$store.getters.Uuid_Reg_Cust
          }
        };
        regCustManageGetInfoPotentialOrg(query)
          .then(response => {
          //this.$emit("init",{loading:false});//关闭父组件的loading加载
              let data = response.Data;
              if (data) {
                  // 格式化显示数据
                  this.formatData(data);
                  //console.log(data);
              }
              //console.log(response.Data)
          })
          .catch(() => {//可以用作与提示
              this.$confirm("访问出错panoaraHead")
              .then(_ => {
              done();
              })
              .catch(_ => {});
          }); 
      },

      /**
       * 格式化显示数据
       * data 列表显示的数据
       */
      formatData(data) {
        this.info = data;
        this.info.SetupDate = (null == data.SetupDate?'':data.SetupDate.toString());
        this.info.ListDate = (null==data.ListDate?'':data.ListDate.toString());
      },

      doCancel(){
        //Object.assign(this.$data, this.$options.data());
        this.init();
        this.editFlag=true; 
      },

      /**
       * 保存数据
       */
      doSave(){
        //Object.assign(this.$data, this.$options.data());
        if (this.chenkData()) {
          this.form_data_detail.param = this.info;
          regCustInfoDetailSave(this.form_data_detail)
            .then(response => {
                // alert("保存成功");
            })
            .catch(() => {//可以用作与提示
                this.$confirm("访问出错panoaraHead")
                    .then(_ => {
                    done();
                    })
                    .catch(_ => {});
            }); 
            this.editFlag=true;
        }
      },

      /**
       * 校验必填数据
       */
      chenkData() {
        let custPotentialfincae = this.info.custPotentialfincae;
        let RecentYear1NetProfit10ky = custPotentialfincae.RecentYear1NetProfit10ky;
        let RecentYear1BizIncome10ky = custPotentialfincae.RecentYear1BizIncome10ky;
        let Recent1YearAssetLiabRate = custPotentialfincae.Recent1YearAssetLiabRate;
        let RecentYear1RoeRatio = custPotentialfincae.RecentYear1RoeRatio;
        let RecentYear2RoeRatio = custPotentialfincae.RecentYear2RoeRatio;
        let RecentYear3RoeRatio = custPotentialfincae.RecentYear3RoeRatio;

        if (custPotentialfincae !== '' && RecentYear1BizIncome10ky !== '' && Recent1YearAssetLiabRate !== '' && RecentYear1RoeRatio !== '' &&RecentYear2RoeRatio !== '' && RecentYear3RoeRatio !== '') {
            if (isNaN(RecentYear1NetProfit10ky)) {
              this.$message({
                showClose: true,
                message: '最近一年净利润为数字类型',
                type: 'error'
              });
              return false;
            } else if (isNaN(RecentYear1BizIncome10ky)) {
              this.$message({
                showClose: true,
                message: '最近一年营业总收入为数字类型',
                type: 'error'
              });
              return false;
            } else if (isNaN(Recent1YearAssetLiabRate)) {
              this.$message({
                showClose: true,
                message: '最近一年资产负债率为数字类型',
                type: 'error'
              });
              return false;
            } else if (isNaN(RecentYear1RoeRatio)) {
              this.$message({
                showClose: true,
                message: '最近一年ROE数字类型',
                type: 'error'
              });
              return false;
            } else if (isNaN(RecentYear2RoeRatio)) {
              this.$message({
                showClose: true,
                message: '最近两年ROE数字类型',
                type: 'error'
              });
              return false;
            } else if (isNaN(RecentYear3RoeRatio)) {
               this.$message({
                showClose: true,
                message: '最近三年ROE数字类型',
                type: 'error'
              });
              return false;
            }
            return true;
        } else {
            return true;
        }
      }
    }
  };

</script>

<style scoped>
  /* 服务团队信息 */

  .yh-activity-table {
      margin:10px 15px;
      box-sizing: border-box;
      border: 1px solid #ebeef5;
      padding-top: 0px;
      position: relative;
      background:#FFF;
      padding:0 20px;
      border-radius:3px;
  }  
  /* 本页面的ele  i的图标区 */
  .fa {
    font-size: 16px;
  }
  
.diologBtn {
  font-size: 16px;
}
.yh_form_row{
    padding: 20px;
}
.el-input,.el-select{
    width: 100%;
}
.yh-header-button-other{
    margin-right: 10px;
}
.yh-header-button-edit{/*ouxinsu*/
}
</style>
