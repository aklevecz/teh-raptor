import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SVG from "react-inlinesvg"
import { enterButton, enterLine, enterLine2 } from "../selectors/enter"
import { animateLine } from "../animations"
import styled from "styled-components"
import * as Tone from "tone"
import "../animations/animations.css"
import { navigate } from "gatsby"

const AnimWrap = styled.div`
  svg {
    overflow: visible;
  }
`
export const delay = t => {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

const IndexPage = () => {
  const tearDown = () => {
    return new Promise(resolve => {
      document.querySelectorAll("circle").forEach(async (el, i) => {
        const cEl = document.querySelector(`#${el.id}`)
        const fadeOutTime = 3000
        cEl.style.animation = ""
        enterButton().style.transition = "transform 4000ms"
        await delay(200)
        enterButton().style.transform = "scale(0)"
        cEl.style.transition = `transform ${fadeOutTime}ms, opacity ${fadeOutTime}ms`
        cEl.style.transform = "scale(7)"
        await delay(fadeOutTime)
        cEl.style.opacity = 0
        resolve()
      })
    })
  }

  const setup = () => {
    enterButton().style.animation = "red-pulse 5000ms infinite alternate"
    enterButton().querySelector("text").style.strokeWidth = "3px"
    enterButton().querySelector("text").style.animation =
      "stroke-pulse 5000ms infinite alternate"

    enterLine().style.stroke = "white"
    const stop = animateLine(enterLine())

    enterLine2().style.stroke = "white"
    const stop2 = animateLine(enterLine2(), 7)

    enterButton().onclick = () => {
      stop()
      stop2()
      tearDown().then(() => navigate("/page-2"))
    }

    document.querySelectorAll("circle").forEach((el, i) => {
      el.style.animation =
        "pulse 5000ms infinite alternate,fill-pulse 5000ms infinite alternate"
      el.style.animationDelay = `${i - 1.5}s`
      el.style.fill = "white"
      el.style.stroke = "none"

      const cx = el.getAttribute("cx")
      const cy = el.getAttribute("cy")
      el.style.transformOrigin = `${cx}px ${cy}px`
      el.onclick = () => {
        const c = (i % 4) + 2
        const synth = new Tone.PolySynth(Tone.Synth).toDestination()
        const now = Tone.now()
        synth.triggerAttack(`D${c}`, now)
        synth.triggerAttack(`F${c}`, now + 0.5)
        synth.triggerAttack(`A${c}`, now + 1)
        synth.triggerAttack(`C${c + 1}`, now + 1.5)
        synth.triggerAttack(`E${c + 1}`, now + 2)
        synth.triggerRelease(
          [`D${c}`, `F${c}`, `A${c}`, `C${c + 1}`, `E${c + 1}`],
          now + 4
        )
      }
    })
  }

  return (
    <Layout>
      <SEO title="Home" />
      <AnimWrap>
        <SVG src={require("../SVG/ENTER.svg")} onLoad={setup} />
      </AnimWrap>
    </Layout>
  )
}

export default IndexPage
