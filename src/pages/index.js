import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import SVG from "react-inlinesvg"
import { c1, c2, c3, c4, c5, c6, c7, enterButton, enterLine } from "../selectors/enter";
import { easeLinear, animateAttribute, animateLine } from "../animations";
import { radius } from "../selectors/attributes";
import styled, { css, keyframes } from "styled-components"
import * as Tone from "tone"
import "../animations/animations.css"

function createCSS() {
  let styles = ``;

  for (let i = 1; i < 8; i += 1) {
    styles += `
       #c${i} {
         animation: pulse 5000ms infinite alternate,fill-pulse 5000ms infinite alternate;
         animation-delay: ${i - 1.5}s;
         fill: white;
         stroke: none;
       }
     `
  }

  return css`${styles}`;
}
const AnimWrap = styled.div`
svg {
  overflow:visible
}
  ${createCSS()};
`
const IndexPage = () => {

  const setup = () => {
    enterButton().style.animation = 'red-pulse 5000ms infinite alternate'
    enterButton().querySelector('text').style.strokeWidth = "3px"
    enterButton().querySelector('text').style.animation = 'stroke-pulse 5000ms infinite alternate'
    animateLine(enterLine())
    document.querySelectorAll('circle.cls-1').forEach((el, i) => {
      const cx = el.getAttribute('cx')
      const cy = el.getAttribute('cy')
      el.style.transformOrigin = `${cx}px ${cy}px`
      el.onclick = () => {
        const c = i % 4 + 2
        Tone.start()
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now()
        synth.triggerAttack(`D${c}`, now);
        synth.triggerAttack(`F${c}`, now + 0.5);
        synth.triggerAttack(`A${c}`, now + 1);
        synth.triggerAttack(`C${c + 1}`, now + 1.5);
        synth.triggerAttack(`E${c + 1}`, now + 2);
        synth.triggerRelease([`D${c}`, `F${c}`, `A${c}`, `C${c + 1}`, `E${c + 1}`], now + 4);
      };
    })
  }

  return (<Layout>
    <SEO title="Home" />
    <AnimWrap>
      <SVG src={require("../SVG/ENTER.svg")} onLoad={setup} />
    </AnimWrap>
  </Layout>)
}

export default IndexPage
