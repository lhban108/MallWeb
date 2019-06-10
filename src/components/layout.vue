<template>
  <div class="accessory-result-page accessory-page" v-loading="allLoading">
    <page-header @setAllLoading="setAllLoading"></page-header>
    <section class="accessory-result-page accessory-page">
      <slot name="container"></slot>
      <page-footer></page-footer>
    </section>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import pageFooter from '@/components/pageFooter'
export default {
  name: 'layout',
  components: {
    pageHeader,
    pageFooter
  },
  data () {
    return {
      allLoading: false
    }
  },
  methods: {
    setAllLoading (flag) {
      this.allLoading = flag
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
