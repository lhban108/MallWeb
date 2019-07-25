<template>
  <layout v-loading="allLoading">
    <template v-slot:container>
      <nav-bread :navOptions='navOptions'></nav-bread>
      <div class="cart-list">
        <div class="cart-title">全部商品</div>
        <div class="cart-list-header">
          <el-checkbox
            class="header-select-all"
            v-model="checked"
            size="medium"
            @change="changeBox">全选</el-checkbox>
          <span class="header-goods">商品</span>
          <span class="header-unit-price">单价</span>
          <span class="header-num">数量</span>
          <span class="header-total">小计</span>
          <span class="header-edit">操作</span>
        </div>
        <div class="goods-detail" v-for="item in cartListData"
          :key="item.id" :class="{'current-checked': item.boxChecked}">
          <el-checkbox
            class="goods-select"
            v-model="item.boxChecked"
            size="medium"
            @change="changeBox(item)"></el-checkbox>
          <span class="goods-pic">
            <a>
              <img class="image" :src="'static/' + item.productImage" :alt="item.productName">
            </a>
          </span>
          <span class="goods-name">{{item.productName}}</span>
          <span class="goods-unit-price">{{item.salePrice}}</span>
          <el-input-number v-model="item.productNum" class="goods-num"
            @change="addGoodsChange(item)" :min="0"></el-input-number>
          <span class="goods-total-price">{{item.salePrice*item.productNum}}</span>
          <el-button class="goods-remove" type="text" @click="removeGoods(item)">删除</el-button>
        </div>
      </div>
      <div class="accounts">
        <div class="count-num">已选择{{selectNum}}件商品</div>
        <div class="count-pay">
          总价：
          <span>￥{{allPay}}</span>
        </div>
        <div class="to-pay">去结算</div>
      </div>
    </template>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import navBread from '@/components/navBread'
export default {
  name: 'cartList',
  components: {
    layout,
    navBread
  },
  data () {
    return {
      navOptions: [
        {
          name: 'Hooms',
          path: '/'
        },
        {
          name: 'Cart',
          path: '/Cart'
        }
      ],
      cartListData: [],
      checked: false,
      allLoading: false,
      selectNum: 0,
      allPay: 0
    }
  },
  created () {
    this.getCartListData()
  },
  methods: {
    getCartListData () {
      this.allLoading = true
      this.axios.get('/goods/getCartList').then(req => {
        this.allLoading = false
        if (req.data.status === 'success') {
          let cartData = req.data.result
          cartData.forEach(item => {
            item.boxChecked = item.checked === '1'
          })
          this.cartListData = cartData
          this.updateCount()
        } else if (req.data.status === 'noLogin') {
          this.$router.push('/login')
        }
      })
    },
    addGoodsChange (item) {
      this.axios.post('/goods/changeCartNum', {
        productId: item.productId,
        productNum: item.productNum
      }).then(res => {
        if (res.data.status === 'success') {
          this.updateCount()
        }
      })
    },
    changeBox (item) {
      let params = {}
      if (typeof item === 'boolean') {
        params.checkedAll = item ? '1' : '0'
      } else {
        params.checked = item.boxChecked ? '1' : '0'
        params.productId = item.productId
      }
      this.axios.post('/goods/changeChecked', params).then(res => {
        if (res.data.status === 'success') {
          if (typeof item === 'boolean') {
            this.cartListData.forEach(e => {
              e.boxChecked = item
            })
          }
          this.updateCount()
        } else if (res.data.status === 'noLogin') {
          this.$message({
            type: 'info',
            message: '当前登录已超时，请从新登录'
          })
          setTimeout(_ => {
            this.$router.push('/login')
          }, 1000)
        }
      })
    },
    removeGoods (item) {
      this.$confirm('是否将该商品从购物车中删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.allLoading = true
        this.axios.post('/goods/removeGoods', {productId: item.productId}).then(req => {
          if (req.data.status === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getCartListData()
          } else {
            this.allLoading = false
            this.$message({
              type: 'info',
              message: '删除失败，请稍后重试!'
            })
          }
        }).catch(err => {
          this.allLoading = false
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateCount () {
      let totalNum = 0
      let totalPrice = 0
      this.cartListData.forEach(item => {
        if (item.boxChecked) {
          item.productNum = parseInt(item.productNum)
          item.salePrice = parseInt(item.salePrice)
          totalNum += item.productNum
          totalPrice += item.productNum * item.salePrice
        }
      })
      this.selectNum = totalNum
      this.allPay = totalPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-list {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
}
.cart-list-header {
  display: flex;
  height: 32px;
  line-height: 32px;
  padding: 5px 0;
  background: #f3f3f3;
  border: 1px solid #d1d1d1;
  font-weight: 600;
  border-bottom: 0;
  .header-select-all {
    margin-left: 50px;
    /deep/ .el-checkbox__label {
      font-weight: 600;
      color: #000;
      font-size: 16px;
    }
  }
  .header-goods {
    flex-grow: 1;
    text-align: center;
  }
  .header-unit-price, .header-num, .header-total, .header-edit {
    width: 150px;
    text-align: center;
  }
}
.goods-detail {
  display: flex;
  border-top: 1px solid #c5c5c5;
  .goods-select {
    margin: 50px;
  }
  .goods-pic {
    width: 120px;
    height: 120px;
    margin-top: 10px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .goods-name {
    flex-grow: 1;
    margin-top: 10px;
    width: 150px;
    line-height: 120px;
    text-align: center;
  }
  .goods-unit-price, .goods-total-price, .goods-remove {
    margin-top: 10px;
    width: 150px;
    text-align: center;
    line-height: 120px;
  }
  .goods-num {
    width: 150px;
    text-align: center;
    margin-top: 55px;
  }
}
.cart-title {
  color: #E2231A;
  position: relative;
  font-weight: 700;
  line-height: 26px;
  cursor: pointer;
  margin: 15px 0 0 0;
}

.goods-detail.current-checked {
  background-color: #fff4e8;
}
.accounts {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  height: 50px;
  line-height: 50px;
  background: #fff;
  border: 1px solid #d1d1d1;
  font-weight: 600;
  margin-bottom: 20px;
  justify-content: flex-end;
  .count-num, .count-pay {
    width: 160px;
  }
  .count-pay>span {
    color: #e54346;
  }
  .to-pay {
    width: 120px;
    text-align: center;
    background-color: #e54346;
    color: #fff;
    cursor: pointer;
  }
}

</style>
