<template>
    <div>
      <input  v-for="item in data.choices"  type="button"   v-bind:name="item.key"   v-bind:value="item.value"   v-bind:style="item.class"  @click="handleClick(item.key)" />
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Object,
            default: [{key: "1", value: "1"},
                      {key: "2", value: "2"}]
        },
        single: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            data: {
                choices: [
                ],
                styles:{
                    checked:{
                        backgroundColor:'yellow',
                        borderColor:'Transparent',
                        borderStyle:'None',
                        margin: '10px',
                        height: '30px',
                        width: '60px'
                        },
                    unchecked: {
                        backgroundColor:'Transparent',
                        borderColor:'Transparent',
                        borderStyle:'None',
                        margin: '10px',
                        height: '30px',
                        width: '60px'

                        }
                }
            }
        }

    },
    created() {

            var self = this;
            self.choices = [];
            for (var idx = 0; idx< self.items.length; idx++) {
                var choice = {
                    class: self.data.styles.unchecked,
                    key: self.items[idx].key,
                    value: self.items[idx].value
                }
                this.data.choices.push(choice)
            }
    },
    methods: {
        handleClick(val) {
            var self = this;
            var res = [];
            for(var idx=0;idx<self.data.choices.length; idx++) {
                console.log(val);
                if (self.data.choices[idx].key === val) {
                    if (self.data.choices[idx].class === self.data.styles.unchecked) {
                        self.data.choices[idx].class = self.data.styles.checked;
                    } else {
                        self.data.choices[idx].class = self.data.styles.unchecked;
                    }
                } else {
                    if (self.single < 2) {
                        self.data.choices[idx].class = self.data.styles.unchecked;
                    }
                }

                if (self.data.choices[idx].class == self.data.styles.checked) {
                    res.push(self.data.choices[idx].value);
                }
            }

            this.$emit("valueChange", res);
        }

    }

}
</script>