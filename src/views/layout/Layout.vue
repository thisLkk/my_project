<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <div class="main-container">
      <HeaderYh v-if="show"></HeaderYh>
      <HeaderYhL v-else></HeaderYhL>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import HeaderYh from '@/views/organization/HeaderYh'
import HeaderYhL from '@/views/lingshou/HeaderYhL'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    HeaderYh,
    HeaderYhL
  },
  data(){
    return {
      show :true
    }
  },
  created(){
    // alert(1)
    if(this.$store.getters.chanfeOrg == "机构"){
      this.show = true;
    }else if(this.$store.getters.chanfeOrg == "零售"){
      // alert(23)
      this.show = false;
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
