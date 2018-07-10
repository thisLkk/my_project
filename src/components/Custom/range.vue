<template>
<label>
<el-input v-model="value[0]" size="mini" @change="handleValueChange" ></el-input> <label>{{suffix}}</label><label> ~ </label> <el-input v-model="value[1]"  size="mini" @change="handleValueChange"> </el-input> <label>{{suffix}}</label>
</label>
</template>

<script>
export default {


    props: {
        suffix: {
            type: String,
            default: ""
        },
        value: {
            type: Array,
            default: ['', '']
        }
    },
    data() {
        return {
        }
    },
    methods: {
        handleValueChange() {
            var self = this;
            this.$emit("input", self.value);
        }
    }
}

</script>

<style>
.el-input {
    width: 50px;
}
</style>