<template>
  <!-- 公共组件-机构选择弹出框 -->
  <div class="yh_inputButtonChooseOrg">

    <section>
      <el-input placeholder="请选择" v-model="chooseNames" :disabled="true">
        <el-button slot="append" @click="dialogVisible = true" icon="el-icon-search"></el-button>
      </el-input>
      <el-dialog title="机构选择" :visible.sync="dialogVisible" width="800px">
        <div class="activity_dialog clearfix">
          <el-form :label-position="labelPosition" :model="form_data" label-width="80px"  ref="ruleForm" size="small">
            <el-row>
              <el-col :span="2">
                <div class="yh-jbxxx">
                  <ul>
                    <li>查询条件</li>
                  </ul>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="8">
                <el-form-item label="机构" prop="S_NAME">
                  <el-input placeholder="请选择" v-model.trim="form_data.S_NAME" />
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="8">
                <el-form-item label="员工工号" prop="S_GENDER">
                  <el-input placeholder="" v-model.trim="form_data.S_GENDER" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :offset="2" :span="8">
                <el-form-item label="员工姓名" prop="S_AGE">
                  <el-input placeholder="" v-model.trim="form_data.S_AGE" />
                </el-form-item>
              </el-col>
              <el-col :offset="5" :span="5">

                <el-button size="small" type="warning" v-on:click="onButtonClick10(form_data)">查询</el-button>
                <el-button size="small" type="info" v-on:click="onButtonClick11(form_data)">重置</el-button>
              </el-col>
            </el-row>
            <el-row class="yh_padding_top_20">
              <el-col :span="2">
                <div class="yh-jbxxx">
                  <ul>
                    <li>查询结果</li>
                  </ul>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :offset="2" :span="20">
                <el-table :data="table_data._data_list_" border max-height="500" height="200px" stripe style="width: 100%" highlight-current-row
                  @row-click="rowClick">
                  <el-table-column label="员工号" prop="ygh" />
                  <el-table-column label="员工姓名" prop="ygxm" />
                  <el-table-column label="联系电话" prop="lxdh" />
                  <el-table-column label="职位名称" prop="zwmc" />
                  <el-table-column label="所属机构" prop="ssjg" />
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-col :offset="2" :span="20" class="rowright">
                <el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </el-col>
            </el-row>


          </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="doChoose">
            <i class="fa fa-check diologBtn"></i>选 择</el-button>
          <el-button @click="doClose">
            <i class="fa fa-close diologBtn"></i>关 闭</el-button>
        </span>
      </el-dialog>

    </section>
  </div>
</template>

<script>
  export default {
    name: "InputButtonChooseOrg",
    data() {
      return {
        labelPosition: "left",
        dialogVisible: false,
        chooseName: "",
        chooseNames: "",
        form_data: {
          S_NAME: "",
          S_GENDER: "",
          S_AGE: "",
          var10: "",
          var11: "",
          var12: "",
          var13: "",
          var14: "",
          var8: "",
          var9: ""
        },
        table_data: {
          _data_list_: [{
              ygh: "000001",
              ygxm: "巨牙海民",
              lxdh: "15899999999",
              zwmc: "adf",
              ssjg: "123421",
              selected: false
            },
            {
              ygh: "000002",
              ygxm: "拉比克",
              lxdh: "15899999999",
              zwmc: "adf",
              ssjg: "123421",
              selected: false
            }
          ]
        }
      };
    },
    methods: {
      doClose: function () {
        this.dialogVisible = false;
      },
      doChoose: function () {
        this.chooseNames = this.chooseName;
        this.doClose();
      },
      rowClick: function (row, event, column) {
        this.chooseName = row.ygxm;
      }
    }
  };

</script>

<style scoped>
  .rowright {
    text-align: right;
  }

  .yh_padding_top_20 {
    padding-top: 20px;
  }

  .el-table {
    max-height: 350px;
    min-height: 200px
  }

  .button-row {
    margin-top: 30px;
    padding-bottom: 30px;
  }

  .yh-button-close {
    margin-left: 20% !important;
  }


  .yh-jbxxx li {
    width: 100%;
    float: left;
    margin-left: 35px;
    list-style-image: url(../../../assets/organization/customermanage/ico.jpg);

  }

  .yh-jbxxx li {
    font-family: "微软雅黑";
    font-size: 14px;
    color: #333333;
    font-weight: bold
  }
.el-row{
 margin-top: 2%;
}
</style>
