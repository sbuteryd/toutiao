<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <!-- load 事件：
List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。
loading 属性：控制加载中的 loading 状态
非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件
finished 属性：控制加载结束的状态
在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
所有数据加载结束，finished 为 true，此时不会触发 load 事件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.title">
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getArticles } from "@/api/articel.js";
export default {
  name: "ArtcleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      key: "文章列表",
      list: [],
      loading: false, //控制加载中 loading 效果 true 圈圈出来 false 圈圈隐藏
      finished: false, // 控制数据加载结束的状态,
      timestamp: null, //请求获取下一页的时间戳
    };
  },
  methods: {
    async onLoad() {
      // 初始化或滚动到底部的时候会触发调用 onlaod
      // console.log("onload");
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 1. 请求获取数据
      // 2. 把请求结果数据放到list数组中
      // 3 本次数据加载结束之后要把加载状态设置为结束  加载状态结束
      // loading 关闭以后才能触发下一次的加载更多
      // 4 判断数据是否加载完成 数据全部加载完成
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   this.loading = false;
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      // 1. 请求获取数据
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id, //频道id
          //timestaep 简单理解就是请求数据的页码，
          // 请求第一页数据：当前最新的时间戳
          // 请求第一页数据：当前最新时间戳
          // 当前请求结果中返回给你就是第二页数据
          timestamp: this.timestamp || Date.now(),
          with_top: 1, // 是否置顶数据
        });
        this.list.push(...res.data.results);
        // 3 本次数据加载结束之后要把加载状态设置为结束  加载状态结束
        this.loading = false;
        console.log(res.data);
        // 4 判断数据是否加载完成 数据全部加载完成)
        console.log("res.data.results.lenght");
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp;
          // 更新获取下一页的数据时间戳
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败", err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>