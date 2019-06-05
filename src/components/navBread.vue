<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav-breadcrumb">
        <el-breadcrumb-item
          v-for="item in navOptions"
          :key="item.path"
          :to="{ path: item.path }">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBread',
  props: {
    navOptions: {
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-breadcrumb-wrap {
  background: #f0f0f0;
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 10px;
    .nav-breadcrumb {
      padding: 10px 0;
      line-height: 25px;
      font-size: 14px;
    }
  }
}
</style>
