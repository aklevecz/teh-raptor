import { easeLinear } from "./easing"

export const animateAttribute = (ele, att, duration, change) => {
  return new Promise((resolve, reject) => {
    const initialValue = parseFloat(ele.getAttribute(att))
    const startTime = Date.now()
    const target = initialValue + change
    let frame
    const animate = () => {
      const elapsedTime = Date.now() - startTime
      const newValue = easeLinear(elapsedTime, initialValue, change, duration)
      ele.setAttribute(att, newValue)
      if (
        (newValue >= target && change > 0) ||
        (newValue <= target && change < 0)
      ) {
        ele.setAttribute(att, target)
        resolve()
        return cancelAnimationFrame(frame)
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
  })
}

export const animateLine = (lineEl, step = 1) => {
  const startX = parseFloat(lineEl.getAttribute("x1"))
  const endX = parseFloat(lineEl.getAttribute("x2"))
  lineEl.setAttribute("x2", startX)
  let stop = false
  async function start() {
    const randomInterval = () => 2000 * Math.random()
    if (step === 1) {
      await animateAttribute(lineEl, "x2", randomInterval(), endX - startX)
    } else if (step === 2) {
      await animateAttribute(lineEl, "x1", randomInterval(), endX - startX)
    } else if (step === 3) {
      await animateAttribute(lineEl, "y2", randomInterval(), -200)
    } else if (step === 4) {
      await animateAttribute(lineEl, "y1", randomInterval(), -200)
    } else if (step === 5) {
      await animateAttribute(
        lineEl,
        "x1",
        randomInterval(),
        (endX - startX) * -1
      )
    } else if (step === 6) {
      await animateAttribute(
        lineEl,
        "x2",
        randomInterval(),
        (endX - startX) * -1
      )
    } else if (step === 7) {
      await animateAttribute(lineEl, "y2", randomInterval(), 200)
    } else {
      await animateAttribute(lineEl, "y1", randomInterval(), 200)
      step = 0
    }
    step++
    if (!stop) start()
  }
  start()
  return () => {
    stop = true
  }
}

// export const animateLine = lineEl => {
//   const startX = parseFloat(lineEl.getAttribute("x1"))
//   const endX = parseFloat(lineEl.getAttribute("x2"))
//   lineEl.setAttribute("x2", startX)
//   let stop = false
//   async function start() {
//     const randomInterval = () => 2000 * Math.random()
//     await animateAttribute(lineEl, "x2", randomInterval(), endX - startX)
//     await animateAttribute(lineEl, "x1", randomInterval(), endX - startX)
//     await animateAttribute(lineEl, "y2", randomInterval(), -200)
//     await animateAttribute(lineEl, "y1", randomInterval(), -200)
//     await animateAttribute(lineEl, "x1", randomInterval(), (endX - startX) * -1)
//     await animateAttribute(lineEl, "x2", randomInterval(), (endX - startX) * -1)
//     await animateAttribute(lineEl, "y2", randomInterval(), 200)
//     await animateAttribute(lineEl, "y1", randomInterval(), 200)
//     if (!stop) start()
//   }
//   start()
//   return () => {
//     stop = true
//   }
// }
