<template>
  <div class="price-side-bar">
    <div class="price-title">
      价格区间
    </div>
    <a class="price-item"
      href="javascript:void(0)"
      :class="{'current': item.current}"
      v-for="item in priceList"
      @click="selectPrice(item)"
      :key="item.id">{{item.label}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'priceSideBar',
  data () {
    return {
      priceList: [
        {
          label: '全部',
          current: true,
          id: '1'
        },
        {
          label: '0.00 - 100.00',
          current: false,
          id: '2'
        },
        {
          label: '100.00 - 500.00',
          current: false,
          id: '3'
        },
        {
          label: '500.00 - 1000.00',
          current: false,
          id: '4'
        },
        {
          label: '1000.00 - 5000.00',
          current: false,
          id: '5'
        }
      ]
    }
  },
  methods: {
    selectPrice (currentItem) {
      this.priceList.forEach(item => {
        if (item.id === currentItem.id) {
          item.current = true
        } else {
          item.current = false
        }
      })
      this.$emit('setPriceLevel', currentItem.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.price-side-bar {
  border-radius: 5px;
  width: 190px;
  padding: 10px 20px 0 20px;
  transition: right .5s ease-out;
  margin-right: 25px;
  box-sizing: inherit;
  overflow-y: auto;
  display: block;
  .price-title {
    font-family: moderat,sans-serif;
    letter-spacing: .25em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .price-item {
    display: block;
    padding: 5px 0;
    color: #605f5f;
    text-decoration: none;
    cursor: pointer;
    line-height: 1.2em;
    margin: 20px 0;
    transition: padding-left .3s ease-out;
    margin-left: 10px;
  }
  .price-item.current {
    color: #ee7a23;
    text-decoration: underline;
    font-weight: 600;
  }
  .price-item:hover {
    transition: padding-left .3s ease-out;
    border-left: 2px solid #ee7a23;
    padding-left: 15px;
    color: #ee7a23;
  }
}
</style>
