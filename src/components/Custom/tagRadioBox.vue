<template>
    <div>
      <span :key="item"  v-for="item in choices"  v-bind:name="item.key" class="item" :class="{active:item.active}"  @click="handleClick(item.key)">{{item.value}}</span>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: [{key: "1", value: "男"},
                      {key: "2", value: "女"}]
        },
        value:{}
    },
    data() {
        return {
            choices: []
        }
    },
    created() {
        var self = this;
        for (var idx = 0; idx< self.items.length; idx++) {
        	var choice = {
	          active: false,
	          key: self.items[idx].key,
	          value: self.items[idx].value
        	}
        	this.choices.push(choice)
    		}
    },
    methods: {
        handleClick(val) {
            var self = this;
            var res = null;
            for(var idx=0;idx<self.choices.length; idx++) {
                var item = self.choices[idx];
                if(item.active===true)
                {
                	item.active = false;
                }else
                {
                	if(item.key===val)
                	{
                		item.active = true;
                		res = item.key;
                	}
                }
            }
            
            //console.log(res);
            
            this.$emit("valueChange", res);
            this.$emit('input', res); 
        }

    }

}
</script>

<style scope>
.item {
     display: inline-block;
     font-size: 12px;
     padding: 8px 12px;
     line-height: 16px;
     background: rgba(0,160,220,0.2);
     color: rgb(77,85,95);
     margin-right: 8px;
}

.active
{
	color:white;
  background:rgb(0,169,220);
}
          
</style>