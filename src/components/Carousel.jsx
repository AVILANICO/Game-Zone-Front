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
      }, 8000);
      return () => clearInterval(tiempo);
    }, [])

  let urlVideo = categories[counter]?.video
  console.log(urlVideo);

  return (
    <div className="relative flex justify-between items-center w-full h-[16rem] my-8 rounded-md xsm:hidden container" ref={divRef}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <ReactPlayer
          url={urlVideo}
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
        />
      </div>

      <div className='absolute w-[100%] flex items-center justify-between px-4 z-20'>
        <img src={flecha1} className="w-[3rem] cursor-pointer" onClick={restar} />
        <img src={flecha2} className="w-[3rem] cursor-pointer" onClick={sumar} />
      </div>

    </div>
  )
}
