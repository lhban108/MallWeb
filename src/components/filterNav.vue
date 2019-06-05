<template>
  <div class="filter-nav">
    <span class="sortby">按价格排序：</span>
    <a href="javascript:void(0)"
      class="sort by-asc"
      :class="{'current': current==='asc'}"
      @click="selectCurrent('asc')">
      升序
      <i class="icon iconfont iconiconasc"></i>
    </a>
    <a href="javascript:void(0)"
    class="sort by-desc"
    :class="{'current': current==='desc'}"
    @click="selectCurrent('desc')">
      降序
      <i class="icon iconfont iconiconsort"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'filterNav',
  params: {
    selectSort: {
      type: Function
    }
  },
  data () {
    return {
      current: 'asc'
    }
  },
  methods: {
    selectCurrent (sort) {
      this.current = sort
      const sortby = sort === 'asc' ? 1 : -1
      this.$emit('selectSort', sortby)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-nav {
  height: 55px;
  line-height: 55px;
  margin: 10px 0 30px;
  padding: 0 0 0 20px;
  background: #fff;
  text-align: right;
  overflow: hidden;
  a {
    margin: 0 10px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  a.sort   {
    color: #ccc;
    transition: all .5s ease-out;
  }
  .sort.current {
    font-weight: 600;
    color: #ee7a23;
  }
  .sort:hover {
    color: #ee7a23;
    transition: all .5s ease-out;
  }
}
</style>
