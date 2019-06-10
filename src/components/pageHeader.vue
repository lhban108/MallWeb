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
          <div class="navbar-cart-container">
            <el-tooltip class="item" effect="light" content="前往购物车结算" placement="bottom-end">
              <a href="/cart" class="navbar-link navbar-cart-link">
                <i class="icon iconfont icongouwuche" ></i>
              </a>
            </el-tooltip>
          </div>
          <a href="javascript:void(0)"
             v-if="userName.length === 0"
             class="to-loginPage"
             @click="toLiginPage">
            <span>点击登陆</span>
          </a>
          <el-popover
            v-else
            class="current-userName"
            placement="bottom"
            min-width="90"
            trigger="click">
            <span class="login-out-butn" @click="logout">退出当前登陆</span>
            <span slot="reference">{{userName}}</span>
          </el-popover>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'pageHeader',
  data () {
    return {
      loginMsg: '未登录',
      cartMsg: '购物车信息'
    }
  },
  computed: {
    userName () {
      return this.$store.state.userName
    }
  },
  methods: {
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
    toLiginPage () {
      this.$router.push('/login')
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
          margin-right: 30px;
          i{
            font-size: 25px;
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
  letter-spacing: .15em;
}
.login-out-butn:hover {
  color: #ee7a23;
  transition: all .3s ease-out;
}
.to-loginPage {
  font-size: 15px;
  color: #666;
  text-decoration: none;
}
.to-loginPage:hover {
  color: #ee7a23;
  text-decoration: underline;
}
</style>
