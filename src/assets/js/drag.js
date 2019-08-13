import Vue from 'vue'

Vue.directive('drag', {
  bind: function (el, binding) {
    let isDrag = true
    let tempX = 0
    let tempY = 0
    let x = 0
    let y = 0

    el.addEventListener('touchstart', e => {
      isDrag = true
      // tempX = parseInt(el.style.left + 0)
      // tempY = parseInt(el.style.top + 0)
      // 获取并拖动前的位置
      tempX = parseInt(el.offsetLeft)
      tempY = parseInt(el.offsetTop)
      x = e.touches[0].pageX
      y = e.touches[0].pageY
    })
    // el.ontouchstart = e => {
    //   isDrag = true
    //   // tempX = parseInt(el.style.left + 0)
    //   // tempY = parseInt(el.style.top + 0)
    //   // 获取并拖动前的位置
    //   tempX = parseInt(el.offsetLeft)
    //   tempY = parseInt(el.offsetTop)
    //   x = e.touches[0].pageX
    //   y = e.touches[0].pageY
    // }


    el.addEventListener('touchmove', e => {
      if (isDrag) {
        let currentX = tempX + e.touches[0].pageX - x
        let currentY = tempY + e.touches[0].pageY - y

        // 控制拖动范围
        currentX = currentX > 0 ? currentX : 0
        currentY = currentY > 0 ? currentY : 0

        if (binding.value) {
          const parentDom = document.querySelector('#' + binding.value.parentId)
          const parentWidth = parentDom.getBoundingClientRect().width
          const parentHeight = parentDom.getBoundingClientRect().height

          // const elDom = document.querySelector('#' + binding.value.selfId)
          // const elWidth = elDom.getBoundingClientRect().width
          // const elHeight = elDom.getBoundingClientRect().height
          const elWidth = e.target.clientWidth
          const elHeight = e.target.clientHeight

          currentX = currentX < (parentWidth - elWidth) ? currentX : (parentWidth - elWidth)
          currentY = currentY < (parentHeight - elHeight) ? currentY : (parentHeight - elHeight)
        }
        // 根据所传递的参数判断，是否只在x轴/Y轴拖动，或者x y都可拖动
        if (binding.value.onlyDragX) {
          el.style.left = currentX + 'px'
        } else if (binding.value.onlyDragY) {
          el.style.top = currentY + 'px'
        } else {
          el.style.left = currentX + 'px'
          el.style.top = currentY + 'px'
        }

        // 组织浏览器继续处理触摸（或鼠标）事件
        e.preventDefault()
      }
    })
    // el.ontouchmove = e => {
    //   if (isDrag) {
    //     let currentX = tempX + e.touches[0].pageX - x
    //     let currentY = tempY + e.touches[0].pageY - y

    //     // 控制拖动范围
    //     currentX = currentX > 0 ? currentX : 0
    //     currentY = currentY > 0 ? currentY : 0

    //     if (binding.value) {
    //       const parentDom = document.querySelector('#' + binding.value.parentId)
    //       const parentWidth = parentDom.getBoundingClientRect().width
    //       const parentHeight = parentDom.getBoundingClientRect().height

    //       // const elDom = document.querySelector('#' + binding.value.selfId)
    //       // const elWidth = elDom.getBoundingClientRect().width
    //       // const elHeight = elDom.getBoundingClientRect().height
    //       const elWidth = e.target.clientWidth
    //       const elHeight = e.target.clientHeight

    //       currentX = currentX < (parentWidth - elWidth) ? currentX : (parentWidth - elWidth)
    //       currentY = currentY < (parentHeight - elHeight) ? currentY : (parentHeight - elHeight)
    //     }
    //     // 根据所传递的参数判断，是否只在x轴/Y轴拖动，或者x y都可拖动
    //     if (binding.value.onlyDragX) {
    //       el.style.left = currentX + 'px'
    //     } else if (binding.value.onlyDragY) {
    //       el.style.top = currentY + 'px'
    //     } else {
    //       el.style.left = currentX + 'px'
    //       el.style.top = currentY + 'px'
    //     }

    //     // 组织浏览器继续处理触摸（或鼠标）事件
    //     e.preventDefault()
    //   }
    // }

    el.addEventListener('touchend', e => {
      isDrag = false
    })
    // el.ontouchend = e => {
    //   isDrag = false
    // }
  }
})
