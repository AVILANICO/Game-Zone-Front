import Button from "../components/Button"
import Carousel from "../components/Carousel"
import survival from '../assets/image/survival.png'
import sport from '../assets/image/sport.png'
import shooter from '../assets/image/shooter.png'
import race from '../assets/image/race.png'
import multiplayer from '../assets/image/multiplayer.png'


export default function Index() {
  return (
    <>
      <div className="md:pt-20">
        <div className="bg-[url(/src/assets/image/need3.jpg)] bg-no-repeat bg-cover bg-center  h-[500px] rounded-md mt-[1] flex flex-col justify-center items-start pl-[10%] gap-[10px] p-0 mb-5 xsm:hidden mx-8">
          <h2 style={{ backgroundColor: "transparent" }} className="not-italic font-bold text-[64px] leading-[95.19%] text-white text-shadow: 1px 8px 50px rgba(255, 255, 255, 0.25)">Experience the thrill of Need for Speed</h2>
          <p style={{ backgroundColor: "transparent" }} className="font-normal text-2xl leading-[95.19%] text-white">Choose your ride and dominate the streets</p>
          <Button />
        </div>
        <header className="mx-8 mt-0">
          <Carousel />
        </header>
        <div className="min-h-[60vw] bg-red-500 flex flex-col  items-center xsm:hidden" >
          <h2 className="bg-orange-500 text-center text-5xl font-thin">the most purchased by category</h2>
          <div className="bg-emerald-400 flex h-24 w-[90%] justify-around border-t border-b border-black mt-20">
            <div className="flex items-center border-b border-black bg-amber-400 hover:bg-[#14c18a7b] hover: ">
              <h2 className=" font-bold text-2xl" >Sport</h2>
              <img className="h-12" src={sport} alt="" />
            </div>
            <div className="flex  items-center border-b border-black ">
              <h2 className=" font-bold text-2xl">Race</h2>
              <img src={race} alt="" />
            </div>
            <div className="flex  items-center border-b border-black ">
              <h2 className=" font-bold text-2xl">Shooter</h2>
              <img src={shooter} alt="" />
            </div>
            <div className="flex  items-center border-b border-black ">
              <h2 className=" font-bold text-2xl">Survival</h2>
              <img src={survival} alt="" />
            </div>
            <div className="flex  items-center border-b border-black ">
              <h2 className=" font-bold text-2xl">Multiplayer</h2>
              <img className="h-12" src={multiplayer} alt="" />
            </div>
          </div>
          {/*  card */}

          <div class=" flex justify-around w-[80%] gap-10 mb-10 mt-10 bg-blue-700">
            <div class=" w-[33%] rounded-2xl bg-white ">
              <img
                class=" rounded-t-2xl object-cover object-center h-[60%] w-full"
                src="https://staticg.sportskeeda.com/editor/2022/09/17b6b-16632484983856-1920.jpg" />
              <p class="text-indigo-500 font-semibold text-base p-4 mt-2">Science</p>
              <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate p-4">
              NBA 2K23
              </h1>
              <div class="max-w-full">
                <p class="text-base text-center font-medium tracking-wide text-gray-600 mt-1 w-[90%]">
                holaaaaaaaaa
                </p>
              </div>
            </div>

            <div class=" w-[33%]  rounded-2xl bg-white">
              <img
                class=" rounded-t-2xl  h-[60%] object-cover object-center w-full"
                src="https://onigamers.com/wp-content/uploads/2023/06/EA-Sports-Madden-NFL-24.jpg"/>
              <p class="text-indigo-500 font-semibold text-base p-4 mt-2">
               Madden NFL
              </p>
              <h1
                class="font-semibold p-4  text-gray-900 leading-none text-xl mt-1 capitalize truncate"
              >
               Madden NFL
              </h1>
              <div class="max-w-full">
                <p class="text-base font-medium tracking-wide text-gray-600 text-center mt-1">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                  dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                  qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                  quaerat aut maiores! Esse, aperiam!
                </p>
              </div>
            </div>



            <div class=" w-[33%] rounded-2xl  content-center bg-white ">
              <img class=" h-[60%]  rounded-t-2xl w-full object-cover object-center" src="
       https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/07/18/16581597162266.jpg"
              />
              <p class="text-indigo-500 font-semibold text-base p-4 mt-2">Culture</p>
              <h1
                class="font-semibold text-gray-900 leading-none p-4 text-xl mt-1 capitalize truncate"
              >
              FIFA 23
              </h1>

              <div class="max-w-full">
                <p class="text-base font-medium text-center tracking-wide text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                  ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                  laborum quae aperiam minus.
                </p>
              </div>
            </div>

          </div>






        </div>

      </div>
    </>
  )
}
