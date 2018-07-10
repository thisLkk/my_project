<template>
    <div>
      <span  v-for="(item,index) in choices"  v-bind:name="item.key" class="item" :class="{active:item.active}" :key="index"  @click="handleClick(item.key)">{{item.value}}</span>
    </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [{ key: "1", value: "男" }, { key: "2", value: "女" }]
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      choices: []
    };
  },
  created() {
    var self = this;
    for (var idx = 0; idx < self.items.length; idx++) {
      var choice = {
        active: false,
        key: self.items[idx].key,
        value: self.items[idx].value
      };
      this.choices.push(choice);
    }
  },
  methods: {
    handleClick(val) {
      var self = this;
      var res = [];
      for (var idx = 0; idx < self.choices.length; idx++) {
        var item = self.choices[idx];
        if (item.active === true) {
          if (item.key !== val) {
            res.push(item.key);
          } else {
            item.active = false;
          }
        } else {
          if (item.key === val) {
            item.active = true;
            res.push(item.key);
          }
        }
      }

      ////console.log(res);

      this.$emit("valueChange", res);
      this.$emit("input", res);
    }
  }
};
</script>

<style scope>
.item {
  display: inline-block;
  font-size: 12px;
  padding: 8px 10px;
  line-height: 16px;
  margin-right: 8px;
}
.item:hover {
  color: #e7a04e;
}
.active {
  color: #e7a04e;
}
</style>