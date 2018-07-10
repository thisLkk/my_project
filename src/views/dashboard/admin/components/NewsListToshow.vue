<template>
  <div class="newslist-showmsg " >
    <el-tabs v-model="activeName" >
      <el-tab-pane label="客户负面新闻" name="first" class="n_news" @click="moreOrNewHandle(2)"  >
        <el-table class="yh_index_table " :data="negativenewsx" style="width: 100%;" :show-header="false" :stripe="false">
          <div class="fm_index  ">
          <el-table-column label="日期" prop="Content" width="370px" align="left" >
            <template slot-scope="scope"  >
              <span style="margin-left: 10px" v-html="negativenewstitle(scope.row)"  class="index_two"></span>
              <a class="details   x_block" @click="f_newsone(scope.row.Content)">详情</a>
            </template>
          </el-table-column>
          </div>
        </el-table>
      </el-tab-pane>







      <el-tab-pane label="客户动态" name="third" class="alldynamics" @click="moreOrNewHandle(1)" >
        <el-table class="yh_index_table " :data="newsListsThirds" style="width: 100%;" :show-header="false" :stripe="false">
          <el-table-column label="日期" prop="SEventAnncedate" width="" align="left">
            <template slot-scope="scope">
              <span style="margin-left: 6px" v-html="formatShowTitle(scope.row)" class="index_newx"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      




      


      <!-- <el-tab-pane label="我客户动态" name="second">
      <el-table class="yh_index_table"
      :data="newsListsSecond"
      style="width: 100%;" :show-header="false" :stripe="false">
      <el-table-column
        label="日期"
        prop="SEventAnncedate" width="" align="left">
        <template slot-scope="scope"> <span style="margin-left: 10px"
            v-html="formatShowTitle(scope.row)"></span>
        </template>
      </el-table-column>
      </el-table>
    </el-tab-pane> -->
    </el-tabs>
    <el-dialog title="客户动态" :visible.sync="busopen" width="900px" height="100%" :before-close="busclose">
      <div class="yh_BusinessTabel" style="min-height:270px">
        <div class="prog " style="height:100%">
          <div class="main_table  k_active   ">
            <el-table :data="tableData" highlight-current-row stripe size="mini" style="width: 100%;height:100%">
              
              <el-table-column label="日期" height="100%" width="" align="center" >
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.OpDateString }}</p>
                    <div slot="reference" class="wrapper  ">
                      <el-tag size="mini">
                        {{ scope.row.OpDateString }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="客户名称" width="" align="center">
                <template slot-scope="scope" >
                  <el-popover trigger="hover" placement="top" >
                    <p>{{ scope.row.Asharedescription.SInfoCompname }}</p>
                    <div slot="reference" class="wrapper" align="left">
                      <el-tag size="mini">
                        {{ scope.row.Asharedescription.SInfoCompname }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="客户动态" width="" align="center">
                <template slot-scope="scope" >
                  <el-popover trigger="hover" placement="top" >
                    <p>{{nchange(scope.row.SEventContent)}}</p>
                    <div slot="reference" class="wrapper" align="left">
                      <el-tag size="mini" >
                        <span >{{nchange(scope.row.SEventContent)}}</span>
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页信息 -->
          <div class="pagination t_information" style="float:none">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5,10,15,20]"
              :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 负面新闻弹窗 -->
        <el-dialog title="客户负面新闻" :visible.sync="busopennews" width="1000px" height="100%" :before-close="busclosenews">
      <div class="yh_BusinessTabel" style="min-height:270px">
        <div class="prog " style="height:100%">
          <div class="main_table  k_active">
            <el-table :data="negativenews" highlight-current-row  size="mini" style="width: 100%;height:100%">

              <el-table-column label="日期" height="100%" width="200" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.Publishdate }}</p>
                    <div slot="reference" class="wrapper    fm_left" >
                      <el-tag size="mini">
                        {{ scope.row.Publishdate }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>

              <el-table-column label="来源" height="100%" width="200" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.Source }}</p>
                    <div slot="reference" class="wrapper" >
                      <el-tag size="mini">
                        {{ scope.row.Source }}
                      </el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>

              <el-table-column label="客户负面新闻" height="100%" width="600" align="center" >
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.Title }}</p>
                    <div slot="reference" class="wrapper f_onetd " align="left">
                      <el-tag size="mini"  >
                        
                        <!-- 点击标题弹出内容 -->
                        {{ scope.row.Title }}
                        <a class="details    xq_right" @click="f_newsone(scope.row.Content)">详情</a>
                      </el-tag>
                    </div>
                    
                  </el-popover>
                </template>
              </el-table-column>
           

            </el-table>
          </div>
          <!-- 分页信息 -->
          <div class="pagination t_information" style="float:none">
            <el-pagination @size-change="handleSizeChangenews" @current-change="handleCurrentChangenews" :current-page.sync="currentPage" :page-sizes="[5,10,15,20]"
              :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totaltwo" >
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
   
    <!-- 点击查看客户动态更多 -->
    <span class="yh-headerfr"  id="yh-headerfr" v-if="activeName=='third'">
      <a class="yh-font-more" @click="busopenone()">更多>></a>
    </span>
    <!-- 点击查看负面新闻更多 -->
    <span class="yh-news" id="yh-news"  v-if="activeName=='first'">
      <a class="yh-font-news"  @click="newsopenone()">更多>></a>
    </span>





     <!-- 负面新闻详情弹窗 -->
    <el-dialog title="客户负面新闻详情" :visible.sync="t_news" width="900px" height="100%" :before-close="f_newstwo">
      <div class="yh_BusinessTabel" style="min-height:270px">
        <div class="prog " style="height:100%">
          <div class="main_table">
           <span v-html="contents" class="x_content"></span>
          </div>
         <span slot="footer" class="fm_close" >
              <el-button @click=" t_news = false" size="mini" id="yh-cancel">
                <i class="fa fa-close diologBtn"></i> 关 闭</el-button>
        </span>
        </div>
      </div>
    </el-dialog>
  </div>
  
