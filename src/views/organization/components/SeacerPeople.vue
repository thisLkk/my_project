<template>
  <div class="yh_seacerPeople">
    <div class="seacerInput">
      <a :title="QueryResultName" href="javascript:void(0)" @click="handleIconClick()" style="position: absolute;z-index: 10;width: 100%;height: 100%; opacity: 0;"></a>
      <el-input :title="QueryResultName" style="width:100%;" v-model="QueryResultName">
        <i class="el-icon-search el-input__icon" slot="suffix">
        </i>
      </el-input>
    </div>
    <el-dialog title="员工查询" append-to-body :visible.sync="seacerPeopleDialog" width="780px" :before-close="CloseClick">
      <div class="seacerPeopleTabel">
        <div>
          <el-form label-position="center" label-width="110px" ref="form_data" :model="form_data" size="mini">
            <el-row>
              <el-col :span="11">
                <el-form-item label="员工编号查找:">
                  <el-input v-model="form_data.ID"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="员工姓名查找:">
                  <el-input v-model="form_data.name_"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="11">
                <el-button id="el_query" size="mini" @click="SeacerPeopleQuery()">查询</el-button>
                <el-button v-if="false" id="el_reset" size="mini" @click="resetForm('form_data')">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="tabel">
          <el-table ref="singleTable" v-if="tableData!=null" :data="tableData" highlight-current-row style="width: 100%">
            <el-table-column label="" align="right" width="50">
              <template slot-scope="scope">
                <!-- <el-radio v-model="seacerPeopleRadio" :label="scope.row.OrgEmployeeVO.IdNo">{{kong}}</el-radio> -->
                <el-checkbox  v-model="seacerPeopleRadio" :label="scope.row.UposId">{{kong}}</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="员工编号" align="center">
              <template slot-scope="scope">
                 <p>{{ scope.row.OrgEmployeeVO?scope.row.OrgEmployeeVO.EmpId:'' }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="员工姓名" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.OrgEmployeeVO?scope.row.OrgEmployeeVO.EmpName:'' }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="手机">
              <template slot-scope="scope">
                <p>{{ scope.row.OrgEmployeeVO?scope.row.OrgEmployeeVO.Mob:'' }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="seacerPeoplePage">
          <el-pagination @size-change="CurPagesizeHandle" @current-change="CurPageHandle" :current-page.sync="currentPage" :page-sizes="[5, 10, 15, 20]"
            :page-size.sync="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div class="seacerPeopleBtn">
          <el-button type="primary" @click="transmit()" size="mini">
            <i class="fa fa-check diologBtn"></i>确定</el-button>
          <el-button @click="CloseClick()" size="mini">
            <i class="fa fa-close diologBtn"></i> 关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPositionList } from "@/api/organization/custmanage/formalcustmanage/PanoramicView/index.js";
