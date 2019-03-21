var Touch = (function(Touch) {
  var halt = false
  var buffer = 100
  var triggered = {
    swipelefttoright: false,
    swiperighttoleft: false,
    tapandhold: false,
  }
  var axes = {
    x: { start: 0, previous: [], current: 0 },
    y: { start: 0, previous: [], current: 0 },
  }
  var timer = {
    start: null,
    previous: [],
    current: null,
    timeout: null,
  }
  var haltTouch = function(event) {
    switch (event.type) {
      case 'touchmove':
        if (!event.cancelable) halt = true
        break
      case 'touchend':
        if (!event.cancelable) halt = false
        break
      default:
        halt = false
    }
  }
  var handleTouchStart = function(event) {
    axes.x.start = event.touches[0].clientX
    axes.y.start = event.touches[0].clientY
    timer.start = event.timestamp
  }
  var handleTouchMove = function(event) {
    if (axes.x.current === null) {
      axes.x.current = event.touches[0].clientX
    } else {
      axes.x.previous.push(axes.x.current)
      axes.x.current = event.touches[0].clientX
    }
    if (axes.y.current === null) {
      axes.y.current = event.touches[0].clientY
    } else {
      axes.y.previous.push(axes.y.current)
      axes.y.current = event.touches[0].clientY
    }
    if (timer.current === null) {
      timer.current = event.timestamp
    } else {
      timer.previous.push(timer.current)
      timer.current = event.timestamp
    }

    var diffY = axes.y.current - axes.y.start
    var diffX = axes.x.current - axes.x.start
    var diffTime = timer.current - timer.start
    var velocityX = Math.abs(diffX / diffTime)
    var velocityY = Math.abs(diffY / diffTime)

    return {
      x1: axes.x.start,
      x2: axes.x.current,
      dx: diffX,
      y1: axes.x.start,
      y2: axes.x.current,
      dy: diffY,
      t1: timer.start,
      t2: timer.current,
      dt: diffTime,
      vx: velocityX,
      vy: velocityY,
    }
  }
  var handleTouchEnd = function() {
    axes.x.start = 0
    axes.x.previous = []
    axes.x.current = 0
    axes.y.start = 0
    axes.y.previous = []
    axes.y.current = 0
    triggered.swipelefttoright = false
    triggered.swiperighttoleft = false
    triggered.tapandhold = false
    timer.start = null
    timer.current = null
    timer.previous = []
    timer.timeout = null
    halt = false
  }
  var trackTouch = function(event) {
    var res = null
    switch (event.type) {
      case 'touchstart':
        handleTouchStart(event)
        break
      case 'touchmove':
        res = handleTouchMove(event)
        return res
      case 'touchend':
        handleTouchEnd()
        break
      default:
        console.error('Touch Event Type Not Supported')
        return
    }
    return res
  }
  var tapandhold = function(event, el) {
    switch (event.type) {
      case 'touchstart':
        timer.timeout = setTimeout(function() {
          if (!triggered.tapandhold) {
            if (!halt) event.preventDefault()
            console.log('tap and hold reached')
            var touchObj = new Touch({
              identifier: Date.now(),
              target: el,
              clientX: res.x2,
              clientY: res.y2,
              radiusX: 1,
              radiusY: 1,
              rotationAngle: 0,
              force: 0.5,
            })
            var newEvent = new TouchEvent('tapandhold', {
              cancelable: true,
              bubbles: true,
              touches: [touchObj],
              targetTouches: [touchObj],
              changedTouches: [touchObj],
              ctrlKey: false,
              shiftKey: false,
              altKey: false,
              metaKey: false,
            })
            newEvent.deltaTime = res.dt
            el.dispatchEvent(newEvent)
            triggered.tapandhold = true
          }
        }, 300)
        break
      case 'touchmove':
        if (!triggered.swipelefttoright && !triggered.swiperighttoleft) {
          var res = trackTouch(event)
          if (res === null) return
          if (Math.abs(res.dx) > buffer && res.dy < 200) {
            if (!halt) event.preventDefault()
            clearTimeout(timer.timeout)
            timer.timeout = null
          }
        }
        break
      case 'touchend':
        clearTimeout(timer.timeout)
        timer.timeout = null
        break
      default:
        clearTimeout(timer.timeout)
        timer.timeout = null
    }
  }
  var swipe = {
    lefttoright: function(event, el) {
      if (!triggered.swipelefttoright) {
        var res = trackTouch(event)
        if (res === null) return
        if (res.dx > buffer && res.dy < 200) {
          if (!halt) event.preventDefault()
          var touchObj = new Touch({
            identifier: Date.now(),
            target: el,
            clientX: res.x2,
            clientY: res.y2,
            radiusX: 1,
            radiusY: 1,
            rotationAngle: 0,
            force: 0.5,
          })
          var newEvent = new TouchEvent('swipelefttoright', {
            cancelable: true,
            bubbles: true,
            touches: [touchObj],
            targetTouches: [touchObj],
            changedTouches: [touchObj],
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            metaKey: false,
          })
          newEvent.velocityX = res.vx
          newEvent.velocityY = res.vy
          el.dispatchEvent(newEvent)
          triggered.swipelefttoright = true
        }
      }
    },
    righttoleft: function(event, el) {
      if (!triggered.swiperighttoleft) {
        var res = trackTouch(event)
        if (res === null) return
        if (res.dx < -buffer && res.dy < 200) {
          if (!halt) event.preventDefault()
          // console.log('swipe right reached')
          var touchObj = new Touch({
            identifier: Date.now(),
            target: el,
            clientX: res.x2,
            clientY: res.y2,
            radiusX: 1,
            radiusY: 1,
            rotationAngle: 0,
            force: 0.5,
          })
          var newEvent = new TouchEvent('swiperightoleft', {
            cancelable: true,
            bubbles: true,
            touches: [touchObj],
            targetTouches: [touchObj],
            changedTouches: [touchObj],
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            metaKey: false,
          })
          newEvent.velocityX = res.vx
          newEvent.velocityY = res.vy
          el.dispatchEvent(newEvent)
          triggered.swiperighttoleft = true
        }
      }
    },
  }
  var attach = function(type, el) {
    document.addEventListener('touchmove', haltTouch)
    document.addEventListener('touchend', haltTouch)
    switch (type) {
      case 'swipelefttoright':
        el.addEventListener('touchstart', function(event) {
          swipe.lefttoright(event, el)
        })
        el.addEventListener('touchmove', function(event) {
          swipe.lefttoright(event, el)
        })
        el.addEventListener('touchend', function(event) {
          swipe.lefttoright(event, el)
        })
        break
      case 'swiperighttoleft':
        el.addEventListener('touchstart', function(event) {
          swipe.righttoleft(event, el)
        })
        el.addEventListener('touchmove', function(event) {
          swipe.righttoleft(event, el)
        })
        el.addEventListener('touchend', function(event) {
          swipe.righttoleft(event, el)
        })
        break
      case 'tapandhold':
        el.addEventListener('touchstart', function(event) {
          tapandhold(event, el)
        })
        el.addEventListener('touchmove', function(event) {
          tapandhold(event, el)
        })
        el.addEventListener('touchend', function(event) {
          tapandhold(event, el)
        })
        break
      case 'pinch':
      case 'swipetotop':
      case 'swipetobottom':
      default:
        console.error('Touch Event Type Not Supported')
        return
    }
  }
  var bind = function(type, elements, buf) {
    if ('ontouchstart' in document.documentElement || 'touchstart' in document.documentElement) {
      // To reverse swipe direction provide a negative value
      if (buf < 20 && buf > -20) {
        console.warn('Swipe may not fire accurately')
      } else if (typeof buf === 'number') {
        buffer = buf
      }
      if (typeof elements === 'undefined') {
        console.error('Invalid Element')
        return
      }
      if (elements.length >= 1) {
        for (var i = 0; i < elements.length; i++) {
          attach(type, elements[i])
        }
      } else {
        attach(type, elements)
      }
    } else {
      return console.warn('Touch Events not supported by browser')
    }
  }

  return { bind: bind }
})(Touch || {})
