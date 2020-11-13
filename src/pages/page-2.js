import React from "react"
import SVG from "react-inlinesvg"
import Layout from "../components/layout"
import SEO from "../components/seo"
import WhiteWall from "../components/white-wall"
import { tehRaptorTextGroup, raptor, scene1Context } from "../selectors/scene-1"
import { delay } from "."

const getViewScalars = () => {
  if (typeof window === "undefined") return
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const sceneDims = scene1Context()
    .getAttribute("viewBox")
    .split("0 ")[2]
    .split(" ")
  const scalarX = parseFloat(sceneDims[0]) / windowWidth
  const scalarY = parseFloat(sceneDims[1]) / windowHeight
  return { scalarX, scalarY }
}

const getCircleAtts = el => {
  const cx = el.getAttribute("cx")
  const cy = el.getAttribute("cy")
  const r = el.getAttribute("r")
  return { cx, cy, r }
}

const getTextAtts = el => {
  const translate = el
    .getAttribute("transform")
    .split("translate(")[1]
    .split(")")[0]
    .split(" ")
  const tX = parseFloat(translate[0])
  const tY = parseFloat(translate[1])
  const fontSize = parseFloat(el.style.fontSize.replace("px", ""))
  return { tX, tY, fontSize }
}

const SecondPage = () => {
  const setupMenu = () => {
    const menuButtonG = document.querySelector("#menu-2")
    const menuButtonCircle = menuButtonG.querySelector("circle")
    const menuButtonText = menuButtonG.querySelector("text")
    const menuButtonTargetG = document.querySelector("#menu")

    const menuButtonCircleAtts = getCircleAtts(menuButtonCircle)
    const menuButtonTextAtts = getTextAtts(menuButtonG.querySelector("text"))

    const menuButtonTargetCircleAtts = getCircleAtts(
      menuButtonTargetG.querySelector("circle")
    )
    const menuButtonTargetTextAtts = getTextAtts(
      menuButtonTargetG.querySelector("text")
    )

    menuButtonCircle.setAttribute("cx", menuButtonTargetCircleAtts.cx)
    menuButtonCircle.setAttribute("cy", menuButtonTargetCircleAtts.cy)
    menuButtonCircle.setAttribute("r", menuButtonTargetCircleAtts.r)

    menuButtonText.setAttribute(
      "transform",
      `translate(${menuButtonTargetTextAtts.tX} ${menuButtonTargetTextAtts.tY})`
    )
    menuButtonText.style.fontSize = `${menuButtonTargetTextAtts.fontSize}px`
  }

  const setup = async () => {
    const { scalarX, scalarY } = getViewScalars()
    const { x, y, width, height } = raptor().getBoundingClientRect()
    raptor().style.transformOrigin = `${(x + width / 2) * scalarX}px ${
      (y + height / 2) * scalarY
    }px`
    raptor().style.transform = "scale(0)"
    tehRaptorTextGroup().style.transform = "translate(-920px,0px)"
    await delay(1000)
    tehRaptorTextGroup().style.transition = "transform 1000ms"
    tehRaptorTextGroup().style.transform = "translate(0px,0px)"
    await delay(500)
    raptor().style.transition = "transform 3000ms"
    raptor().style.animation = "grow-spinning 3000ms 1 linear"
    raptor().style.transform = "scale(1)"
    await delay(3000)
    raptor().style.animation = "spinning 30ms 10 linear"

    setupMenu()
  }
  return (
    <Layout>
      <SEO title="Page two" />
      <WhiteWall />
      <SVG src={require("../SVG/SCENE_1.svg")} onLoad={setup} />
    </Layout>
  )
}

export default SecondPage
