<template>
  <div>
    <!-- 导航栏-->
    <van-nav-bar title="登录" />
    <!-- 登录注册 -->
    <van-form>
      <van-field
        name="mobile"
        placeholder="请收入手机号"
        :rules="loginFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="loginFormRules.code"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button
            class="send-code"
            size="mini"
            slot="left-icon"
            round
            :hairline="false"
            >发送验证码</van-button
          >
        </template>
      </van-field>
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
export default {
  data () {
    return {
      loginFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' }],
        code: [{ required: true, message: '验证码不能为空' }]
      }
    }
  }
}
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
