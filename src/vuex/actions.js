export default {
  // context是一个store对象, 通过mutation来改变state
  getDemoDataSync (context, param1) {
    this.axios.get('getDemoDataList').then(res => {
      context.commit('setDemoData', res.data.result)
    })
  }
}
