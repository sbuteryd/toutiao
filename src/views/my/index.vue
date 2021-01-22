<template>
  <div>
    <div>
      <!-- 未登录 -->
      <div class="header">
        <img class="hd-mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="hd-login-reg">登录 / 注册</span>
      </div>
      <!-- 收藏 历史-->
      <van-grid clickable :column-num="2">
        <van-grid-item text="路由跳转">
          <template icon>
            <i class="iconfont iconshoucang history-favo-icon favo"></i>
            <span class="icon-text">收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item text="URL 跳转">
          <template icon>
            <i class="iconfont iconlishi history-favo-icon history"></i>
            <span class="icon-text">历史</span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 单元格 -->
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
      <!-- 未登录-结束 -->
    </div>
    <!-- 登录 -->
    <div>
      <div class="header">
        <!-- 头像 -->
        <van-image
          round
          width="10rem"
          height="10rem"
          src="~@/assets/avatar.png"
        />
        <!-- 关注 -->
        <div class="attention">
          <div class="attention-item">
            <span class="number">8</span>
            <span class="text">头条</span>
          </div>
          <div class="attention-item">
            <span class="number">8</span>
            <span class="text">关注</span>
          </div>
          <div class="attention-item">
            <span class="number">8</span>
            <span class="text">粉丝</span>
          </div>
          <div class="attention-item">
            <span class="number">8</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 750px;
  height: 401px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}

.hd-mobile-img {
  width: 132px;
  height: 132px;
}
.hd-login-reg {
  margin-top: 15px;
  font-size: 28px;
  color: #fff;
}
.history-favo-icon {
  font-size: 45px;
}
.favo {
  color: #eb5253;
}
.history {
  color: #ff9d1d;
}
.icon-text {
  font-size: 27px;
}
.van-grid-item {
  height: 141px;
}
// 关注
.attention {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 268px;
}
.attention-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.attention-item .text,
.attention-item .number {
  font-size: 22px;
  text-align: center;
  color: #fff;
}
</style>