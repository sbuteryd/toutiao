<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item  to="/">
        <template #icon>
          <i class="iconfont iconshouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item  to="/qa">
        <template #icon>
          <i class="iconfont iconwenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item  to="/video">
        <template #icon>
          <i class="iconfont iconshipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item  to="/my">
        <template #icon>
          <i class="iconfont iconwode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'Layout',
  data() {
    return {
      active: "value",
    };
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 40px;
}
</style>
