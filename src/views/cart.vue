<template>
  <layout>
    <template v-slot:container>
      <nav-bread :navOptions='navOptions'></nav-bread>
      <div class="cart-list">
        <div class="cart-title">全部商品</div>
        <div class="cart-list-header">
          <el-checkbox class="header-select-all"
            v-model="checked"
            @change="checkedAll">全选</el-checkbox>
          <span class="header-goods">商品</span>
          <span class="header-unit-price">单价</span>
          <span class="header-num">数量</span>
          <span class="header-total">小计</span>
          <span class="header-edit">操作</span>
        </div>
        <div class="goods-detail" v-for="item in cartListData" :key="item.id">
          <el-checkbox class="goods-select" v-model="item.boxChecked"></el-checkbox>
          <span class="goods-pic">
            <a href="#">
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
      checked: false

    }
  },
  created () {
    this.getCartListData()
  },
  methods: {
    getCartListData () {
      this.axios.get('/goods/getCartList').then(req => {
        if (req.data.status === 'success') {
          let cartData = req.data.result
          cartData.forEach(item => {
            item.boxChecked = item.checked === '1'
          })
          this.cartListData = cartData
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
      })
    },
    checkedAll () {

    },
    removeGoods (item) {
      this.$confirm('是否将该商品从购物车中删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除没有成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
  margin: 0 0 10px;
  padding: 5px 0;
  background: #f3f3f3;
  border: 1px solid #e9e9e9;
  border-top: 0;
  .header-select-all {
    margin-left: 50px;
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

</style>