import { GetRegisteList } from "@/api/formalOrRregister.js";
export default {
  name: "SeacerPeople",
  props: {
    seacerName: {
      type: String,
      default: ""
    },
    seacerId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      seacerPeopleDialog: false, //----控制弹窗是否展开
      QueryResultName: "",//--参与人名字回显
      QueryResultId: "",//--参与人Id
      form_data: {
        name_: "",
        ID: ""
      },
      seacerPeopleRadio: [],
      kong: "",
      currentPage: 1, //------------当前页
      pagesize: 5, //---------------显示总条数
      total: null, //---------------总条数
      currentRow: null, //----------这个是要传递给父组件的值
      tableData: null
    };
  },

  watch:{
    seacerName(newName,oldName){
      this.seacerPeopleRadio = [];
      this.QueryResultName = this.seacerName?this.seacerName:'';
      //this.SeacerPeopleQuery();
    },
    seacerId(newName,oldName){
      this.QueryResultId = this.seacerId?this.seacerId:'';
      //alert("####"+ this.QueryResultId);
    },
    // seacerId(newName,oldName){
    //    if(null != this.seacerId){
    //      if(this.seacerId.indexOf(',')==-1){
    //        this.seacerPeopleRadio[0] = this.seacerId;
    //     }else{
    //        this.seacerPeopleRadio = this.seacerId.split(',');
    //        //alert(this.seacerPeopleRadio+"###"+this.seacerId);
    //      }
    //    }
    //    alert(this.seacerPeopleRadio+"===");
    // },
  },
  created() {
  
    this.seacerPeopleRadio = [];
    this.QueryResultName = this.seacerName?this.seacerName:'';
    this.QueryResultId = this.seacerId?this.seacerId:'';
    //alert(this.seacerName);

  },
  methods: {
    //------------------------------------------------------ 打开弹窗调取接口方法
    handleIconClick() {
      this.seacerPeopleDialog = true;
      //this.pagesize = 1;
      this.currentPage = 1;
      this.SeacerPeopleQuery();
    },
    //------------------------------------------------------ 查询方法
    SeacerPeopleQuery() {
      var require = {
        pageInfo: {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          total: 0,
          orderBy: "",
          pages: 0
        },
        param: {
          orgEmployeeVO: {
            EmpId: this.form_data.ID,
            EmpName: this.form_data.name_
          },
          orgId: this.$store.getters.orgid <8000? this.$store.getters.orgid : ""//------- 可以判断是否要启用查机构的
        }
      };
      getUserPositionList(require)
        .then(response => {
          if (response.Meta.Code == "0000") {
            this.tableData = response.Data;
            this.total = response.PageInfo.Total;
          }
        })
        .catch(() => {});
    },
    //------------------------------------------------------ 确定按钮（父组件传值）
    transmit() {

      this.currentRow = {};
      let designPersonNameS = "";
      let designOrgIdS = "";
      if(null != this.tableData && this.seacerPeopleRadio.length!= 0){
        for(let i=0;i<this.tableData.length;i++){
          for(let j=0;j<this.seacerPeopleRadio.length;j++){
            //判断 如果选中数据中和列表中数据一致  而且 该数据不在列表中，则添加
            if(this.seacerPeopleRadio[j] == this.tableData[i].UposId && (this.QueryResultId=='' || !this.IsInArray(this.QueryResultId.split(','),this.tableData[i].UposId))  ){
              //显示名称处理
              this.QueryResultName += this.tableData[i].OrgEmployeeVO.EmpName+",";
              //alert("===1.4"+this.QueryResultId);
              this.QueryResultId += this.tableData[i].UposId+",";
              //alert("===1.5"+this.QueryResultId);
              //designPersonNameS += this.tableData[i].OrgEmployeeVO.EmpName+",";
              designOrgIdS += this.tableData[i].OrgId+",";
            }
          }
        }
        
      //alert(2);
      
       // alert("===2");
        this.currentRow = {
          designPerson: this.QueryResultId,
          designPersonName: this.QueryResultName,
          designOrgId: designOrgIdS
        };
      }
      //alert("==="+JSON.stringify(this.currentRow));
      //return ;
      var data = this.currentRow ? this.currentRow : "";
      this.$emit("SeacerPeopleResponse", data);
      this.seacerPeopleDialog = false;
    },
    // ------------------------------------------------------ 取消按钮
    CloseClick() {
      this.seacerPeopleDialog = false;
    },
    //------------------------------------------------------- 列表的每一行点击事件
    seacerPeopleTabelClick(val) {

      this.seacerPeopleRadio = val.OrgEmployeeVO.IdNo;
      this.QueryResultName = val.OrgEmployeeVO.EmpName;
      
      this.currentRow = {
        designPerson: val.UposId,
        designPersonName: val.OrgEmployeeVO.EmpName,
        designOrgId: val.OrgId
      };

    },
    //判断数组中是否有该元素
    IsInArray(arr,val){ 
    　　var testStr=','+arr.join(",")+","; 
    　　return testStr.indexOf(","+val+",")!=-1; 
    },
    //-----------------------------------------------当前页
    CurPageHandle(val) {
      this.SeacerPeopleQuery();
    },
    //-----------------------------------------------当前要展示多少条
    CurPagesizeHandle(val) {
      this.pagesize = val;
      this.SeacerPeopleQuery();
    },
    //-----------------------------------------------重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yh_seacerPeople {
  .seacerInput {
  }
}

.seacerPeopleTabel {
  padding-bottom: 20px;
  .tabel {
    padding: 15px;
  }
  .seacerPeopleBtn {
    text-align: center;
  }
  .el-table td div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .seacerPeoplePage {
    padding: 10px 20px;
    text-align: right;
  }
}
</style>
