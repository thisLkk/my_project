<template>
  <div class="condition-item">
    <div class="item-component">
        <el-input v-if="type==='string'" size="mini" v-model="in_value" placeholder="NULL" style="width:100%;"></el-input>
        <el-date-picker
          size="mini"
          v-else-if="type==='date'"
          v-model="in_value"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-select v-else-if="type==='select'"
          size="mini"
          v-model="in_value"
          multiple
          collapse-tags
          placeholder="请选择"
          style="width:100%;">
          <el-option
            v-for="item in select_options(dict)"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
        <div v-else-if="type==='number'" style="margin-top:4px;">
          <el-input-number size="mini" v-model="in_value" placeholder="NULL" style="float:left;width:110px;" :controls="false"></el-input-number>
          <span style="float:left;text-align:center;width:19px;line-height:28px;height:28px;">-</span>
          <el-input-number size="mini" v-model="in_value2" placeholder="NULL" style="width:110px;float:left;" :controls="false"></el-input-number>
        </div>  
    </div>
    <span class="item-label">{{label}}</span>
  </div>
</template>

<script>
import { dictSets, isArray } from '@/utils'

export default {
  name: 'ConditionItem',

  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    },
    type: {
      type: String,
      default() {
        return 'string'
      }
    },
    dict: {
      type: String,
      default() {
        return ''
      }
    },
    value: {
      type: [String, Array],
      default() {
        return ''
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        if (this.type === 'string') {
          if (typeof val === 'string') {
            this.in_value = val
          } else {
            this.in_value = ''
          }
        } else if (this.type === 'select') {
          console.log('valueset:' + JSON.stringify(val))
          if (isArray(val)) {
            this.in_value = val
          } else {
            this.in_value = []
          }
        } else if (this.type === 'number') {
          this.in_value = 0
          this.in_value2 = 0
          if (isArray(val)) {
            if (this.value.length > 0) {
              this.in_value = this.value[0]
              if (this.value.length > 0) {
                this.in_value2 = this.value[1]
              }
            }
          }
        } else if (this.type === 'date') {
          if (isArray(val)) {
            this.in_value = val
          } else {
            this.in_value = []
          }
        }
      }
    },
    in_value(val) {
      console.log('valuechange:' + JSON.stringify(val))
      if (this.type === 'number') {
        val = [val, this.in_value2]
      }
      this.$emit('onvaluechange', val)
    },
    in_value2(val) {
      this.$emit('onvaluechange', [this.in_value, val])
    }
  },
  data() {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      in_value: '',
      in_value2: ''
    }
  },
  methods: {
    select_options(category) {
      return dictSets(category)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.condition-item {
  padding-top:5px;
  min-width:250px;
  .item-component {
    border:1px solid #bfcbd9;
    border-radius: 4px;
    padding:10px 5px 5px 5px;
    min-height: 54px;
  }
  .item-label {
    position:absolute;
    left:10px;
    top:0px;
    font-size:9px;
    line-height: 11px;
    background-color: White;
    padding: 0 5px 0 5px;
  }
  .el-date-editor--daterange.el-input__inner {
    width:240px;
  }
}


</style>