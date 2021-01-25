<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <van-button round icon="search" slot="title" type="default">
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 导航结束 -->

    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <artcle-list></artcle-list>
      </van-tab>

      <div class="menue-btn" type="default">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelsApi } from "@/api/user";
import ArtcleList from "./components/article-list";
export default {
  name: "Home",
  components: {
    ArtcleList,
  },
  data() {
    return {
      active: "",
      // 频道列表
      channels: [],
    };
  },
  created() {
    this.getChannels();
  },
  methods: {
    // 获取频道列表
    async getChannels() {
      const { data: res } = await getChannelsApi();
      this.channels = res.data.channels;
      console.log(res.data.channels);
    },
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  text-align: center;
  .van-button {
    width: 555px;
    height: 64px;
    background: rgba(91, 171, 251);
    color: #fff;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
.van-nav-bar .van-icon {
  color: #fff;
}
/deep/.van-nav-bar__content {
  background: #3296fa;
}

/deep/.van-tabs__wrap {
  position: fixed;
  top: 96px;
  left: 0;
  right: 0;
  height: 82px;
}
/deep/.van-tab {
  min-width: 191px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: rgba(50, 150, 250, 1);
}
.menue-btn {
  position: fixed;
  top: 96px;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  width: 66px;
  height: 82px;
  text-align: center;
  line-height: 66px;
}
.icongengduo {
  font-size: 33px;
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  padding: unset;
}
</style>