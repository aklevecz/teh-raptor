import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { delay } from "../pages/."

const fadeTime = 3000
const Wall = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity ${fadeTime}ms;
`

const WhiteWall = () => {
  const whiteRef = useRef()
  const setup = async () => {
    await delay(0)
    whiteRef.current.style.opacity = 0
    await delay(3000)
    whiteRef.current.remove()
  }
  useEffect(() => {
    setup()
  }, [])
  return <Wall ref={whiteRef} />
}

export default WhiteWall
