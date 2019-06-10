<template>
  <layout>
    <template v-slot:container>
      <nav-bread :navOptions='navOptions'></nav-bread>
      <div class="container">
        <filter-nav @selectSort="selectSort"></filter-nav>
        <div class="accessory-result">
          <price-side-bar @setPriceLevel="setPriceLevel"></price-side-bar>
            <div class="accessory-list" v-loading="loading">
              <ul>
                <li v-for="(goods, index) in goodsListData"
                  :class="{'right-one': (index+1)%4 === 0}"
                    :key="goods.productId">
                  <div class="pic">
                    <a href="#">
                      <img :src="'static/' + goods.productImage" alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.productName}}</div>
                    <div class="price">￥{{goods.salePrice}}</div>
                    <div class="butn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(goods)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[8, 16, 40, 80]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper, total, sizes"
              :total="goodsListTotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import navBread from '@/components/navBread'
import filterNav from '@/components/filterNav'
import priceSideBar from '@/components/priceSideBar'
import goodsShow from '@/components/goodsShow'
export default {
  name: 'goodsList',
  components: {
    layout,
    navBread,
    filterNav,
    priceSideBar,
    goodsShow
  },
  data () {
    return {
      navOptions: [
        {
          name: 'Hooms',
          path: '/'
        },
        {
          name: 'Goods',
          path: '/goodsList'
        }
      ],
      goodsListData: [],
      goodsListTotal: 0,
      page: 1,
      pageSize: 8,
      sort: 1,
      priceLevel: 1,
      busy: true,
      loading: true
    }
  },
  created () {
    this.getGoodsListData()
  },
  methods: {
    getGoodsListData (flag) {
      this.loading = true
      this.axios.get('/goods/getGoodsList', {
        params: {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sort,
          priceLevel: this.priceLevel
        }
      }).then(res => {
        this.loading = false
        if (res.data.status === 'success') {
          if (flag) {
            this.goodsListData = this.goodsListData.concat(res.data.result.list)
            if (res.data.result.list.length < 8) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsListData = res.data.result.list
            this.busy = false
          }
          this.goodsListTotal = res.data.result.total
        } else {
          this.goodsListData = []
          this.goodsListTotal = 0
        }
      }).catch(err => {
        this.loading = false
        console.log('errMsg:', err)
      })
    },
    selectSort (sort) {
      this.sort = sort
      this.page = 1
      this.pageSize = 8
      this.getGoodsListData()
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsListData(true)
      }, 100)
    },
    setPriceLevel (priceLevel) {
      this.page = 1
      this.pageSize = 8
      this.sort = 1
      this.priceLevel = priceLevel
      this.getGoodsListData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getGoodsListData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getGoodsListData()
    },
    addCart (goods) {
      this.loading = true
      this.axios.post('/goods/addCart', {productId: goods.productId}).then((res) => {
        this.loading = false
        if (res.data.status === 'success') {
          this.$message({
            message: '加入购物车成功！',
            type: 'success'
          })
        } else if (res.data.status === 'noLogin') {
          this.$router.push('/login')
          this.$message.error(res.data.msg)
        }
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
  .accessory-result {
    display: flex;
  }

  .accessory-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    // background-color: #ffd7d7;
    padding: 6px 0 0 1px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      width: 23%;
      margin-right: 2%;
      margin-bottom: 1.5%;
      display: inline-block;
      background: #fff;
      border: 2px solid #e9e9e9;
      float: left;
      transition: all .5s ease-out;
      .pic {
        overflow: hidden;
        a {
          display: block;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          transition: color .3s ease-out;
          color: inherit;
          text-decoration: none;
          cursor: pointer;
          img {
            width: 100%;
            border: 0;
          }
        }
      }
      .main {
        padding: 20px 10px 10px;
        .name {
          height: 4em;
          line-height: 1.25em;
          padding-bottom: 10px;
          font-family: moderat,sans-serif;
          font-weight: 700;
          overflow: hidden;
        }
        .price {
          float: left;
          line-height: 30px;
          color: #d1434a;
          font-size: 1.25em;
        }
        .butn-area {
          clear: both;
          padding-top: 10px;
          a {
            width: 100%;
            display: inline-block;
            text-align: center;
            font-size: 14px;
            font-family: moderat,sans-serif;
            font-weight: 700;
            border: 1px solid #d1434a;
            color: #d1434a;
            text-transform: uppercase;
            letter-spacing: .25em;
            white-space: nowrap;
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
    li.right-one {
      margin-right: 0;
    }

    li:hover {
      border-color: #ee7a23;
      transform: translateY(-5px);
      box-shadow: 0 0 10px #999;
      transition: all .5s ease-out;
    }
  }
  .accessory-list ul::after {
    clear: both;
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
  }
  /deep/ .el-pagination {
    height: 50px;
  }
  .btn--m {
    transition: all .5s ease-out;
  }
  .btn--m:hover {
    transition: all .5s ease-out;
    background-color: #ffe5e6;
  }
}
</style>
