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
    <van-pull-refresh :success-duration="1500"  :success-text="refreshSuccess" v-model="isLoadingRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item v-for="item  in list" :key="item.id" :article='item'></article-item>
<!--        <van-cell v-for="item in list" :key="item.id" :title="item.title">-->
<!--        </van-cell>-->
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from "@/api/articel.js";
import ArticleItem from '@/components/article-item';
export default {
  name: "ArtcleList",
  components:{
    ArticleItem
  },
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
       error: false,//控制失败的状态,
      isLoadingRefresh:false, //下拉刷新事件
      refreshSuccess:'刷新成功'//下拉刷新提升信息
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

        // console.log(Math.random()) 随机1以内的数字

        // if(Math.random()>0.5) {
        //   //讲字符串转为对象 数字会出问正常  字母会报错
        //   //json 字符串转为 对象
        //   JSON.parse("asdfsdafds")
        // }
        this.list.push(...res.data.results);
        // 3 本次数据加载结束之后要把加载状态设置为结束  加载状态结束
        this.loading = false;
        // 4 判断数据是否加载完成 数据全部加载完成)
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp;
          // 更新获取下一页的数据时间戳
        } else {
          this.finished = true;
        }
      } catch (err) {
        //展示错状态
        this.error =true
        //请求失败了 loading 也需要关闭
        this.loading = false
        console.log("请求失败", err);
      }
    },
    //当下拉刷新的时候回调用改函数
  async  onRefresh(){
      //将数据放到数据的顶部
      //关闭下拉刷新的loading 状态
      // 下拉的时候回自动把 isloaidngrefresh设置为true
      try{
        const { data: res } = await getArticles({
          channel_id: this.channel.id, //频道id
          //timestaep 简单理解就是请求数据的页码，
          // 请求第一页数据：当前最新的时间戳
          // 请求第一页数据：当前最新时间戳
          // 当前请求结果中返回给你就是第二页数据
          timestamp:  Date.now(),//下拉属性每次请求最新数据所以传递最新时间戳
          with_top: 1, // 是否置顶数据
        });
        // if(Math.random()<0.5) {
        //   JSON.parse('asdfklj')
        // }
         this.list.unshift(...res.data.results)
         this.refreshSuccess = `属性成功 更新了${res.data.results.length}条数据`
        this.isLoadingRefresh = false
        console.log('onrefresh')
      }catch(err){
        this.isLoadingRefresh =false
        this.refreshSuccess ='刷新失败'
      }

    }

  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
