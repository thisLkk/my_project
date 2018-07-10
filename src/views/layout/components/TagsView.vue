<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{generateTitle(tag.title)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
        <div class="line"></div>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags">Close All</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "@/components/ScrollPane";
import { generateTitle } from "@/utils/i18n";

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    }
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        window.addEventListener("click", this.closeMenu);
      } else {
        window.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    this.addViewTags();
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addVisitedViews", route);
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch("delVisitedViews", view).then(views => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            //console.log("lastRoutePath:", latestView.path)
            this.$router.push(latestView.path);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path);
      this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags() {
      this.$store.dispatch("delAllViews");
      this.$router.push("/");
    },
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  position: fixed;
  top: 96px;
  z-index: 99;
  overflow: hidden;
  width: 100%;
  font-family: "Microsoft YaHei";
  .tags-view-wrapper {
    background: #fff;
    height: 38px;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: none;
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 30px;
      line-height: 30px;
      color: #34393c;
      background: #fff;
      font-size: 14px;
      margin: 0 14px;
      margin-top: 7px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        font-weight: bold;
        color: #000;
        border-bottom: 2px solid #af6e20;
      }
      .line {
        height: 18px;
        width: 2px;
        background: #cccccc;
        position: absolute;
        top: 6px;
        right: -14px;
      }
      &:last-of-type .line{
        background: none;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 22px;
      height: 28px;
      font-size: 18px;
      font-weight: bold;
      vertical-align: 2px;
      color: #b9c0c3;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      border-bottom: 0px solid #fff;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -4px;
      }
      &:hover {
        color: #af6e20;
        font-size: 18px;
         border-bottom: 0px solid #fff;
      }
    }
  }
}
</style>
