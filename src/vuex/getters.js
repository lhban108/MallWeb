export default {
  filterByAge (state) {
    return state.demoData.filter(item => item.age < 29)
  }
}
