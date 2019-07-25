<template>
  <div class="H5-drag">
    <section class="container">
      <div class="view-port"
        :style="{'width': `${viewPort.width}px`, 'height': `${viewPort.height}px`, 'background-image': `url(../../../static/drag/${viewPort.imgUrl})`}">
        <div class="dragP" v-for="item in dragPic" :key="item.dragImg">
          <div class="drag" v-drag v-if="item.pageNum == currentPage"
          :style="{'background-image': `url(../../../static/drag/${item.dragImg})`,'width':`${item.currentWidth}px`,'height':`${item.currentHeight}px`, 'left':`${item.currentX}px`, 'top':`${item.currentY}px` }"></div>
        </div>
      </div>
    </section>
    <div class="control-bar">
      <span class="zoom-area">
        <i class="icon iconfont iconfangda" @click="zoomChange('add')"></i>
        <span class="current-page">{{currentPercent}}</span>
        <i class="icon iconfont iconsuoxiao" @click="zoomChange('del')"></i>
      </span>
      <span class="add-seal icon iconfont icontianjia"></span>
      <span class="page-area">
        <i class="icon iconfont iconziyuanxhdpi" @click="pageChange('last')"></i>
        <span class="current-page">{{pageShow}}</span>
        <i class="icon iconfont iconziyuanxhdpi1" @click="pageChange('next')"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'H5Drag',
  data () {
    return {
      bgPic: [],
      dragPic: [],
      containerWidth: 0,
      containerHeight: 0,
      viewPort: {
        width: 0,
        height: 0,
        imgUrl: ''
      },
      currentZoom: 0,
      currentPage: 0,
      currentPercent: '100%'
    }
  },
  mounted () {
    this.containerWidth = document.querySelector('.container').getBoundingClientRect().width
    this.containerHeight = document.querySelector('.container').getBoundingClientRect().height
    this.getDragInfo()
  },
  computed: {
    'pageShow' () {
      const pageNum = this.currentPage + 1
      return pageNum + '/' + this.bgPic.length
    }
  },
  methods: {
    getDragInfo () {
      this.axios.get('/drags/getDragInfo').then(res => {
        if (res.data.status === 'success') {
          this.bgPic = res.data.result[0].bgPic
          this.dragPic = res.data.result[0].dragPic

          this.currentZoom = this.containerWidth / this.bgPic[this.currentPage].bgWidth
          this.defaultZoom = this.containerWidth / this.bgPic[this.currentPage].bgWidth
          this.viewPort.imgUrl = this.bgPic[this.currentPage].bgImg
          this.viewPort.width = this.containerWidth
          this.viewPort.height = this.bgPic[this.currentPage].bgHeight * this.currentZoom

          for (let index = 0; index < this.dragPic.length; index++) {
            this.dragPic[index].currentWidth = this.dragPic[index].dragWidth * this.defaultZoom
            this.dragPic[index].currentHeight = this.dragPic[index].dragHeight * this.defaultZoom
            this.dragPic[index].currentX = this.dragPic[index].dragColX * this.defaultZoom
            this.dragPic[index].currentY = this.dragPic[index].dragColY * this.defaultZoom
          }
        }
      })
    },
    pageChange (type) {
      if (type === 'last') {
        if (this.currentPage === 0) {
          return false
        }
        this.currentPage--
      } else if (type === 'next') {
        if (this.currentPage === this.bgPic.length - 1) {
          return false
        }
        this.currentPage++
      }
      this.currentZoom = this.containerWidth / this.bgPic[this.currentPage].bgWidth
      // this.viewPort.imgUrl = this.bgPic[this.currentPage].bgImg
      this.viewPort.width = this.containerWidth
      this.viewPort.height = this.bgPic[this.currentPage].bgHeight * this.currentZoom

      this.$set(this.viewPort, 'imgUrl', this.bgPic[this.currentPage].bgImg)

      this.currentPercent = '100%'
    },
    zoomChange (type) {
      let currentPoint = this.toPoint(this.currentPercent)
      if (type === 'add') {
        currentPoint += 0.1
      } else if (type === 'del' && currentPoint > 1) {
        currentPoint -= 0.1
      }
      this.viewPort.width = this.bgPic[this.currentPage].bgWidth * this.defaultZoom * currentPoint
      this.currentZoom = this.viewPort.width / this.bgPic[this.currentPage].bgWidth
      this.$set(this.viewPort, 'height', this.bgPic[this.currentPage].bgHeight * this.currentZoom)
      this.currentPercent = this.toPercent(currentPoint)
    },
    // 百分数转小数
    toPoint (percent) {
      let str = percent.replace('%', '')
      return str / 100
    },
    // 小数转百分数
    toPercent (point) {
      let str = Number(point * 100).toFixed(0)
      return str + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
  .H5-drag {
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: relative;
    .container {
      overflow: auto;
      margin: 10px;
      height: calc(100% - 20px);
      width: calc(100% - 20px);
      background-color: #fafafa;
      .view-port {
        background-size: cover;
      }

    }
    .control-bar {
      position: absolute;
      width: 100%;
      opacity: .8;
      background-color: #fff;
      height: 60px;
      bottom: 40px;
      display: flex;
      span {
        width: 42%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .zoom-area > i {
        font-size: 23px;
      }
      .page-area > i {
        font-size: 20px;
      }
      .add-seal {
        font-size: 23px;
        width: 16%;
      }
    }

    .drag {
      background-size: 100%;
      position: absolute;
      display: inline-block;
      background-size: cover;
      border: 1px solid rebeccapurple;
    }
  }
</style>
