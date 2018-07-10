<template>
  <!-- 360传统页面 协同信息 协同需求列表 -->
  <div class="yh-demand-table">
    <div class="table-header clearfix">
      <h3>协同商机</h3>
      
      <router-link to='/Collaborationmanage/Collaborationbusoppmanage/MySynergyBusinessOpportunity' class="a_width100">去处理商机</router-link>      
      <!-- <a href="javascript:void(0)">新建</a> -->
    </div>
    <div v-if="tableData!=null" class="ser-team-table">
      <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" stripe size="mini"  style="width: 100%">
        <el-table-column label="商机名称"  width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BusoppName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.BusoppName }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="服务类别" width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.SrvCate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.SrvCate }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="业务类别"  width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BizCate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.BizCate }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发起机构"  width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.OrgFullName  }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.OrgFullName  }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发起人"  width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.InitiatorName   }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.InitiatorName   }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="当前状态"  width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.BusoppSts }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.BusoppSts }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="发起时间"  width="" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.InitiateDate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="mini">
                  {{ scope.row.InitiateDate }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ser_page" style="text-align: right;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <div v-if="zanshibuyong">
      <div class="table-header clearfix">
        <h3>协同商机详细信息</h3>
      </div>
      <div class="table-show">
        <el-tabs v-model="tab_select" type="card">
          <el-tab-pane label="协同商机详情" name="first">
            <div class="table-header clearfix">
              <h3>协同商机信息</h3>
            </div>
            <div class="table-show">

              <div class="public_info yh-jbxx-content">
                <el-form label-position="center" label-width="150px" :model="public_info" size="mini">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="正式客户:">
                        <el-autocomplete disabled="true" style="width:100%;" v-model="public_info.formal" placeholder="请输入正式客户姓名">
                          <i class="el-icon-search el-input__icon" slot="suffix">
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="注册客户:">
                        <el-autocomplete disabled="true" style="width:100%;" v-model="public_info.registered" placeholder="请输入注册客户姓名">
                          <i class="el-icon-search el-input__icon" slot="suffix">
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="客户联系人:">
                        <el-input disabled="true" v-model="public_info.lianxiren_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="发起对接人:">
                        <el-input disabled="true" v-model="public_info.faqiren_name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="客户联系人电话:">
                        <el-input disabled="true" v-model="public_info.lianxiren_tel"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="发起对接人电话:">
                        <el-input disabled="true" v-model="public_info.faqiren_tel"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="客户联系人职务:">
                        <el-input disabled="true" v-model="public_info.lianxiren_job"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="发起对接人职务:">
                        <el-input disabled="true" v-model="public_info.faqiren_job"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="发起人:">
                        <el-input v-model="public_info.faqiren_" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="发起人机构:">
                        <el-input v-model="public_info.faqiren_jigou" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="发起日期:">
                        <el-input v-model="public_info.time" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="bussines_info  yh-jbxx-content" v-for="(item,index) in bussines_info" :key="index">
                <el-form label-position="center" label-width="150px" :model="item" size="mini">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="协同商机名称:">
                        <el-input disabled="true" v-model="item.business_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="协同商机响应模式:">
                        <el-select disabled="true" v-model="item.ResponseMode" placeholder="请选择" size="mini">
                          <el-option v-for="item_ in ResponseModeList" :key="item_.value" :label="item_.value" :value="item_.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="服务类别:">
                        <el-select disabled="true" v-model="item.ServiceCate" placeholder="请选择" size="mini">
                          <el-option v-for="item_ in ServiceCateList" :key="item_.value" :label="item_.value" :value="item_.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="业务类别:">
                        <el-select disabled="true" v-model="item.BusinessCate" placeholder="请选择" size="mini">
                          <el-option v-for="item_ in BusinessCateList" :key="item_.value" :label="item_.value" :value="item_.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="协同机构:">
                        <el-autocomplete disabled="true" style="width:100%;" v-model="item.Coordination" placeholder="请输入机构姓名">
                          <i class="el-icon-search el-input__icon" slot="suffix">
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="优先级:">
                        <el-select disabled="true" v-model="item.priority" placeholder="请选择" size="mini">
                          <el-option v-for="item_ in priorityList" :key="item_.value" :label="item_.value" :value="item_.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="预计交易日期:">
                        <el-date-picker disabled="true" v-model="item.expectedData" type="date" placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="3">
                      <el-form-item label="预计成交金额(万元):">
                        <el-input disabled="true" v-model="item.Turnover"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-form-item label="协同商机描述:">
                        <el-input disabled="true" type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="请输入需要描述的信息..." v-model="item.describe">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-form-item label="协同需求描述:">
                        <el-input disabled="true" type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="填写特殊要求，如建议协同机构对接团队或人员等" v-model="item.proposal">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="21">
                      <el-form-item label="上传需求报告:">
                        <el-upload class="upload-demo yh-upload-auto yh-upload-only-show" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                          :auto-upload="false" :file-list="fileList" :on-preview="handlePreview">
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--
                <el-row>
                  <el-col :span="21">
                    <el-button type="" @click="download('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526015362296&di=9f7fefe6a760960cc59cce0b393d3bfa&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b26f599106e10000002129eb2896.JPG','aaa1.JPG', 'image/JPG')"></el-button>

                  <a href="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526015362296&di=9f7fefe6a760960cc59cce0b393d3bfa&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b26f599106e10000002129eb2896.JPG" download="w3logo">
                    3333333333
                  </a>
                  </el-col>
                </el-row> -->
                </el-form>
              </div>

            </div>
          </el-tab-pane>
          <el-tab-pane label="进展登记" name="second">

            <div class="table-header clearfix">
              <h3>进展登记</h3>
            </div>
            <div class="table-show">

              <el-table :data="tableData1" class="yh_table_auto_f" stripe size="mini" max-height=800 style="width: 100%">
                <el-table-column label="当前阶段" show-overflow-tooltip width="" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>{{ scope.row.dqjd }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">
                          {{ scope.row.dqjd }}
                        </el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="跟踪描述" show-overflow-tooltip width="" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>{{ scope.row.gzms }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">
                          {{ scope.row.gzms }}
                        </el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="填写人" show-overflow-tooltip width="" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>{{ scope.row.txr }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">
                          {{ scope.row.txr }}
                        </el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="反馈时间" show-overflow-tooltip width="" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>{{ scope.row.fksj }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">
                          {{ scope.row.fksj }}
                        </el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="ser_page" style="text-align: right;">
              <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { getCollaborativeList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { dictItems, dictFilter } from "@/filters"; //--------------------------数据字典的方法
import DICTYPE from "@/utils/dictTypes.js"; //---------------------------------数据字典的方法
export default {
  name: "CollaborativeDemandTable",
  data() {
    return {
      tab_select: "first",
      zanshibuyong: false, //这个是暂时根据需求暂时隐藏此项
      showicon: true,
      icon: "iconfont icon-sey-toptriangleS",
      currentPage: 5, //当前页
      pagesize: 10, //总页数
      total: 1, //总页数
      form_data: {
        pageInfo: {
          PageNum: 1,
          PageSize: 10,
          Total: 0,
          OrderBy: "",
          Pages: 0
        },
        param: {
          custNo: ""
        }
      },
      tableData: null,
      public_info: {
        lianxiren_name: "张三",
        faqiren_name: "李四",
        lianxiren_tel: "18616542366",
        faqiren_tel: "17432232434",
        lianxiren_job: "总经理",
        faqiren_job: "副总经理",
        faqiren_: "王五",
        faqiren_jigou: "金融街营业部",
        time: "2018-04-15",
        formal: "", //正式客户
        registered: "" //注册客户
      },
      ResponseModeList: [
        //协同商机相应模式
        {
          value: "抢单模式",
          key: "0"
        },
        {
          value: "指定模式",
          key: "1"
        }
      ],
      ServiceCateList: [
        //服务类别
        {
          value: "融资服务",
          key: "0"
        },
        {
          value: "投资服务",
          key: "1"
        },
        {
          value: "综合金融服务",
          key: "2"
        }
      ],
      BusinessCateList: [
        //业务类别
        {
          value: "股票质押",
          key: "0"
        },
        {
          value: "债券金融",
          key: "1"
        },
        {
          value: "资产证券化",
          key: "2"
        }
      ],
      priorityList: [
        {
          value: "紧急",
          key: "1"
        },
        {
          value: "高",
          key: "2"
        },
        {
          value: "中",
          key: "3"
        },
        {
          value: "低",
          key: "4"
        }
      ],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      formalCustomer: [], //正式客户管理下的查找数据_公共商机
      RegisteredCustomer: [], //下拉框的数据临时储存——公共商机
      CoordinationCustomer: [], //下拉框的数据临时储存——公共商机
      bussines_info: [
        {
          removebusiness: false,
          business_name: "",
          ResponseMode: "",
          ServiceCate: "",
          BusinessCate: "",
          Coordination: "",
          priority: "",
          expectedData: "",
          Turnover: "",
          describe: "",
          proposal: ""
        }
      ]
    };
  },
  props: ["parentPage"],
  created() {
    this.init();
  },
  methods: {
    BusoppStsCode(code) {
      return dictFilter(DICTYPE.OSPCD0228, code);
    },
    //初始化  加载数据
    init() {
      //-----------------------------------------------------------------用注册客户uuid
      if ("regCust" == this.parentPage) {
        this.form_data.param.custNo = this.$store.getters.Uuid_Reg_Cust;
      } else {
        //---------------------------------------------------------------使用正式客户uuidOrgFullName
        this.form_data.param.custNo = this.$store.getters.Uuid_formal;
      }
      this.form_data.pageInfo.PageNum = this.currentPage;
      this.form_data.pageInfo.PageSize = this.pagesize;
      getCollaborativeList(this.form_data)
        .then(response => {
          this.total = response.PageInfo.Total;
          this.tableData = response.Data;
          this.tableData.forEach(item => {
            item.BusoppSts = dictFilter(DICTYPE.OSPCD0228, item.BusoppSts); //------当前状态回显
            item.SrvCate = dictFilter(DICTYPE.OSPCD0227, item.SrvCate); //----------服务类别回显
            item.BizCate = dictFilter(DICTYPE.OSPCD0226, item.BizCate); //----------业务类别回显
            if (item.InitiateDate != null) {
              var start = new Date(item.InitiateDate); //---------------------------发起日期的转换时间戳
              item.InitiateDate =
                start.getFullYear() +
                "-" +
                (start.getMonth() + 1) +
                "-" +
                start.getDate();
            } else {
              item.InitiateDate = "";
            }
          });

        })
        .catch(() => {
          //可以用作与提示
          // this.$confirm("访问出错(协同信息)")
          //   .then(_ => {
          //     done();
          //   })
          //   .catch(_ => {});
        });
    },
    handleCurrentChangeTable(row) {
      //是否选中当前行，row是当前行的所有参数
      //console.log(row);
    },
    handleSizeChange(val) {
      //要显示多少页
      this.pagesize = val;
      this.init();
    },
    handleCurrentChange(val) {
      //当前页是多少
      this.currentPage = val;
      this.init();
    },
    // 改变
    ChangeIcon: function() {
      if (this.showicon) {
        this.icon = "iconfont icon-sey-bottomtriangleS";
        this.showicon = false;
      } else {
        this.icon = "iconfont icon-sey-toptriangleS";
        this.showicon = true;
      }
    },
    handlePreview: function(file) {
     // alert(file);
    },
    download: function(data, strFileName, strMimeType) {
      var self = window, // this script is only for browsers anyway...
        u = "application/octet-stream", // this default mime also triggers iframe downloads
        m = strMimeType || u,
        x = data,
        D = document,
        a = D.createElement("a"),
        z = function(a) {
          return String(a);
        },
        B = self.Blob || self.MozBlob || self.WebKitBlob || z,
        BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
        fn = strFileName || "download",
        blob,
        b,
        ua,
        fr;

      //if(typeof B.bind === 'function' ){ B=B.bind(self); }

      if (String(this) === "true") {
        //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
        x = [x, m];
        m = x[0];
        x = x[1];
      }

      //go ahead and download dataURLs right away
      if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
        return navigator.msSaveBlob // IE10 can't do a[download], only Blobs:
          ? navigator.msSaveBlob(d2b(x), fn)
          : saver(x); // everyone else can save dataURLs un-processed
      } //end if dataURL passed?

      try {
        blob =
          x instanceof B
            ? x
            : new B([x], {
                type: m
              });
      } catch (y) {
        if (BB) {
          b = new BB();
          b.append([x]);
          blob = b.getBlob(m); // the blob
        }
      }

      function d2b(u) {
        var p = u.split(/[:;,]/),
          t = p[1],
          dec = p[2] == "base64" ? atob : decodeURIComponent,
          bin = dec(p.pop()),
          mx = bin.length,
          i = 0,
          uia = new Uint8Array(mx);

        for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i);

        return new B([uia], {
          type: t
        });
      }

      function saver(url, winMode) {
        if ("download" in a) {
          //html5 A[download]
          a.href = url;
          a.setAttribute("download", fn);
          a.innerHTML = "downloading...";
          D.body.appendChild(a);
          setTimeout(function() {
            a.click();
            D.body.removeChild(a);
            if (winMode === true) {
              setTimeout(function() {
                self.URL.revokeObjectURL(a.href);
              }, 250);
            }
          }, 66);
          return true;
        }

        //do iframe dataURL download (old ch+FF):
        var f = D.createElement("iframe");
        D.body.appendChild(f);
        if (!winMode) {
          // force a mime that will download:
          url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
        }

        f.src = url;
        setTimeout(function() {
          D.body.removeChild(f);
        }, 333);
      } //end saver

      if (navigator.msSaveBlob) {
        // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fn);
      }

      if (self.URL) {
        // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
      } else {
        // handle non-Blob()+non-URL browsers:
        if (typeof blob === "string" || blob.constructor === z) {
          try {
            return saver("data:" + m + ";base64," + self.btoa(blob));
          } catch (y) {
            return saver("data:" + m + "," + encodeURIComponent(blob));
          }
        }

        // Blob but not URL:
        fr = new FileReader();
        fr.onload = function(e) {
          saver(this.result);
        };
        fr.readAsDataURL(blob);
      }
      return true;
    }
  }
};
</script>

<style scoped>

/*协同信息  360 -------------*/

.yh-demand-table {
  margin:10px 15px;
  min-height: 500px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  padding-top: 0px;
  position: relative;
  background:#FFF;
  padding:0 20px;
  border-radius:3px;
}

.table-header {
  height: 36px;
  line-height: 36px;
  margin: 5px 0;
}

.table-header h3 {
  float: left;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid #cf8e3e;
    padding: 0 5px;
}

.table-header a {
    float: right;
    margin-top: 10px;
    height: 20px;
    line-height:20px;
    padding:0 10px;
    background: #cf8e3e;
    color: #ffffff;
    text-align: center;
    border-radius: 45px;
    font-size: 12px;
}
.table-header a:hover {
    height: 20px;
    line-height:20px;
    background: #ffffff;
    border:solid 1px #cf8e3e;
    color: #cf8e3e;
    text-align: center;
    border-radius: 45px;
    font-size: 12px;
}

/* 列表信息 */

.table-show {
  min-height: 200px;
  margin-top:10px;
  box-sizing: border-box;
}
.ser-team-table{
  margin-top:10px;
}
.el-table td div {
  overflow: hidden;
  text-overflow: ellipsis;
}
.ser_page {
  padding: 10px 20px;
}

.fa {
  font-size: 16px;
}
</style>
