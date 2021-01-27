<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <van-button round icon="search" slot="title" type="default">
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 导航结束 -->

    <!-- tabbs -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <artcle-list :channel='item'/>

      </van-tab>

      <div class="menue-btn" type="default">
        <!--        频道按钮-->
        <i class="iconfont icongengduo" @click="ischennelEditShow =true"></i>
      </div>
    </van-tabs>
    <!--  频道编辑弹出层-->
    <van-popup
      close-icon-position="top-left"
      v-model="ischennelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 频道编辑开始-->
      <channel-eidt :my-channels="channels" :active="active"/>
      <!-- 频道编辑结束-->
    </van-popup>
    <!-- 频道编辑弹出层-->
  </div>
</template>

<script>
import {getChannelsApi} from "@/api/user";
import ArtcleList from "./components/article-list";
import ChannelEidt from './components/channel-eidt'

export default {
  name: "Home",
  components: {
    ArtcleList,
    ChannelEidt
  },
  data() {
    return {
      active: "",
      channels: [],// 频道列表,
      ischennelEditShow: false //控制编辑显示频道显示
    };
  },
  created() {
    this.getChannels();
  },
  methods: {
    // 获取频道列表
    async getChannels() {
      try {
        const {data: res} = await getChannelsApi();
        this.channels = res.data.channels;
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
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

/deep/ .van-nav-bar__title {
  max-width: unset;
}

.van-nav-bar .van-icon {
  color: #fff;
}

/deep/ .van-nav-bar__content {
  background: #3296fa;
}

/deep/ .van-tabs__wrap {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  height: 82px;
  z-index: 1;
}

/deep/ .van-tab {
  min-width: 191px;
  border-right: 1px solid #edeff3;
}

/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: rgba(50, 150, 250, 1);
}

.menue-btn {
  position: fixed;
  top: 95px;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  width: 66px;
  height: 82px;
  text-align: center;
  line-height: 66px;
  z-index: 2;
}

.icongengduo {
  font-size: 33px;
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: unset;
}

.home-container {
  margin-top: 174px;
  padding-bottom: 100px;
}
</style>
