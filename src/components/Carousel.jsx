import flecha1 from "../assets/image/flecha1.png"
import flecha2 from "../assets/image/flecha2.png"
import { useState, useEffect, useRef } from "react"  //se recomienda que los hooks se definan en las primeras lineas del componente
import axios from "axios"
import apiUrl from "../../api"
import ReactPlayer from 'react-player'


export default function Carousel() {
  const divRef = useRef(null);

  useEffect(
    () => { axios(apiUrl + 'categories').then(res => setCategories(res.data.categories)).catch(err => console.error(err)) },
    []                                       //array de dependecias vacio ya que necesitamos fechar una unica vez al mostrarse el componente
  )
  let [categories, setCategories] = useState([])
  let [counter, setCounter] = useState(0)
  let sumar = () => {
    setCounter(counter + 1)
    if (counter === categories.length - 1) {
      setCounter(0)
    }
  }
  let restar = () => {
    setCounter(counter - 1)
    if (counter === 0) {
      setCounter(categories.length - 1)
    }
  }

  useEffect(
    () => {
      const tiempo = setInterval(() => {
        setCounter((n) => (n + 1) % 4);
      }, 10000);
      return () => clearInterval(tiempo);
    }, [])

  let urlVideo = categories[counter]?.video
  console.log(urlVideo);

  return (
    <div style={{ backgroundColor: "transparent" }} className="relative flex justify-between items-center w-full h-[30rem] my-8 rounded-md xsm:hidden container" ref={divRef}>
      <div style={{ backgroundColor: "transparent" }} className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <ReactPlayer
          url={urlVideo}
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
        />
      </div>

      <div style={{ backgroundColor: "transparent" }} className='absolute w-[100%] flex items-center justify-between px-4 z-20'>
       
        <button style={{ backgroundColor: "transparent" }} onClick={restar}
          class="  hover:scale-110  absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev">
          <span style={{ backgroundColor: "transparent" }} class="inline-block h-8 w-8">
            <svg style={{ backgroundColor: "transparent" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-16 w-16">
              <path style={{ backgroundColor: "transparent" }}
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </span>
          <span style={{ backgroundColor: "transparent" }}
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Previous</span
          >
        </button>
        <button style={{ backgroundColor: "transparent" }} onClick={sumar}
          class="hover:scale-110   absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next">
          <span style={{ backgroundColor: "transparent" }} class="inline-block h-8 w-8">
            <svg style={{ backgroundColor: "transparent" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-16 w-16">
              <path style={{ backgroundColor: "transparent" }}
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
          <span style={{ backgroundColor: "transparent" }}
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Next</span
          >
        </button>
        {/*   <img style={{ backgroundColor: "transparent" }} src={flecha2} className="w-[3rem] cursor-pointer" onClick={sumar} /> */}
      </div>


    </div>
  )
}