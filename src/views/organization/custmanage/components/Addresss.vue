<template>
  <!-- 360客户信息-列表查询条件-客户管理-地址管理 -->
  <div class="yh-address-table">
    <div class="table-header clearfix">
      <h3>{{title}}</h3>
      <a class="set" href="javascript:void(0)" @click="setMain()">{{title_set}}</a>
      <a href="javascript:void(0)">
        <el-button type="text" @click="addOpen('form_data')">{{title_new}}</el-button>
      </a>

      <!-- 新增分组弹窗-->
      <div>
        <el-dialog title="客户地址新增" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
          <div class="activity_dialog clearfix yh-jbxx-content">

            <el-form :model="form_data" label-width="118px" ref="form_data" size="mini" label-position="right">
              <el-row>
                <el-col :offset="1" :span="6">
                  <el-form-item label="国家：">
                    <select class="sleect_" v-model="prov">
                      <option v-for="(option,index) in arr" :key="index" :value="option.key">
                        {{ option.name }}
                      </option>
                    </select>
                  </el-form-item>
                </el-col>
                <el-col :offset="2" :span="6">
                  <el-form-item label="省、直城市：">
                    <select class="sleect_" v-model="city">
                      <option v-for="(option,index) in cityArr" :key="index" :value="option.key">
                        {{ option.name }}
                      </option>
                    </select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="市：">
                    <select class="sleect_" v-model="district" v-if="district">
                      <option v-for="(option,index) in districtArr" :key="index" :value="option.key">
                        {{ option.name }}
                      </option>
                    </select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="10">
                  <el-form-item label="地址类型：" prop="AddrType">
                    <el-select placeholder="请选择" v-model="form_data.AddrType" size="mini">
                      <el-option :key="item.key" :label="item.label" :value="item.value" v-for="item in typeList" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                  <el-form-item label="邮政编码：" prop="PostCode">
                    <el-input v-model="form_data.PostCode" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1" :span="21">
                  <el-form-item label="描述：" prop="DetlAddr">
                    <el-input type="textarea" v-model="form_data.DetlAddr" :rows="3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="AddClick" size="mini">
              <i class="fa fa-check diologBtn"></i>确 定</el-button>
            <el-button @click="dialogVisible = false" size="mini">
              <i class="fa fa-close diologBtn"></i> 取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div v-if="tableData!=null" class="ser-team-table">
      <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" stripe size="mini" max-height=800
        style="width: 100%">
        <el-table-column fixed="left" label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">
              <i class="fa fa-edit edit_icon">
                <span>编辑</span>
              </i>
            </el-button>
            <el-button @click="delClick(scope.row)" type="text" size="small">
              <i class="fa fa-trash del_icon">
                <span>删除</span>
              </i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否主要" width="80" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.MainAddrFlag=="1" ? "√" : ""}}</div>
          </template>
        </el-table-column>
        <el-table-column label="办公地址" show-overflow-tooltip width="120" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.AddrType }}</div>
          </template>
        </el-table-column>
        <el-table-column label="国家" show-overflow-tooltip width="80" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.NatiCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="省" width="80" align="center">
          <template slot-scope="scope">
              <div>{{ scope.row.ProvinceCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="市" width="80" align="center">
          <template slot-scope="scope">
              <div>{{ scope.row.CityCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="具体地址" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.DetlAddr }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">{{ scope.row.DetlAddr }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="邮编" width="100" align="center">
          <template slot-scope="scope">
              <div>{{ scope.row.PostCode }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ser_page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10,15, 20]"
        :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import inputButtonCE from "@/views/organization/custmanage/components/InputButtonChooseEmployee";
import {
  getAddressList,
  geteditAddressList,
  editAddressList,
  addAddressList,
  delAddressList,
  mainAddressList
} from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
export default {
  name: "Addresss",
  components: {
    inputButtonCE
  },
  data() {
    return {
      title: "地址",
      title_new: "新建",
      title_set: "设为主要",
      uuid:"",//所选客户的UUID
      mainUuid: null, //设为主要的Uuid
      mainAddrType: null, //设为主要的AddrType
      mainSysCode: null, //设为主要的SysCode
      dialogVisible: false, //新建的窗口
      addclick: false, //新增的判断
      editclick: false, //编辑的判断
      currentPage: 1, //默认第一页
      pagesize: 10, //显示多少条
      total: null, //数据总条数
      form_data: {
        PostCode: "", //邮政编码
        AddrType: "", //地址类别
        DetlAddr: "" //描述
      },
      arr: [
        {
          name: "选择国家",
          key: "111",
          sub: [
            {
              name: "请选择",
              key: "99",
              sub: []
            },
            {
              name: "请选择",
              key: "88",
              sub: []
            }
          ],
          type: 1
        },
        {
          name: "北京",
          key: "77",
          sub: [
            {
              name: "请选择",
              key: "66",
              sub: []
            },
            {
              name: "北京",
              key: "55",
              sub: [
                {
                  name: "请选择",
                  key: "44"
                },
                {
                  name: "东城区",
                  key: "33"
                },
                {
                  name: "西城区",
                  key: "22"
                },
                {
                  name: "其他",
                  key: "11"
                }
              ],
              type: 0
            }
          ],
          type: 1
        },
        {
          name: "广东",
          key: "9",
          sub: [
            {
              name: "请选择",
              key: "8",
              sub: []
            },
            {
              name: "广州",
              key: "7",
              sub: [
                {
                  name: "请选择",
                  key: "6"
                },
                {
                  name: "越秀区",
                  key: "5"
                }
              ],
              type: 0
            },
            {
              name: "珠海",
              key: "4",
              sub: [
                {
                  name: "请选择",
                  key: "3"
                },
                {
                  name: "香洲区",
                  key: "2"
                }
              ],
              type: 0
            },
            {
              name: "其他",
              key: "1"
            }
          ],
          type: 1
        }
      ],
      prov: "111",
      city: "",
      district: "",
      cityArr: [],
      districtArr: [],
      tableData: null,
      cliar: [
        {
          span: "活动编号",
          concate: "s"
        }
      ],
      sexList: [
        //性别类型
        {
          value: "02",
          label: "男"
        },
        {
          value: "03",
          label: "女"
        }
      ],
      typeList: [
        //联系人类型
        {
          value: "01",
          label: "办公地址"
        },
        {
          value: "02",
          label: "通讯地址"
        }
      ]
    };
  },
  props:['parentPage'],
  created() {
    this.init();
  },
  methods: {
    init() {
      //由于无数据  所以上方为写死custNo  有数据后直接用下方五行替换即可
        if("regCust"==this.parentPage){//用注册客户uuid
          this.uuid =this.$store.getters.Uuid_Reg_Cust;
        }else{//使用正式客户uuid
          this.uuid =this.$store.getters.Uuid_formal;
        }

      var getContactList = {
        param: {

          Uuid: this.uuid //可以从store取出来
        },
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        }
      };
      getAddressList(getContactList)
        .then(response => {
          //console.log(response);
          this.total = response.PageInfo.Total;
          this.tableData = response.Data;
          this.prov = response.Data.NatiCode;
          this.city = response.Data.ProvinceCode;
          this.district = response.Data.CityCode;
        })
        .catch(() => {
          // this.$confirm("访问出错(地址信息)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    handleCurrentChange(val) {
      //当前页
      this.currentPage = val;
      this.init();
    },
    handleSizeChange(val) {
      //当前要展示多少条
      this.pagesize = val;
      this.init();
    },
    handleCurrentChangeTable(val) {
      if (val != null) {
        this.mainUuid = val.Uuid; //设为主要的Uuid
        this.mainAddrType = val.AddrType; //设为主要的AddrType
        this.mainSysCode = val.SysCode; //设为主要的SysCode
      }
    },
    setMain() {
      //设为主要点击事件
      if (this.mainAddrType == null) {
        this.$confirm("请选择需要设置的列点击！")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      } else {
        var main = {
          param: {
            Uuid: this.mainUuid,
            AddrType: this.mainAddrType,
            SysCode: this.mainSysCode,
            MainAddrFlag: "1"
          }
        };
        this.$confirm("是否确定设为主要", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            //确定设置
            mainAddressList(main)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "设置成功!"
                });
                this.init();
              })
              .catch(() => {
                //alert("访问出错 联系信息");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消设置"
            });
          });
      }
    },
    editClick(row) {
      //点击编辑按钮的时候回显相应数据
      //console.log(row);
      var geteditlist = {
        param: {
          Uuid: row.Uuid,
          AddrType: row.AddrType,
          SysCode: row.SysCode
        }
      };
      geteditAddressList(geteditlist)
        .then(response => {
          this.form_data = response.Data;
          this.prov = response.Data.NatiCode;
          this.city = response.Data.ProvinceCode;
          this.district = response.Data.CityCode;
        })
        .catch(() => {
          //alert("访问出错 联系信息");
        });
      this.editclick = true;
      this.dialogVisible = true;
    },
    addOpen() {
      //点击新增的时候打开弹窗
      for (const key in this.form_data) {
        //置空
        if (this.form_data.hasOwnProperty(key)) {
          this.form_data[key] = "";
        }
      }
      this.addclick = true;
      this.dialogVisible = true;
    },
    AddClick() {
      //新增与编辑窗口 发送请求，暂时没写请求路径   编辑和新增需要给后台点击360视图的那个人的客户号
      if (this.editclick) {
        var edit = {
          param: this.form_data
        };
        edit.param.NatiCode = this.prov;
        edit.param.ProvinceCode = this.city;
        edit.param.CityCode = this.district;
        //console.log(edit);
        editAddressList(edit) //编辑
          .then(response => {
            this.init();
          })
          .catch(() => {
            this.$confirm("访问出错(活动编辑信息)")
              .then(_ => {
                done();
              })
              .catch(_ => {});
          });
      } else if (this.addclick) {
        var edit = {
          param: this.form_data
        };
        edit.param.Uuid = this.uuid;
        edit.param.SysCode = "OSP";
        edit.param.NatiCode = this.prov;
        edit.param.ProvinceCode = this.city;
        edit.param.CityCode = this.district;
        addAddressList(edit) //新增
          .then(response => {
            this.init();
          })
          .catch(() => {
            this.$confirm("访问出错(活动编辑信息)")
              .then(_ => {
                done();
              })
              .catch(_ => {});
          });
      }
      this.addclick = false;
      this.editclick = false;
      this.dialogVisible = false;
    },
    // 弹出窗确认关闭按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //点击删除出现的提示
    delClick(row) {
      var del = {
        param: {
          Uuid: row.Uuid,
          AddrType: row.AddrType,
          SysCode: row.SysCode
        }
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAddressList(del)
            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            })
            .catch(() => {
              this.$confirm("访问出错(活动编辑信息)")
                .then(_ => {
                  done();
                })
                .catch(_ => {});
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updateCity: function() {
      //三级联动城市
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.key == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      this.city = this.cityArr[1].key;
    },
    updateDistrict: function() {
      //三级联动城市
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.key == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].key
      ) {
        this.district = this.districtArr[1].key;
      } else {
        this.district = "";
      }
    }
  },
  beforeMount: function() {
    //三级联动城市
    this.updateCity();
    this.updateDistrict();
  },
  watch: {
    //三级联动城市
    prov: function() {
      this.updateCity();
      this.updateDistrict();
    },
    city: function() {
      this.updateDistrict();
    }
  }
};
</script>

<style scoped>
/* 联系人信息 */

.yh-address-table {
  margin: 20px;
  min-height: 300px;
  box-sizing: border-box;
  border: 4px solid #eeeeee;
  padding-top: 20px;
  position: relative;
}

.set {
  color: #ffffff;
}

.set:hover {
  color: #b3844e;
  background: #ffffff;
}

.sleect_ {
  color: #999999;
  border-radius: 4px;
  height: 28px;
  width: 105px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
}

/* 图标的大小。只能在这里才能层叠ele样式 */

.fa {
  font-size: 16px;
}

.diologBtn {
  font-size: 16px;
}

.ser-team-table {
  text-align: center;
  width: 100%;
  /* min-height: 200px; */
  margin-top:10px;
  box-sizing: border-box;
}

.ser-team-table table {
  width: 100%;
  padding: 0 20px;
}

.ser-team-table .el-table td div {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ser-team-table table thead th {
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  font-weight: bold;
}

.ser-team-table table tbody td {
  height: 40px;
  line-height: 40px;
}

.ser-team-table table tbody tr:nth-child(even) {
  background: #eeeeee;
}
</style>
