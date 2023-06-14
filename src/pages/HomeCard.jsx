import React from 'react'
import survival from '../assets/image/survival.png'
import sport from '../assets/image/sport.png'
import shooter from '../assets/image/shooter.png'
import race from '../assets/image/race.png'
import multiplayer from '../assets/image/multiplayer.png'
import need from '../assets/image/need2.jpg'
import moto from '../assets/image/moto.png'
import Footer from '../components/Footer'

import { Link as Anchor, useNavigate } from "react-router-dom";


import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';


export default function HomeCard() {


  // Ocultar todos los contenidos de las pestañas
  const [activeTab, setActiveTab] = useState('sport');

  // Ocultar todos los contenidos de las pestañas
  function openTab(tabName, evt) {
    // Ocultar todas las tarjetas
    let tabContents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }

    // Eliminar la clase 'active' de todos los botones
    let tabLinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }

    // Mostrar el contenido de la pestaña seleccionada y marcar el botón como activo
    document.getElementById(tabName).style.display = 'flex';
    evt.currentTarget.className += ' active';
  }

  function toggleTab(tabName) {
    if (activeTab === tabName) {
      // Si se presiona el botón de la pestaña activa nuevamente, se oculta la pestaña
      setActiveTab(null);
    } else {
      // Si se presiona un botón de pestaña diferente, se muestra esa pestaña
      setActiveTab(tabName);
    }
  }
  return (
    <>
      <div className="min-h-[60vw] flex flex-col  items-center xsm:hidden mt-12" >
        <h2 className=" text-center text-5xl text-white font-bold">THE MOST PURCHASED BY CATEGORY</h2>
        <div className=" flex h-24 w-[100%] justify-around bg-[#343434]/70 border-t border-b  mt-20">
          <button onClick={() => toggleTab('sport')}
            className={`flex cursor-pointer items-center justify-center hover:border-b-8 border-[#17e1a17b]  hover:bg-[#14c18a3e] w-36 ${activeTab === 'sport' ? 'active' : ''
              } tablink`}>
            <h2 className="  text-white font-bold text-2xl text-center" >Sport</h2>
            <img className="h-12" src={sport} alt="" />
          </button >
          <button onClick={() => toggleTab('race')}
            className={`flex  cursor-pointer items-center justify-center hover:border-b-8 border-[#17e1a17b] w-40  hover:bg-[#14c18a3e] ${activeTab === 'race' ? 'active' : ''
              }tablink`}>
            <h2 className=" text-white font-bold text-2xl">Race</h2>
            <img className="h-12 ml-2" src={moto} alt="" />
          </button>
          <button onClick={() => toggleTab('shooter')}
            className={`flex  cursor-pointer items-center justify-center hover:border-b-8 border-[#17e1a17b] w-44  hover:bg-[#14c18a3e] ${activeTab === 'shooter' ? 'active' : ''
              }tablink`}>
            <h2 className="  text-white font-bold text-2xl">Shooter</h2>
            <img src={shooter} alt="" />
          </button>
          <button onClick={() => toggleTab('survival')}
            className={`flex  cursor-pointer items-center justify-center hover:border-b-8 border-[#17e1a17b] w-48  hover:bg-[#14c18a3e] ${activeTab === 'survival' ? 'active' : ''
              }tablink`}>
            <h2 className="  text-white font-bold text-2xl">Survival</h2>
            <img src={survival} alt="" />
          </button>
          <button onClick={() => toggleTab('multiplayer')}
            className={`flex  cursor-pointer items-center justify-center hover:border-b-8 border-[#17e1a17b] w-56  hover:bg-[#14c18a3e] ${activeTab === 'multiplayer' ? 'active' : ''
              }tablink`}>
            <h2 className="  text-white font-bold text-2xl">Multiplayer</h2>
            <img className="h-12" src={multiplayer} alt="" />
          </button>
        </div>

        {/*  card */}

        <div id="sport" className={`flex flex-wrap justify-around w-[90%] gap-10 mb-10 mt-10 ${activeTab === 'sport' ? 'block' : 'hidden'}`}>

          <div className=" transition-transform duration-300 transform hover:scale-105 w-[330px] h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  rounded-2xl   ">
            <img
              className=" rounded-t-2xl  object-fill h-[45%] w-full"
              src="https://staticg.sportskeeda.com/editor/2022/09/17b6b-16632484983856-1920.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none text-xl mt-1 capitalize truncate p-4">
              NBA 2K23
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base text-center font-medium tracking-wide text-white mt-1 w-[90%]">
                In The City, by wearing an NBA jersey, you will earn an extra 2XP for each game. Take this opportunity to get more experience and unlock upgrades on your player!
              </p>
            </div>
          </div>

          <div class=" h-[500px]  bg-[#343434]/70 shadow-xl hover:shadow-white   transition-transform duration-300 transform hover:scale-105 w-[330px]  rounded-2xl ">
            <img
              className=" rounded-t-2xl  h-[45%]  object-fill w-full"
              src="https://onigamers.com/wp-content/uploads/2023/06/EA-Sports-Madden-NFL-24.jpg" />
            <h1 className="font-semibold p-4  text-yellow-50 leading-none text-xl mt-1 capitalize truncate">
              Madden NFL
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium tracking-wide text-white text-center mt-1">
                Discover the winners of this first annual celebration to recognize the best in Madden NFL 22, decided using statistics from users in key positions and votes from experts and the community.
              </p>
            </div>
          </div>

          <div className=" h-[500px]     bg-[#343434]/70 shadow-xl hover:shadow-white  w-[330px]   transition-transform duration-300 transform hover:scale-105 rounded-2xl  content-center  ">
            <img className=" h-[45%]  rounded-t-2xl w-full  object-fill" src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/07/18/16581597162266.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none p-4 text-xl mt-1 capitalize truncate">
              FIFA 23
            </h1>
            <div className="max-w-full h-[40%]">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base  p-3 tracking-wide text-white mt-1 text-center">
                EA SPORTS™ and adidas have teamed up to offer FIFA 23 qualifiers an exclusive 30% discount code on select adidas items. Visit adidas.es/fifa_23 for more
              </p>
            </div>
          </div>
        </div>


        <div id="shooter" className={`flex flex-wrap justify-around w-[85%] gap-10 mb-10 mt-10 ${activeTab === 'shooter' ? 'block' : 'hidden'}`}>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl   ">
            <img
              className=" rounded-t-2xl  object-fill h-[45%] w-full"
              src="https://images6.alphacoders.com/772/772017.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none text-xl mt-1 capitalize truncate p-4">
              Overwatch
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base text-center font-medium tracking-wide text-white mt-1 w-[90%]">
                Overwatch 2 celebrates Valentine's Day with Ultimate Valentine. New Arcade battle, special challenges to get cosmetics, and a dating sim adventure with Genji or Mercy..
              </p>
            </div>
          </div>

          <div class=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px]  rounded-2xl ">
            <img
              className=" rounded-t-2xl  h-[45%]  object-fill w-full"
              src="http://wallpapercave.com/wp/wp1810708.jpg" />
            <h1 className="font-semibold p-4  text-yellow-50 leading-none text-xl mt-1 capitalize truncate">
              Counter Strike: Global Ofensive
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium tracking-wide text-white text-center mt-1">
                Today we released the first major update for CS2 Limited Test. New purchase and equipment menu. Customize your weapons in the loadout menu for battle. You can choose between pistols, mid-tier weapons, and rifles for both sides (T and CT).
              </p>
            </div>
          </div>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl  content-center  ">
            <img className=" h-[45%]  rounded-t-2xl w-full  object-fill" src="https://images.alphacoders.com/923/thumb-1920-923734.png" />
            <h1 className="font-semibold text-yellow-50 leading-none p-4 text-xl mt-1 capitalize truncate">
              Battlefield V
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium text-center tracking-wide text-white mt-1">
                Battlefield™ V launches on November 20 with eight maps, eight exciting game modes, "War Stories" single player campaign, vast arsenal of weapons and vehicles, progression, customization and specializations
              </p>
            </div>
          </div>
        </div>


        <div id="race" className={`flex flex-wrap justify-around w-[85%] gap-10 mb-10 mt-10 ${activeTab === 'race' ? 'block' : 'hidden'}`}>

          <div className="  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white    ">
            <img
              className=" rounded-t-2xl  object-fill h-[45%] w-full"
              src="https://i.ytimg.com/vi/lXRnR_W0J4o/maxresdefault.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none text-xl mt-1 capitalize truncate p-4">
              F1 Championship Season 2007
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base  text-center font-medium tracking-wide text-white mt-1 w-[90%]">
                "Grand Prize of Imagination"
                In the "Grand Prix of Imagination", 5 special cars with futuristic technology will be added to the race. They will compete in an exciting and challenging course built on a floating island in the middle of the ocean.
              </p>
            </div>
          </div>

          <div class="h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white transition-transform duration-300 transform hover:scale-105 w-[330px]  rounded-2xl ">
            <img
              className="  rounded-t-2xl  h-[45%]  object-fill w-full"
              src="https://images2.alphacoders.com/517/517806.jpg" />
            <h1 className="font-semibold p-4  text-yellow-50 leading-none text-xl mt-1 capitalize truncate">
              GRID Autosport
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium tracking-wide text-white text-center mt-1">
                RACE THE MOST EXCITING CARS. Love the cars you race as you tune and upgrade the world’s most thrilling contemporary and classic high-performance racing cars. Show your style online by creating your own liveries and building your car collection.
              </p>
            </div>
          </div>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl  content-center  ">
            <img className=" h-[45%]  rounded-t-2xl w-full  object-fill" src={need} />
            <h1 className="font-semibold text-yellow-50 leading-none p-4 text-xl mt-1 capitalize truncate">
              Need for Speed: World
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium text-center tracking-wide text-white mt-1">
                The "Global Elite Race" brings together the best runners in the world in an international competition. Five new high-end cars will be added to the game, offering exciting speeds and challenges on an epic course.
              </p>
            </div>
          </div>
        </div>

        <div id="multiplayer" className={`flex flex-wrap justify-around w-[85%] gap-10 mb-10 mt-10 ${activeTab === 'multiplayer' ? 'block' : 'hidden'}`}>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl    ">
            <img
              className=" rounded-t-2xl  object-fill h-[45%] w-full"
              src="https://www.brawlhalla.com/c/uploads/2021/04/Reno_1920x1080.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none text-xl mt-1 capitalize truncate p-4">
              Brawlhalla
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base text-center font-medium tracking-wide text-white mt-1 w-[90%]">
                The 2023 Brawlhalla Esports season will offer $1 million in prizes, distributed across both online and offline events!
              </p>
            </div>
          </div>

          <div class=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px]  rounded-2xl ">
            <img
              className=" rounded-t-2xl  h-[45%]  object-fill w-full"
              src="https://images.hdqwalls.com/wallpapers/rocket-league-season-2-gy.jpg" />
            <h1 className="font-semibold p-4  text-yellow-50 leading-none text-xl mt-1 capitalize truncate">
              Rocket League
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium tracking-wide text-white text-center mt-1">
                TIER UP
                Reach tier 70 and beyond! Start unlocking items from the Pro Tiers to get painted versions of select Rocket Pass items and trade them with friends
              </p>
            </div>
          </div>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl  content-center  ">
            <img className=" h-[45%]  rounded-t-2xl w-full  object-fill" src="https://cdn2.unrealengine.com/15br-bplaunch-egs-s3-2560x1440-2560x1440-687570387.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none p-4 text-xl mt-1 capitalize truncate">
              Fortnite
            </h1>
            <div className="max-w-full">
              <h2 className="text-center font text-white">Event of the month </h2>
              <p className="text-base font-medium text-center tracking-wide text-white mt-1">
                Epic Games has made official the final event "Collision" that will culminate Season 2 of Fortnite. It will take place next Saturday, June 4, 2022, and the fate of Point Zero will be decided.
              </p>
            </div>
          </div>
        </div>

        <div id="survival" className={`flex flex-wrap justify-around w-[85%] gap-10 mb-10 mt-10 ${activeTab === 'survival' ? 'block' : 'hidden'}`}>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl   ">
            <img
              className=" rounded-t-2xl  object-fill h-[45%] w-full"
              src="https://grettogeek.com/wp-content/uploads/2017/09/raft-cover.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none text-xl mt-1 capitalize truncate p-4">
              Raft
            </h1>
            <div className="max-w-full">
              <h2 className="text-center text-white font">Event of the month </h2>
              <p className="text-base text-center font-medium tracking-wide text-white mt-1 w-[90%]">
                Today, Raft celebrates 5 years on GameZone! Head over to our Discord to join in the celebrations! The event continues until June 11! Join
              </p>
            </div>
          </div>

          <div class=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white  transition-transform duration-300 transform hover:scale-105 w-[330px]  rounded-2xl ">
            <img
              className=" rounded-t-2xl  h-[45%]  object-fill w-full"
              src="https://assets-prd.ignimgs.com/2020/07/24/grounded-button-fin-1595554384970.jpg" />
            <h1 className="font-semibold p-4  text-yellow-50 leading-none text-xl mt-1 capitalize truncate">
              Grounded
            </h1>
            <div className="max-w-full">
              <h2 className="text-center text-white font">Event of the month </h2>
              <p className="text-base font-medium tracking-wide text-white text-center mt-1">
                A new map is added this month. Can you thrive alongside hordes of giant insects, fighting to survive the dangers of the backyard?
              </p>
            </div>
          </div>

          <div className=" h-[500px] bg-[#343434]/70 shadow-xl hover:shadow-white   transition-transform duration-300 transform hover:scale-105 w-[330px] rounded-2xl  content-center  ">
            <img className=" h-[45%]  rounded-t-2xl w-full  object-fill" src="https://www.spieltimes.com/wp-content/uploads/2021/02/valheim-1200.jpg" />
            <h1 className="font-semibold text-yellow-50 leading-none p-4 text-xl mt-1 capitalize truncate">
              Valheim
            </h1>
            <div className="max-w-full">
              <h2 className="text-center text-white  ">Event of the month </h2>
              <p className="  text-base font-medium text-center tracking-wide text-white mt-1">
                In "Valheim", during the "Challenge of the Gods" event, players must face epic challenges for a week. They must defeat powerful bosses, overcome divine trials, and obtain legendary weapons and sacred equipment. The event culminates in an epic battle against an ancient god.
              </p>
            </div>
          </div>
        </div>









      </div>
      <Footer />
    </>
  )
}
