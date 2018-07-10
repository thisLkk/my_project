<template>
    <div >
        <el-upload
            id="btn_upload"
            class="upload-demo yh-upload-auto"
            :action="uploadUrl()"
            multiple
            :on-preview="fileClick"
            :headers="uploadHead()"
            :on-success = 'handleSuccess'
            :file-list="addfileList"
            :on-remove = "handleRemove"
            :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">附件修改立即生效，无需保存！</div>
        </el-upload>
    </div>
</template>

<script>
import { deleteappendix } from "@/api/organization/resourcemanage/resourcemanagement/BusinessAddressBookManagement/index.js";

export default {
  data() {
    return {
      //addfileList:[],
    };
  },
  props: {
    relId: {
      type: String,
      default: ""
    },
    addfileList: {
      type: Array,
      default: []
    },
    listenName: {
      type: String,
      default: ""
    }
  },
  created() {
    // console.log(this.addfileList);
  },
  methods: {
    // 上传组件初始化时指定上传或修改的地址
    uploadUrl() {
      var url =
        "/zuul/osp-sysManager/appendix/uploadappendix?relId=" + this.relId;
      return url;
    },
    //文件点击事件 执行下载操作
    fileClick(file) {
      var url =
        "/osp-sysManager/appendix/downloadappendix?batchNo=" + file.BatchNo;
      window.open(url);
      //取消附件焦点 ， 不再显示按delete可删除提示 和delete删除操作
      $(".el-upload-list__item").blur();
    },
    // 上传组件初始化时指定上传或修改需要携带的header信息参数
    uploadHead() {
      var headInfo = { sysCode: "OSP", token: "123456" };
      return headInfo;
    },
    // 点击上传选中文件后执行，会获得执行后的数据
    handleSuccess(res, file, fileList) {
      // console.log(res);
      if (res.Meta.Success) {
        this.$message({
          type: "success",
          message: "上传成功!"
        });
        if (res.Data) {
          //如果返回Data信息  则给新建的资源信息赋ID值
          //this.form_data_add.param.resrId =  res.Data;
          this.$emit("setId", res.Data, this.listenName);
        }
      } else {
        this.$message.error("上传失败！");
      }
    },
    //删除附件
    handleRemove(file, fileList) {
      var delId = null;
      if (file.BatchNo) {
        delId = { param: file.BatchNo };
      } else {
        delId = { param: this.relId };
      }
      deleteappendix(delId)
        .then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
