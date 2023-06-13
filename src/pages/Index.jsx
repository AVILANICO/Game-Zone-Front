import Button from "../components/Button"
import Carousel from "../components/Carousel"
import Footer from "../components/Footer";
import HomeCard from "./HomeCard"

export default function Index() {


  return (
    <>
      <div className="bg-black">
        <div className="bgimg-1">
          <h2 className="not-italic font-bold text-[55px] leading-[95.19%] text-white text-shadow: 1px 8px 50px rgba(255, 255, 255, 0.25)  mt-52 ">Experience the thrill of Need for Speed</h2>
          <p className="font-normal text-2xl leading-[95.19%] text-white w-[55%]  mt-3">Choose your ride and dominate the streets</p>
          <Button />
        </div>
        <div className="flex items-center w-full h-[100vh] mt-4">
          <Carousel />
        </div>
        <HomeCard />
        <Footer />
      </div>
    </>
  )
}
