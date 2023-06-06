
import flecha1 from "../assets/image/flecha1.png"
import flecha2 from "../assets/image/flecha2.png"

import { useState, useEffect } from "react"  //se recomienda que los hooks se definan en las primeras lineas del componente
import axios from "axios"
import apiUrl from "../../api"


export default function Carousel() {
  /* useEffect(
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
    }, []) */

  return (
    <>




    
    </>

  )
}
