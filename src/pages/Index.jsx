import Button from "../components/Button"
/* import Carousel from "../components/Carousel" */

import { useState } from 'react';
import HomeCard from "./HomeCard"



export default function Index() {




 






  return (
    <>
      <div className="md:pt-20 bg-[#1D1D1D]">
        <div className="bg-[url(/src/assets/image/need3.jpg)] bg-no-repeat bg-cover bg-center  h-[500px] rounded-md mt-[1] flex flex-col justify-center items-start pl-[10%] gap-[10px] p-0 mb-5 xsm:hidden mx-8">
          <h2 style={{ backgroundColor: "transparent" }} className="not-italic font-bold text-[64px] leading-[95.19%] text-white text-shadow: 1px 8px 50px rgba(255, 255, 255, 0.25)">Experience the thrill of Need for Speed</h2>
          <p style={{ backgroundColor: "transparent" }} className="font-normal text-2xl leading-[95.19%] text-white">Choose your ride and dominate the streets</p>
          <Button />
        </div>
        <header className="mx-8 mt-0">
         {/*  <Carousel /> */}
        </header>
        <HomeCard/>
      </div>
    </>
  )
}
