import logo from "../assets/image/logo-minga.png"
import axios from "axios";
import { useParams } from "react-router-dom";
import VITE_API from "../../api";
import { useState } from 'react';
import { Link as Anchor, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbarmobile() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  let {order, title} = useSelector(store => store.title_order)
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }
  let {url} = useParams()
  const role = localStorage.getItem("role")
  let token = localStorage.getItem('token')
  let headers = { headers: { 'authorization': `Bearer ${token}` } }
  let email = localStorage.getItem('email')
  let photo = localStorage.getItem('photo')

  function backHome() {
    axios.post(VITE_API + 'auth/signout', null, headers) //pongo null xq no tengo que enviar datos
      .then(res => {
        localStorage.clear();
        navigate('/')
      })
      .catch(err => alert(err))
  }
  return (
    <nav className=" absolute w-full h-20 flex justify-between items-center md:hidden">
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <button onClick={handleMenuClick}className="z-10 absolute left-6 top-7">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={url === 'chapter' ? '#fff': '#F472B6'} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute m-0 p-0 top-0 left-0 w-full h-screen bg-gradient-to-b at-153 from-btn1 from-(-13.9%) to-btn2 to-58.69% z-20">
              <button onClick={handleMenuClick} className="px-4 py-2 text-white absolute right-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

              </button>
              {token &&
                <div className="flex items-center justify-center gap-4 mt-8">
                  <img className="w-12 h-12 object-cover rounded-full" src={photo} alt="imgUsuario" />
                  <p className="text-xl">{email}</p>
                </div>}
              <ul onClick={handleMenuClick} className="font-semibold font-poppins pt-[2rem]">
                <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/">Home</Anchor></li>
                <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/new-role">New Role</Anchor></li>
              <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/admin">Panel</Anchor></li>
                {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/manga-form">New mangas</Anchor></li>
                </>) : ("")}
                {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="#">Favorites</Anchor></li>}
                {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/mangas/:pages">Mangas</Anchor></li>}
                {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/mymangas">My Mangas</Anchor></li>}
                {!token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/register">Register</Anchor></li>}
                {!token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/signin">Log In</Anchor></li>}
                {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4 cursor-pointer" onClick={backHome}>Sign Out</Anchor></li>}
              </ul>
            </div>
          )}
        </div>
        {url === 'chapter' ? (<p className='flex justify-center font-bold h-24 items-center text-white bg-pink-500/90 w-screen '>Chapter #{order} - {title}</p> ):('')}
        <div className="absolute z-10 right-4 top-4">
          <img src={logo} className="xsm:w-12 " alt="Logo-Minga" />
        </div>
      </div>
    </nav>
  )
}