</template>

<script scoped>
  import { getasharemajoreventlist } from "@/api/organization/dashboard/index.js";
  import { getstocknegativenewslist} from "@/api/organization/dashboard/index.js";
  export default {
    name: "NewsListToshow",
    props: {
      name: {
        type: String,
        default: ""
      },
      showD: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        contents:"",//---------定义负面新闻弹窗内容
        moreOrNews:false,//------定义更多为假
        activeName: "first",//------------tab首次展现的页面
        newsListsFirst: null,
        newsListsSecond: null,
        newsListsThirds: null,
        negativenewsx:null,
        negativenews:null,
        busopen: false,
        t_news:false,
        busopennews:false,
        tableData: null,
        tableData: undefined,
        negativenews:undefined,
        negativenewsx:undefined,
        newsListsThirds: undefined, //------保存点击查询的参数
        pagesize: 10, //------------------显示总条数
        currentPage: 1, //----------------当前页
        total: null, //-------------------总条数
        totaltwo:null
      };
    },
    
    created() {
      var _self = this;
      //初始化需要做的事  查询列表消息数据 (本页面需要做的接口实现)

      this.doInit();

    },
 
    
    methods: {

          //客户动态过滤\n
          nchange(value){

            return value.replace("\\n","");

          },

      //客户负面新闻内容弹窗
      f_newsone(row){

        this.contents = row;
          this.t_news = true;
      },
      f_newstwo(){
          this.t_news = false;
      },

      //判断客户动态与负面新闻各自对应的更多
      moreOrNewHandle:function(index){
          var self=this;
          switch(index){
            case 1:
            self.moreOrNews=false;
            break;
            case 2:
            self.moreOrNews=true;
            break;
            default:
            break;
          }
      },
      //负面新闻
      inits(){
        var require = {
          pageInfo: {
            pageNum: this.currentPage,
            pageSize: this.pagesize,
            total: 0,
            orderBy: "",
            pages: 0,
            totaltwo:0
          }
        }
        getstocknegativenewslist(require)
        
          .then(response => {
            this.negativenews = response.Data;
            this.totaltwo = response.PageInfo.Total;//分页数量信息
          })
          .catch(() => {
            this.$message.error("访问出错");
          });

      },
      //弹窗列表数据请求（地址）
      init() {
        var require = {
          pageInfo: {
            pageNum: this.currentPage,
            pageSize: this.pagesize,
            total: 0,
            orderBy: "",
            pages: 0
          }
        }
        getasharemajoreventlist(require)
          .then(response => {

            this.tableData = response.Data;
            this.total = response.PageInfo.Total;

          })
          .catch(() => {
            this.$message.error("访问出错");
          });
         
      },
       //负面新闻当前页
          handleCurrentChangenews(){
            this.inits()
          },
          handleSizeChangenews(val){
            this.pagesize = val;
            this.inits();
          },
          //弹窗
          newsopenone(){
              this.busopennews = true;
              this.inits();
          },
          busclosenews() {
              this.busopennews = false;
        },
        

      //---------------------------------------------------------------------------当前页
      handleCurrentChange() {

        this.init();
      },
      //---------------------------------------------------------------------------当前要展示多少条
      handleSizeChange(val) {
        this.pagesize = val;
        this.init();
      },
      //弹窗
      busopenone() {
        this.busopen = true;
        this.init();

      },
      busclose() {
        this.busopen = false;
      },
      // 首次刷新加载数据
      doInit() {
        var query = {
        //  param:{
        // //     SEventCategorycode:'',
        // //     QueryType:''
        //   },
          pageInfo: {
            pageSize: 10,
            pageNo: 1
          }
        }
        //首次刷新客户动态获取数据
        getasharemajoreventlist(query)
          .then(response => {
            this.newsListsThirds = response.Data;
          })
          .catch(() => {
            this.$message.error("访问出错");
          });
           //动态获取负面新闻数据
        getstocknegativenewslist(query)
        
          .then(response => {
            this.negativenewsx = response.Data;
            
          })
          .catch(() => {
            this.$message.error("访问出错");
          });
      },
     
      doClose: function () {
        this.$emit("closeDetail");
      }, ShowMoreMsg: function () {
        //客户动态
      }, formatShowTitle: function (row) {
        var _self = this;
        var contentx;
        contentx = "<span @click('')>" + row.OpDateString + "&nbsp;&nbsp;&nbsp;&nbsp;" + row.Asharedescription.SInfoCompname + "&nbsp;&nbsp;&nbsp;&nbsp;" + row. SEventContent+ "</span>";
        return contentx;
      },//负面新闻
      negativenewstitle:function (row){
        var _selfs = this;
        var titlecontent;
        titlecontent = "<span>"+row.Publishdate+"&nbsp;&nbsp;&nbsp;&nbsp;" +row.Source +"&nbsp;&nbsp;&nbsp;&nbsp;" +row.Title +"</span>";
        return titlecontent;
      },
      n_content:function(row){

        var _selfx = this;
        var thiscontent;
        thiscontent = "<span>"+row.Content+"</span>";
        // console.log(thiscontent)
      }
    }
  };
