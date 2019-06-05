<template>
  <div class="accessory-list">
      <ul>
        <li v-for="goods in goodsListData"
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
              <a href="javascript:;" class="btn btn--m">加入购物车</a>
            </div>
          </div>
        </li>
      </ul>
      <slot name="loadMore"></slot>
  </div>
</template>

<script>
export default {
  name: 'goodsShow',
  props: {
    goodsListData: {

    },
    goodsListTotal: {

    }
  }
}
</script>

<style lang="scss" scoped>
.accessory-list {
  flex: 1;
  overflow-y: auto;
  background-color: #ffd7d7;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    width: 23%;
    margin-right: 1.5%;
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

  li:hover {
    border-color: #ee7a23;
    transform: translateY(-5px);
    box-shadow: 0 0 10px #999;
    transition: all .5s ease-out;
  }
}
</style>
