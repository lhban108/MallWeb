<template>
  <div class="sign-in" v-loading="loading">
    <el-form
      class="sign-in-form"
      label-position="left"
      label-width="80px"
      :model="signForm"
      :rules="signRules"
      size="medium"
      ref="signForm1">
      <el-row>
        <el-col>
          <div class="sign-in-title">
            <span>用户信息</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="colWidth">
          <el-form-item prop="userName" label="用户名">
            <el-input v-model.trim="signForm.userName" clearable size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="colWidth">
          <el-form-item prop="userPwd" label="密码">
            <el-input v-model.trim="signForm.userPwd" type="password" clearable size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="colWidth">
          <el-form-item prop="checkPwd" label="确认密码">
            <el-input v-model.trim="signForm.checkPwd" type="password" clearable size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="colWidth">
          <el-form-item prop="userTel" label="手机号码">
            <el-input v-model.number.trim="signForm.userTel" clearable size="large">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="butn-area">
        <el-col :span="colWidth">
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" size="medium">注册</el-button>
            <el-button @click="resetForm('loginForm')" size="medium">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="to-login" @click="toSingUpPage">返回登陆>></div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'signIn',
  data () {
    let validateCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.signForm.userPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validateUserTel = (rule, value, callback) => {
      if (value) {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          }
        }, 500)
      } else {
        callback()
      }
    }
    return {
      signForm: {
        userName: '',
        userPwd: '',
        checkPwd: '',
        userTel: ''
      },
      signRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        checkPwd: [{ required: true, validator: validateCheckPwd, trigger: 'blur' }],
        userTel: [{ validator: validateUserTel, trigger: 'blur' }]
      },
      loading: false,
      colWidth: 22
    }
  },
  methods: {
    submitForm () {
      this.$refs.signForm1.validate((valid) => {
        if (valid) {
          this.loading = true
          this.axios.post('/users/signIn', {
            userName: this.signForm.userName,
            userPwd: this.signForm.userPwd,
            userTel: this.signForm.userTel
          }).then((res) => {
            if (res.data.status === 'success') {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              setTimeout(_ => {
                this.loading = false
                this.$router.push('/login')
              }, 1000)
            } else if (res.data.status === 'exist') {
              this.loading = false
              this.$message.error(res.data.msg)
            }
          }).catch((err) => {
            this.loading = false
            console.log(err)
          })
        }
      })
    },
    resetForm () {
      this.$refs.signForm1.resetFields()
    },
    toSingUpPage () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
  .sign-in {
    display: flex;
    justify-content: center;
    .sign-in-form {
      width: 500px;
      margin: 30px auto;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 25px;
      border-radius: 5px;

      .sign-in-title {
        height: 70px;
        display: flex;
        justify-content: center;
        font-size: 22px;
        font-family: "microsoft yahei";
        letter-spacing: .5em;
        text-transform: uppercase;
      }
    }
    .to-login {
      padding-right: 45px;
      text-align: right;
      cursor: pointer;
      color: #666666;
    }
    .to-login:hover {
      color: #ee7a23;
      text-decoration: underline;
    }
  }
</style>
