<template>
  <div>
    <!-- 导航栏-->
    <van-nav-bar title="登录" />
    <!-- 登录注册 -->
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请收入手机号"
          :rules="loginFormRules.mobile"
        >
          <i slot="left-icon" class="iconfont iconshouji"></i>
        </van-field>
        <van-field
          v-model="user.code"
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
            <!-- <van-count-down millisecond :time="time" format="HH:mm:ss:SS" /> -->
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
import { login } from '@/api/user'
export default {
  data () {
    return {
      loginFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' }],
        code: [{ required: true, message: '验证码不能为空' }]
      },
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        const { data: res } = await login(this.user)

        console.log(res.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码不正确')
        } else {
          this.$toast.fail('登录失败请稍后重试')
        }
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
