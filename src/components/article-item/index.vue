<template>
  <div class="article-item">
    <van-cell>
      <div slot="title" class="van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <div slot="label">
<!--        三张图片-->
        <div class="conver-wrapper"  v-if="article.cover.type === 3">
          <div class="cover-item" v-for="imgSrc in article.cover.images" :key="imgSrc.art_id">
            <van-image
              fit="cover"
              class="right-cover"
              slot="default"
              :src="imgSrc"/>
          </div>
        </div>
        <div class="label-infor-wrapper">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        slot="default"
        width="100"
        height="100"
        :src="article.cover.images[0]"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      request: true
    }
  },
  data() {
    return {
      key: 'value'
    }
  },
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
}
</style>
