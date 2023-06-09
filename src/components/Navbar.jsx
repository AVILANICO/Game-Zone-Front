import VITE_API from "../../api";
import axios from "axios";
import { useState } from 'react';
import { Link as Anchor, useNavigate } from "react-router-dom";
import logo2 from '../assets/image/luis.png'


export default function Navbar() {

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
    <nav className="xsm:hidden w-full h-16 bg-[#343434] flex justify-between items-center ">
      <div>
        <button onClick={handleMenuClick} className="ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute left-16 top-2 h-12 flex items-center bg-none rounded-md py-5 z-10">
            <div className="flex justify-between ">
              <ul onClick={handleMenuClick} className="flex gap-6 ">
                <li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/">Home</Anchor></li>
                {role == 0 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/new-role">New Role</Anchor></li>
                </>) : ("")}
                {role == 3 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/admin">Panel</Anchor></li>
                </>) : ("")}
                {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/game-form">New game</Anchor></li>
                </>) : ("")}
                <li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/games/:pages">Games</Anchor></li>
                {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/mygames">My Games</Anchor></li> </>) : ("")}
                {!token && <li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/register">Register</Anchor></li>}
                {!token && <li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" to="/signin">Log In</Anchor></li>}
                {token && <li><a className="flex justify-center py-2 text-white cursor-pointer hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-8 rounded-xl" onClick={backHome}>Sign Out</a></li>}
                {token &&
                  <div className="flex items-center gap-2">
                    <img className="w-8 h-8 object-cover rounded-full" src={photo} alt="imgUsuario" />
                    <p className="text-xl text-white">{email}</p>
                  </div>}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <svg xmlns=" bg-[#343434] http:www.w3.org/2000/svg" width="28" height="28" fill="white" className="bi bi-heart cursor-pointer hover:scale-95" viewBox="0 0 16 16">
          <path className="bg-[#343434]" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
        <svg xmlns="http:www.w3.org/2000/svg" width="36" height="36" fill="white" className="bi bi-cart4 cursor-pointer hover:scale-95" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
        <img className="w-24 rounded-full mr-4" src={logo2} alt="Your Company" />
      </div>
    </nav>
  )
}
