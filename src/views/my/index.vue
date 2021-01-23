<template>
  <div>
    <div>
      <!-- 登录 -->
      <div v-if="user">
        <div class="header">
          <!-- 头像 -->
          <div class="user-infor">
            <van-image :src="require('../../assets/avatar.png')" />
            <span class="user-name">黑马头条号</span>
            <van-button class="infor" round size="small" type="default"
              >编辑资料</van-button
            >
          </div>
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
      <!-- 未登录 -->
      <div v-else class="header">
        <div class="login-reg-box" @click="$router.push('/login')">
          <img class="hd-mobile-img" src="~@/assets/mobile.png" alt="" />
          <span class="hd-login-reg">登录 / 注册</span>
        </div>
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
      <van-cell-group v-if="user">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell class="logout" clickable @click="loginOut" title="退出登录" />
      </van-cell-group>
      <!-- 未登录-结束 -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserinforApi } from "@/api/user";
export default {
  name:'MyInfor',
  data() {
    return {
      srcImg: "~@/assets/avatar.png",
      userInfor:{}
    };
  },
  created() {
    if (this.user) {
      this.getUserinfor();
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async getUserinfor() {
      try{
        const {data} = await getUserinforApi();
        this.userInfor = data.data
      }catch(err){

      }
      
    },
    loginOut() {
      this.$dialog.confirm({
        title: "确认退出吗？",
      })
        .then(() => {
          this.$store.commit('setToken',null)
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
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
//
.user-infor {
  width: 100%;
  height: 303px;
}
// 关注
.attention {
  display: flex;
  justify-content: space-around;
  width: 100%;
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
// img
.van-image {
  position: absolute;
  left: 32px;
  top: 116px;
  width: 132px;
  height: 132px;
}
.infor {
  position: absolute;
  top: 166px;
  right: 33px;
  height: 32px;
  font-size: 20px;
  color: #000;
}
.user-name {
  position: absolute;
  top: 167px;
  left: 186px;
  font-size: 30px;
  color: #fff;
}
.login-reg-box {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.logout {
  text-align: center;
  color: #d86262;
}
</style>