<template>
  <div>
    <!-- 导航栏-->
    <van-nav-bar title="登录" />
    <!-- 登录注册 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请收入手机号"
          :rules="loginFormRules.mobile"
          maxlength="11"
          type="number"
        >
          <i slot="left-icon" class="iconfont iconshouji"></i>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          :rules="loginFormRules.code"
          maxlength="6"
          type="number"
        >
          <i slot="left-icon" class="iconfont iconyanzhengma"></i>
          <template #button>
            <van-count-down 
            v-if="countDownTime" 
            :time="time" format="ss s" 
            @finish='countDownTime=false'
            />
            <van-button
              v-else
              class="send-code"
              size="mini"
              slot="left-icon"
              round
              :hairline="false"
              native-type="button"
              @click="sendCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>

      <div class="btn-box">
        <van-button class="register-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
      <div class="test"></div>
    </van-form>
  </div>
</template>

<script>
import { sendCode } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      loginFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      user: {
        mobile: "13988888888",
        code: "246810",
      },
      time: 60 * 1000,
      // 时间
      countDownTime: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("123");
    },
    async sendCode() {
      try {
        await this.$refs.loginFormRef.validate("mobile");
      } catch (err) {
        return console.log("校验失败");
      }
      this.countDownTime = true;
      try {
        await sendCode(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast("发送太频繁");
        } else {
          this.$toast("请稍后重试");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: #3296fa;
}
/deep/.van-nav-bar__title {
  font-size: 32px;
  color: #fff;
}
// 注册按钮
.register-btn {
  height: 88px;
  background: #6db4fb;
}
.iconfont {
  font-size: 37px;
}
// 验证码
.btn-box {
  margin: 53px 28px;
}
.send-code {
  width: 152px;
  height: 46px;
  color: #666666;
  background: #ededed;
}
</style>
