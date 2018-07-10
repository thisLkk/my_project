<template>
    <el-dialog title="客户分组新增" width="50%" center show-close=true :before-close="handleClose">
    <div class="yh-content">
        <el-form ref="form" :model="form_data" label-width="80px">
        <el-row>
            <el-col :span="12">
            <el-form-item label="分组名称:" prop="var1">
                <el-input v-model="form_data.var1" placeholder="请输入内容"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="创建人:" prop="var2">
                <el-input v-model="form_data.var2" placeholder="请输入内容"></el-input>
            </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
            <div class="yh-timeinput">
                <el-form-item label="创建时间:" prop="var3">
                <el-date-picker v-model="form_data.var3" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
                </el-form-item>
            </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
            <el-form-item label="分组描述:" prop="var4">
                <el-input type="textarea" v-model="form_data.var4" :rows="3"></el-input>
            </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
            <div class="yh-buttons">
                <el-button type="warning" @click="centerDialogVisible = false">
                <i class="fa fa-check"></i>确定
                </el-button>
                <el-button type="info" @click="centerDialogVisible = false">
                <i class="fa fa-close"></i>取消
                </el-button>
            </div>
            </el-col>
        </el-row>
        </el-form>
    </div>
    </el-dialog>
</template>