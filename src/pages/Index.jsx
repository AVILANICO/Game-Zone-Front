import Button from "../components/Button"
import Carousel from "../components/Carousel"


export default function Index() {
  return (
    <>
      <div className="md:pt-20">
        <header className="mx-8 mt-0">
        </header>
        <div className="bg-[url(/src/assets/image/bg-main.png)] bg-no-repeat bg-cover bg-center w-fill h-[500px] rounded-md mt-[1] flex flex-col justify-center items-start pl-[10%] gap-[10px] p-0 mb-5 xsm:hidden mx-8">
          <h2 className="not-italic font-bold text-[64px] leading-[95.19%] text-white text-shadow: 1px 8px 50px rgba(255, 255, 255, 0.25)">Live the emotion of the game</h2>
          <p className="font-normal text-2xl leading-[95.19%] text-white">Find the perfect game for you</p>
          <span className="not-italic font-semibold text-base leading-[95.18%] text-white">#MingaForever 🔥</span>
          <Button />
        </div>
        <Carousel />
      </div>
    </>
  )
}
