<template>
  <div class="login-page">
    <div class="login-form">
      <div class="form-header">
        <p>
          账户登录
        </p>
      </div>
      <div class="form-content">
        <el-form
          label-position="top"
          label-width="80px"
          :model="loginForm"
          :rules="loginRules"
          size="medium"
          ref="loginForm">
          <el-row>
            <el-col :span="colWidth">
              <el-form-item prop="userName">
                <el-input v-model.trim="loginForm.userName" clearable size="large" @keyup.enter.native="submitForm('loginForm')">
                  <template slot="prepend"><i class="icon iconfont iconyonghuming"></i></template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="colWidth" class="col-pwd">
              <el-form-item prop="userPwd">
                <el-input v-model.trim="loginForm.userPwd" type="password" clearable size="large" @keyup.enter.native="submitForm('loginForm')">
                  <template slot="prepend"><i class="icon iconfont iconmima"></i></template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="colWidth">
              <a href="javascript:;" class="forget-pwd" @click="forgetPwd">忘记密码</a>
            </el-col>
          </el-row>
          <el-row class="butn-area">
            <el-col :span="colWidth">
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" size="medium">提交</el-button>
                <el-button @click="resetForm('loginForm')" size="medium">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="form-footer" @click="toSingInPage">立即注册</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        userName: '',
        userPwd: ''
      },
      colWidth: 24,
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.axios.post('/users/login', {
            userName: this.loginForm.userName,
            userPwd: this.loginForm.userPwd
          }).then((res) => {
            if (res.data.status === 'success') {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              this.$store.commit('setUserName', res.data.result.userName)
              this.$nextTick(_ => {
                this.$router.push('/')
              })
            } else if (res.data.status === 'error') {
              this.$message.error(res.data.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    resetForm (loginForm) {
      this.loginForm = {
        userName: '',
        userPwd: ''
      }
    },
    forgetPwd () {

    },
    toSingInPage () {
      this.$router.push('/signIn')
    }
  }
}
</script>

<style scoped lang="scss">
  .login-page {
    overflow: hidden;
  }
  .login-form {
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    margin: 100px;
    background-color: #fff;
    border-radius: 5px;
    margin: 100px 200px auto auto;

  }
  .form-header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    font-weight: 700;
    font-size: 18px;
    font-family: "microsoft yahei";
    letter-spacing: .5em;
    text-transform: uppercase;
  }
  .form-content {
    padding: 30px 30px 0 30px;
    flex-grow: 1;
    .forget-pwd {
      font-size: 14px;
      float: right;
      color: #666;
      text-decoration: none;
    }
    .forget-pwd:hover {
      color: #ee7a23;
      text-decoration: underline;
    }

    .butn-area {
      margin-top: 10px;
      /deep/ .el-form-item__content {
        display: flex;
        justify-content: space-around;
        .el-button {
          width: 170px;
          letter-spacing: .4em;
          text-transform: uppercase;
          font-size: 15px;
        }
      }
      /deep/.el-form-item {
        margin-bottom: 0;
      }
    }
    /deep/ .el-form-item__error {
      margin-left: 60px;
      font-size: 13px;
    }
  }
  .form-footer {
    height: 40px;
    padding-right: 30px;
    text-align: right;
    background-color: #fcfcfc;
    border-radius: 0 0 5px 5px;
    line-height: 40px;
    border-top: 1px solid #f4f4f4;
    cursor: pointer;
    color: #666666;
  }
  .form-footer:hover {
    color: #ee7a23 !important;
    text-decoration: underline;
  }
  .col-pwd {
    margin-top: 5px;
  }
</style>
