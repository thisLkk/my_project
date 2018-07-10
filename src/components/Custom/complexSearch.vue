<template>
<div>
    <div class="editor-container">
      <el-button icon="el-icon-search" type="primary" v-on:click="dialogVisible=true">高级搜索</el-button>
    </div>
    <el-dialog :title="'高级条件'" size="large" :visible.sync="dialogVisible" width="60%">
      <ComplexSearch v-on:submitForm="handleSubmitForm" :conditions="conditions"></ComplexSearch>
    </el-dialog>
</div>
</template>

<script>
import ComplexSearch from '@/components/ComplexSearch'

export default {
    components: {
        ComplexSearch
    },
    props: {

        conditions: {
            type: Array
        }
    },
    data() {
        return {
           dialogVisible: false 
        }
    },
    methods: {
        handleSubmitForm(val) {
            var self = this;
            self.dialogVisible = false;
            self.$emit("submitForm", val);
        } 
    }
}


</script>