<template>
  <div>
    <HeaderYh></HeaderYh>
    <div class="line"></div>
  </div>
</template>

<script>
import logo from '@/assets/logo2.png'
import headerImg from '@/assets/header.jpg'
import { mapGetters } from 'vuex'
import router from '@/router'
import store from '@/store'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { generateTitle } from '@/utils/i18n'
import global_ from '@/common/Global'
import HeaderYh from '@/views/organization/HeaderYh'

export default {
  data() {
    return {
      logo,
      headerImg,
      activeIndex: '0',
      navmenusMode: global_.navmenusMode
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
    HeaderYh
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'allRouters'
    ])
  },
  methods: {
    generateTitle,
    handleSelect(index) {
      if (this.navmenusMode !== 'dropdown') {
        this.$store.dispatch('chooseRoutes', index)
        router.addRoutes(store.getters.addRouters.slice(0, 1))
      }
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload()
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  width: 100%;
  z-index: 999;
  position: fixed;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .itemStyle {
    height: 49px;
    line-height: 49px;
  }
}
</style>
