import Button from "../components/Button"
import Carousel from "../components/Carousel"
import survival from '../assets/image/survival.png'
import sport from '../assets/image/sport.png'
import shooter from '../assets/image/shooter.png'
import race from '../assets/image/race.png'
import multiplayer from '../assets/image/multiplayer.png'
import need from '../assets/image/need2.jpg'
 import { useState } from 'react';



export default function Index() {
  const [multiplayer, setMultiPlayer] = useState(true)

  const botonMultiPlayer = () => {
  setMultiPlayer(prevOpen => !prevOpen);
 }

  const [survival, setSurvival] = useState(true)

  const botonSurvival = () => {
  setSurvival(prevOpen => !prevOpen);
 }

  const [fifa, setFifa] = useState(true)

     const botonFifa = () => {
     setFifa(prevOpen => !prevOpen);
    }
    const [race, setRace] = useState(true)

    const botonRace = () => {
    setRace(prevOpen => !prevOpen);
   }
   const [shooter, setShooter] = useState(true)

   const botonShooter = () => {
    setShooter(prevOpen => !prevOpen);
  }





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
        <div className="min-h-[60vw]  flex flex-col  items-center xsm:hidden" >
          <h2 className=" text-center text-5xl font-thin">the most purchased by category</h2>
          <div className=" flex h-24 w-[90%] justify-around border-t border-b border-black mt-20">
            <button onClick={botonFifa} className="flex items-center justify-center border-b border-black bg-amber-400 hover:bg-[#14c18a7b] w-36 ">
              <h2 className=" font-bold text-2xl text-center" >Sport</h2>
              <img className="h-12" src={sport} alt="" />
            </button >
            <button onClick={botonRace} className="flex  items-center justify-center border-b border-blue-700 w-36 bg-amber-400  ">
              <h2 className=" font-bold text-2xl">Race</h2>
              <img src={race} alt="" />
            </button>
            <div onClick={botonShooter} className="flex  items-center justify-center border-b border-blue-700 w-40 bg-amber-400 hover:bg-[#14c18a7b] ">
              <h2 className=" font-bold text-2xl">Shooter</h2>
              <img src={shooter} alt="" />
            </div>
            <div onClick={botonSurvival}  className="flex  items-center justify-center border-b border-blue-700 w-40 bg-amber-400 ">
              <h2 className=" font-bold text-2xl">Survival</h2>
              <img src={survival} alt="" />
            </div>
            <div onClick={botonMultiPlayer} className="flex  items-center justify-center border-b border-blue-700 w-52 bg-amber-400 ">
              <h2 className=" font-bold text-2xl">Multiplayer</h2>
              <img className="h-12" src={multiplayer} alt="" />
            </div>
          </div>

          {/*  card */}

        {fifa && (<div className=" flex justify-around w-[80%] gap-10 mb-10 mt-10">
          
          <div className=" w-[33%] h-[40vw] rounded-2xl  bg-slate-400 ">
            <img
              className=" rounded-t-2xl object-cover object-center h-[60%] w-full"
              src="https://staticg.sportskeeda.com/editor/2022/09/17b6b-16632484983856-1920.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate p-4">
              NBA 2K23
            </h1>
            <div className="max-w-full">
              <p className="text-base text-center font-medium tracking-wide text-gray-600 mt-1 w-[90%]">
                holaaaaaaaaa
              </p>
            </div>
          </div>
     
          <div class=" w-[33%]  rounded-2xl bg-slate-400">
            <img
              className=" rounded-t-2xl  h-[60%] object-cover object-center w-full"
              src="https://onigamers.com/wp-content/uploads/2023/06/EA-Sports-Madden-NFL-24.jpg" />
            <h1 className="font-semibold p-4  text-gray-900 leading-none text-xl mt-1 capitalize truncate">
              Madden NFL
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium tracking-wide text-gray-600 text-center mt-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                quaerat aut maiores! Esse, aperiam!
              </p>
            </div>
          </div>
        
          <div className=" w-[33%] rounded-2xl  content-center bg-slate-400 ">
            <img className=" h-[60%]  rounded-t-2xl w-full object-cover object-center" src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/07/18/16581597162266.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none p-4 text-xl mt-1 capitalize truncate">
              FIFA 23
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium text-center tracking-wide text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                laborum quae aperiam minus.
              </p>
            </div>
          </div>
        </div> ) }   


      {shooter && (<div className=" flex justify-around w-[80%] gap-10 mb-10 mt-10">
          
          <div className=" w-[33%] rounded-2xl h-[40vw]  bg-slate-400 ">
            <img
              className=" rounded-t-2xl object-cover object-center h-[60%] w-full"
              src="https://images6.alphacoders.com/772/772017.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate p-4">
            Overwatch
            </h1>
            <div className="max-w-full">
              <p className="text-base text-center font-medium tracking-wide text-gray-600 mt-1 w-[90%]">
                holaaaaaaaaa
              </p>
            </div>
          </div>
     
          <div class=" w-[33%]  rounded-2xl bg-slate-400">
            <img
              className=" rounded-t-2xl  h-[60%] object-cover object-center w-full"
              src="https://tse1.mm.bing.net/th?id=OIP.7ZIoSKPKWXJ-lupfLSTZ4gHaEK&pid=Api&P=0&h=180" />
            <h1 className="font-semibold p-4  text-gray-900 leading-none text-xl mt-1 capitalize truncate">
            Counter Strike: Global Ofensive
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium tracking-wide text-gray-600 text-center mt-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                quaerat aut maiores! Esse, aperiam!
              </p>
            </div>
          </div>
        
          <div className=" w-[33%] rounded-2xl  content-center bg-slate-400 ">
            <img className=" h-[60%]  rounded-t-2xl w-full object-cover object-center" src="https://www.spieltimes.com/wp-content/uploads/2021/02/valheim-1200.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none p-4 text-xl mt-1 capitalize truncate">
            Battlefield V
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium text-center tracking-wide text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                laborum quae aperiam minus.
              </p>
            </div>
          </div>
        </div>)}
        
        {race && (<div className=" flex justify-around w-[80%] gap-10 mb-10 mt-10">
          
          <div className=" w-[33%] rounded-2xl h-[40vw]  bg-slate-400 ">
            <img
              className=" rounded-t-2xl object-cover object-center h-[60%] w-full"
              src="https://tse3.mm.bing.net/th?id=OIP.BDNCGGj8-KWO_lA7iVr0AwHaEK&pid=Api&P=0&h=180" />
            <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate p-4">
            F1 Championship Season 2007
            </h1>
            <div className="max-w-full">
              <p className="text-base text-center font-medium tracking-wide text-gray-600 mt-1 w-[90%]">
                holaaaaaaaaa
              </p>
            </div>
          </div>
     
          <div class=" w-[33%]  rounded-2xl bg-slate-400">
            <img
              className=" rounded-t-2xl  h-[60%] object-cover object-center w-full"
              src="https://images2.alphacoders.com/517/517806.jpg" />
            <h1 className="font-semibold p-4  text-gray-900 leading-none text-xl mt-1 capitalize truncate">
            GRID Autosport
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium tracking-wide text-gray-600 text-center mt-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                quaerat aut maiores! Esse, aperiam!
              </p>
            </div>
          </div>
        
          <div className=" w-[33%] rounded-2xl  content-center bg-slate-400 ">
            <img className=" h-[60%]  rounded-t-2xl w-full object-cover object-center" src={need} />
            <h1 className="font-semibold text-gray-900 leading-none p-4 text-xl mt-1 capitalize truncate">
            Need for Speed: World
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium text-center tracking-wide text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                laborum quae aperiam minus.
              </p>
            </div>
          </div>
        </div>)}

        {multiplayer && (<div className=" flex justify-around w-[80%] gap-10 mb-10 mt-10">
          
          <div className=" w-[33%] rounded-2xl h-[40vw]  bg-slate-400 ">
            <img
              className=" rounded-t-2xl object-cover object-center h-[60%] w-full"
              src="https://tse1.mm.bing.net/th?id=OIP.1n5ECbDOs5QIMqrEvVvi5AHaEK&pid=Api&P=0&h=180" />
            <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate p-4">
            Brawlhalla
            </h1>
            <div className="max-w-full">
              <p className="text-base text-center font-medium tracking-wide text-gray-600 mt-1 w-[90%]">
                holaaaaaaaaa
              </p>
            </div>
          </div>
     
          <div class=" w-[33%]  rounded-2xl bg-slate-400">
            <img
              className=" rounded-t-2xl  h-[60%] object-cover object-center w-full"
              src="https://tse1.mm.bing.net/th?id=OIP.tbOQNY4KZfvK_Uq1LPdglgHaEK&pid=Api&P=0&h=180" />
            <h1 className="font-semibold p-4  text-gray-900 leading-none text-xl mt-1 capitalize truncate">
            Rocket League
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium tracking-wide text-gray-600 text-center mt-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                quaerat aut maiores! Esse, aperiam!
              </p>
            </div>
          </div>
        
          <div className=" w-[33%] rounded-2xl  content-center bg-slate-400 ">
            <img className=" h-[60%]  rounded-t-2xl w-full object-cover object-center" src="https://cdn2.unrealengine.com/15br-bplaunch-egs-s3-2560x1440-2560x1440-687570387.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none p-4 text-xl mt-1 capitalize truncate">
            Fortnite
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium text-center tracking-wide text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                laborum quae aperiam minus.
              </p>
            </div>
          </div>
        </div>)}

        {survival && (<div className=" flex justify-around w-[80%] gap-10 mb-10 mt-10">
          
          <div className=" w-[33%] rounded-2xl h-[40vw]  bg-slate-400 ">
            <img
              className=" rounded-t-2xl object-cover object-center h-[60%] w-full"
              src="https://grettogeek.com/wp-content/uploads/2017/09/raft-cover.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate p-4">
            Raft
            </h1>
            <div className="max-w-full">
              <p className="text-base text-center font-medium tracking-wide text-gray-600 mt-1 w-[90%]">
                holaaaaaaaaa
              </p>
            </div>
          </div>
     
          <div class=" w-[33%]  rounded-2xl bg-slate-400">
            <img
              className=" rounded-t-2xl  h-[60%] object-cover object-center w-full"
              src="https://assets-prd.ignimgs.com/2020/07/24/grounded-button-fin-1595554384970.jpg" />
            <h1 className="font-semibold p-4  text-gray-900 leading-none text-xl mt-1 capitalize truncate">
            Grounded
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium tracking-wide text-gray-600 text-center mt-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                quaerat aut maiores! Esse, aperiam!
              </p>
            </div>
          </div>
        
          <div className=" w-[33%] rounded-2xl  content-center bg-slate-400 ">
            <img className=" h-[60%]  rounded-t-2xl w-full object-cover object-center" src="https://www.spieltimes.com/wp-content/uploads/2021/02/valheim-1200.jpg" />
            <h1 className="font-semibold text-gray-900 leading-none p-4 text-xl mt-1 capitalize truncate">
            Valheim
            </h1>
            <div className="max-w-full">
              <p className="text-base font-medium text-center tracking-wide text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                officiis aspernatur, modi nobis et neque quod asperiores laboriosam
                ab. Magni fugit necessitatibus ducimus placeat assumenda perferendis
                laborum quae aperiam minus.
              </p>
            </div>
          </div>
        </div>)} 









        </div>
      </div>
    </>
  )
}
