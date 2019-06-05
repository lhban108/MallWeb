<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img src="static/newLogo.png" style="width: 125px;" class="navbar-brand-logo">
        </a>
      </div>

      <div class="navbar-right-container">
        <div class="navbar-menu-container">
          <a href="javascript:void(0)"
             v-if="userName.length === 0"
             class="navbar-link"
             @click="dialogVisible = true">
            <span>Login</span>
          </a>
          <el-popover
            v-else
            class="current-userName"
            placement="bottom"
            min-width="90"
            trigger="click">
            <span class="login-out-butn" @click="logout">退出登陆</span>
            <span slot="reference">{{userName}}</span>
          </el-popover>
          <div class="navbar-cart-container">
            <a href="/#/cart" class="navbar-link navbar-cart-link">
              <i class="icon iconfont icongouwuche" ></i>
            </a>
          </div>
        </div>
      </div>

    </div>
    <el-dialog
      title="登陆"
      :visible.sync="dialogVisible"
      width="500px"
      @closed="clearForm">
          <el-form :model="loginForm" status-icon :rules="loginRules">
            <el-form-item label="用户名"  prop="userName">
              <el-input v-model.trim="loginForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="userPwd">
              <el-input type="password" v-model.trim="loginForm.userPwd" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitLogin">确 定</el-button>
          </div>
        </el-dialog>
  </header>
</template>

<script>
export default {
  name: 'pageHeader',
  data () {
    return {
      loginMsg: '未登录',
      cartMsg: '购物车信息',
      dialogVisible: false,
      loginForm: {
        userName: '',
        userPwd: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      loginState: 'out'
    }
  },
  computed: {
    userName () {
      return this.$store.state.userName
    }
  },
  methods: {
    submitLogin () {
      this.$emit('setAllLoading', true)
      this.axios.post('/users/login', {
        userName: this.loginForm.userName,
        userPwd: this.loginForm.userPwd
      }).then((res) => {
        this.$emit('setAllLoading', false)
        if (res.data.status === 'success') {
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.$store.commit('setUserName', res.data.result.userName)
        } else if (res.data.status === 'error') {
          this.$message.error(res.data.msg)
        }
      }).catch((err) => {
        this.$emit('setAllLoading', false)
        console.log(err)
      })
    },
    logout () {
      this.$emit('setAllLoading', true)
      this.axios.post('/users/logout').then(res => {
        this.$emit('setAllLoading', false)
        if (res.data.status === 'success') {
          this.$message({
            message: '退出登陆成功',
            type: 'success'
          })
          this.$nextTick(_ => {
            this.$store.commit('setUserName', '')
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.$emit('setAllLoading', false)
        console.log(err.message)
      })
    },
    clearForm () {
      this.loginForm = {
        userName: '',
        userPwd: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #fff;
  font-family: moderat,sans-serif;
  font-size: 16px;
  height: 80px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 70px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 20px 10px;
  .navbar-left-container {
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
    display: flex;
  }

  .navbar-right-container {
    align-items: center;
    justify-content: flex-start;
    display: flex;
    .navbar-menu-container {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
      align-items: center;
      .navbar-link {
        color: #666;
        text-decoration: none;
        font-size: 17px;
      }
      .navbar-cart-container {
        .navbar-cart-link {
          color: #666;
          text-decoration: none;
          i{
            font-size: 20px;
            margin-left: 16px;
          }
        }
      }
    }
  }
}

.current-userName {
  cursor: pointer;
}
.current-userName:hover {
  color: #ee7a23;
  transition: all .3s ease-out;
}
.login-out-butn {
  display: block;
  text-align: center;
  cursor: pointer;
  letter-spacing: .25em;
}
.login-out-butn:hover {
  color: #ee7a23;
  transition: all .3s ease-out;
}
</style>
