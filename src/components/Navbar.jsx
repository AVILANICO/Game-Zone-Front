
import VITE_API from "../../api";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link as Anchor, useNavigate } from "react-router-dom";
import logo2 from '../assets/image/fondo-verde.png'
import luis from '../assets/image/luis.png'


export default function Navbar() {

  const [open, setOpen] = useState(true);

  const boton = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }
  const role = localStorage.getItem("role")
  let token = localStorage.getItem('token')
  let headers = { headers: { 'authorization': `Bearer ${token}` } }
  let email = localStorage.getItem('email')
  let photo = localStorage.getItem('photo')


  function backHome() {
    axios.post(VITE_API + 'auth/signout', null, headers)
      .then(res => {
        localStorage.clear();
        navigate('/')
      })
      .catch(err => alert(err))
  }

  return (
    <nav className="xsm:hidden w-full h-24 absolute flex justify-between items-center">
      <div>
        <button onClick={handleMenuClick} className="z-10 fixed left-10 top-7">
          <svg xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute top-16 left-0 w-[30rem]  bg-[#343434] rounded-md py-5 z-10 ">
            {token &&
              <div className="flex items-center justify-center gap-4">
                <img className="w-12 h-12 object-cover rounded-full" src={photo} alt="imgUsuario" />
                <p className="text-xl text-white">{email}</p>
                <svg onClick={handleMenuClick} className="flex justify-end w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>}
            <ul onClick={handleMenuClick}>
              <li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/">Home</Anchor></li>
              {role == 0 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/new-role">New Role</Anchor></li>
              </>) : ("")}
              {role == 3 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/admin">Panel</Anchor></li>
              </>) : ("")}
              {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/game-form">New game</Anchor></li>
              </>) : ("")}
              {token && <li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/games/:pages">Games</Anchor></li>}
              {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/mygames">My Games</Anchor></li> </>) : ("")}
              {!token && <li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/register">Register</Anchor></li>}
              {!token && <li><Anchor className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4" to="/signin">Log In</Anchor></li>}
              {token && <li><a className="flex justify-center px-4 py-2 text-white hover:bg-white hover:text-black hover:rounded-md m-4 cursor-pointer" onClick={backHome}>Sign Out</a></li>}
            </ul>
          </div>
        )}
      </div>
      <div className="absolute flex justify-center content-center items-center z-10 right-10 top-1"> 
      <div  className="flex justify-between w-20  ">
      <svg xmlns=" bg-[#343434] http:www.w3.org/2000/svg" width="28" height="28" fill="white" className=" cursor-pointer hover:scale-95   bi bi-heart" viewBox="0 0 16 16">
                   <path className="" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                 </svg>
                 <svg xmlns="http:www.w3.org/2000/svg" width="28" height="28" fill="white" className="  cursor-pointer hover:scale-95  bi bi-cart4" viewBox="0 0 16 16">
                 <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
               </svg>
      </div>

        <img className="block h-24 w-24    lg:hidden" src={luis} alt="Your Company" />
        <img className="hidden h-24 w-24  lg:block" src={luis} alt="Your Company" />
      </div>
    </nav>
  )
}
