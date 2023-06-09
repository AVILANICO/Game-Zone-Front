import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom';


export default function main() { //puedo desestructurar props en {children} y llamar directamente a la propiedad sin usar el props. 
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
