
import flecha1 from "../assets/image/flecha1.png"
import flecha2 from "../assets/image/flecha2.png"

import { useState, useEffect } from "react"  //se recomienda que los hooks se definan en las primeras lineas del componente
import axios from "axios"
import apiUrl from "../../api"


export default function Carousel() {
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
      }, 4000);
      return () => clearInterval(tiempo);
    }, [])

  return (
    <div className="flex justify-between items-center w-full h-[16rem] my-8 rounded-md xsm:hidden" style={{ backgroundColor: categories[counter]?.color }}>

      <div className='absolute w-[92%] flex content-center my-28 justify-between ' >
        <img src={flecha1} className="w-[3rem] cursor-pointer" onClick={restar} />
        <img src={flecha2} className="w-[3rem] cursor-pointer" onClick={sumar} />
      </div>

      <div className="w-[100%] h-[22rem] flex">
        <div className="w-[50%]">
          <img src={categories[counter]?.character_photo} className="w-auto h-[80%] my-4 " />
        </div>
        <div className="w-[50%]">
          <img src={categories[counter]?.cover_photo} className="w-auto h-[75%] my-3 " />
        </div>
      </div>

      <div className="h-auto w-[90%] ml-10">
        <h4 className="text-white text-2xl text-start w-[50%] pl-2">{categories[counter]?.name.toUpperCase()}</h4>
        <p className="text-white text-sm text-justify w-[60%] pl-2 ">{categories[counter]?.description}</p>
      </div>
    </div>

  )
}
