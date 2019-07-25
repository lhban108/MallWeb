<template>
  <div>
    <ul>
      <li v-for="item in menus" :key="item.id" @click="toItemPage(item)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      menus: [
        {
          id: '1',
          name: '商场',
          path: '/goodsList'
        },
        {
          id: '2',
          name: 'H5拖动',
          path: '/H5Drag'
        }
      ]
    }
  },
  methods: {
    toItemPage (item) {
      this.$router.push(item.path)
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  margin: 40px auto;
  width: 400px;
  border: 1px solid #ccc;
  background-color: #fff;
  height: 500px;
  padding: 20px;
  border-radius: 5px;
}
li {
  cursor: pointer;
  list-style: none;
  font-size: 16px;
  margin-top: 20px;
  transition-duration: .3s;
  background-color: #fff;
  padding: 5px;
  border-radius: 3px;
}
li:hover {
  color: #ff6420;
  font-size: 19px;
  transition-duration: .3s;
  background-color: #ccc;
}
</style>
