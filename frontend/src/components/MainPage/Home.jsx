import React from "react"
import "./Home.css"
import SliderHome from "./Slider"

const Home = ({Sdata}) => {
  return (
    <>
          <SliderHome Sdata={Sdata} />
    </>
  )
}

export default Home
