<template>
  <div class="H5-drag" id="H5-drag">
    <section class="container">
      <div class="view-port" id="view-port"
        :style="{'width': `${viewPort.width}px`, 'height': `${viewPort.height}px`, 'background-image': `url(../../../static/drag/${viewPort.imgUrl})`}">
          <div v-for="item in dragPic" class="drag" :class="item.classFlag" :key="item.classFlag" v-drag="dragConfig" v-if="item.pageNum == currentPage"
          :style="{'background-image': `url(../../../static/drag/${item.dragImg})`,'width':`${item.currentWidth}px`,'height':`${item.currentHeight}px`, 'left':`${item.currentX}px`, 'top':`${item.currentY}px` }">
            <span class="del-seal" @click="delSeal(item.classFlag)">-</span>
          </div>
        </div>
    </section>
    <div class="control-bar" v-drag="barDragConfig">
      <span class="zoom-area">
        <i class="icon iconfont iconfangda" @click="zoomChange('add')"></i>
        <span class="current-page">{{currentPercent}}</span>
        <i class="icon iconfont iconsuoxiao" @click="zoomChange('del')"></i>
      </span>
      <span class="add-seal icon iconfont icontianjia" @click="addSeal"></span>
      <span class="page-area">
        <i class="icon iconfont iconziyuanxhdpi" @click="pageChange('last')"></i>
        <span class="current-page">{{pageShow}}</span>
        <i class="icon iconfont iconziyuanxhdpi1" @click="pageChange('next')"></i>
      </span>
    </div>
    <div class="save-button" @click="saveAll">保存</div>
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
      defaultZoom: 0,
      currentZoom: 0,
      currentPage: 0,
      currentPercent: '100%',
      dragConfig: {
        parentId: 'view-port'
      },
      barDragConfig: {
        parentId: 'H5-drag',
        onlyDragY: true
      }
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
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      this.axios.get('/drags/getDragInfo').then(res => {
        this.$indicator.close()
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
      }).catch(_ => {
        this.$indicator.close()
      })
    },
    saveAll () {
      this.updatePosition()
      let params = []
      for (let index = 0; index < this.dragPic.length; index++) {
        const dragColX = this.dragPic[index].currentX / this.currentZoom
        const dragColY = this.dragPic[index].currentY / this.currentZoom
        params.push({
          dragImg: this.dragPic[index].dragImg,
          dragWidth: parseInt(this.dragPic[index].dragWidth),
          dragHeight: parseInt(this.dragPic[index].dragHeight),
          pageNum: parseInt(this.dragPic[index].pageNum),
          dragColX: dragColX,
          dragColY: dragColY,
          classFlag: this.dragPic[index].classFlag
        })
      }
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      this.axios.post('/drags/saveDragInfo', {
        dragPic: params
      }).then(res => {
        this.$indicator.close()
        if (res.data.status === 'success') {
          this.$toast({
            message: '保存成功！'
          })
        } else {
          this.$toast({
            message: '保存失败,请稍后重试！'
          })
        }
      }).catch(err => {
        this.$indicator.close()
        this.$toast({
          message: err
        })
      })
    },
    pageChange (type) {
      this.updatePosition()
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
      this.defaultZoom = this.currentZoom
      // this.viewPort.imgUrl = this.bgPic[this.currentPage].bgImg
      this.viewPort.width = this.containerWidth
      this.viewPort.height = this.bgPic[this.currentPage].bgHeight * this.currentZoom

      this.$set(this.viewPort, 'imgUrl', this.bgPic[this.currentPage].bgImg)

      this.currentPercent = '100%'
    },
    updatePosition () {
      // 更新被拖拽对象在翻页前的大小为位置
      let currentPoint = this.toPoint(this.currentPercent)
      for (let index = 0; index < this.dragPic.length; index++) {
        if (this.dragPic[index].pageNum === this.currentPage) {
          const currentClass = document.querySelector('.' + this.dragPic[index].classFlag)
          this.dragPic[index].currentX = currentClass.offsetLeft / currentPoint
          this.dragPic[index].currentY = currentClass.offsetTop / currentPoint
          this.dragPic[index].currentHeight = this.dragPic[index].currentHeight / currentPoint
          this.dragPic[index].currentWidth = this.dragPic[index].currentWidth / currentPoint
        }
      }
    },
    zoomChange (type) {
      let currentPoint = this.toPoint(this.currentPercent)
      if (type === 'add') {
        currentPoint += 0.1
      } else if (type === 'del' && currentPoint > 1) {
        currentPoint -= 0.1
      }
      // 当前视口的宽度
      this.viewPort.width = this.bgPic[this.currentPage].bgWidth * this.defaultZoom * currentPoint
      this.currentZoom = this.viewPort.width / this.bgPic[this.currentPage].bgWidth
      this.currentPercent = this.toPercent(currentPoint)

      for (let index = 0; index < this.dragPic.length; index++) {
        if (this.dragPic[index].pageNum === this.currentPage) {
          const currentClass = document.querySelector('.' + this.dragPic[index].classFlag)
          const beforeColx = currentClass.offsetLeft
          const beforeColY = currentClass.offsetTop
          const beforeZoom = this.dragPic[index].currentHeight / this.dragPic[index].dragHeight
          this.dragPic[index].currentX = beforeColx / beforeZoom * this.currentZoom
          this.dragPic[index].currentY = beforeColY / beforeZoom * this.currentZoom
          this.dragPic[index].currentHeight = this.dragPic[index].dragHeight * this.currentZoom
          this.dragPic[index].currentWidth = this.dragPic[index].dragWidth * this.currentZoom
        }
      }

      // 当前视口的高度
      this.$set(this.viewPort, 'height', this.bgPic[this.currentPage].bgHeight * this.currentZoom)
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
    },
    // 增加一个印章
    addSeal () {
      const classFlag = 'a' + Math.random().toString(36).substr(2)
      const dragWidth = 100
      const dragHeight = 100
      const dragColX = 120
      const dragColY = 120
      const currentWidth = dragWidth * this.currentZoom
      const currentHeight = dragHeight * this.currentZoom
      const currentX = dragColX * this.currentZoom
      const currentY = dragColY * this.currentZoom
      this.dragPic.push({
        pageNum: this.currentPage,
        classFlag,
        dragWidth,
        dragHeight,
        dragColX,
        dragColY,
        currentWidth,
        currentHeight,
        currentX,
        currentY,
        dragImg: 'lhb1.png'
      })
    },
    delSeal (classFlag) {
      for (let index = 0; index < this.dragPic.length; index++) {
        if (this.dragPic[index].classFlag === classFlag) {
          this.dragPic.splice(index, 1)
          break
        }
      }
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
      // margin: 10px;
      // height: calc(100% - 20px);
      // width: calc(100% - 20px);
      height: 100%;
      width: 100%;
      background-color: #fafafa;
      .view-port {
        background-size: cover;
        position: relative;
      }

    }
    .control-bar {
      position: absolute;
      width: 100%;
      opacity: .7;
      background-color: #fff;
      height: 60px;
      bottom: 80px;
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
    .save-button {
      position: absolute;
      width: 60%;
      /* opacity: .7; */
      background-color: #f77661;
      height: 50px;
      bottom: 10px;
      margin-left: 20%;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      line-height: 47px;
      font-size: 18px;
      letter-spacing: 20px;
    }

    .drag {
      background-size: 100%;
      position: absolute;
      display: inline-block;
      background-size: cover;
    }
    .del-seal {
      position: absolute;
      top: -10px;
      right: -12px;
      display: inline-block;
      width: 16px;
      height: 16px;
      font-size: 23px;
      line-height: 12px;
      text-align: center;
      border-radius: 8px;
      background-color: #ff3838;
      color: #fff;
      opacity: 0.7;
    }
  }
</style>