</script>

<style scoped>

  .yh-headerdiv {
    height: 40px;
    border-bottom: 1px solid #eeeee9;
  }

  .yh-headerfl {
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #cb6c2f;
    cursor: pointer;
  }

  .yh-headerfr {
    float: right;
    width: 80px;
    height: 40px;
    position: absolute;
    top: 0px;
    right: -9px;
  }
    .yh-news {
    float: right;
    width: 80px;
    height: 40px;
    position: absolute;
    top: 20px;
    right: -9px;
  }

  .news-titleitem {
    text-align: left;
  }

  .yh-headerright {
    float: right;
  }

  .yh-headermore {
    font-size: 12px;
    color: #cb6c2f;
    font-family: cursive;
  }

  .yh-font-more {
    font-size: 12px;
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #c09846;
  }
    .yh-font-news {
    font-size: 12px;
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #c09846;
  }

  .yh_index_table {
    font-size: 12px;
    text-align: center;
    font-family: "Microsoft YaHei", 'Times New Roman', Times, serif;
    font-style: normal;
  }

  .newslist-showmsg {
    border-top: solid 1px #eee;
    margin-top: 20px;
    padding-top: 10px;
    position: relative;
   
  }
  .details{
    width: 20px;
    height: 10px;
    color: deepskyblue;
  }
 
 
</style>