<template>
  <div class="sd-stockinfo-main">
    <el-tabs v-model="show" :tab-position="tabPosition" :style="caculateHeight()" >
      <el-tab-pane label="自然属性" name="natural">
        <CustArchivesNaturalQlity v-if="show=='natural'"></CustArchivesNaturalQlity>
      </el-tab-pane>
      <el-tab-pane label="扩展属性" name="ext">
        <CustArchivesExtQlity v-if="show=='ext'"></CustArchivesExtQlity>
      </el-tab-pane>
      <el-tab-pane label="适当性信息" name="approp"  >
        <CustArachivesApprop v-if="show=='approp'"></CustArachivesApprop>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import CustArchivesNaturalQlity from "@/views/organization/custmanage/components/CustArchivesNaturalQlity";
  import CustArchivesExtQlity from "@/views/organization/custmanage/components/CustArchivesExtQlity";
  import CustArachivesApprop from "@/views/organization/custmanage/components/CustArachivesApprop";

  export default {
    name:"CustArchives",
    components: { CustArchivesNaturalQlity,CustArchivesExtQlity,CustArachivesApprop},
    data() {
      return {
        show: "natural",
        tabPosition: 'left'
      };
    },
    methods:{
      caculateHeight(){
        if(this.show=='natural'){
          return 'height:250px';
        }else if(this.show=='ext'){
          return 'height:450px';
        }else if(this.show=='approp'){
          return 'height:930px';
        }
      }
    }
  };
</script>

<style scoped>

</style>
