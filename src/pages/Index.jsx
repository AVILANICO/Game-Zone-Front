import Button from "../components/Button"
import Carousel from "../components/Carousel"
import { Navigate,useNavigate} from "react-router-dom";

import { useState, } from 'react';
import HomeCard from "./HomeCard"




export default function Index() {
  



 




  return (
    <>
      <div className="md:pt-5 bg-[#1D1D1D]">
        <div className="bgimg-1">
        <h2  className="not-italic font-bold text-[55px] leading-[95.19%] text-white text-shadow: 1px 8px 50px rgba(255, 255, 255, 0.25)  mt-52 ">Experience the thrill of Need for Speed</h2>
          <p  className="font-normal text-2xl leading-[95.19%] text-white w-[55%]  mt-3">Choose your ride and dominate the streets</p>
          <Button />
        </div>
        <header className="mx-8 mt-0">
          <Carousel />
        </header>
        <HomeCard  />
      </div>
    </>
  )
}
